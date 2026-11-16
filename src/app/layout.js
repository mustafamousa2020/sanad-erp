import { IBM_Plex_Sans_Arabic, Inter } from 'next/font/google';
import './globals.css';

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanad-erp-two.vercel.app';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#071713',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'سند ERP | نظام إدارة المبيعات والمخزون والحسابات والصيانة لسطح المكتب',
    template: '%s | سند ERP',
  },
  description:
    'سند ERP هو نظام ديسكتوب متكامل لإدارة المبيعات والمخزون والحسابات والصيانة، يعمل بدون إنترنت وبترخيص شراء لمرة واحدة (1,499 ج.م للجهاز الواحد) بدون اشتراكات شهرية.',
  keywords: [
    'سند ERP',
    'SANAD ERP',
    'برنامج إدارة المبيعات والصيانة',
    'برنامج مبيعات وإدارة محلات',
    'برنامج كاشير بدون إنترنت',
    'برنامج إدارة المخزون والحسابات',
    'برنامج مراكز صيانة كمبيوتر وموبايل',
    'نظام نقاط البيع POS',
  ],
  authors: [{ name: 'SANAD ERP', url: SITE_URL }],
  creator: 'SANAD ERP',
  publisher: 'SANAD ERP',
  category: 'business',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'سند ERP | إدارة شغلك بالكامل. من مكان واحد.',
    description:
      'نظام متكامل لإدارة المبيعات والمخزون والحسابات والصيانة لسطح المكتب. يعمل بدون إنترنت، بياناتك على جهازك، وبترخيص شراء لمرة واحدة بدون اشتراكات إجبارية.',
    url: SITE_URL,
    siteName: 'سند ERP | SANAD ERP',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/screenshots/dashboard.jpg',
        width: 1280,
        height: 753,
        alt: 'لوحة التحكم الرئيسية في نظام سند ERP لسطح المكتب',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سند ERP | إدارة شغلك بالكامل. من مكان واحد.',
    description:
      'نظام متكامل لإدارة المبيعات والمخزون والحسابات والصيانة لسطح المكتب. يعمل بدون إنترنت وبترخيص شراء لمرة واحدة.',
    images: ['/screenshots/dashboard.jpg'],
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
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'سند ERP (SANAD ERP)',
        operatingSystem: 'Windows',
        applicationCategory: 'BusinessApplication',
        description:
          'نظام سطح مكتب متكامل لإدارة المبيعات ونقاط البيع (POS) والمخزون والحسابات والصيانة، يعمل محلياً بدون إنترنت بترخيص شراء لمرة واحدة.',
        url: SITE_URL,
        image: `${SITE_URL}/screenshots/dashboard.jpg`,
        screenshot: [
          `${SITE_URL}/screenshots/dashboard.jpg`,
          `${SITE_URL}/screenshots/pos.jpg`,
          `${SITE_URL}/screenshots/inventory.jpg`,
          `${SITE_URL}/screenshots/repairs.jpg`,
          `${SITE_URL}/screenshots/customers.jpg`,
          `${SITE_URL}/screenshots/reports.jpg`,
        ],
        softwareVersion: '1.0.0',
        inLanguage: 'ar',
        offers: {
          '@type': 'Offer',
          price: '1499',
          priceCurrency: 'EGP',
          availability: 'https://schema.org/InStock',
          description: 'ترخيص شراء لمرة واحدة لجهاز كمبيوتر واحد بدون اشتراكات شهرية إلزامية.',
        },
      },
      {
        '@type': 'Organization',
        name: 'سند ERP | SANAD ERP',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.jpg`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+20-100-240-3727',
          contactType: 'sales',
          email: 'sanad.erp@outlook.com',
          availableLanguage: ['Arabic'],
        },
      },
    ],
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
