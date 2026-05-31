import { Helmet } from "react-helmet-async";

export const SITE = "https://www.tcltechsolutions.com";
const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/QZAeNqy6yxOqJTh5qCxXoi9l0uO2/social-images/social-1775029416811-HomeTheater.webp";
const DEFAULT_OG_IMAGE_ALT =
  "Professional home automation installation by The Connected Lifestyle";
const SITE_NAME = "The Connected Lifestyle";

interface SeoProps {
  title: string;
  description: string;
  path: string; // e.g. "/services"
  ogType?: "website" | "article";
  ogImage?: string;
  ogImageAlt?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function Seo({
  title,
  description,
  path,
  ogType = "website",
  ogImage,
  ogImageAlt,
  jsonLd,
}: SeoProps) {
  const url = `${SITE}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const imageAlt = ogImageAlt ?? (ogImage ? title : DEFAULT_OG_IMAGE_ALT);
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
}