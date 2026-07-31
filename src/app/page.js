'use client';

import { useState, useEffect } from 'react';

const t = {
  ar: {
    navFeatures: 'المميزات',
    navWhyUs: 'لماذا سند؟',
    navPricing: 'الأسعار والرخص',
    navContact: 'اتصل بنا',
    navCta: 'احصل على النسخة التجريبية',
    logoText: 'سند للمبيعات والصيانة',
    
    editionRepairTitle: 'إصدار صيانة الكمبيوتر والأجهزة',
    editionSalesTitle: 'إصدار المبيعات والكاشير العامة',
    
    heroBadge: 'برنامج سطح مكتب متكامل (Offline-First)',
    
    heroTitleRepair: 'أدر محلك أو مركز الصيانة الخاص بك بذكاء مع نظام سند',
    heroSubtitleRepair: 'تطبيق سطح مكتب سريع وآمن يعمل 100% بدون إنترنت على قاعدة بيانات محلية. يربط فواتير الكاشير (POS) والمبيعات، بنظام تذاكر صيانة الأجهزة والقطع، مع جرد دقيق للمستودع والمصروفات.',
    
    heroTitleSales: 'أدر مبيعات متجرك ونقاط البيع باحترافية مع نظام سند',
    heroSubtitleSales: 'تطبيق سطح مكتب سريع وآمن يعمل 100% بدون إنترنت لجميع المحلات التجارية ونقاط البيع بالتجزئة. يربط المبيعات، فواتير الكاشير، جرد المخازن، حسابات الموردين، والمصروفات.',
    
    heroCtaDownload: 'تحميل نسخة تجريبية مجاناً',
    heroCtaExplore: 'استكشف المميزات',
    
    statOfflineVal: '100%',
    statOfflineLabel: 'يعمل بدون إنترنت (أوفلاين)',
    statLicenseVal: '1',
    statLicenseLabel: 'رخصة مدى الحياة للجهاز',
    statSubsVal: '0 EGP',
    statSubsLabel: 'اشتراكات شهرية إجبارية',
    
    partnersTitle: 'تقنيات النظام ومواصفات التشغيل',
    
    modulesSubtitle: 'أدوات متخصصة لعملك',
    modulesTitle: 'موديولات نظام سند المتكاملة',
    modulesDesc: 'تم بناء سند خصيصاً ليناسب طبيعة عمل محلات بيع وصيانة الكمبيوتر والموبايل والأجهزة الذكية، ليوفر لك حلاً جاهزاً دون أي تعقيد.',
    
    badgeExclusive: 'حصري لنسخة الصيانة',
    badgeShared: 'متاح في النسختين',
    
    mod1Title: 'تذاكر صيانة الأجهزة والقطع',
    mod1Text: 'إدارة كاملة لعمليات الصيانة: تسجيل معلومات العميل وجهازه (لابتوب/PC/آخر)، السيريال نمبر، وصف العطل، تتبع حالة التصليح (فحص، جاري العمل، تم الإصلاح، تم التسليم)، واحتساب تكلفة قطع الغيار وأجرة الصيانة.',
    mod1f1: 'تتبع حالة التذاكر والعميل لحظة بلحظة',
    mod1f2: 'ربط قطع الغيار المستهلكة من المخزن مباشرة',
    mod1f3: 'طباعة إيصالات استلام وتسليم الأجهزة للعميل',
    
    mod2Title: 'نقاط البيع والفواتير POS',
    mod2Text: 'واجهة بيع سريعة وسهلة جداً تمكنك من إصدار فواتير مبيعات الاكسسوارات، الأجهزة، والخدمات بلمح البصر، مع دعم باركود المنتجات، وإعطاء خصومات وإدارة طرق الدفع المختلفة.',
    mod2f1: 'واجهة كاشير مبسطة للبيع السريع',
    mod2f2: 'دعم قارئ الباركود وطابعات الإيصالات 80mm',
    mod2f3: 'تعليق الفواتير وحساب المرتجعات',
    
    mod3Title: 'مخزون المنتجات وقطع الغيار',
    mod3Text: 'إدارة كاملة لمنتجات المحل كالملحقات والأجهزة، وقطع الغيار الحساسة (شاشات لابتوب، رامات، SSD، بطاريات). تنبيهات ذكية عند اقتراب نفاد كميات القطع لضمان عدم توقف الصيانة.',
    mod3f1: 'كود باركود فريد لكل منتج وقطعة صيانة',
    mod3f2: 'تنبيهات النفاذ وتحديد مستويات المخزون الحرج',
    mod3f3: 'سجل حركات الجرد المخزني التفصيلية',
    
    mod4Title: 'إدارة المشتريات والموردين',
    mod4Text: 'تسجيل فواتير شراء البضائع وقطع الغيار الواردة من الموردين، احتساب متوسط تكلفة الشراء للمنتجات، وتتبع الحسابات والمدفوعات الآجلة للموردين لتسهيل التدفق المالي.',
    mod4f1: 'إضافة الفواتير وتحديث كميات المخزن تلقائياً',
    mod4f2: 'تتبع ديون الموردين ومواعيد سدادها',
    mod4f3: 'قاعدة بيانات كاملة لبيانات الموردين',
    
    mod5Title: 'المصروفات وتقارير الأرباح',
    mod5Text: 'شاشة مخصصة لتسجيل مصاريف المحل اليومية والأسبوعية (إيجار، كهرباء، إنترنت، رواتب). لوحة تحكم ذكية تقدم لك تقارير صافي الأرباح بعد خصم تكلفة البضائع وقطع الغيار والمصروفات.',
    mod5f1: 'تصنيف المصروفات لمتابعة الهدر المالي',
    mod5f2: 'تقرير يومي وأسبوعي وشهري للأرباح الصافية',
    mod5f3: 'إمكانية تصدير التقارير لجداول Excel',
    
    mod6Title: 'ترخيص وتنشيط الأجهزة المحلي',
    mod6Text: 'نظام أمان مدمج يولد معرّف جهاز فريد لنسختك (Device ID). يتيح لك تشغيل البرنامج كنسخة تجريبية، وتنشيطه بصفة دائمة مدى الحياة باستخدام كود تنشيط مخصص لجهازك بدون الحاجة للإنترنت.',
    mod6f1: 'رخصة دائمة مدى الحياة بدون اشتراكات شهرية',
    mod6f2: 'تفعيل آمن وسهل محلياً 100%',
    mod6f3: 'حماية تامة لقاعدة بيانات المحل الخاصة بك',
    
    whyUsSubtitle: 'مزايا حصرية لنظام سند',
    whyUsTitle: 'لماذا يختار أصحاب المحلات نظام سند؟',
    whyUsDesc: 'برنامج سند ليس نظاماً عاماً، بل نظام متخصص 100% صُمم خصيصاً ليناسب احتياجات محلات الكمبيوتر والصيانة.',
    
    benefit1Title: 'يعمل بالكامل بدون إنترنت (أوفلاين)',
    benefit1Text: 'بياناتك بالكامل محفوظة على جهازك في المحل. لا تقلق بشأن انقطاع الإنترنت أو بطئه، النظام يعمل بسرعة فائقة وبشكل مستمر.',
    benefit2Title: 'طباعة تذاكر الصيانة للعملاء',
    benefit2Text: 'اطبع إيصالات استلام احترافية للعميل عند تسليم جهازه للتصليح، واطبع فاتورة الصيانة النهائية عند استلام العميل وتسديد الرسوم.',
    benefit3Title: 'شراء مرة واحدة ورخص مدى الحياة',
    benefit3Text: 'انسَ الاشتراكات الشهرية المرهقة. مع سند، تشتري كود تنشيط مرخص لجهازك مرة واحدة فقط وتستخدمه إلى الأبد بدون أي رسوم مخفية.',
    benefit4Title: 'قاعدة بيانات SQLite محلية وآمنة',
    benefit4Text: 'حماية وتشفير تام لبيانات عملائك، مبيعاتك، وصيانتك. يمكنك بسهولة أخذ نسخ احتياطية يدوية وتخزينها لحماية المحل.',
    benefit5Title: 'تكامل مع قارئ الباركود والكاشير',
    benefit5Text: 'يدمج النظام مباشرة مع قارئ الباركود لتسريع المبيعات، ومع طابعات الكاشير الحرارية بمختلف أحجامها لطباعة الفواتير.',
    benefit6Title: 'دعم فني وتدريب وتركيب مجاني',
    benefit6Text: 'نوفر لك جلسة مجانية لمساعدتك في تركيب البرنامج لأول مرة وتنشيطه وتدريبك أنت والموظفين على استخدامه والعمل عليه.',
    
    pricingSubtitle: 'تفعيل مدى الحياة بدون اشتراكات',
    pricingTitle: 'اختر باقة التنشيط المناسبة لنشاطك',
    pricingToggleKey: 'رخصة مدى الحياة فقط',
    pricingToggleSupport: 'رخصة مدى الحياة + الدعم والتحديثات',
    pricingToggleSupportBadge: 'تحديثات سنة',
    
    plan1Name: 'رخصة جهاز واحد',
    plan1DescRepair: 'مثالي لمحلات الصيانة والكمبيوتر التي تدار من جهاز واحد (الكاشير والمهندس معاً).',
    plan1DescSales: 'مثالي للمحلات التجارية ومنافذ البيع بالتجزئة التي تدار من جهاز كاشير واحد.',
    plan1Period: '/ تدفع مرة واحدة',
    plan1PeriodSupport: '/ تفعيل دائم + دعم سنة',
    plan1f1: 'كود تفعيل لجهاز واحد مدى الحياة',
    plan1f2: 'تثبيت محلي وقاعدة بيانات SQLite',
    plan1f3: 'موديول الكاشير والمبيعات كامل',
    plan1f4: 'موديول تذاكر صيانة الأجهزة',
    plan1f4_disabled: 'تذاكر صيانة الأجهزة والقطع (غير متوفر)',
    plan1f5: 'إدارة المخزن والمشتريات والمصروفات',
    plan1f6: 'ربط الأجهزة عبر الشبكة المحلية LAN',
    plan1Cta: 'احصل على كود التنشيط',
    
    plan2Badge: 'الأكثر طلباً للمحلات',
    plan2Name: 'رخصة 3 أجهزة (شبكة)',
    plan2DescRepair: 'الخيار الأمثل لمراكز الصيانة لربط الكاشير بجهاز المهندس وجهاز المدير محلياً.',
    plan2DescSales: 'الخيار الأمثل للمحلات الكبيرة لربط أجهزة كاشير متعددة بجهاز المدير والمخزن.',
    plan2Period: '/ تدفع مرة واحدة',
    plan2PeriodSupport: '/ تفعيل دائم + دعم سنة',
    plan2f1: '3 أكواد تفعيل لـ 3 أجهزة مختلفة',
    plan2f2: 'مزامنة البيانات لحظياً عبر الشبكة المحلية LAN',
    plan2f3: 'الكاشير، الصيانة، والإدارة معاً',
    plan2f3_sales: 'الكاشير المتعدد، إدارة المخزن، والإدارة معاً',
    plan2f4: 'تذاكر الصيانة والمخزون كاملة',
    plan2f4_disabled: 'تذاكر صيانة الأجهزة (غير متوفر)',
    plan2f5: 'تقارير أرباح متقدمة لكل مستخدم',
    plan2f6: 'دعم فني وتدريب مجاني شامل',
    plan2Cta: 'تنشيط باقة الشبكة',
    
    plan3Name: 'الفروع والمؤسسات',
    plan3Desc: 'تكامل مخصص للمحلات الكبيرة ذات الفروع المتعددة لربطها عبر خادم سحابي.',
    plan3Price: 'اتصل بنا',
    plan3f1: 'عدد أكواد تفعيل غير محدود',
    plan3f2: 'ربط فروع المحل بقاعدة بيانات سحابية',
    plan3f3: 'تخصيص الفواتير وواجهة الصيانة',
    plan3f3_sales: 'تخصيص الفواتير وحسابات الفروع',
    plan3f4: 'دعم فني خاص على مدار الساعة 24/7',
    plan3f5: 'توفير لوحة تحكم أونلاين للمدير',
    plan3f6: 'أخذ نسخ احتياطية تلقائية للسحابة',
    plan3Cta: 'طلب تسعير خاص',
    
    testimonialsSubtitle: 'آراء أصحاب المحلات ومراكز الصيانة',
    testimonialsTitle: 'ماذا يقولون عن نظام سند؟',
    
    test1Text: '"كنت أعاني من ضياع أجهزة العملاء وعدم معرفة حالة اللابتوبات وتكاليف قطع الغيار المستخدمة. نظام سند رتب لي الصيانة بالكامل، والآن بمجرد تسليم الجهاز يطبع إيصالاً فورياً للعميل."',
    test1Author: 'أ. محمود جابر',
    test1Role: 'مالك مركز تكنو صيانة للكمبيوتر',
    
    test2Text: '"أفضل ميزة أن البرنامج يعمل بدون إنترنت على لابتوب الكاشير، فلا نقلق بشأن انقطاع النت في السوق. ونظام تنشيط الأجهزة مدى الحياة وفر علينا تكاليف الاشتراكات الشهرية."',
    test2Author: 'المهندس سعيد الكردي',
    test2Role: 'مدير مبيعات شركة الدلتا للإلكترونيات',
    
    contactTitle: 'تواصل معنا واحصل على رخصة تجريبية',
    contactDesc: 'املأ البيانات وسيقوم ممثلنا التقني بالتواصل معك لإرسال رابط تحميل البرنامج وإرسال مفتاح تفعيل مجاني (Trial Key) لتجربته بنفسك في المحل.',
    contactPhoneTitle: 'اتصال ودعم مبيعات',
    contactEmailTitle: 'البريد الإلكتروني',
    contactAddressTitle: 'المكتب الرئيسي',
    contactAddressText: 'شارع التسعين الشمالي، التجمع الخامس، القاهرة، مصر',
    
    formName: 'الاسم بالكامل',
    formPhone: 'رقم الهاتف أو الواتساب',
    formEmail: 'البريد الإلكتروني للعمل',
    formCompany: 'اسم المحل أو المركز',
    formBusinessType: 'نوع النشاط والنسخة المطلوبة',
    formBusinessTypeDefault: '-- اختر نوع النشاط والإصدار --',
    formBusinessTypeOption1: 'بيع وصيانة كمبيوتر ولابتوب (نسخة الصيانة)',
    formBusinessTypeOption2: 'بيع وصيانة موبايل وهواتف (نسخة الصيانة)',
    formBusinessTypeOption3: 'سوبرماركت / تجارة عامة / ملابس (نسخة المبيعات العامة)',
    formBusinessTypeOption4: 'محل بيع اكسسوارات وملحقات (نسخة المبيعات العامة)',
    formBusinessTypeOption5: 'مركز صيانة إلكترونيات وأجهزة (نسخة الصيانة)',
    formDevices: 'عدد الأجهزة المراد ترخيصها',
    formDevicesOption1: 'جهاز واحد (الكاشير/الصيانة معاً)',
    formDevicesOption2: '2 - 3 أجهزة (شبكة محلية للمحل)',
    formDevicesOption3: '4 أجهزة فما فوق (فروع أو شبكة كبرى)',
    formMsg: 'استفسارات إضافية',
    formMsgPlaceholder: 'كيف يمكننا مساعدتك؟',
    formSubmit: 'طلب رابط التحميل والرخصة التجريبية',
    
    successTitle: 'تم إرسال طلبك بنجاح!',
    successText: 'شكراً لاهتمامك بنظام سند. سيقوم الدعم الفني بإرسال رابط تحميل البرنامج على الواتساب أو البريد الإلكتروني مع مفتاح التفعيل التجريبي المجاني خلال ساعة واحدة.',
    successClose: 'إغلاق',
    
    footerBrandDesc: 'برنامج سطح المكتب المتكامل رقم 1 المصمم خصيصاً لتمكين محلات الأجهزة ومراكز صيانة الكمبيوتر والموبايل العربية من إدارة أعمالها بكفاءة وسهولة تامة بدون إنترنت.',
    footerCol1Title: 'روابط سريعة',
    footerHome: 'الرئيسية',
    footerCol2Title: 'الموديولات',
    footerMod1: 'تذاكر الصيانة للورشة',
    footerMod2: 'فواتير الكاشير POS',
    footerMod3: 'جرد قطع الغيار والاكسسوار',
    footerMod4: 'حسابات المشتريات والموردين',
    footerMod5: 'المصروفات والأرباح الصافية',
    footerCol3Title: 'الدعم والتفعيل',
    footerSupport1: 'تنشيط مفتاح رخصة',
    footerSupport2: 'دليل استخدام البرنامج',
    footerSupport3: 'سياسة الخصوصية',
    footerSupport4: 'شروط الترخيص',
    footerSupport5: 'التواصل المباشر مبيعات',
    
    copyright: '© 2026 سند لإدارة المبيعات والصيانة. جميع الحقوق محفوظة.',
    craftedBy: 'صُنع بحب لدعم محلات الأجهزة ومراكز الصيانة العربية'
  },
  en: {
    navFeatures: 'Features',
    navWhyUs: 'Why Sanad?',
    navPricing: 'Pricing & Licenses',
    navContact: 'Contact',
    navCta: 'Download Trial',
    logoText: 'Sanad Sales & Repair',
    
    editionRepairTitle: 'PC & Device Repair Edition',
    editionSalesTitle: 'General Retail & POS Edition',
    
    heroBadge: 'Offline-First Desktop App (Windows)',
    
    heroTitleRepair: 'Manage Your Shop or Repair Center with Sanad System',
    heroSubtitleRepair: 'A secure, fast desktop application that runs 100% offline using a local database. Integrates cashier POS, device repair ticket tracking, parts inventory, and expenses in one view.',
    
    heroTitleSales: 'Manage Your Retail Sales & POS with Sanad System',
    heroSubtitleSales: 'A secure, fast desktop application that runs 100% offline for retail stores and POS outlets. Integrates sales invoicing, inventory control, suppliers, and expense ledger.',
    
    heroCtaDownload: 'Download Free Trial',
    heroCtaExplore: 'Explore Features',
    
    statOfflineVal: '100%',
    statOfflineLabel: 'Works Offline (Local DB)',
    statLicenseVal: '1',
    statLicenseLabel: 'Lifetime Device License',
    statSubsVal: '0 EGP',
    statSubsLabel: 'Zero Monthly Subscriptions',
    
    partnersTitle: 'System Technologies & Running Specs',
    
    modulesSubtitle: 'Tailored Tools For Your Shop',
    modulesTitle: 'Integrated Sanad Modules',
    modulesDesc: 'Sanad is built specifically for PC & mobile sales and repair shops, giving you a complete, ready-to-run solution without complexity.',
    
    badgeExclusive: 'Exclusive to Repair Edition',
    badgeShared: 'Available in Both Editions',
    
    mod1Title: 'Repair Tickets & Maintenance',
    mod1Text: 'Track repair lifecycle: Log customer details, device specs (laptop/PC/other), serial numbers, issue details, repair status (Pending, Inspecting, Repairing, Repaired, Delivered), and parts/labor costs.',
    mod1f1: 'Monitor ticket states & logs dynamically',
    mod1f2: 'Deduct spare parts used directly from stock',
    mod1f3: 'Print receipt & delivery tickets for customers',
    
    mod2Title: 'Sales & POS Cashier',
    mod2Text: 'Super-fast and clean interface to sell accessories, devices, and repair services in seconds. Supports barcode scanners, custom discounts, and multiple payment methods.',
    mod2f1: 'Simplified POS screen for fast operations',
    mod2f2: 'Barcode scanner & 80mm thermal printer ready',
    mod2f3: 'Hold invoices & handle sales returns',
    
    mod3Title: 'Products & Parts Inventory',
    mod3Text: 'Manage shop products like accessories and devices, and spare parts (laptop screens, RAMs, SSDs, batteries). Generates smart alerts when inventory levels drop close to zero.',
    mod3f1: 'Unique barcode code for products & parts',
    mod3f2: 'Low stock alerts and minimum qty limits',
    mod3f3: 'Detailed stock logs & history tracking',
    
    mod4Title: 'Purchases & Suppliers',
    mod4Text: 'Log incoming product purchases and spare parts invoices from suppliers. Tracks average cost price and manages unpaid supplier credit balances.',
    mod4f1: 'Import purchases & auto-update inventory',
    mod4f2: 'Track supplier credits & payment due dates',
    mod4f3: 'Database record of all supplier contacts',
    
    mod5Title: 'Expenses & Profit Reports',
    mod5Text: 'Dedicated screen to log daily & monthly shop expenses (rent, electricity, internet, salaries). Modern dashboard generating net profits after subtracting product/parts costs & overheads.',
    mod5f1: 'Categorize expenses to track leaks',
    mod5f2: 'Daily, weekly, and monthly net profit reports',
    mod5f3: 'Export report tables directly to Excel',
    
    mod6Title: 'Device Locking & Licensing',
    mod6Text: 'Integrated security generates a unique device hardware code (Device ID). Allows running as a trial, or activating permanently using a custom key bound to your device offline.',
    mod6f1: 'Permanent lifetime key with zero recurring fees',
    mod6f2: '100% secure, offline-ready activation',
    mod6f3: 'Full encryption for your local shop database',
    
    whyUsSubtitle: 'Exclusive Sanad Advantages',
    whyUsTitle: 'Why Do Shop Owners Choose Sanad?',
    whyUsDesc: 'Sanad is not a generic system; it is a 100% specialized tool crafted to fit PC and repair shops\' workflows.',
    
    benefit1Title: '100% Offline Operations',
    benefit1Text: 'All your shop data is saved securely on your local PC. No need to worry about internet drops; the app runs ultra-fast and completely offline.',
    benefit2Title: 'Printable Repair Invoices',
    benefit2Text: 'Print professional drop-off receipts when clients leave devices, and print final repair bills with itemized parts & labor costs at checkout.',
    benefit3Title: 'Lifetime Licenses (No Subscriptions)',
    benefit3Text: 'Forget hefty monthly fees. With Sanad, you buy a device activation key once and use the software forever, with zero recurring charges.',
    benefit4Title: 'Secure Local SQLite Database',
    benefit4Text: 'Full protection for your customer list, sales ledger, and repairs. Take manual database backups easily to protect your business records.',
    benefit5Title: 'Cash Drawer & Barcode Ready',
    benefit5Text: 'Integrates out-of-the-box with standard USB barcode scanners to speed up checkouts, and 80mm/58mm thermal ticket printers.',
    benefit6Title: 'Free Installation & Support',
    benefit6Text: 'We provide a free onboarding session to install the program, activate your device key, and train you and your staff on all features.',
    
    pricingSubtitle: 'Lifetime Activation, Zero Subscriptions',
    pricingTitle: 'Choose the Perfect Activation License',
    pricingToggleKey: 'Lifetime License Key Only',
    pricingToggleSupport: 'Lifetime + Support/Updates',
    pricingToggleSupportBadge: '1 Yr Updates',
    
    plan1Name: 'Single PC License',
    plan1DescRepair: 'Perfect for repair shops operating from a single computer.',
    plan1DescSales: 'Perfect for retail shops operating from a single cashier station.',
    plan1Period: '/ One-Time Payment',
    plan1PeriodSupport: '/ Lifetime Key + 1 Yr Support',
    plan1f1: '1 Device Lifetime Activation Key',
    plan1f2: 'Local Offline Database (SQLite)',
    plan1f3: 'Full POS & Sales Cashier Module',
    plan1f4: 'Full Repair Tickets & Maintenance',
    plan1f4_disabled: 'Repair Tickets & Maintenance (Not Available)',
    plan1f5: 'Inventory, Purchase & Expenses',
    plan1f6: 'Multi-PC LAN Sync',
    plan1Cta: 'Get Activation Key',
    
    plan2Badge: 'Recommended Choice',
    plan2Name: '3-PC Network License',
    plan2DescRepair: 'Ideal for linking cashier, repair desk, and manager PCs locally.',
    plan2DescSales: 'Ideal for linking multiple cashiers, managers, and stock desks.',
    plan2Period: '/ One-Time Payment',
    plan2PeriodSupport: '/ Lifetime Key + 1 Yr Support',
    plan2f1: '3 Device Activation Keys',
    plan2f2: 'Real-time local LAN data sync',
    plan2f3: 'Simultaneous Cashier, Repair & Admin',
    plan2f3_sales: 'Multi-Cashier & Stock Admin Sync',
    plan2f4: 'Full Repair Tickets & Stock Modules',
    plan2f4_disabled: 'Repair Tickets & Maintenance (Not Available)',
    plan2f5: 'Advanced user-based profit reports',
    plan2f6: 'Free priority support & training session',
    plan2Cta: 'Activate Network Bundle',
    
    plan3Name: 'Enterprise & Branches',
    plan3Desc: 'Custom integration for multi-branch chains linked via cloud server.',
    plan3Price: 'Custom',
    plan3f1: 'Unlimited Device Keys',
    plan3f2: 'Sync branches via secure cloud DB',
    plan3f3: 'Tailored invoice & repair fields',
    plan3f3_sales: 'Tailored invoice & branch databases',
    plan3f4: '24/7 Priority support hotline',
    plan3f5: 'Online owner management dashboard',
    plan3f6: 'Automated cloud backups scheduler',
    plan3Cta: 'Contact Sales Dept',
    
    testimonialsSubtitle: 'Reviews From Shop Owners',
    testimonialsTitle: 'What They Say About Sanad System',
    
    test1Text: '"I used to struggle with missing laptop units and untracked repair parts. Sanad organized my workshop completely; now I print client receipts instantly at drop-off."',
    test1Author: 'Mr. Mahmoud Jaber',
    test1Role: 'Owner of Techno-Repair PC Center',
    
    test2Text: '"The best part is that the program runs offline on the cashier\'s laptop, so we don\'t care about internet downtime. The lifetime key saved us huge monthly subscription costs."',
    test2Author: 'Eng. Said Al-Kurdi',
    test2Role: 'Sales Manager, Delta Electronics',
    
    contactTitle: 'Get Your Free Trial Key Now',
    contactDesc: 'Fill in the details and our team will contact you to send the desktop download link and a free trial activation key to test in your shop.',
    contactPhoneTitle: 'Sales Support Phone',
    contactEmailTitle: 'Email Support',
    contactAddressTitle: 'Headquarters',
    contactAddressText: 'North 90th St, 5th Settlement, New Cairo, Egypt',
    
    formName: 'Full Name',
    formPhone: 'Phone / WhatsApp',
    formEmail: 'Business Email',
    formCompany: 'Shop Name',
    formBusinessType: 'Business Type & Edition',
    formBusinessTypeDefault: '-- Select Business Type & Edition --',
    formBusinessTypeOption1: 'PC/Laptop Sales & Repairs (Repair Edition)',
    formBusinessTypeOption2: 'Mobile Sales & Repairs (Repair Edition)',
    formBusinessTypeOption3: 'Supermarket / Grocery / General Store (Sales Edition)',
    formBusinessTypeOption4: 'Accessories & Retail Shop (Sales Edition)',
    formBusinessTypeOption5: 'Electronics Repair Center (Repair Edition)',
    formDevices: 'Number of Devices to License',
    formDevicesOption1: 'Single PC (Cashier/Repair combined)',
    formDevicesOption2: '2 - 3 PCs (Local LAN Sync for shop)',
    formDevicesOption3: '4+ PCs (Multiple branches or big network)',
    formMsg: 'Additional Questions',
    formMsgPlaceholder: 'How can we help you?',
    formSubmit: 'Request Download Link & Trial Key',
    
    successTitle: 'Request Sent Successfully!',
    successText: 'Thank you for your interest in Sanad. Our technical support will send the setup download link and your free trial activation key via WhatsApp/Email shortly.',
    successClose: 'Close',
    
    footerBrandDesc: 'The #1 integrated desktop ERP designed specifically to empower Arab computer, mobile, and electronics repair shops to run seamlessly offline.',
    footerCol1Title: 'Quick Links',
    footerHome: 'Home',
    footerCol2Title: 'Modules',
    footerMod1: 'Workshop Repair Tickets',
    footerMod2: 'POS Sales & Cashier',
    footerMod3: 'Spare Parts Stock',
    footerMod4: 'Purchases & Suppliers',
    footerMod5: 'Expenses & Net Profits',
    footerCol3Title: 'License & Support',
    footerSupport1: 'Activate License Key',
    footerSupport2: 'User Manual Guide',
    footerSupport3: 'Privacy Policy',
    footerSupport4: 'License Terms',
    footerSupport5: 'Contact Sales Dept',
    
    copyright: '© 2026 Sanad for Sales & Repair. All rights reserved.',
    craftedBy: 'Crafted with love for Arab IT & repair businesses'
  }
};

export default function Home() {
  const DOWNLOAD_URL_REPAIR = "https://drive.google.com/uc?export=download&id=YOUR_REPAIR_FILE_ID";
  const DOWNLOAD_URL_SALES = "https://drive.google.com/uc?export=download&id=YOUR_SALES_FILE_ID";
  const [lang, setLang] = useState('ar');
  const [edition, setEdition] = useState('repair'); // 'repair' or 'sales'
  const [pricingEdition, setPricingEdition] = useState('repair'); // 'repair' or 'sales'
  const [isSupportBundle, setIsSupportBundle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    businessType: '',
    devices: '1',
    msg: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.className = lang === 'ar' ? 'lang-ar' : 'lang-en';
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleLangToggle = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Web3Forms Integration: Get a free key at https://web3forms.com/
    // Paste your key below to receive emails at sanad.erp@outlook.com
    const ACCESS_KEY = "44d15e60-0982-4eb2-8606-24b488d3b4ca"; 
    
    if (ACCESS_KEY && ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: ACCESS_KEY,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            company: formData.company,
            businessType: formData.businessType,
            devices: formData.devices,
            message: formData.msg,
            subject: `New Sanad ERP Request - ${formData.company}`
          })
        });
        const result = await response.json();
        if (result.success) {
          setShowSuccess(true);
        } else {
          alert(lang === 'ar' ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.' : 'Failed to send. Please try again.');
        }
      } catch (err) {
        console.error(err);
        alert(lang === 'ar' ? 'خطأ في الاتصال بالخادم.' : 'Error connecting to the server.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Fallback Simulation Mode (Default)
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
      }, 1200);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      company: '',
      businessType: '',
      devices: '1',
      msg: ''
    });
  };

  // Dynamic price calculation
  const getStarterPrice = () => {
    if (pricingEdition === 'repair') {
      return isSupportBundle ? '1,999' : '1,499';
    } else {
      return isSupportBundle ? '1,599' : '1,199';
    }
  };

  const getBusinessPrice = () => {
    if (pricingEdition === 'repair') {
      return isSupportBundle ? '4,499' : '3,499';
    } else {
      return isSupportBundle ? '3,599' : '2,799';
    }
  };

  return (
    <>
      {/* Header / Navbar */}
      <header className="navbar" id="navbar">
        <div className="container navbar-container">
          <a href="#" className="logo">
            <img 
              src="/logo.jpg" 
              alt="Sanad ERP Logo" 
              className="logo-img" 
              style={{
                height: '42px',
                width: 'auto',
                borderRadius: '8px',
                marginLeft: lang === 'ar' ? '12px' : '0px',
                marginRight: lang === 'en' ? '12px' : '0px'
              }} 
            />
            <span className="logo-text">{t[lang].logoText}</span>
          </a>
          
          <nav className="nav-links" id="nav-links">
            <a href="#features" className="nav-link">{t[lang].navFeatures}</a>
            <a href="#why-us" className="nav-link">{t[lang].navWhyUs}</a>
            <a href="#pricing" className="nav-link">{t[lang].navPricing}</a>
            <a href="#contact" className="nav-link">{t[lang].navContact}</a>
          </nav>

          <div className="nav-actions">
            <button className="lang-btn" id="lang-switch" onClick={handleLangToggle}>
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            
            <a href="#contact" className="btn btn-primary nav-cta-btn">{t[lang].navCta}</a>
            
            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(true)} aria-label="Toggle Menu">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`} id="mobile-drawer">
        <div className="drawer-header">
          <a href="#" className="logo">
            <img 
              src="/logo.jpg" 
              alt="Sanad ERP Logo" 
              style={{
                height: '32px',
                width: 'auto',
                borderRadius: '6px',
                marginLeft: lang === 'ar' ? '8px' : '0px',
                marginRight: lang === 'en' ? '8px' : '0px'
              }} 
            />
            <span className="logo-text">سند ERP</span>
          </a>
          <button className="drawer-close" onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <nav className="drawer-links">
          <a href="#features" className="drawer-link" onClick={() => setIsMenuOpen(false)}>{t[lang].navFeatures}</a>
          <a href="#why-us" className="drawer-link" onClick={() => setIsMenuOpen(false)}>{t[lang].navWhyUs}</a>
          <a href="#pricing" className="drawer-link" onClick={() => setIsMenuOpen(false)}>{t[lang].navPricing}</a>
          <a href="#contact" className="drawer-link" onClick={() => setIsMenuOpen(false)}>{t[lang].navContact}</a>
          
          <a href="#contact" className="btn btn-primary drawer-cta" onClick={() => setIsMenuOpen(false)}>{t[lang].navCta}</a>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        
        <div className="container hero-container">
          <div className="hero-content">
            <div className="badge-container">
              <span className="hero-badge"><i className="fa-solid fa-laptop-code"></i> {t[lang].heroBadge}</span>
            </div>
            
            {/* Edition Switcher Tabs */}
            <div className="edition-tabs-container">
              <div className="edition-tabs">
                <button 
                  className={`edition-tab ${edition === 'repair' ? 'active' : ''}`}
                  onClick={() => setEdition('repair')}
                >
                  <i className="fa-solid fa-screwdriver-wrench"></i> {t[lang].editionRepairTitle}
                </button>
                <button 
                  className={`edition-tab ${edition === 'sales' ? 'active' : ''}`}
                  onClick={() => setEdition('sales')}
                >
                  <i className="fa-solid fa-cash-register"></i> {t[lang].editionSalesTitle}
                </button>
              </div>
            </div>

            <h1 className="hero-title">
              {edition === 'repair' ? t[lang].heroTitleRepair : t[lang].heroTitleSales}
            </h1>
            <p className="hero-subtitle">
              {edition === 'repair' ? t[lang].heroSubtitleRepair : t[lang].heroSubtitleSales}
            </p>
            
            <div className="hero-btns">
              <a href="#contact" className="btn btn-primary btn-lg"><i className="fa-solid fa-download"></i> {t[lang].heroCtaDownload}</a>
              <a href="#features" className="btn btn-secondary btn-lg"><i className="fa-solid fa-circle-info"></i> {t[lang].heroCtaExplore}</a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{t[lang].statOfflineVal}</span>
                <span className="stat-label">{t[lang].statOfflineLabel}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{t[lang].statLicenseVal}</span>
                <span className="stat-label">{t[lang].statLicenseLabel}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">{t[lang].statSubsVal}</span>
                <span className="stat-label">{t[lang].statSubsLabel}</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="dashboard-mockup-wrapper">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-url">
                  {edition === 'repair' ? 'Local Server | Sanad System Desktop ERP' : 'Local Server | Sanad General Sales POS'}
                </div>
              </div>
              <div className="mockup-body">
                <img 
                  src={edition === 'repair' ? '/dashboard_mockup.jpg' : '/tabs/tab_1_pos.jpg'} 
                  alt="Sanad ERP Mockup View" 
                  className="dashboard-img" 
                  id="hero-dashboard-img" 
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Core Modules Section */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t[lang].modulesSubtitle}</span>
            <h2 className="section-title">{t[lang].modulesTitle}</h2>
            <p className="section-desc">{t[lang].modulesDesc}</p>
          </div>

          <div className="modules-grid">
            {/* Module 1 */}
            <div className="module-card">
              <div className="module-icon"><i className="fa-solid fa-screwdriver-wrench"></i></div>
              <span className="module-badge exclusive">{t[lang].badgeExclusive}</span>
              <h3 className="module-title">{t[lang].mod1Title}</h3>
              <p className="module-text">{t[lang].mod1Text}</p>
              <ul className="module-features">
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod1f1}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod1f2}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod1f3}</li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="module-card">
              <div className="module-icon"><i className="fa-solid fa-cash-register"></i></div>
              <span className="module-badge shared">{t[lang].badgeShared}</span>
              <h3 className="module-title">{t[lang].mod2Title}</h3>
              <p className="module-text">{t[lang].mod2Text}</p>
              <ul className="module-features">
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod2f1}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod2f2}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod2f3}</li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="module-card">
              <div className="module-icon"><i className="fa-solid fa-boxes-stacked"></i></div>
              <span className="module-badge shared">{t[lang].badgeShared}</span>
              <h3 className="module-title">{t[lang].mod3Title}</h3>
              <p className="module-text">{t[lang].mod3Text}</p>
              <ul className="module-features">
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod3f1}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod3f2}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod3f3}</li>
              </ul>
            </div>

            {/* Module 4 */}
            <div className="module-card">
              <div className="module-icon"><i className="fa-solid fa-truck-ramp-box"></i></div>
              <span className="module-badge shared">{t[lang].badgeShared}</span>
              <h3 className="module-title">{t[lang].mod4Title}</h3>
              <p className="module-text">{t[lang].mod4Text}</p>
              <ul className="module-features">
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod4f1}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod4f2}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod4f3}</li>
              </ul>
            </div>

            {/* Module 5 */}
            <div className="module-card">
              <div className="module-icon"><i className="fa-solid fa-chart-pie"></i></div>
              <span className="module-badge shared">{t[lang].badgeShared}</span>
              <h3 className="module-title">{t[lang].mod5Title}</h3>
              <p className="module-text">{t[lang].mod5Text}</p>
              <ul className="module-features">
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod5f1}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod5f2}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod5f3}</li>
              </ul>
            </div>

            {/* Module 6 */}
            <div className="module-card">
              <div className="module-icon"><i className="fa-solid fa-key"></i></div>
              <span className="module-badge shared">{t[lang].badgeShared}</span>
              <h3 className="module-title">{t[lang].mod6Title}</h3>
              <p className="module-text">{t[lang].mod6Text}</p>
              <ul className="module-features">
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod6f1}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod6f2}</li>
                <li><i className="fa-solid fa-circle-check"></i> {t[lang].mod6f3}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section" id="why-us">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t[lang].whyUsSubtitle}</span>
            <h2 className="section-title">{t[lang].whyUsTitle}</h2>
            <p className="section-desc">{t[lang].whyUsDesc}</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon"><i className="fa-solid fa-wifi-slash"></i></div>
              <h3 className="benefit-title">{t[lang].benefit1Title}</h3>
              <p className="benefit-text">{t[lang].benefit1Text}</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon"><i className="fa-solid fa-print"></i></div>
              <h3 className="benefit-title">{t[lang].benefit2Title}</h3>
              <p className="benefit-text">{t[lang].benefit2Text}</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon"><i className="fa-solid fa-unlock-keyhole"></i></div>
              <h3 className="benefit-title">{t[lang].benefit3Title}</h3>
              <p className="benefit-text">{t[lang].benefit3Text}</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon"><i className="fa-solid fa-database"></i></div>
              <h3 className="benefit-title">{t[lang].benefit4Title}</h3>
              <p className="benefit-text">{t[lang].benefit4Text}</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon"><i className="fa-solid fa-barcode"></i></div>
              <h3 className="benefit-title">{t[lang].benefit5Title}</h3>
              <p className="benefit-text">{t[lang].benefit5Text}</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon"><i className="fa-solid fa-headphones"></i></div>
              <h3 className="benefit-title">{t[lang].benefit6Title}</h3>
              <p className="benefit-text">{t[lang].benefit6Text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t[lang].pricingSubtitle}</span>
            <h2 className="section-title">{t[lang].pricingTitle}</h2>
            
            {/* Edition Switcher inside Pricing */}
            <div className="pricing-edition-container">
              <div className="pricing-edition-tabs">
                <button 
                  className={`pricing-edition-tab ${pricingEdition === 'repair' ? 'active' : ''}`}
                  onClick={() => setPricingEdition('repair')}
                >
                  {t[lang].editionRepairTitle}
                </button>
                <button 
                  className={`pricing-edition-tab ${pricingEdition === 'sales' ? 'active' : ''}`}
                  onClick={() => setPricingEdition('sales')}
                >
                  {t[lang].editionSalesTitle}
                </button>
              </div>
            </div>

            {/* Billing Switcher Toggle */}
            <div className="billing-switcher">
              <span className={`switcher-label ${!isSupportBundle ? 'active' : ''}`}>
                {t[lang].pricingToggleKey}
              </span>
              
              <label className="switch-toggle">
                <input 
                  type="checkbox" 
                  checked={isSupportBundle} 
                  onChange={(e) => setIsSupportBundle(e.target.checked)} 
                />
                <span className="slider round"></span>
              </label>
              
              <span className={`switcher-label ${isSupportBundle ? 'active' : ''}`}>
                {t[lang].pricingToggleSupport} <span className="discount-badge">{t[lang].pricingToggleSupportBadge}</span>
              </span>
            </div>
          </div>

          <div className="pricing-grid">
            {/* Plan 1 */}
            <div className="pricing-card">
              <div className="pricing-header">
                <h3 className="plan-name">{t[lang].plan1Name}</h3>
                <p className="plan-desc">
                  {pricingEdition === 'repair' ? t[lang].plan1DescRepair : t[lang].plan1DescSales}
                </p>
                <div className="plan-price">
                  <span className="price-currency">EGP</span>
                  <span className="price-val">{getStarterPrice()}</span>
                  <span className="price-period">
                    {isSupportBundle ? t[lang].plan1PeriodSupport : t[lang].plan1Period}
                  </span>
                </div>
              </div>
              <div className="pricing-features">
                <ul>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan1f1}</li>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan1f2}</li>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan1f3}</li>
                  {pricingEdition === 'repair' ? (
                    <li><i className="fa-solid fa-check"></i> {t[lang].plan1f4}</li>
                  ) : (
                    <li className="disabled"><i className="fa-solid fa-xmark"></i> {t[lang].plan1f4_disabled}</li>
                  )}
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan1f5}</li>
                  <li className="disabled"><i className="fa-solid fa-xmark"></i> {t[lang].plan1f6}</li>
                </ul>
              </div>
              <div className="pricing-cta">
                <a href="#contact" className="btn btn-outline btn-block">{t[lang].plan1Cta}</a>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="pricing-card featured">
              <div className="featured-badge">{t[lang].plan2Badge}</div>
              <div className="pricing-header">
                <h3 className="plan-name">{t[lang].plan2Name}</h3>
                <p className="plan-desc">
                  {pricingEdition === 'repair' ? t[lang].plan2DescRepair : t[lang].plan2DescSales}
                </p>
                <div className="plan-price">
                  <span className="price-currency">EGP</span>
                  <span className="price-val">{getBusinessPrice()}</span>
                  <span className="price-period">
                    {isSupportBundle ? t[lang].plan2PeriodSupport : t[lang].plan2Period}
                  </span>
                </div>
              </div>
              <div className="pricing-features">
                <ul>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan2f1}</li>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan2f2}</li>
                  {pricingEdition === 'repair' ? (
                    <li><i className="fa-solid fa-check"></i> {t[lang].plan2f3}</li>
                  ) : (
                    <li><i className="fa-solid fa-check"></i> {t[lang].plan2f3_sales}</li>
                  )}
                  {pricingEdition === 'repair' ? (
                    <li><i className="fa-solid fa-check"></i> {t[lang].plan2f4}</li>
                  ) : (
                    <li className="disabled"><i className="fa-solid fa-xmark"></i> {t[lang].plan2f4_disabled}</li>
                  )}
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan2f5}</li>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan2f6}</li>
                </ul>
              </div>
              <div className="pricing-cta">
                <a href="#contact" className="btn btn-primary btn-block">{t[lang].plan2Cta}</a>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="pricing-card">
              <div className="pricing-header">
                <h3 className="plan-name">{t[lang].plan3Name}</h3>
                <p className="plan-desc">{t[lang].plan3Desc}</p>
                <div className="plan-price">
                  <span className="price-val" style={{ fontSize: '2.2rem' }}>
                    {t[lang].plan3Price}
                  </span>
                </div>
              </div>
              <div className="pricing-features">
                <ul>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan3f1}</li>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan3f2}</li>
                  {pricingEdition === 'repair' ? (
                    <li><i className="fa-solid fa-check"></i> {t[lang].plan3f3}</li>
                  ) : (
                    <li><i className="fa-solid fa-check"></i> {t[lang].plan3f3_sales}</li>
                  )}
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan3f4}</li>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan3f5}</li>
                  <li><i className="fa-solid fa-check"></i> {t[lang].plan3f6}</li>
                </ul>
              </div>
              <div className="pricing-cta">
                <a href="#contact" className="btn btn-outline btn-block">{t[lang].plan3Cta}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t[lang].testimonialsSubtitle}</span>
            <h2 className="section-title">{t[lang].testimonialsTitle}</h2>
          </div>

          <div className="testimonial-carousel-wrapper">
            <div className="testimonial-track" style={{
              display: 'flex',
              transform: `translateX(${lang === 'ar' ? (slideIndex * 100) : -(slideIndex * 100)}%)`,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {/* Slide 1 */}
              <div className="testimonial-card" style={{ flex: '0 0 100%', maxWidth: '100%' }}>
                <div className="quote-icon"><i className="fa-solid fa-quote-left"></i></div>
                <p className="testimonial-text">{t[lang].test1Text}</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name">{t[lang].test1Author}</h4>
                    <p className="author-role">{t[lang].test1Role}</p>
                  </div>
                </div>
              </div>
              
              {/* Slide 2 */}
              <div className="testimonial-card" style={{ flex: '0 0 100%', maxWidth: '100%' }}>
                <div className="quote-icon"><i className="fa-solid fa-quote-left"></i></div>
                <p className="testimonial-text">{t[lang].test2Text}</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name">{t[lang].test2Author}</h4>
                    <p className="author-role">{t[lang].test2Role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="carousel-dots">
              <span 
                className={`dot ${slideIndex === 0 ? 'active' : ''}`} 
                onClick={() => setSlideIndex(0)}
              ></span>
              <span 
                className={`dot ${slideIndex === 1 ? 'active' : ''}`} 
                onClick={() => setSlideIndex(1)}
              ></span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking / Contact Form Section */}
      <section className="contact-section" id="contact">
        <div className="container contact-container">
          <div className="contact-info-panel">
            <h2 className="contact-title">{t[lang].contactTitle}</h2>
            <p className="contact-desc">{t[lang].contactDesc}</p>
            
            <div className="contact-details">
              <div className="detail-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h4>{t[lang].contactPhoneTitle}</h4>
                  <p dir="ltr">01002403727</p>
                </div>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h4>{t[lang].contactEmailTitle}</h4>
                  <p>sanad.erp@outlook.com</p>
                </div>
              </div>
              <div className="detail-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h4>{t[lang].contactAddressTitle}</h4>
                  <p>{t[lang].contactAddressText}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            <form onSubmit={handleSubmit} className="demo-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>{t[lang].formName} <span className="required">*</span></label>
                  <input 
                    type="text" 
                    required 
                    placeholder={lang === 'ar' ? 'أحمد محمد' : 'John Doe'} 
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                  />
                </div>
                
                <div className="form-group">
                  <label>{t[lang].formPhone} <span className="required">*</span></label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="01xxxxxxxxx" 
                    className="form-input" 
                    dir="auto"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e, 'phone')}
                  />
                </div>

                <div className="form-group">
                  <label>{t[lang].formEmail} <span className="required">*</span></label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@shop.com" 
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                  />
                </div>

                <div className="form-group">
                  <label>{t[lang].formCompany} <span className="required">*</span></label>
                  <input 
                    type="text" 
                    required 
                    placeholder={lang === 'ar' ? 'محل الشروق للكمبيوتر' : 'Al-Shorouk PC Shop'} 
                    className="form-input"
                    value={formData.company}
                    onChange={(e) => handleInputChange(e, 'company')}
                  />
                </div>

                <div className="form-group">
                  <label>{t[lang].formBusinessType} <span className="required">*</span></label>
                  <select 
                    required 
                    className="form-input"
                    value={formData.businessType}
                    onChange={(e) => handleInputChange(e, 'businessType')}
                  >
                    <option value="">{t[lang].formBusinessTypeDefault}</option>
                    <option value="pc-repair">{t[lang].formBusinessTypeOption1}</option>
                    <option value="mobile">{t[lang].formBusinessTypeOption2}</option>
                    <option value="supermarket">{t[lang].formBusinessTypeOption3}</option>
                    <option value="retail">{t[lang].formBusinessTypeOption4}</option>
                    <option value="electronics">{t[lang].formBusinessTypeOption5}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{t[lang].formDevices} <span className="required">*</span></label>
                  <select 
                    required 
                    className="form-input"
                    value={formData.devices}
                    onChange={(e) => handleInputChange(e, 'devices')}
                  >
                    <option value="1">{t[lang].formDevicesOption1}</option>
                    <option value="2-3">{t[lang].formDevicesOption2}</option>
                    <option value="4+">{t[lang].formDevicesOption3}</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>{t[lang].formMsg}</label>
                  <textarea 
                    rows="4" 
                    placeholder={t[lang].formMsgPlaceholder} 
                    className="form-input textarea"
                    value={formData.msg}
                    onChange={(e) => handleInputChange(e, 'msg')}
                  ></textarea>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span><i className="fa-solid fa-spinner fa-spin"></i> Loading...</span>
                ) : (
                  <span><i className="fa-solid fa-download"></i> {t[lang].formSubmit}</span>
                )}
              </button>
            </form>

            {/* Success Confirmation Message */}
            <div className={`form-success-overlay ${showSuccess ? 'active' : ''}`} id="form-success">
              <div className="success-card">
                <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
                <h3>{t[lang].successTitle}</h3>
                <p>{t[lang].successText}</p>
                
                {/* Download links container */}
                <div className="success-downloads-container">
                  <p style={{ fontWeight: 'bold', marginBottom: '5px', color: 'var(--text-main)' }}>
                    {lang === 'ar' ? 'روابط التحميل المباشرة لنسختك التجريبية:' : 'Direct download links for your trial:'}
                  </p>
                  
                  {/* Repair Edition Download Button */}
                  <a 
                    href={DOWNLOAD_URL_REPAIR} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`success-download-btn ${['pc-repair', 'mobile', 'electronics', ''].includes(formData.businessType) ? 'primary' : 'secondary'}`}
                  >
                    <i className="fa-solid fa-screwdriver-wrench"></i>
                    <span>
                      {lang === 'ar' ? 'تحميل إصدار صيانة الأجهزة والكمبيوتر' : 'Download PC & Repair Edition'}
                    </span>
                    {['pc-repair', 'mobile', 'electronics'].includes(formData.businessType) && (
                      <span className="recommend-badge">
                        {lang === 'ar' ? 'موصى به' : 'Recommended'}
                      </span>
                    )}
                  </a>
                  
                  {/* Sales Edition Download Button */}
                  <a 
                    href={DOWNLOAD_URL_SALES} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`success-download-btn ${['supermarket', 'retail'].includes(formData.businessType) ? 'primary' : 'secondary'}`}
                  >
                    <i className="fa-solid fa-cash-register"></i>
                    <span>
                      {lang === 'ar' ? 'تحميل إصدار المبيعات والكاشير العامة' : 'Download General Retail & POS'}
                    </span>
                    {['supermarket', 'retail'].includes(formData.businessType) && (
                      <span className="recommend-badge">
                        {lang === 'ar' ? 'موصى به' : 'Recommended'}
                      </span>
                    )}
                  </a>
                </div>

                <button className="btn btn-secondary" style={{ marginTop: '15px', width: '100%' }} onClick={handleCloseSuccess}>
                  {t[lang].successClose}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img 
                src="/logo.jpg" 
                alt="Sanad ERP Logo" 
                style={{
                  height: '36px',
                  width: 'auto',
                  borderRadius: '6px',
                  marginLeft: lang === 'ar' ? '10px' : '0px',
                  marginRight: lang === 'en' ? '10px' : '0px'
                }} 
              />
              <span className="logo-text">{t[lang].logoText}</span>
            </a>
            <p className="footer-desc">{t[lang].footerBrandDesc}</p>
            
            <div className="social-links">
              <a href="#" className="social-link"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="#" className="social-link"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" className="social-link"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>{t[lang].footerCol1Title}</h4>
            <ul>
              <li><a href="#hero">{t[lang].footerHome}</a></li>
              <li><a href="#features">{t[lang].navFeatures}</a></li>
              <li><a href="#why-us">{t[lang].navWhyUs}</a></li>
              <li><a href="#pricing">{t[lang].navPricing}</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>{t[lang].footerCol2Title}</h4>
            <ul>
              <li><a href="#features">{t[lang].footerMod1}</a></li>
              <li><a href="#features">{t[lang].footerMod2}</a></li>
              <li><a href="#features">{t[lang].footerMod3}</a></li>
              <li><a href="#features">{t[lang].footerMod4}</a></li>
              <li><a href="#features">{t[lang].footerMod5}</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>{t[lang].footerCol3Title}</h4>
            <ul>
              <li><a href="#">{t[lang].footerSupport1}</a></li>
              <li><a href="#">{t[lang].footerSupport2}</a></li>
              <li><a href="#">{t[lang].footerSupport3}</a></li>
              <li><a href="#">{t[lang].footerSupport4}</a></li>
              <li><a href="#contact">{t[lang].footerSupport5}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container footer-bottom">
          <p className="copyright">{t[lang].copyright}</p>
          <p className="crafted-by">{t[lang].craftedBy}</p>
        </div>
      </footer>
    </>
  );
}
