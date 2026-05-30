import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import { formatPrice } from '../../utils/formatPrice';

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'upi', label: 'UPI / Paytm', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'card', label: 'Credit / Debit Card', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});

  const shipping = totalPrice >= 2000 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + shipping + tax;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = '10-digit phone required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = '6-digit PIN required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    const orderId = `URB-${Date.now().toString(36).toUpperCase()}`;
    const order = {
      orderId,
      items: [...items],
      totalPrice,
      shipping,
      tax,
      grandTotal,
      shippingInfo: { ...form },
      paymentMethod,
      date: new Date().toISOString(),
    };

    // Save to localStorage for confirmation page
    localStorage.setItem('lastOrder', JSON.stringify(order));
    dispatch(clearCart());
    setLoading(false);
    navigate(`/order-confirmation/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5efe6] flex flex-col items-center justify-center px-6 pt-20 text-center">
        <h2 className="text-2xl font-bold tracking-[0.1em]">YOUR CART IS EMPTY</h2>
        <p className="text-sm text-[#2a2520]/50 mt-2">Add some items before checking out.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 px-6 py-3 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5efe6] pt-20 sm:pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h2 className="text-xl font-bold tracking-[0.1em] mb-8">CHECKOUT</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Shipping */}
            <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
              <h3 className="text-sm font-bold tracking-[0.15em] mb-5">SHIPPING INFORMATION</h3>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="sm:col-span-2">
                  <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">FULL NAME</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange}
                    className={`w-full border-2 px-3 py-2 text-sm outline-none focus:border-[#2a2520] ${errors.fullName ? 'border-red-400' : 'border-[#2a2520]/20'}`} />
                  {errors.fullName && <p className="text-[10px] text-red-500 mt-0.5">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">EMAIL</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    className={`w-full border-2 px-3 py-2 text-sm outline-none focus:border-[#2a2520] ${errors.email ? 'border-red-400' : 'border-[#2a2520]/20'}`} />
                  {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">PHONE</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit number"
                    className={`w-full border-2 px-3 py-2 text-sm outline-none focus:border-[#2a2520] ${errors.phone ? 'border-red-400' : 'border-[#2a2520]/20'}`} />
                  {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">ADDRESS</label>
                  <input name="address" value={form.address} onChange={handleChange}
                    className={`w-full border-2 px-3 py-2 text-sm outline-none focus:border-[#2a2520] ${errors.address ? 'border-red-400' : 'border-[#2a2520]/20'}`} />
                  {errors.address && <p className="text-[10px] text-red-500 mt-0.5">{errors.address}</p>}
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">CITY</label>
                  <input name="city" value={form.city} onChange={handleChange}
                    className={`w-full border-2 px-3 py-2 text-sm outline-none focus:border-[#2a2520] ${errors.city ? 'border-red-400' : 'border-[#2a2520]/20'}`} />
                  {errors.city && <p className="text-[10px] text-red-500 mt-0.5">{errors.city}</p>}
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">STATE</label>
                  <select name="state" value={form.state} onChange={handleChange}
                    className={`w-full border-2 px-3 py-2 text-sm outline-none focus:border-[#2a2520] bg-white ${errors.state ? 'border-red-400' : 'border-[#2a2520]/20'}`}>
                    <option value="">Select</option>
                    {['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'Gujarat', 'West Bengal', 'Rajasthan', 'Uttar Pradesh', 'Kerala', 'Punjab', 'Haryana'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-[10px] text-red-500 mt-0.5">{errors.state}</p>}
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">PINCODE</label>
                  <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="6 digits"
                    className={`w-full border-2 px-3 py-2 text-sm outline-none focus:border-[#2a2520] ${errors.pincode ? 'border-red-400' : 'border-[#2a2520]/20'}`} />
                  {errors.pincode && <p className="text-[10px] text-red-500 mt-0.5">{errors.pincode}</p>}
                </div>
              </form>
            </div>

            {/* Payment */}
            <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
              <h3 className="text-sm font-bold tracking-[0.15em] mb-5">PAYMENT METHOD</h3>
              <div className="space-y-2">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 border-2 transition-all ${
                      paymentMethod === m.id
                        ? 'border-[#c4a35a] bg-[#c4a35a]/5'
                        : 'border-[#2a2520]/10 hover:border-[#2a2520]/30'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === m.id ? 'border-[#c4a35a]' : 'border-[#2a2520]/30'}`}>
                      {paymentMethod === m.id && <div className="w-2 h-2 rounded-full bg-[#c4a35a]" />}
                    </div>
                    <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                    </svg>
                    <span className="text-sm font-medium">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Summary */}
          <div className="lg:col-span-2">
            <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520] sticky top-6">
              <h3 className="text-sm font-bold tracking-[0.15em] mb-5">ORDER SUMMARY</h3>

              <div className="space-y-3 max-h-60 overflow-y-auto border-b border-[#2a2520]/10 pb-4 mb-4">
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3">
                    <div className="w-14 h-14 border border-[#2a2520]/20 flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.title}</p>
                      <p className="text-[10px] opacity-50">Qty: {item.quantity}</p>
                      <p className="text-xs font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between opacity-60">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between opacity-60">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between opacity-60">
                  <span>Tax (18% GST)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-[#2a2520]/10">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-5 py-3 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
              </button>

              {totalPrice < 2000 && (
                <p className="text-[10px] text-center opacity-40 mt-3">
                  Add {formatPrice(2000 - totalPrice)} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
