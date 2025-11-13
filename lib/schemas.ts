export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Autos Bustamante",
  image: "https://autosbustamante.com/logo.png",
  "@id": "https://autosbustamante.com",
  url: "https://autosbustamante.com",
  telephone: "+34675689111",
  email: "autosbustamante@hotmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Camino de Alcolea, 27",
    addressLocality: "Cabra",
    addressRegion: "Córdoba",
    postalCode: "14940",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.4718,
    longitude: -4.4364,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "17:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  sameAs: [
    // Agregar redes sociales cuando estén disponibles
    // "https://www.facebook.com/autosbustamante",
    // "https://www.instagram.com/autosbustamante",
  ],
  priceRange: "€€",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 37.4718,
      longitude: -4.4364,
    },
    geoRadius: "50000", // 50km radio
  },
}

export const breadcrumbListSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item: any, index: number) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})
