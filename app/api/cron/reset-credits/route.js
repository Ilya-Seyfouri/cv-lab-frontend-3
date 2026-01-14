import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Secret key to protect this endpoint
const CRON_SECRET = process.env.CRON_SECRET;

// Token amounts per plan
const PLAN_TOKENS = {
  "Monthly Standard": 30,
  "Monthly Premium": 100,
  "6-Month Standard": 30,
  "6-Month Premium": 100,
};

export async function GET(req) {
  // Verify the request is from our cron service
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    console.log("Unauthorized cron attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("=== CRON: Monthly Credit Reset Started ===");

  try {
    const now = new Date();

    // Find all subscribers whose reset date has passed
    const { data: usersToReset, error: fetchError } = await supabase
      .from("profiles")
      .select("id, email, subscription_status, credits_reset_date")
      .eq("is_subscribed", true)
      .not("credits_reset_date", "is", null)
      .lte("credits_reset_date", now.toISOString());

    if (fetchError) {
      console.error("Error fetching users:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${usersToReset?.length || 0} users to reset`);

    if (!usersToReset || usersToReset.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No users need credit reset",
        resetCount: 0,
      });
    }

    // Reset credits for each user
    let resetCount = 0;
    const errors = [];

    for (const user of usersToReset) {
      const tokens = PLAN_TOKENS[user.subscription_status];

      if (!tokens) {
        console.log(
          `Unknown plan for user ${user.id}: ${user.subscription_status}`
        );
        continue;
      }

      // Calculate next reset date (1 month from now)
      const nextResetDate = new Date();
      nextResetDate.setMonth(nextResetDate.getMonth() + 1);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          credits_remaining: tokens,
          credits_last_reset: now.toISOString(),
          credits_reset_date: nextResetDate.toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        console.error(`Error resetting user ${user.id}:`, updateError);
        errors.push({ userId: user.id, error: updateError.message });
      } else {
        console.log(
          `Reset ${
            user.email || user.id
          } to ${tokens} tokens. Next reset: ${nextResetDate.toISOString()}`
        );
        resetCount++;
      }
    }

    console.log(`=== CRON: Reset complete. ${resetCount} users updated ===`);

    return NextResponse.json({
      success: true,
      message: `Reset credits for ${resetCount} users`,
      resetCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { error: "Cron job failed", details: error.message },
      { status: 500 }
    );
  }
}
