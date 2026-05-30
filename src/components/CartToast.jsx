import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../store/cartSlice';

export function CartToast() {
  const dispatch = useDispatch();
  const { show, message, type } = useSelector((state) => state.cart.toast);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => dispatch(hideToast()), 3000);
    return () => clearTimeout(timer);
  }, [show, dispatch]);

  if (!show) return null;

  const bgClass =
    type === 'error'
      ? 'bg-red-600 text-white'
      : type === 'info'
      ? 'bg-[#c4a35a] text-[#2a2520]'
      : 'bg-[#2a2520] text-white';

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 text-sm font-medium tracking-wider border-2 border-[#2a2520] shadow-lg animate-slide-up ${bgClass}`}
    >
      {message}
    </div>
  );
}
