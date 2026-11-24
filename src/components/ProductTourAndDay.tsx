import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  CurrencyCode,
  DAY_TIMELINE,
  HOW_IT_WORKS_STEPS,
  PRODUCT_TOUR_TABS,
} from '../data/tenantyContent';
import { ModalType } from './Navbar';

interface ProductTourAndDayProps {
  currency: CurrencyCode;
  onOpenModal: (modal: ModalType) => void;
}

const TOUR_VALUE_TONES = {
  good: 'text-[#157F4D]',
  warn: 'text-[#A15C07]',
  danger: 'text-[#B42318]',
  neutral: 'text-[#171226]',
};

const TIMELINE_TAG_STYLES = {
  indigo: 'bg-[#F4F1FA] text-[#2D1F4E] border-[#DCD6EB]',
  paid: 'bg-[#ECFDF3] text-[#157F4D] border-[#ABEFC6]',
  warn: 'bg-[#FEF7E6] text-[#A15C07] border-[#FDE68A]',
  purple: 'bg-[#EFEBF8] text-[#44326B] border-[#DCD6EB]',
  neutral: 'bg-[#F4F4F6] text-[#3F3B4D] border-[#E2E0EA]',
};

export function ProductTourAndDay({ currency, onOpenModal }: ProductTourAndDayProps) {
  const [tourIndex, setTourIndex] = useState(0);
  const activeTour = PRODUCT_TOUR_TABS[tourIndex];
  const tourRows = activeTour.getRows(currency);

  return (
    <>
      {/* Product Tour Section */}
      <section className="bg-white py-16 sm:py-24 border-b border-[#EAE6F3]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[600px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
              PRODUCT TOUR
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226]">
              See it in action
            </h2>
          </div>

          {/* Tour Tabs */}
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
                      ? 'bg-[#2D1F4E] text-white border-[#2D1F4E]'
                      : 'bg-white text-[#57526B] border-[#DCD6EB] hover:text-[#2D1F4E] hover:border-[#44326B]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Option 2 Framed Split View */}
          <div className="mt-10 rounded-3xl bg-[#F6F5FA] border border-[#EAE6F3] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#171226] leading-tight">
                {activeTour.heading}
              </h3>
              <p className="mt-3.5 text-base sm:text-lg text-[#57526B] leading-relaxed">
                {activeTour.description}
              </p>
            </div>

            <div className="lg:col-span-7 bg-white border border-[#E6E1F0] rounded-2xl p-6 sm:p-7 shadow-[0_8px_28px_rgba(45,31,78,0.05)]">
              <div className="flex items-center justify-between text-xs text-[#7A6B9C] pb-3 border-b border-[#EFEBF7]">
                <span className="font-semibold uppercase tracking-wider">
                  {activeTour.cardTitle}
                </span>
                <span>Sample data</span>
              </div>

              <div className="divide-y divide-[#EFEBF7]">
                {tourRows.map((row) => (
                  <div
                    key={row.label}
                    className="py-4 flex items-center justify-between gap-4 text-sm sm:text-base"
                  >
                    <span className="font-medium text-[#171226]">{row.label}</span>
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

      {/* A Day With Manzil Section */}
      <section id="day" className="bg-[#F8F7FB] py-16 sm:py-24 border-b border-[#EAE6F3]">
        <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[580px] mx-auto mb-12">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
              A DAY WITH MANZIL
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226]">
              Less chasing. More done.
            </h2>
            <p className="mt-3.5 text-base text-[#57526B]">
              A sample day for a landlord with a few buildings. Manzil handles the routine so you
              only step in when it matters.
            </p>
          </div>

          <div className="relative space-y-5">
            <div
              className="hidden sm:block absolute left-[76px] top-6 bottom-6 w-px bg-[#DCD6EB]"
              aria-hidden="true"
            />

            {DAY_TIMELINE.map((item) => (
              <div
                key={item.time}
                className="grid grid-cols-1 sm:grid-cols-[64px_24px_1fr] gap-2 sm:gap-3 items-start"
              >
                <div className="pt-0 sm:pt-5 text-sm font-bold font-mono tabular-nums text-[#2D1F4E]">
                  {item.time}
                </div>

                <div className="hidden sm:flex justify-center pt-6 relative z-10">
                  <span className="w-3 h-3 rounded-full bg-[#44326B] ring-4 ring-[#EFEBF8]" />
                </div>

                <div className="bg-white border border-[#E6E1F0] rounded-2xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(45,31,78,0.03)]">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded border ${
                      TIMELINE_TAG_STYLES[item.tone]
                    }`}
                  >
                    {item.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#171226]">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-[#57526B]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'trial' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <span>Start 14-day free trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section (Option 2 Light Architectural Step Cards) */}
      <section id="how" className="bg-white py-16 sm:py-24 border-b border-[#EAE6F3]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[600px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
              HOW IT WORKS
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226]">
              Get started in 3 simple steps
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className={`rounded-2xl p-7 flex flex-col justify-between border ${
                  idx === 2
                    ? 'bg-[#2D1F4E] text-white border-[#2D1F4E] shadow-[0_14px_34px_rgba(45,31,78,0.16)]'
                    : 'bg-[#FAF9FD] text-[#171226] border-[#E6E1F0]'
                }`}
              >
                <div>
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-xl font-mono text-xs font-bold tabular-nums ${
                      idx === 2
                        ? 'bg-white text-[#2D1F4E]'
                        : 'bg-[#2D1F4E] text-white'
                    }`}
                  >
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                  <p
                    className={`mt-2.5 text-sm leading-relaxed ${
                      idx === 2 ? 'text-[#DED8EE]' : 'text-[#57526B]'
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
