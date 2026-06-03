import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import heroImg from '/src/assets/shoe3.jpg';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [formError, setFormError] = useState('');
  const { register, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  const inputClasses = (field) =>
    `w-full px-0 py-3 bg-transparent border-b-2 transition-all duration-300 outline-none text-base md:text-lg font-medium ${
      focusedField === field || formData[field]
        ? 'border-[#2a2520]'
        : 'border-[#2a2520]/20'
    }`;

  return (
    <>
      <SEO title="Register" description="Create your Urban Clothing account." pathname="/register" noindex />
      <div className="min-h-screen flex">
        {/* Left — Editorial Image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img
            src={heroImg}
            alt="Urban footwear"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2520]/60 via-[#2a2520]/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <p className="text-xs tracking-[0.3em] opacity-60 mb-3">URBAN CLOTHING</p>
            <h2 className="text-4xl xl:text-5xl font-semibold leading-[0.95] mb-4">
              Begin Your<br />Journey
            </h2>
            <p className="text-sm opacity-60 max-w-xs leading-relaxed">
              Join thousands of explorers who choose Urban for their everyday adventures.
            </p>
          </div>
        </div>

        {/* Right — Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-16 py-20">
          <div className="w-full max-w-sm">
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] opacity-40 mb-2">ACCOUNT</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-[0.95]">Join<br />Us</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`text-xs tracking-[0.2em] transition-all duration-300 ${
                  focusedField === 'name' || formData.name ? 'text-[#2a2520] opacity-100' : 'opacity-40'
                }`}>FULL NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('name')}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className={`text-xs tracking-[0.2em] transition-all duration-300 ${
                  focusedField === 'email' || formData.email ? 'text-[#2a2520] opacity-100' : 'opacity-40'
                }`}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('email')}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className={`text-xs tracking-[0.2em] transition-all duration-300 ${
                  focusedField === 'password' || formData.password ? 'text-[#2a2520] opacity-100' : 'opacity-40'
                }`}>PASSWORD</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('password')}
                  placeholder="Min. 6 characters"
                />
              </div>

              <div>
                <label className={`text-xs tracking-[0.2em] transition-all duration-300 ${
                  focusedField === 'confirmPassword' || formData.confirmPassword ? 'text-[#2a2520] opacity-100' : 'opacity-40'
                }`}>CONFIRM PASSWORD</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('confirmPassword')}
                  placeholder="Repeat password"
                />
              </div>

              {(formError || error) && (
                <p className="text-xs text-red-600 tracking-wide">{formError || error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#2a2520] text-white text-sm tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    CREATING ACCOUNT...
                  </span>
                ) : 'CREATE ACCOUNT'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#2a2520]/10">
              <p className="text-sm opacity-60">
                Already have an account?{' '}
                <Link to="/login" className="font-medium underline hover:no-underline transition-all">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
