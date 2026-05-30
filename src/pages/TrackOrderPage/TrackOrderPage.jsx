import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatPrice';
import { SEO } from '../../components/SEO';
import { TextScramble } from '../../components/TextScramble';

const STAGES = [
  { id: 'placed', label: 'Order Placed', description: 'Your order has been received and is being prepared.' },
  { id: 'processing', label: 'Processing', description: 'Your order is being packed and quality-checked.' },
  { id: 'shipped', label: 'Shipped', description: 'Your order has left our warehouse and is on its way.' },
  { id: 'out-for-delivery', label: 'Out for Delivery', description: 'Your order is with the courier and will arrive today.' },
  { id: 'delivered', label: 'Delivered', description: 'Your order has been delivered. Enjoy your purchase!' },
];

function hashToNumber(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
}

function generateMockOrder(orderId) {
  const productIndex = hashToNumber(orderId, PRODUCTS.length);
  const product = PRODUCTS[productIndex];
  const stageIndex = Math.min(hashToNumber(orderId + 'stage', STAGES.length), 3); // max "out for delivery"
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - (STAGES.length - stageIndex));

  const timeline = STAGES.map((stage, i) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + i);
    return {
      ...stage,
      date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      completed: i <= stageIndex,
      active: i === stageIndex,
    };
  });

  return {
    id: orderId.toUpperCase(),
    product,
    quantity: hashToNumber(orderId + 'qty', 3) + 1,
    size: ['US 7', 'US 8', 'US 9', 'US 10'][hashToNumber(orderId + 'size', 4)],
    status: STAGES[stageIndex].label,
    estimatedDelivery: timeline[timeline.length - 1].date,
    timeline,
  };
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resultRef = useRef(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Please enter an order number');
      return;
    }
    setError('');
    setLoading(true);
    setOrder(null);

    // Simulate API delay
    setTimeout(() => {
      const mock = generateMockOrder(orderId.trim());
      setOrder(mock);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    if (order && resultRef.current) {
      gsap.fromTo(
        resultRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [order]);

  return (
    <>
      <SEO title="Track Order" pathname="/track-order" />

      <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-[4vw]">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-3">SHIPPING STATUS</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.95] mb-4">
            <TextScramble text="TRACK YOUR" className="block" delay={0} />
            <TextScramble text="ORDER" className="block" delay={300} />
          </h1>
          <p className="text-sm md:text-base opacity-50 max-w-md mx-auto">
            Enter your order number to see the current status and estimated delivery date.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrack} className="max-w-xl mx-auto mb-16">
          <div className="flex items-center border-2 border-[#2a2520]">
            <input
              type="text"
              value={orderId}
              onChange={(e) => { setOrderId(e.target.value); setError(''); }}
              placeholder="e.g. URB-2025-8842"
              className="flex-1 bg-transparent px-5 py-4 text-sm md:text-base outline-none placeholder:opacity-30"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-14 px-8 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all disabled:opacity-50"
            >
              {loading ? 'SEARCHING...' : 'TRACK'}
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-600 mt-2 ml-1">{error}</p>
          )}
          <p className="text-[10px] opacity-30 mt-2 ml-1">
            Try any order number — demo mode generates realistic tracking data.
          </p>
        </form>

        {/* Results */}
        {order && (
          <div ref={resultRef} className="max-w-4xl mx-auto">
            {/* Order Summary Card */}
            <div className="border-2 border-[#2a2520] bg-[#e8ddd0]/30 p-5 md:p-8 mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] tracking-[0.3em] opacity-40 mb-1">ORDER NUMBER</p>
                  <p className="text-xl md:text-2xl font-semibold font-mono">{order.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] tracking-[0.2em] px-3 py-1 font-medium ${
                    order.timeline[order.timeline.length - 1].completed
                      ? 'bg-[#2a2520] text-white'
                      : 'bg-[#c4a35a] text-[#2a2520]'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 pb-6 border-b border-[#2a2520]/10">
                <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-[#2a2520] overflow-hidden flex-shrink-0">
                  <img src={order.product.img} alt={order.product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs tracking-[0.2em] opacity-40 mb-1">{order.product.category}</p>
                  <h3 className="text-lg md:text-xl font-semibold truncate">{order.product.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm">
                    <span className="opacity-60">Qty: {order.quantity}</span>
                    <span className="opacity-30">|</span>
                    <span className="opacity-60">Size: {order.size}</span>
                    <span className="opacity-30">|</span>
                    <span className="font-medium">{formatPrice(order.product.newPrice * order.quantity)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-5">
                <div>
                  <p className="text-[10px] tracking-[0.2em] opacity-40 mb-0.5">ESTIMATED DELIVERY</p>
                  <p className="text-sm md:text-base font-medium">{order.estimatedDelivery}</p>
                </div>
                <Link
                  to={`/product/${order.product.id}`}
                  className="text-xs tracking-[0.15em] underline opacity-50 hover:opacity-100 transition-opacity"
                >
                  VIEW PRODUCT →
                </Link>
              </div>
            </div>

            {/* Timeline */}
            <div className="border-2 border-[#2a2520] bg-[#f5efe6] p-5 md:p-8">
              <p className="text-[10px] tracking-[0.3em] opacity-40 mb-8">TRACKING TIMELINE</p>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[11px] md:left-[13px] top-2 bottom-2 w-[2px] bg-[#2a2520]/10" />

                <div className="space-y-8">
                  {order.timeline.map((stage, index) => (
                    <div key={stage.id} className="relative flex items-start gap-4 md:gap-6">
                      {/* Dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          stage.completed
                            ? stage.active
                              ? 'bg-[#c4a35a] border-[#c4a35a]'
                              : 'bg-[#2a2520] border-[#2a2520]'
                            : 'bg-[#f5efe6] border-[#2a2520]/20'
                        }`}>
                          {stage.completed && !stage.active && (
                            <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {stage.active && (
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#2a2520] rounded-full animate-pulse" />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`flex-1 pb-2 transition-opacity duration-500 ${stage.completed ? 'opacity-100' : 'opacity-30'}`}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                          <h4 className="text-sm md:text-base font-semibold">{stage.label}</h4>
                          <span className="text-[10px] md:text-xs opacity-40 tracking-wider">
                            {stage.date} at {stage.time}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm opacity-60 mt-1">{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
              <Link
                to="/shop"
                className="px-8 py-3 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
              >
                CONTINUE SHOPPING
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-[#2a2520] text-xs tracking-[0.2em] font-medium hover:bg-[#2a2520] hover:text-white transition-all"
              >
                NEED HELP?
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
