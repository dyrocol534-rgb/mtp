"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic import for the heavy overlay component
const Maintaince = dynamic(() => import("@/components/Seasonal/Maintaince"), {
    ssr: false, // Only load on client
});

export default function MaintenanceWrapper({ maintenanceMode }) {
    const pathname = usePathname();

    // If maintenance is OFF, do nothing
    if (!maintenanceMode) return null;

    // List of paths that should NEVER show the maintenance overlay
    const excludedPaths = ["/owner-panal", "/login", "/api/admin"];

    if (pathname && excludedPaths.some(path => pathname.startsWith(path))) {
        return null;
    }

    // Show maintenance overlay for everyone else
    return <Maintaince />;
}
