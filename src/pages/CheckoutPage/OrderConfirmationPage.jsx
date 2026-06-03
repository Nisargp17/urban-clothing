import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastOrder');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.orderId === orderId) setOrder(parsed);
      } catch { /* ignore */ }
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f5efe6] flex flex-col items-center justify-center px-6 pt-20 text-center">
        <h2 className="text-2xl font-bold tracking-[0.1em]">ORDER NOT FOUND</h2>
        <p className="text-sm text-[#2a2520]/50 mt-2">We could not find details for this order.</p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
        >
          BACK TO HOME
        </Link>
      </div>
    );
  }

  const deliveryDate = new Date(Date.now() + 5 * 86400000);

  return (
    <div className="min-h-screen bg-[#f5efe6] pt-20 sm:pt-24 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Header */}
        <div className="border-2 border-[#2a2520] bg-white p-6 sm:p-8 text-center shadow-[4px_4px_0px_0px_#2a2520]">
          <div className="w-14 h-14 bg-green-100 border-2 border-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-[0.1em]">ORDER CONFIRMED</h2>
          <p className="text-sm text-[#2a2520]/50 mt-2">
            Thank you! Your order has been placed successfully.
          </p>
          <div className="mt-4 inline-block border-2 border-[#2a2520] px-4 py-2">
            <p className="text-[10px] tracking-[0.15em] text-[#2a2520]/40 uppercase">ORDER ID</p>
            <p className="text-sm font-bold tracking-wider">{order.orderId}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="border-2 border-[#2a2520] bg-white p-5 sm:p-6 shadow-[4px_4px_0px_0px_#2a2520]">
          <h3 className="text-sm font-bold tracking-[0.15em] mb-4">ORDER DETAILS</h3>

          <div className="space-y-3 border-b border-[#2a2520]/10 pb-4 mb-4">
            {order.items.map((item) => (
              <div key={item.cartItemId} className="flex gap-3">
                <div className="w-12 h-12 border border-[#2a2520]/20 flex-shrink-0 overflow-hidden">
                  <img src={item.image || ''} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{item.title}</p>
                  <p className="text-[10px] opacity-50">Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm border-b border-[#2a2520]/10 pb-4 mb-4">
            <div className="flex justify-between opacity-60">
              <span>Subtotal</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
            <div className="flex justify-between opacity-60">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between opacity-60">
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2">
              <span>Total</span>
              <span>{formatPrice(order.grandTotal)}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-[10px] tracking-[0.15em] text-[#2a2520]/40 uppercase">SHIPPING TO</p>
            <p className="font-medium">{order.shippingInfo.fullName}</p>
            <p className="opacity-60">{order.shippingInfo.address}</p>
            <p className="opacity-60">{order.shippingInfo.city}, {order.shippingInfo.state} — {order.shippingInfo.pincode}</p>
            <p className="opacity-60">{order.shippingInfo.phone}</p>
          </div>
        </div>

        {/* Delivery Estimate */}
        <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c4a35a]/10 border border-[#c4a35a]/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#c4a35a]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium">Estimated Delivery</p>
              <p className="text-sm font-bold">{deliveryDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/shop"
            className="flex-1 text-center px-6 py-3 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
          <Link
            to="/track-order"
            className="flex-1 text-center px-6 py-3 border-2 border-[#2a2520] text-[#2a2520] text-xs tracking-[0.15em] font-medium hover:bg-[#2a2520] hover:text-white transition-colors"
          >
            TRACK ORDER
          </Link>
        </div>
      </div>
    </div>
  );
}
