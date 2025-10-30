import { useState, useEffect } from 'react';

const slides = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom-Leg-Hand-Holding-Photo.jpg',
    title: 'Keep on Living. Ditch the Crutches.',
    subtitle: '100% non-weightbearing support for your injured leg',
    zoomClass: 'zoom-1',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Freedom-Leg-Lifting-up.jpg',
    title: 'Walk Hands-Free During Recovery',
    subtitle: 'Takes 100% of weight off your injured leg',
    zoomClass: 'zoom-2',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Walking-Daughter-587818.jpg',
    title: 'Regain Your Freedom',
    subtitle: 'Crutch-free mobility with full weight support',
    zoomClass: 'zoom-3',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-[800ms] ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } ${index === currentSlide ? slide.zoomClass : ''}`}
            style={{ backgroundImage: `url(${slide.image})`, willChange: 'transform' }}
          />
        ))}
      </div>
      <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 text-center text-white z-10 w-[90%] max-w-[800px] lg:pb-20">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`transition-opacity duration-[800ms] absolute w-full bottom-0 left-0 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h1 className="text-[2.5em] lg:text-[3.8em] font-bold mb-[15px] [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)] leading-[1.2]">
              {slide.title}
            </h1>
            <p className="text-[1.25em] lg:text-[1.4em] font-normal [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)] leading-[1.4]">
              {slide.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
