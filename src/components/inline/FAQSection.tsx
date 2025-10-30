import { useState } from 'react';

const faqs = [
  {
    question: '📦 Return Policy',
    answer:
      '30-day trial period. Return in good condition for a full refund. Ship to: 6776 Townsend Rd, Lot 199, Jacksonville, FL 32244. Include name used for order. Brace must be free of animal hair and undamaged.',
  },
  {
    question: '💳 Insurance & HSA/FSA',
    answer:
      'Typically covered by insurance. Call your insurance (number on card) and ask about coverage for code L2136. We accept FSA/HSA cards directly. Most patients purchase first, then submit our invoice for reimbursement—the quickest way to get covered.',
  },
  {
    question: '💰 Financing',
    answer:
      '0% interest financing up to 6 months through Shop Pay and Affirm. Instant approval, no hidden fees.',
  },
  {
    question: '🚚 Shipping',
    answer:
      'USA: Free 2-3 day delivery. Ships same day if ordered before 2pm EST. Expedited: $50\nCanada: Standard $20, Expedited $60\nInternational: Worldwide shipping available. Price calculated at checkout (duties may apply).',
  },
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 bg-white" id="faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#333]">Quick Answers</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-2 border-[#e0e0e0] rounded-lg overflow-hidden transition-all duration-250 hover:border-[#2e7d32]"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="bg-none border-none w-full text-left p-5 text-lg lg:text-xl font-semibold text-[#333] cursor-pointer flex justify-between items-center transition-colors duration-250 hover:text-[#2e7d32]"
              >
                <span>{faq.question}</span>
                <span
                  className={`text-xl transition-transform duration-250 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 pb-5 px-5' : 'max-h-0 p-0'
                }`}
              >
                <p className="text-base lg:text-lg leading-relaxed text-[#666] whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.freedomleg.com/pages/frequently-asked-questions"
            className="inline-block px-8 py-4 text-base font-bold uppercase tracking-wider rounded-lg border-2 border-[#e0e0e0] cursor-pointer transition-all duration-250 bg-[rgba(255,255,255,0.98)] text-[#333] hover:bg-[rgba(46,125,50,0.95)] hover:text-white hover:border-[#2e7d32] hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All FAQs
          </a>
        </div>
      </div>
    </section>
  );
}
