import { ReactNode } from "react";

// Dashboard layout - authentication checking temporarily disabled
// This is a server-side component to ensure the user is logged in.
// Authentication checking disabled during system transition
export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  // No authentication check during auth removal
  return <>{children}</>;
}
