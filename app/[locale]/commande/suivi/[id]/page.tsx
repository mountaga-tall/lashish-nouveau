"use client";

import { useEffect, useState } from "react";
import { useI18n } from "../../../../../components/i18n-provider";

const keys: Record<string, string> = {
  received: "status.received",
  preparing: "status.preparing",
  ready: "status.ready",
  delivering: "status.delivering",
  completed: "status.completed",
  cancelled: "status.cancelled",
};

const stages = ["received", "preparing", "ready", "delivering", "completed"];

export default function TrackingPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { t, money } = useI18n();
  const [id, setId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 8000);

    params.then(({ id: orderId }) => {
      if (!active) return;
      setId(orderId);

      return fetch("/api/orders/" + encodeURIComponent(orderId), {
        signal: controller.signal,
        cache: "no-store",
      })
        .then(async (response) => {
          const payload = await response.json().catch(() => null);
          if (!response.ok) throw new Error(payload?.error || t("tracking.error"));
          if (active) setOrder(payload);
        })
        .catch((error) => {
          if (active) {
            setOrder({
              error:
                error instanceof DOMException && error.name === "AbortError"
                  ? t("tracking.timeout")
                  : error instanceof Error
                    ? error.message
                    : t("tracking.error"),
            });
          }
        })
        .finally(() => {
          if (active) {
            window.clearTimeout(timer);
            setLoading(false);
          }
        });
    }).catch(() => {
      if (active) {
        setOrder({ error: t("tracking.error") });
        setLoading(false);
      }
    });

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [params, t]);

  const current = String(order?.order?.status || "received");
  const stageIndex = Math.max(0, stages.indexOf(current));
  const cancelled = current === "cancelled";

  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]">{t("tracking.label")}</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">{t("tracking.order")} {id}</h1>

        {loading ? (
          <div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-12" aria-live="polite">
            <p className="text-white/55">{t("tracking.loading")}</p>
          </div>
        ) : order?.error ? (
          <p className="mt-8 rounded-2xl bg-red-50 px-5 py-4 text-red-700" role="alert">{order.error}</p>
        ) : (
          <div className="mt-10 rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-12">
            <p className="text-white/45">{t("tracking.status")}</p>
            <p className={"mt-2 text-3xl font-black " + (cancelled ? "text-red-300" : "text-[#d4b273]")}>
              {t(keys[current] || "status.received")}
            </p>
            <p className="mt-4 text-sm text-white/50">{t("tracking.total")} {money(Number(order?.order?.total ?? 0))}</p>

            {cancelled ? (
              <div className="mt-8 rounded-2xl border border-red-300/20 bg-red-300/10 p-5 text-sm text-red-100">
                {t(keys.cancelled)}
              </div>
            ) : (
              <div className="mt-8">
                <div className="mb-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#d4b273] transition-all duration-700" style={{ width: ((stageIndex + 1) / stages.length) * 100 + "%" }} />
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {stages.map((key, index) => (
                    <div
                      key={key}
                      className={"rounded-2xl border p-4 text-xs font-bold " + (index <= stageIndex ? "border-[#d4b273] bg-[#d4b273]/10 text-[#d4b273]" : "border-white/10 text-white/35")}
                    >
                      {t(keys[key])}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
