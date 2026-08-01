"use client";

import { HeartPulse, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="بلو ريهاب — الرئيسية">
      <span className="brand-mark" aria-hidden="true"><HeartPulse /></span>
      <span className="brand-copy">
        <strong>بلو <b>ريهاب</b></strong>
        <small>علاج طبيعي وتأهيل مهني</small>
      </span>
    </a>
  );
}

const links = [
  ["الخدمات", "/services"],
  ["الأخصائيون", "/specialists"],
  ["الدورات", "/courses"],
  ["عن المنصة", "/about"],
  ["الأسئلة الشائعة", "/faq"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="environment-bar">
        <div className="container">
          <span>نسخة تشغيلية تجريبية</span>
          <p>بيانات مقدمي الخدمة والأسعار والمواعيد الحالية نماذج واضحة وليست عروضاً تجارية معتمدة.</p>
        </div>
      </div>
      <header className="site-header">
        <nav className="container nav" aria-label="التنقل الرئيسي">
          <Brand />
          <div className={`nav-links ${open ? "is-open" : ""}`}>
            {links.map(([label, href]) => (
              <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </div>
          <div className="nav-actions">
            <a className="nav-portal" href="/portal"><LayoutDashboard /> لوحة التجربة</a>
            <a className="button button-small" href="/booking">ابدأ الحجز</a>
            <button
              className="menu-button"
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            >{open ? <X /> : <Menu />}</button>
          </div>
        </nav>
      </header>
    </>
  );
}

