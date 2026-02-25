import { unstable_cache } from "next/cache";
import { connectDB } from "./mongodb";
import AppSettings from "@/models/AppSettings";

export const getAppSettings = unstable_cache(
    async () => {
        try {
            await connectDB();
            const settings = await AppSettings.findOne({}).lean();
            if (!settings) {
                return { maintenanceMode: false };
            }
            return { maintenanceMode: !!settings.maintenanceMode };
        } catch (error) {
            console.error("Error fetching app settings:", error);
            return { maintenanceMode: false };
        }
    },
    ["app-settings"],
    {
        tags: ["app-settings"],
        revalidate: 3600, // Fallback revalidation (1 hour)
    }
);
