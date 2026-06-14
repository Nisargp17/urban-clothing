import { Component } from 'react';
import { Link } from 'react-router-dom';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught message:', error?.message);
      console.error('ErrorBoundary caught stack:', error?.stack);
      console.error('ErrorBoundary caught info:', errorInfo);
    }
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 bg-[#f5efe6]">
          <p className="text-[10px] tracking-[0.3em] opacity-40 mb-4">SOMETHING WENT WRONG</p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-[0.85] mb-6">
            We Will Be<br />Right Back
          </h1>
          <p className="text-sm opacity-50 max-w-md text-center mb-8">
            An unexpected error occurred. Please try refreshing the page or return home.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 border-2 border-[#2a2520] text-xs tracking-[0.2em] font-medium hover:bg-[#2a2520] hover:text-white transition-all"
            >
              REFRESH
            </button>
            <Link
              to="/"
              className="px-8 py-3 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
            >
              HOME
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
