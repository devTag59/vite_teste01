type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose} // fecha ao clicar fora
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
      >
        <button onClick={onClose} className="modal-close">
          X
        </button>

        {children}
      </div>
    </div>
  );
}
