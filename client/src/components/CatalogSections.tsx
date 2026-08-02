"use client";

import { ArrowLeft, BookOpen, Clock3, Languages, MapPin, Monitor, ShieldCheck, UserRoundCheck, Video } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../lib/api";
import type { CatalogResponse, Course, Specialist } from "../lib/catalog-types";
import { courseModeLabel, formatCurrency, formatDate } from "../lib/format";
import DemoBadge from "./DemoBadge";

export function useCatalog() {
  const [data, setData] = useState<CatalogResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(apiUrl("/catalog"), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("catalog unavailable");
        return response.json() as Promise<CatalogResponse>;
      })
      .then(setData)
      .catch((reason) => {
        if (reason?.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, []);

  return { data, error };
}

function LoadingCards() {
  return <div className="card-grid" aria-label="جار تحميل البيانات">{[1, 2, 3].map((item) => <div className="skeleton-card" key={item}><i /><i /><i /></div>)}</div>;
}

function CatalogError() {
  return <div className="catalog-message"><strong>تعذر تحميل البيانات اللحظية.</strong><p>المحتوى محفوظ في Supabase، ويمكن إعادة المحاولة بعد قليل.</p></div>;
}

export function SpecialistCard({ specialist }: { specialist: Specialist }) {
  const initials = specialist.name.replace("ملف تجريبي — ", "").split(" ").map((part) => part[0]).join("").slice(0, 2);
  return (
    <article className="profile-card">
      <div className="profile-head">
        <span className="profile-avatar" aria-hidden="true">{initials}</span>
        {specialist.isDemo ? <DemoBadge compact /> : <span className="verified-badge"><ShieldCheck /> ملف موثق</span>}
      </div>
      <div className="profile-body">
        <p className="overline">{specialist.title}</p>
        <h3>{specialist.name}</h3>
        <p>{specialist.bio}</p>
        <div className="chip-row">{specialist.specialties.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="profile-meta"><Languages /> {specialist.languages.join("، ")}</div>
        <a className="card-link" href={`/booking?specialist=${specialist.id}`}>عرض المواعيد <ArrowLeft /></a>
      </div>
    </article>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="course-card">
      <div className={`course-cover course-${course.mode}`}>
        <span><BookOpen /></span>
        <small>{courseModeLabel(course.mode)}</small>
      </div>
      <div className="course-body">
        <div className="course-labels"><span>{course.level}</span>{course.isDemo && <DemoBadge compact />}</div>
        <h3>{course.title}</h3>
        <p>{course.summary}</p>
        <div className="course-facts">
          <span><Clock3 /> {course.durationHours} ساعة</span>
          <span><Languages /> {course.language}</span>
        </div>
        <div className="course-date">{course.isDemo ? "موعد توضيحي: " : "تاريخ البدء: "}{formatDate(course.startsAt)}</div>
        <div className="course-footer">
          <div><small>{course.isDemo ? "سعر توضيحي" : "السعر"}</small><strong>{formatCurrency(course.price)}</strong></div>
          <a href={`/courses/${course.slug}`}>التفاصيل <ArrowLeft /></a>
        </div>
      </div>
    </article>
  );
}

export function HomeCatalog() {
  const { data, error } = useCatalog();
  if (error) return <CatalogError />;
  if (!data) return <LoadingCards />;

  return (
    <>
      <div className="card-grid">{data.courses.slice(0, 3).map((course) => <CourseCard course={course} key={course.id} />)}</div>
      <div className="data-source-note"><ShieldCheck /> {data.source === "supabase" ? "القائمة مقروءة مباشرة من قاعدة Supabase" : "بيانات العرض المحلية مستخدمة لأن بيئة المعاينة لا تمرر متغيرات الاتصال"}؛ العناصر التجريبية موسومة ولا تُعرض كتسجيلات فعلية.</div>
    </>
  );
}

export function SpecialistsCatalog() {
  const { data, error } = useCatalog();
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("الكل");
  const specialties = useMemo(() => ["الكل", ...new Set(data?.specialists.flatMap((item) => item.specialties) ?? [])], [data]);
  const filtered = useMemo(() => data?.specialists.filter((item) => {
    const matchesText = `${item.name} ${item.title} ${item.specialties.join(" ")}`.includes(query.trim());
    const matchesSpecialty = specialty === "الكل" || item.specialties.includes(specialty);
    return matchesText && matchesSpecialty;
  }) ?? [], [data, query, specialty]);

  return (
    <>
      <div className="filters" aria-label="تصفية المختصين">
        <label><span>بحث</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="التخصص أو نوع التأهيل" /></label>
        <label><span>التخصص</span><select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>{specialties.map((item) => <option key={item}>{item}</option>)}</select></label>
        <div className="filter-context"><UserRoundCheck /><span><strong>قاعدة النشر</strong>لا يظهر وسم «موثق» إلا بعد اعتماد المؤهلات.</span></div>
      </div>
      {error ? <CatalogError /> : !data ? <LoadingCards /> : filtered.length ? <div className="card-grid">{filtered.map((item) => <SpecialistCard specialist={item} key={item.id} />)}</div> : <div className="catalog-message"><strong>لا توجد نتائج مطابقة.</strong><p>غيّر عبارة البحث أو التخصص.</p></div>}
    </>
  );
}

export function CoursesCatalog() {
  const { data, error } = useCatalog();
  const [mode, setMode] = useState("all");
  const [level, setLevel] = useState("all");
  const filtered = data?.courses.filter((course) => (mode === "all" || course.mode === mode) && (level === "all" || course.level === level)) ?? [];

  return (
    <>
      <div className="filters compact-filters" aria-label="تصفية الدورات">
        <label><span>طريقة الحضور</span><select value={mode} onChange={(event) => setMode(event.target.value)}><option value="all">جميع الأنماط</option><option value="onsite">حضوري</option><option value="remote">عن بُعد</option><option value="recorded">مسجل</option><option value="hybrid">هجين</option></select></label>
        <label><span>المستوى</span><select value={level} onChange={(event) => setLevel(event.target.value)}><option value="all">جميع المستويات</option><option value="مبتدئ">مبتدئ</option><option value="متوسط">متوسط</option><option value="متقدم">متقدم</option></select></label>
        <div className="filter-context"><MapPin /><span><strong>قبل التسجيل</strong>تظهر طريقة الحضور والمتطلبات وشروط الشهادة بوضوح.</span></div>
      </div>
      {error ? <CatalogError /> : !data ? <LoadingCards /> : filtered.length ? <div className="card-grid">{filtered.map((course) => <CourseCard course={course} key={course.id} />)}</div> : <div className="catalog-message"><strong>لا توجد دورات مطابقة.</strong><p>جرّب نمط حضور أو مستوى مختلفاً.</p></div>}
    </>
  );
}

export function CatalogSummary() {
  const { data } = useCatalog();
  if (!data) return null;
  return <span className="live-source"><Video /> {data.services.length} نماذج خدمات و{data.courses.length} نماذج دورات {data.source === "supabase" ? "متصلة بقاعدة البيانات" : "جاهزة لاختبار الواجهة"}</span>;
}

export function ServicesCatalog() {
  const { data, error } = useCatalog();
  if (error) return <CatalogError />;
  if (!data) return <LoadingCards />;

  return (
    <div className="service-catalog">
      {data.services.map((service) => (
        <article key={service.id}>
          <div className="service-title"><span><Monitor /></span><div><h3>{service.name}</h3>{service.isDemo && <DemoBadge compact />}</div></div>
          <p>{service.description}</p>
          <div className="service-details">
            <span><Clock3 /> {service.durationMinutes} دقيقة</span>
            <span>{service.modes.map((mode) => mode === "remote" ? "عن بُعد" : "في المركز").join(" أو ")}</span>
          </div>
          <div className="service-price"><small>{service.isDemo ? "سعر توضيحي" : "السعر"}</small><strong>{formatCurrency(service.price)}</strong></div>
          <a className="card-link" href={`/booking?service=${service.id}`}>اختيار الخدمة <ArrowLeft /></a>
        </article>
      ))}
    </div>
  );
}
