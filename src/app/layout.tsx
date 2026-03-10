import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Навстречу к AI — Конференция по нейросетям | 18 июля 2023",
  description:
    "Архив конференции «Навстречу к AI» — нейросети для онлайн-бизнеса. Спикеры, программа, фото. Площадка Калибр, Москва.",
  openGraph: {
    title: "Навстречу к AI — Конференция по нейросетям",
    description:
      "Архив конференции по нейросетям для онлайн-бизнеса. 18 июля 2023, Москва.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
