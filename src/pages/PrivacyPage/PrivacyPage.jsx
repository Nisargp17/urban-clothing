import { InfoPageLayout } from '../../components/InfoPageLayout';

const SECTIONS = [
  {
    heading: 'Information we collect',
    body: 'We collect information you provide directly — such as your name, email, shipping address, and phone number — when you create an account or place an order. We also collect limited technical data (device, browser, and usage) to operate and improve the site.',
  },
  {
    heading: 'How we use your information',
    body: 'We use your information to process orders, provide customer support, send order updates, prevent fraud, and — only with your consent — send marketing communications. We do not sell your personal information.',
  },
  {
    heading: 'Payments',
    body: 'Payment details are processed by our payment partners over encrypted connections. We do not store full card numbers on our servers.',
  },
  {
    heading: 'Cookies and tracking',
    body: 'We use cookies and similar technologies to keep you signed in, remember your cart, and understand how the site is used. You can control cookies through your browser settings and our Cookie Policy.',
  },
  {
    heading: 'Data sharing',
    body: 'We share data only with service providers who help us operate (e.g. shipping, payments, analytics), under agreements that require them to protect your data and use it only for the services we request.',
  },
  {
    heading: 'Your rights',
    body: 'You may request access to, correction of, or deletion of your personal data, and you may opt out of marketing at any time. Contact us to exercise these rights and we will respond within a reasonable period.',
  },
  {
    heading: 'Data retention',
    body: 'We retain your information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce agreements.',
  },
  {
    heading: 'Contact',
    body: 'For privacy questions or requests, reach us through the Contact page.',
  },
  {
    heading: 'Note',
    body: 'This page is a good-faith template and not legal advice. Please have it reviewed for compliance with applicable laws (such as India\u2019s DPDP Act and the GDPR where relevant) before launch.',
  },
];

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      title="Privacy Policy"
      description="How Urban Clothing collects, uses, and protects your personal information."
      pathname="/privacy"
      eyebrow="Legal"
      intro="Your privacy matters. This policy explains what we collect, why, and the choices you have."
      lastUpdated="January 2025"
      sections={SECTIONS}
    />
  );
}
