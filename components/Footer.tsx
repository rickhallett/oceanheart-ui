"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import dotenv from "dotenv";
import config from "@/config";
import logo from "@/app/icon.png";

dotenv.config();

interface FooterProps {
  showHDIForm?: boolean;
}

// HDI Name Form Component
const HDINameForm = () => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter a name");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch('/api/hdi/names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (data.success) {
        setName("");
        setMessage("Name added successfully!");
        setMessageType("success");
      } else {
        setMessage(data.error || "Failed to add name");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-base-300 rounded-lg">
      <h4 className="text-sm font-bold mb-2">Suggest a name for HDI</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Holistic Data Integration"
          className="input input-sm input-bordered w-full"
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className={`btn btn-sm btn-primary ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            Submit
          </button>
          {message && (
            <span className={`text-xs ${messageType === 'success' ? 'text-success' : 'text-error'}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.resend.supportEmail, the link won't be displayed.

const SuspendedFooter = ({ showHDIForm = false }: FooterProps) => {
  const hiddenKeyParam = useSearchParams().get("hiddenKey");
  const [hiddenKey, setHiddenKey] = useState<string>("");
  const pathname = usePathname();
  const privacyLink = hiddenKey ? config.auth.saigo.loginUrl + `?hiddenKey=${hiddenKeyParam}` : "/privacy-policy";

  useEffect(() => {
    const checkSaigoKey = async () => {
      console.log("🔑 Checking Saigo key");

      console.log("🔑 Hidden key param:", hiddenKeyParam);
      if (!hiddenKeyParam) {
        console.log("🔑 No hidden key param found");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/saigo/key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hiddenKeyParam
        })
      });
      const data = await res.json();
      if (data.success) {
        console.log("🔑 Successfully checked Saigo key");
        setHiddenKey(hiddenKeyParam);
      }
    }
    checkSaigoKey();
  }, []);

  return (
    <footer className="bg-base-200 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href="/#"
              aria-current="page"
              className="flex gap-2 justify-center md:justify-start items-center"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                priority={true}
                className="w-6 h-6"
                width={24}
                height={24}
              />
              <strong className="font-extrabold tracking-tight text-base md:text-lg">
                {config.appName}
              </strong>
            </Link>

            <p className="mt-3 text-sm text-base-content/80">
              {config.appDescription}
            </p>
            <p className="mt-3 text-sm text-base-content/60">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>

            {/* Show HDI Name Form if on HDI page */}
            {showHDIForm && pathname.includes('/hdi') && <HDINameForm />}

            <a
              href="https://www.oceanheart.ai/?ref=oceanheart_badge"
              title="Go to Oceanheart"
              target="_blank"
              className="mt-4 inline-block cursor-pointer rounded bg-neutral px-2 py-1 text-sm text-neutral-content ring-1 ring-base-content/10 duration-200 hover:ring-neutral"
            >
              <div className="flex items-center gap-1">
                <span className="opacity-90">Built with</span>
                <span className="flex items-center gap-0.5 font-semibold tracking-tight">
                  <svg
                    fill="#29aedb"
                    height="15px"
                    width="15px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 471.701 471.701"
                    stroke="#29aedb"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <span className="ml-4">
                    &nbsp;at oceanheart.ai
                  </span>
                </span>
              </div>
            </a>
          </div>
          <div className="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LINKS
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                {config.resend.supportEmail && (
                  <a
                    href={`mailto:${config.resend.supportEmail}`}
                    target="_blank"
                    className="link link-hover"
                    aria-label="Contact Support"
                  >
                    Support
                  </a>
                )}
                <Link href="/#pricing" className="link link-hover">
                  Pricing
                </Link>
                <Link href="/blog" className="link link-hover">
                  Blog
                </Link>
                {/* <a href="/#" target="_blank" className="link link-hover">
                  Affiliates
                </a> */}
              </div>
            </div>

            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LEGAL
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link href="/tos" className="link link-hover">
                  Terms of services
                </Link>
                <Link href={privacyLink} className="link link-hover">
                  Privacy policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Footer = ({ showHDIForm = false }: FooterProps) => {
  return (
    <Suspense>
      <SuspendedFooter showHDIForm={showHDIForm} />
    </Suspense>
  )
}

export default Footer;
