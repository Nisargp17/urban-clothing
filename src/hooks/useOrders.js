import { useState } from 'react';

export function useOrders() {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('orderHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addOrder = (order) => {
    setOrders((prev) => {
      const next = [order, ...prev];
      localStorage.setItem('orderHistory', JSON.stringify(next.slice(0, 20)));
      return next;
    });
  };

  return { orders, addOrder };
}
