import { useState, useMemo } from 'react';
import {
  useGetAdminOrdersQuery,
  useUpdateOrderStatusMutation,
} from '../../store/apiSlice';
import OrderDetailModal from './OrderDetailModal';

const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
  processing: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  shipped: 'bg-purple-100 text-purple-800 border-purple-300',
  out_for_delivery: 'bg-pink-100 text-pink-800 border-pink-300',
  delivered: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
};

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = useGetAdminOrdersQuery({ page, limit });
  const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const orders = useMemo(() => {
    const raw = apiData?.orders || apiData || [];
    return Array.isArray(raw) ? raw : [];
  }, [apiData]);

  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionError, setActionError] = useState('');

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          o.orderId?.toLowerCase().includes(q) ||
          o.user?.name?.toLowerCase().includes(q) ||
          o.user?.email?.toLowerCase().includes(q) ||
          o.items?.some((it) => it.title?.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [orders, statusFilter, search]);

  const handleStatusChange = async (orderId, newStatus) => {
    setActionError('');
    try {
      await updateStatus({ orderId, status: newStatus }).unwrap();
    } catch (err) {
      setActionError(err?.data?.message || err?.error || 'Failed to update status.');
    }
  };

  const statusCounts = useMemo(() => {
    return ORDER_STATUSES.reduce((acc, s) => {
      acc[s] = orders.filter((o) => o.status === s).length;
      return acc;
    }, {});
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-[0.1em]">ORDERS</h2>
          <p className="text-sm text-[#2a2520]/40 mt-1">
            {isLoading ? 'Loading...' : `${orders.length} total orders`}
          </p>
        </div>
      </div>

      {error && (
        <div className="text-xs text-red-600 border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between">
          <span>Failed to load orders. {error.data?.message || error.error || 'Please try again.'}</span>
          <button onClick={refetch} className="underline font-medium">Retry</button>
        </div>
      )}
      {actionError && (
        <div className="text-xs text-red-600 border border-red-200 bg-red-50 px-4 py-3">
          {actionError}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 border-b-2 border-[#2a2520]/10 pb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order, customer, product..."
          className="w-full max-w-md bg-transparent border-2 border-[#2a2520]/20 px-4 py-2 text-sm outline-none focus:border-[#2a2520] transition-colors"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-2 border-[#2a2520]/20 px-4 py-2 text-sm outline-none focus:border-[#2a2520] bg-white"
        >
          <option value="all">All Status</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s} ({statusCounts[s] || 0})
            </option>
          ))}
        </select>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {ORDER_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s === statusFilter ? 'all' : s)}
            className={`text-[10px] tracking-wider uppercase px-2 py-2 border-2 font-medium transition-all ${
              statusFilter === s
                ? 'border-[#2a2520] bg-[#2a2520] text-white'
                : 'border-[#2a2520]/10 hover:border-[#2a2520]/40'
            }`}
          >
            {s} ({statusCounts[s]})
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="border-2 border-[#2a2520] bg-white overflow-x-auto">
        {isLoading && (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-[#2a2520]/5 animate-pulse" />
            ))}
          </div>
        )}
        {!isLoading && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#2a2520]/10 text-left text-xs tracking-[0.1em] text-[#2a2520]/40">
                <th className="p-4 font-medium">ORDER</th>
                <th className="p-4 font-medium">CUSTOMER</th>
                <th className="p-4 font-medium">PRODUCTS</th>
                <th className="p-4 font-medium">AMOUNT</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium">DATE</th>
                <th className="p-4 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order._id} className="border-b border-[#2a2520]/5 hover:bg-[#f5efe6] transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-xs">{order.orderId}</span>
                  </td>
                  <td className="p-4">
                    <p className="text-xs font-medium">{order.user?.name || order.customer || 'Unknown'}</p>
                    <p className="text-[10px] opacity-50">{order.user?.email || order.email || ''}</p>
                  </td>
                  <td className="p-4 text-xs opacity-70 truncate max-w-[180px]">
                    {order.items?.map((it) => it.title).join(', ') || order.product || 'N/A'}
                  </td>
                  <td className="p-4 text-xs font-medium">₹{(order.totalAmount ?? order.amount ?? 0).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase border ${STATUS_STYLES[order.status] || STATUS_STYLES.pending}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs opacity-60">
                    {new Date(order.createdAt || order.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-2 py-1 text-[10px] border border-[#2a2520] hover:bg-[#2a2520] hover:text-white transition-colors"
                      >
                        VIEW
                      </button>
                      <select
                        value={order.status}
                        disabled={isUpdating}
                        onChange={(e) => handleStatusChange(order.orderId || order._id, e.target.value)}
                        className="text-[10px] tracking-wider uppercase border-2 border-[#2a2520]/20 px-2 py-1 outline-none focus:border-[#2a2520] bg-white disabled:opacity-50"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="p-8 text-center text-sm opacity-40">
            {orders.length === 0 ? 'No orders found.' : 'No orders match your filters.'}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && apiData?.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t-2 border-[#2a2520]/10">
            <p className="text-xs opacity-40">
              Page {apiData?.page ?? page} of {apiData?.pages ?? 1}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 border-2 border-[#2a2520]/20 text-xs tracking-wider hover:border-[#2a2520] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                PREV
              </button>
              <button
                onClick={() => setPage((p) => Math.min(apiData?.pages ?? 1, p + 1))}
                disabled={page >= (apiData?.pages ?? 1)}
                className="px-3 py-1.5 border-2 border-[#2a2520]/20 text-xs tracking-wider hover:border-[#2a2520] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
