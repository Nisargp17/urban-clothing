import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'urban_cart';

function calculateTotals(items) {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + item.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const persistedItems = loadFromStorage();
const persistedTotals = calculateTotals(persistedItems);

const initialState = {
  items: persistedItems,
  totalItems: persistedTotals.totalItems,
  totalPrice: persistedTotals.totalPrice,
  isOpen: false,
  toast: { show: false, message: '', type: 'success' },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, size = '' } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          cartItemId: `${product.id}-${size}`,
          id: product.id,
          title: product.title,
          price: product.newPrice || product.price,
          image: product.img || product.images?.[0],
          quantity,
          size,
        });
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      state.isOpen = true;
      state.toast = { show: true, message: `${product.title} added to cart`, type: 'success' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.cartItemId !== action.payload);
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      state.toast = { show: true, message: 'Item removed from cart', type: 'info' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      if (quantity < 1) {
        state.items = state.items.filter((item) => item.cartItemId !== cartItemId);
        state.toast = { show: true, message: 'Item removed from cart', type: 'info' };
      } else {
        const item = state.items.find((i) => i.cartItemId === cartItemId);
        if (item) item.quantity = quantity;
      }
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.toast = { show: true, message: 'Cart cleared', type: 'info' };
      localStorage.removeItem(STORAGE_KEY);
    },
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    setDrawerOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    hideToast: (state) => {
      state.toast = { show: false, message: '', type: 'success' };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleDrawer,
  setDrawerOpen,
  hideToast,
} = cartSlice.actions;

export default cartSlice.reducer;
