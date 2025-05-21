"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import config from "@/config";
import logo from "@/app/icon.png";


interface FooterProps {
  showHDIForm?: boolean;
}

// Use Suspense to load useSearchParams() only on the client side
const SuspendedFooter = ({ showHDIForm = false }: FooterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [hiddenKey, setHiddenKey] = useState<string | null>(null);

  // Use effect to get the hidden key from search params
  useEffect(() => {
    setHiddenKey(searchParams?.get("hiddenKey") || null);
  }, [searchParams]);

  const privacyLink = hiddenKey ? `/privacy-policy?hiddenKey=${hiddenKey}` : "/privacy-policy";


  return (
    <footer className="bg-base-200 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            {/* Logo and App Name using config */}
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

          </div>
          <div className="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center">
            {/* LINKS Section - Update links if needed */}
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LINKS
              </div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                {config.resend.supportEmail && (
                  <a
                    href={`mailto:${config.resend.supportEmail}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover"
                    aria-label="Contact Support"
                  >
                    Support
                  </a>
                )}
                <Link href="/#pricing" className="link link-hover">
                  Offerings
                </Link>
                <Link href="https://www.oceanheart.blog/" target="_blank" rel="noopener noreferrer" className="link link-hover">
                  Blog
                </Link>
                <Link href="/about-alt" className="link link-hover">
                  About Kai
                </Link>
              </div>
            </div>

            {/* LEGAL Section - Keep as is */}
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                LEGAL
              </div>
              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link href="/tos" className="link link-hover">
                  Terms of Service
                </Link>
                <Link href={privacyLink} className="link link-hover">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Footer component wrapper with Suspense
const Footer = (props: FooterProps) => {
  return (
    <Suspense>
      <SuspendedFooter {...props} />
    </Suspense>
  );
};

export default Footer; 