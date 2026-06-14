import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} from '../../store/apiSlice';
import { updateUser } from '../../store/authSlice';
import { SEO } from '../../components/SEO';

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'orders', label: 'My Orders' },
  { id: 'security', label: 'Security' },
];

function ProfileTab({ user }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const result = await updateProfile(form).unwrap();
      setSuccess('Profile updated successfully.');
      if (result?.user) {
        dispatch(updateUser(result.user));
      }
    } catch (err) {
      setError(err?.data?.message || 'Failed to update profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">FULL NAME</label>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
          required
        />
      </div>
      <div>
        <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">EMAIL ADDRESS</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
          required
        />
      </div>
      {success && <p className="text-xs text-green-600 tracking-wide">{success}</p>}
      {error && <p className="text-xs text-red-600 tracking-wide">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2.5 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors disabled:opacity-50"
      >
        {isLoading ? 'SAVING...' : 'SAVE CHANGES'}
      </button>
    </form>
  );
}

function OrdersTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm opacity-60">View your complete order history, track shipments, and manage returns.</p>
      <Link
        to="/orders"
        className="inline-block px-6 py-2.5 border-2 border-[#2a2520] text-xs tracking-[0.15em] font-medium hover:bg-[#2a2520] hover:text-white transition-colors"
      >
        VIEW ALL ORDERS →
      </Link>
      <Link
        to="/track-order"
        className="inline-block px-6 py-2.5 border-2 border-[#2a2520]/20 text-xs tracking-[0.15em] font-medium hover:border-[#2a2520] hover:bg-[#2a2520] hover:text-white transition-colors ml-3"
      >
        TRACK AN ORDER
      </Link>
    </div>
  );
}

function SecurityTab() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    try {
      await updatePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }).unwrap();
      setSuccess('Password changed successfully.');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">CURRENT PASSWORD</label>
        <input
          type="password"
          value={form.currentPassword}
          onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))}
          className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
          required
        />
      </div>
      <div>
        <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">NEW PASSWORD</label>
        <input
          type="password"
          value={form.newPassword}
          onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
          className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
          required
          minLength={6}
        />
      </div>
      <div>
        <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">CONFIRM NEW PASSWORD</label>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
          className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
          required
        />
      </div>
      {success && <p className="text-xs text-green-600 tracking-wide">{success}</p>}
      {error && <p className="text-xs text-red-600 tracking-wide">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2.5 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors disabled:opacity-50"
      >
        {isLoading ? 'UPDATING...' : 'CHANGE PASSWORD'}
      </button>
    </form>
  );
}

export default function AccountPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  const authUser = useSelector((state) => state.auth.user);
  // Fetch fresh user data on mount; auto-refreshes when profile is updated
  const { data: meData } = useGetMeQuery(undefined, { skip: !isAuthenticated });
  const user = meData?.user || meData || authUser;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <>
      <SEO title="Account" description="Manage your Urban Clothing account." pathname="/account" noindex />
      <div className="min-h-screen bg-[#f5efe6] pt-20 sm:pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.3em] opacity-40 mb-2">ACCOUNT</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-[0.95]">{user?.name || 'My Account'}</h1>
            <p className="text-sm opacity-40 mt-2">{user?.email}</p>
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="inline-block mt-3 text-xs tracking-[0.15em] font-bold text-[#c4a35a] bg-[#2a2520] px-3 py-1.5 hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
              >
                GO TO ADMIN →
              </Link>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-[#2a2520]/10 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-xs md:text-sm tracking-[0.2em] transition-all relative ${
                  activeTab === tab.id
                    ? 'text-[#2a2520] font-medium'
                    : 'opacity-30 hover:opacity-60'
                }`}
              >
                {tab.label.toUpperCase()}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2a2520]" />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="border-2 border-[#2a2520] bg-white p-5 md:p-8 shadow-[4px_4px_0px_0px_#2a2520]">
            {activeTab === 'profile' && <ProfileTab user={user} />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'security' && <SecurityTab />}
          </div>
        </div>
      </div>
    </>
  );
}
