'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '../components/Icon';
import {
  SITE_CONFIG,
  getWhatsAppUrl,
  NAV_LINKS,
  HERO_CONTENT,
  VALUE_SECTION,
  PRODUCT_SCREENS,
  EDITIONS_SECTION,
  WHY_SANAD_SECTION,
  HOW_IT_WORKS_SECTION,
  PRICING_SECTION,
  VIDEOS_SECTION,
  CREDIBILITY_SECTION,
  FAQ_ITEMS,
  EGYPT_GOVERNORATES,
  FORM_CONTENT,
  FINAL_CTA_CONTENT,
} from '../content';

const EGYPT_PHONE_REGEX = /^(?:\+?20|0020|0)?1[0125]\d{8}$/;

function normalizePhone(input = '') {
  return String(input).replace(/[\s\-().]/g, '');
}

function getYouTubeEmbedUrl(url = '') {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return url;
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace('/', '');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    governorate: '',
    edition: 'repair', // 'repair' | 'sales'
    requestType: 'trial', // 'trial' | 'purchase' | 'inquiry'
    notes: '',
    website: '', // Honeypot
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const currentScreen = PRODUCT_SCREENS.items[activeScreenIndex] || PRODUCT_SCREENS.items[0];

  const selectedEditionName =
    formData.edition === 'sales'
      ? 'سند للمبيعات وإدارة المحلات'
      : 'سند لإدارة المبيعات والصيانة';

  const dynamicWhatsAppUrl = getWhatsAppUrl(
    `مرحباً فريق سند، أرغب في الاستفسار عن برنامج (${selectedEditionName}).`
  );

  const handleSelectEditionAndScroll = (editionId, reqType = 'trial') => {
    setFormData((prev) => ({
      ...prev,
      edition: editionId,
      requestType: reqType,
    }));
    setSubmitSuccess(false);
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateClientForm = () => {
    const errors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'يرجى كتابة الاسم بالكامل (حرفين على الأقل).';
    }
    const cleanPhone = normalizePhone(formData.phone);
    if (!cleanPhone) {
      errors.phone = 'يرجى إدخال رقم الهاتف أو الواتساب.';
    } else if (!EGYPT_PHONE_REGEX.test(cleanPhone)) {
      errors.phone = 'يرجى إدخال رقم موبايل مصري صحيح (مثال: 01002403727 أو +201002403727).';
    }
    if (!formData.businessName || formData.businessName.trim().length < 2) {
      errors.businessName = 'يرجى إدخال اسم النشاط أو المحل.';
    }
    if (!formData.edition) {
      errors.edition = 'يرجى اختيار النسخة المطلوبة.';
    }
    if (!formData.requestType) {
      errors.requestType = 'يرجى اختيار نوع الطلب.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateClientForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setSubmitError(
          data.error ||
            'تعذر إرسال الطلب حالياً. يمكنك التواصل معنا مباشرة عبر واتساب على الرقم 01002403727.'
        );
      } else {
        setSubmitSuccess(true);
      }
    } catch (err) {
      setSubmitError(
        'حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة عبر واتساب.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. STICKY NAVBAR */}
      <header className={`site-navbar ${isScrolled ? 'scrolled' : ''}`} id="top">
        <div className="container navbar-inner">
          <a href="#hero" className="brand-link" aria-label="سند ERP - الرئيسية">
            <Image
              src="/logo.jpg"
              alt="شعار سند ERP الرسمي"
              width={160}
              height={140}
              unoptimized
              className="brand-logo-img"
              priority
            />
            <div className="brand-text-wrap">
              <span className="brand-name-ar">{SITE_CONFIG.brandNameAr}</span>
              <span className="brand-name-en">{SITE_CONFIG.brandNameEn}</span>
            </div>
          </a>

          <nav className="nav-links-desktop" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="nav-item-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions-desktop">
            <a
              href={dynamicWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-contact-link"
            >
              تواصل معنا
            </a>
            <a href="#lead-form" className="btn btn-primary">
              احصل على نسختك التجريبية
            </a>
          </div>

          <button
            type="button"
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="فتح قائمة التنقل"
            aria-expanded={mobileMenuOpen}
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="mobile-drawer-panel" aria-label="قائمة الموبايل">
            <div>
              <div className="mobile-drawer-top">
                <a
                  href="#hero"
                  className="brand-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image
                    src="/logo.jpg"
                    alt="شعار سند ERP"
                    width={150}
                    height={130}
                    unoptimized
                    className="brand-logo-img"
                  />
                  <div className="brand-text-wrap">
                    <span className="brand-name-ar">{SITE_CONFIG.brandNameAr}</span>
                    <span className="brand-name-en">{SITE_CONFIG.brandNameEn}</span>
                  </div>
                </a>
                <button
                  type="button"
                  className="mobile-menu-trigger"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="إغلاق القائمة"
                >
                  <Icon name="x" size={20} />
                </button>
              </div>

              <nav className="mobile-drawer-nav">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="mobile-drawer-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <Icon name="arrowLeft" size={16} />
                  </a>
                ))}
              </nav>
            </div>

            <div className="mobile-drawer-actions">
              <a
                href="#lead-form"
                className="btn btn-primary btn-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                احصل على نسختك التجريبية
              </a>
              <a
                href={dynamicWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon name="whatsapp" size={18} />
                <span>تواصل معنا عبر واتساب</span>
              </a>
            </div>
          </aside>
        </>
      )}

      <main>
        {/* 2. HERO SECTION */}
        <section className="hero-section" id="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-badge">
                <Icon name="badgeCheck" size={16} />
                <span>{HERO_CONTENT.badge}</span>
              </div>

              <h1 className="hero-title">{HERO_CONTENT.title}</h1>

              <p className="hero-description">{HERO_CONTENT.description}</p>

              <ul className="hero-pills" aria-label="المزايا الأساسية">
                {HERO_CONTENT.pills.map((pill) => (
                  <li key={pill} className="hero-pill">
                    <span className="hero-pill-dot">
                      <Icon name="check" size={16} />
                    </span>
                    <span>{pill}</span>
                  </li>
                ))}
              </ul>

              <div className="hero-actions">
                <a href="#lead-form" className="btn btn-primary btn-lg">
                  <span>{HERO_CONTENT.primaryCta}</span>
                  <Icon name="arrowLeft" size={18} />
                </a>
                <a href="#product-tour" className="btn btn-secondary btn-lg">
                  <span>{HERO_CONTENT.secondaryCta}</span>
                </a>
              </div>
            </div>

            <div className="hero-visual-wrap">
              <div className="app-window">
                <div className="app-window-bar">
                  <div className="window-dots" aria-hidden="true">
                    <span className="window-dot" />
                    <span className="window-dot" />
                    <span className="window-dot" />
                  </div>
                  <span className="window-title">
                    SANAD ERP — لوحة التحكم والإحصائيات الرئيسية
                  </span>
                </div>
                <div className="app-window-screen">
                  <Image
                    src="/screenshots/dashboard.jpg"
                    alt="لقطة شاشة حقيقية للوحة التحكم والإحصائيات الرئيسية في برنامج سند ERP"
                    width={1280}
                    height={753}
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="app-window-img"
                  />
                </div>
              </div>

              <div className="hero-indicators-grid" aria-label="أقسام النظام الرئيسية">
                {HERO_CONTENT.visualIndicators.map((ind) => (
                  <div key={ind.id} className="hero-indicator-card">
                    <span className="hero-indicator-title">{ind.label}</span>
                    <span className="hero-indicator-detail">{ind.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. VALUE PROPOSITION SECTION */}
        <section className="section section-alt" id="value">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{VALUE_SECTION.eyebrow}</span>
              <h2 className="section-title">{VALUE_SECTION.title}</h2>
              <p className="section-subtitle">{VALUE_SECTION.subtitle}</p>
            </div>

            <div className="value-grid">
              {VALUE_SECTION.cards.map((card) => (
                <article key={card.id} className="value-card">
                  <div className="value-icon-box">
                    <Icon name={card.icon} size={22} />
                  </div>
                  <h3 className="value-card-title">{card.title}</h3>
                  <p className="value-problem">{card.problem}</p>
                  <p className="value-solution">{card.solution}</p>
                </article>
              ))}
            </div>

            <div className="section-cta-row">
              <a href="#product-tour" className="btn btn-secondary">
                <span>شاهد شاشات البرنامج الحقيقية</span>
                <Icon name="arrowLeft" size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 4. PRODUCT EXPERIENCE (REAL SCREENSHOTS) */}
        <section className="section" id="product-tour">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{PRODUCT_SCREENS.eyebrow}</span>
              <h2 className="section-title">{PRODUCT_SCREENS.title}</h2>
              <p className="section-subtitle">{PRODUCT_SCREENS.subtitle}</p>
            </div>

            <div className="screens-filter-tabs" role="tablist" aria-label="شاشات نظام سند">
              {PRODUCT_SCREENS.items.map((item, idx) => {
                const isActive = activeScreenIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`screen-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveScreenIndex(idx)}
                  >
                    {item.category}
                  </button>
                );
              })}
            </div>

            <div className="screen-stage" role="tabpanel">
              <div className="screen-stage-grid">
                <div className="screen-image-pane">
                  <div className="screen-image-frame">
                    <Image
                      src={currentScreen.src}
                      alt={currentScreen.alt}
                      width={currentScreen.width}
                      height={currentScreen.height}
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="app-window-img"
                    />
                  </div>
                </div>

                <div className="screen-info-pane">
                  <span className="screen-category-badge">{currentScreen.category}</span>
                  <h3 className="screen-info-title">{currentScreen.title}</h3>
                  <p className="screen-info-desc">{currentScreen.description}</p>
                  <div style={{ marginTop: '8px' }}>
                    <a href="#lead-form" className="btn btn-primary btn-full">
                      <span>اطلب تجربة هذه الإمكانيات على جهازك</span>
                      <Icon name="arrowLeft" size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="screens-thumbnails-grid" aria-label="معرض الشاشات المصغرة">
              {PRODUCT_SCREENS.items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`screen-thumb-card ${activeScreenIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveScreenIndex(idx)}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={320}
                    height={188}
                    sizes="(max-width: 640px) 45vw, 180px"
                    className="screen-thumb-img"
                  />
                  <span className="screen-thumb-label">{item.category}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 5. THE TWO EDITIONS */}
        <section className="section section-alt" id="editions">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{EDITIONS_SECTION.eyebrow}</span>
              <h2 className="section-title">{EDITIONS_SECTION.title}</h2>
              <p className="section-subtitle">{EDITIONS_SECTION.subtitle}</p>
            </div>

            <p className="editions-notice">{EDITIONS_SECTION.notice}</p>

            <div className="editions-grid">
              {EDITIONS_SECTION.editions.map((ed) => (
                <article
                  key={ed.id}
                  className={`edition-card ${ed.id === 'repair' ? 'featured' : ''}`}
                >
                  <div>
                    <span className="edition-badge">{ed.badge}</span>
                    <h3 className="edition-name">{ed.name}</h3>
                    <p className="edition-audience">{ed.targetAudience}</p>
                    <p className="edition-desc">{ed.description}</p>

                    <ul className="edition-features-list">
                      {ed.confirmedFeatures.map((feat) => (
                        <li key={feat} className="edition-feature-item">
                          <span className="edition-feature-icon">
                            <Icon name="checkCircle" size={18} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="edition-actions">
                    <button
                      type="button"
                      className="btn btn-primary btn-full"
                      onClick={() => handleSelectEditionAndScroll(ed.id, 'trial')}
                    >
                      <span>{ed.ctaLabel}</span>
                      <Icon name="arrowLeft" size={16} />
                    </button>
                    <a
                      href={getWhatsAppUrl(ed.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-full"
                    >
                      <Icon name="whatsapp" size={18} />
                      <span>استفسر عن هذه النسخة عبر واتساب</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. WHY SANAD SECTION */}
        <section className="section" id="why-sanad">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{WHY_SANAD_SECTION.eyebrow}</span>
              <h2 className="section-title">{WHY_SANAD_SECTION.title}</h2>
              <p className="section-subtitle">{WHY_SANAD_SECTION.subtitle}</p>
            </div>

            <div className="why-grid">
              {WHY_SANAD_SECTION.items.map((item) => (
                <article key={item.title} className="why-card">
                  <div className="value-icon-box">
                    <Icon name={item.icon} size={22} />
                  </div>
                  <h3 className="why-card-title">{item.title}</h3>
                  <p className="why-card-desc">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="section-cta-row">
              <a href="#how-it-works" className="btn btn-secondary">
                <span>تعرف على خطوات التجربة والتفعيل</span>
                <Icon name="arrowLeft" size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 7. HOW IT WORKS (4 STEPS) */}
        <section className="section section-alt" id="how-it-works">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{HOW_IT_WORKS_SECTION.eyebrow}</span>
              <h2 className="section-title">{HOW_IT_WORKS_SECTION.title}</h2>
              <p className="section-subtitle">{HOW_IT_WORKS_SECTION.subtitle}</p>
            </div>

            <div className="steps-grid">
              {HOW_IT_WORKS_SECTION.steps.map((step) => (
                <div key={step.number} className="step-card">
                  <span className="step-num">{step.number}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="section-cta-row">
              <a href="#lead-form" className="btn btn-primary">
                <span>ابدأ الخطوة الأولى واطلب نسختك التجريبية</span>
                <Icon name="arrowLeft" size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 8. PRICING SECTION */}
        <section className="section" id="pricing">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{PRICING_SECTION.eyebrow}</span>
              <h2 className="section-title">{PRICING_SECTION.title}</h2>
              <p className="section-subtitle">{PRICING_SECTION.subtitle}</p>
            </div>

            <div className="pricing-layout">
              {/* Confirmed Single-Device License */}
              <article className="pricing-card-main">
                <div>
                  <span className="edition-badge">{PRICING_SECTION.mainPlan.badge}</span>
                  <h3 className="edition-name">{PRICING_SECTION.mainPlan.name}</h3>
                  <div className="price-number-row">
                    <span className="price-amount ltr-inline">
                      {PRICING_SECTION.mainPlan.price}
                    </span>
                    <span className="price-currency">
                      {PRICING_SECTION.mainPlan.currency}
                    </span>
                  </div>
                  <p className="price-billing-note">{PRICING_SECTION.mainPlan.billingNote}</p>
                  <p className="edition-desc">{PRICING_SECTION.mainPlan.description}</p>

                  <ul className="edition-features-list">
                    {PRICING_SECTION.mainPlan.highlights.map((item) => (
                      <li key={item} className="edition-feature-item">
                        <span className="edition-feature-icon">
                          <Icon name="checkCircle" size={18} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-full"
                    onClick={() => handleSelectEditionAndScroll(formData.edition, 'purchase')}
                  >
                    <span>{PRICING_SECTION.mainPlan.ctaLabel}</span>
                    <Icon name="arrowLeft" size={18} />
                  </button>
                  <a href="#faq" className="pricing-faq-link">
                    {PRICING_SECTION.mainPlan.faqLinkLabel}
                  </a>
                </div>
              </article>

              {/* Custom / Multi-Device Inquiry Card (No invented prices) */}
              <article className="pricing-card-secondary">
                <div>
                  <span className="edition-badge">{PRICING_SECTION.customPlan.badge}</span>
                  <h3 className="edition-name">{PRICING_SECTION.customPlan.name}</h3>
                  <div className="price-number-row">
                    <span
                      className="price-amount"
                      style={{ fontSize: '1.85rem', fontFamily: 'var(--font-arabic)' }}
                    >
                      {PRICING_SECTION.customPlan.priceLabel}
                    </span>
                  </div>
                  <p className="price-billing-note">حسب احتياج نشاطك وعدد الأجهزة</p>
                  <p className="edition-desc">{PRICING_SECTION.customPlan.description}</p>

                  <ul className="edition-features-list">
                    {PRICING_SECTION.customPlan.highlights.map((item) => (
                      <li key={item} className="edition-feature-item">
                        <span className="edition-feature-icon">
                          <Icon name="check" size={18} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <a
                    href={getWhatsAppUrl(
                      'مرحباً فريق سند، أرغب في الاستفسار عن ترخيص البرنامج لأكثر من جهاز في نشاطي.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-lg btn-full"
                  >
                    <Icon name="whatsapp" size={18} />
                    <span>{PRICING_SECTION.customPlan.ctaLabel}</span>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 9. VIDEOS SECTION (Interactive Video Tabs) */}
        <section className="section section-alt" id="videos">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">
                <Icon name="video" size={16} />
                <span>{VIDEOS_SECTION.eyebrow}</span>
              </span>
              <h2 className="section-title">{VIDEOS_SECTION.title}</h2>
              <p className="section-subtitle">{VIDEOS_SECTION.subtitle}</p>
            </div>

            <div className="screens-filter-tabs" role="tablist" aria-label="فيديوهات شرح نظام سند">
              {VIDEOS_SECTION.items.map((vid, idx) => {
                const isActive = activeVideoIndex === idx;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`screen-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveVideoIndex(idx)}
                  >
                    {vid.tabLabel}
                  </button>
                );
              })}
            </div>

            {(() => {
              const currentVideo =
                VIDEOS_SECTION.items[activeVideoIndex] || VIDEOS_SECTION.items[0];
              const ytEmbed = getYouTubeEmbedUrl(currentVideo.videoUrl);
              const hasVideo = Boolean(currentVideo.videoUrl && currentVideo.videoUrl.trim());

              return (
                <div className="video-stage-card" role="tabpanel">
                  <div className="video-player-wrapper">
                    {hasVideo ? (
                      ytEmbed ? (
                        <iframe
                          src={ytEmbed}
                          title={currentVideo.title}
                          className="video-embed-iframe"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          key={currentVideo.videoUrl}
                          controls
                          preload="metadata"
                          poster={currentVideo.poster}
                          className="video-native-element"
                        >
                          <source src={currentVideo.videoUrl} type="video/mp4" />
                          متصفحك لا يدعم تشغيل الفيديو.
                        </video>
                      )
                    ) : (
                      <>
                        <Image
                          src={currentVideo.poster}
                          alt={currentVideo.title}
                          width={1280}
                          height={753}
                          className="video-native-element"
                        />
                        <div className="video-placeholder-overlay">
                          <div className="video-play-badge">
                            <Icon name="play" size={28} />
                          </div>
                          <span className="video-soon-pill">
                            <Icon name="video" size={15} />
                            <span>قريباً — جاري تجهيز ورفع فيديو الشرح العملي لهذا القسم</span>
                          </span>
                          <h3 className="video-meta-title" style={{ marginBottom: 0 }}>
                            {currentVideo.title}
                          </h3>
                          <p
                            style={{
                              color: 'var(--text-secondary)',
                              maxWidth: '540px',
                              fontSize: '0.92rem',
                            }}
                          >
                            {currentVideo.description}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="video-meta-bar">
                    <div className="video-meta-text">
                      <h3 className="video-meta-title">{currentVideo.title}</h3>
                      <p className="video-meta-desc">{currentVideo.description}</p>
                    </div>
                    <a href="#lead-form" className="btn btn-primary">
                      <span>اطلب النسخة التجريبية وجرّب بنفسك</span>
                      <Icon name="arrowLeft" size={16} />
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* 10. CREDIBILITY SECTION */}
        <section className="section section-alt" id="credibility">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{CREDIBILITY_SECTION.eyebrow}</span>
              <h2 className="section-title">{CREDIBILITY_SECTION.title}</h2>
              <p className="section-subtitle">{CREDIBILITY_SECTION.subtitle}</p>
            </div>

            <div className="facts-grid">
              {CREDIBILITY_SECTION.facts.map((fact) => (
                <div key={fact.label} className="fact-card">
                  <span className="fact-label">{fact.label}</span>
                  <strong className="fact-value">{fact.value}</strong>
                  <p className="fact-detail">{fact.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. FAQ SECTION (10 QUESTIONS) */}
        <section className="section" id="faq">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">الأسئلة الشائعة</span>
              <h2 className="section-title">إجابات واضحة قبل تجربة أو شراء سند</h2>
              <p className="section-subtitle">
                جمعنا لك أهم الأسئلة المتعلقة بنظام التشغيل، الترخيص، والنسختين المتاحتين.
              </p>
            </div>

            <div className="faq-container">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                const answerId = `faq-answer-${idx}`;
                return (
                  <div key={item.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <h3>
                      <button
                        type="button"
                        className="faq-trigger"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      >
                        <span>{item.q}</span>
                        <span className="faq-chevron">
                          <Icon name="chevronDown" size={18} />
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <div id={answerId} className="faq-content">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="section-cta-row">
              <a
                href={dynamicWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Icon name="whatsapp" size={18} />
                <span>لديك سؤال آخر؟ تواصل معنا مباشرة عبر واتساب</span>
              </a>
            </div>
          </div>
        </section>

        {/* 12. LEAD / TRIAL REQUEST FORM SECTION */}
        <section className="section section-alt" id="lead-form">
          <div className="container form-section-grid">
            <div className="form-info-box">
              <span className="eyebrow" style={{ alignSelf: 'flex-start' }}>
                {FORM_CONTENT.eyebrow}
              </span>
              <h2 className="section-title" style={{ textAlign: 'right', marginBottom: '8px' }}>
                {FORM_CONTENT.title}
              </h2>
              <p className="section-subtitle" style={{ textAlign: 'right' }}>
                {FORM_CONTENT.subtitle}
              </p>

              <div className="contact-cards-list">
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-card"
                >
                  <div className="value-icon-box">
                    <Icon name="whatsapp" size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      تواصل سريع عبر واتساب
                    </div>
                    <div className="ltr-inline" style={{ color: 'var(--mint)', fontWeight: 600 }}>
                      {SITE_CONFIG.phoneDisplay}
                    </div>
                  </div>
                </a>

                <a href={`tel:${SITE_CONFIG.phoneIntl}`} className="contact-channel-card">
                  <div className="value-icon-box">
                    <Icon name="phone" size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>اتصال هاتفي مباشر</div>
                    <div
                      className="ltr-inline"
                      style={{ color: 'var(--text-secondary)', fontWeight: 600 }}
                    >
                      {SITE_CONFIG.phoneDisplay}
                    </div>
                  </div>
                </a>

                <a href={`mailto:${SITE_CONFIG.email}`} className="contact-channel-card">
                  <div className="value-icon-box">
                    <Icon name="mail" size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>البريد الإلكتروني</div>
                    <div
                      className="ltr-inline"
                      style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}
                    >
                      {SITE_CONFIG.email}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="form-card" id="contact">
              {!submitSuccess ? (
                <form onSubmit={handleFormSubmit} noValidate>
                  {/* Honeypot field for spam protection */}
                  <div className="hp-field" aria-hidden="true">
                    <label htmlFor="website-hp">Website</label>
                    <input
                      id="website-hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>

                  <div className="form-fields-grid">
                    <div className="field-group">
                      <label htmlFor="lead-name" className="field-label">
                        الاسم بالكامل
                        <span className="field-required">*</span>
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        className="field-input"
                        placeholder="مثال: أحمد محمود"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                      {fieldErrors.name && (
                        <span className="field-error-text" role="alert">
                          {fieldErrors.name}
                        </span>
                      )}
                    </div>

                    <div className="field-group">
                      <label htmlFor="lead-phone" className="field-label">
                        رقم الهاتف / واتساب
                        <span className="field-required">*</span>
                      </label>
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        dir="ltr"
                        className="field-input"
                        placeholder="010xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                      {fieldErrors.phone && (
                        <span className="field-error-text" role="alert">
                          {fieldErrors.phone}
                        </span>
                      )}
                    </div>

                    <div className="field-group">
                      <label htmlFor="lead-business" className="field-label">
                        اسم النشاط / المحل
                        <span className="field-required">*</span>
                      </label>
                      <input
                        id="lead-business"
                        type="text"
                        required
                        className="field-input"
                        placeholder="مثال: مركز النور للكمبيوتر والصيانة"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                      />
                      {fieldErrors.businessName && (
                        <span className="field-error-text" role="alert">
                          {fieldErrors.businessName}
                        </span>
                      )}
                    </div>

                    <div className="field-group">
                      <label htmlFor="lead-gov" className="field-label">
                        المحافظة
                        <span className="field-optional">(اختياري)</span>
                      </label>
                      <select
                        id="lead-gov"
                        className="field-select"
                        value={formData.governorate}
                        onChange={(e) => handleInputChange('governorate', e.target.value)}
                      >
                        <option value="">-- اختر المحافظة --</option>
                        {EGYPT_GOVERNORATES.map((gov) => (
                          <option key={gov} value={gov}>
                            {gov}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label htmlFor="lead-edition" className="field-label">
                        النسخة المطلوبة
                        <span className="field-required">*</span>
                      </label>
                      <select
                        id="lead-edition"
                        required
                        className="field-select"
                        value={formData.edition}
                        onChange={(e) => handleInputChange('edition', e.target.value)}
                      >
                        <option value="repair">سند لإدارة المبيعات والصيانة</option>
                        <option value="sales">سند للمبيعات وإدارة المحلات (المبيعات العامة)</option>
                      </select>
                      {fieldErrors.edition && (
                        <span className="field-error-text" role="alert">
                          {fieldErrors.edition}
                        </span>
                      )}
                    </div>

                    <div className="field-group">
                      <label htmlFor="lead-request-type" className="field-label">
                        نوع الطلب
                        <span className="field-required">*</span>
                      </label>
                      <select
                        id="lead-request-type"
                        required
                        className="field-select"
                        value={formData.requestType}
                        onChange={(e) => handleInputChange('requestType', e.target.value)}
                      >
                        <option value="trial">طلب نسخة تجريبية</option>
                        <option value="purchase">شراء ترخيص (1,499 ج.م)</option>
                        <option value="inquiry">استفسار عن الترخيص</option>
                      </select>
                      {fieldErrors.requestType && (
                        <span className="field-error-text" role="alert">
                          {fieldErrors.requestType}
                        </span>
                      )}
                    </div>

                    <div className="field-group field-full">
                      <label htmlFor="lead-notes" className="field-label">
                        ملاحظات إضافية
                        <span className="field-optional">(اختياري)</span>
                      </label>
                      <textarea
                        id="lead-notes"
                        rows={3}
                        className="field-textarea"
                        placeholder="أي تفاصيل إضافية عن نشاطك أو استفسارك..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="form-alert-error" role="alert">
                      <p>{submitError}</p>
                      <div style={{ marginTop: '10px' }}>
                        <a
                          href={dynamicWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{ width: '100%' }}
                        >
                          <Icon name="whatsapp" size={18} />
                          <span>أرسل طلبك مباشرة عبر واتساب</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: '22px' }}>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>جاري إرسال طلبك وتجهيز روابط التحميل...</span>
                      ) : (
                        <>
                          <Icon name="download" size={18} />
                          <span>إرسال الطلب وإظهار رابط التحميل المباشر</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="form-privacy-note">{FORM_CONTENT.privacyNote}</p>
                </form>
              ) : (
                <div className="form-success-box" role="status" aria-live="polite">
                  <div className="success-badge-icon">
                    <Icon name="checkCircle" size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                    تم تسجيل طلبك بنجاح!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    الخطوة التالية: يمكنك الآن تحميل ملف التثبيت (Setup.exe) للنسخة التي اخترتها
                    مباشرة، أو مراسلتنا على واتساب لتأكيد بياناتك واستلام التفعيل.
                  </p>

                  <div className="download-cards-stack">
                    {/* Repair Edition Download */}
                    <div
                      className={`download-option-card ${
                        formData.edition === 'repair' ? 'recommended' : ''
                      }`}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <strong>سند لإدارة المبيعات والصيانة</strong>
                        {formData.edition === 'repair' && (
                          <span className="screen-category-badge">النسخة التي اخترتها</span>
                        )}
                      </div>
                      <a
                        href={SITE_CONFIG.downloads.repair}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${
                          formData.edition === 'repair' ? 'btn-primary' : 'btn-secondary'
                        } btn-full`}
                      >
                        <Icon name="download" size={18} />
                        <span>تحميل نسخة المبيعات والصيانة (Setup.exe)</span>
                      </a>
                    </div>

                    {/* Sales Edition Download */}
                    <div
                      className={`download-option-card ${
                        formData.edition === 'sales' ? 'recommended' : ''
                      }`}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <strong>سند للمبيعات وإدارة المحلات</strong>
                        {formData.edition === 'sales' && (
                          <span className="screen-category-badge">النسخة التي اخترتها</span>
                        )}
                      </div>
                      <a
                        href={SITE_CONFIG.downloads.sales}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${
                          formData.edition === 'sales' ? 'btn-primary' : 'btn-secondary'
                        } btn-full`}
                      >
                        <Icon name="download" size={18} />
                        <span>تحميل نسخة المبيعات العامة (Setup.exe)</span>
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href={getWhatsAppUrl(
                        `مرحباً فريق سند، سجلت طلبي على الموقع باسم (${formData.name}) لنشاط (${formData.businessName}) وأرغب في متابعة تفعيل (${selectedEditionName}).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-full"
                    >
                      <Icon name="whatsapp" size={18} />
                      <span>تأكيد الطلب عبر واتساب لتسريع التفعيل</span>
                    </a>

                    <button
                      type="button"
                      className="btn btn-secondary btn-full"
                      onClick={() => setSubmitSuccess(false)}
                    >
                      تعديل البيانات أو إرسال طلب آخر
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 13. CLOSING CTA SECTION */}
        <section className="section" id="final-cta">
          <div className="container">
            <div className="final-cta-box">
              <h2 className="section-title">{FINAL_CTA_CONTENT.title}</h2>
              <p
                className="section-subtitle"
                style={{ maxWidth: '640px', marginInline: 'auto', marginBottom: '28px' }}
              >
                {FINAL_CTA_CONTENT.description}
              </p>
              <div className="section-cta-row" style={{ marginTop: 0 }}>
                <a href="#lead-form" className="btn btn-primary btn-lg">
                  <span>{FINAL_CTA_CONTENT.primaryCta}</span>
                  <Icon name="arrowLeft" size={18} />
                </a>
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg"
                >
                  <Icon name="whatsapp" size={18} />
                  <span>{FINAL_CTA_CONTENT.secondaryCta}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 14. FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#hero" className="brand-link" style={{ marginBottom: '14px' }}>
                <Image
                  src="/logo.jpg"
                  alt="شعار سند ERP"
                  width={180}
                  height={156}
                  unoptimized
                  className="brand-logo-img brand-logo-footer"
                />
                <div className="brand-text-wrap">
                  <span className="brand-name-ar">{SITE_CONFIG.brandNameAr}</span>
                  <span className="brand-name-en">{SITE_CONFIG.brandNameEn}</span>
                </div>
              </a>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '340px' }}>
                نظام ديسكتوب متكامل لإدارة المبيعات والمخزون والحسابات والصيانة. يعمل بدون إنترنت
                وبترخيص شراء لمرة واحدة.
              </p>
            </div>

            <div>
              <h3 className="footer-col-title">روابط سريعة</h3>
              <ul className="footer-list">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="footer-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="footer-col-title">نسخ البرنامج</h3>
              <ul className="footer-list">
                <li>
                  <a
                    href="#lead-form"
                    className="footer-link"
                    onClick={() => handleSelectEditionAndScroll('repair', 'trial')}
                  >
                    سند لإدارة المبيعات والصيانة
                  </a>
                </li>
                <li>
                  <a
                    href="#lead-form"
                    className="footer-link"
                    onClick={() => handleSelectEditionAndScroll('sales', 'trial')}
                  >
                    سند للمبيعات وإدارة المحلات
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="footer-link">
                    ترخيص جهاز واحد (1,499 ج.م)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="footer-col-title">تواصل معنا</h3>
              <ul className="footer-list">
                <li>
                  <a
                    href={dynamicWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    واتساب: <span className="ltr-inline">{SITE_CONFIG.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${SITE_CONFIG.phoneIntl}`} className="footer-link">
                    هاتف: <span className="ltr-inline">{SITE_CONFIG.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="footer-link">
                    <span className="ltr-inline">{SITE_CONFIG.email}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} سند ERP (SANAD ERP). جميع الحقوق محفوظة.</p>
            <p>ترخيص شراء لمرة واحدة • يعمل بدون إنترنت (Offline)</p>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CONVERSION BAR */}
      <div className="mobile-sticky-bar" role="region" aria-label="إجراءات سريعة">
        <a href="#lead-form" className="btn btn-primary" style={{ paddingInline: '12px' }}>
          <span>اطلب النسخة التجريبية</span>
        </a>
        <a
          href={dynamicWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ paddingInline: '12px' }}
        >
          <Icon name="whatsapp" size={18} />
          <span>واتساب</span>
        </a>
      </div>

      {/* DESKTOP FLOATING WHATSAPP CTA */}
      <a
        href={dynamicWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="desktop-whatsapp-float"
        aria-label="تواصل عبر واتساب بخصوص النسخة المختارة"
      >
        <Icon name="whatsapp" size={20} />
        <span>تواصل واتساب ({selectedEditionName})</span>
      </a>
    </>
  );
}
