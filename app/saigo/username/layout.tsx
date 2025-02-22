import { ReactNode } from "react";
import { guardUsernamePage } from "../lib/guard";

export default async function Layout({ children }: { children: ReactNode }) {
  await guardUsernamePage();
  return <>{children}</>;
}
