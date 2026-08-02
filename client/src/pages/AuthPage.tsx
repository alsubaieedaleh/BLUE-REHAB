import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, LoaderCircle, LogIn, Phone, ShieldCheck } from "lucide-react";
import PageShell from "../components/PageShell";
import { supabase } from "../lib/supabase";

const normalizeSaudiPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("966")) return `+${digits}`;
  if (digits.startsWith("05")) return `+966${digits.slice(1)}`;
  if (digits.startsWith("5")) return `+966${digits}`;
  return value.trim();
};

export default function AuthPage() {
  const [phone, setPhone] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState<"phone" | "verify" | "done">("phone");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase?.auth.getSession().then(({ data }) => {
      if (data.session) setStep("done");
    });
  }, []);

  async function requestOtp(event: FormEvent) {
    event.preventDefault();
    if (!supabase) {
      setMessage("مفاتيح Supabase العامة غير مضبوطة في بيئة الواجهة.");
      return;
    }
    setBusy(true);
    setMessage("");
    const normalized = normalizeSaudiPhone(phone);
    const { error } = await supabase.auth.signInWithOtp({
      phone: normalized,
      options: { data: { account_type: "patient" } },
    });
    setBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setPhone(normalized);
    setStep("verify");
    setMessage("أرسل رمز التحقق إلى رقم الجوال عند توفر موفر الرسائل في Supabase.");
  }

  async function verifyOtp(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" });
    setBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setStep("done");
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setToken("");
    setStep("phone");
  }

  return (
    <PageShell>
      <section className="auth-page">
        <div className="container auth-grid">
          <div className="auth-copy">
            <span className="eyebrow"><ShieldCheck /> دخول آمن</span>
            <h1>سجّل الدخول برقم الجوال</h1>
            <p>يستخدم بلو ريهاب مصادقة Supabase OTP. لا تحفظ المنصة كلمة مرور، وتُنشأ الجلسة بعد التحقق من الرمز.</p>
            <div className="auth-assurance"><ShieldCheck /><span><strong>حماية الجلسة</strong><small>مفتاح الخدمة السري يبقى في الخادم فقط، وتخضع البيانات لسياسات RLS.</small></span></div>
          </div>

          <div className="auth-card">
            {step === "phone" && <form onSubmit={requestOtp}>
              <Phone />
              <h2>رقم الجوال</h2>
              <p>أدخل رقمًا سعوديًا بصيغة 05xxxxxxxx.</p>
              <label><span>رقم الجوال</span><input dir="ltr" inputMode="tel" autoComplete="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="05xxxxxxxx" /></label>
              <button className="button" disabled={busy}>{busy ? <LoaderCircle className="spin" /> : <LogIn />} إرسال رمز التحقق</button>
            </form>}

            {step === "verify" && <form onSubmit={verifyOtp}>
              <Phone />
              <h2>تحقق من الرمز</h2>
              <p>أدخل الرمز المرسل إلى <b dir="ltr">{phone}</b>.</p>
              <label><span>رمز التحقق</span><input dir="ltr" inputMode="numeric" autoComplete="one-time-code" required minLength={6} maxLength={6} value={token} onChange={(event) => setToken(event.target.value.replace(/\D/g, ""))} placeholder="000000" /></label>
              <button className="button" disabled={busy || token.length !== 6}>{busy ? <LoaderCircle className="spin" /> : <CheckCircle2 />} تأكيد الدخول</button>
              <button className="text-button" type="button" onClick={() => setStep("phone")}>تغيير الرقم</button>
            </form>}

            {step === "done" && <div className="auth-success">
              <CheckCircle2 />
              <h2>تم تسجيل الدخول</h2>
              <p>يمكنك الآن إكمال الحجز والوصول إلى البيانات المرتبطة بحسابك.</p>
              <a className="button" href="/booking">متابعة الحجز</a>
              <button className="button button-secondary" type="button" onClick={signOut}>تسجيل الخروج</button>
            </div>}

            {message && <div className="auth-message" role="status">{message}</div>}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
