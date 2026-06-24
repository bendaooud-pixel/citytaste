import type { Metadata } from "next";
import { loadOutreachData } from "@/lib/outreach";
import { OutreachDashboard } from "./OutreachDashboard";

export const metadata: Metadata = {
  title: "Outreach — CityTaste Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export default async function OutreachPage() {
  const data = await loadOutreachData();
  return <OutreachDashboard initialData={data} />;
}
