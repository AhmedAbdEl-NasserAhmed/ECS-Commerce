import Modal from "@/ui/Modal/Modal";
import VerifyEmailAddressButton from "./VerifyEmailAddressButton";
import VerifyEmailAddressPage from "./VerifyEmailAddressPage";

function VerifyEmailAddress() {
  return (
    <Modal>
      <Modal.Open opens="verifyEmail">
        <VerifyEmailAddressButton />
      </Modal.Open>
      <Modal.Window name="verifyEmail">
        <VerifyEmailAddressPage />
      </Modal.Window>
    </Modal>
  );
}

export default VerifyEmailAddress;
