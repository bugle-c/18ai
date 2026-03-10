"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SPEAKERS = [
  {
    name: "Паша Вин",
    role: "Организатор",
    topic: "Введение в нейросети и их виды",
    time: "18:30 – 18:50",
    description:
      "Базовые понятия нейросетей, какие они бывают и где уже используются в онлайн-бизнесе.",
  },
  {
    name: "Санжар Алтыбаев & Тимур Есенов",
    role: "Спикеры (лайвстрим)",
    topic: "Midjourney + ChatGPT: генерация промптов",
    time: "18:50 – 19:10",
    description:
      "Возможности Midjourney, генерация промптов через ChatGPT — лайвстрим с практикой.",
  },
  {
    name: "Филипп Воронин",
    role: "Спикер",
    topic: "ChatGPT: практический воркшоп",
    time: "19:40 – 20:20",
    description:
      "Обучение работе с ChatGPT на практических примерах. Как извлечь максимум из AI в своём бизнесе.",
  },
];

const SCHEDULE = [
  { time: "18:00", label: "Сбор гостей, welcome drinks" },
  { time: "18:20", label: "Вступительное слово, нетворкинг" },
  { time: "18:30", label: "Паша Вин — Введение в нейросети" },
  { time: "18:40", label: "Паша Вин — Виды нейросетей и применение" },
  { time: "18:50", label: "Санжар & Тимур — Midjourney + ChatGPT" },
  { time: "19:10", label: "Фуршет и общение" },
  { time: "19:40", label: "Филипп Воронин — ChatGPT воркшоп" },
  { time: "20:20", label: "Q&A и заключительное слово" },
  { time: "20:30", label: "Свободное общение" },
];

const PHOTOS = [
  { src: "/photos/03-pasha-mic-hero.jpg", alt: "Паша Вин с микрофоном на фоне AI-арта", caption: "Паша Вин — организатор конференции", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/photos/09-group-fun.jpg", alt: "Групповое фото участников — энергичное", caption: "Участники «Навстречу к AI» 🤘", span: "lg:col-span-2" },
  { src: "/photos/02-midjourney-presentation.jpg", alt: "Презентация MidJourney с аудиторией", caption: "Санжар и Тимур — MidJourney + ChatGPT", span: "" },
  { src: "/photos/04-pasha-closeup.jpg", alt: "Паша Вин крупным планом с микрофоном", caption: "Введение в нейросети", span: "" },
  { src: "/photos/11-filipp-speaking.jpg", alt: "Филипп Воронин выступает на сцене", caption: "Филипп Воронин — практикум ChatGPT", span: "" },
  { src: "/photos/07-pasha-full-stage.jpg", alt: "Паша Вин на сцене — полный вид", caption: "Площадка Калибр — сцена конференции", span: "lg:col-span-2" },
  { src: "/photos/12-filipp-audience.jpg", alt: "Филипп Воронин выступает перед аудиторией", caption: "Воркшоп по ChatGPT — зал слушает", span: "" },
  { src: "/photos/06-pasha-profile.jpg", alt: "Паша Вин — профиль", caption: "Спикер в деле", span: "" },
  { src: "/photos/01-pasha-stage-art.jpg", alt: "Паша Вин на сцене с AI-артом на экране", caption: "AI-арт и нейросети на большом экране", span: "" },
  { src: "/photos/05-pasha-speaking.jpg", alt: "Паша Вин выступает", caption: "О видах нейросетей и их применении", span: "" },
  { src: "/photos/10-group-classic.jpg", alt: "Групповое фото участников — классическое", caption: "Команда конференции", span: "lg:col-span-2" },
  { src: "/photos/08-pasha-stage-angle.jpg", alt: "Паша Вин на сцене — другой ракурс", caption: "«Навстречу к AI» — полный зал", span: "" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto = useCallback(() => setLightbox((p) => (p !== null ? (p - 1 + PHOTOS.length) % PHOTOS.length : null)), []);
  const nextPhoto = useCallback(() => setLightbox((p) => (p !== null ? (p + 1) % PHOTOS.length : null)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, prevPhoto, nextPhoto]);

  useEffect(() => {
    // Hero text animation
    const heroChars = heroRef.current?.querySelectorAll(".hero-char");
    if (heroChars) {
      gsap.fromTo(
        heroChars,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.03, ease: "power3.out" }
      );
    }

    // Reveal sections on scroll
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Mouse glow follow
    const handleMouse = (e: MouseEvent) => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX - 300,
          y: e.clientY - 300,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const titleChars = "НАВСТРЕЧУ К AI".split("");

  return (
    <main className="relative min-h-screen">
      {/* Glow */}
      <div ref={glowRef} className="hero-glow fixed top-0 left-0 z-0" />

      {/* ───── HERO ───── */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Archive badge */}
        <div className="archive-badge mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="text-sm font-medium tracking-widest uppercase text-[var(--accent)]">
            Мероприятие состоялось
          </span>
        </div>

        {/* Title */}
        <h1
          ref={heroRef}
          className="font-['Syne'] text-[clamp(2.5rem,12vw,10rem)] leading-[0.9] font-extrabold tracking-tight"
        >
          {titleChars.map((ch, i) => (
            <span key={i} className="hero-char inline-block" style={{ opacity: 0 }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-xl text-lg text-zinc-400 md:text-xl">
          Конференция по нейросетям для онлайн-бизнеса
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
          <span className="flex items-center gap-2">
            <CalendarIcon />
            18 июля 2023
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="flex items-center gap-2">
            <MapIcon />
            Площадка Калибр, Москва
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="flex items-center gap-2">
            <TicketIcon />
            Бесплатно
          </span>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-zinc-600">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-zinc-600 to-transparent" />
        </div>
      </section>

      {/* ───── MARQUEE ───── */}
      <div className="relative z-10 overflow-hidden border-y border-[var(--border)] py-4">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-['Syne'] text-2xl font-bold uppercase tracking-wider text-zinc-800"
            >
              Нейросети · Бизнес · ChatGPT · Midjourney · AI · Практика ·
            </span>
          ))}
        </div>
      </div>

      {/* ───── О МЕРОПРИЯТИИ ───── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-32">
        <div className="reveal">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            О мероприятии
          </span>
          <h2 className="mt-4 font-['Syne'] text-4xl font-bold md:text-5xl">
            Первая конференция
            <br />
            <span className="text-[var(--accent)]">по нейросетям</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Конференция «Навстречу к AI» собрала тех, кто хочет использовать
            нейросети в своём бизнесе — от генерации контента до автоматизации
            процессов. Живые выступления, воркшопы и нетворкинг на площадке
            Калибр в Москве.
          </p>
        </div>

        {/* Stats */}
        <div className="reveal mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: "3", label: "Спикера" },
            { value: "4", label: "Выступления" },
            { value: "3ч", label: "Программа" },
            { value: "∞", label: "Нетворкинг" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 text-center"
            >
              <div className="font-['Syne'] text-3xl font-bold text-[var(--accent)]">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── СПИКЕРЫ ───── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-32">
        <div className="reveal">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Спикеры
          </span>
          <h2 className="mt-4 font-['Syne'] text-4xl font-bold md:text-5xl">
            Кто выступал
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SPEAKERS.map((s, i) => (
            <div
              key={i}
              className="reveal speaker-card rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8"
            >
              <div className="mb-4 inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
                {s.time}
              </div>
              <h3 className="font-['Syne'] text-xl font-bold">{s.name}</h3>
              <p className="mt-1 text-sm text-[var(--accent)]">{s.role}</p>
              <p className="mt-2 font-medium text-zinc-300">{s.topic}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── ПРОГРАММА (Timeline) ───── */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-32">
        <div className="reveal">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Программа
          </span>
          <h2 className="mt-4 font-['Syne'] text-4xl font-bold md:text-5xl">
            Расписание
          </h2>
        </div>

        <div className="reveal mt-16 relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent" />

          <div className="space-y-6">
            {SCHEDULE.map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="relative flex-shrink-0">
                  <div className="timeline-dot h-[10px] w-[10px] rounded-full bg-[var(--accent)] mt-1.5 ml-[14px]" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="font-['Syne'] text-lg font-bold text-[var(--accent)] min-w-[60px]">
                    {item.time}
                  </span>
                  <span className="text-zinc-300">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── ДРЕСС-КОД ───── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-32">
        <div className="reveal">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Дресс-код
          </span>
          <h2 className="mt-4 font-['Syne'] text-4xl font-bold md:text-5xl">
            Фестивальный стиль
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              <h3 className="font-['Syne'] text-lg font-bold">Мужчинам</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Пиджак с рубашкой, галстук по желанию. Нарядный, но не
                официальный — фестивальный дух.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              <h3 className="font-['Syne'] text-lg font-bold">Женщинам</h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Элегантный верх с юбкой/брюками или коктейльное платье.
                Спортивный стиль — нет, sport-casual — допустим.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── ПЛОЩАДКА ───── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-32">
        <div className="reveal">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Площадка
          </span>
          <h2 className="mt-4 font-['Syne'] text-4xl font-bold md:text-5xl">
            Калибр
          </h2>
          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-zinc-300">
                  ул. Годовикова, д. 9, стр. 17, центральный подъезд
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  3 минуты от м. Алексеевская, Москва
                </p>
                <p className="mt-3 text-sm text-zinc-500">
                  Парковка: 400 ₽ (оплата по QR-коду)
                </p>
              </div>
              <a
                href="https://yandex.ru/maps/-/CDuBjU~W"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
              >
                <MapIcon />
                Открыть карту
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───── ФОТОГРАФИИ ───── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-32">
        <div className="reveal">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            Фотографии
          </span>
          <h2 className="mt-4 font-['Syne'] text-4xl font-bold md:text-5xl">
            Как это было
          </h2>
        </div>

        <div className="reveal mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[250px]">
          {PHOTOS.map((photo, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] transition-all hover:border-[var(--accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium text-white drop-shadow-lg">
                  {photo.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ───── LIGHTBOX ───── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white transition-colors hover:bg-white/10 z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white transition-colors hover:bg-white/10 z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/50 p-3 text-white transition-colors hover:bg-white/10 z-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={PHOTOS[lightbox].src}
              alt={PHOTOS[lightbox].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              priority
            />
            <p className="mt-4 text-center text-sm text-zinc-400">
              {PHOTOS[lightbox].caption}
              <span className="ml-2 text-zinc-600">{lightbox + 1} / {PHOTOS.length}</span>
            </p>
          </div>
        </div>
      )}

      {/* ───── FOOTER ───── */}
      <footer className="relative z-10 border-t border-[var(--border)] py-12 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-8 mb-12">
            <p className="font-['Syne'] text-2xl font-bold">
              Мероприятие состоялось 18 июля 2023
            </p>
            <p className="mt-2 text-zinc-500">
              Спасибо всем, кто пришёл и поддержал!
            </p>
          </div>
          <p className="text-sm text-zinc-600">
            Организатор —{" "}
            <a
              href="https://pashavin.ru"
              className="text-[var(--accent)] transition-colors hover:text-white"
            >
              Паша Вин
            </a>
          </p>
          <p className="mt-2 text-xs text-zinc-700">
            © 2023 Навстречу к AI. Все права защищены.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ───── Icons ───── */
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}
