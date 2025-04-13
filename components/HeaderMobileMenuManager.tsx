"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface HeaderMobileMenuManagerProps {
  setIsOpen: (isOpen: boolean) => void;
}

// This component exists solely to contain the useSearchParams hook
// and the effect that depends on it, allowing the main Header
// to be statically rendered where possible.
const HeaderMobileMenuManager = ({ setIsOpen }: HeaderMobileMenuManagerProps): null => {
  const searchParams = useSearchParams();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [searchParams, setIsOpen]);

  // This component doesn't render anything itself
  return null;
};

export default HeaderMobileMenuManager; 