import { useState } from 'react';
import { StarRating } from '../../components/StarRating';

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'shipping', label: 'Shipping & Returns' },
  { id: 'reviews', label: 'Reviews' },
];

const FEATURES = [
  'Handcrafted with premium full-grain leather',
  'Breathable mesh lining for all-day comfort',
  'Durable rubber outsole with urban tread pattern',
  'Cushioned insole with arch support',
];

const MOCK_REVIEWS = [
  { id: 1, name: 'Rahul M.', rating: 5, date: '2 weeks ago', text: 'Best trekking shoes I have owned. The comfort is unreal and they look even better in person.' },
  { id: 2, name: 'Priya K.', rating: 4, date: '1 month ago', text: 'Great build quality. Took them on a 10km city walk and zero blisters. Sizing is true to fit.' },
  { id: 3, name: 'Arjun S.', rating: 5, date: '2 months ago', text: 'The attention to detail is incredible. The gold accents pop and the leather feels premium.' },
  { id: 4, name: 'Neha R.', rating: 4, date: '3 months ago', text: 'Stylish and functional. Got compliments everywhere. Worth the price for the quality.' },
];

export function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="px-4 md:px-[4vw] py-12 md:py-20 border-t border-[#2a2520]/10">
      <div className="max-w-4xl">
        <div className="flex gap-8 md:gap-12 border-b border-[#2a2520]/10 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-xs md:text-sm tracking-[0.2em] transition-all relative ${
                activeTab === tab.id
                  ? 'text-[#2a2520] font-medium'
                  : 'opacity-30 hover:opacity-60'
              }`}
            >
              {tab.label.toUpperCase()}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2a2520]" />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[160px]">
          {activeTab === 'description' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <div>
                <p className="text-sm md:text-base opacity-70 leading-relaxed">
                  {product.description || 'Premium urban trekking footwear designed for the modern explorer. Crafted with high-quality materials and cutting-edge design for all-day comfort and style.'}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] opacity-40 mb-4">FEATURES</p>
                <ul className="space-y-3">
                  {FEATURES.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm opacity-70">
                      <span className="w-1.5 h-1.5 bg-[#c4a35a] mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm opacity-70 leading-relaxed">
              <div className="p-6 border-2 border-[#2a2520]/10">
                <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">DOMESTIC</p>
                <p className="font-medium text-base mb-1">3-5 Business Days</p>
                <p>Free on orders over Rs. 5,000</p>
              </div>
              <div className="p-6 border-2 border-[#2a2520]/10">
                <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">INTERNATIONAL</p>
                <p className="font-medium text-base mb-1">7-14 Business Days</p>
                <p>Rates calculated at checkout</p>
              </div>
              <div className="p-6 border-2 border-[#2a2520]/10">
                <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">RETURNS</p>
                <p className="font-medium text-base mb-1">30-Day Window</p>
                <p>Unworn items with original tags</p>
              </div>
              <div className="p-6 border-2 border-[#2a2520]/10">
                <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">EXCHANGES</p>
                <p className="font-medium text-base mb-1">Free Size Exchanges</p>
                <p>Available within India</p>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#2a2520]/10">
                <div className="text-4xl font-semibold">4.5</div>
                <div>
                  <StarRating rating={4} />
                  <p className="text-xs opacity-40 mt-1">Based on {MOCK_REVIEWS.length} reviews</p>
                </div>
              </div>
              <div className="space-y-6">
                {MOCK_REVIEWS.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-[#2a2520]/5 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2a2520]/10 flex items-center justify-center text-xs font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{review.name}</p>
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <span className="text-[10px] opacity-30 tracking-wider">{review.date}</span>
                    </div>
                    <p className="text-sm opacity-70 leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
