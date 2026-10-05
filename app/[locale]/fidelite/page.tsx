import { localizedMetadata } from "../../../lib/seo";
import type { Locale } from "../../../lib/menu-localization";
import { I18nText } from "../../../components/i18n-provider";
import { LOYALTY_CFA_PER_POINT, LOYALTY_REWARD_POINTS, LOYALTY_REWARD_CFA } from "../../../lib/loyalty";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;
  return localizedMetadata(locale as Locale,"fidelite","/"+locale+"/fidelite");
}

export default function LoyaltyPage(){
  const pointCfa = LOYALTY_CFA_PER_POINT.toLocaleString("fr-FR");
  const rewardPoints = LOYALTY_REWARD_POINTS.toLocaleString("fr-FR");
  const rewardCfa = LOYALTY_REWARD_CFA.toLocaleString("fr-FR");
  return (
    <main className="min-h-screen bg-[#f5f0e7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-[#b68a42]"><I18nText fr="Programme client" en="Customer program" ar="برنامج العملاء"/></p>
        <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl"><I18nText fr="Votre fidélité mérite plus." en="Your loyalty deserves more." ar="ولاؤك يستحق المزيد."/></h1>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <section className="rounded-[2rem] bg-[#11100e] p-8 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#d4b273]">LA SHISH CLUB</p>
            <h2 className="mt-4 text-4xl font-black"><I18nText fr="1 000 F = 1 point" en="1,000 CFA = 1 point" ar="١٬٠٠٠ فرنك = نقطة واحدة"/></h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/55"><I18nText
              fr={"Chaque tranche de "+pointCfa+" F CFA dépensés vous rapporte 1 point de fidélité."}
              en={"Every "+LOYALTY_CFA_PER_POINT.toLocaleString("en-US")+" CFA spent earns you 1 loyalty point."}
              ar="كل ١٬٠٠٠ فرنك يتم إنفاقها تمنحك نقطة ولاء واحدة."
            /></p>
            <div className="mt-8 rounded-2xl border border-[#d4b273]/20 bg-[#d4b273]/10 p-5">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d4b273]"><I18nText fr="Récompense" en="Reward" ar="المكافأة"/></p>
              <p className="mt-2 text-3xl font-black"><I18nText fr={"10 000 points = "+rewardCfa+" F"} en={"10,000 points = "+LOYALTY_REWARD_CFA.toLocaleString("en-US")+" CFA"} ar="١٠٬٠٠٠ نقطة = ٥٠٠ فرنك"/></p>
              <p className="mt-2 text-sm text-white/55"><I18nText
                fr={"À "+rewardPoints+" points, vous débloquez "+rewardCfa+" F CFA de récompense."}
                en={"At "+LOYALTY_REWARD_POINTS.toLocaleString("en-US")+" points, you unlock a "+LOYALTY_REWARD_CFA.toLocaleString("en-US")+" CFA reward."}
                ar="عند الوصول إلى ١٠٬٠٠٠ نقطة، تحصل على مكافأة بقيمة ٥٠٠ فرنك."
              /></p>
            </div>
          </section>
          <section className="rounded-[2rem] border border-black/10 bg-white/60 p-8 sm:p-10">
            <p className="text-sm text-black/45"><I18nText fr="Exemples" en="Examples" ar="أمثلة"/></p>
            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-black/8 bg-white/60 p-5"><p className="text-2xl font-black">5 000 F → 5 points</p></div>
              <div className="rounded-2xl border border-black/8 bg-white/60 p-5"><p className="text-2xl font-black">25 000 F → 25 points</p></div>
              <div className="rounded-2xl border border-black/8 bg-white/60 p-5"><p className="text-2xl font-black">10 000 points → 500 F</p></div>
            </div>
            <p className="mt-6 text-sm leading-7 text-black/55"><I18nText
              fr="Les points sont liés au compte client et à l’historique des commandes. La récompense sera appliquée lors de la commande selon les règles commerciales de LA SHISH."
              en="Points are linked to the customer account and order history. The reward will be applied at checkout according to LA SHISH commercial rules."
              ar="النقاط مرتبطة بحساب العميل وسجل الطلبات، وسيتم تطبيق المكافأة عند الطلب وفقاً لقواعد LA SHISH التجارية."
            /></p>
          </section>
        </div>
      </div>
    </main>
  );
}