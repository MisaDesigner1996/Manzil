import { useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  FileCheck2,
  KeyRound,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
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

const ROLE_ICONS = [KeyRound, Building2, TrendingUp];

export function Option4WhoItsFor({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = ROLES[activeIndex];

  return (
    /* Stric-inspired "Quatro produtos" Horizontal Column Tabbed Architectural Block */
    <section id="who" className="bg-[#08080D] py-16 sm:py-24 border-b border-[#1E1C2C]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#232035] bg-[#0D0C14] overflow-hidden">
          {/* Architectural Split Header */}
          <div className="p-7 sm:p-11 border-b border-[#1E1C2C] grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9B8CC4]">
                WHO IT&apos;S FOR
              </p>
              <h2 className="mt-2.5 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA] text-balance">
                Made for the way you manage
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-[#A8A1BF] leading-relaxed">
                Whether you own a few units or run hundreds for other people, pick your role to see
                how Manzil fits.
              </p>
            </div>
          </div>

          {/* Horizontal Hairline-Divided Role Selector Tabs */}
          <div
            role="tablist"
            aria-label="Choose your role"
            className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E1C2C] border-b border-[#1E1C2C]"
          >
            {ROLES.map((role, idx) => {
              const selected = activeIndex === idx;
              const Icon = ROLE_ICONS[idx % ROLE_ICONS.length];
              return (
                <button
                  key={role.tabLabel}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative text-left p-6 sm:p-7 transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#17132A] text-white'
                      : 'bg-[#0D0C14] text-[#D8D3EA] hover:bg-[#12101D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                        selected
                          ? 'bg-[#5D488F] border-[#8E7CC2] text-white'
                          : 'bg-[#151322] border-[#262338] text-[#9B8CC4]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-base font-bold">{role.tabLabel}</span>
                  </div>
                  <p className="mt-2.5 text-xs text-[#9E96B8] line-clamp-2">{role.description}</p>
                  {selected && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 inset-x-0 h-[2px] bg-[#9B8CC4]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Split Showcase Area */}
          <div role="tabpanel" className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Live Telemetry Stage */}
            <div className="lg:col-span-6 p-6 sm:p-10 bg-[radial-gradient(circle_at_top_left,#251B47_0%,#110E1E_60%,#0B0A12_100%)] border-b lg:border-b-0 lg:border-r border-[#1E1C2C] flex flex-col justify-center">
              <div className="rounded-2xl bg-[#0D0C16]/95 border border-[#2C2744] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#9B8CC4] mb-4">
                  {current.cardHeader}
                </div>

                <div className="space-y-3">
                  {current.rows.map((row) => (
                    <div
                      key={row.title}
                      className="p-3.5 rounded-xl border border-[#232036] bg-[#141221] flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-[#F5F4F8] truncate">
                          {row.title}
                        </div>
                        <div className="text-xs text-[#9790B0] mt-0.5 truncate">{row.subtitle}</div>
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

            {/* Right Role Summary + Bullets + CTAs */}
            <div className="lg:col-span-6 p-7 sm:p-11 flex flex-col justify-between bg-[#0B0A12]">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
                  {current.tabLabel}
                </p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#F7F6FA]">
                  {current.heading}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#A8A1BF] leading-relaxed">
                  {current.description}
                </p>

                <ul className="mt-6 grid grid-cols-1 gap-3">
                  {current.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm text-[#ECE9F6] font-medium"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-md bg-[#231B3C] border border-[#44326B] text-[#C4B9E3] flex items-center justify-center shrink-0">
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
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#5D488F] hover:bg-[#6E57A6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Start 14-day free trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                  className="rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#EAE6F6] bg-[#141220] border border-[#2C2840] hover:border-[#7A6B9C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request a demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Option4ChallengeAndFeatures() {
  const [selectedPain, setSelectedPain] = useState<number>(0);

  return (
    /* Stric-inspired Signature Deep Indigo-Obsidian Showcase Band */
    <div className="bg-[#110D22] border-b border-[#29214A] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(124,102,220,0.22)_0%,transparent_70%)] pointer-events-none"
      />

      {/* The Challenge */}
      <section className="relative z-10 py-16 sm:py-24 border-b border-[#241E40]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#B8A7EB]">
                THE CHALLENGE
              </p>
              <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-white text-balance">
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
                          ? 'bg-[#29204B] text-white border-[#8E7CC2]'
                          : 'bg-[#16122B]/80 text-[#EAE6F6] border-[#292347] hover:border-[#6F58A8]'
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-sm font-medium line-through ${
                          active ? 'text-[#C9BFE6]' : 'text-[#8981A6]'
                        }`}
                      >
                        {pair.before}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                        <ArrowRight className="w-3.5 h-3.5 text-[#C4B9E3] shrink-0" />
                        <span>{pair.after}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6 rounded-[24px] bg-[#16122B] border border-[#2C254D] overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-[#262044]">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-white">
                  One platform. <span className="text-[#C4B9E3]">Total control.</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#262044]">
                {CHALLENGE_STATS.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`p-6 ${idx >= 2 ? 'border-t border-[#262044]' : ''}`}
                  >
                    <div className="text-3xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-base font-bold text-[#EDE9F7]">{stat.label}</div>
                    <p className="mt-1 text-xs sm:text-sm text-[#A69DC2]">{stat.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stric-inspired Bento Features Showcase */}
      <section id="features" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[660px] mx-auto">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#B8A7EB]">
              FEATURES
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-white text-balance">
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
                  } rounded-[22px] p-6 sm:p-7 flex flex-col justify-between gap-5 border transition-colors ${
                    isHighlight
                      ? 'bg-[#261C48] border-[#7A6B9C]'
                      : 'bg-[#151129]/90 border-[#282246] hover:border-[#5D488F]'
                  }`}
                >
                  {/* Signature Micro-UI Visuals in Marquee Cards (Inspired by Stric Dark Bento) */}
                  {idx === 0 ? (
                    <div className="rounded-xl bg-[#0E0B1D] border border-[#2C254D] p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <FileCheck2 className="w-4 h-4 text-[#B8A7EB]" />
                        <span className="font-mono text-xs text-[#E4DCF7]">Lease #1042.pdf</span>
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#0B291B] text-[#6CE9A6] border border-[#1A593A]">
                        Signed
                      </span>
                    </div>
                  ) : idx === 1 ? (
                    <div className="rounded-xl bg-[#0E0B1D] border border-[#2C254D] p-3.5 flex items-center justify-between gap-3 font-mono text-xs">
                      <span className="text-[#9B8CC4]">Schedule · 1st of month</span>
                      <span className="text-[#C4B9E3] font-semibold">Auto-dispatch ✓</span>
                    </div>
                  ) : idx === 7 ? (
                    <div className="rounded-xl bg-[#120D24] border border-[#44326B] p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#E4DCF7]">
                        <Sparkles className="w-4 h-4 text-[#C4B9E3]" />
                        <span>AI-assisted portfolio insights</span>
                      </div>
                      <Layers className="w-4 h-4 text-[#9B8CC4]" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center tabular-nums bg-[#1F1A3A] border border-[#352D5E] text-[#C4B9E3]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#6B6191]" aria-hidden="true" />
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isHighlight ? 'text-[#E1D8F7]' : 'text-[#A8A0C4]'
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
    </div>
  );
}
