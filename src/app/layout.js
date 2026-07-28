import './globals.css';

export const metadata = {
  title: 'سند لإدارة المبيعات والصيانة | نظام متكامل لمحلات الكمبيوتر والأجهزة',
  description: 'نظام سند هو تطبيق سطح مكتب متكامل (Offline-first) لإدارة مبيعات محلات الأجهزة والكمبيوتر ونقاط البيع، مع نظام احترافي لتتبع تذاكر صيانة الأجهزة والقطع والمخازن.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
