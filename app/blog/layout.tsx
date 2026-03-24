import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MLBB Insights & Guides – Tips for Safe & Cheap Top Up | Blue Buff",
  description: "Stay updated with the latest Mobile Legends: Bang Bang news, diamond price guides, and safety tips for recharge in India. Your source for elite MLBB insights.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
