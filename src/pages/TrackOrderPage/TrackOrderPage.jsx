import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLazyTrackOrderQuery } from '../../store/apiSlice';
import { formatPrice } from '../../utils/formatPrice';
import { SEO } from '../../components/SEO';

const STAGE_DESCRIPTIONS = {
  placed: 'Your order has been received and is being prepared.',
  confirmed: 'Your order has been confirmed and will be packed soon.',
  processing: 'Your order is being packed and quality-checked.',
  shipped: 'Your order has left our warehouse and is on its way.',
  out_for_delivery: 'Your order is with the courier and will arrive today.',
  delivered: 'Your order has been delivered. Enjoy your purchase!',
  cancelled: 'Your order has been cancelled. Stock has been restored.',
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [trackOrder, { data, isLoading, error }] = useLazyTrackOrderQuery();
  const [inputError, setInputError] = useState('');
  const resultRef = useRef(null);

  const order = data?.order;
  const timeline = data?.timeline || [];

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setInputError('Please enter an order number');
      return;
    }
    setInputError('');
    trackOrder(orderId.trim());
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
          <p className="text-xs md:text-xs tracking-[0.3em] opacity-40 mb-3">SHIPPING STATUS</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.95] mb-4">
            <span className="block">TRACK YOUR</span>
            <span className="block">ORDER</span>
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
              onChange={(e) => { setOrderId(e.target.value); setInputError(''); }}
              placeholder="e.g. URB-2024-7392"
              className="flex-1 bg-transparent px-5 py-4 text-sm md:text-base outline-none placeholder:opacity-30"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-14 px-8 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  SEARCHING
                </span>
              ) : 'TRACK'}
            </button>
          </div>
          {inputError && (
            <p className="text-xs text-red-600 mt-2 ml-1">{inputError}</p>
          )}
          {error && (
            <p className="text-xs text-red-600 mt-2 ml-1">{error.data?.message || error.error || 'Failed to track order.'}</p>
          )}
        </form>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="max-w-4xl mx-auto animate-pulse space-y-6">
            <div className="border-2 border-[#2a2520]/10 bg-[#e8ddd0]/30 p-5 md:p-8">
              <div className="flex justify-between mb-6">
                <div className="w-40 h-6 bg-[#2a2520]/10 rounded" />
                <div className="w-24 h-6 bg-[#2a2520]/10 rounded" />
              </div>
              <div className="flex gap-4 pb-6 border-b border-[#2a2520]/10">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#2a2520]/10 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-[#2a2520]/10 rounded" />
                  <div className="w-1/2 h-3 bg-[#2a2520]/10 rounded" />
                </div>
              </div>
            </div>
            <div className="border-2 border-[#2a2520]/10 bg-[#f5efe6] p-5 md:p-8 space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#2a2520]/10" />
                  <div className="flex-1 space-y-2">
                    <div className="w-32 h-4 bg-[#2a2520]/10 rounded" />
                    <div className="w-48 h-3 bg-[#2a2520]/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {order && !isLoading && (
          <div ref={resultRef} className="max-w-4xl mx-auto">
            {/* Order Summary Card */}
            <div className="border-2 border-[#2a2520] bg-[#e8ddd0]/30 p-5 md:p-8 mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs tracking-[0.3em] opacity-40 mb-1">ORDER NUMBER</p>
                  <p className="text-xl md:text-2xl font-semibold font-mono">{order.orderId}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs tracking-[0.2em] px-3 py-1 font-medium ${
                    order.status === 'delivered'
                      ? 'bg-[#2a2520] text-white'
                      : order.status === 'cancelled'
                      ? 'bg-red-600 text-white'
                      : 'bg-[#c4a35a] text-[#2a2520]'
                  }`}>
                    {order.status?.toUpperCase()}
                  </span>
                </div>
              </div>

              {order.items?.[0] && (
                <div className="flex items-center gap-4 md:gap-6 pb-6 border-b border-[#2a2520]/10">
                  <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-[#2a2520] overflow-hidden flex-shrink-0">
                    <img src={order.items[0].img || ''} alt={order.items[0].title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs tracking-[0.2em] opacity-40 mb-1">{order.items[0].title}</p>
                    <h3 className="text-lg md:text-xl font-semibold truncate">{order.items[0].title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <span className="opacity-60">Qty: {order.items[0].quantity}</span>
                      {order.items[0].size && (
                        <>
                          <span className="opacity-30">|</span>
                          <span className="opacity-60">Size: {order.items[0].size}</span>
                        </>
                      )}
                      <span className="opacity-30">|</span>
                      <span className="font-medium">{formatPrice(order.items[0].price * order.items[0].quantity)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-5">
                <div>
                  <p className="text-xs tracking-[0.2em] opacity-40 mb-0.5">TOTAL AMOUNT</p>
                  <p className="text-sm md:text-base font-medium">{formatPrice(order.totalAmount)}</p>
                </div>
                <Link
                  to={`/order-confirmation/${order.orderId}`}
                  className="text-xs tracking-[0.15em] underline opacity-50 hover:opacity-100 transition-opacity"
                >
                  VIEW FULL DETAILS →
                </Link>
              </div>
            </div>

            {/* Timeline */}
            {timeline.length > 0 && (
              <div className="border-2 border-[#2a2520] bg-[#f5efe6] p-5 md:p-8">
                <p className="text-xs tracking-[0.3em] opacity-40 mb-8">TRACKING TIMELINE</p>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[11px] md:left-[13px] top-2 bottom-2 w-[2px] bg-[#2a2520]/10" />

                  <div className="space-y-8">
                    {timeline.map((stage, idx) => {
                      const isLastCompleted = timeline.filter((t) => t.completed).length > 0
                        ? idx === timeline.filter((t) => t.completed).length - 1
                        : false;
                      return (
                        <div key={stage.status} className="relative flex items-start gap-4 md:gap-6">
                          {/* Dot */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                              stage.completed
                                ? isLastCompleted
                                  ? 'bg-[#c4a35a] border-[#c4a35a]'
                                  : 'bg-[#2a2520] border-[#2a2520]'
                                : 'bg-[#f5efe6] border-[#2a2520]/20'
                            }`}>
                              {stage.completed && !isLastCompleted && (
                                <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {isLastCompleted && (
                                <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#2a2520] rounded-full animate-pulse" />
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className={`flex-1 pb-2 transition-opacity duration-500 ${stage.completed ? 'opacity-100' : 'opacity-30'}`}>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                              <h4 className="text-sm md:text-base font-semibold capitalize">{stage.status.replace(/_/g, ' ')}</h4>
                              <span className="text-xs md:text-xs opacity-40 tracking-wider">
                                {stage.date ? new Date(stage.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Pending'}
                              </span>
                            </div>
                            <p className="text-xs md:text-sm opacity-60 mt-1">{STAGE_DESCRIPTIONS[stage.status] || ''}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

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
