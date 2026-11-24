import { useState } from 'react';
import { ArrowRight, Minus, Plus, ShieldCheck } from 'lucide-react';
import {
  CurrencyCode,
  DAY_TIMELINE,
  HOW_IT_WORKS_STEPS,
  PDPL_PRINCIPLES,
  PRODUCT_TOUR_TABS,
} from '../../data/tenantyContent';
import { ModalType } from '../Navbar';

const TOUR_VALUE_TONES = {
  good: 'text-[#157F4D]',
  warn: 'text-[#A15C07]',
  danger: 'text-[#B42318]',
  neutral: 'text-[#0B0A10]',
};

const TIMELINE_TAG_STYLES = {
  indigo: 'bg-[#F4F1FA] text-[#2D1F4E] border-[#DCD6EB]',
  paid: 'bg-[#ECFDF3] text-[#157F4D] border-[#ABEFC6]',
  warn: 'bg-[#FEF7E6] text-[#A15C07] border-[#FDE68A]',
  purple: 'bg-[#EFEBF8] text-[#44326B] border-[#DCD6EB]',
  neutral: 'bg-[#F4F4F6] text-[#3F3B4D] border-[#E2E0EA]',
};

export function Option1ProductTourAndDay({
  currency,
  onOpenModal,
}: {
  currency: CurrencyCode;
  onOpenModal: (modal: ModalType) => void;
}) {
  const [tourIndex, setTourIndex] = useState(0);
  const activeTour = PRODUCT_TOUR_TABS[tourIndex];
  const tourRows = activeTour.getRows(currency);

  return (
    <>
      {/* Product Tour */}
      <section className="bg-[#F8F8FB] py-16 sm:py-24 border-b border-[#E7E5EF]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[600px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              PRODUCT TOUR
            </p>
            <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10]">
              See it in action
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Product tour"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {PRODUCT_TOUR_TABS.map((tab, idx) => {
              const active = tourIndex === idx;
              return (
                <button
                  key={tab.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTourIndex(idx)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0B0A10] text-white border-[#0B0A10]'
                      : 'bg-white text-[#4A465C] border-[#D8D4E6] hover:text-[#0B0A10] hover:border-[#0B0A10]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-white border border-[#E7E5EF] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="lg:col-span-5">
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B0A10] leading-tight">
                {activeTour.heading}
              </h3>
              <p className="mt-3.5 text-base sm:text-lg text-[#4A465C] leading-relaxed">
                {activeTour.description}
              </p>
            </div>

            <div className="lg:col-span-7 bg-[#F8F8FB] border border-[#E7E5EF] rounded-xl p-6 sm:p-7">
              <div className="flex items-center justify-between text-xs text-[#57526B] pb-3 border-b border-[#E7E5EF]">
                <span className="font-bold uppercase tracking-wider text-[#0B0A10]">
                  {activeTour.cardTitle}
                </span>
                <span>Sample data</span>
              </div>

              <div className="divide-y divide-[#E7E5EF]">
                {tourRows.map((row) => (
                  <div
                    key={row.label}
                    className="py-4 flex items-center justify-between gap-4 text-sm sm:text-base"
                  >
                    <span className="font-medium text-[#0B0A10]">{row.label}</span>
                    <span
                      className={`font-bold font-mono tabular-nums ${TOUR_VALUE_TONES[row.tone]}`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A Day With Manzil */}
      <section id="day" className="bg-white py-16 sm:py-24 border-b border-[#E7E5EF]">
        <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[580px] mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              A DAY WITH MANZIL
            </p>
            <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10]">
              Less chasing. More done.
            </h2>
            <p className="mt-3.5 text-base text-[#4A465C]">
              A sample day for a landlord with a few buildings. Manzil handles the routine so you
              only step in when it matters.
            </p>
          </div>

          <div className="relative space-y-5">
            <div
              className="hidden sm:block absolute left-[76px] top-6 bottom-6 w-px bg-[#D8D4E6]"
              aria-hidden="true"
            />

            {DAY_TIMELINE.map((item) => (
              <div
                key={item.time}
                className="grid grid-cols-1 sm:grid-cols-[64px_24px_1fr] gap-2 sm:gap-3 items-start"
              >
                <div className="pt-0 sm:pt-5 text-sm font-bold font-mono tabular-nums text-[#0B0A10]">
                  {item.time}
                </div>

                <div className="hidden sm:flex justify-center pt-6 relative z-10">
                  <span className="w-3 h-3 rounded-full bg-[#0B0A10] ring-4 ring-[#F4F1FA]" />
                </div>

                <div className="bg-[#F8F8FB] border border-[#E7E5EF] rounded-xl p-5 sm:p-6">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded border ${
                      TIMELINE_TAG_STYLES[item.tone]
                    }`}
                  >
                    {item.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#0B0A10]">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-[#4A465C]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'trial' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0B0A10] hover:bg-[#44326B] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <span>Start 14-day free trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works — 3 Obsidian Step Cards */}
      <section id="how" className="bg-[#F8F8FB] py-16 sm:py-24 border-b border-[#E7E5EF]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[600px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              HOW IT WORKS
            </p>
            <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10]">
              Get started in 3 simple steps
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl p-7 bg-[#0B0A10] text-white border border-[#251F3A] flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#44326B] text-white font-mono text-xs font-bold tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#C9BEE6]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Option1PdplSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="pdpl" className="bg-white py-16 sm:py-24 border-b border-[#E7E5EF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              DATA PROTECTION · BAHRAIN PDPL
            </p>
            <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10] text-balance">
              Built around Bahrain&apos;s Personal Data Protection Law (PDPL)
            </h2>
            <p className="mt-3.5 text-base text-[#4A465C] max-w-[580px] leading-relaxed">
              With role-based access, audit logs and encrypted invoice links. Each
              organization&apos;s data is separated from every other organization&apos;s.
            </p>

            <div className="mt-8 bg-[#F8F8FB] border border-[#E7E5EF] rounded-xl divide-y divide-[#E7E5EF] px-5 sm:px-6">
              {PDPL_PRINCIPLES.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={item.number}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono text-xs font-bold text-white bg-[#0B0A10] rounded-md px-2 py-1 shrink-0 tabular-nums">
                          {item.number}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-[#0B0A10] group-hover:text-[#44326B] transition-colors truncate">
                          {item.title}
                        </span>
                      </div>
                      <span className="w-7 h-7 rounded-lg bg-white border border-[#D8D4E6] text-[#0B0A10] flex items-center justify-center shrink-0">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-4 pl-11 pr-4 text-sm text-[#4A465C] leading-relaxed">
                        {item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[340px] rounded-2xl overflow-hidden border border-[#E7E5EF] bg-[#0B0A10]">
              {!imgError ? (
                <img
                  src="/src/assets/images/manzil_pdpl_interior_1795531180719.jpg"
                  alt="Sunlit residential interior protected under Manzil PDPL standards"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center lg:absolute lg:inset-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white">
                  <ShieldCheck className="w-12 h-12 mb-3 text-[#C9BEE6]" />
                  <p className="text-sm font-semibold">
                    Law No. 30 of 2018 · Personal Data Protection Law
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A10]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C9BEE6]">
                  ROLE-BASED ACCESS & AUDIT LOGS
                </div>
                <div className="mt-1 text-base font-bold">
                  Law No. 30 of 2018 · Kingdom of Bahrain
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
