export function ProductSkeleton() {
  return (
    <div className="flex flex-col items-center border-[3px] border-[#2a2520]/10 bg-[#e8ddd0]/50 p-3 md:p-4 animate-pulse">
      <div className="w-full aspect-square bg-[#2a2520]/10 mb-3 md:mb-4" />
      <div className="w-16 h-3 bg-[#2a2520]/10 mb-2 rounded" />
      <div className="w-28 h-6 bg-[#2a2520]/10 mb-2 rounded" />
      <div className="w-20 h-4 bg-[#2a2520]/10 rounded" />
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div className="relative flex-shrink-0 block overflow-hidden w-[70vw] md:w-[34vw] lg:w-[30vw] h-[55vh] md:h-[65vh] bg-[#2a2520]/5 animate-pulse">
      <div className="absolute inset-0 border-[3px] md:border-[4px] border-[#2a2520]/10" />
    </div>
  );
}

export function OrderSkeleton() {
  return (
    <div className="border-2 border-[#2a2520]/10 bg-white p-4 md:p-6 animate-pulse space-y-4">
      <div className="flex justify-between">
        <div className="w-32 h-4 bg-[#2a2520]/10 rounded" />
        <div className="w-20 h-4 bg-[#2a2520]/10 rounded" />
      </div>
      <div className="flex gap-3">
        <div className="w-12 h-12 bg-[#2a2520]/10 rounded" />
        <div className="flex-1 space-y-2">
          <div className="w-3/4 h-3 bg-[#2a2520]/10 rounded" />
          <div className="w-1/2 h-3 bg-[#2a2520]/10 rounded" />
        </div>
      </div>
      <div className="w-full h-8 bg-[#2a2520]/10 rounded" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="p-8 space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="flex-1 h-10 bg-[#2a2520]/5 rounded" />
          ))}
        </div>
      ))}
    </div>
  );
}
