# Blue Rehab — بلو ريهاب

منصة عربية متجاوبة لإدارة جلسات العلاج الطبيعي والخطط المنزلية، إلى جانب الدورات التأهيلية لطلاب وممارسي العلاج الطبيعي.

النسخة المنشورة: [blue-rehab.dalh072.chatgpt.site](https://blue-rehab.dalh072.chatgpt.site)

## التقنية

- React 19 + Vite + TypeScript، دون Next.js.
- Node.js + Express + TypeScript للخدمات الخلفية.
- Supabase لقاعدة PostgreSQL والمصادقة والتخزين.
- CSS عربي مخصص، RTL، Mobile First، ودعم `prefers-reduced-motion`.

## ما تتضمنه النسخة

- صفحات رئيسية وخدمات وأخصائيين ودورات وتفاصيل دورة.
- تسجيل دخول برقم الجوال باستخدام Supabase OTP.
- حجز متعدد الخطوات متصل بخادم Node.js ويتطلب جلسة مستخدم موثقة.
- تحقق خادمي من الخدمة والمختص والموعد والسعر قبل إنشاء الحجز.
- إنشاء سجل دفع تلقائياً مع الحجز أو التسجيل في دورة.
- ملفات صحية وخطط علاجية وتمارين وسجل تنفيذ ومؤشرات ألم.
- وحدات ودروس وحضور وتقدم وشهادات وفق شروط الإكمال.
- لوحات للمصاب والطالب والأخصائي والمدرب والإدارة.
- مدفوعات واستردادات وتقييمات وإشعارات وملفات وسجل عمليات.
- صفحات خصوصية وشروط وإلغاء واسترداد وأسئلة شائعة وتواصل.

كل اسم أو موعد أو سعر غير معتمد موسوم صراحة بأنه توضيحي. لا تعرض الواجهة أرقام استخدام أو تقييمات أو مقدمي خدمة بوصفهم حقيقيين دون مصدر واعتماد.

## التشغيل محلياً

```bash
npm install
cp .env.example .env
npm run dev
```

- React: `http://localhost:5173`
- API: `http://localhost:4000`
- صحة الخدمة: `http://localhost:4000/api/health`

## متغيرات البيئة

```dotenv
VITE_API_URL=http://localhost:4000/api
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY

PORT=4000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

لا تضع `SUPABASE_SERVICE_ROLE_KEY` في React أو في أي متغير يبدأ بـ`VITE_`.

## النشر على Netlify

يحتوي المشروع على `netlify.toml` جاهز للنشر من جذر المستودع:

- Build command: `npm run build`
- Publish directory: `client/dist`
- Functions directory: `netlify/functions`
- Node.js: الإصدار 20

يعيد Netlify توجيه `/api/*` إلى Netlify Function، ثم يعيد باقي المسارات إلى `index.html` حتى تعمل مسارات React المباشرة مثل `/services` و`/courses/:slug` بعد التحديث أو فتح الرابط مباشرة.

أضف متغيرات البيئة التالية من **Netlify → Project configuration → Environment variables**:

```dotenv
VITE_API_URL=/api
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY

CLIENT_URL=https://YOUR_SITE.netlify.app
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

بعد النشر تحقق من:

- `/services` للتأكد من عمل React Router.
- `/api/health` للتأكد من تشغيل Function.
- `/api/catalog` للتأكد من اتصال Supabase.

يجب أن يعرض `/api/health` القيمة `protectedWrites: "configured"`. ظهور `disabled` يعني أن `SUPABASE_SERVICE_ROLE_KEY` غير مضبوط في بيئة Netlify.

## إعداد Supabase

نفذ ملفات `supabase/migrations` بالترتيب على مشروع جديد. قاعدة الإنتاج الحالية تحتوي على 33 جدولاً عاماً مع RLS، وتشمل الحجوزات والجلسات والخطط والتمارين والدورات والمدفوعات والاستردادات والإشعارات والدعم والتدقيق.

يوجد Bucketان خاصان:

- `medical-files`
- `course-materials`

يلزم ضبط موفر SMS في Supabase Auth قبل استخدام OTP فعلياً.

## التحقق

```bash
npm run lint
npm run build
```

يشغّل GitHub Actions الأمرين آلياً لكل Pull Request ولكل Push إلى `main`. ويتضمن الفحص الآن ملفات Netlify Functions أيضاً.

## حدود التشغيل الحالية

- يلزم اختيار بوابة الدفع وتطبيق Checkout وWebhook موثق.
- يلزم اعتماد مزود الاجتماعات المرئية.
