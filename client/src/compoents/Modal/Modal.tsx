import { ModalI } from "../../types/components/ModalI";

function Modal({ children, closeAction, state }: ModalI) {
  return (
    <div
      className={state ? "modal-bg active" : "modal-bg"}
      onClick={closeAction}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
