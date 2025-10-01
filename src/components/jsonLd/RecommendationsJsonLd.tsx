const RecommendationsJsonLd = () => {
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
          name: "💜 Recommendations",
          item: "https://streaming.tyriantrade.com/recommendations"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "💬 Watch Free!",
          item: "https://streaming.tyriantrade.com/recommendations#watch"
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
  
  export default RecommendationsJsonLd;
  