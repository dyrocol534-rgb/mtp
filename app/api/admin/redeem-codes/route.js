import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import RedeemCode from "@/models/RedeemCode";

async function verifyOwner(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (user && user.userType === "owner") return user;
        return null;
    } catch (err) {
        return null;
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const owner = await verifyOwner(req);
        if (!owner) {
            return NextResponse.json({ success: false, message: "Unauthorized: Owner access required" }, { status: 401 });
        }

        const { amount, quantity, prefix = "TK-" } = await req.json();

        if (!amount || amount <= 0 || !quantity || quantity <= 0) {
            return NextResponse.json({ success: false, message: "Invalid amount or quantity" }, { status: 400 });
        }

        const generatedCodes = [];
        for (let i = 0; i < quantity; i++) {
            // Generating a longer 16-character random string (from 8 bytes)
            const randomString = crypto.randomBytes(8).toString("hex").toUpperCase();
            const code = `${prefix}${randomString}`;

            generatedCodes.push({
                code,
                value: amount,
                createdBy: owner._id,
                status: "active"
            });
        }

        const result = await RedeemCode.insertMany(generatedCodes);

        return NextResponse.json({
            success: true,
            message: `Successfully generated ${quantity} codes of ₹${amount} each.`,
            codes: result.map(c => c.code)
        });
    } catch (error) {
        console.error("Generate Codes Error:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();
        const owner = await verifyOwner(req);
        if (!owner) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const [codes, totals] = await Promise.all([
            RedeemCode.find({})
                .populate("usedBy", "name userId")
                .sort({ createdAt: -1 })
                .limit(100),
            RedeemCode.aggregate([
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ])
        ]);

        const totalUsed = totals.find(t => t._id === "used")?.count || 0;

        return NextResponse.json({
            success: true,
            codes,
            summary: {
                totalUsed,
                total: totals.reduce((acc, curr) => acc + curr.count, 0)
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const owner = await verifyOwner(req);
        if (!owner) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const codeId = searchParams.get("id");

        if (!codeId) {
            return NextResponse.json({ success: false, message: "Code ID required" }, { status: 400 });
        }

        // We can either delete or mark as expired. Mark as expired is safer for records.
        // But for "expiring" in a simple tool, deletion is often preferred to clean up.
        // Let's go with deletion as requested "option to expire those".
        await RedeemCode.findByIdAndDelete(codeId);

        return NextResponse.json({
            success: true,
            message: "Redeem code expired/removed successfully"
        });
    } catch (error) {
        console.error("Delete Code Error:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
