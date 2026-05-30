import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
  processing: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  shipped: 'bg-purple-100 text-purple-800 border-purple-300',
  out_for_delivery: 'bg-pink-100 text-pink-800 border-pink-300',
  delivered: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
};

export default function OrderDetailModal({ order, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(panel, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });

    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!order) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4 opacity-0"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        className="bg-white border-2 border-[#2a2520] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_0px_#2a2520]"
      >
        <div className="flex items-center justify-between p-5 border-b-2 border-[#2a2520]/10">
          <div>
            <h3 className="text-sm font-bold tracking-[0.15em]">ORDER DETAIL</h3>
            <p className="text-xs opacity-50 mt-0.5">{order.orderId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 border-2 border-[#2a2520] hover:bg-[#2a2520] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Status */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.15em] text-[#2a2520]/40 uppercase">STATUS</span>
            <span className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase border ${STATUS_STYLES[order.status]}`}>
              {order.status}
            </span>
          </div>

          {/* Customer */}
          <div className="border-2 border-[#2a2520]/10 p-4 space-y-2">
            <p className="text-[10px] tracking-[0.15em] text-[#2a2520]/40 uppercase">CUSTOMER</p>
            <p className="text-sm font-medium">{order.customer}</p>
            <p className="text-xs opacity-60">{order.email}</p>
            <p className="text-xs opacity-60">{order.city}</p>
          </div>

          {/* Product */}
          <div className="border-2 border-[#2a2520]/10 p-4 space-y-2">
            <p className="text-[10px] tracking-[0.15em] text-[#2a2520]/40 uppercase">ITEM</p>
            <p className="text-sm font-medium">{order.product}</p>
            <p className="text-xs opacity-60">Qty: 1</p>
          </div>

          {/* Pricing */}
          <div className="border-2 border-[#2a2520]/10 p-4 space-y-2">
            <p className="text-[10px] tracking-[0.15em] text-[#2a2520]/40 uppercase">PAYMENT</p>
            <div className="flex justify-between text-sm">
              <span className="opacity-60">Subtotal</span>
              <span className="font-medium">₹{Math.round(order.amount * 0.85).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="opacity-60">Tax (18% GST)</span>
              <span className="font-medium">₹{Math.round(order.amount * 0.18).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-[#2a2520]/10 pt-2 mt-1">
              <span className="font-medium">Total</span>
              <span className="font-bold">₹{order.amount.toLocaleString()}</span>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.15em] text-[#2a2520]/40 uppercase">PLACED ON</span>
            <span className="text-xs font-medium">{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        <div className="p-5 border-t-2 border-[#2a2520]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
