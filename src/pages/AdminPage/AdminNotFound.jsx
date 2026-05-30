import { Link } from 'react-router-dom';

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-[#2a2520]">404</h1>
      <p className="text-sm tracking-[0.15em] text-[#2a2520]/40 mt-2 uppercase">Page Not Found</p>
      <p className="text-xs text-[#2a2520]/40 mt-4 max-w-xs">
        The admin page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/admin"
        className="mt-8 px-6 py-3 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
      >
        BACK TO DASHBOARD
      </Link>
    </div>
  );
}
