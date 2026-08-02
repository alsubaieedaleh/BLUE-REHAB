# Blue Rehab — بلو ريهاب

منصة عربية متجاوبة لإدارة جلسات العلاج الطبيعي والخطط المنزلية، إلى جانب الدورات التأهيلية لطلاب وممارسي العلاج الطبيعي.

## التقنية

- React 19 + Vite + TypeScript، دون Next.js.
- Node.js + Express + TypeScript للتطوير المحلي.
- Netlify Functions لتشغيل الـAPI في الإنتاج.
- Supabase لقاعدة PostgreSQL والمصادقة والتخزين.
- CSS عربي مخصص، RTL، Mobile First، ودعم `prefers-reduced-motion`.

## ما تتضمنه النسخة

- صفحات رئيسية وخدمات وأخصائيين ودورات وتفاصيل دورة.
- تسجيل دخول برقم الجوال باستخدام Supabase OTP.
- حجز متعدد الخطوات يتطلب جلسة مستخدم موثقة.
- تحقق من الخدمة والمختص والموعد قبل إنشاء الحجز.
- إنشاء سجل دفع تلقائياً مع الحجز أو التسجيل في دورة.
- ملفات صحية وخطط علاجية وتمارين وسجل تنفيذ ومؤشرات ألم.
- وحدات ودروس وحضور وتقدم وشهادات وفق شروط الإكمال.
- لوحات للمصاب والطالب والأخصائي والمدرب والإدارة.
- مدفوعات واستردادات وتقييمات وإشعارات وملفات وسجل عمليات.

كل اسم أو موعد أو سعر غير معتمد موسوم صراحة بأنه توضيحي.

## التشغيل محلياً

```bash
npm install
cp .env.example .env
npm run dev
```

- React: `http://localhost:5173`
- API: `http://localhost:4000`
- صحة الخدمة: `http://localhost:4000/api/health`

قيم Supabase العامة الحالية موجودة في `.env.example` كإعداد افتراضي. يمكن استبدالها بمتغيرات البيئة عند نقل المنصة إلى مشروع Supabase آخر.

## النشر على Netlify

المشروع جاهز للنشر من جذر المستودع عبر `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `client/dist`
- Functions directory: `netlify/functions`
- Node.js: الإصدار 20

يعيد Netlify توجيه `/api/*` إلى Netlify Function، ثم يعيد باقي المسارات إلى `index.html`. لذلك تعمل مسارات React المباشرة مثل `/services` و`/courses/:slug` بعد التحديث أو فتح الرابط مباشرة.

قيم الإنتاج العامة مضبوطة في `netlify.toml`:

- `VITE_API_URL=/api`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

لا يحتاج النشر إلى `SUPABASE_SERVICE_ROLE_KEY`. الكتابات المحمية، ومنها إنشاء الحجز، تستخدم JWT الخاص بالمستخدم وسياسات Supabase RLS. هذا يمنع تخزين مفتاح إداري في Netlify أو المستودع.

بعد النشر تحقق من:

- `/services` للتأكد من عمل React Router.
- `/api/health` للتأكد من تشغيل Function.
- `/api/catalog` للتأكد من اتصال Supabase.

يجب أن يعرض `/api/health`:

```json
{
  "status": "ok",
  "service": "blue-rehab-api",
  "catalog": "supabase",
  "protectedWrites": "authenticated-rls"
}
```

## إعداد Supabase

قاعدة الإنتاج الحالية تحتوي على 33 جدولاً عاماً مع RLS، وتشمل الحجوزات والجلسات والخطط والتمارين والدورات والمدفوعات والاستردادات والإشعارات والدعم والتدقيق.

يوجد Bucketان خاصان:

- `medical-files`
- `course-materials`

يلزم ضبط موفر SMS في Supabase Auth قبل استخدام OTP فعلياً.

## التحقق

```bash
npm run lint
npm run build
```

يشغّل GitHub Actions الأمرين آلياً لكل Pull Request ولكل Push إلى `main`، ويتضمن الفحص ملفات Netlify Functions.

## حدود التشغيل الحالية

- يلزم اختيار بوابة الدفع وتطبيق Checkout وWebhook موثق.
- يلزم اعتماد مزود الاجتماعات المرئية.
