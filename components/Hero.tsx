"use client";

import Image from "next/image";
import ButtonSignin from "@/components/ButtonSignin";
import config from "@/config";
import { useEffect, useState } from "react";
import { createClient } from "@/libs/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FaRegSquareCaretDown } from "react-icons/fa6";
import { IntroVideo } from "@/components/IntroVideo";

const Hero = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  return (
    <>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">

          <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
            Privacy-First AI Tools <span className="text-blue-400">for Wellbeing</span>
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            oceanheart.ai helps therapists do more of what they love most: <span className="italic text-blue-400">helping people</span>
          </p>
          <p className="text-lg opacity-80 leading-relaxed -mt-4">
            <span className="font-bold text-blue-400">Data Angel v1.0</span>: Smarter Notes. Safer Data. Simpler Workflows.
          </p>
          <p className="text-lg opacity-80 leading-relaxed -mt-8">
            <span className="font-bold text-blue-400">"myThera"</span>: With just one psychological assessment, we can build a custom AI model that helps you reflect on your life. And your data doesn't go anywhere. Ever.{' '}
            <a href="https://calendar.app.google/85ZdaqYK5vfNk4aH9" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Book a free 20-min call</a>
          </p>
          {user ? (
            <Link href="/#pricing" className="btn btn-primary btn-wide">Get Data Angel v1.0<FaRegSquareCaretDown className="animate-bounce ml-2 bg-secondary rounded-full" /> </Link>
          ) : (
            <ButtonSignin
              extraStyle="btn btn-primary btn-wide"
              text={`Get Data Angel v1.0`}
            />
          )}

        </div>
        <div className="lg:w-3/4">
          <Image
            src="/images/Transparent Logo.png"
            alt="Product Demo"
            className="w-full"
            priority={true}
            width={150}
            height={150}
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col items-center justify-center px-8 py-8 lg:py-20 lg:pt-4">
        <div className="hidden lg:block">
          <IntroVideo width={560 * 1.5} height={315 * 1.5} />
        </div>
        <div className="hidden md:block lg:hidden">
          <IntroVideo width={560} height={315} />
        </div>
        <div className="block md:hidden">
          <IntroVideo width={560 / 1.6} height={315 / 1.6} />
        </div>
      </section>
    </>
  );
};

export default Hero;
