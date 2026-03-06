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

        // Find and mark as used ATOMICALLY to prevent race conditions
        const redeemCode = await RedeemCode.findOneAndUpdate(
            { code: code.trim().toUpperCase(), status: "active" },
            {
                $set: {
                    status: "used",
                    usedBy: user._id,
                    usedAt: new Date()
                }
            },
            { new: true }
        );

        if (!redeemCode) {
            // Check if it exists at all to give better error
            const exists = await RedeemCode.findOne({ code: code.trim().toUpperCase() });
            if (!exists) {
                return NextResponse.json({ success: false, message: "Invalid redeem code" }, { status: 404 });
            }
            return NextResponse.json({ success: false, message: "This code has already been used" }, { status: 400 });
        }

        // Update User Wallet
        const balanceBefore = user.wallet || 0;
        const balanceAfter = balanceBefore + redeemCode.value;

        await User.findByIdAndUpdate(user._id, {
            $inc: { wallet: redeemCode.value }
        });

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
