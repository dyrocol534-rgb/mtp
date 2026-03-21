import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
    const baseUrl = "https://mlbbtopup.in";

    // 1. Static Routes (Must match sitemap.ts)
    const staticUrls = [
        `${baseUrl}/`,
        `${baseUrl}/games`,
        `${baseUrl}/region`,
        `${baseUrl}/services`,
        `${baseUrl}/about`,
        `${baseUrl}/contact`,
        `${baseUrl}/privacy-policy`,
        `${baseUrl}/terms-and-conditions`,
        `${baseUrl}/refund-policy`,
        `${baseUrl}/blog`,
        `${baseUrl}/idsonsell`,
        `${baseUrl}/leaderboard`,
        `${baseUrl}/check`,
        `${baseUrl}/blog/is-mlbb-top-up-legal-in-india`,
        `${baseUrl}/blog/how-to-buy-mlbb-diamonds-safely-in-india`,
        `${baseUrl}/blog/mlbb-weekly-pass-price-in-india`,
        `${baseUrl}/blog/how-to-gift-mlbb-diamonds`,
        `${baseUrl}/blog/best-mlbb-diamond-packages-value-guide`,
    ];

    /* ================= OTT & MEMBERSHIP STATIC DATA ================= */
    const OTTS = [
        { slug: "youtube-premium" },
        { slug: "netflix" },
        { slug: "spotify" },
    ];

    const MEMBERSHIPS = [
        { slug: "silver-membership" },
        { slug: "reseller-membership" },
    ];

    const ottUrls = OTTS.map((item) => `${baseUrl}/games/ott/${item.slug}`);
    const membershipUrls = MEMBERSHIPS.map(
        (item) => `${baseUrl}/games/membership/${item.slug}`
    );

    /* ================= DYNAMIC GAME ROUTES ================= */
    let gameUrls: string[] = [];

    // Manual games
    const manualGames = ["coc-manual", "starlight-card-manual", "bgmi-manual"];
    const manualUrls = manualGames.map((slug) => `${baseUrl}/games/${slug}`);

    try {
        const response = await fetch("https://game-off-ten.vercel.app/api/v1/game", {
            headers: {
                "x-api-key": process.env.API_SECRET_KEY || "",
            },
            next: { revalidate: 3600 },
        });

        if (response.ok) {
            const data = await response.json();
            const games = data?.data?.games || [];

            gameUrls = games
                .filter((g: any) => g.gameSlug && g.gameAvailablity)
                .map((g: any) => `${baseUrl}/games/${g.gameSlug}`);
        }
    } catch (error) {
        console.error("Sitemap.txt generation error:", error);
    }

    const allUrls = [
        ...staticUrls,
        ...gameUrls,
        ...manualUrls,
        ...ottUrls,
        ...membershipUrls,
    ];

    return new NextResponse(allUrls.join("\n"), {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
