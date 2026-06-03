import { Helmet } from 'react-helmet-async';

export function SEO({ title, description, pathname = '', type = 'website', noindex = false }) {
  const siteUrl = 'https://urbanclothing.com';
  const fullUrl = `${siteUrl}${pathname}`;
  const fullTitle = 'Urban Clothing';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />

      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:url" content={fullUrl} />
    </Helmet>
  );
}
