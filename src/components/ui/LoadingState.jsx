import { ProductSkeleton, TableSkeleton } from '../ProductSkeleton';

/**
 * Reusable loading state for full pages.
 * @param {Object} props
 * @param {'grid' | 'table' | 'inline'} props.variant
 * @param {number} [props.count=8] — skeleton count for grid variant
 * @param {string} [props.message]
 */
export function LoadingState({ variant = 'inline', count = 8, message }) {
  if (variant === 'table') {
    return <TableSkeleton rows={5} cols={6} />;
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-2 border-[#2a2520]/20 border-t-[#2a2520] rounded-full animate-spin mb-4" />
      <p className="text-xs tracking-[0.2em] opacity-40">{message || 'LOADING...'}</p>
    </div>
  );
}
