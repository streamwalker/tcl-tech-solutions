import { Helmet } from "react-helmet-async";

const SITE = "https://tcltechsolutions.com";

interface SeoProps {
  title: string;
  description: string;
  path: string; // e.g. "/services"
  ogType?: "website" | "article";
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function Seo({
  title,
  description,
  path,
  ogType = "website",
  ogImage,
  jsonLd,
}: SeoProps) {
  const url = `${SITE}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
}