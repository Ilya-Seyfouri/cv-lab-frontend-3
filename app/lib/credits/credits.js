export function shouldResetCredits(profile) {
  if (!profile.credits_last_reset) {
    return true; // No reset timestamp, should reset
  }

  const lastReset = new Date(profile.credits_last_reset);
  const now = new Date();
  const hoursSinceReset = (now - lastReset) / (1000 * 60 * 60);

  if (profile.is_subscribed) {
    // Paid users: reset weekly (168 hours)
    return hoursSinceReset >= 168;
  } else {
    // Free users: reset daily (24 hours)
    return hoursSinceReset >= 24;
  }
}

export function getMaxCredits(isSubscribed) {
  return isSubscribed ? 999 : 3;
}
