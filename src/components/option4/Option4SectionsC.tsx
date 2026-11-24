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

export function Option4ProductTourAndDay({
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
      {/* Product Tour — Architectural Split Window */}
      <section className="bg-[#08080D] py-16 sm:py-24 border-b border-[#1E1C2C]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9B8CC4]">
                PRODUCT TOUR
              </p>
              <h2 className="mt-2.5 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA]">
                See it in action
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Product tour"
              className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-[#111019] border border-[#232035]"
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
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#5D488F] text-white'
                        : 'text-[#A8A1BF] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-9 rounded-[26px] border border-[#232035] bg-[#0D0C14] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#1E1C2C]">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#F7F6FA] leading-tight">
                {activeTour.heading}
              </h3>
              <p className="mt-3.5 text-base text-[#A8A1BF] leading-relaxed">
                {activeTour.description}
              </p>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-9 bg-[#0B0A11]">
              <div className="flex items-center justify-between text-xs text-[#9B8CC4] pb-3.5 border-b border-[#1E1C2C]">
                <span className="font-semibold uppercase tracking-wider">
                  {activeTour.cardTitle}
                </span>
                <span>Sample data</span>
              </div>

              <div className="divide-y divide-[#1A1828]">
                {tourRows.map((row) => (
                  <div
                    key={row.label}
                    className="py-4 flex items-center justify-between gap-4 text-sm sm:text-base"
                  >
                    <span className="font-medium text-[#ECE9F6]">{row.label}</span>
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
      <section id="day" className="bg-[#0B0A11] py-16 sm:py-24 border-b border-[#1E1C2C]">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[580px] mx-auto mb-12">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9B8CC4]">
              A DAY WITH MANZIL
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA]">
              Less chasing. More done.
            </h2>
            <p className="mt-3.5 text-base text-[#A8A1BF]">
              A sample day for a landlord with a few buildings. Manzil handles the routine so you
              only step in when it matters.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#232035] bg-[#0D0C14] divide-y divide-[#1E1C2C] overflow-hidden">
            {DAY_TIMELINE.map((item) => (
              <div
                key={item.time}
                className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[88px_130px_1fr] gap-3 sm:gap-5 items-center"
              >
                <div className="text-sm font-bold font-mono tabular-nums text-[#B8A7EB]">
                  {item.time}
                </div>
                <div>
                  <span
                    className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      DARK_TIMELINE_TAG_STYLES[item.tone]
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#F7F6FA]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#A8A1BF]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'trial' })}
              className="inline-flex items-center gap-2.5 rounded-full pl-6 pr-4 py-3.5 text-sm font-semibold text-white bg-[#5D488F] hover:bg-[#6E57A6] transition-colors cursor-pointer shadow-[0_10px_28px_rgba(93,72,143,0.35)]"
            >
              <span>Start 14-day free trial</span>
              <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works — Architectural 3-Column Hairline Strip */}
      <section id="how" className="bg-[#08080D] py-16 sm:py-24 border-b border-[#1E1C2C]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[600px] mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9B8CC4]">
              HOW IT WORKS
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA]">
              Get started in 3 simple steps
            </h2>
          </div>

          <div className="mt-12 rounded-[26px] border border-[#232035] bg-[#0D0C14] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E1C2C] overflow-hidden">
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className={`p-7 sm:p-8 flex flex-col justify-between ${
                  idx === 2 ? 'bg-[#17122B]' : ''
                }`}
              >
                <div>
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-lg font-mono text-xs font-bold tabular-nums ${
                      idx === 2
                        ? 'bg-[#5D488F] text-white'
                        : 'bg-[#171426] border border-[#2B2742] text-[#C4B9E3]'
                    }`}
                  >
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#A8A1BF]">
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

export function Option4PdplSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [imgError, setImgError] = useState(false);

  return (
    /* Stric-inspired "Soluções para diferentes segmentos" Architectural Grid Framing */
    <section id="pdpl" className="bg-[#0B0A11] py-16 sm:py-24 border-b border-[#1E1C2C]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#232035] bg-[#0D0C14] overflow-hidden">
          <div className="p-7 sm:p-11 border-b border-[#1E1C2C] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9B8CC4]">
                DATA PROTECTION · BAHRAIN PDPL
              </p>
              <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA] text-balance">
                Built around Bahrain&apos;s Personal Data Protection Law (PDPL)
              </h2>
              <p className="mt-3.5 text-base text-[#A8A1BF] max-w-[580px] leading-relaxed">
                With role-based access, audit logs and encrypted invoice links. Each
                organization&apos;s data is separated from every other organization&apos;s.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-52 sm:h-60 rounded-2xl overflow-hidden border border-[#29253D] bg-[#13111F]">
                {!imgError ? (
                  <img
                    src="/src/assets/images/manzil_pdpl_interior_1795531180719.jpg"
                    alt="Residential interior protected under Manzil PDPL standards"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center brightness-85"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#E8E5F2]">
                    <ShieldCheck className="w-10 h-10 mb-2 text-[#9B8CC4]" />
                    <p className="text-xs font-semibold">
                      Law No. 30 of 2018 · Personal Data Protection Law
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080D]/95 via-[#08080D]/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#C4B9E3]">
                    ROLE-BASED ACCESS & AUDIT LOGS
                  </div>
                  <div className="mt-0.5 text-sm font-bold">
                    Law No. 30 of 2018 · Kingdom of Bahrain
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive 6-Principle Accordion Matrix */}
          <div className="divide-y divide-[#1E1C2C]">
            {PDPL_PRINCIPLES.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.number} className={isOpen ? 'bg-[#12101D]' : ''}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 sm:px-10 py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-mono text-xs font-bold text-[#C4B9E3] bg-[#1B1730] border border-[#352B59] rounded-md px-2.5 py-1 shrink-0 tabular-nums">
                        {item.number}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-[#F5F4F8] group-hover:text-[#C4B9E3] transition-colors truncate">
                        {item.title}
                      </span>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-[#171524] border border-[#2C2840] text-[#D8CFF0] flex items-center justify-center shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 sm:px-10 pb-5 pl-[74px] sm:pl-[90px] text-sm text-[#A8A1BF] leading-relaxed max-w-4xl">
                      {item.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
