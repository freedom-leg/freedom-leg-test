const reviews = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Customer_review_photo_Lee_Partyka.jpg',
    quote:
      'This is the best thing ever if you have to have a no weight bearing restrictions like I have for eight weeks. This should be a standard offering after surgery, even my orthopedic doctor was impressed',
    author: 'Lee Partyka — Bunion surgery',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/Customer_review_photo_Jeff_higgins.jpg',
    quote:
      'Freedom Leg Rocks! I am 4 weeks non-weight bearing following Achilles surgery last week. I use the Freedom Leg to get up and down stairs at home and use it for walks of up to a mile each day. I am very pleased with the product, it is well engineered, the components are very good and highly adjustable.',
    author: 'Jeff Higgins — Achilles surgery',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0425/6173/2773/files/image-2.png',
    quote:
      'The Freedom Leg has helped me stay on my job as a gymnastics coach. That would have been impossible with crutches and my knee couldn\'t take the pressure of a knee walker or iWalkfree.',
    author: 'Patty Steele — Knee surgery',
  },
];

export function ReviewSection() {
  return (
    <section className="py-[30px_15px_20px] lg:py-[40px_20px_30px] bg-[rgba(245,245,245,0.5)]">
      <a
        href="https://www.freedomleg.com/products/freedom-leg-brace#judgeme_product_reviews"
        className="block text-center text-[0.9em] text-[#333] mb-[15px] cursor-pointer transition-colors duration-250 no-underline hover:text-[#2e7d32] pt-5"
      >
        ⭐⭐⭐⭐⭐ 4.8/5 · 200+ reviews
      </a>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[15px] lg:gap-5 max-w-[1200px] mx-auto px-[15px] lg:px-5">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.98)] backdrop-blur-[10px] border-2 border-[#e0e0e0] rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          >
            <img
              src={review.image}
              alt="Customer review"
              className="w-full h-[350px] lg:h-[450px] object-cover object-center rounded-md mb-[15px]"
            />
            <div className="text-[#2e7d32] text-[1.1em] mb-3">⭐⭐⭐⭐⭐</div>
            <p className="text-base leading-[1.6] text-[#333] mb-[15px] italic">{review.quote}</p>
            <div className="text-[0.9em] text-[#666] font-semibold">{review.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
