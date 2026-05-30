export function JsonLdOrganization() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Urban Clothing',
    url: 'https://urbanclothing.com',
    logo: 'https://urbanclothing.com/vite.svg',
    description: 'Premium urban trekking footwear designed for the modern explorer.',
    sameAs: [],
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}

export function JsonLdProduct({ name, description, image, price, currency = 'USD', availability = 'InStock' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    },
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}
