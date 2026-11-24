import { useEffect, useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, FileSignature, Menu, X } from 'lucide-react';
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

export function Option1Navbar({ onOpenModal }: { onOpenModal: (modal: ModalType) => void }) {
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7E5EF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <a
          href="#top"
          aria-label="Manzil Home"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B0A10] rounded"
        >
          <img
            src="/assets/aistudio/manzil_logo_transparent_9f6b6dbe.png"
            alt="Manzil"
            referrerPolicy="no-referrer"
            className="h-10 w-auto object-contain"
          />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A465C]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.isAbout)}
              className="whitespace-nowrap shrink-0 hover:text-[#0B0A10] transition-colors py-1 border-b-2 border-transparent hover:border-[#44326B]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
            className="px-3.5 py-2 text-xs font-semibold text-[#0B0A10] bg-white border border-[#D8D4E6] rounded-lg hover:border-[#0B0A10] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Demo
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'login' })}
            className="px-3.5 py-2 text-xs font-semibold text-[#4A465C] hover:text-[#0B0A10] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'trial' })}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0B0A10] hover:bg-[#44326B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Start Free Trial
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E6E1F0] text-[#0B0A10] hover:bg-[#F8F8FB] cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E7E5EF] bg-white px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isAbout)}
                className="px-3 py-2.5 text-sm font-medium text-[#0B0A10] hover:bg-[#F8F8FB] rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E7E5EF] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'demo', preset: 'standard' });
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#0B0A10] border border-[#D8D4E6] rounded-lg hover:bg-[#F8F8FB] cursor-pointer"
            >
              Request Demo
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'login' });
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#0B0A10] border border-[#D8D4E6] rounded-lg hover:bg-[#F8F8FB] cursor-pointer"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'trial' });
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#0B0A10] hover:bg-[#44326B] rounded-lg cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

const OPT1_STATUS_STYLES: Record<'Paid' | 'Due' | 'Overdue', string> = {
  Paid: 'text-[#157F4D] bg-[#ECFDF3] border-[#ABEFC6]',
  Due: 'text-[#A15C07] bg-[#FEF7E6] border-[#FDE68A]',
  Overdue: 'text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]',
};

export function Option1Hero({
  currency,
  onOpenModal,
}: {
  currency: CurrencyCode;
  onOpenModal: (modal: ModalType) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="bg-white pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E7E5EF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Editorial Left Column */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              PROPERTY MANAGEMENT SOFTWARE · GCC AND BEYOND
            </p>

            <h1 className="font-editorial mt-4 text-[clamp(2.35rem,4.5vw,3.85rem)] font-bold leading-[1.06] tracking-[-0.025em] text-[#0B0A10] text-balance">
              Smarter Property Management.{' '}
              <span className="italic text-[#44326B]">Powered by AI.</span>
            </h1>

            <h2 className="font-editorial mt-4 text-xl sm:text-2xl font-semibold text-[#0B0A10]">
              Manage every property. <span className="text-[#7A6B9C]">In any currency.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#4A465C] max-w-[540px]">
              Invoices, leases, tenants and maintenance in one place, for landlords and property
              managers across the GCC and beyond. Set up your own portfolio in minutes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'trial' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0B0A10] hover:bg-[#44326B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
              >
                <span>Start 14-day free trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0B0A10] bg-white border border-[#D8D4E6] hover:border-[#0B0A10] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request a demo
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#57526B]">
              <span>No credit card required</span>
              <span aria-hidden="true">·</span>
              <span>All features on every plan</span>
              <span aria-hidden="true">·</span>
              <span>Yearly plans: 2 months free</span>
            </div>
          </div>

          {/* Right Editorial Architectural Backdrop & Portfolio Card */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl bg-[#0B0A10] p-4 sm:p-6 shadow-[0_24px_60px_rgba(11,10,16,0.16)]">
              <div className="relative h-44 sm:h-48 rounded-xl overflow-hidden mb-4 bg-[#19142A]">
                {!imgError ? (
                  <img
                    src="/src/assets/images/manzil_hero_architecture_1795531180457.jpg"
                    alt="Modern GCC residential tower managed on Manzil"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/75">
                    <Building2 className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A10]/85 via-[#0B0A10]/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white text-[#0B0A10] text-xs font-semibold shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#157F4D]" />
                    <span>Payment received</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#44326B] text-white text-xs font-semibold shadow-sm border border-white/15">
                    <FileSignature className="w-3.5 h-3.5 text-[#D8CFF0]" />
                    <span>Lease signed</span>
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E7E5EF]">
                <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-[#EFEBF7]">
                  <span className="text-sm sm:text-base font-bold text-[#0B0A10]">
                    Portfolio overview
                  </span>
                  <span className="text-xs font-medium text-[#57526B] font-mono tabular-nums">
                    Sample data · {currency}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap sm:flex-nowrap items-center gap-5">
                  <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
                      <circle cx="40" cy="40" r="33" fill="none" stroke="#EFEBF8" strokeWidth="7" />
                      <circle
                        cx="40"
                        cy="40"
                        r="33"
                        fill="none"
                        stroke="#0B0A10"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 33}
                        strokeDashoffset={2 * Math.PI * 33 * (1 - 0.73)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-extrabold text-[#0B0A10] font-mono tabular-nums leading-none">
                        73%
                      </span>
                      <span className="text-[10px] font-medium text-[#57526B] mt-1">occupied</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-[#57526B]">Collected this month</div>
                    <div className="mt-0.5 text-2xl font-extrabold tracking-tight text-[#0B0A10] font-mono tabular-nums">
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

                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 py-2 px-3 bg-[#F8F8FB] border border-[#E7E5EF] rounded-lg text-xs font-semibold tabular-nums">
                  <span className="text-[#157F4D]">91% collected</span>
                  <span className="text-[#A15C07]">Pending {formatMoney(250, currency)}</span>
                  <span className="text-[#B42318]">Overdue {formatMoney(150, currency)}</span>
                </div>

                <div className="mt-3 divide-y divide-[#EFEBF7]">
                  {HERO_UNITS.map((row) => (
                    <div
                      key={row.unit}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm"
                    >
                      <span className="font-semibold text-[#0B0A10] truncate">{row.unit}</span>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="font-mono tabular-nums text-[#4A465C]">
                          {formatMoney(row.amountBhd, currency)}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${OPT1_STATUS_STYLES[row.status]}`}
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

export function Option1Region({
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
    <section id="gcc" className="bg-[#F8F8FB] py-14 sm:py-16 border-b border-[#E7E5EF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#44326B]">
              ACROSS THE REGION
            </p>
            <h2 className="font-editorial mt-2.5 text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold tracking-[-0.02em] text-[#0B0A10] text-balance">
              <span>Built for </span>
              <span className="italic text-[#44326B] inline-block transition-opacity duration-200">
                {GCC_REGIONS[regionIdx]}
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A465C] max-w-[520px]">
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
                    className="px-3.5 py-2 text-xs font-medium text-[#57526B] font-mono"
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
                      ? 'bg-[#0B0A10] text-white border-[#0B0A10]'
                      : 'bg-white text-[#0B0A10] border-[#D8D4E6] hover:border-[#44326B]'
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
