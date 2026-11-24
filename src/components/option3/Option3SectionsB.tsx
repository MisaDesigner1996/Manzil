import { useState } from 'react';
import { ArrowRight, Check, ChevronRight, Sparkles } from 'lucide-react';
import {
  CHALLENGE_PAIRS,
  CHALLENGE_STATS,
  FEATURES_LIST,
  ROLES,
} from '../../data/tenantyContent';
import { ModalType } from '../Navbar';

const DARK_BADGE_STYLES = {
  paid: 'text-[#6CE9A6] bg-[#0B291B] border-[#1A593A]',
  warn: 'text-[#FDBA74] bg-[#2D1B09] border-[#5E3811]',
  info: 'text-[#C4B9E3] bg-[#201A36] border-[#3F3366]',
  danger: 'text-[#FDA29B] bg-[#2E1111] border-[#612121]',
};

export function Option3WhoItsFor({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = ROLES[activeIndex];

  return (
    <section id="who" className="bg-[#0C0C12] py-16 sm:py-24 border-b border-[#222130]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[640px]">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
            WHO IT&apos;S FOR
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA] text-balance">
            Made for the way you manage
          </h2>
          <p className="mt-3 text-base text-[#B8B3CA]">
            Whether you own a few units or run hundreds for other people, pick your role to see how
            Manzil fits.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
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
                      ? 'bg-[#261D40] text-white border-[#6F58A8] shadow-[0_12px_28px_rgba(0,0,0,0.35)]'
                      : 'bg-[#14141D] text-[#E8E5F2] border-[#262535] hover:border-[#5D488F]'
                  }`}
                >
                  <div>
                    <div className="text-base font-bold">{role.tabLabel}</div>
                    <div
                      className={`mt-1 text-xs line-clamp-2 ${
                        selected ? 'text-[#D6CEE9]' : 'text-[#9A94B0]'
                      }`}
                    >
                      {role.description}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${selected ? 'text-white' : 'text-[#8F89A8]'}`}
                  />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            className="lg:col-span-8 bg-[#14141D] border border-[#262535] rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
          >
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#F7F6FA]">
                  {current.heading}
                </h3>
                <p className="mt-2.5 text-sm text-[#B8B3CA] leading-relaxed">
                  {current.description}
                </p>

                <ul className="mt-5 space-y-3">
                  {current.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-[#EAE6F6] font-medium"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-[#2A2047] border border-[#44326B] text-[#C4B9E3] flex items-center justify-center shrink-0">
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
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#5D488F] hover:bg-[#6F58A8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Start 14-day free trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                  className="px-4 py-2.5 text-xs font-semibold text-[#E8E5F2] bg-[#1B1A28] border border-[#2F2D45] hover:border-[#7A6B9C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request a demo
                </button>
              </div>
            </div>

            <div className="md:col-span-6 bg-[#0F0F17] border border-[#242234] rounded-2xl p-5 flex flex-col justify-center">
              <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9B8CC4] mb-3.5">
                {current.cardHeader}
              </div>

              <div className="space-y-2.5">
                {current.rows.map((row) => (
                  <div
                    key={row.title}
                    className="p-3.5 rounded-xl border border-[#262535] bg-[#171722] flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-[#F5F4F8] truncate">
                        {row.title}
                      </div>
                      <div className="text-xs text-[#9A94B0] mt-0.5 truncate">{row.subtitle}</div>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded border whitespace-nowrap shrink-0 ${DARK_BADGE_STYLES[row.tone]}`}
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

export function Option3ChallengeAndFeatures() {
  const [selectedPain, setSelectedPain] = useState<number>(0);

  return (
    <>
      {/* The Challenge — Dark Theme Interactive Comparison */}
      <section className="bg-[#09090D] py-16 sm:py-24 border-b border-[#222130]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
                THE CHALLENGE
              </p>
              <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA] text-balance">
                Spreadsheets don&apos;t scale. Manzil does.
              </h2>

              <div className="mt-7 space-y-2.5">
                {CHALLENGE_PAIRS.map((pair, idx) => {
                  const active = selectedPain === idx;
                  return (
                    <button
                      key={pair.before}
                      type="button"
                      onClick={() => setSelectedPain(idx)}
                      aria-pressed={active}
                      className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all cursor-pointer flex flex-wrap items-center justify-between gap-3 ${
                        active
                          ? 'bg-[#261D40] text-white border-[#6F58A8]'
                          : 'bg-[#13131C] text-[#EAE6F6] border-[#252436] hover:border-[#5D488F]'
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-sm font-medium line-through ${
                          active ? 'text-[#B5A8D9]' : 'text-[#7F7899]'
                        }`}
                      >
                        {pair.before}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                        <ArrowRight
                          className={`w-3.5 h-3.5 shrink-0 ${
                            active ? 'text-[#D8CFF0]' : 'text-[#9B8CC4]'
                          }`}
                        />
                        <span>{pair.after}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#13131C] border border-[#262535] rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#F7F6FA]">
                One platform. <span className="text-[#A896D8]">Total control.</span>
              </h3>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CHALLENGE_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#191925] border border-[#2A283D] rounded-2xl p-5 text-left"
                  >
                    <div className="text-3xl font-extrabold tracking-tight text-[#C4B9E3] font-mono tabular-nums">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-base font-bold text-[#F7F6FA]">{stat.label}</div>
                    <p className="mt-1 text-xs sm:text-sm text-[#9A94B0]">{stat.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid — Dark Theme */}
      <section id="features" className="bg-[#0E0E15] py-16 sm:py-24 border-b border-[#222130]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
              FEATURES
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA] text-balance">
              Everything you need to run your portfolio
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {FEATURES_LIST.map((feat, idx) => {
              const isWide = idx === 0 || idx === 1 || idx === 7;
              const isHighlight = idx === 7;
              return (
                <div
                  key={feat.title}
                  className={`${
                    isWide ? 'lg:col-span-3' : 'lg:col-span-2'
                  } rounded-2xl p-6 transition-colors flex flex-col justify-between gap-4 border ${
                    isHighlight
                      ? 'bg-[#221A3B] text-white border-[#6F58A8]'
                      : 'bg-[#14141D] text-[#F7F6FA] border-[#262535] hover:border-[#5D488F]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-9 h-9 rounded-xl font-mono text-xs font-bold flex items-center justify-center tabular-nums ${
                        isHighlight
                          ? 'bg-[#5D488F] text-white'
                          : 'bg-[#1E1C2B] border border-[#34304B] text-[#C4B9E3]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {isHighlight && (
                      <Sparkles className="w-4 h-4 text-[#D8CFF0]" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                    <p
                      className={`mt-1.5 text-sm leading-relaxed ${
                        isHighlight ? 'text-[#DDD5F3]' : 'text-[#A8A2BF]'
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
