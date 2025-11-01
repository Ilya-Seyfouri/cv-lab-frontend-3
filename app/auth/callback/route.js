import { createClient } from "../../lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log("=== AUTH CALLBACK START ===");
  console.log("Code received:", code ? "YES" : "NO");

  if (code) {
    const supabase = createClient();

    // Exchange code for session
    console.log("Exchanging code for session...");
    const { data, error: authError } =
      await supabase.auth.exchangeCodeForSession(code);

    console.log("Auth exchange result:");
    console.log("- User:", data?.user?.id);
    console.log("- Email:", data?.user?.email);
    console.log("- Auth Error:", authError);

    if (authError) {
      console.error("AUTH ERROR:", authError);
      return NextResponse.redirect(`${requestUrl.origin}/?error=auth_failed`);
    }

    const user = data?.user;

    if (user) {
      console.log("User authenticated, checking for profile...");

      // Check if profile exists
      const { data: existingProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log("Profile check:");
      console.log("- Existing profile:", existingProfile);
      console.log("- Profile error:", profileError);

      // If no profile exists, create one
      if (!existingProfile) {
        console.log("No profile found, creating new profile...");

        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            credits_remaining: 3,
            subscription_status: "free",
            is_subscribed: false,
            created_at: new Date().toISOString(),
            credits_last_reset: new Date().toISOString(),
          })
          .select();

        console.log("Profile creation result:");
        console.log("- New profile:", newProfile);
        console.log("- Insert error:", insertError);

        if (insertError) {
          console.error("PROFILE INSERT ERROR:", insertError);
          // Still redirect but with error param
          return NextResponse.redirect(
            `${requestUrl.origin}/dashboard?error=profile_create_failed`
          );
        } else {
          console.log("✅ Profile created successfully!");
        }
      } else {
        console.log("✅ Profile already exists!");
      }
    } else {
      console.log("❌ No user object after auth exchange");
    }
  }

  console.log("=== AUTH CALLBACK END - Redirecting to dashboard ===");
  // Redirect to dashboard after successful auth
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
