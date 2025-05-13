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
  }, [hiddenKeyParam]);

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
              Copyright © {new Date().getFullYear()} - <a href="https://rickhallett.github.io/kaishin-roku/" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ textDecoration: "none" }}>All rights reserved</a>
            </p>

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
                  Offerings
                </Link>
                <Link href="https://www.oceanheart.blog/" target="_blank" rel="noopener noreferrer" className="link link-hover">
                  Blog
                </Link>
                <Link href="https://www.github.com/rickhallett/symbiotic-intelligence" target="_blank" rel="noopener noreferrer" className="link link-hover">
                  About Kai
                </Link>
              </div>
            </div>

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

const Footer = ({ showHDIForm = false }: FooterProps) => {
  return (
    <Suspense>
      <SuspendedFooter showHDIForm={showHDIForm} />
    </Suspense>
  )
}

export default Footer;
