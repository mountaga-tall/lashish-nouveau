"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./i18n-provider";

type Review = {
  rating: number;
  text: string;
  relativeTime: string;
  author: { name: string; uri: string; photoUri: string };
  googleMapsUri: string;
};

type ReviewsResponse = {
  configured: boolean;
  placeName: string;
  rating: number | null;
  reviewCount: number | null;
  googleMapsUri: string;
  writeReviewUri: string;
  reviews: Review[];
};

const copy = {
  fr: {
    eyebrow: "Preuve sociale",
    title: "Ils en parlent mieux que nous.",
    description: "Des avis Google récents, directement liés à la fiche officielle de LA SHISH.",
    google: "Google",
    reviews: "avis",
    view: "Voir tous les avis",
    write: "Laisser un avis",
    loading: "Chargement des avis…",
    unavailable: "Les avis Google seront affichés ici dès que l’accès sécurisé à Google Places sera activé.",
    attribution: "Avis publiés sur Google Maps.",
  },
  en: {
    eyebrow: "Social proof",
    title: "They say it better than we do.",
    description: "Recent Google reviews, connected directly to LA SHISH’s official listing.",
    google: "Google",
    reviews: "reviews",
    view: "See all reviews",
    write: "Leave a review",
    loading: "Loading reviews…",
    unavailable: "Google reviews will appear here as soon as secure Google Places access is enabled.",
    attribution: "Reviews published on Google Maps.",
  },
  ar: {
    eyebrow: "آراء العملاء",
    title: "هم أقدر على وصف التجربة.",
    description: "آراء حديثة من Google مرتبطة مباشرة بالصفحة الرسمية لـ LA SHISH.",
    google: "Google",
    reviews: "مراجعة",
    view: "عرض كل الآراء",
    write: "اترك تقييماً",
    loading: "جارٍ تحميل الآراء…",
    unavailable: "ستظهر آراء Google هنا بعد تفعيل الوصول الآمن إلى Google Places.",
    attribution: "آراء منشورة على Google Maps.",
  },
} as const;

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={value.toFixed(1) + " / 5"}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} aria-hidden="true" className={n <= Math.round(value) ? "text-[#d4b273]" : "text-white/20"}>
          ★
        </span>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[.055] p-5 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#d4b273]/40 hover:bg-white/[.08]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {review.author.photoUri ? (
            <img
              src={review.author.photoUri}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-white/10"
            />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4b273]/15 text-sm font-black text-[#e2c17e]">
              {review.author.name.slice(0, 1).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <a href={review.author.uri} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-black text-white hover:text-[#e2c17e]">
              {review.author.name}
            </a>
            <p className="mt-0.5 text-[11px] text-white/40">{review.relativeTime}</p>
          </div>
        </div>
        <Stars value={review.rating} />
      </div>
      <p className="mt-5 line-clamp-5 flex-1 text-sm leading-7 text-white/70">{review.text}</p>
      <a href={review.googleMapsUri} target="_blank" rel="noopener noreferrer" className="mt-5 text-[11px] font-black uppercase tracking-[.18em] text-[#d4b273]">
        Google Maps ↗
      </a>
    </article>
  );
}

export default function GoogleReviews() {
  const { locale } = useI18n();
  const t = copy[locale];
  const [data, setData] = useState<ReviewsResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews?locale=" + encodeURIComponent(locale), {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => response.json() as Promise<ReviewsResponse>)
      .then((next) => {
        if (!controller.signal.aborted) setData(next);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [locale]);

  return (
    <section className="reviews-section relative overflow-hidden bg-[#11100e] px-5 py-20 text-white sm:px-8 lg:px-12" aria-labelledby="google-reviews-title">
      <div className="reviews-orb reviews-orb-a" />
      <div className="reviews-orb reviews-orb-b" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 id="google-reviews-title" className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">{t.title}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">{t.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {data?.rating ? (
              <div className="rounded-2xl border border-white/10 bg-white/[.055] px-4 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm font-black">
                  <Stars value={data.rating} />
                  <span>{data.rating.toFixed(1)}</span>
                </div>
                <p className="mt-1 text-[11px] text-white/40">{data.reviewCount?.toLocaleString(locale === "ar" ? "ar-CI" : locale === "en" ? "en-US" : "fr-FR")} {t.reviews}</p>
              </div>
            ) : null}
            <a href={data?.writeReviewUri} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#d4b273] px-5 py-3 text-xs font-black uppercase tracking-[.12em] text-[#11100e] transition hover:-translate-y-0.5 hover:bg-white">
              {t.write}
            </a>
          </div>
        </div>

        {!data ? (
          <div className="mt-10 grid gap-4 md:grid-cols-3" aria-busy="true">
            {[0, 1, 2].map((item) => <div key={item} className="h-56 animate-pulse rounded-[1.75rem] border border-white/10 bg-white/[.04]" />)}
          </div>
        ) : data.reviews.length ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.reviews.map((review, index) => <ReviewCard key={review.author.uri + review.relativeTime + index} review={review} />)}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[.055] p-8 text-sm leading-7 text-white/55">
            {t.unavailable}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-white/35">
          <span>{t.attribution}</span>
          <a href={data?.googleMapsUri} target="_blank" rel="noopener noreferrer" className="font-black text-[#d4b273] hover:text-white">
            {t.view} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
