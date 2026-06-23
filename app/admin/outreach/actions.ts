"use server";

import { revalidatePath } from "next/cache";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { parseTargets, updateTargetStatus } from "@/lib/outreach";

const execAsync = promisify(exec);

export async function updateStatusAction(site: string, status: string) {
  const result = updateTargetStatus(site, status);
  if (!result.success) throw new Error(result.error);
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
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }

  const safeSite = target.site.replace(/[^a-zA-Z0-9.-]/g, "");
  const cwd = process.cwd();
  const tsx = path.join(cwd, "node_modules/.bin/tsx");

  await execAsync(
    `"${tsx}" scripts/outreach/prepare-guest-post.ts --site "${safeSite}"`,
    { cwd, env: { ...process.env }, timeout: 120_000 },
  );

  revalidatePath("/admin/outreach");
  return { success: true };
}
