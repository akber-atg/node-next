export default function SalonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",

    "@id": "https://www.mahlaha.com/#salon",
    name: "Mahlaha Salon",
    url: "https://www.mahlaha.com",
    telephone: "+16419808288",

    address: {
      "@type": "PostalAddress",
      streetAddress: "700 SE Prairie Park Ln",
      // Add addressLocality, addressRegion, and postalCode
      // once the full business address is confirmed.
      addressCountry: "US",
    },

    areaServed: [
      { "@type": "City", name: "Waukee, Iowa" },
      { "@type": "City", name: "West Des Moines, Iowa" },
      { "@type": "City", name: "Clive, Iowa" },
      { "@type": "City", name: "Urbandale, Iowa" },
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Salon Services",
      itemListElement: [
        "Haircuts",
        "Hair coloring",
        "Waxing",
        "Facials",
        "Threading",
      ].map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}