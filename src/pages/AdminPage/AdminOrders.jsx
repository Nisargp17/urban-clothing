import { useState } from 'react';
import { PRODUCTS } from '../../data/products';
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

function generateMockOrders() {
  const customers = [
    { name: 'Alex Rivera', email: 'alex@example.com', city: 'Mumbai' },
    { name: 'Sam Thomas', email: 'sam@example.com', city: 'Delhi' },
    { name: 'Jordan Kim', email: 'jordan@example.com', city: 'Bangalore' },
    { name: 'Morgan Lee', email: 'morgan@example.com', city: 'Hyderabad' },
    { name: 'Casey Williams', email: 'casey@example.com', city: 'Chennai' },
    { name: 'Taylor Park', email: 'taylor@example.com', city: 'Pune' },
    { name: 'Riley Jones', email: 'riley@example.com', city: 'Kolkata' },
    { name: 'Quinn Mitchell', email: 'quinn@example.com', city: 'Ahmedabad' },
    { name: 'Avery Brown', email: 'avery@example.com', city: 'Jaipur' },
    { name: 'Sage Davis', email: 'sage@example.com', city: 'Surat' },
  ];

  return customers.map((customer, i) => {
    const product = PRODUCTS[i % PRODUCTS.length];
    return {
      _id: `order_${i}`,
      orderId: `URB-2025-${8842 + i}`,
      customer: customer.name,
      email: customer.email,
      city: customer.city,
      product: product.title,
      amount: product.newPrice * (1 + (i % 3)),
      status: ORDER_STATUSES[i % ORDER_STATUSES.length],
      date: new Date(Date.now() - i * 86400000 * 2).toISOString(),
    };
  });
}

const MOCK_ORDERS = generateMockOrders();

export default function AdminOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.orderId.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const statusCounts = ORDER_STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-[0.1em]">ORDERS</h2>
          <p className="text-sm text-[#2a2520]/40 mt-1">{orders.length} total orders</p>
        </div>
      </div>

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
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-[#2a2520]/10 text-left text-xs tracking-[0.1em] text-[#2a2520]/40">
              <th className="p-4 font-medium">ORDER</th>
              <th className="p-4 font-medium">CUSTOMER</th>
              <th className="p-4 font-medium">PRODUCT</th>
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
                  <p className="text-xs font-medium">{order.customer}</p>
                  <p className="text-[10px] opacity-50">{order.email}</p>
                </td>
                <td className="p-4 text-xs opacity-70 truncate max-w-[180px]">{order.product}</td>
                <td className="p-4 text-xs font-medium">₹{order.amount.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase border ${STATUS_STYLES[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-xs opacity-60">
                  {new Date(order.date).toLocaleDateString()}
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
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="text-[10px] tracking-wider uppercase border-2 border-[#2a2520]/20 px-2 py-1 outline-none focus:border-[#2a2520] bg-white"
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

        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm opacity-40">
            No orders match your filters.
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
