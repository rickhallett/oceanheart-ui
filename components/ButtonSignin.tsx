"use client";

import Link from "next/link";
import config from "@/config";

// Stubbed sign-in button during authentication system transition
// Always shows sign-in state (no user) during auth removal
const ButtonSignin = ({
  text = "Get started",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  // Always show sign-in state during auth removal
  return (
    <Link
      className={`btn ${extraStyle ? extraStyle : ""}`}
      href={config.auth.loginUrl}
    >
      {text}
    </Link>
  );
};

export default ButtonSignin;
