"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

interface ModalContextProps {
  openId: string;
  openModal: (id: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

function Modal({ children }) {
  const [openId, setOpenId] = useState<string>("");

  const openModal = setOpenId;

  const closeModal = () => setOpenId("");

  return (
    <ModalContext.Provider value={{ openId, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => openModal(opens) });
}

function Window({ name, children }) {
  const { closeModal, openId } = useContext(ModalContext);

  const reference = useClickOutside({ close: closeModal, StopBubbling: true });

  if (name !== openId) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div ref={reference} className={styles.modal}>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

Modal.Open = Open;

Modal.Window = Window;

export default Modal;
