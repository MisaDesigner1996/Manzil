import { useState } from 'react';
import { Check, ArrowRight, ChevronRight } from 'lucide-react';
import { ROLES } from '../data/tenantyContent';
import { ModalType } from './Navbar';

interface WhoItsForSectionProps {
  onOpenModal: (modal: ModalType) => void;
}

const BADGE_STYLES = {
  paid: 'text-[#157F4D] bg-[#ECFDF3] border-[#ABEFC6]',
  warn: 'text-[#A15C07] bg-[#FEF7E6] border-[#FDE68A]',
  info: 'text-[#44326B] bg-[#F4F1FA] border-[#DCD6EB]',
  danger: 'text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]',
};

export function WhoItsForSection({ onOpenModal }: WhoItsForSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = ROLES[activeIndex];

  return (
    <section id="who" className="bg-[#F8F7FC] py-16 sm:py-24 border-b border-[#EAE6F3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[640px]">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
            WHO IT&apos;S FOR
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226] text-balance">
            Made for the way you manage
          </h2>
          <p className="mt-3 text-base text-[#57526B]">
            Whether you own a few units or run hundreds for other people, pick your role to see
            how Manzil fits.
          </p>
        </div>

        {/* Design Option 2: Left Vertical Role Rail + Right Split Workspace */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Role Selector Rail */}
          <div
            role="tablist"
            aria-label="Choose your role"
            className="lg:col-span-4 flex flex-col gap-3"
          >
            {ROLES.map((role, idx) => {
              const selected = activeIndex === idx;
              return (
                <button
                  key={role.tabLabel}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    selected
                      ? 'bg-[#2D1F4E] text-white border-[#2D1F4E] shadow-[0_12px_28px_rgba(45,31,78,0.16)]'
                      : 'bg-white text-[#171226] border-[#E6E1F0] hover:border-[#44326B]'
                  }`}
                >
                  <div>
                    <div className="text-base font-bold">{role.tabLabel}</div>
                    <div
                      className={`mt-1 text-xs line-clamp-2 ${
                        selected ? 'text-[#D4CBEB]' : 'text-[#57526B]'
                      }`}
                    >
                      {role.description}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${
                      selected ? 'text-white' : 'text-[#7A6B9C]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Role Details + Live Card */}
          <div
            role="tabpanel"
            className="lg:col-span-8 bg-white border border-[#E6E1F0] rounded-3xl p-6 sm:p-8 shadow-[0_12px_36px_rgba(45,31,78,0.05)] grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
          >
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#171226]">
                  {current.heading}
                </h3>
                <p className="mt-2.5 text-sm text-[#57526B] leading-relaxed">
                  {current.description}
                </p>

                <ul className="mt-5 space-y-3">
                  {current.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-[#2D1F4E] font-medium"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-[#F3F0FA] border border-[#DCD6EB] text-[#2D1F4E] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'trial' })}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Start 14-day free trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                  className="px-4 py-2.5 text-xs font-semibold text-[#2D1F4E] bg-[#FAF9FD] border border-[#DCD6EB] hover:border-[#44326B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request a demo
                </button>
              </div>
            </div>

            <div className="md:col-span-6 bg-[#FAF9FD] border border-[#ECE7F6] rounded-2xl p-5 flex flex-col justify-center">
              <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#7A6B9C] mb-3.5">
                {current.cardHeader}
              </div>

              <div className="space-y-2.5">
                {current.rows.map((row) => (
                  <div
                    key={row.title}
                    className="p-3.5 rounded-xl border border-[#EAE6F3] bg-white flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-[#171226] truncate">
                        {row.title}
                      </div>
                      <div className="text-xs text-[#57526B] mt-0.5 truncate">{row.subtitle}</div>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded border whitespace-nowrap shrink-0 ${BADGE_STYLES[row.tone]}`}
                    >
                      {row.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
