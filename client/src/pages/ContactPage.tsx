import { Clock3, FileLock2, LifeBuoy } from "lucide-react";
import ContactForm from "../components/ContactForm";
import PageShell from "../components/PageShell";


export default function ContactPage() {
  return <PageShell><section className="page-hero compact-hero"><div className="container narrow"><span className="eyebrow"><LifeBuoy /> الدعم والتواصل</span><h1>صف المشكلة دون إرسال بيانات صحية عبر قناة عامة</h1><p>قنوات الاتصال الرسمية لم تعتمد بعد. النموذج أدناه لا يرسل أو يخزن أي بيانات في هذه النسخة.</p></div></section><section className="section"><div className="container contact-grid"><div><ContactForm /></div><aside><section><FileLock2 /><h2>ما الذي لا ترسله هنا؟</h2><p>التقارير الطبية، صور الأشعة، أرقام الهوية، بيانات البطاقة أو أي ملف يتضمن معلومات صحية شخصية.</p></section><section><Clock3 /><h2>زمن الاستجابة</h2><p>ينشر زمن الاستجابة وقنوات التصعيد بعد اعتماد فريق الدعم وساعات العمل الرسمية.</p></section></aside></div></section></PageShell>;
}



