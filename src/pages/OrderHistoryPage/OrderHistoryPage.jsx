import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery, useCancelOrderMutation } from '../../store/apiSlice';
import { OrderSkeleton } from '../../components/ProductSkeleton';
import { formatPrice } from '../../utils/formatPrice';
import { SEO } from '../../components/SEO';

const STATUS_STYLES = {
  placed: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
  shipped: 'bg-purple-100 text-purple-800 border-purple-300',
  out_for_delivery: 'bg-pink-100 text-pink-800 border-pink-300',
  delivered: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
};

export default function OrderHistoryPage() {
  const { data, isLoading, error, refetch } = useGetOrdersQuery();
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [actionError, setActionError] = useState('');

  const orders = useMemo(() => {
    const raw = data?.orders || data || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
  }, [orders]);

  const handleCancel = async (orderId) => {
    if (!window.confirm('Cancel this order? Stock will be restored.')) return;
    setActionError('');
    try {
      await cancelOrder(orderId).unwrap();
    } catch (err) {
      setActionError(err?.data?.message || 'Failed to cancel order.');
    }
  };

  if (isLoading) {
    return (
      <>
        <SEO title="Order History" description="View your past orders." pathname="/orders" />
        <div className="min-h-screen bg-[#f5efe6] pt-20 sm:pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] opacity-40 mb-2">ACCOUNT</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-[0.95]">Order History</h1>
            </div>
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <OrderSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO title="Order History" description="View your past orders." pathname="/orders" />
        <div className="min-h-screen bg-[#f5efe6] pt-20 sm:pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] opacity-40 mb-2">ACCOUNT</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-[0.95]">Order History</h1>
            </div>
            <div className="text-center py-20 border-2 border-red-200 bg-red-50">
              <p className="text-sm text-red-600 mb-4">{error.data?.message || error.error || 'Failed to load orders.'}</p>
              <button
                onClick={refetch}
                className="inline-block px-8 py-3 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
              >
                RETRY
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <SEO title="Order History" description="View your past orders." pathname="/orders" />
        <div className="min-h-screen bg-[#f5efe6] pt-20 sm:pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] opacity-40 mb-2">ACCOUNT</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-[0.95]">Order History</h1>
            </div>
            <div className="text-center py-20 border-2 border-[#2a2520]/10">
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-[#2a2520]/20 flex items-center justify-center">
                <svg className="w-6 h-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2 opacity-40">No orders yet</h2>
              <p className="text-sm opacity-30 mb-6">Your order history will appear here after your first purchase.</p>
              <Link
                to="/shop"
                className="inline-block px-8 py-3 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
              >
                START SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Order History" description="View your past orders." pathname="/orders" />
      <div className="min-h-screen bg-[#f5efe6] pt-20 sm:pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.3em] opacity-40 mb-2">ACCOUNT</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-[0.95]">Order History</h1>
            <p className="text-sm opacity-40 mt-2">{orders.length} {orders.length === 1 ? 'order' : 'orders'} placed</p>
          </div>

          {actionError && (
            <div className="text-xs text-red-600 border border-red-200 bg-red-50 px-4 py-3 mb-6">
              {actionError}
            </div>
          )}

          <div className="space-y-6">
            {sortedOrders.map((order) => (
              <div key={order.orderId || order._id} className="border-2 border-[#2a2520] bg-white shadow-[4px_4px_0px_0px_#2a2520]">
                <div className="p-4 md:p-6 border-b border-[#2a2520]/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] opacity-40 mb-1">ORDER NUMBER</p>
                      <p className="text-lg font-semibold font-mono">{order.orderId}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase border ${STATUS_STYLES[order.status] || STATUS_STYLES.placed}`}>
                        {order.status}
                      </span>
                      <p className="text-sm opacity-60">{new Date(order.createdAt || order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="space-y-3 mb-4">
                    {order.items?.map((item, idx) => (
                      <div key={item._id || item.product || idx} className="flex gap-3">
                        <div className="w-12 h-12 border border-[#2a2520]/20 flex-shrink-0 overflow-hidden">
                          <img src={item.img || item.image || ''} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{item.title}</p>
                          <p className="text-[10px] opacity-50">Qty: {item.quantity}{item.size ? ` | Size: ${item.size}` : ''}</p>
                          <p className="text-xs font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-[#2a2520]/10">
                    <div className="text-sm">
                      <span className="opacity-40">Total: </span>
                      <span className="font-semibold">{formatPrice(order.totalAmount || order.grandTotal)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {['placed', 'confirmed'].includes(order.status) && (
                        <button
                          onClick={() => handleCancel(order._id)}
                          disabled={isCancelling}
                          className="text-xs tracking-[0.15em] underline opacity-40 hover:opacity-100 hover:text-red-600 transition-opacity disabled:opacity-20"
                        >
                          CANCEL
                        </button>
                      )}
                      <Link
                        to={`/order-confirmation/${order.orderId}`}
                        className="text-xs tracking-[0.15em] underline opacity-60 hover:opacity-100 transition-opacity"
                      >
                        VIEW DETAILS
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
