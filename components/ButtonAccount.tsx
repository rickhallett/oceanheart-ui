"use client";

import Link from "next/link";
import config from "@/config";

// Stubbed account button during authentication system transition
// Shows disabled state during auth removal
const ButtonAccount = () => {
  // Show disabled account button during auth removal
  return (
    <Link
      href={config.auth.loginUrl}
      className="btn"
    >
      <span className="w-8 h-8 bg-base-300 flex justify-center items-center rounded-full shrink-0">
        ?
      </span>
      Sign In
    </Link>
  );
};

export default ButtonAccount;
