import { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import {
  CHALLENGE_PAIRS,
  CHALLENGE_STATS,
  FEATURES_LIST,
  ROLES,
} from '../../data/tenantyContent';
import { ModalType } from '../Navbar';

const BADGE_STYLES = {
  paid: 'text-[#157F4D] bg-[#ECFDF3] border-[#ABEFC6]',
  warn: 'text-[#A15C07] bg-[#FEF7E6] border-[#FDE68A]',
  info: 'text-[#44326B] bg-[#F4F1FA] border-[#DCD6EB]',
  danger: 'text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]',
};

export function Option1WhoItsFor({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = ROLES[activeIndex];

  return (
    <section id="who" className="bg-[#0B0A10] text-white py-16 sm:py-24 border-b border-[#221D33]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[640px] mx-auto">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#B9AED6]">
            WHO IT&apos;S FOR
          </p>
          <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.6vw,2.9rem)] font-bold tracking-[-0.02em] text-white text-balance">
            Made for the way you manage
          </h2>
          <p className="mt-3 text-base text-[#C9BEE6]">
            Whether you own a few units or run hundreds for other people, pick your role to see how
            Manzil fits.
          </p>
        </div>

        {/* Horizontal Role Switcher Tabs */}
        <div
          role="tablist"
          aria-label="Choose your role"
          className="mt-9 flex flex-wrap justify-center gap-2.5"
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
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                  selected
                    ? 'bg-white text-[#0B0A10] border-white'
                    : 'bg-[#13111B] text-[#C9BEE6] border-[#2C2642] hover:border-[#7A6B9C] hover:text-white'
                }`}
              >
                {role.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Obsidian Left Panel + Crisp White Right Preview Card */}
        <div
          role="tabpanel"
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          <div className="lg:col-span-6 bg-[#13111B] border border-[#2C2642] rounded-2xl p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                {current.heading}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#C9BEE6] leading-relaxed">
                {current.description}
              </p>

              <ul className="mt-6 space-y-3.5">
                {current.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-[#EFEBF8]">
                    <span className="mt-0.5 w-5 h-5 rounded-md bg-[#44326B] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'trial' })}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#0B0A10] bg-white hover:bg-[#EFEBF8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Start 14-day free trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-transparent border border-[#44326B] hover:border-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request a demo
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white text-[#0B0A10] rounded-2xl p-6 sm:p-8 flex flex-col justify-center">
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#44326B] pb-3 border-b border-[#EFEBF7]">
              {current.cardHeader}
            </div>

            <div className="mt-4 space-y-3">
              {current.rows.map((row) => (
                <div
                  key={row.title}
                  className="p-4 rounded-xl border border-[#E7E5EF] bg-[#F8F8FB] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-[#0B0A10] truncate">{row.title}</div>
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
    </section>
  );
}

export function Option1ChallengeAndFeatures() {
  const [selectedPain, setSelectedPain] = useState(0);

  return (
    <>
      {/* The Challenge */}
      <section className="bg-[#F8F8FB] py-16 sm:py-24 border-b border-[#E7E5EF]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              THE CHALLENGE
            </p>
            <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10] text-balance">
              Spreadsheets don&apos;t scale. Manzil does.
            </h2>
          </div>

          <div className="mt-10 max-w-[820px] mx-auto space-y-2.5">
            {CHALLENGE_PAIRS.map((pair, idx) => {
              const active = selectedPain === idx;
              return (
                <button
                  key={pair.before}
                  type="button"
                  onClick={() => setSelectedPain(idx)}
                  aria-pressed={active}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all cursor-pointer flex flex-wrap items-center justify-between gap-3 ${
                    active
                      ? 'bg-[#0B0A10] text-white border-[#0B0A10] shadow-sm'
                      : 'bg-white text-[#0B0A10] border-[#E7E5EF] hover:border-[#44326B]'
                  }`}
                >
                  <span
                    className={`text-sm font-medium line-through ${
                      active ? 'text-[#A89CC8]' : 'text-[#7A6B9C]'
                    }`}
                  >
                    {pair.before}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 ${
                        active ? 'text-[#C9BEE6]' : 'text-[#44326B]'
                      }`}
                    />
                    <span>{pair.after}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* One platform. Total control. */}
          <div className="mt-14 pt-12 border-t border-[#E7E5EF]">
            <h3 className="font-editorial text-center text-2xl sm:text-3xl font-bold text-[#0B0A10]">
              One platform. <span className="italic text-[#44326B]">Total control.</span>
            </h3>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CHALLENGE_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-[#E7E5EF] rounded-xl p-6 text-left"
                >
                  <div className="text-3xl font-extrabold tracking-tight text-[#0B0A10] font-mono tabular-nums">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-base font-bold text-[#0B0A10]">{stat.label}</div>
                  <p className="mt-1 text-xs sm:text-sm text-[#57526B]">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-white py-16 sm:py-24 border-b border-[#E7E5EF]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              FEATURES
            </p>
            <h2 className="font-editorial mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10] text-balance">
              Everything you need to run your portfolio
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES_LIST.map((feat, idx) => {
              const isHighlight = idx === 7;
              return (
                <div
                  key={feat.title}
                  className={`rounded-xl p-6 transition-colors flex flex-col justify-between gap-4 border ${
                    isHighlight
                      ? 'bg-[#0B0A10] text-white border-[#0B0A10]'
                      : 'bg-[#F8F8FB] text-[#0B0A10] border-[#E7E5EF] hover:border-[#44326B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md tabular-nums ${
                        isHighlight
                          ? 'bg-[#44326B] text-white'
                          : 'bg-white border border-[#E7E5EF] text-[#0B0A10]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {isHighlight && (
                      <Sparkles className="w-4 h-4 text-[#C9BEE6]" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{feat.title}</h3>
                    <p
                      className={`mt-1.5 text-sm leading-relaxed ${
                        isHighlight ? 'text-[#C9BEE6]' : 'text-[#4A465C]'
                      }`}
                    >
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
