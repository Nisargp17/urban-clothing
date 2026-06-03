import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useCartContext } from '../hooks/useRedux';
import { formatPrice } from '../utils/formatPrice';
import { Button } from './ui/Button';
import { CART_CONFIG } from '../constants/config';

export function CartDrawer() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, isOpen, setDrawerOpen, removeFromCart, updateQuantity } = useCartContext();
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef = useRef(null);

  const threshold = CART_CONFIG.FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min((totalPrice / threshold) * 100, 100);
  const remainingForFreeShipping = Math.max(threshold - totalPrice, 0);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
      if (itemsRef.current) {
        gsap.fromTo(
          itemsRef.current.children,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
        );
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, pointerEvents: 'none' });
      gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 opacity-0 pointer-events-none"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#ede6da] border-l-[3px] border-[#2a2520] z-50"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#2a2520]/10">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Your Cart</h2>
              <p className="text-xs opacity-60 mt-1">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-10 h-10 border-2 border-[#2a2520] flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-all duration-300"
              aria-label="Close cart"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Free shipping progress */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-[#c4a35a]/10 border-b border-[#2a2520]/10">
              {remainingForFreeShipping > 0 ? (
                <>
                  <p className="text-xs font-medium tracking-wider">
                    ADD {formatPrice(remainingForFreeShipping)} MORE FOR FREE SHIPPING
                  </p>
                  <div className="w-full h-1 bg-[#2a2520]/10 mt-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#c4a35a] transition-all duration-500 ease-out"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-xs font-medium tracking-wider text-[#2a2520]">
                  YOU QUALIFY FOR FREE SHIPPING
                </p>
              )}
            </div>
          )}

          {/* Items */}
          <div ref={itemsRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 border-2 border-[#2a2520]/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-lg opacity-60 mb-1">Your cart is empty</p>
                <p className="text-sm opacity-40 mb-6">Discover our latest collection</p>
                <Button variant="primary" className="px-8 py-2 text-sm" onClick={() => setDrawerOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 pb-4 group"
                >
                  <Link
                    to={`/product/${item.id || item._id}`}
                    onClick={() => setDrawerOpen(false)}
                    className="w-20 h-20 flex-shrink-0 border-2 border-[#2a2520] overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img src={item.image || ''} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id || item._id}`}
                      onClick={() => setDrawerOpen(false)}
                      className="font-semibold text-sm truncate block hover:underline"
                    >
                      {item.title}
                    </Link>
                    {item.size && <p className="text-xs opacity-60 mt-0.5">Size: {item.size}</p>}
                    <p className="text-xs font-medium mt-0.5">{formatPrice(item.price)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-7 h-7 border border-[#2a2520] flex items-center justify-center text-xs hover:bg-[#2a2520] hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-7 h-7 border border-[#2a2520] flex items-center justify-center text-xs hover:bg-[#2a2520] hover:text-white transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="ml-auto text-xs underline opacity-40 hover:opacity-100 transition-opacity"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="text-xs font-semibold mt-1.5">
                      Subtotal: {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-[#2a2520]/10 p-6 space-y-3 bg-[#ede6da]">
              <div className="flex justify-between text-sm opacity-60">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm opacity-60">
                <span>Shipping</span>
                <span>{remainingForFreeShipping > 0 ? 'Calculated at checkout' : 'Free'}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-[#2a2520]/10">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <Button
                variant="primary"
                className="w-full py-3 text-sm tracking-wider mt-2"
                onClick={() => {
                  setDrawerOpen(false);
                  navigate('/checkout');
                }}
              >
                CHECKOUT
              </Button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full text-center text-xs opacity-60 hover:opacity-100 hover:underline transition-all py-1"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
