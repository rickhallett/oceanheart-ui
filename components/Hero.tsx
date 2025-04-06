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
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-12 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-10 items-center justify-center text-center lg:text-left lg:items-center">
          <div className="relative">
            <h1 className="font-extrabold text-5xl lg:text-7xl tracking-tight relative z-10">
              Beyond the <span className="text-blue-400">Hype</span>
            </h1>
            <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mt-2 relative z-10">
              Human-Centred <span className="text-blue-400">AI</span>
            </h2>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-base-200 rounded-full opacity-50 blur-xl z-0"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-xl z-0"></div>
          </div>

          <div className="flex flex-col gap-3 border-l-4 border-blue-400 pl-4 py-2">
            <p className="text-xl font-semibold">
              Richard Hallett
            </p>
            <p className="text-md opacity-80">
              Psychotherapist & Software Engineer
            </p>
            <p className="text-md opacity-80 italic">
              Helping Leaders Navigate the Future
            </p>
          </div>

          <div className="bg-base-200 p-6 rounded-lg shadow-sm max-w-xl">
            <p className="text-lg opacity-90 leading-relaxed">
              The arrival of AI presents immense possibilities alongside profound challenges. How do we harness these tools while preserving human connection and ethical practice?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative">
              {/* <Image
                src="/images/logo_v1.png"
                alt="Richard Hallett"
                width={140}
                height={140}
                className="rounded-full border-4 border-blue-100 shadow-md"
              /> */}
              {/* <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white text-xl font-bold">R</div> */}
            </div>
            <a
              href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Book a free 20-min call
            </a>
          </div>

          {user ? (
            <Link
              href="/#features"
              className="btn btn-outline btn-wide btn-lg group transition-all duration-300 mt-4"
            >
              Explore My Approach
              <FaRegSquareCaretDown className="ml-2 group-hover:animate-bounce" />
            </Link>
          ) : (
            <ButtonSignin
              extraStyle="btn btn-outline btn-wide btn-lg mt-4"
              text={`Explore My Approach`}
            />
          )}
        </div>
        <div className="lg:w-2/5 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-40 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-base-200 rounded-full opacity-50 blur-xl"></div>
          <Image
            src="/images/Transparent Logo.png"
            alt="Richard Hallett"
            className="w-full rounded-xl shadow-xl relative z-10 border border-base-200"
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col items-center justify-center px-8 py-8 lg:py-16">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <div className="hidden lg:block">
            <IntroVideo width={560 * 1.2} height={315 * 1.2} />
          </div>
          <div className="hidden md:block lg:hidden">
            <IntroVideo width={560} height={315} />
          </div>
          <div className="block md:hidden">
            <IntroVideo width={560 / 1.6} height={315 / 1.6} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
