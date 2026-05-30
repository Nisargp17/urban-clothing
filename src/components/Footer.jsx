import { useState } from 'react';
import { Link } from 'react-router-dom';
import mail from '/src/assets/email.svg';
import circle from '/src/assets/circle.svg';
import arrow from '/src/assets/arrow.svg';

const ROUTE_MAP = {
  FAQ: '/faq',
  CONTACTS: '/contact',
  'TRACK ORDER': '/track-order',
};

function HoverLink({ label }) {
  const to = ROUTE_MAP[label];
  const content = (
    <div className="h-8 md:h-12 overflow-hidden group relative w-max">
      <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-[50%]">
        <div className="h-8 md:h-12 flex items-center justify-start text-sm md:text-lg">
          {label}
        </div>
        <div className="h-8 md:h-12 flex items-center justify-start text-sm md:text-lg">
          {label}
        </div>
      </div>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const leftLinks = ['FAQ', 'RETURNS', 'CONTACTS', 'TRACK ORDER'];
  const rightLinks = ['TERMS', 'PRIVACY', 'COOKIE'];
  const socialLinks = [
    { name: 'IG', url: '#' },
    { name: 'TW', url: '#' },
    { name: 'FB', url: '#' },
  ];

  return (
    <footer className="relative min-h-[40vh] md:h-[60vh] bg-[#ede6da] flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-[5vw] py-8 md:py-0 z-50 gap-8 md:gap-0">
      <div className="flex flex-col justify-between h-auto md:h-[40vh] gap-6 md:gap-0">
        <img className="w-8 md:w-[4vw]" src={mail} alt="mail" loading="lazy" />

        <div>
          <div className="text-xs md:text-[1vw] text-gray-700 mb-2 tracking-wider">
            SUBSCRIBE TO OUR NEWSLETTER
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 text-sm text-[#2a2520]">
              <svg className="w-4 h-4 text-[#c4a35a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="border-b-2 border-[#2a2520] pb-2 md:pb-[2vh] flex gap-2 items-center">
              <input
                className="w-48 md:w-[20vw] text-sm md:text-[1.2vw] bg-transparent outline-none"
                type="email"
                placeholder="email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="text-xs md:text-[1vw] font-medium hover:underline" type="submit">
                SUBMIT
              </button>
            </form>
          )}

          {/* Social links */}
          <div className="flex gap-3 mt-4 md:mt-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="w-8 h-8 border-2 border-[#2a2520] flex items-center justify-center text-[10px] font-bold tracking-wider hover:bg-[#2a2520] hover:text-white transition-all"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-8 md:gap-[8vw] items-start w-full md:w-auto">
        <div className="flex gap-6 md:gap-[5vw]">
          <div className="flex flex-col gap-2 md:gap-[2vh]">
            {leftLinks.map((label) => (
              <HoverLink key={label} label={label} />
            ))}
          </div>
          <div className="flex flex-col gap-2 md:gap-[2vh]">
            {rightLinks.map((label) => (
              <HoverLink key={label} label={label} />
            ))}
          </div>
        </div>

        <button
          onClick={scrollToTop}
          className="hidden md:flex items-center justify-center rotate-[270deg] hover:rotate-[990deg] hover:scale-110 transition-all duration-1500 ml-auto"
          aria-label="Scroll to top"
        >
          <div className="w-10 md:w-[5vw] relative">
            <img className="w-full" src={circle} alt="circle" loading="lazy" />
            <img
              className="absolute top-1/2 left-1/2 w-[50%] -translate-x-1/2 -translate-y-1/2"
              src={arrow}
              alt="arrow"
              loading="lazy"
            />
          </div>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
