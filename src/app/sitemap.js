export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanad-erp-two.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/logo.jpg`,
        `${baseUrl}/screenshots/dashboard.jpg`,
        `${baseUrl}/screenshots/pos.jpg`,
        `${baseUrl}/screenshots/inventory.jpg`,
        `${baseUrl}/screenshots/repairs.jpg`,
        `${baseUrl}/screenshots/customers.jpg`,
        `${baseUrl}/screenshots/reports.jpg`,
      ],
    },
  ];
}
