import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleDrawer,
  setDrawerOpen,
  hideToast,
} from '../store/cartSlice';
import {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
} from '../store/wishlistSlice';
import { logout } from '../store/authSlice';

// Cart
export function useCartContext() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return {
    ...cart,
    addToCart: (product, quantity = 1, size = '') =>
      dispatch(addToCart({ product, quantity, size })),
    removeFromCart: (cartItemId) => dispatch(removeFromCart(cartItemId)),
    updateQuantity: (cartItemId, quantity) =>
      dispatch(updateQuantity({ cartItemId, quantity })),
    clearCart: () => dispatch(clearCart()),
    toggleDrawer: () => dispatch(toggleDrawer()),
    setDrawerOpen: (open) => dispatch(setDrawerOpen(open)),
  };
}

// Wishlist
export function useWishlistContext() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return {
    wishlist,
    count: wishlist.length,
    toggleWishlist: (product) => dispatch(toggleWishlist(product)),
    isInWishlist: (productId) => wishlist.some((item) => item.id === productId),
  };
}

// Auth
export function useAuthContext() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    logout: () => dispatch(logout()),
  };
}
