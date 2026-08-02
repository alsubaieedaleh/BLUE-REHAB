import { Activity, ArrowLeft, BookOpenCheck, CalendarCheck2, CheckCircle2, ClipboardCheck, FileLock2, HeartPulse, ListChecks, MonitorPlay, ShieldCheck, Stethoscope, UserRoundSearch } from "lucide-react";
import { CatalogSummary, HomeCatalog } from "../components/CatalogSections";
import PageShell from "../components/PageShell";

const careSteps = [
  { icon: UserRoundSearch, title: "طلب وتقييم أولي", text: "اختر نوع الجلسة وطريقتها، ثم قدّم المعلومات اللازمة فقط لتوجيه الطلب." },
  { icon: ClipboardCheck, title: "توثيق الخطة", text: "يسجل الأخصائي ملخص التقييم والأهداف والتدخلات والاحتياطات ومواعيد المراجعة." },
  { icon: Activity, title: "متابعة قابلة للقياس", text: "يعرض المستفيد تمارين اليوم ويسجل الإنجاز والألم والملاحظات ليراجعها الأخصائي." },
];

const safeguards = [
  "فصل الملف الصحي عن ملف التدريب والصلاحيات العامة.",
  "تسجيل الوصول والتعديلات الحساسة في سجل العمليات.",
  "ملفات طبية ومواد تدريبية في مساحات تخزين خاصة.",
  "عدم حفظ بيانات البطاقات داخل المنصة.",
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><HeartPulse /> العلاج الطبيعي والتأهيل المهني</span>
            <h1>رعاية منظمة للحركة، وتعلّم مهني مبني على الممارسة.</h1>
            <p>تجمع بلو ريهاب بين حجز جلسات العلاج الطبيعي ومتابعة الخطة المنزلية، وبين برامج تأهيلية منظمة لطلاب وممارسي العلاج الطبيعي.</p>
            <div className="hero-actions">
              <a className="button" href="/booking"><CalendarCheck2 /> ابدأ مسار الحجز</a>
              <a className="button button-secondary" href="/courses"><BookOpenCheck /> استعرض الدورات</a>
            </div>
            <div className="hero-facts">
              <span><CheckCircle2 /> حضورياً أو عن بُعد</span>
              <span><CheckCircle2 /> خطة وتمارين موثقة</span>
              <span><CheckCircle2 /> تجربة عربية متجاوبة</span>
            </div>
            <CatalogSummary />
          </div>
          <div className="hero-product" aria-label="معاينة توضيحية للوحة المتابعة">
            <div className="product-window">
              <div className="window-bar"><span /><span /><span /><small>لوحة المتابعة — عرض توضيحي</small></div>
              <div className="window-content">
                <div className="next-session"><span><CalendarCheck2 /></span><div><small>الخطوة التالية</small><strong>مراجعة الخطة مع الأخصائي</strong><p>يظهر الموعد الفعلي بعد تأكيد الحجز.</p></div></div>
                <div className="progress-panel"><div><small>التزام التمارين</small><strong>4 من 5</strong></div><div className="progress-track"><i style={{ width: "80%" }} /></div><p>مثال واجهة، وليس سجل مريض حقيقياً.</p></div>
                <div className="task-list"><span><i><CheckCircle2 /></i> تمارين الحركة</span><span><i><CheckCircle2 /></i> تسجيل شدة الألم</span><span><i className="pending"><ListChecks /></i> ملاحظة اليوم</span></div>
              </div>
            </div>
            <div className="floating-card secure"><FileLock2 /><span><strong>ملفات خاصة</strong><small>الوصول بحسب الدور والحالة</small></span></div>
            <div className="floating-card follow"><Activity /><span><strong>متابعة منظمة</strong><small>تاريخ واضح لكل إدخال</small></span></div>
          </div>
        </div>
      </section>

      <section className="quick-paths">
        <div className="container paths-grid">
          <a className="path-card care" href="/services"><span><Stethoscope /></span><div><small>للمصاب والمريض</small><h2>جلسات وخطة علاجية</h2><p>تعرف على أنواع الجلسات، وما يسبق الموعد وما يتبعه.</p></div><ArrowLeft /></a>
          <a className="path-card learn" href="/courses"><span><MonitorPlay /></span><div><small>للطالب والممارس</small><h2>دورات ومتابعة تعلم</h2><p>أهداف ومحاور ومتطلبات وتقدم وشهادات وفق شروط معلنة.</p></div><ArrowLeft /></a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section-heading centered"><span className="kicker">مسار الرعاية</span><h2>كل خطوة لها غرض واضح وسجل يمكن الرجوع إليه</h2><p>صممت الرحلة لتقليل التشتت مع الحفاظ على البيانات الضرورية للسلامة والمتابعة.</p></header>
          <div className="process-grid">{careSteps.map((step, index) => <article key={step.title}><span className="step-index">0{index + 1}</span><i><step.icon /></i><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
          <div className="section-action"><a className="text-link" href="/services">اقرأ تفاصيل الجلسات وحدود الخدمة <ArrowLeft /></a></div>
        </div>
      </section>

      <section className="section surface-section">
        <div className="container">
          <header className="section-heading split-heading"><div><span className="kicker">الدورات التأهيلية</span><h2>محتوى محدد النتائج، لا عناوين فضفاضة</h2><p>كل دورة تعرض ما ستتعلمه، المتطلبات السابقة، طريقة الحضور، وآلية الإكمال قبل التسجيل.</p></div><a className="button button-secondary" href="/courses">جميع الدورات <ArrowLeft /></a></header>
          <HomeCatalog />
        </div>
      </section>

      <section className="section security-section">
        <div className="container security-grid">
          <div>
            <span className="kicker light">الخصوصية من أصل التصميم</span>
            <h2>البيانات الصحية لا تعامل كمحتوى عادي</h2>
            <p>صُممت قاعدة البيانات بسياسات وصول على مستوى الصف، مع فصل أنواع الملفات وتقييد العمليات الحساسة.</p>
            <a className="button button-light" href="/privacy">اقرأ سياسة الخصوصية</a>
          </div>
          <div className="safeguard-list">{safeguards.map((item) => <span key={item}><ShieldCheck /> {item}</span>)}</div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container final-cta-box">
          <div><span className="kicker">اختبر الرحلة كاملة</span><h2>ابدأ بالحجز أو افتح لوحة الدور المناسب</h2><p>توضح النسخة التشغيلية مسارات المصاب والطالب والأخصائي والمدرب والإدارة ببيانات تجريبية موسومة.</p></div>
          <div><a className="button" href="/booking">تجربة الحجز</a><a className="button button-secondary" href="/portal">فتح لوحات الأدوار</a></div>
        </div>
      </section>
    </PageShell>
  );
}

