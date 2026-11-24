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

const DARK_TOUR_VALUE_TONES = {
  good: 'text-[#6CE9A6]',
  warn: 'text-[#FDBA74]',
  danger: 'text-[#FDA29B]',
  neutral: 'text-[#F5F4F8]',
};

const DARK_TIMELINE_TAG_STYLES = {
  indigo: 'bg-[#201A36] text-[#C4B9E3] border-[#3E3263]',
  paid: 'bg-[#0B291B] text-[#6CE9A6] border-[#1A593A]',
  warn: 'bg-[#2D1B09] text-[#FDBA74] border-[#5E3811]',
  purple: 'bg-[#261D42] text-[#D8CFF0] border-[#4C3B7D]',
  neutral: 'bg-[#1D1C26] text-[#C7C2D6] border-[#312F40]',
};

export function Option3ProductTourAndDay({
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
      <section className="bg-[#09090D] py-16 sm:py-24 border-b border-[#222130]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[600px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
              PRODUCT TOUR
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA]">
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
                      ? 'bg-[#5D488F] text-white border-[#7A6B9C]'
                      : 'bg-[#14141D] text-[#B8B3CA] border-[#262535] hover:text-white hover:border-[#5D488F]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl bg-[#13131C] border border-[#262535] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#F7F6FA] leading-tight">
                {activeTour.heading}
              </h3>
              <p className="mt-3.5 text-base sm:text-lg text-[#B8B3CA] leading-relaxed">
                {activeTour.description}
              </p>
            </div>

            <div className="lg:col-span-7 bg-[#0C0C12] border border-[#272538] rounded-2xl p-6 sm:p-7">
              <div className="flex items-center justify-between text-xs text-[#9B8CC4] pb-3 border-b border-[#232133]">
                <span className="font-semibold uppercase tracking-wider">
                  {activeTour.cardTitle}
                </span>
                <span>Sample data</span>
              </div>

              <div className="divide-y divide-[#232133]">
                {tourRows.map((row) => (
                  <div
                    key={row.label}
                    className="py-4 flex items-center justify-between gap-4 text-sm sm:text-base"
                  >
                    <span className="font-medium text-[#E8E5F2]">{row.label}</span>
                    <span
                      className={`font-bold font-mono tabular-nums ${DARK_TOUR_VALUE_TONES[row.tone]}`}
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
      <section id="day" className="bg-[#0E0E15] py-16 sm:py-24 border-b border-[#222130]">
        <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[580px] mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
              A DAY WITH MANZIL
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA]">
              Less chasing. More done.
            </h2>
            <p className="mt-3.5 text-base text-[#B8B3CA]">
              A sample day for a landlord with a few buildings. Manzil handles the routine so you
              only step in when it matters.
            </p>
          </div>

          <div className="relative space-y-5">
            <div
              className="hidden sm:block absolute left-[76px] top-6 bottom-6 w-px bg-[#2D2B3E]"
              aria-hidden="true"
            />

            {DAY_TIMELINE.map((item) => (
              <div
                key={item.time}
                className="grid grid-cols-1 sm:grid-cols-[64px_24px_1fr] gap-2 sm:gap-3 items-start"
              >
                <div className="pt-0 sm:pt-5 text-sm font-bold font-mono tabular-nums text-[#C4B9E3]">
                  {item.time}
                </div>

                <div className="hidden sm:flex justify-center pt-6 relative z-10">
                  <span className="w-3 h-3 rounded-full bg-[#9B8CC4] ring-4 ring-[#1E1A30]" />
                </div>

                <div className="bg-[#14141D] border border-[#262535] rounded-2xl p-5 sm:p-6">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded border ${
                      DARK_TIMELINE_TAG_STYLES[item.tone]
                    }`}
                  >
                    {item.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#F7F6FA]">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-[#B8B3CA]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'trial' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#5D488F] hover:bg-[#6F58A8] rounded-lg transition-colors cursor-pointer shadow-[0_10px_28px_rgba(93,72,143,0.35)]"
            >
              <span>Start 14-day free trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-[#09090D] py-16 sm:py-24 border-b border-[#222130]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[600px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
              HOW IT WORKS
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA]">
              Get started in 3 simple steps
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className={`rounded-2xl p-7 flex flex-col justify-between border ${
                  idx === 2
                    ? 'bg-[#221A3B] text-white border-[#6F58A8]'
                    : 'bg-[#14141D] text-[#F7F6FA] border-[#262535]'
                }`}
              >
                <div>
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-xl font-mono text-xs font-bold tabular-nums ${
                      idx === 2
                        ? 'bg-white text-[#1D1533]'
                        : 'bg-[#5D488F] text-white'
                    }`}
                  >
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                  <p
                    className={`mt-2.5 text-sm leading-relaxed ${
                      idx === 2 ? 'text-[#DDD5F3]' : 'text-[#A8A2BF]'
                    }`}
                  >
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

export function Option3PdplSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="pdpl" className="bg-[#0E0E15] py-16 sm:py-24 border-b border-[#222130]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
              DATA PROTECTION · BAHRAIN PDPL
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA] text-balance">
              Built around Bahrain&apos;s Personal Data Protection Law (PDPL)
            </h2>
            <p className="mt-3.5 text-base text-[#B8B3CA] max-w-[580px] leading-relaxed">
              With role-based access, audit logs and encrypted invoice links. Each
              organization&apos;s data is separated from every other organization&apos;s.
            </p>

            <div className="mt-8 bg-[#14141D] border border-[#262535] rounded-2xl divide-y divide-[#232133] px-5 sm:px-6">
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
                        <span className="font-mono text-xs font-bold text-[#C4B9E3] bg-[#211C35] border border-[#3E3263] rounded-md px-2 py-1 shrink-0 tabular-nums">
                          {item.number}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-[#F5F4F8] group-hover:text-[#C4B9E3] transition-colors truncate">
                          {item.title}
                        </span>
                      </div>
                      <span className="w-7 h-7 rounded-lg bg-[#1C1B29] border border-[#2E2C40] text-[#D8CFF0] flex items-center justify-center shrink-0">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-4 pl-11 pr-4 text-sm text-[#B8B3CA] leading-relaxed">
                        {item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[340px] rounded-3xl overflow-hidden border border-[#2B293C] bg-[#14141D]">
              {!imgError ? (
                <img
                  src="/src/assets/images/manzil_pdpl_interior_1795531180719.jpg"
                  alt="Residential interior protected under Manzil PDPL standards"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center brightness-90 lg:absolute lg:inset-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#E8E5F2]">
                  <ShieldCheck className="w-12 h-12 mb-3 text-[#9B8CC4]" />
                  <p className="text-sm font-semibold">
                    Law No. 30 of 2018 · Personal Data Protection Law
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090D]/90 via-[#09090D]/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C4B9E3]">
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
