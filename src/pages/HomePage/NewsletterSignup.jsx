import { useState, useRef, useEffect } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="px-4 md:px-[4vw] py-16 md:py-24 bg-[#f5efe6]">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-3">STAY IN THE LOOP</p>
        <h2 className="text-3xl md:text-5xl font-semibold mb-4">Join the Movement</h2>
        <p className="text-sm md:text-base opacity-60 mb-8 leading-relaxed">
          Subscribe for early access to new drops, exclusive offers, and behind-the-scenes content.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <svg className="w-5 h-5 text-[#c4a35a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>You&apos;re on the list. Welcome aboard.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border-2 border-[#2a2520] bg-transparent text-sm outline-none focus:bg-[#2a2520] focus:text-white transition-colors placeholder:text-[#2a2520]/40"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
