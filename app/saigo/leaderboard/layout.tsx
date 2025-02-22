import { ReactNode } from "react";
import { guardLeaderboardPage } from "../lib/guard";

export default async function Layout({ children }: { children: ReactNode }) {
  await guardLeaderboardPage();
  return <>{children}</>;
}
