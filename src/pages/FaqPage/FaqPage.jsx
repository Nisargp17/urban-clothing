import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';

const FAQS = [
  { question: 'What is your return policy?', answer: 'We offer a 30-day return policy on all unworn items with original tags attached. Returns are free within India. International returns may incur shipping charges.' },
  { question: 'How long does shipping take?', answer: 'Domestic orders are delivered within 3-5 business days. International orders take 7-14 business days depending on the destination. Express shipping is available at checkout.' },
  { question: 'What sizes do you offer?', answer: 'Our shoes are available in US sizes 7 through 11. Each product page includes a detailed size guide to help you find the perfect fit.' },
  { question: 'Are your products sustainable?', answer: 'Yes, we are committed to sustainability. Our shoes use recycled materials where possible, and our packaging is 100% biodegradable.' },
  { question: 'How do I care for my Urban shoes?', answer: 'We recommend using a soft brush to remove dirt and a damp cloth for stains. Avoid machine washing. Store in a cool, dry place away from direct sunlight.' },
  { question: 'Do you offer exchanges?', answer: 'Yes, size exchanges are free within India. Simply initiate an exchange from your order page and we will send the new size with pickup of the original.' },
];

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#2a2520]/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 md:py-7 text-left group"
      >
        <span className={`text-base md:text-lg font-medium pr-8 transition-all duration-300 ${isOpen ? 'text-[#2a2520]' : 'opacity-80'}`}>
          {question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 border-2 flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'rotate-45 bg-[#2a2520] text-white border-[#2a2520]' : 'border-[#2a2520]/30 group-hover:border-[#2a2520]'
        }`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm md:text-base opacity-60 leading-relaxed pr-12 max-w-2xl">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <SEO title="FAQ" description="Frequently asked questions about Urban Clothing." pathname="/faq" />
      <div className="min-h-screen pt-20 md:pt-24">
        <div className="px-4 md:px-[6vw] max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-2">SUPPORT</p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-[0.95] mb-3">FAQ</h1>
            <p className="text-sm md:text-base opacity-60 max-w-md">
              Everything you need to know about shipping, returns, sizing, and more.
            </p>
          </div>

          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 md:p-10 border-2 border-[#2a2520]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-xs tracking-[0.2em] opacity-40 mb-2">STILL HAVE QUESTIONS?</p>
                <p className="text-lg md:text-xl font-medium">Our team is here to help.</p>
              </div>
              <Link
                to="/contact"
                className="px-8 py-3 bg-[#2a2520] text-white text-sm tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all duration-300"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
