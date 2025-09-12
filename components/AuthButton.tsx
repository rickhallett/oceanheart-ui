"use client";

type AuthButtonProps = {
  mode?: "signin" | "account";
  text?: string;
  extraStyle?: string;
};

/**
 * Contact button - no user authentication needed
 * Always shows contact CTA for consultation-driven model
 */
const AuthButton = ({
  mode = "signin",
  text = "Contact Kai",
  extraStyle = "",
}: AuthButtonProps) => {
  return (
    <a
      className={`btn ${extraStyle}`}
      href="mailto:kai@oceanheart.ai?subject=Interested in AI Coaching Services"
    >
      {text}
    </a>
  );
};

export default AuthButton;
