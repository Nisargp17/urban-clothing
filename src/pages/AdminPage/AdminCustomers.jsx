import { useState, useMemo } from 'react';
import { useGetAdminUsersQuery } from '../../store/apiSlice';
import { TableSkeleton } from '../../components/ProductSkeleton';

export default function AdminCustomers() {
  const { data, isLoading, error, refetch } = useGetAdminUsersQuery();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const customers = useMemo(() => {
    const raw = data?.data || data || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  const filtered = useMemo(() => {
    let list = [...customers];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'orders') return (b.orders || 0) - (a.orders || 0);
      if (sortBy === 'spent') return (b.totalSpent || 0) - (a.totalSpent || 0);
      if (sortBy === 'joined') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return 0;
    });
    return list;
  }, [customers, search, sortBy]);

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
  const avgOrders = totalCustomers > 0
    ? (customers.reduce((sum, c) => sum + (c.orders || 0), 0) / totalCustomers).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-[0.1em]">CUSTOMERS</h2>
          <p className="text-sm text-[#2a2520]/40 mt-1">
            {isLoading ? 'Loading...' : `${filtered.length} customers`}
          </p>
        </div>
      </div>

      {error && (
        <div className="text-xs text-red-600 border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between">
          <span>Failed to load customers. {error.data?.message || error.error || 'Please try again.'}</span>
          <button onClick={refetch} className="underline font-medium">Retry</button>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
          <p className="text-xs tracking-[0.15em] text-[#2a2520]/50 uppercase">Total Customers</p>
          {isLoading ? (
            <div className="h-8 mt-2 bg-[#2a2520]/10 animate-pulse" />
          ) : (
            <p className="text-2xl font-bold mt-2 text-[#2a2520]">{totalCustomers}</p>
          )}
        </div>
        <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
          <p className="text-xs tracking-[0.15em] text-[#2a2520]/50 uppercase">Total Revenue</p>
          {isLoading ? (
            <div className="h-8 mt-2 bg-[#2a2520]/10 animate-pulse" />
          ) : (
            <p className="text-2xl font-bold mt-2 text-[#2a2520]">₹{totalRevenue.toLocaleString()}</p>
          )}
        </div>
        <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
          <p className="text-xs tracking-[0.15em] text-[#2a2520]/50 uppercase">Avg Orders / Customer</p>
          {isLoading ? (
            <div className="h-8 mt-2 bg-[#2a2520]/10 animate-pulse" />
          ) : (
            <p className="text-2xl font-bold mt-2 text-[#2a2520]">{avgOrders}</p>
          )}
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
        {isLoading && <TableSkeleton rows={6} cols={5} />}
        {!isLoading && (
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
                  <td className="p-4 text-xs">{customer.city || '—'}</td>
                  <td className="p-4 text-xs font-medium">{customer.orders || 0}</td>
                  <td className="p-4 text-xs font-medium">₹{(customer.totalSpent || 0).toLocaleString()}</td>
                  <td className="p-4 text-xs opacity-60">{new Date(customer.createdAt || customer.joined).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="p-8 text-center text-sm opacity-40">
            {customers.length === 0 ? 'No customers found.' : 'No customers match your search.'}
          </div>
        )}
      </div>
    </div>
  );
}
