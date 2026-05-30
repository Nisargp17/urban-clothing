import { useState, useMemo } from 'react';

const MOCK_CUSTOMERS = [
  { _id: 'u1', name: 'Alex Rivera', email: 'alex@example.com', city: 'Mumbai', orders: 4, totalSpent: 12450, joined: '2025-01-15' },
  { _id: 'u2', name: 'Sam Thomas', email: 'sam@example.com', city: 'Delhi', orders: 2, totalSpent: 3890, joined: '2025-02-20' },
  { _id: 'u3', name: 'Jordan Kim', email: 'jordan@example.com', city: 'Bangalore', orders: 7, totalSpent: 21340, joined: '2024-11-08' },
  { _id: 'u4', name: 'Morgan Lee', email: 'morgan@example.com', city: 'Hyderabad', orders: 1, totalSpent: 1799, joined: '2025-05-01' },
  { _id: 'u5', name: 'Casey Williams', email: 'casey@example.com', city: 'Chennai', orders: 3, totalSpent: 8950, joined: '2025-03-12' },
  { _id: 'u6', name: 'Taylor Park', email: 'taylor@example.com', city: 'Pune', orders: 5, totalSpent: 15600, joined: '2024-12-25' },
  { _id: 'u7', name: 'Riley Jones', email: 'riley@example.com', city: 'Kolkata', orders: 2, totalSpent: 4500, joined: '2025-04-18' },
  { _id: 'u8', name: 'Quinn Mitchell', email: 'quinn@example.com', city: 'Ahmedabad', orders: 6, totalSpent: 18900, joined: '2024-10-05' },
  { _id: 'u9', name: 'Avery Brown', email: 'avery@example.com', city: 'Jaipur', orders: 1, totalSpent: 2200, joined: '2025-05-20' },
  { _id: 'u10', name: 'Sage Davis', email: 'sage@example.com', city: 'Surat', orders: 3, totalSpent: 7600, joined: '2025-01-30' },
];

export default function AdminCustomers() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filtered = useMemo(() => {
    let list = [...MOCK_CUSTOMERS];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'orders') return b.orders - a.orders;
      if (sortBy === 'spent') return b.totalSpent - a.totalSpent;
      if (sortBy === 'joined') return new Date(b.joined) - new Date(a.joined);
      return 0;
    });
    return list;
  }, [search, sortBy]);

  const totalCustomers = MOCK_CUSTOMERS.length;
  const totalRevenue = MOCK_CUSTOMERS.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrders = (MOCK_CUSTOMERS.reduce((sum, c) => sum + c.orders, 0) / totalCustomers).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-[0.1em]">CUSTOMERS</h2>
          <p className="text-sm text-[#2a2520]/40 mt-1">{filtered.length} customers</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
          <p className="text-xs tracking-[0.15em] text-[#2a2520]/50 uppercase">Total Customers</p>
          <p className="text-2xl font-bold mt-2 text-[#2a2520]">{totalCustomers}</p>
        </div>
        <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
          <p className="text-xs tracking-[0.15em] text-[#2a2520]/50 uppercase">Total Revenue</p>
          <p className="text-2xl font-bold mt-2 text-[#2a2520]">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
          <p className="text-xs tracking-[0.15em] text-[#2a2520]/50 uppercase">Avg Orders / Customer</p>
          <p className="text-2xl font-bold mt-2 text-[#2a2520]">{avgOrders}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 border-b-2 border-[#2a2520]/10 pb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full max-w-md bg-transparent border-2 border-[#2a2520]/20 px-4 py-2 text-sm outline-none focus:border-[#2a2520] transition-colors"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border-2 border-[#2a2520]/20 px-4 py-2 text-sm outline-none focus:border-[#2a2520] bg-white"
        >
          <option value="name">Sort by Name</option>
          <option value="orders">Sort by Orders</option>
          <option value="spent">Sort by Spent</option>
          <option value="joined">Sort by Joined</option>
        </select>
      </div>

      {/* Table */}
      <div className="border-2 border-[#2a2520] bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-[#2a2520]/10 text-left text-xs tracking-[0.1em] text-[#2a2520]/40">
              <th className="p-4 font-medium">CUSTOMER</th>
              <th className="p-4 font-medium">CITY</th>
              <th className="p-4 font-medium">ORDERS</th>
              <th className="p-4 font-medium">TOTAL SPENT</th>
              <th className="p-4 font-medium">JOINED</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr key={customer._id} className="border-b border-[#2a2520]/5 hover:bg-[#f5efe6] transition-colors">
                <td className="p-4">
                  <p className="text-xs font-medium">{customer.name}</p>
                  <p className="text-[10px] opacity-50">{customer.email}</p>
                </td>
                <td className="p-4 text-xs">{customer.city}</td>
                <td className="p-4 text-xs font-medium">{customer.orders}</td>
                <td className="p-4 text-xs font-medium">₹{customer.totalSpent.toLocaleString()}</td>
                <td className="p-4 text-xs opacity-60">{new Date(customer.joined).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm opacity-40">
            No customers match your search.
          </div>
        )}
      </div>
    </div>
  );
}
