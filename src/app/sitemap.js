export default function sitemap() {
  const baseUrl = 'https://sanad-erp-two.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/dashboard_mockup.jpg`,
        `${baseUrl}/logo.jpg`,
        `${baseUrl}/tabs/tab_0_dashboard.jpg`,
        `${baseUrl}/tabs/tab_1_pos.jpg`,
        `${baseUrl}/tabs/tab_2_repairs.jpg`,
        `${baseUrl}/tabs/tab_3_inventory.jpg`,
      ],
    },
  ];
}
