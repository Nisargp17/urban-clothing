import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'urban_wishlist';

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const items = saved ? JSON.parse(saved) : [];
    return Array.isArray(items) ? items.filter((item) => item.id && item.title) : [];
  } catch {
    return [];
  }
}

const initialState = {
  wishlist: loadFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const productId = product.id || product._id;
      if (!state.wishlist.some((item) => item.id === productId)) {
        state.wishlist.push({
          id: productId,
          title: product.title,
          price: product.newPrice || product.price || 0,
          image: product.img || product.image || '',
          category: product.category,
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.wishlist));
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.wishlist));
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const productId = product.id || product._id;
      const exists = state.wishlist.some((item) => item.id === productId);
      if (exists) {
        state.wishlist = state.wishlist.filter((item) => item.id !== productId);
      } else {
        state.wishlist.push({
          id: productId,
          title: product.title,
          price: product.newPrice || product.price || 0,
          image: product.img || product.image || '',
          category: product.category,
        });
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.wishlist));
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
