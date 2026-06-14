import { Link } from 'react-router-dom';
import { InfoPageLayout } from '../../components/InfoPageLayout';

const SECTIONS = [
  {
    heading: '30-day returns',
    body: 'You can return most unworn items within 30 days of delivery for a full refund to your original payment method. Items must be in original condition with tags attached and the original box included.',
  },
  {
    heading: 'How to start a return',
    body: (
      <>
        <p>
          Head to your <Link to="/orders" className="underline hover:text-[#c4a35a]">order history</Link>, open the
          order, and select <span className="font-medium">Request Return</span>. You will receive a prepaid shipping
          label by email within 24 hours.
        </p>
        <p>
          Prefer to talk to a human? <Link to="/contact" className="underline hover:text-[#c4a35a]">Contact our support team</Link> and
          we will set it up for you.
        </p>
      </>
    ),
  },
  {
    heading: 'Exchanges',
    body: 'Need a different size? Start an exchange from your order page and we will ship the replacement as soon as the original is scanned by the courier — so you are not waiting twice.',
  },
  {
    heading: 'Refund timing',
    body: 'Once we receive and inspect your return, refunds are processed within 3–5 business days. Depending on your bank or UPI provider, it may take a few additional days to appear on your statement.',
  },
  {
    heading: 'Non-returnable items',
    body: 'For hygiene reasons, socks and insoles cannot be returned once opened. Final-sale items are clearly marked at checkout and are not eligible for return or exchange.',
  },
];

export default function ReturnsPage() {
  return (
    <InfoPageLayout
      title="Returns & Exchanges"
      description="Urban Clothing's 30-day returns and exchanges policy. Free returns on all orders — start one from your order history."
      pathname="/returns"
      eyebrow="Help"
      intro="Free returns on all orders. If your gear is not right, we will make it right."
      sections={SECTIONS}
    />
  );
}
