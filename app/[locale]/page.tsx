import Image from "next/image";
import Link from "../../components/locale-link";
import FeaturedProducts from "../../components/featured-products";
import CategoryMosaic from "../../components/category-mosaic";
import { I18nText } from "../../components/i18n-provider";
import menu from "../../data/menu.json";

const featured = menu.products.filter((p) => p.disponible && typeof p.prix === "number").slice(0, 6);

export default function HomePage() {
  return (
    <main>
      <section className="hero relative min-h-[78vh] overflow-hidden text-[color:var(--header-text)]">
        <div className="hero-orbit hero-orbit-a" />
        <div className="hero-orbit hero-orbit-b" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-between px-5 pb-8 pt-10 sm:px-8 lg:px-12">
          <div className="max-w-4xl fade-up">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[.42em] text-[#d4b273]">
              <I18nText fr="LA SHISH • Abidjan" en="LA SHISH • Abidjan" ar="LA SHISH • أبيدجان" />
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[.94] tracking-[-.05em] sm:text-7xl lg:text-8xl">
              <I18nText fr="L’expérience" en="The Shish" ar="تجربة" />
              <span className="block text-[#e2c17e]">
                <I18nText fr="Shish commence ici." en="experience starts here." ar="Shish تبدأ من هنا." />
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              <I18nText
                fr="Un menu digital pensé comme une vraie expérience de maison : précis, gourmand, rapide et élégant."
                en="A digital menu designed like a true house experience: precise, delicious, fast and elegant."
                ar="قائمة رقمية مصممة كتجربة ضيافة حقيقية: دقيقة وشهية وسريعة وأنيقة."
              />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="rounded-full bg-[#d4b273] px-6 py-3 text-sm font-black text-[#11100e] transition hover:-translate-y-0.5 hover:bg-white">
                <I18nText fr="Découvrir le menu" en="Explore the menu" ar="اكتشف القائمة" />
              </Link>
              <Link href="/reserver" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold backdrop-blur transition hover:border-[#d4b273] hover:text-[#d4b273]">
                <I18nText fr="Réserver une table" en="Reserve a table" ar="احجز طاولة" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-5 pt-8">
            <div className="flex items-center gap-8 sm:gap-10">
              <div className="float-in brand-signature">
                <div className="brand-logo-shell rounded-full p-2">
                  <Image src="/logo.webp" alt="LA SHISH" width={180} height={180} priority unoptimized className="h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24" />
                </div>
              </div>
              <Link href="/menu" className="discover-chip discover-chip-hero group ms-4 mt-3 inline-flex translate-y-1 items-center gap-2 rounded-full border border-[#d4b273]/45 bg-[#d4b273]/10 px-4 py-3 text-[10px] font-black uppercase tracking-[.18em] text-[#e2c17e]">
                <span className="discover-dot" />
                <I18nText fr="Découvrir" en="Explore" ar="اكتشف" />
              </Link>
            </div>
            <p className="max-w-sm text-right text-sm leading-6 text-white/50">
              <I18nText fr="Découvrez toutes les catégories et 253 créations. Votre prochaine commande préférée est peut-être déjà ici." en="Explore every category and 253 creations. Your next favorite order may already be here." ar="اكتشف كل الفئات و٢٥٣ إبداعاً. قد يكون طلبك المفضل القادم هنا." />
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow"><I18nText fr="La carte" en="The menu" ar="القائمة" /></p>
              <h2 className="section-title"><I18nText fr="Toutes les catégories." en="Every category." ar="كل الفئات." /></h2>
            </div>
            <Link href="/menu" className="font-bold text-[color:var(--gold)]">
              <I18nText fr="Voir les 253 produits →" en="See all 253 products →" ar="عرض جميع المنتجات الـ ٢٥٣ →" />
            </Link>
          </div>
          <CategoryMosaic />
        </div>
      </section>

      <section className="dark-section px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow eyebrow-gold"><I18nText fr="À goûter" en="Must-try" ar="جرّبها" /></p>
              <h2 className="section-title text-white"><I18nText fr="Nos favoris du moment" en="Our favorites right now" ar="مفضلاتنا الآن" /></h2>
            </div>
            <Link href="/menu" className="hidden font-bold text-[#d4b273] sm:block">
              <I18nText fr="Tout le menu →" en="Full menu →" ar="القائمة كاملة →" />
            </Link>
          </div>
          <FeaturedProducts products={featured} />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="accent-card rounded-[2rem] p-8 sm:p-12">
            <p className="eyebrow"><I18nText fr="Plus qu’un menu" en="More than a menu" ar="أكثر من مجرد قائمة" /></p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
              <I18nText fr="Commandez, réservez, retrouvez vos favoris." en="Order, reserve, and keep your favorites." ar="اطلب واحجز واحتفظ بمفضلاتك." />
            </h2>
            <p className="mt-5 max-w-xl leading-7 opacity-70">
              <I18nText fr="Une seule expérience pour le menu, la commande, le compte client, la fidélité et la réservation." en="One experience for the menu, ordering, customer account, loyalty and reservations." ar="تجربة واحدة تجمع القائمة والطلب وحساب العميل وبرنامج الولاء والحجز." />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/commande" className="rounded-full bg-[#11100e] px-6 py-3 text-sm font-black text-white">
                <I18nText fr="Commander" en="Order" ar="اطلب الآن" />
              </Link>
              <Link href="/contact" className="rounded-full border border-black/15 px-6 py-3 text-sm font-bold">
                <I18nText fr="Nous trouver" en="Find us" ar="موقعنا" />
              </Link>
            </div>
          </div>
          <div className="surface-card rounded-[2rem] p-8 sm:p-12">
            <p className="eyebrow"><I18nText fr="Bon à savoir" en="Good to know" ar="معلومات مهمة" /></p>
            <div className="mt-7 grid gap-4 text-sm font-semibold">
              <div>✓ <I18nText fr="Mobile-first et ultra rapide" en="Mobile-first and ultra fast" ar="مصممة للهاتف وسريعة جداً" /></div>
              <div>✓ <I18nText fr="PWA installable" en="Installable PWA" ar="تطبيق PWA قابل للتثبيت" /></div>
              <div>✓ <I18nText fr="253 produits déjà récupérés" en="253 products imported" ar="تم استيراد ٢٥٣ منتجاً" /></div>
              <div>✓ <I18nText fr="Compte client + fidélité" en="Customer account + loyalty" ar="حساب العميل + الولاء" /></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}