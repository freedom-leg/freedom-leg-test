import { useState } from 'react';

const slides = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom_Leg_3_How_it_Works.jpg',
    label: 'How it Works',
    description: 'The Freedom Leg transfers weight from your injured leg to your healthy leg through a knee pad system.',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_1.png',
    label: 'Adjust and Attach',
    description: 'Simply adjust the brace to your measurements and secure it with the easy-to-use straps.',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/fit_the_Freedom_Leg_2.png',
    label: 'First Steps',
    description: 'Take your first hands-free steps with confidence. The brace provides full weight support.',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Walking_in_Kitchen.png',
    label: 'Regain your Freedom',
    description: 'Walk freely, climb stairs, and return to your daily activities without crutches.',
  },
];

export function HowItWorksSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-12 px-4 bg-[#f5f5f5]" id="how-it-works">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#333]">How It Works</h2>

        <div className="relative">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].label}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center cursor-pointer text-xl lg:text-2xl text-[#333] transition-all duration-250 hover:bg-[#2e7d32] hover:text-white hover:border-[#2e7d32]"
              aria-label="Previous slide"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.9)] border-2 border-[#e0e0e0] rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center cursor-pointer text-xl lg:text-2xl text-[#333] transition-all duration-250 hover:bg-[#2e7d32] hover:text-white hover:border-[#2e7d32]"
              aria-label="Next slide"
            >
              ❯
            </button>
          </div>

          <div className="text-center mt-6">
            <h3 className="text-2xl font-bold text-[#333] mb-3">{slides[currentSlide].label}</h3>
            <p className="text-lg text-[#666] leading-relaxed max-w-2xl mx-auto">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-250 ${
                  currentSlide === index ? 'bg-[#2e7d32] w-8' : 'bg-[#ddd]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
