import Image from "next/image";
import Link from "../../components/locale-link";
import { slugify, imageUrl } from "../../lib/catalog";
import FeaturedProducts from "../../components/featured-products";
import { I18nText } from "../../components/i18n-provider";
import { menuLabel } from "../../lib/menu-localization";
import menu from "../../data/menu.json";

const featured = menu.products.filter((p) => p.disponible && typeof p.prix === "number").slice(0,6);
const categories = [...new Set(menu.products.map((p) => p.categorie))].slice(0,6);

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[92vh] overflow-hidden bg-[#11100e] text-[#fffaf2]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(182,138,66,.22),transparent_35%),radial-gradient(circle_at_15%_75%,rgba(255,255,255,.06),transparent_28%)]" />
        <div className="absolute left-0 right-0 top-24 h-px gold-line opacity-70" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-between px-5 pb-10 pt-28 sm:px-8 lg:px-12">
          <div className="max-w-3xl fade-up">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[.42em] text-[#d4b273]"><I18nText fr="La Shish • Abidjan" en="La Shish • Abidjan" ar="La Shish • أبيدجان" /></p>
            <h1 className="max-w-3xl text-5xl font-black leading-[.95] tracking-[-.05em] sm:text-7xl lg:text-8xl"><I18nText fr="L’expérience" en="The Shish" ar="تجربة" /><span className="block text-[#d4b273]"><I18nText fr="Shish commence ici." en="experience starts here." ar="Shish تبدأ من هنا." /></span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg"><I18nText fr="Un menu pensé comme une vraie expérience digitale : rapide, élégant, gourmand et prêt pour la commande." en="A menu designed as a real digital experience: fast, elegant, delicious and ready for ordering." ar="قائمة صممت كتجربة رقمية راقية: سريعة وأنيقة وشهية وجاهزة للطلب." /></p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/menu" className="rounded-full bg-[#d4b273] px-6 py-3 text-sm font-bold text-[#11100e] transition hover:-translate-y-0.5 hover:bg-white"><I18nText fr="Découvrir le menu" en="Explore the menu" ar="اكتشف القائمة" /></Link>
              <Link href="/reserver" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold backdrop-blur transition hover:-translate-y-0.5 hover:border-[#d4b273] hover:text-[#d4b273]"><I18nText fr="Réserver une table" en="Reserve a table" ar="احجز طاولة" /></Link>
            </div>
          </div>
          <div className="flex items-end justify-between gap-6">
            <div className="float-in">
              <div className="brand-logo-shell rounded-full p-2">
                <Image src={imageUrl("logo.webp")} alt="La Shish" width={220} height={140} priority unoptimized className="h-auto w-[170px] rounded-full object-contain sm:w-[220px]" />
              </div>
            </div>
            <div className="hidden max-w-xs text-right text-sm leading-6 text-white/50 sm:block"><I18nText fr="253 créations à découvrir. Votre prochaine commande préférée est peut-être déjà ici." en="253 creations to discover. Your next favorite order may already be here." ar="لديك ٢٥٣ إبداعاً لاكتشافها. قد يكون طلبك المفضل القادم هنا." /></div>
          </div>
        </div>
      </section>

      <section className="luxury-grid px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]"><I18nText fr="Explorer" en="Explore" ar="استكشف" /></p><h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl"><I18nText fr="Le menu, autrement." en="The menu, reimagined." ar="القائمة بطريقة مختلفة." /></h2></div>
            <Link href="/menu" className="text-sm font-bold underline decoration-[#b68a42] underline-offset-8"><I18nText fr="Voir les 253 produits →" en="See all 253 products →" ar="عرض جميع المنتجات الـ ٢٥٣ →" /></Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((label,i) => {
              const tr = menuLabel(label);
              return <Link key={label} href={"/menu/"+slugify(label)} className="card-shine group rounded-3xl border border-black/8 bg-white/60 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white">
                <span className="text-xs font-bold text-[#b68a42]">0{i+1}</span>
                <h3 className="mt-12 text-2xl font-black"><I18nText {...tr} /></h3>
                <p className="mt-2 text-sm text-black/55"><I18nText fr="Sélection La Shish" en="La Shish selection" ar="اختيارات La Shish" /></p>
                <span className="mt-6 inline-flex text-sm font-bold transition group-hover:translate-x-1"><I18nText fr="Explorer →" en="Explore →" ar="استكشف →" /></span>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#11100e] px-5 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#d4b273]"><I18nText fr="À goûter" en="Must-try" ar="جرّبها" /></p><h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl"><I18nText fr="Nos favoris du moment" en="Our favorites right now" ar="مفضلاتنا الآن" /></h2></div><Link href="/menu" className="hidden text-sm font-bold text-[#d4b273] sm:block"><I18nText fr="Tout le menu →" en="Full menu →" ar="القائمة كاملة →" /></Link></div>
          <FeaturedProducts products={featured} />
        </div>
      </section>

      <section className="bg-[#f5f0e7] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-[2rem] bg-[#d8c8ae] p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[.3em] text-black/50"><I18nText fr="Plus qu’un menu" en="More than a menu" ar="أكثر من مجرد قائمة" /></p><h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl"><I18nText fr="Commandez, réservez, retrouvez vos favoris." en="Order, reserve, and keep your favorites." ar="اطلب واحجز واحتفظ بمفضلاتك." /></h2><p className="mt-5 max-w-xl leading-7 text-black/65"><I18nText fr="La V2 est pensée pour réunir menu, commande, compte client, fidélité et réservation dans une seule expérience." en="Version 2 brings together the menu, ordering, customer account, loyalty and reservations in one experience." ar="الإصدار الثاني يجمع القائمة والطلب وحساب العميل والولاء والحجوزات في تجربة واحدة." /></p><div className="mt-8 flex flex-wrap gap-3"><Link href="/commande" className="rounded-full bg-[#11100e] px-6 py-3 text-sm font-bold text-white"><I18nText fr="Commander" en="Order" ar="اطلب الآن" /></Link><Link href="/contact" className="rounded-full border border-black/15 px-6 py-3 text-sm font-bold"><I18nText fr="Nous trouver" en="Find us" ar="موقعنا" /></Link></div></div>
          <div className="rounded-[2rem] border border-black/10 bg-white/55 p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]"><I18nText fr="Bon à savoir" en="Good to know" ar="معلومات مهمة" /></p><div className="mt-7 space-y-5 text-sm font-semibold">
            {["Mobile-first et ultra rapide","PWA installable","253 produits déjà récupérés","Compte client + fidélité"].map((item) => <div key={item} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b68a42]" /><I18nText fr={item} en={item==="Mobile-first et ultra rapide"?"Mobile-first and ultra fast":item==="PWA installable"?"Installable PWA":item==="253 produits déjà récupérés"?"253 products imported":"Customer account + loyalty"} ar={item==="Mobile-first et ultra rapide"?"مصممة للهاتف وسريعة جداً":item==="PWA installable"?"تطبيق PWA قابل للتثبيت":item==="253 produits déjà récupérés"?"تم استيراد ٢٥٣ منتجاً":"حساب العميل + الولاء"} /></div>)}
          </div></div>
        </div>
      </section>
    </main>
  );
}
