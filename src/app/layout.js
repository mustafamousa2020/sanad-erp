import './globals.css';

const SITE_URL = 'https://sanad-erp-two.vercel.app';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d5c58',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'نظام سند ERP | برنامج إدارة المبيعات والكاشير ومراكز الصيانة بدون إنترنت',
    template: '%s | نظام سند ERP',
  },
  description:
    'أدر محلك أو مركز الصيانة الخاص بك بذكاء مع نظام سند لسطح المكتب. برنامج كاشير ونقاط بيع (POS) وإدارة تذاكر صيانة الكمبيوتر والموبايل وجرد المخازن، يعمل 100% بدون إنترنت بترخيص مدى الحياة وبدون اشتراكات شهرية.',
  keywords: [
    'سند ERP',
    'برنامج سند للمبيعات والصيانة',
    'برنامج إدارة مراكز الصيانة',
    'برنامج صيانة كمبيوتر وموبايل',
    'برنامج كاشير بدون انترنت',
    'برنامج مبيعات ومخازن',
    'نظام نقاط البيع POS',
    'برنامج كاشير سوبر ماركت',
    'برنامج حسابات محلات',
    'برنامج جرد المخازن',
    'تذاكر صيانة الأجهزة',
    'Sanad ERP',
    'Offline POS System',
    'Repair Shop Management Software',
  ],
  authors: [{ name: 'Sanad ERP Team', url: SITE_URL }],
  creator: 'Sanad ERP',
  publisher: 'Sanad ERP',
  category: 'business',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'نظام سند ERP | برنامج إدارة المبيعات والكاشير ومراكز الصيانة بدون إنترنت',
    description:
      'الحل المتكامل لإدارة محلات الكمبيوتر، مراكز الصيانة، والمبيعات العامة (POS). يعمل 100% أوفلاين بترخيص مدى الحياة بدون اشتراكات شهرية. حمل نسختك التجريبية الآن!',
    url: SITE_URL,
    siteName: 'سند لإدارة المبيعات والصيانة - Sanad ERP',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/dashboard_mockup.jpg',
        width: 1200,
        height: 630,
        alt: 'واجهة نظام سند لإدارة المبيعات والصيانة - Sanad ERP Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نظام سند ERP | برنامج إدارة المبيعات والكاشير ومراكز الصيانة',
    description:
      'برنامج سطح مكتب احترافي لإدارة المبيعات ونقاط البيع وتذاكر الصيانة وجرد المخازن. يعمل بدون إنترنت وبترخيص مدى الحياة.',
    images: ['/dashboard_mockup.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'سند لإدارة المبيعات والصيانة (Sanad ERP)',
        operatingSystem: 'Windows 10, Windows 11',
        applicationCategory: 'BusinessApplication',
        description:
          'نظام سطح مكتب متكامل (Offline-first) لإدارة المبيعات ونقاط البيع (POS) وجرد المخازن وتذاكر صيانة الأجهزة لمحلات الكمبيوتر والموبايل والأنشطة التجارية.',
        url: SITE_URL,
        image: `${SITE_URL}/dashboard_mockup.jpg`,
        screenshot: `${SITE_URL}/tabs/tab_0_dashboard.jpg`,
        softwareVersion: '1.0.0',
        inLanguage: ['ar', 'en'],
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '2000',
          highPrice: '3000',
          priceCurrency: 'EGP',
          offerCount: '2',
          availability: 'https://schema.org/InStock',
        },
        featureList: [
          'يعمل 100% بدون إنترنت (Offline-first)',
          'ترخيص مدى الحياة بدون اشتراكات شهرية',
          'إدارة تذاكر الصيانة وطباعة إيصالات الاستلام',
          'نقاط بيع وكاشير سريع يدعم قارئ الباركود والطابعات الحرارية',
          'إدارة المخزون وتنبيهات النواقص وحسابات الموردين والعملاء',
          'تقارير الأرباح والمصروفات وصلاحيات المستخدمين',
        ],
      },
      {
        '@type': 'Organization',
        name: 'Sanad ERP - سند لإدارة المبيعات والصيانة',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.jpg`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+20-100-240-3727',
          contactType: 'sales',
          email: 'sanad.erp@outlook.com',
          areaServed: ['EG', 'SA', 'AE', 'KW', 'JO'],
          availableLanguage: ['Arabic', 'English'],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'هل يعمل برنامج سند ERP بدون إنترنت نهائياً؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'نعم، يعمل نظام سند ERP لسطح المكتب بنسبة 100% بدون إنترنت (Offline)، وتُحفظ جميع البيانات محلياً بأمان تام على جهازك دون أي توقف.',
            },
          },
          {
            '@type': 'Question',
            name: 'هل هناك اشتراكات شهرية أو رسوم تجديد سنوية؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'لا، نظام سند يمنحك ترخيصاً مدى الحياة بدفعة واحدة فقط دون أي رسوم شهرية أو سنوية إجبارية.',
            },
          },
          {
            '@type': 'Question',
            name: 'ما الفرق بين إصدار الصيانة وإصدار المبيعات العامة؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'إصدار المبيعات والصيانة مخصص لمحلات الكمبيوتر والموبايل والإلكترونيات ويضم قسم إدارة تذاكر الصيانة وطباعة إيصالات الاستلام وخصم قطع الغيار تلقائياً بجانب الكاشير والمخازن، بينما إصدار المبيعات العامة مخصص للمحلات التجارية والسوبرماركت ويركز على سرعة الكاشير (POS) وجرد المخازن وحسابات الموردين.',
            },
          },
          {
            '@type': 'Question',
            name: 'هل يدعم البرنامج قارئ الباركود وطابعات الفواتير الحرارية؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'نعم، يدعم النظام جميع أنواع قارئات الباركود وطابعات الفواتير الحرارية بمقاسات 80mm و 58mm وطباعة إيصالات الصيانة والفواتير الضريبية أو المبسطة.',
            },
          },
          {
            '@type': 'Question',
            name: 'كيف يتم حفظ البيانات وأخذ النسخ الاحتياطية؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'تُحفظ البيانات في قاعدة بيانات SQLite مشفرة وسريعة على جهازك، ويمكنك بضغطة زر أخذ نسخة احتياطية كاملة في أي وقت وحفظها على فلاشة خارجية أو سحابة خاصة بك.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
