import { InfoPageLayout } from '../../components/InfoPageLayout';

const SECTIONS = [
  {
    heading: 'What are cookies?',
    body: 'Cookies are small text files stored on your device when you visit a website. They help the site remember your actions and preferences over time.',
  },
  {
    heading: 'How we use cookies',
    body: (
      <>
        <p>We use cookies for a few specific purposes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="font-medium">Essential:</span> keep you signed in and remember your cart and wishlist.</li>
          <li><span className="font-medium">Preferences:</span> remember settings like sound and motion choices.</li>
          <li><span className="font-medium">Analytics:</span> understand how the site is used so we can improve it.</li>
        </ul>
      </>
    ),
  },
  {
    heading: 'Local storage',
    body: 'For a faster experience, your cart, wishlist, and recently viewed items are stored locally in your browser rather than on our servers. You can clear these at any time through your browser settings.',
  },
  {
    heading: 'Managing cookies',
    body: 'Most browsers let you refuse or delete cookies. Note that disabling essential cookies may affect core features like staying signed in or keeping items in your cart.',
  },
  {
    heading: 'Contact',
    body: 'Questions about our use of cookies? Reach us through the Contact page.',
  },
  {
    heading: 'Note',
    body: 'This page is a good-faith template and not legal advice. Please have it reviewed by qualified legal counsel before launch.',
  },
];

export default function CookiePage() {
  return (
    <InfoPageLayout
      title="Cookie Policy"
      description="How Urban Clothing uses cookies and local storage to operate and improve the site."
      pathname="/cookies"
      eyebrow="Legal"
      intro="This policy explains how we use cookies and similar technologies on our site."
      lastUpdated="January 2025"
      sections={SECTIONS}
    />
  );
}
