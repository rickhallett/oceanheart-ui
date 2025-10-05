// Contact button for consultation model - no user accounts
const ButtonSignin = ({
  text = "Contact Kai",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  return (
    <a
      className={`btn ${extraStyle ? extraStyle : ""}`}
      href="mailto:kai@oceanheart.ai?subject=Interested in AI Coaching Services"
    >
      {text}
    </a>
  );
};

export default ButtonSignin;
