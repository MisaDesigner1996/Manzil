import { useEffect, useState } from 'react';
import { CURRENCY_TICKER, CurrencyCode, GCC_REGIONS } from '../data/tenantyContent';

interface RegionSectionProps {
  currency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
}

export function RegionSection({ currency, onSelectCurrency }: RegionSectionProps) {
  const [regionIdx, setRegionIdx] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setRegionIdx(GCC_REGIONS.length - 1);
      return;
    }

    const timer = window.setInterval(() => {
      setRegionIdx((prev) => (prev + 1) % GCC_REGIONS.length);
    }, 1600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="gcc" className="bg-[#F8F7FC] py-14 sm:py-16 border-b border-[#EAE6F3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
              ACROSS THE REGION
            </p>
            <h2 className="mt-2.5 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226] text-balance">
              <span>Built for </span>
              <span className="text-[#44326B] inline-block transition-opacity duration-200">
                {GCC_REGIONS[regionIdx]}
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#57526B] max-w-[520px]">
              Rent in the currency of each property. Tenants see the right amount; you see the full
              picture.
            </p>
          </div>

          <div
            className="lg:col-span-6 flex flex-wrap lg:justify-end gap-2"
            role="group"
            aria-label="Supported currencies"
          >
            {CURRENCY_TICKER.map((item) => {
              const isSelectable = Boolean(item.selectable);
              const isActive = item.selectable === currency;

              if (!isSelectable) {
                return (
                  <span
                    key={item.label}
                    className="px-3.5 py-2 text-xs font-medium text-[#6B6480] font-mono"
                  >
                    {item.label}
                  </span>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => item.selectable && onSelectCurrency(item.selectable)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 text-xs font-semibold font-mono rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#2D1F4E] text-white border-[#2D1F4E]'
                      : 'bg-white text-[#2D1F4E] border-[#DCD6EB] hover:border-[#44326B] hover:bg-[#F3F0FA]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
