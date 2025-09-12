"use client";

import { useRouter } from "next/navigation";
import config from "@/config";

// Temporarily disabled checkout during authentication system transition
const ButtonCheckout = ({
  priceId,
  mode = "payment",
  disabled = false,
  donate = false,
  monzoLink,
  inDevelopment = false,
}: {
  priceId: string;
  mode?: "payment" | "subscription";
  disabled?: boolean;
  donate?: boolean;
  monzoLink?: string;
  inDevelopment?: boolean;
}) => {
  const navigateTo = useRouter();

  const handlePayment = async () => {
    // Always redirect to signin during auth removal
    navigateTo.push(config.auth.loginUrl);
  };

  return (
    <button
      className="btn btn-primary btn-block group"
      onClick={() => handlePayment()}
      disabled={disabled || inDevelopment}
    >
      {monzoLink ? "Easy Pay (Sign In Required)" : "Upgrade (Sign In Required)"}
      {inDevelopment && <span className="text-xs text-gray-500">In Development</span>}
    </button>
  );
};

export default ButtonCheckout;
