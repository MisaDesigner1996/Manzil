import { useMemo, useState } from 'react';
import { ArrowRight, Check, Instagram, MessageCircle, Minus, Plus } from 'lucide-react';
import {
  CurrencyCode,
  ENTERPRISE_CHECKS,
  FAQ_ITEMS,
  PLAN_INCLUSIONS,
  PRICING_TIERS,
  formatMoney,
} from '../../data/tenantyContent';
import { ModalType } from '../Navbar';

export function Option3PricingFaqAndFooter({
  currency,
  onOpenModal,
}: {
  currency: CurrencyCode;
  onOpenModal: (modal: ModalType) => void;
}) {
  const [units, setUnits] = useState(15);
  const [tenants, setTenants] = useState(30);
  const [techs, setTechs] = useState(2);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const recommendedPlan = useMemo(() => {
    return (
      PRICING_TIERS.find(
        (p) =>
          units <= p.limits.units &&
          tenants <= p.limits.tenants &&
          techs <= p.limits.technicians
      ) || null
    );
  }, [units, tenants, techs]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Find Your Plan Sliders */}
      <section className="bg-[#09090D] py-16 sm:py-20 border-b border-[#222130]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[540px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
              FIND YOUR PLAN
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA]">
              Which plan fits your portfolio?
            </h2>
            <p className="mt-3 text-base text-[#B8B3CA]">
              Move the sliders and we&apos;ll match you to the right plan.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-6 bg-[#14141D] border border-[#262535] rounded-2xl p-6 sm:p-8 flex flex-col justify-center gap-6">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold mb-2.5">
                  <label htmlFor="opt3-sl-units" className="text-[#F5F4F8]">
                    Units
                  </label>
                  <span className="font-mono font-bold text-[#C4B9E3] tabular-nums">{units}</span>
                </div>
                <input
                  id="opt3-sl-units"
                  type="range"
                  min={1}
                  max={1100}
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="manzil-slider"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-semibold mb-2.5">
                  <label htmlFor="opt3-sl-tenants" className="text-[#F5F4F8]">
                    Tenants
                  </label>
                  <span className="font-mono font-bold text-[#C4B9E3] tabular-nums">{tenants}</span>
                </div>
                <input
                  id="opt3-sl-tenants"
                  type="range"
                  min={1}
                  max={2200}
                  value={tenants}
                  onChange={(e) => setTenants(Number(e.target.value))}
                  className="manzil-slider"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-semibold mb-2.5">
                  <label htmlFor="opt3-sl-techs" className="text-[#F5F4F8]">
                    Technicians
                  </label>
                  <span className="font-mono font-bold text-[#C4B9E3] tabular-nums">{techs}</span>
                </div>
                <input
                  id="opt3-sl-techs"
                  type="range"
                  min={0}
                  max={55}
                  value={techs}
                  onChange={(e) => setTechs(Number(e.target.value))}
                  className="manzil-slider"
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#1B162D] text-white border border-[#5D488F] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C4B9E3]">
                RECOMMENDED PLAN
              </span>

              {recommendedPlan ? (
                <>
                  <div className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {recommendedPlan.name} plan
                  </div>
                  <div className="mt-2 text-xl font-bold font-mono tabular-nums text-[#E4DCF7]">
                    {formatMoney(
                      billing === 'yearly'
                        ? recommendedPlan.monthlyBhd * 10
                        : recommendedPlan.monthlyBhd,
                      currency
                    )}
                    {billing === 'yearly' ? ' / year' : ' / month'}
                  </div>
                  <p className="mt-3 text-sm text-[#D4CBEB] max-w-xs">
                    Includes up to {recommendedPlan.limits.units} units,{' '}
                    {recommendedPlan.limits.tenants} tenants and{' '}
                    {recommendedPlan.limits.technicians} technicians with a 14-day free trial.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        type: 'trial',
                        plan: recommendedPlan.name,
                        cycle: billing,
                      })
                    }
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#5D488F] hover:bg-[#6F58A8] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Start 14-day free trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    Enterprise
                  </div>
                  <div className="mt-2 text-xl font-bold text-[#E4DCF7]">Contact sales</div>
                  <p className="mt-3 text-sm text-[#D4CBEB] max-w-xs">
                    Your portfolio is larger than our standard plans. Book a 30-day enterprise
                    pilot.
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenModal({ type: 'demo', preset: 'enterprise_trial' })}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#5D488F] hover:bg-[#6F58A8] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Book Enterprise Pilot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[#0E0E15] py-16 sm:py-24 border-b border-[#222130]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[620px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
              PRICING
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA] text-balance">
              Every feature. Pay for the size of your portfolio.
            </h2>
            <p className="mt-3.5 text-base text-[#B8B3CA]">
              All plans include everything. Choose by units, buildings and team size. All prices in
              BHD.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-[#C4B9E3]">
              <span>14-day free trial</span>
              <span aria-hidden="true">·</span>
              <span>No credit card required</span>
              <span aria-hidden="true">·</span>
              <span>All features included</span>
            </div>

            <div className="mt-7 flex justify-center">
              <div
                role="tablist"
                aria-label="Billing period"
                className="inline-flex items-center p-1 bg-[#14141D] border border-[#2B293C] rounded-xl"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={billing === 'monthly'}
                  onClick={() => setBilling('monthly')}
                  className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    billing === 'monthly'
                      ? 'bg-[#5D488F] text-white'
                      : 'text-[#B8B3CA] hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={billing === 'yearly'}
                  onClick={() => setBilling('yearly')}
                  className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    billing === 'yearly'
                      ? 'bg-[#5D488F] text-white'
                      : 'text-[#B8B3CA] hover:text-white'
                  }`}
                >
                  <span>Yearly</span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      billing === 'yearly'
                        ? 'bg-[#3C2C66] text-white'
                        : 'bg-[#211C35] text-[#C4B9E3]'
                    }`}
                  >
                    2 months free
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {PRICING_TIERS.map((tier) => {
              const displayPrice =
                billing === 'monthly' ? tier.monthlyBhd : tier.yearlyPerMonthBhd;
              const isPop = Boolean(tier.popular);

              return (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all ${
                    isPop
                      ? 'bg-[#1D1633] text-white border-2 border-[#7A6B9C] shadow-[0_24px_60px_rgba(0,0,0,0.5)]'
                      : 'bg-[#14141D] text-[#F7F6FA] border border-[#262535]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                      {isPop && (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#5D488F] text-white whitespace-nowrap">
                          ★ Most popular
                        </span>
                      )}
                    </div>

                    <p
                      className={`mt-1.5 text-sm min-h-[38px] ${
                        isPop ? 'text-[#D8CFF0]' : 'text-[#9A94B0]'
                      }`}
                    >
                      {tier.fit}
                    </p>

                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold font-mono tabular-nums tracking-tight text-white">
                        {displayPrice}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          isPop ? 'text-[#C9BEE6]' : 'text-[#9A94B0]'
                        }`}
                      >
                        BHD/mo
                      </span>
                    </div>

                    <div
                      className={`mt-1.5 min-h-[20px] text-xs font-medium ${
                        isPop ? 'text-[#E4DCF7]' : 'text-[#9B8CC4]'
                      }`}
                    >
                      {billing === 'yearly' && (
                        <>
                          <s className="opacity-60">BHD {tier.monthlyBhd}</s> · billed BHD{' '}
                          {tier.yearlyTotalBhd} yearly
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenModal({ type: 'trial', plan: tier.name, cycle: billing })
                      }
                      className={`mt-5 w-full py-2.5 px-4 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                        isPop
                          ? 'bg-[#5D488F] text-white hover:bg-[#6F58A8]'
                          : 'bg-[#1C1B28] text-[#F5F4F8] border border-[#2F2D45] hover:bg-[#5D488F] hover:border-[#5D488F] hover:text-white'
                      }`}
                    >
                      Start free trial
                    </button>
                  </div>

                  <div
                    className={`mt-6 pt-5 border-t space-y-2.5 text-sm ${
                      isPop ? 'border-[#3E3263]' : 'border-[#232133]'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#9A94B0]'}>Units</span>
                      <strong className="font-mono tabular-nums text-white">{tier.limits.units}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#9A94B0]'}>Tenants</span>
                      <strong className="font-mono tabular-nums text-white">{tier.limits.tenants}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#9A94B0]'}>
                        Technicians
                      </span>
                      <strong className="font-mono tabular-nums text-white">{tier.limits.technicians}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#9A94B0]'}>
                        User seats
                      </span>
                      <strong className="font-mono tabular-nums text-white">{tier.limits.seats}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#9A94B0]'}>
                        Orgs / Buildings
                      </span>
                      <strong className="font-mono tabular-nums text-white">{tier.limits.orgsBuildings}</strong>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Enterprise Tier */}
            <div className="rounded-2xl p-6 bg-[#14141D] text-[#F7F6FA] border border-[#262535] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
                <p className="mt-1.5 text-sm text-[#9A94B0] min-h-[38px]">
                  Portfolios of 1,000+ units
                </p>

                <div className="mt-4 text-[26px] font-extrabold tracking-tight leading-tight py-1 text-white">
                  Contact sales
                </div>
                <div className="mt-1.5 min-h-[20px] text-xs font-medium text-[#9B8CC4]">
                  Tailored pricing, 30-day pilot
                </div>

                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'contact', subject: 'Enterprise Inquiry' })}
                  className="mt-5 w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-[#1C1B28] border border-[#2F2D45] text-[#F5F4F8] hover:bg-[#5D488F] hover:border-[#5D488F] hover:text-white transition-colors cursor-pointer"
                >
                  Contact sales
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-[#232133] space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#9A94B0]">Units</span>
                  <strong className="font-mono tabular-nums text-white">1,000+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A94B0]">Tenants</span>
                  <strong className="font-mono tabular-nums text-white">2,000+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A94B0]">Technicians</span>
                  <strong className="font-mono tabular-nums text-white">50+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A94B0]">User seats</span>
                  <strong className="font-mono tabular-nums text-white">50+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9A94B0]">Orgs / Buildings</span>
                  <strong className="text-white">Custom</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 bg-[#14141D] border border-[#262535] rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg font-bold text-[#F7F6FA]">Every plan includes all features</h3>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {PLAN_INCLUSIONS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1B1A28] border border-[#2E2C42] text-xs font-semibold text-[#E8E5F2]"
                >
                  <Check className="w-3.5 h-3.5 text-[#9B8CC4]" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs sm:text-sm text-[#9A94B0]">
              Only your limits change as you grow. Tenants are counted per active lease. Upgrade any
              time, no feature lock-ins.
            </p>
          </div>

          <div
            id="enterprise"
            className="mt-7 bg-[#19142B] text-white border border-[#44326B] rounded-2xl p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-7"
          >
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#C4B9E3]">
                ENTERPRISE TRIAL & SANDBOX
              </span>
              <h3 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Need a tailored pilot for a large portfolio?
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#D4CBEB]">
                Try a 30-day enterprise sandbox with limits matched to your operation, approval
                workflows, and a custom SLA.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-[#EFEBF8]">
                {ENTERPRISE_CHECKS.map((chk) => (
                  <span key={chk}>✓ {chk}</span>
                ))}
              </div>
            </div>

            <div className="shrink-0 text-center">
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'demo', preset: 'enterprise_trial' })}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-[#5D488F] hover:bg-[#6F58A8] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Book Enterprise Pilot
              </button>
              <div className="mt-2.5 text-xs text-[#C4B9E3]">No obligation · 30-day sandbox</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#09090D] py-16 sm:py-24 border-b border-[#222130]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
                FAQ
              </p>
              <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA]">
                Common questions
              </h2>
            </div>

            <div className="lg:col-span-8 bg-[#14141D] border border-[#262535] rounded-2xl divide-y divide-[#232133] px-5 sm:px-7">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                    >
                      <span className="text-base sm:text-lg font-semibold text-[#F5F4F8] group-hover:text-[#C4B9E3] transition-colors">
                        {item.q}
                      </span>
                      <span className="w-7 h-7 rounded-lg bg-[#1C1B29] border border-[#2F2D45] text-[#D8CFF0] flex items-center justify-center shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-5 pr-10 text-sm sm:text-base text-[#B8B3CA] leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#0E0E15] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1160px] mx-auto rounded-3xl bg-[#181429] border border-[#44326B] px-6 py-14 sm:py-20 text-center text-white shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <h2 className="text-[clamp(1.85rem,4vw,3rem)] font-extrabold tracking-[-0.025em] text-white max-w-3xl mx-auto text-balance">
            Ready to transform your property management?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D8CFF0] max-w-[520px] mx-auto">
            The power of AI and automation, built for modern property professionals everywhere.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'trial' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#5D488F] hover:bg-[#6F58A8] rounded-lg transition-colors cursor-pointer"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-[#12101D] border border-[#4D3C7A] hover:border-white rounded-lg transition-colors cursor-pointer"
            >
              Request a Demo
            </button>

            <a
              href="https://wa.me/97339990391"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-left text-xs sm:text-sm text-[#DED8EE] hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#C4B9E3] shrink-0" />
              <span>
                Talk to us on WhatsApp
                <strong className="block font-mono text-white">+973 3999 0391</strong>
              </span>
            </a>
          </div>

          <div className="mt-5 text-xs sm:text-sm text-[#C4B9E3]">
            No credit card required · 14-day free trial
          </div>

          <div className="mt-5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#4D3C7A] text-xs font-semibold text-[#EFEBF8] hover:border-white hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow us on Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Dark Theme Footer */}
      <footer className="bg-[#07070B] text-white border-t border-[#222130]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-20 sm:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#222130]">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-block bg-white rounded-xl px-3.5 py-2">
                <img
                  src="/assets/aistudio/manzil_logo_transparent_9f6b6dbe.png"
                  alt="Manzil"
                  referrerPolicy="no-referrer"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-[#A8A2BF] max-w-xs leading-relaxed">
                AI-powered property management software for modern real estate professionals across
                the GCC and beyond.
              </p>
            </div>

            <nav aria-label="Product" className="lg:col-span-2 flex flex-col space-y-2.5 text-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                Product
              </h4>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#features');
                }}
                className="text-[#A8A2BF] hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#pdpl"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#pdpl');
                }}
                className="text-[#A8A2BF] hover:text-white transition-colors"
              >
                Data Protection
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#pricing');
                }}
                className="text-[#A8A2BF] hover:text-white transition-colors"
              >
                Pricing
              </a>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'login' })}
                className="text-left text-[#A8A2BF] hover:text-white transition-colors cursor-pointer"
              >
                Portal Sign In
              </button>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'trial' })}
                className="text-left text-[#A8A2BF] hover:text-white transition-colors cursor-pointer"
              >
                Start Free Trial
              </button>
            </nav>

            <nav aria-label="Company" className="lg:col-span-2 flex flex-col space-y-2.5 text-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                Company
              </h4>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'about' })}
                className="text-left text-[#A8A2BF] hover:text-white transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'contact' })}
                className="text-left text-[#A8A2BF] hover:text-white transition-colors cursor-pointer"
              >
                Contact Us
              </button>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#faq');
                }}
                className="text-[#A8A2BF] hover:text-white transition-colors"
              >
                FAQ
              </a>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                className="text-left text-[#A8A2BF] hover:text-white transition-colors cursor-pointer"
              >
                Request a Demo
              </button>
            </nav>

            <div className="lg:col-span-3 flex flex-col space-y-6 text-sm">
              <nav aria-label="Legal" className="flex flex-col space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Legal</h4>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'privacy' })}
                  className="text-left text-[#A8A2BF] hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'terms' })}
                  className="text-left text-[#A8A2BF] hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </nav>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">
                  Follow us
                </h4>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#A8A2BF] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A83A3]">
            <span>© 2026 Manzil. All rights reserved.</span>
            <a
              href="https://wa.me/97339990391"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Chat with us · +973 3999 0391
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
