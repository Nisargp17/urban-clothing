import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Horizontal scrolling product carousel.
 * Used for "Related Products" and "Recently Viewed".
 */
export function ProductCarousel({ label, title, products, actionLabel, actionHref }) {
  if (!products?.length) return null;

  return (
    <div className="px-4 md:px-[4vw] py-12 md:py-20 border-t border-[#2a2520]/10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs tracking-[0.3em] opacity-40 mb-2">{label}</p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[0.95] whitespace-pre-line">{title}</h2>
        </div>
        {actionLabel && actionHref && (
          <Link to={actionHref} className="text-xs md:text-sm tracking-[0.2em] opacity-40 hover:opacity-80 transition-opacity hidden md:block">
            {actionLabel}
          </Link>
        )}
      </div>
      <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4">
        {products.map((p) => {
          const pid = p.id || p._id;
          return (
            <Link
              key={pid}
              to={`/product/${pid}`}
              className="group flex-shrink-0 w-[60vw] md:w-[22vw] lg:w-[18vw]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#e8ddd0] border-2 border-[#2a2520] mb-3">
                <img
                  src={p.img || p.image || ''}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="text-xs tracking-[0.2em] opacity-40 mb-1">{p.category}</p>
              <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:underline">{p.title}</h3>
              <p className="text-sm font-medium">{formatPrice(p.newPrice)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
