import crypto from "crypto";

export function generateSmileSign(params, secretKey) {
    // 1. Sort keys alphabetically
    const sortedKeys = Object.keys(params).sort();

    // 2. Build query string: "key1=val1&key2=val2..."
    const queryString = sortedKeys
        .map(key => `${key}=${params[key]}`)
        .join("&");

    // 3. Append Secret Key (with &) and Double MD5
    const firstHash = crypto.createHash("md5").update(queryString + "&" + secretKey).digest("hex");
    const finalSign = crypto.createHash("md5").update(firstHash).digest("hex");

    return finalSign;
}

export async function placeSmileOrder(orderData) {
    const isSandbox = process.env.SMILE_MODE === "sandbox";

    const SMILE_UID = isSandbox ? process.env.SMILE_SANDBOX_UID : process.env.SMILE_PRODUCTION_UID;
    const SMILE_EMAIL = isSandbox ? process.env.SMILE_SANDBOX_EMAIL : process.env.SMILE_PRODUCTION_EMAIL;
    const SMILE_SECRET = isSandbox ? process.env.SMILE_SANDBOX_SECRET : process.env.SMILE_PRODUCTION_SECRET;

    // Endpoints from documentation screenshots
    const ENDPOINT = isSandbox
        ? "https://frontsmie.smile.one/smilecoin/api/createorder"
        : "https://www.smile.one/smilecoin/api/createorder";

    console.log(`[SmileOne] Using ${isSandbox ? "SANDBOX" : "PRODUCTION"} Mode`);

    // 🎯 SMILE ONE PRODUCT MAPPING (Numeric IDs)
    const PRODUCT_MAPPING = {
        "mobile-legends988_weekly-pass": "16642",
        "mobile-legends988_weekly-diamond-pass": "16642",
        "mobile-legends988_weekly-pass-2x": "16642",
    };

    const productKey = `${orderData.gameSlug}_${orderData.itemSlug}`;
    const numericProductId = PRODUCT_MAPPING[productKey] || orderData.smileProductId || orderData.productId;

    // fields according to the documentation: email, uid, userid, zoneid, product, productid, time, sign
    const params = {
        email: SMILE_EMAIL,
        uid: SMILE_UID,
        userid: String(orderData.playerId),
        zoneid: String(orderData.zoneId),
        product: "mobilelegends", // From documentation screenshot example
        productid: String(numericProductId),
        time: Math.floor(Date.now() / 1000), // UNIX timestamp (Int)
        orderno: orderData.orderId,
    };

    params.sign = generateSmileSign(params, SMILE_SECRET);

    console.log("[SmileOne] Placing Order (Form Data):", params.orderno);

    try {
        const formData = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) formData.append(key, value);
        }

        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        });

        const data = await response.json();
        console.log("[SmileOne] API Response:", JSON.stringify(data));

        return {
            success: data.status === 200 || data.success === true || data.code === 200,
            data: data
        };
    } catch (error) {
        console.error("[SmileOne] API Error:", error);
        return { success: false, error: error.message };
    }
}
