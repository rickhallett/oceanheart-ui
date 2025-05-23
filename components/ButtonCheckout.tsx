"use client";

import { useEffect, useState } from "react";
import apiClient from "@/libs/api";
import config from "@/config";
import { createClient } from "@/libs/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// This component is used to create Stripe Checkout Sessions
// It calls the /api/stripe/create-checkout route with the priceId, successUrl and cancelUrl
// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card. You can change that in the API route
// You can also change the mode to "subscription" if you want to create a subscription instead of a one-time payment
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = createClient();
  const [user, setUser] = useState<User>(null);
  const navigateTo = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  const handlePayment = async () => {
    setIsLoading(true);

    if (!user) {
      // redirect to signin page
      navigateTo.push("/signin");
      return;
    }

    if (monzoLink) {
      window.location.href = monzoLink;
      return;
    }

    try {
      const { url }: { url: string } = await apiClient.post(
        "/stripe/create-checkout",
        {
          priceId: donate ? "price_1R4RHkRVLr5O3VRE6dsEzO4U" : priceId,
          successUrl: window.location.href,
          cancelUrl: window.location.href,
          mode,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <button
      className="btn btn-primary btn-block group"
      onClick={() => handlePayment()}
      disabled={disabled || inDevelopment}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : null}
      {monzoLink ? "Easy Pay" : "Upgrade me"}
      {inDevelopment && <span className="text-xs text-gray-500">In Development</span>}
    </button>
  );
};

export default ButtonCheckout;
