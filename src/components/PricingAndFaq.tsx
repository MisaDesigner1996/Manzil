import { useMemo, useState } from 'react';
import { Check, Plus, Minus, ArrowRight } from 'lucide-react';
import {
  CurrencyCode,
  ENTERPRISE_CHECKS,
  FAQ_ITEMS,
  PLAN_INCLUSIONS,
  PRICING_TIERS,
  formatMoney,
} from '../data/tenantyContent';
import { ModalType } from './Navbar';

interface PricingAndFaqProps {
  currency: CurrencyCode;
  onOpenModal: (modal: ModalType) => void;
}

export function PricingAndFaq({ currency, onOpenModal }: PricingAndFaqProps) {
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

  return (
    <>
      {/* Find Your Plan Sliders Section */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#EAE6F3]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[540px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
              FIND YOUR PLAN
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226]">
              Which plan fits your portfolio?
            </h2>
            <p className="mt-3 text-base text-[#57526B]">
              Move the sliders and we&apos;ll match you to the right plan.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Sliders Box */}
            <div className="lg:col-span-6 bg-[#FAF9FD] border border-[#E6E1F0] rounded-2xl p-6 sm:p-8 flex flex-col justify-center gap-6">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold mb-2.5">
                  <label htmlFor="sl-units" className="text-[#171226]">
                    Units
                  </label>
                  <span className="font-mono font-bold text-[#2D1F4E] tabular-nums">{units}</span>
                </div>
                <input
                  id="sl-units"
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
                  <label htmlFor="sl-tenants" className="text-[#171226]">
                    Tenants
                  </label>
                  <span className="font-mono font-bold text-[#2D1F4E] tabular-nums">
                    {tenants}
                  </span>
                </div>
                <input
                  id="sl-tenants"
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
                  <label htmlFor="sl-techs" className="text-[#171226]">
                    Technicians
                  </label>
                  <span className="font-mono font-bold text-[#2D1F4E] tabular-nums">{techs}</span>
                </div>
                <input
                  id="sl-techs"
                  type="range"
                  min={0}
                  max={55}
                  value={techs}
                  onChange={(e) => setTechs(Number(e.target.value))}
                  className="manzil-slider"
                />
              </div>
            </div>

            {/* Recommended Plan Card */}
            <div className="lg:col-span-6 bg-[#2D1F4E] text-white border border-[#44326B] rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_16px_40px_rgba(45,31,78,0.16)]">
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C9BEE6]">
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
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#2D1F4E] bg-white hover:bg-[#F3F0FA] rounded-lg transition-colors cursor-pointer"
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
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#2D1F4E] bg-white hover:bg-[#F3F0FA] rounded-lg transition-colors cursor-pointer"
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

      {/* Pricing Section */}
      <section id="pricing" className="bg-[#F8F7FC] py-16 sm:py-24 border-b border-[#EAE6F3]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[620px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
              PRICING
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226] text-balance">
              Every feature. Pay for the size of your portfolio.
            </h2>
            <p className="mt-3.5 text-base text-[#57526B]">
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

            {/* Billing Toggle */}
            <div className="mt-7 flex justify-center">
              <div
                role="tablist"
                aria-label="Billing period"
                className="inline-flex items-center p-1 bg-white border border-[#DCD6EB] rounded-xl"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={billing === 'monthly'}
                  onClick={() => setBilling('monthly')}
                  className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    billing === 'monthly'
                      ? 'bg-[#2D1F4E] text-white'
                      : 'text-[#57526B] hover:text-[#2D1F4E]'
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
                      ? 'bg-[#2D1F4E] text-white'
                      : 'text-[#57526B] hover:text-[#2D1F4E]'
                  }`}
                >
                  <span>Yearly</span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      billing === 'yearly'
                        ? 'bg-[#44326B] text-white'
                        : 'bg-[#F3F0FA] text-[#2D1F4E]'
                    }`}
                  >
                    2 months free
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Pricing Cards Grid */}
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
                      ? 'bg-[#2D1F4E] text-white border border-[#2D1F4E] shadow-[0_20px_50px_rgba(45,31,78,0.22)]'
                      : 'bg-white text-[#171226] border border-[#E6E1F0]'
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
                        isPop ? 'text-[#D4CBEB]' : 'text-[#57526B]'
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
                          isPop ? 'text-[#C9BEE6]' : 'text-[#57526B]'
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
                          ? 'bg-white text-[#2D1F4E] hover:bg-[#F3F0FA]'
                          : 'bg-[#FAF9FD] text-[#2D1F4E] border border-[#DCD6EB] hover:bg-[#2D1F4E] hover:text-white'
                      }`}
                    >
                      Start free trial
                    </button>
                  </div>

                  <div
                    className={`mt-6 pt-5 border-t space-y-2.5 text-sm ${
                      isPop ? 'border-[#43316B]' : 'border-[#EAE6F3]'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#57526B]'}>Units</span>
                      <strong className="font-mono tabular-nums">{tier.limits.units}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#57526B]'}>Tenants</span>
                      <strong className="font-mono tabular-nums">{tier.limits.tenants}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#57526B]'}>
                        Technicians
                      </span>
                      <strong className="font-mono tabular-nums">{tier.limits.technicians}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#57526B]'}>
                        User seats
                      </span>
                      <strong className="font-mono tabular-nums">{tier.limits.seats}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className={isPop ? 'text-[#C9BEE6]' : 'text-[#57526B]'}>
                        Orgs / Buildings
                      </span>
                      <strong className="font-mono tabular-nums">{tier.limits.orgsBuildings}</strong>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Enterprise Tier */}
            <div className="rounded-2xl p-6 bg-white text-[#171226] border border-[#E6E1F0] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="mt-1.5 text-sm text-[#57526B] min-h-[38px]">
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
                  className="mt-5 w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-[#FAF9FD] border border-[#DCD6EB] text-[#2D1F4E] hover:bg-[#2D1F4E] hover:text-white transition-colors cursor-pointer"
                >
                  Contact sales
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-[#EAE6F3] space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#57526B]">Units</span>
                  <strong className="font-mono tabular-nums">1,000+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57526B]">Tenants</span>
                  <strong className="font-mono tabular-nums">2,000+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57526B]">Technicians</span>
                  <strong className="font-mono tabular-nums">50+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57526B]">User seats</span>
                  <strong className="font-mono tabular-nums">50+</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57526B]">Orgs / Buildings</span>
                  <strong>Custom</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Inclusions Card */}
          <div className="mt-7 bg-white border border-[#E6E1F0] rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg font-bold text-[#171226]">Every plan includes all features</h3>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {PLAN_INCLUSIONS.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FAF9FD] border border-[#E6E1F0] text-xs font-semibold text-[#2D1F4E]"
                >
                  <Check className="w-3.5 h-3.5 text-[#44326B]" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
            <p className="mt-5 text-xs sm:text-sm text-[#57526B]">
              Only your limits change as you grow. Tenants are counted per active lease. Upgrade any
              time, no feature lock-ins.
            </p>
          </div>

          {/* Enterprise Sandbox Box */}
          <div
            id="enterprise"
            className="mt-7 bg-gradient-to-br from-[#3C2B66] via-[#2D1F4E] to-[#21153B] text-white border border-[#4D387D] rounded-2xl p-7 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-7"
          >
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#D8CFF0]">
                ENTERPRISE TRIAL & SANDBOX
              </span>
              <h3 className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Need a tailored pilot for a large portfolio?
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#DED8EE]">
                Try a 30-day enterprise sandbox with limits matched to your operation, approval
                workflows, and a custom SLA.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-[#E9E2FA]">
                {ENTERPRISE_CHECKS.map((chk) => (
                  <span key={chk}>✓ {chk}</span>
                ))}
              </div>
            </div>

            <div className="shrink-0 text-center">
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'demo', preset: 'enterprise_trial' })}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#2D1F4E] bg-white hover:bg-[#F3F0FA] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Book Enterprise Pilot
              </button>
              <div className="mt-2.5 text-xs text-[#C9BEE6]">No obligation · 30-day sandbox</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section — Design Option 2 Two-Column Split */}
      <section id="faq" className="bg-white py-16 sm:py-24">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
                FAQ
              </p>
              <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226]">
                Common questions
              </h2>
            </div>

            <div className="lg:col-span-8 bg-[#FAF9FD] border border-[#E6E1F0] rounded-2xl divide-y divide-[#EAE6F3] px-5 sm:px-7">
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
                      <span className="text-base sm:text-lg font-semibold text-[#171226] group-hover:text-[#44326B] transition-colors">
                        {item.q}
                      </span>
                      <span className="w-7 h-7 rounded-lg bg-white border border-[#DCD6EB] text-[#2D1F4E] flex items-center justify-center shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-5 pr-10 text-sm sm:text-base text-[#57526B] leading-relaxed">
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
    </>
  );
}
