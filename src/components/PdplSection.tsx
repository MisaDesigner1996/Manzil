import { useState } from 'react';
import { ShieldCheck, Plus, Minus } from 'lucide-react';
import { PDPL_PRINCIPLES } from '../data/tenantyContent';

export function PdplSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="pdpl" className="bg-[#F8F7FC] py-16 sm:py-24 border-b border-[#EAE6F3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left: PDPL Intro + 6 Expandable Principles */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A6B9C]">
              DATA PROTECTION · BAHRAIN PDPL
            </p>
            <h2 className="mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#171226] text-balance">
              Built around Bahrain&apos;s Personal Data Protection Law (PDPL)
            </h2>
            <p className="mt-3.5 text-base text-[#57526B] max-w-[580px] leading-relaxed">
              With role-based access, audit logs and encrypted invoice links. Each
              organization&apos;s data is separated from every other organization&apos;s.
            </p>

            {/* Six Expandable PDPL Principles */}
            <div className="mt-8 bg-white border border-[#E6E1F0] rounded-2xl divide-y divide-[#EFEBF7] px-5 sm:px-6">
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
                        <span className="font-mono text-xs font-bold text-[#44326B] bg-[#F3F0FA] border border-[#E4DFF1] rounded-md px-2 py-1 shrink-0 tabular-nums">
                          {item.number}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-[#171226] group-hover:text-[#44326B] transition-colors truncate">
                          {item.title}
                        </span>
                      </div>
                      <span className="w-7 h-7 rounded-lg bg-[#FAF9FD] border border-[#E4DFF1] text-[#2D1F4E] flex items-center justify-center shrink-0">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-4 pl-11 pr-4 text-sm text-[#57526B] leading-relaxed">
                        {item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Editorial Residential Interior Photography */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[340px] rounded-3xl overflow-hidden border border-[#E6E1F0] bg-[#ECE7F6] shadow-[0_16px_44px_rgba(45,31,78,0.08)]">
              {!imgError ? (
                <img
                  src="/src/assets/images/manzil_pdpl_interior_1795531180719.jpg"
                  alt="Sunlit residential interior protected under Manzil PDPL standards"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center lg:absolute lg:inset-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#2D1F4E]">
                  <ShieldCheck className="w-12 h-12 mb-3 text-[#44326B]" />
                  <p className="text-sm font-semibold">
                    Law No. 30 of 2018 · Personal Data Protection Law
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1438]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D8CFF0]">
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
