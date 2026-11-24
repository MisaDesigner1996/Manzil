import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CURRENCY_TICKER, CurrencyCode, GCC_REGIONS, HERO_UNITS, formatMoney } from '../../data/tenantyContent';
import { ModalType } from '../Navbar';

const NAV_LINKS = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Solutions', href: '#who' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about', isAbout: true },
  { label: 'FAQ', href: '#faq' },
];

export function Option3Navbar({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
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
    <header className="sticky top-0 z-40 bg-[#09090D]/92 backdrop-blur-[14px] border-b border-white/[0.09]">
      <div className="max-w-[1220px] mx-auto px-6 h-[76px] flex items-center justify-between gap-4">
        {/* Left: Manzil Logo */}
        <a
          href="#top"
          aria-label="Manzil Home"
          className="inline-flex items-center bg-white rounded-lg px-2.5 py-1 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9B8CC4]"
        >
          <img
            src="/assets/aistudio/manzil_logo_transparent_9f6b6dbe.png"
            alt="Manzil"
            referrerPolicy="no-referrer"
            className="h-9 w-auto object-contain block"
          />
        </a>

        {/* Middle: Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-[18px] text-[14.5px] font-semibold text-[#C8C3D8]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.isAbout)}
              className="whitespace-nowrap shrink-0 px-1 py-1.5 hover:text-[#B9A8E8] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA Buttons matching Tenanty pill structure */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
            className="inline-flex items-center justify-center rounded-full px-[18px] py-[9px] text-[13.5px] font-bold text-[#F5F4F8] bg-transparent border border-[#2F2D45] hover:border-[#9B8CC4] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Demo
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'login' })}
            className="inline-flex items-center justify-center rounded-full px-[18px] py-[9px] text-[13.5px] font-bold text-[#F5F4F8] bg-transparent border border-[#2F2D45] hover:border-[#9B8CC4] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'trial' })}
            className="inline-flex items-center justify-center rounded-full px-[18px] py-[9px] text-[13.5px] font-bold text-white bg-[#5D488F] hover:bg-[#6F58A8] transition-all hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_6px_18px_rgba(93,72,143,0.38)]"
          >
            Start Free Trial
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#2F2D45] bg-[#14141D] text-white hover:border-[#9B8CC4] cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.09] bg-[#0B0B11]/98 backdrop-blur-xl px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isAbout)}
                className="px-1.5 py-3 text-base font-semibold text-[#E8E5F2] border-b border-white/[0.06] hover:text-[#B9A8E8]"
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
              className="w-full py-3 px-4 text-sm font-bold text-[#F5F4F8] bg-transparent border border-[#2F2D45] rounded-full hover:border-[#9B8CC4] cursor-pointer"
            >
              Request Demo
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'login' });
              }}
              className="w-full py-3 px-4 text-sm font-bold text-[#F5F4F8] bg-transparent border border-[#2F2D45] rounded-full hover:border-[#9B8CC4] cursor-pointer"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'trial' });
              }}
              className="w-full py-3 px-4 text-sm font-bold text-white bg-[#5D488F] hover:bg-[#6F58A8] rounded-full cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

const OPT3_STATUS_STYLES: Record<'Paid' | 'Due' | 'Overdue', string> = {
  Paid: 'text-[#6CE9A6] bg-[#0B291B]',
  Due: 'text-[#FDBA74] bg-[#2D1B09]',
  Overdue: 'text-[#FDA29B] bg-[#2E1111]',
};

export function Option3Hero({
  currency,
  onOpenModal,
}: {
  currency: CurrencyCode;
  onOpenModal: (modal: ModalType) => void;
}) {
  return (
    <section id="top" className="bg-[#09090D] pt-12 pb-[72px] border-b border-[#222130]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap items-center gap-12">
          {/* Left Hero Copy Column (exact Tenanty flex: 1 1 440px proportions & typography scale) */}
          <div className="flex-[1_1_440px] min-w-0">
            <div className="inline-block rounded-full border border-[#2B283E] bg-[#14141D] px-4 py-2 text-[12px] font-bold tracking-[0.16em] text-[#B9A8E8]">
              PROPERTY MANAGEMENT SOFTWARE · GCC AND BEYOND
            </div>

            <h1 className="mt-6 text-[clamp(36px,5.4vw,62px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#F7F6FA] text-balance">
              Smarter Property Management.{' '}
              <span className="text-[#9B8CC4]">Powered by AI.</span>
            </h1>

            <h2 className="mt-[18px] text-[clamp(20px,2.3vw,27px)] font-bold leading-[1.25] tracking-[-0.01em] text-[#F7F6FA]">
              Manage every property. <span className="text-[#9B8CC4]">In any currency.</span>
            </h2>

            <p className="mt-[18px] text-[19px] leading-[1.5] text-[#B8B3CA] max-w-[540px]">
              Invoices, leases, tenants and maintenance in one place, for landlords and property
              managers across the GCC and beyond. Set up your own portfolio in minutes.
            </p>

            {/* Primary Pill CTAs */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'trial' })}
                className="inline-flex items-center justify-center rounded-full px-7 py-[15px] text-[15px] font-bold text-white bg-[#5D488F] hover:bg-[#6F58A8] transition-transform hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_12px_28px_rgba(93,72,143,0.35)]"
              >
                Start 14-day free trial
              </button>

              <button
                type="button"
                onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                className="inline-flex items-center justify-center rounded-full px-7 py-[15px] text-[15px] font-semibold text-[#F7F6FA] bg-transparent border border-[#322F47] hover:border-[#9B8CC4] transition-transform hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request a demo
              </button>
            </div>

            {/* Bottom Unboxed Metadata Row */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[#8F89A8]">
              <span>No credit card required</span>
              <span>All features on every plan</span>
              <span>Yearly plans: 2 months free</span>
            </div>
          </div>

          {/* Right Column: Exact Tenanty hcard Portfolio Overview Visual adapted to Dark Theme */}
          <div className="flex-[1_1_400px] min-w-0">
            <div className="relative my-5 sm:my-0">
              {/* Top-Right Floating Chip */}
              <div className="absolute -top-[18px] right-[18px] z-10 inline-flex items-center gap-2 bg-[#F2EFF9] text-[#22193B] text-[13px] font-bold px-3.5 py-2.5 rounded-[14px] shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
                <span className="w-2 h-2 rounded-full bg-[#44326B] block shrink-0" aria-hidden="true" />
                <span>Payment received</span>
              </div>

              {/* Bottom-Left Floating Chip */}
              <div className="absolute -bottom-[18px] left-[18px] z-10 inline-flex items-center gap-2 bg-[#F2EFF9] text-[#22193B] text-[13px] font-bold px-3.5 py-2.5 rounded-[14px] shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
                <span className="w-2 h-2 rounded-full bg-[#5D488F] block shrink-0" aria-hidden="true" />
                <span>Lease signed</span>
              </div>

              {/* Portfolio Overview Card */}
              <div className="rounded-[24px] p-6 bg-[#13131C] border border-[#2C2A3F] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-[17px] font-bold text-[#F7F6FA]">
                    Portfolio overview
                  </strong>
                  <span className="text-[12px] text-[#8F89A8] font-mono tabular-nums">
                    Sample data · {currency}
                  </span>
                </div>

                {/* KPI Donut + Collected this month + Sparkline */}
                <div className="mt-[18px]">
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-5">
                    <div className="relative w-[92px] h-[92px] shrink-0 flex items-center justify-center">
                      <svg
                        width="92"
                        height="92"
                        viewBox="0 0 80 80"
                        className="-rotate-90"
                        aria-hidden="true"
                      >
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="none"
                          stroke="#252338"
                          strokeWidth="9"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          fill="none"
                          stroke="#9B8CC4"
                          strokeWidth="9"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 34}
                          strokeDashoffset={2 * Math.PI * 34 * (1 - 0.73)}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
                        <span className="text-[18px] font-extrabold text-[#F7F6FA] font-mono tabular-nums">
                          73%
                        </span>
                        <small className="text-[10px] font-semibold text-[#8F89A8]">
                          occupied
                        </small>
                      </div>
                    </div>

                    <div className="flex-1 min-w-[150px]">
                      <div className="text-[12px] text-[#8F89A8]">Collected this month</div>
                      <div className="text-[28px] font-extrabold tracking-[-0.02em] text-[#B9A8E8] font-mono tabular-nums leading-tight">
                        {formatMoney(4200, currency)}
                      </div>
                      <svg
                        viewBox="0 0 160 36"
                        width="100%"
                        height="36"
                        className="mt-1 overflow-visible"
                        aria-hidden="true"
                      >
                        <path
                          d="M0 30 L18 26 L36 28 L54 20 L72 22 L90 14 L108 16 L126 8 L144 10 L160 3"
                          fill="none"
                          stroke="#9B8CC4"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Mini Collection Pills Strip */}
                  <div className="mt-3.5 flex flex-wrap gap-2 text-[12px] font-bold tabular-nums">
                    <span className="px-2.5 py-1 rounded-full bg-[#0B291B] text-[#6CE9A6]">
                      91% collected
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#2D1B09] text-[#FDBA74]">
                      Pending {formatMoney(250, currency)}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#2E1111] text-[#FDA29B]">
                      Overdue {formatMoney(150, currency)}
                    </span>
                  </div>
                </div>

                {/* Unit Status Rows */}
                <div className="mt-3.5">
                  {HERO_UNITS.map((row) => (
                    <div
                      key={row.unit}
                      className="flex items-center justify-between gap-3 py-[13px] px-1 border-t border-[#242236] text-[14px]"
                    >
                      <span className="font-medium text-[#F5F4F8] truncate">{row.unit}</span>
                      <span className="flex items-center gap-3 shrink-0">
                        <span className="text-[#B8B3CA] font-mono tabular-nums">
                          {formatMoney(row.amountBhd, currency)}
                        </span>
                        <span
                          className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${OPT3_STATUS_STYLES[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </span>
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

export function Option3Region({
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
    <section id="gcc" className="bg-[#0E0E15] py-14 sm:py-16 border-b border-[#222130]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#9B8CC4]">
              ACROSS THE REGION
            </p>
            <h2 className="mt-2.5 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-[#F7F6FA] text-balance">
              <span>Built for </span>
              <span className="text-[#B9A8E8] inline-block transition-opacity duration-200">
                {GCC_REGIONS[regionIdx]}
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#B8B3CA] max-w-[520px]">
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
                    className="px-3.5 py-2 text-xs font-medium text-[#8F89A8] font-mono"
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
                      ? 'bg-[#5D488F] text-white border-[#7A6B9C]'
                      : 'bg-[#151520] text-[#E6E2F3] border-[#2B293C] hover:border-[#7A6B9C] hover:bg-[#1D1C2B]'
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
