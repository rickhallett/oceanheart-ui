import { ReactNode } from "react";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `Generate Your Username - ${config.appName}`,
  canonicalUrlRelative: "/saigo/username",
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
