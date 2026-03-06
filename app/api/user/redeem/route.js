import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import RedeemCode from "@/models/RedeemCode";
import WalletTransaction from "@/models/WalletTransaction";
import crypto from "crypto";

async function getUser(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await User.findById(decoded.userId);
    } catch (err) {
        return null;
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const user = await getUser(req);
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { code } = await req.json();
        if (!code) {
            return NextResponse.json({ success: false, message: "Code is required" }, { status: 400 });
        }

        // Find and validate the code
        const redeemCode = await RedeemCode.findOne({ code: code.trim().toUpperCase() });

        if (!redeemCode) {
            return NextResponse.json({ success: false, message: "Invalid redeem code" }, { status: 404 });
        }

        if (redeemCode.status === "used") {
            return NextResponse.json({ success: false, message: "This code has already been used" }, { status: 400 });
        }

        // Start transaction/atomic update
        const balanceBefore = user.wallet || 0;
        const balanceAfter = balanceBefore + redeemCode.value;

        // Update User Wallet
        await User.findByIdAndUpdate(user._id, {
            $inc: { wallet: redeemCode.value }
        });

        // Mark code as used
        redeemCode.status = "used";
        redeemCode.usedBy = user._id;
        redeemCode.usedAt = new Date();
        await redeemCode.save();

        // Log Transaction
        const transactionId = `TXN-REDEEM-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
        await WalletTransaction.create({
            transactionId,
            userId: user.userId,
            userObjectId: user._id,
            type: "credit",
            amount: redeemCode.value,
            balanceBefore,
            balanceAfter,
            description: `Gift Code Redeemed: ${redeemCode.code}`,
            status: "success",
            performedBy: "user",
            referenceId: redeemCode._id.toString()
        });

        return NextResponse.json({
            success: true,
            message: `Successfully redeemed ₹${redeemCode.value}`,
            newBalance: balanceAfter
        });

    } catch (error) {
        console.error("Redeem Code Error:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
