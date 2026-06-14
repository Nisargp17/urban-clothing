import { InfoPageLayout } from '../../components/InfoPageLayout';

const SECTIONS = [
  {
    heading: '1. Acceptance of terms',
    body: 'By accessing or using the Urban Clothing website and placing an order, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.',
  },
  {
    heading: '2. Account registration',
    body: 'To place orders you may need to create an account. You are responsible for keeping your login credentials confidential and for all activity that occurs under your account. Notify us immediately of any unauthorized use.',
  },
  {
    heading: '3. Orders and pricing',
    body: 'All prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise. We reserve the right to refuse or cancel any order, including in cases of suspected fraud, pricing errors, or stock unavailability. If we cancel an order you have paid for, you will receive a full refund.',
  },
  {
    heading: '4. Shipping and delivery',
    body: 'Delivery timelines are estimates and not guaranteed. Risk of loss passes to you upon delivery to the address you provide. Please ensure your shipping details are accurate at checkout.',
  },
  {
    heading: '5. Returns and refunds',
    body: 'Returns and refunds are governed by our Returns & Exchanges policy. Please review it for eligibility, timelines, and exclusions.',
  },
  {
    heading: '6. Intellectual property',
    body: 'All content on this site — including logos, product imagery, copy, and design — is the property of Urban Clothing or its licensors and may not be reproduced without written permission.',
  },
  {
    heading: '7. Limitation of liability',
    body: 'To the maximum extent permitted by law, Urban Clothing is not liable for indirect, incidental, or consequential damages arising from your use of the site or products. Our total liability is limited to the amount you paid for the relevant order.',
  },
  {
    heading: '8. Governing law',
    body: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in your registered place of business.',
  },
  {
    heading: '9. Contact',
    body: 'Questions about these terms? Reach us through the Contact page and our team will respond.',
  },
  {
    heading: 'Note',
    body: 'This page is a good-faith template and not legal advice. Please have it reviewed and customized by qualified legal counsel before launch.',
  },
];

export default function TermsPage() {
  return (
    <InfoPageLayout
      title="Terms of Service"
      description="The terms and conditions governing your use of the Urban Clothing website and purchases."
      pathname="/terms"
      eyebrow="Legal"
      intro="Please read these terms carefully before using our site or placing an order."
      lastUpdated="January 2025"
      sections={SECTIONS}
    />
  );
}
