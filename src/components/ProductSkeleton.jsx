export function ProductSkeleton() {
  return (
    <div className="flex flex-col items-center border-[3px] border-[#2a2520]/10 bg-[#e8ddd0]/50 p-3 md:p-4 animate-pulse">
      <div className="w-full aspect-square bg-[#2a2520]/5 mb-3 md:mb-4" />
      <div className="w-12 h-3 bg-[#2a2520]/5 mb-2" />
      <div className="w-24 h-6 bg-[#2a2520]/5 mb-2" />
      <div className="w-16 h-4 bg-[#2a2520]/5" />
    </div>
  );
}
