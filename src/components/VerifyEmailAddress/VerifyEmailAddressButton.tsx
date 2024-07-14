interface Props {
  onClick?: () => void;
}

function VerifyEmailAddressButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className="text-2xl font-bold">
      HERE
    </button>
  );
}

export default VerifyEmailAddressButton;
