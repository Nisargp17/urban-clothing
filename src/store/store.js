import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // RTK Query actions contain non-serializable data by design
        ignoredActions: ['api/executeQuery/pending', 'api/executeQuery/fulfilled', 'api/executeQuery/rejected'],
      },
    }).concat(apiSlice.middleware),
  devTools: import.meta.env.DEV,
});
