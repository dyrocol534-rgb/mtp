import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    /* ================= AUTH ================= */
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer "))
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userType !== "owner")
      return Response.json({ message: "Forbidden" }, { status: 403 });

    /* ================= STATS (ACTIVE & NEW USERS) ================= */
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    /* ================= QUERY ================= */
    const [totalUsers, active24h, active7d, active30d, new24h, new7d, new30d] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ lastLogin: { $gte: last24h } }),
      User.countDocuments({ lastLogin: { $gte: last7d } }),
      User.countDocuments({ lastLogin: { $gte: last30d } }),
      User.countDocuments({ createdAt: { $gte: last24h } }),
      User.countDocuments({ createdAt: { $gte: last7d } }),
      User.countDocuments({ createdAt: { $gte: last30d } }),
    ]);

    /* ================= RESPONSE ================= */
    return Response.json({
      success: true,
      total: totalUsers,
      activeStats: {
        day: active24h,
        week: active7d,
        month: active30d,
      },
      newStats: {
        day: new24h,
        week: new7d,
        month: new30d,
      },
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );

  }
}
