import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'urban_wishlist';

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
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
      if (!state.wishlist.some((item) => item.id === product.id)) {
        state.wishlist.push({
          id: product.id,
          title: product.title,
          price: product.newPrice,
          image: product.img,
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
      const exists = state.wishlist.some((item) => item.id === product.id);
      if (exists) {
        state.wishlist = state.wishlist.filter((item) => item.id !== product.id);
      } else {
        state.wishlist.push({
          id: product.id,
          title: product.title,
          price: product.newPrice,
          image: product.img,
          category: product.category,
        });
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.wishlist));
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
