import { useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, FileSignature } from 'lucide-react';
import { CurrencyCode, HERO_UNITS, formatMoney } from '../data/tenantyContent';
import { ModalType } from './Navbar';

interface HeroSectionProps {
  currency: CurrencyCode;
  onOpenModal: (modal: ModalType) => void;
}

const STATUS_STYLES: Record<'Paid' | 'Due' | 'Overdue', string> = {
  Paid: 'text-[#157F4D] bg-[#ECFDF3] border-[#ABEFC6]',
  Due: 'text-[#A15C07] bg-[#FEF7E6] border-[#FDE68A]',
  Overdue: 'text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]',
};

export function HeroSection({ currency, onOpenModal }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="bg-white pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-[#EAE6F3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-6">
            <div className="inline-block border border-[#E4DFF1] bg-[#F8F7FC] rounded-lg px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#44326B]">
              PROPERTY MANAGEMENT SOFTWARE · GCC AND BEYOND
            </div>

            <h1 className="mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-extrabold leading-[1.07] tracking-[-0.03em] text-[#171226] text-balance">
              Smarter Property Management.{' '}
              <span className="text-[#44326B]">Powered by AI.</span>
            </h1>

            <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-[-0.015em] text-[#2D1F4E]">
              Manage every property. <span className="text-[#7A6B9C]">In any currency.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#57526B] max-w-[540px]">
              Invoices, leases, tenants and maintenance in one place, for landlords and property
              managers across the GCC and beyond. Set up your own portfolio in minutes.
            </p>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'trial' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
              >
                <span>Start 14-day free trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#2D1F4E] bg-white border border-[#DCD6EB] hover:border-[#44326B] hover:bg-[#F8F7FC] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request a demo
              </button>
            </div>

            {/* Clean Unboxed Metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#6B6480]">
              <span>No credit card required</span>
              <span aria-hidden="true">·</span>
              <span>All features on every plan</span>
              <span aria-hidden="true">·</span>
              <span>Yearly plans: 2 months free</span>
            </div>
          </div>

          {/* Right Design Option 2 Architectural Backdrop + Live Portfolio Overview Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E6E1F0] bg-[#F4F1FA] p-4 sm:p-6">
              {/* Architectural Tower Backdrop */}
              <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-[#3C2B66] to-[#7A6B9C]">
                {!imgError ? (
                  <img
                    src="/src/assets/images/manzil_hero_architecture_1795531180457.jpg"
                    alt="Modern residential tower managed with Manzil"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/80">
                    <Building2 className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1438]/75 via-[#2D1F4E]/25 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/95 text-[#171226] text-xs font-semibold shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#157F4D]" />
                    <span>Payment received</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2D1F4E]/95 text-white text-xs font-semibold shadow-sm border border-white/15">
                    <FileSignature className="w-3.5 h-3.5 text-[#D8CFF0]" />
                    <span>Lease signed</span>
                  </span>
                </div>
              </div>

              {/* Portfolio Overview Card */}
              <div className="bg-white border border-[#E6E1F0] rounded-2xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(45,31,78,0.06)]">
                <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#EFEBF7]">
                  <span className="text-sm sm:text-base font-bold text-[#171226]">
                    Portfolio overview
                  </span>
                  <span className="text-xs font-medium text-[#6B6480] font-mono tabular-nums">
                    Sample data · {currency}
                  </span>
                </div>

                {/* Occupancy Ring + Collected Metric */}
                <div className="mt-4 flex flex-wrap sm:flex-nowrap items-center gap-5">
                  <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                      <circle
                        cx="40"
                        cy="40"
                        r="33"
                        fill="none"
                        stroke="#EFEBF8"
                        strokeWidth="7"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="33"
                        fill="none"
                        stroke="#44326B"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 33}
                        strokeDashoffset={2 * Math.PI * 33 * (1 - 0.73)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-extrabold text-[#171226] font-mono tabular-nums leading-none">
                        73%
                      </span>
                      <span className="text-[10px] font-medium text-[#6B6480] mt-1">occupied</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-[#6B6480]">Collected this month</div>
                    <div className="mt-0.5 text-2xl font-extrabold tracking-tight text-[#2D1F4E] font-mono tabular-nums">
                      {formatMoney(4200, currency)}
                    </div>
                    <svg
                      viewBox="0 0 180 30"
                      className="w-full h-7 mt-1.5 overflow-visible"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 26 L20 22 L40 24 L60 17 L80 19 L100 12 L120 14 L140 7 L160 9 L180 3"
                        fill="none"
                        stroke="#44326B"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Collection Summary Row */}
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 py-2 px-3 bg-[#FAF9FD] border border-[#ECE7F6] rounded-lg text-xs font-semibold tabular-nums">
                  <span className="text-[#157F4D]">91% collected</span>
                  <span className="text-[#A15C07]">Pending {formatMoney(250, currency)}</span>
                  <span className="text-[#B42318]">Overdue {formatMoney(150, currency)}</span>
                </div>

                {/* Unit Rows */}
                <div className="mt-3 divide-y divide-[#EFEBF7]">
                  {HERO_UNITS.map((row) => (
                    <div
                      key={row.unit}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm"
                    >
                      <span className="font-semibold text-[#171226] truncate">{row.unit}</span>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="font-mono tabular-nums text-[#57526B]">
                          {formatMoney(row.amountBhd, currency)}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${STATUS_STYLES[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
