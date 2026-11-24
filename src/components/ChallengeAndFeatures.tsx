import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  CHALLENGE_PAIRS,
  CHALLENGE_STATS,
  FEATURES_LIST,
} from '../data/tenantyContent';

export function ChallengeAndFeatures() {
  const [selectedPain, setSelectedPain] = useState<number>(0);

  return (
    <>
      {/* The Challenge Section — Design Option 2 Split Composition */}
      <section className="bg-white py-16 sm:py-24 border-b border-[#EAE6F3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Heading & Interactive Pain -> Solution Rows */}
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
                THE CHALLENGE
              </p>
              <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226] text-balance">
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
                          ? 'bg-[#2D1F4E] text-white border-[#2D1F4E] shadow-sm'
                          : 'bg-[#FAF9FD] text-[#171226] border-[#E6E1F0] hover:border-[#44326B]'
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-sm font-medium line-through ${
                          active ? 'text-[#C6BCDE]' : 'text-[#7A6B9C]'
                        }`}
                      >
                        {pair.before}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                        <ArrowRight
                          className={`w-3.5 h-3.5 shrink-0 ${
                            active ? 'text-[#D8CFF0]' : 'text-[#44326B]'
                          }`}
                        />
                        <span>{pair.after}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: One platform. Total control. 2x2 Stat Grid */}
            <div className="lg:col-span-6 bg-[#F6F5FA] border border-[#EAE6F3] rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#171226]">
                One platform. <span className="text-[#44326B]">Total control.</span>
              </h3>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CHALLENGE_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-[#E6E1F0] rounded-2xl p-5 text-left"
                  >
                    <div className="text-3xl font-extrabold tracking-tight text-[#2D1F4E] font-mono tabular-nums">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-base font-bold text-[#171226]">{stat.label}</div>
                    <p className="mt-1 text-xs sm:text-sm text-[#57526B]">{stat.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section — Asymmetric Architectural Bento Grid */}
      <section id="features" className="bg-[#F8F7FC] py-16 sm:py-24 border-b border-[#EAE6F3]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-[640px] mx-auto">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
              FEATURES
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226] text-balance">
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
                      ? 'bg-[#2D1F4E] text-white border-[#2D1F4E] shadow-[0_14px_34px_rgba(45,31,78,0.16)]'
                      : 'bg-white text-[#171226] border-[#E6E1F0] hover:border-[#44326B]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-9 h-9 rounded-xl font-mono text-xs font-bold flex items-center justify-center tabular-nums ${
                        isHighlight
                          ? 'bg-[#44326B] text-white'
                          : 'bg-[#F3F0FA] border border-[#E4DFF1] text-[#2D1F4E]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {isHighlight && (
                      <Sparkles className="w-4 h-4 text-[#D8CFF0]" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{feat.title}</h3>
                    <p
                      className={`mt-1.5 text-sm leading-relaxed ${
                        isHighlight ? 'text-[#DED8EE]' : 'text-[#57526B]'
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
