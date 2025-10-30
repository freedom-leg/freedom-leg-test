import { useState } from 'react';
import { Modal, ModalBody } from './Modal';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const slides = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom_Leg_3_How_it_Works.jpg',
    label: 'How it Works',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_1.png',
    label: 'Adjust and Attach',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_2.png',
    label: 'First Steps',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Walking_in_Kitchen.png',
    label: 'Regain your Freedom',
  },
];

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} progressStep="Learn">
      <ModalBody>
        <div className="flex flex-col lg:flex-row items-center gap-[10px] lg:gap-[15px] relative">
          <div className="w-full text-center">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].label}
              className="w-full max-w-full h-auto rounded-lg"
            />
            <div className="mt-[15px] text-[1.2em] font-bold text-[#333]">
              {slides[currentSlide].label}
            </div>
          </div>
          <div className="flex lg:absolute lg:w-full lg:top-1/2 lg:-translate-y-1/2 gap-5 justify-center lg:justify-between lg:px-[10px] mt-[10px] lg:mt-0 lg:pointer-events-none">
            <button
              onClick={prevSlide}
              className="bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer text-[1.5em] text-[#333] transition-all duration-250 hover:bg-[#2e7d32] hover:text-white hover:border-[#2e7d32] lg:pointer-events-auto"
              aria-label="Previous slide"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer text-[1.5em] text-[#333] transition-all duration-250 hover:bg-[#2e7d32] hover:text-white hover:border-[#2e7d32] lg:pointer-events-auto"
              aria-label="Next slide"
            >
              ❯
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-[10px] h-[10px] rounded-full border-none cursor-pointer transition-all duration-250 ${
                currentSlide === index ? 'bg-[#2e7d32]' : 'bg-[#ddd]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
}
