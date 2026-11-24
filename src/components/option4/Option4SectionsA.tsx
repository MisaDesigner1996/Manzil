import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, FileSignature, Menu, X } from 'lucide-react';
import {
  CURRENCY_TICKER,
  CurrencyCode,
  GCC_REGIONS,
  HERO_UNITS,
  formatMoney,
} from '../../data/tenantyContent';
import { ModalType } from '../Navbar';

const NAV_LINKS = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Solutions', href: '#who' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about', isAbout: true },
  { label: 'FAQ', href: '#faq' },
];

export function Option4Navbar({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isAbout?: boolean
  ) => {
    setMobileOpen(false);
    if (isAbout) {
      e.preventDefault();
      onOpenModal({ type: 'about' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#08080D]/90 backdrop-blur-md border-b border-[#1E1C2C]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between gap-6">
        {/* Left: Transparent Manzil Cloud Tower Logo (no box or container background) */}
        <a
          href="#top"
          aria-label="Manzil Home"
          className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9B8CC4]"
        >
          <img
            src="/assets/aistudio/Manzil_Cloud_Tower_Logo_4c2259f1.png"
            alt="Manzil"
            referrerPolicy="no-referrer"
            className="h-[52px] sm:h-14 w-auto object-contain block"
          />
        </a>

        {/* Middle: Clean Architectural Single-Line Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[#A9A2C0]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.isAbout)}
              className="whitespace-nowrap shrink-0 py-1.5 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Quiet Actions + Stric-style Rounded Pill Primary CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
            className="px-3 py-2 text-[13px] font-medium text-[#C8C2DC] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Demo
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'login' })}
            className="px-4 py-2 text-[13px] font-semibold text-[#F4F2FA] rounded-full border border-[#2C2840] hover:border-[#7A6B9C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'trial' })}
            className="inline-flex items-center gap-2 rounded-full pl-5 pr-3.5 py-2 text-[13px] font-semibold text-white bg-[#5D488F] hover:bg-[#6E57A6] transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[0_8px_24px_rgba(93,72,143,0.4)]"
          >
            <span>Start Free Trial</span>
            <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#2B273F] bg-[#12111B] text-white hover:border-[#9B8CC4] cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#1E1C2C] bg-[#0A0910]/98 backdrop-blur-xl px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isAbout)}
                className="px-1.5 py-3 text-base font-medium text-[#E8E5F2] border-b border-[#1A1826] hover:text-[#B8A7EB]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'demo', preset: 'standard' });
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-[#F5F4F8] bg-transparent border border-[#2C2840] rounded-full hover:border-[#9B8CC4] cursor-pointer"
            >
              Request Demo
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'login' });
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-[#F5F4F8] bg-transparent border border-[#2C2840] rounded-full hover:border-[#9B8CC4] cursor-pointer"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'trial' });
              }}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#5D488F] hover:bg-[#6E57A6] rounded-full cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

const OPT4_STATUS_BADGE: Record<'Paid' | 'Due' | 'Overdue', string> = {
  Paid: 'text-[#6CE9A6] bg-[#0B291B] border-[#184F34]',
  Due: 'text-[#FDBA74] bg-[#2D1B09] border-[#593510]',
  Overdue: 'text-[#FDA29B] bg-[#2E1111] border-[#5C2020]',
};

const HERO_BAR_DATA = [44, 62, 54, 78, 69, 86, 94];

export function Option4Hero({
  currency,
  onOpenModal,
}: {
  currency: CurrencyCode;
  onOpenModal: (modal: ModalType) => void;
}) {
  return (
    <section
      id="top"
      className="bg-[#08080D] pt-6 sm:pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-b border-[#1E1C2C]"
    >
      <div className="max-w-[1240px] mx-auto rounded-[28px] border border-[#232035] bg-[#0D0C14] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Architectural Copy Zone */}
          <div className="lg:col-span-6 p-7 sm:p-11 lg:p-14 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#B8A7EB]">
                PROPERTY MANAGEMENT SOFTWARE · GCC AND BEYOND
              </div>

              <h1 className="mt-5 text-[clamp(2.25rem,4.3vw,3.65rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-[#F7F6FA] text-balance">
                Smarter Property Management.{' '}
                <span className="text-[#9B8CC4]">Powered by AI.</span>
              </h1>

              <h2 className="mt-4 text-[clamp(1.2rem,2vw,1.6rem)] font-bold leading-[1.3] tracking-[-0.015em] text-[#ECE9F6]">
                Manage every property. <span className="text-[#B8A7EB]">In any currency.</span>
              </h2>

              <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.6] text-[#A8A1BF] max-w-[500px]">
                Invoices, leases, tenants and maintenance in one place, for landlords and property
                managers across the GCC and beyond. Set up your own portfolio in minutes.
              </p>

              {/* Signature Rounded Pill Action Row */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'trial' })}
                  className="inline-flex items-center gap-2.5 rounded-full pl-6 pr-4 py-3.5 text-[14.5px] font-semibold text-white bg-[#5D488F] hover:bg-[#6E57A6] transition-transform hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_12px_30px_rgba(93,72,143,0.42)]"
                >
                  <span>Start 14-day free trial</span>
                  <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[14.5px] font-semibold text-[#F4F2FA] bg-[#141220] border border-[#2D2942] hover:border-[#8F7EC0] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request a demo
                </button>
              </div>
            </div>

            {/* Clean Unboxed Metadata Footer */}
            <div className="mt-9 pt-6 border-t border-[#1C1A2B] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-[#8D86A6]">
              <span>No credit card required</span>
              <span aria-hidden="true">·</span>
              <span>All features on every plan</span>
              <span aria-hidden="true">·</span>
              <span>Yearly plans: 2 months free</span>
            </div>
          </div>

          {/* Right Atmospheric Deep-Violet Stage with Overlapping Mobile + Desktop Mockup (Stric Reference Motif) */}
          <div className="lg:col-span-6 relative p-6 sm:p-10 lg:p-10 bg-[radial-gradient(circle_at_75%_20%,#30225E_0%,#17122B_52%,#0B0A12_100%)] border-t lg:border-t-0 lg:border-l border-[#232035] flex items-center justify-center overflow-hidden">
            {/* Subtle Architectural Grid Hairlines */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(155,140,196,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(155,140,196,0.16) 1px, transparent 1px)',
                backgroundSize: '42px 42px',
              }}
            />

            <div className="relative z-10 w-full max-w-[540px] flex flex-col sm:block">
              {/* Desktop Portfolio Window (Right / Background Layer) */}
              <div className="sm:ml-24 rounded-2xl bg-[#110F1D]/95 border border-[#2E2948] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.65)]">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#221F35]">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9B8CC4]">
                      Portfolio overview
                    </div>
                    <div className="text-xs text-[#8D86A6] font-mono tabular-nums mt-0.5">
                      Sample data · {currency}
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <div className="text-[11px] text-[#6CE9A6] font-semibold">91% collected</div>
                  </div>
                </div>

                {/* Mini Monthly Violet Bar Chart */}
                <div className="mt-4 flex items-end gap-2 h-20 px-1">
                  {HERO_BAR_DATA.map((pct, i) => (
                    <div
                      key={pct}
                      className="flex-1 flex flex-col items-center justify-end h-full gap-1"
                    >
                      <div
                        className={`w-full rounded-t-md ${
                          i === HERO_BAR_DATA.length - 1
                            ? 'bg-gradient-to-t from-[#5D488F] to-[#B8A7EB]'
                            : 'bg-[#2C244A]'
                        }`}
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Unit Ledger Rows */}
                <div className="mt-4 divide-y divide-[#1E1B2E]">
                  {HERO_UNITS.map((row) => (
                    <div
                      key={row.unit}
                      className="py-2.5 flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="font-medium text-[#ECE9F6] truncate">{row.unit}</span>
                      <span className="flex items-center gap-2.5 shrink-0">
                        <span className="font-mono tabular-nums text-[#B0A9C7]">
                          {formatMoney(row.amountBhd, currency)}
                        </span>
                        <span
                          className={`text-[10.5px] font-semibold px-2 py-0.5 rounded border ${OPT4_STATUS_BADGE[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overlapping Mobile App Card (Left Foreground Layer, echoing Stric Hero Phone) */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:left-0 sm:bottom-3 sm:w-[228px] rounded-[24px] bg-[#161326] border-2 border-[#3A3161] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
                <div className="w-12 h-1 rounded-full bg-[#332C52] mx-auto mb-3" />

                <div className="text-[11px] text-[#A8A1BF]">Collected this month</div>
                <div className="mt-0.5 text-xl font-extrabold font-mono tabular-nums text-white">
                  {formatMoney(4200, currency)}
                </div>

                {/* Occupancy Ring + Pending / Overdue */}
                <div className="mt-3.5 flex items-center gap-3 p-2.5 rounded-xl bg-[#100E1B] border border-[#25213B]">
                  <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="19"
                        fill="none"
                        stroke="#26213E"
                        strokeWidth="5"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="19"
                        fill="none"
                        stroke="#9B8CC4"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 19}
                        strokeDashoffset={2 * Math.PI * 19 * (1 - 0.73)}
                      />
                    </svg>
                    <span className="absolute text-[11px] font-bold font-mono text-white">73%</span>
                  </div>
                  <div className="min-w-0 text-[11px] space-y-0.5">
                    <div className="font-semibold text-[#E8E5F2]">73% occupied</div>
                    <div className="text-[#FDBA74] font-mono tabular-nums truncate">
                      Pending {formatMoney(250, currency)}
                    </div>
                    <div className="text-[#FDA29B] font-mono tabular-nums truncate">
                      Overdue {formatMoney(150, currency)}
                    </div>
                  </div>
                </div>

                {/* Two Live Event Confirmations */}
                <div className="mt-3 space-y-2 text-[11.5px]">
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#1D1833] border border-[#322957] text-[#EDE9F7] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6CE9A6] shrink-0" />
                    <span className="truncate">Payment received</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#1D1833] border border-[#322957] text-[#EDE9F7] font-medium">
                    <FileSignature className="w-3.5 h-3.5 text-[#B8A7EB] shrink-0" />
                    <span className="truncate">Lease signed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Option4Region({
  currency,
  onSelectCurrency,
}: {
  currency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
}) {
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
    /* Stric-style Full-Width Hairline-Divided Metric & Currency Strip */
    <section id="gcc" className="bg-[#08080D] border-b border-[#1E1C2C]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#1E1C2C] border-x border-[#1E1C2C]">
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9B8CC4]">
              ACROSS THE REGION
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-[#F7F6FA]">
              <span>Built for </span>
              <span className="text-[#B8A7EB] inline-block transition-opacity duration-200">
                {GCC_REGIONS[regionIdx]}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-3 p-6 sm:p-8 flex items-center">
            <p className="text-sm text-[#A8A1BF] leading-relaxed">
              Rent in the currency of each property. Tenants see the right amount; you see the full
              picture.
            </p>
          </div>

          <div
            className="lg:col-span-4 p-6 sm:p-8 flex flex-wrap items-center gap-2"
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
                    className="px-2.5 py-1.5 text-xs font-medium text-[#7D7696] font-mono"
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
                  className={`px-3.5 py-1.5 text-xs font-semibold font-mono rounded-full border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#5D488F] text-white border-[#8E7CC2]'
                      : 'bg-[#12111B] text-[#D8D3EA] border-[#262338] hover:border-[#7A6B9C]'
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
