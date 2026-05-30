import { memo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

function generateMockOrders() {
  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
  const orders = [];
  for (let i = 0; i < 8; i++) {
    const product = PRODUCTS[i % PRODUCTS.length];
    orders.push({
      _id: `order_${i}`,
      orderId: `URB-2025-${8842 + i}`,
      customer: ['Alex R.', 'Sam T.', 'Jordan K.', 'Morgan L.', 'Casey W.', 'Taylor P.', 'Riley J.', 'Quinn M.'][i],
      product: product.title,
      amount: product.newPrice * (1 + (i % 3)),
      status: statuses[i % statuses.length],
      date: new Date(Date.now() - i * 86400000 * 2).toISOString(),
    });
  }
  return orders;
}

const MOCK_ORDERS = generateMockOrders();

const CHART_DATA = [
  { day: 'Mon', revenue: 42000, orders: 12 },
  { day: 'Tue', revenue: 38000, orders: 10 },
  { day: 'Wed', revenue: 55000, orders: 16 },
  { day: 'Thu', revenue: 48000, orders: 14 },
  { day: 'Fri', revenue: 62000, orders: 20 },
  { day: 'Sat', revenue: 71000, orders: 24 },
  { day: 'Sun', revenue: 45000, orders: 15 },
];

const STAT_CARDS = [
  { label: 'Total Orders', value: '156', change: '+12%', positive: true },
  { label: 'Total Revenue', value: '₹284,750', change: '+8.5%', positive: true },
  { label: 'Total Products', value: `${PRODUCTS.length}`, change: '+3', positive: true },
  { label: 'Pending Orders', value: '12', change: '-2', positive: false },
];

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  processing: 'bg-blue-100 text-blue-800 border-blue-300',
  shipped: 'bg-purple-100 text-purple-800 border-purple-300',
  delivered: 'bg-green-100 text-green-800 border-green-300',
};

function StatCard({ label, value, change, positive }) {
  return (
    <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
      <p className="text-xs tracking-[0.15em] text-[#2a2520]/50 uppercase">{label}</p>
      <p className="text-2xl font-bold mt-2 text-[#2a2520]">{value}</p>
      <p className={`text-xs mt-1 font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </p>
    </div>
  );
}

const MemoStatCard = memo(StatCard);

export default function AdminDashboard() {
  const recentOrders = MOCK_ORDERS.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold tracking-[0.1em]">DASHBOARD</h2>
        <p className="text-sm text-[#2a2520]/40 mt-1">Overview of your store performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <MemoStatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Recent Orders */}
      <div className="border-2 border-[#2a2520] bg-white">
        <div className="flex items-center justify-between p-5 border-b-2 border-[#2a2520]/10">
          <h3 className="text-sm font-bold tracking-[0.15em]">RECENT ORDERS</h3>
          <Link
            to="/admin/orders"
            className="text-xs tracking-[0.1em] underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2520]/10 text-left text-xs tracking-[0.1em] text-[#2a2520]/40">
                <th className="p-4 font-medium">ORDER</th>
                <th className="p-4 font-medium">CUSTOMER</th>
                <th className="p-4 font-medium">PRODUCT</th>
                <th className="p-4 font-medium">AMOUNT</th>
                <th className="p-4 font-medium">STATUS</th>
                <th className="p-4 font-medium">DATE</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id} className="border-b border-[#2a2520]/5 hover:bg-[#f5efe6] transition-colors">
                  <td className="p-4 font-medium">{order.orderId}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4 text-xs opacity-70 truncate max-w-[200px]">{order.product}</td>
                  <td className="p-4 font-medium">₹{order.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase border ${STATUS_STYLES[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs opacity-60">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border-2 border-[#2a2520] bg-white p-5">
          <h3 className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 uppercase mb-4">REVENUE THIS WEEK</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c4a35a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#c4a35a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2520" strokeOpacity={0.08} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#2a2520', opacity: 0.5 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#2a2520', opacity: 0.5 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ border: '2px solid #2a2520', fontSize: 12, borderRadius: 0 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#c4a35a" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border-2 border-[#2a2520] bg-white p-5">
          <h3 className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 uppercase mb-4">ORDERS THIS WEEK</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2520" strokeOpacity={0.08} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#2a2520', opacity: 0.5 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#2a2520', opacity: 0.5 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  formatter={(value) => [value, 'Orders']}
                  contentStyle={{ border: '2px solid #2a2520', fontSize: 12, borderRadius: 0 }}
                />
                <Bar dataKey="orders" fill="#2a2520" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/products"
          className="border-2 border-[#2a2520] bg-white p-5 hover:bg-[#2a2520] hover:text-white transition-all group"
        >
          <h3 className="text-sm font-bold tracking-[0.15em]">MANAGE PRODUCTS</h3>
          <p className="text-xs opacity-60 mt-2 group-hover:opacity-80">Add, edit, or remove products from your catalog</p>
        </Link>

        <Link
          to="/admin/orders"
          className="border-2 border-[#2a2520] bg-white p-5 hover:bg-[#2a2520] hover:text-white transition-all group"
        >
          <h3 className="text-sm font-bold tracking-[0.15em]">MANAGE ORDERS</h3>
          <p className="text-xs opacity-60 mt-2 group-hover:opacity-80">Update order status and track fulfillment</p>
        </Link>

        <Link
          to="/admin/customers"
          className="border-2 border-[#2a2520] bg-white p-5 hover:bg-[#2a2520] hover:text-white transition-all group"
        >
          <h3 className="text-sm font-bold tracking-[0.15em]">MANAGE CUSTOMERS</h3>
          <p className="text-xs opacity-60 mt-2 group-hover:opacity-80">View customer data and order history</p>
        </Link>
      </div>
    </div>
  );
}
