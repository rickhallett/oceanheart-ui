"use client";

import Link from "next/link";
import config from "@/config";

type AuthButtonProps = {
  mode?: "signin" | "account";
  text?: string;
  extraStyle?: string;
};

/**
 * Stubbed authentication button component - no authentication during Supabase removal
 * Always shows sign-in state (no user)
 * 
 * @param mode - 'signin' (default) renders a simple login button, 'account' renders a popover with account options
 * @param text - Button text for signin mode when user is not logged in (default: "Get started")
 * @param extraStyle - Additional CSS classes to apply to the button
 */
const AuthButton = ({
  mode = "signin",
  text = "Get started",
  extraStyle = "",
}: AuthButtonProps) => {
  // Always show sign-in state (no user) during auth removal
  return (
    <Link
      className={`btn ${extraStyle}`}
      href={config.auth.loginUrl}
    >
      {text}
    </Link>
  );
};

export default AuthButton;
