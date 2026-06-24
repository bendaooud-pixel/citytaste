"use server";

import { revalidatePath } from "next/cache";
import { execSync } from "child_process";
import { parseTargets, updateTargetStatus } from "@/lib/outreach";

export async function updateStatusAction(site: string, status: string) {
  const result = updateTargetStatus(site, status);
  if (!result.success) throw new Error(result.error ?? "Update failed");
  revalidatePath("/admin/outreach");
  return { success: true };
}

export async function generateDraftAction(site: string) {
  const targets = parseTargets();
  const target = targets.find(
    (t) => t.site.toLowerCase() === site.toLowerCase(),
  );
  if (!target) throw new Error(`Site "${site}" not found in targets`);
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required. Add it to .env.local");
  }

  const safeSite = target.site.replace(/[^a-zA-Z0-9.-]/g, "");
  const cwd = process.cwd();

  execSync(
    `npx tsx scripts/outreach/prepare-guest-post.ts --site "${safeSite}"`,
    { cwd, env: { ...process.env }, timeout: 120_000, stdio: "pipe" },
  );

  revalidatePath("/admin/outreach");
  return { success: true };
}
