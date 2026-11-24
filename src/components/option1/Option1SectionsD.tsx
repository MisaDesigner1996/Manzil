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

export function Option1PricingFaqAndFooter({
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
      <section className="bg-[#F8F8FB] py-16 sm:py-20 border-b border-[#E7E5EF]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[540px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              FIND YOUR PLAN
            </p>
            <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10]">
              Which plan fits your portfolio?
            </h2>
            <p className="mt-3 text-base text-[#4A465C]">
              Move the sliders and we&apos;ll match you to the right plan.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-6 bg-white border border-[#E7E5EF] rounded-xl p-6 sm:p-8 flex flex-col justify-center gap-6">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold mb-2.5">
                  <label htmlFor="opt1-sl-units" className="text-[#0B0A10]">
                    Units
                  </label>
                  <span className="font-mono font-bold text-[#0B0A10] tabular-nums">{units}</span>
                </div>
                <input
                  id="opt1-sl-units"
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
                  <label htmlFor="opt1-sl-tenants" className="text-[#0B0A10]">
                    Tenants
                  </label>
                  <span className="font-mono font-bold text-[#0B0A10] tabular-nums">{tenants}</span>
                </div>
                <input
                  id="opt1-sl-tenants"
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
                  <label htmlFor="opt1-sl-techs" className="text-[#0B0A10]">
                    Technicians
                  </label>
                  <span className="font-mono font-bold text-[#0B0A10] tabular-nums">{techs}</span>
                </div>
                <input
                  id="opt1-sl-techs"
                  type="range"
                  min={0}
                  max={55}
                  value={techs}
                  onChange={(e) => setTechs(Number(e.target.value))}
                  className="manzil-slider"
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0B0A10] text-white border border-[#251F3A] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(11,10,16,0.18)]">
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B9AED6]">
                RECOMMENDED PLAN
              </span>

              {recommendedPlan ? (
                <>
                  <div className="font-editorial mt-3 text-3xl sm:text-4xl font-bold text-white">
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
                  <p className="mt-3 text-sm text-[#C9BEE6] max-w-xs">
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
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0B0A10] bg-white hover:bg-[#EFEBF8] rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Start 14-day free trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="font-editorial mt-3 text-3xl sm:text-4xl font-bold text-white">
                    Enterprise
                  </div>
                  <div className="mt-2 text-xl font-bold text-[#E4DCF7]">Contact sales</div>
                  <p className="mt-3 text-sm text-[#C9BEE6] max-w-xs">
                    Your portfolio is larger than our standard plans. Book a 30-day enterprise
                    pilot.
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenModal({ type: 'demo', preset: 'enterprise_trial' })}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0B0A10] bg-white hover:bg-[#EFEBF8] rounded-lg transition-colors cursor-pointer"
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
      <section id="pricing" className="bg-white py-16 sm:py-24 border-b border-[#E7E5EF]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[620px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              PRICING
            </p>
            <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10] text-balance">
              Every feature. Pay for the size of your portfolio.
            </h2>
            <p className="mt-3.5 text-base text-[#4A465C]">
              All plans include everything. Choose by units, buildings and team size. All prices in
              BHD.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-[#44326B]">
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
                className="inline-flex items-center p-1 bg-[#F8F8FB] border border-[#D8D4E6] rounded-xl"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={billing === 'monthly'}
                  onClick={() => setBilling('monthly')}
                  className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    billing === 'monthly'
                      ? 'bg-[#0B0A10] text-white'
                      : 'text-[#4A465C] hover:text-[#0B0A10]'
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
                      ? 'bg-[#0B0A10] text-white'
                      : 'text-[#4A465C] hover:text-[#0B0A10]'
                  }`}
                >
                  <span>Yearly</span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      billing === 'yearly'
                        ? 'bg-[#44326B] text-white'
                        : 'bg-white border border-[#E7E5EF] text-[#0B0A10]'
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
                  className={`relative rounded-xl p-6 flex flex-col justify-between transition-all ${
                    isPop
                      ? 'bg-[#0B0A10] text-white border-2 border-[#44326B] shadow-[0_24px_54px_rgba(11,10,16,0.22)]'
                      : 'bg-[#F8F8FB] text-[#0B0A10] border border-[#E7E5EF]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                      {isPop && (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#44326B] text-white whitespace-nowrap">
                          ★ Most popular
                        </span>
                      )}
                    </div>

                    <p
                      className={`mt-1.5 text-sm min-h-[38px] ${
                        isPop ? 'text-[#C9BEE6]' : 'text-[#4A465C]'
                      }`}
                    >
                      {tier.fit}
                    </p>

                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-4xl font-extrabold font-mono tabular-nums tracking-tight">
                        {displayPrice}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          isPop ? 'text-[#C9BEE6]' : 'text-[#4A465C]'
                        }`}
                      >
                        BHD/mo
                      </span>
                    </div>

                    <div
                      className={`mt-1.5 min-h-[20px] text-xs font-medium ${
                        isPop ? 'text-[#E4DCF7]' : 'text-[#44326B]'
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
                          ? 'bg-white text-[#0B0A10] hover:bg-[#EFEBF8]'
                          : 'bg-white text-[#0B0A10] border border-[#D8D4E6] hover:bg-[#0B0A10] hover:text-white'
                      }`}
                    >
                      Start free trial
                    </button>
                  </div>

                  <div
                    className={`mt-6 pt-5 border-t space-y-2.5 text-sm ${
                      isPop ? 'border-[#251F3A]' : 'border-[#E7E5EF]'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#B9AED6]' : 'text-[#4A465C]'}>Units</span>
                      <strong className="font-mono tabular-nums">{tier.limits.units}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#B9AED6]' : 'text-[#4A465C]'}>Tenants</span>
                      <strong className="font-mono tabular-nums">{tier.limits.tenants}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#B9AED6]' : 'text-[#4A465C]'}>
                        Technicians
                      </span>
                      <strong className="font-mono tabular-nums">{tier.limits.technicians}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#B9AED6]' : 'text-[#4A465C]'}>
                        User seats
                      </span>
                      <strong className="font-mono tabular-nums">{tier.limits.seats}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#B9AED6]' : 'text-[#4A465C]'}>
                        Orgs / Buildings
                      </span>
                      <strong className="font-mono tabular-nums">{tier.limits.orgsBuildings}</strong>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Enterprise Tier */}
            <div className="rounded-xl p-6 bg-[#F8F8FB] text-[#0B0A10] border border-[#E7E5EF] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="mt-1.5 text-sm text-[#4A465C] min-h-[38px]">
                  Portfolios of 1,000+ units
                </p>

                <div className="mt-4 text-[26px] font-extrabold tracking-tight leading-tight py-1">
                  Contact sales
                </div>
                <div className="mt-1.5 min-h-[20px] text-xs font-medium text-[#44326B]">
                  Tailored pricing, 30-day pilot
                </div>

                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'contact', subject: 'Enterprise Inquiry' })}
                  className="mt-5 w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-white border border-[#D8D4E6] text-[#0B0A10] hover:bg-[#0B0A10] hover:text-white transition-colors cursor-pointer"
                >
                  Contact sales
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E7E5EF] space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#4A465C]">Units</span>
                  <strong className="font-mono tabular-nums">1,000+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A465C]">Tenants</span>
                  <strong className="font-mono tabular-nums">2,000+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A465C]">Technicians</span>
                  <strong className="font-mono tabular-nums">50+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A465C]">User seats</span>
                  <strong className="font-mono tabular-nums">50+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A465C]">Orgs / Buildings</span>
                  <strong>Custom</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 bg-[#F8F8FB] border border-[#E7E5EF] rounded-xl p-6 sm:p-8 text-center">
            <h3 className="text-lg font-bold text-[#0B0A10]">Every plan includes all features</h3>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {PLAN_INCLUSIONS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-[#E7E5EF] text-xs font-semibold text-[#0B0A10]"
                >
                  <Check className="w-3.5 h-3.5 text-[#44326B]" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs sm:text-sm text-[#4A465C]">
              Only your limits change as you grow. Tenants are counted per active lease. Upgrade any
              time, no feature lock-ins.
            </p>
          </div>

          <div
            id="enterprise"
            className="mt-7 bg-[#0B0A10] text-white border border-[#251F3A] rounded-xl p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-7"
          >
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#C9BEE6]">
                ENTERPRISE TRIAL & SANDBOX
              </span>
              <h3 className="font-editorial mt-2.5 text-2xl sm:text-3xl font-bold text-white">
                Need a tailored pilot for a large portfolio?
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#C9BEE6]">
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
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#0B0A10] bg-white hover:bg-[#EFEBF8] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Book Enterprise Pilot
              </button>
              <div className="mt-2.5 text-xs text-[#A89CC8]">No obligation · 30-day sandbox</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#F8F8FB] py-16 sm:py-24 border-b border-[#E7E5EF]">
        <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[540px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">FAQ</p>
            <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10]">
              Common questions
            </h2>
          </div>

          <div className="mt-10 bg-white border border-[#E7E5EF] rounded-xl divide-y divide-[#E7E5EF] px-5 sm:px-7">
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
                    <span className="text-base sm:text-lg font-semibold text-[#0B0A10] group-hover:text-[#44326B] transition-colors">
                      {item.q}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-[#F8F8FB] border border-[#D8D4E6] text-[#0B0A10] flex items-center justify-center shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-5 pr-10 text-sm sm:text-base text-[#4A465C] leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1160px] mx-auto rounded-2xl bg-[radial-gradient(circle_at_top,#44326B_0%,#1C1630_45%,#0B0A10_100%)] px-6 py-14 sm:py-20 text-center text-white shadow-[0_24px_60px_rgba(11,10,16,0.28)]">
          <h2 className="font-editorial text-[clamp(1.85rem,4vw,3.1rem)] font-bold tracking-[-0.02em] text-white max-w-3xl mx-auto text-balance">
            Ready to transform your property management?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#DED8EE] max-w-[520px] mx-auto">
            The power of AI and automation, built for modern property professionals everywhere.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'trial' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0B0A10] bg-white hover:bg-[#EFEBF8] rounded-lg transition-colors cursor-pointer"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
              className="px-6 py-3.5 text-sm font-semibold text-white border border-[#7A6B9C] hover:border-white rounded-lg transition-colors cursor-pointer"
            >
              Request a Demo
            </button>

            <a
              href="https://wa.me/97339990391"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-left text-xs sm:text-sm text-[#DED8EE] hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#C9BEE6] shrink-0" />
              <span>
                Talk to us on WhatsApp
                <strong className="block font-mono text-white">+973 3999 0391</strong>
              </span>
            </a>
          </div>

          <div className="mt-5 text-xs sm:text-sm text-[#C9BEE6]">
            No credit card required · 14-day free trial
          </div>

          <div className="mt-5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#5D498C] text-xs font-semibold text-[#EFEBF8] hover:border-white hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow us on Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Option 1 Obsidian Footer */}
      <footer className="bg-[#0B0A10] text-white border-t border-[#221D33]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-20 sm:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#221D33]">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-block bg-white rounded-xl px-3.5 py-2">
                <img
                  src="/assets/aistudio/manzil_logo_transparent_9f6b6dbe.png"
                  alt="Manzil"
                  referrerPolicy="no-referrer"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-[#B9AED6] max-w-xs leading-relaxed">
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
                className="text-[#B9AED6] hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#pdpl"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#pdpl');
                }}
                className="text-[#B9AED6] hover:text-white transition-colors"
              >
                Data Protection
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#pricing');
                }}
                className="text-[#B9AED6] hover:text-white transition-colors"
              >
                Pricing
              </a>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'login' })}
                className="text-left text-[#B9AED6] hover:text-white transition-colors cursor-pointer"
              >
                Portal Sign In
              </button>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'trial' })}
                className="text-left text-[#B9AED6] hover:text-white transition-colors cursor-pointer"
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
                className="text-left text-[#B9AED6] hover:text-white transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'contact' })}
                className="text-left text-[#B9AED6] hover:text-white transition-colors cursor-pointer"
              >
                Contact Us
              </button>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#faq');
                }}
                className="text-[#B9AED6] hover:text-white transition-colors"
              >
                FAQ
              </a>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                className="text-left text-[#B9AED6] hover:text-white transition-colors cursor-pointer"
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
                  className="text-left text-[#B9AED6] hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'terms' })}
                  className="text-left text-[#B9AED6] hover:text-white transition-colors cursor-pointer"
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
                  className="inline-flex items-center gap-2 text-[#B9AED6] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8D81AD]">
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
