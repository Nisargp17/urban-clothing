import { Link, useLocation } from 'react-router-dom';

const PATH_LABELS = {
  shop: 'Shop',
  collections: 'Collections',
  product: 'Product',
  cart: 'Cart',
  checkout: 'Checkout',
  compare: 'Compare',
  engineering: 'Engineering',
  'design-system': 'Design System',
  faq: 'FAQ',
  contact: 'Contact',
  wishlist: 'Wishlist',
  'track-order': 'Track Order',
  orders: 'Orders',
  account: 'Account',
  about: 'About',
  returns: 'Returns',
  terms: 'Terms',
  privacy: 'Privacy',
  cookies: 'Cookies',
  login: 'Sign In',
  register: 'Register',
  'order-confirmation': 'Order Confirmation',
};

export function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  if (paths.length === 0) return null;

  // The product detail page renders its own breadcrumb with the product title,
  // so we skip the generic one here to avoid a duplicate (and an ugly raw id).
  if (paths[0] === 'product') return null;

  return (
    <nav aria-label="Breadcrumb" className="px-4 md:px-[4vw] py-3 border-b border-[#2a2520]/5">
      <ol className="flex items-center gap-2 text-xs tracking-wider opacity-40">
        <li>
          <Link to="/" className="hover:opacity-80 transition-opacity">Home</Link>
        </li>
        {paths.map((segment, i) => {
          const isLast = i === paths.length - 1;
          const href = '/' + paths.slice(0, i + 1).join('/');
          const label = PATH_LABELS[segment] || segment;
          return (
            <li key={segment + i} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="opacity-60 truncate max-w-[200px]">{label}</span>
              ) : (
                <Link to={href} className="hover:opacity-80 transition-opacity">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
