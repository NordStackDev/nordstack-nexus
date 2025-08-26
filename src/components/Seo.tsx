import React from "react";
import { Helmet } from "react-helmet";

export const Seo: React.FC<{
  title: string;
  description: string;
  ogImage?: string;
  url?: string;
  children?: React.ReactNode;
}> = ({ title, description, ogImage, url, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {/* Example JSON-LD structured data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NordStack Nexus",
          url: url || "https://nordstack.dev",
          logo: ogImage || "/opengraph-image.webp",
        })}
      </script>
    </Helmet>
    {children}
  </>
);
