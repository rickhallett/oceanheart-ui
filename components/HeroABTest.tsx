"use client";

import { useEffect } from "react";
import { useABTest } from "@/libs/abTesting";
import Image from "next/image";
import ButtonSignin from "@/components/ButtonSignin";
import config from "@/config";
import { useState } from "react";
import { createClient } from "@/libs/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FaRegSquareCaretDown } from "react-icons/fa6";
import { IntroVideo } from "@/components/IntroVideo";

const TEST_ID = "hero_headline_test";

const HeroABTest = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User>(null);
  const { getVariant, recordEvent } = useABTest();
  const variant = getVariant(TEST_ID);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    // Record that this variant was viewed
    recordEvent(TEST_ID, "view");
  }, [supabase, recordEvent]);

  // Handle click tracking for CTA button
  const handleCTAClick = () => {
    recordEvent(TEST_ID, "click");
  };

  return (
    <>
      <style jsx>{`
        @keyframes burn {
          0% { text-shadow: 0 0 4px #ff3, 0 0 11px #ff3, 0 0 19px #ff3, 0 0 40px #ff5722, 0 0 80px #ff5722, 0 0 90px #ff5722, 0 0 100px #ff5722, 0 0 150px #ff5722; }
          20% { text-shadow: 0 0 4px #ff5, 0 0 10px #ff5, 0 0 18px #ff5, 0 0 38px #ff5722, 0 0 73px #ff5722, 0 0 80px #ff5722, 0 0 94px #ff5722, 0 0 140px #ff5722; }
          40% { text-shadow: 0 0 4px #ff8, 0 0 11px #ff8, 0 0 19px #ff8, 0 0 40px #ff5722, 0 0 80px #ff5722, 0 0 90px #ff5722, 0 0 100px #ff5722, 0 0 150px #ff5722; }
          60% { text-shadow: 0 0 4px #ffa, 0 0 10px #ffa, 0 0 18px #ffa, 0 0 38px #ff5722, 0 0 73px #ff5722, 0 0 80px #ff5722, 0 0 94px #ff5722, 0 0 140px #ff5722; }
          80% { text-shadow: 0 0 4px #ff3, 0 0 11px #ff3, 0 0 19px #ff3, 0 0 40px #ff5722, 0 0 80px #ff5722, 0 0 90px #ff5722, 0 0 100px #ff5722, 0 0 150px #ff5722; }
          100% { text-shadow: 0 0 4px #ff5, 0 0 10px #ff5, 0 0 18px #ff5, 0 0 38px #ff5722, 0 0 73px #ff5722, 0 0 80px #ff5722, 0 0 94px #ff5722, 0 0 140px #ff5722; }
        }
        .burning-text {
          animation: burn 1.5s infinite alternate;
          position: relative;
          color: #ff4500;
          font-weight: bold;
          display: inline-block;
          transform: perspective(400px) rotateX(10deg);
        }
        .burning-text::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -4px;
          right: -4px;
          bottom: -2px;
          background: radial-gradient(ellipse at center, rgba(255,69,0,0.2) 0%, rgba(255,69,0,0) 70%);
          z-index: -1;
          border-radius: 50%;
          filter: blur(8px);
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        .ethereal-text {
          background: linear-gradient(135deg, #60a5fa, #93c5fd);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        
        .ethereal-text::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -3px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.6), transparent);
        }
      `}</style>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-12 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-10 items-center justify-center text-center lg:text-left lg:items-center">
          <div className="relative">
            {variant === 'A' ? (
              // Variant A: Original headline
              <>
                <h1 className="font-extrabold text-5xl lg:text-7xl tracking-tight relative z-10">
                  Beyond the <span className="text-blue-400">Hype.</span>
                </h1>
                <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mt-2 relative z-10">
                  == Human-Centred <span className="text-blue-400">AI</span>
                </h2>
              </>
            ) : (
              // Variant B: Alternative headline
              <>
                <h1 className="font-extrabold text-5xl lg:text-7xl tracking-tight relative z-10">
                  Master the <span className="text-blue-400">Future.</span>
                </h1>
                <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mt-2 relative z-10">
                  Harness <span className="text-blue-400">AI</span> With Humanity
                </h2>
              </>
            )}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-base-200 rounded-full opacity-50 blur-xl z-0"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-xl z-0"></div>
          </div>

          <div className="flex flex-col gap-3 border-l-4 border-blue-400 pl-4 py-2">
            <p className="text-xl font-semibold">
              Rick &quot;Kai&quot; Hallett
            </p>
            <p className="text-md opacity-80">
              Psychotherapist & Software Engineer
            </p>
            <p className="text-md opacity-80 italic">
              Helping Leaders Navigate the Future
            </p>
          </div>

          <h3 className="font-bold text-xl mb-3 text-blue-400 relative z-10">Escape Tutorial <span className="burning-text">Hell</span></h3>
          <h4 className="font-bold text-xl mb-3 text-white-400 relative z-10">Learn from first principles <br />intuitively... </h4>
          <p className="text-xl mb-5 text-white-400 relative z-10">& become an <span className="text-blue-400">&quot;AI Native&quot;</span></p>

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
              onClick={handleCTAClick}
            >
              Book a free 20-min call
            </a>
          </div>
        </div>
        <div className="lg:w-2/5 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-40 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-base-200 rounded-full opacity-50 blur-xl"></div>
          <Image
            src="/images/Transparent Logo.png"
            alt="Richard Hallett"
            className="w-full rounded-xl relative z-10"
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col items-center justify-center px-8 py-8 lg:py-4 lg:pb-16">
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

export default HeroABTest; 