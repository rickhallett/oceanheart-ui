"use client";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export const Switch = ({ checked, onChange, className, disabled = false }: SwitchProps) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        disabled
          ? "bg-zinc-800 cursor-not-allowed"
          : checked
          ? "bg-gold"
          : "bg-zinc-700",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full transition-transform",
          disabled ? "bg-zinc-600" : "bg-white",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
};
