// Contact-focused pricing - no self-service checkout
const ButtonCheckout = ({
  priceId,
  mode = "payment",
  disabled = false,
  donate = false,
  monzoLink,
  inDevelopment = false,
}: {
  priceId: string;
  mode?: "payment" | "subscription";
  disabled?: boolean;
  donate?: boolean;
  monzoLink?: string;
  inDevelopment?: boolean;
}) => {
  return (
    <a
      href="mailto:kai@oceanheart.ai?subject=Interested in AI Coaching Services&body=I'm interested in learning more about your services. Please share more details about pricing and next steps."
      className="btn btn-primary btn-block group"
    >
      Contact for Consultation
      {inDevelopment && <span className="text-xs text-gray-500">In Development</span>}
    </a>
  );
};

export default ButtonCheckout;
