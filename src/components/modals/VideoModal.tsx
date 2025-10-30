import { Modal, ModalFooter } from './Modal';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

export function VideoModal({ isOpen, onClose, onOpenOrderModal }: VideoModalProps) {
  const handleOrderClick = () => {
    onClose();
    onOpenOrderModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} progressStep="Learn">
      <div className="p-0">
        <h2 className="px-[22px] pt-5 pb-[15px] m-0 text-[1.4em]">See What Doctors Are Saying</h2>
        <div className="relative pb-[56.25%] h-0 overflow-hidden m-0">
          {isOpen && (
            <iframe
              src="https://youtube.com/embed/rM1DegIynKM?autoplay=1&mute=1&controls=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-none"
            />
          )}
        </div>
      </div>
      <ModalFooter>
        <button
          onClick={handleOrderClick}
          className="inline-block px-5 py-3 text-[0.85em] font-bold uppercase tracking-[0.08em] rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(46,125,50,0.95)] hover:text-white hover:border-[#2e7d32]"
        >
          I'm ready to order
        </button>
      </ModalFooter>
    </Modal>
  );
}
