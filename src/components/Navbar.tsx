import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type ModalType =
  | null
  | { type: 'trial'; plan?: string; cycle?: 'monthly' | 'yearly' }
  | { type: 'demo'; preset?: 'enterprise_trial' | 'standard' }
  | { type: 'login' }
  | { type: 'contact'; subject?: string }
  | { type: 'about' }
  | { type: 'privacy' }
  | { type: 'terms' };

interface NavbarProps {
  onOpenModal: (modal: ModalType) => void;
}

const NAV_LINKS = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Solutions', href: '#who' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about', isAbout: true },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar({ onOpenModal }: NavbarProps) {
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE6F3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <a
          href="#top"
          aria-label="Manzil Home"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D1F4E] rounded"
        >
          <img
            src="/assets/aistudio/manzil_logo_transparent_9f6b6dbe.png"
            alt="Manzil"
            referrerPolicy="no-referrer"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57526B]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.isAbout)}
              className="whitespace-nowrap shrink-0 hover:text-[#2D1F4E] transition-colors py-1 border-b-2 border-transparent hover:border-[#44326B]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions Zone */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
            className="px-3.5 py-2 text-xs font-semibold text-[#2D1F4E] bg-white border border-[#DCD6EB] rounded-lg hover:border-[#44326B] hover:bg-[#F8F7FB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Demo
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'login' })}
            className="px-3.5 py-2 text-xs font-semibold text-[#57526B] hover:text-[#2D1F4E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => onOpenModal({ type: 'trial' })}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E6E1F0] text-[#2D1F4E] hover:bg-[#F8F7FB] cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#EAE6F3] bg-white px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isAbout)}
                className="px-3 py-2.5 text-sm font-medium text-[#2D1F4E] hover:bg-[#F4F1FA] rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#EAE6F3] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'demo', preset: 'standard' });
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#2D1F4E] border border-[#DCD6EB] rounded-lg hover:bg-[#F8F7FB] cursor-pointer"
            >
              Request Demo
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'login' });
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#2D1F4E] border border-[#DCD6EB] rounded-lg hover:bg-[#F8F7FB] cursor-pointer"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenModal({ type: 'trial' });
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
