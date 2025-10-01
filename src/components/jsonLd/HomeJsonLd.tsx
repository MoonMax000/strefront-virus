const HomeJsonLd = () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Live Streaming",
          item: "https://streaming.tyriantrade.com/home"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "💬 Watch Free!",
          item: "https://streaming.tyriantrade.com/home#watch"
        }
      ]
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  };
  
  export default HomeJsonLd;
  