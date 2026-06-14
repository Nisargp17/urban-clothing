import { useState, useRef, useEffect } from 'react';
import { SEO } from '../../components/SEO';
import { ScrollReveal } from '../../components/ScrollReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClasses = (field) =>
    `w-full px-0 py-3 bg-transparent border-b-2 transition-all duration-300 outline-none text-base md:text-lg font-medium ${
      focusedField === field || formData[field] ? 'border-[#2a2520]' : 'border-[#2a2520]/20'
    }`;

  const labelClasses = (field) =>
    `text-xs tracking-[0.2em] transition-all duration-300 ${
      focusedField === field || formData[field] ? 'text-[#2a2520] opacity-100' : 'opacity-40'
    }`;

  return (
    <>
      <SEO title="Contact" description="Get in touch with Urban Clothing." pathname="/contact" />
      <div className="min-h-screen pt-20 md:pt-24">
        <div className="px-4 md:px-[6vw] max-w-6xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-2">GET IN TOUCH</p>
              <h1 className="text-4xl md:text-6xl font-semibold leading-[0.95] mb-3">Contact</h1>
              <p className="text-sm md:text-base opacity-60 max-w-md">
                Questions, support, wholesale inquiries — we&apos;d love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Info column */}
            <div className="space-y-10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">EMAIL</p>
                  <p className="text-base md:text-lg font-medium hover:underline cursor-pointer">hello@urbanclothing.com</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">PHONE</p>
                  <p className="text-base md:text-lg font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">ADDRESS</p>
                <p className="text-base md:text-lg leading-relaxed">
                  Urban Clothing HQ<br />
                  123 Fashion Street<br />
                  Mumbai, MH 400001<br />
                  India
                </p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] opacity-40 mb-3">FOLLOW US</p>
                <div className="flex gap-4">
                  {['Instagram', 'Twitter', 'Facebook'].map((social) => (
                    <button key={social} className="text-sm underline opacity-50 hover:opacity-100 transition-opacity">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form column */}
            <div>
              {submitted ? (
                <div className="border-2 border-[#2a2520] p-10 text-center">
                  <div className="w-14 h-14 bg-[#c4a35a] flex items-center justify-center mx-auto mb-5">
                    <svg className="w-7 h-7 text-[#2a2520]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-sm opacity-60">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div>
                      <label className={labelClasses('name')}>NAME</label>
                      <input
                        required type="text" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                        className={inputClasses('name')} placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className={labelClasses('email')}>EMAIL</label>
                      <input
                        required type="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                        className={inputClasses('email')} placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses('subject')}>SUBJECT</label>
                    <input
                      required type="text" value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)}
                      className={inputClasses('subject')} placeholder="What is this about?"
                    />
                  </div>
                  <div>
                    <label className={labelClasses('message')}>MESSAGE</label>
                    <textarea
                      required rows={4} value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                      className={`${inputClasses('message')} resize-none`} placeholder="Tell us more..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#2a2520] text-white text-sm tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all duration-300"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
