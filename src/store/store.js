import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { rtkQueryErrorMiddleware } from './errorMiddleware';
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
        // RTK Query actions and cache entries contain non-serializable data by design
        ignoredActions: [
          'api/executeQuery/pending',
          'api/executeQuery/fulfilled',
          'api/executeQuery/rejected',
          'api/executeMutation/pending',
          'api/executeMutation/fulfilled',
          'api/executeMutation/rejected',
        ],
        ignoredPaths: ['api.queries', 'api.mutations', 'api.subscriptions'],
      },
    })
      .concat(apiSlice.middleware)
      .concat(rtkQueryErrorMiddleware),
  devTools: import.meta.env.DEV,
});
