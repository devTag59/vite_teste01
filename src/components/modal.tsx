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
       <div className="
       w-full
       h-full
       backdrop-blur-md
       bg-white-950
       absolute
       top-0
       left-0
       flex
       flex-col
       center
       justify-center
       items-center
       ">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
      >
</div>
        {children}
      </div>
    </div>
  );
}
