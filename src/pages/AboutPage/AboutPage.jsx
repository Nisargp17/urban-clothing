import { InfoPageLayout } from '../../components/InfoPageLayout';

const SECTIONS = [
  {
    heading: 'Precision for the Unplanned',
    body: 'Urban Clothing builds footwear for the space where the city ends and the trail begins. Every pair is engineered to handle the detour — the unplanned 14km, the wet pavement, the gravel shortcut home. We believe gear should never be the reason you turn back.',
  },
  {
    heading: 'How we build',
    body: 'We start with full-grain leather and technical mesh, then test every outsole against real urban terrain. Nothing ships until it survives the conditions our customers actually face. We keep our range tight on purpose: fewer styles, made better, restocked rather than discounted into oblivion.',
  },
  {
    heading: 'Designed in studio, made to last',
    body: 'Our SS/25 collection is designed in-house and produced with manufacturing partners we audit for quality and fair labour. We would rather make a shoe you keep for five years than five shoes you replace every season.',
  },
  {
    heading: 'Our promise',
    body: 'Authentic materials, honest pricing, and a support team that answers like a human. If something is not right, we make it right — see our Returns & Exchanges policy for the details.',
  },
];

export default function AboutPage() {
  return (
    <InfoPageLayout
      title="About Us"
      description="Urban Clothing builds premium urban trekking footwear — engineered for the unplanned. Learn about how and why we make our gear."
      pathname="/about"
      eyebrow="Our Story"
      intro="We make premium urban trekking footwear for people who treat the city like terrain. Here is what we stand for."
      sections={SECTIONS}
    />
  );
}
