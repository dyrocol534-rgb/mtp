import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    /* ================= AUTH ================= */
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Owner only
    if (decoded.userType !== "owner") {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    /* ================= STATS ================= */
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    /* ================= BASE FILTER ================= */
    let filter = {
      paymentStatus: { $in: ["success", "completed", "paid"] },
    };

    /* ================= QUERY ================= */
    const [
      vol1dAgg, vol7dAgg, vol30dAgg,
      count1d, count7d, count30d,
      totalTx
    ] = await Promise.all([
      // Volume Aggregations (Successful Transactions Only)
      Order.aggregate([
        { $match: { ...filter, createdAt: { $gte: last24h } } },
        { $group: { _id: null, total: { $sum: "$price" } } }
      ]),
      Order.aggregate([
        { $match: { ...filter, createdAt: { $gte: last7d } } },
        { $group: { _id: null, total: { $sum: "$price" } } }
      ]),
      Order.aggregate([
        { $match: { ...filter, createdAt: { $gte: last30d } } },
        { $group: { _id: null, total: { $sum: "$price" } } }
      ]),
      // Transaction Counts
      Order.countDocuments({ ...filter, createdAt: { $gte: last24h } }),
      Order.countDocuments({ ...filter, createdAt: { $gte: last7d } }),
      Order.countDocuments({ ...filter, createdAt: { $gte: last30d } }),
      Order.countDocuments(filter)
    ]);

    return Response.json({
      success: true,
      total: totalTx,
      stats: {
        counts: {
          day: count1d,
          week: count7d,
          month: count30d,
        },
        volume: {
          day: vol1dAgg[0]?.total || 0,
          week: vol7dAgg[0]?.total || 0,
          month: vol30dAgg[0]?.total || 0,
        }
      }
    });
  } catch (err) {
    console.error("Transaction API Error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
