"use client";

import Image from "next/image";
import ButtonSignin from "@/components/ButtonSignin";
import config from "@/config";
import { useEffect, useState } from "react";
import { createClient } from "@/libs/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { FaRegSquareCaretDown, FaChevronDown } from "react-icons/fa6";

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
      `}</style>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-12 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-10 items-center justify-center text-center lg:text-left lg:items-center">
          <div className="relative">
            <h1 className="font-extrabold text-5xl lg:text-7xl tracking-tight relative z-10">
              The Art of Personal <span className="text-blue-400">AI</span>
            </h1>
            <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mt-2 relative z-10">
              Conscious AI <span className="text-blue-400">Integration</span>
            </h2>
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
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-5 shadow-lg max-w-2xl">
            <div className="bg-base-100 bg-opacity-95 rounded-lg p-4 shadow-inner">
              <h3 className="font-bold text-2xl mb-2 text-blue-500">
                Stop Drowning in AI Courses
              </h3>
              <div className="w-3/4 h-1 bg-gradient-to-r from-blue-400 to-transparent mx-auto mb-3"></div>
              <p className="text-lg font-medium mb-2">
                Get Clear, Actionable AI Guidance Now
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <div className="badge badge-primary badge-lg">Attune</div>
                <div className="badge badge-primary badge-lg">Embody</div>
                <div className="badge badge-primary badge-lg">Amplify</div>
              </div>
            </div>
          </div>

          <p className="text-xl text-white-400 relative z-10">10x your ability to leverage <span className="text-blue-400">AI</span> with genuine insight</p>

          <Link
            href="#features"
            className="btn btn-outline btn-wide group transition-all duration-300 mt-2"
          >
            Explore My Approach
            <FaChevronDown className="ml-2 group-hover:animate-bounce" />
          </Link>
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

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-8 py-12">
        <div className="bg-base-100 shadow-lg rounded-xl p-8 text-center border border-blue-100">
          <h3 className="text-3xl font-semibold mb-4 text-blue-400">Ready to Make Sense of AI? Let&apos;s Talk.</h3>
          <p className="text-xl mb-6">Book a Free 20-Minute Clarity Call</p>
          <a
            href="/schedule?utm_campaign=landing_test"
            id="schedule-call-button"
            className="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-all duration-300 px-8"
          >
            Schedule Your Free Call Now
          </a>
          <p className="text-sm mt-4 opacity-80 max-w-lg mx-auto">
            No obligation, just a chance to see how I can help you navigate the AI revolution. Choose a time that works for you, or send me a written message if you prefer.
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;
