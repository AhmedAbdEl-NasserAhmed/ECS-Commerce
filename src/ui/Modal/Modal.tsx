import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

interface ModalContextProps {
  openId: string;
  openModal: (id: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextProps>(undefined);

function Modal({ children }) {
  const [openId, setOpenId] = useState<string>("");

  const openModal = setOpenId;

  const close = () => setOpenId("");

  return (
    <ModalContext.Provider value={{ openId, openModal, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ id, children }) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, () => openModal(id));
}

function Window({ id, children }) {
  const { close, openId } = useContext(ModalContext);

  if (id !== openId) return null;

  return createPortal(
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>,
    document.getElementById("modal")
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
