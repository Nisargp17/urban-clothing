import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext, useWishlistContext } from '../../hooks/useRedux';
import { useGetProductsQuery } from '../../store/apiSlice';
import { formatPrice } from '../../utils/formatPrice';
import { SEO } from '../../components/SEO';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();
  const { data: apiData } = useGetProductsQuery();

  const wishlistProducts = useMemo(() => {
    const products = apiData?.products || apiData || [];
    if (!Array.isArray(products)) return [];
    const map = new Map(products.map((p) => [p.id || p._id, p]));
    return wishlist.map((item) => map.get(item.id)).filter(Boolean);
  }, [wishlist, apiData]);

  return (
    <>
      <SEO title="Wishlist" description="Your saved favorites." pathname="/wishlist" />
      <div className="min-h-screen pt-24 md:pt-28 pb-16">
        <div className="px-4 md:px-[6vw]">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <p className="text-xs tracking-[0.3em] opacity-40 mb-2">SAVED ITEMS</p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-[0.95] tracking-tight mb-3">
              Wishlist
            </h1>
            <p className="text-sm opacity-40">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20 md:py-32">
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-[#2a2520]/20 flex items-center justify-center">
                <svg className="w-6 h-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2 opacity-40">Your wishlist is empty</h2>
              <p className="text-sm opacity-30 mb-8">Save items you love to find them easily later.</p>
              <Link
                to="/shop"
                className="inline-block px-8 py-3 bg-[#2a2520] text-white text-sm tracking-[0.2em] hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
              >
                EXPLORE SHOP
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product) => {
                const discount = product.oldPrice && product.newPrice != null
                  ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
                  : 0;
                return (
                  <div key={product.id || product._id} className="group relative border-[3px] border-[#2a2520] bg-[#e8ddd0]">
                    <Link to={`/product/${product.id || product._id}`} className="block">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.img || product.image || ''}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="p-4 md:p-5">
                        <p className="text-xs tracking-[0.2em] opacity-40 mb-1">{product.category}</p>
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">{product.title}</h3>
                        <div className="flex items-center gap-2">
                          {product.oldPrice && (
                            <span className="text-sm line-through opacity-40">{formatPrice(product.oldPrice)}</span>
                          )}
                          <span className="text-lg font-medium">{formatPrice(product.newPrice)}</span>
                          {discount > 0 && (
                            <span className="text-xs font-bold px-2 py-0.5 bg-[#c4a35a] text-[#2a2520]">-{discount}%</span>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Actions */}
                    <div className="px-4 md:px-5 pb-4 md:pb-5 flex gap-2">
                      <button
                        onClick={() => addToCart(product, 1, product.sizes?.[0] || '')}
                        className="flex-1 py-2.5 bg-[#2a2520] text-white text-xs tracking-[0.15em] hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
                      >
                        ADD TO CART
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id || product._id)}
                        className="w-10 h-10 border-2 border-[#2a2520] flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-all"
                        aria-label="Remove from wishlist"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
