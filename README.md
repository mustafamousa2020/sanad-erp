# سند ERP (SANAD ERP) — الموقع الرسمي وصفحة الهبوط

صفحة هبوط عربية (RTL) عالية الأداء لنظام **سند ERP** لسطح المكتب (إصدار المبيعات والصيانة + إصدار المبيعات وإدارة المحلات)، مبنية باستخدام **Next.js 16 (App Router)**.

---

## 📁 هيكل المشروع الأساسي

- `src/content.ts`: **ملف المحتوى المركزي** — يحتوي على جميع النصوص، العناوين، المميزات، الأسعار، الأسئلة الشائعة، أرقام التواصل، وروابط التحميل المباشرة لسهولة التعديل من مكان واحد.
- `src/app/page.js`: الصفحة الرئيسية وتضم كافة الأقسام والـ Lead Form التفاعلي.
- `src/app/api/lead/route.js`: نقطة اتصال خلفية (Server Route Handler) للتحقق من البيانات (بما في ذلك صيغ أرقام الموبايل المصرية وحماية Honeypot ضد السبام) وإرسال الطلبات بأمان عبر Web3Forms دون كشف المفتاح في المتصفح.
- `src/app/layout.js`: إعدادات الخطوط (`IBM Plex Sans Arabic` + `Inter` عبر `next/font/google`)، الميتاداتا، والبيانات المهيكلة (`JSON-LD`).
- `src/app/globals.css`: نظام التصميم الكامل بالهوية البصرية الداكنة (Dark Premium Enterprise).
- `public/screenshots/`: لقطات الشاشة الحقيقية لنظام سند ERP.
- `AUDIT.md`: تقرير الفحص المبدئي للمشروع.
- `MISSING.md`: قائمة العناصر والسياسات التي تحتاج لتأكيد مستقبلي من صاحب المنتج.

---

## ⚙️ المتغيرات البيئية المطلوبة (Environment Variables)

أنشئ ملف `.env.local` في جذر المشروع (أو أضف المتغيرات في إعدادات Vercel) بالقيم التالية:

```env
# مفتاح Web3Forms لاستقبال طلبات العملاء على البريد (sanad.erp@outlook.com)
WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here

# رابط الموقع الأساسي (يُستخدم في SEO و Sitemap و OpenGraph)
NEXT_PUBLIC_SITE_URL=https://sanad-erp-two.vercel.app
```

> **ملاحظة أمنية**: يتم قراءة `WEB3FORMS_ACCESS_KEY` داخل السيرفر فقط (`src/app/api/lead/route.js`) ولا يظهر نهائياً في كود المتصفح لدى الزائر.

---

## 🚀 التشغيل المحلي (Local Development & Build)

1. تثبيت الحزم:
   ```bash
   npm install
   ```

2. تشغيل بيئة التطوير:
   ```bash
   npm run dev
   ```
   ثم افتح `http://localhost:3000`.

3. بناء نسخة الإنتاج وفحصها:
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 خطوات النشر على Vercel

1. ادخل إلى لوحة تحكم مشروعك على [Vercel](https://vercel.com).
2. اذهب إلى **Settings** → **Environment Variables**.
3. أضف المتغيرين التاليين لبيئة **Production** و **Preview**:
   - `WEB3FORMS_ACCESS_KEY`: ضع مفتاح Web3Forms الخاص ببريد `sanad.erp@outlook.com`.
   - `NEXT_PUBLIC_SITE_URL`: `https://sanad-erp-two.vercel.app`
4. ارفع التعديلات إلى فرع `main` على GitHub:
   ```bash
   git add .
   git commit -m "feat: rebuild Sanad ERP landing page with dark enterprise identity"
   git push
   ```
5. سيقوم Vercel ببناء ونشر التحديث تلقائياً.
