import { NextResponse } from 'next/server';

const EGYPT_PHONE_REGEX = /^(?:\+?20|0020|0)?1[0125]\d{8}$/;

function normalizePhone(input = '') {
  return String(input).replace(/[\s\-().]/g, '');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name = '',
      phone = '',
      businessName = '',
      governorate = '',
      edition = '',
      requestType = '',
      notes = '',
      website = '', // Honeypot field
    } = body || {};

    // Spam protection: Honeypot check
    if (website && String(website).trim().length > 0) {
      return NextResponse.json({ ok: true, spamFiltered: true });
    }

    const cleanName = String(name).trim();
    const cleanPhone = normalizePhone(phone);
    const cleanBusiness = String(businessName).trim();

    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'يرجى إدخال الاسم بالكامل بشكل صحيح.' },
        { status: 400 }
      );
    }

    if (!EGYPT_PHONE_REGEX.test(cleanPhone)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'يرجى إدخال رقم هاتف مصري صحيح (مثال: 01002403727 أو +201002403727).',
        },
        { status: 400 }
      );
    }

    if (!cleanBusiness || cleanBusiness.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'يرجى إدخال اسم النشاط أو المحل.' },
        { status: 400 }
      );
    }

    if (!edition || !['repair', 'sales'].includes(edition)) {
      return NextResponse.json(
        { ok: false, error: 'يرجى اختيار النسخة المطلوبة.' },
        { status: 400 }
      );
    }

    if (!requestType || !['trial', 'purchase', 'inquiry'].includes(requestType)) {
      return NextResponse.json(
        { ok: false, error: 'يرجى تحديد نوع الطلب.' },
        { status: 400 }
      );
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY || '44d15e60-0982-4eb2-8606-24b488d3b4ca';
    if (!accessKey) {
      return NextResponse.json(
        {
          ok: false,
          code: 'MISSING_ENDPOINT_CONFIG',
          error:
            'خدمة إرسال البريد غير مفعلة حالياً في بيئة التشغيل (WEB3FORMS_ACCESS_KEY غير مضبوط). يمكنك تحميل النسخة مباشرة أو إرسال طلبك عبر واتساب.',
        },
        { status: 503 }
      );
    }

    const editionLabel =
      edition === 'repair'
        ? 'سند لإدارة المبيعات والصيانة'
        : 'سند للمبيعات وإدارة المحلات';

    const requestTypeLabel =
      requestType === 'trial'
        ? 'طلب نسخة تجريبية'
        : requestType === 'purchase'
        ? 'طلب شراء ترخيص'
        : 'استفسار عن الترخيص';

    const web3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[سند ERP] ${requestTypeLabel} — ${cleanBusiness}`,
        from_name: cleanName,
        name: cleanName,
        phone: cleanPhone,
        business_name: cleanBusiness,
        governorate: governorate || 'غير محدد',
        edition: editionLabel,
        request_type: requestTypeLabel,
        message: notes || 'لا توجد ملاحظات إضافية',
      }),
    });

    const result = await web3Res.json();

    if (!web3Res.ok || !result.success) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'تعذر إرسال الطلب عبر الخادم في الوقت الحالي. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: 'حدث خطأ غير متوقع أثناء معالجة الطلب. يمكنك التواصل معنا مباشرة عبر واتساب.',
      },
      { status: 500 }
    );
  }
}
