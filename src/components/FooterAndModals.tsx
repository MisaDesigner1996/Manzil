import { useState } from 'react';
import { ArrowRight, CheckCircle2, Instagram, MessageCircle, X } from 'lucide-react';
import { ModalType } from './Navbar';

interface FooterAndModalsProps {
  activeModal: ModalType;
  onOpenModal: (modal: ModalType) => void;
  hideCtaAndFooter?: boolean;
  darkTheme?: boolean;
}

export function FooterAndModals({
  activeModal,
  onOpenModal,
  hideCtaAndFooter = false,
  darkTheme = false,
}: FooterAndModalsProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioSize, setPortfolioSize] = useState('15');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    setError('');
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPassword('');
    setNotes('');
    onOpenModal(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (activeModal?.type === 'login') {
      if (!emailOk || password.trim().length < 4) {
        setError('Please enter a valid email address and password.');
        return;
      }
      setError('');
      setSubmitted(true);
      return;
    }

    if (!fullName.trim() || !emailOk) {
      setError('Please enter your name and a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {!hideCtaAndFooter && (
        <>
          {/* Final Call-to-Action Section */}
          <section className="bg-white pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1160px] mx-auto rounded-3xl bg-gradient-to-b from-[#3C2B66] via-[#2D1F4E] to-[#1F1438] px-6 py-14 sm:py-20 text-center text-white shadow-[0_24px_60px_rgba(45,31,78,0.22)]">
          <h2 className="text-[clamp(1.85rem,4vw,3rem)] font-extrabold tracking-[-0.025em] text-white max-w-3xl mx-auto text-balance">
            Ready to transform your property management?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#DED8EE] max-w-[520px] mx-auto">
            The power of AI and automation, built for modern property professionals everywhere.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenModal({ type: 'trial' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#2D1F4E] bg-white hover:bg-[#F3F0FA] rounded-lg transition-colors cursor-pointer"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
              className="px-6 py-3.5 text-sm font-semibold text-white border border-[#6E599E] hover:border-white rounded-lg transition-colors cursor-pointer"
            >
              Request a Demo
            </button>

            <a
              href="https://wa.me/97339990391"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-left text-xs sm:text-sm text-[#DED8EE] hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#C9BEE6] shrink-0" />
              <span>
                Talk to us on WhatsApp
                <strong className="block font-mono text-white">+973 3999 0391</strong>
              </span>
            </a>
          </div>

          <div className="mt-5 text-xs sm:text-sm text-[#C9BEE6]">
            No credit card required · 14-day free trial
          </div>

          <div className="mt-5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#5D498C] text-xs font-semibold text-[#EFEBF8] hover:border-white hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow us on Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Unified Manzil Footer */}
      <footer className="bg-[#FAF9FD] text-[#171226] border-t border-[#EAE6F3]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#EAE6F3]">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <img
                src="/assets/aistudio/manzil_logo_transparent_9f6b6dbe.png"
                alt="Manzil"
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain"
              />
              <p className="text-sm text-[#57526B] max-w-xs leading-relaxed">
                AI-powered property management software for modern real estate professionals across
                the GCC and beyond.
              </p>
            </div>

            {/* Product */}
            <nav aria-label="Product" className="lg:col-span-2 flex flex-col space-y-2.5 text-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D1F4E] mb-1">
                Product
              </h4>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#features');
                }}
                className="text-[#57526B] hover:text-[#2D1F4E] transition-colors"
              >
                Features
              </a>
              <a
                href="#pdpl"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#pdpl');
                }}
                className="text-[#57526B] hover:text-[#2D1F4E] transition-colors"
              >
                Data Protection
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#pricing');
                }}
                className="text-[#57526B] hover:text-[#2D1F4E] transition-colors"
              >
                Pricing
              </a>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'login' })}
                className="text-left text-[#57526B] hover:text-[#2D1F4E] transition-colors cursor-pointer"
              >
                Portal Sign In
              </button>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'trial' })}
                className="text-left text-[#57526B] hover:text-[#2D1F4E] transition-colors cursor-pointer"
              >
                Start Free Trial
              </button>
            </nav>

            {/* Company */}
            <nav aria-label="Company" className="lg:col-span-2 flex flex-col space-y-2.5 text-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D1F4E] mb-1">
                Company
              </h4>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'about' })}
                className="text-left text-[#57526B] hover:text-[#2D1F4E] transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'contact' })}
                className="text-left text-[#57526B] hover:text-[#2D1F4E] transition-colors cursor-pointer"
              >
                Contact Us
              </button>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('#faq');
                }}
                className="text-[#57526B] hover:text-[#2D1F4E] transition-colors"
              >
                FAQ
              </a>
              <button
                type="button"
                onClick={() => onOpenModal({ type: 'demo', preset: 'standard' })}
                className="text-left text-[#57526B] hover:text-[#2D1F4E] transition-colors cursor-pointer"
              >
                Request a Demo
              </button>
            </nav>

            {/* Legal & Follow */}
            <div className="lg:col-span-3 flex flex-col space-y-6 text-sm">
              <nav aria-label="Legal" className="flex flex-col space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D1F4E] mb-1">
                  Legal
                </h4>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'privacy' })}
                  className="text-left text-[#57526B] hover:text-[#2D1F4E] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => onOpenModal({ type: 'terms' })}
                  className="text-left text-[#57526B] hover:text-[#2D1F4E] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </nav>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D1F4E] mb-2.5">
                  Follow us
                </h4>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#57526B] hover:text-[#2D1F4E] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6B9C]">
            <span>© 2026 Manzil. All rights reserved.</span>
            <a
              href="https://wa.me/97339990391"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2D1F4E] transition-colors"
            >
              Chat with us · +973 3999 0391
            </a>
          </div>
        </div>
      </footer>
        </>
      )}

      {/* Floating WhatsApp Contact Action */}
      <a
        href="https://wa.me/97339990391"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`fixed right-4 bottom-4 z-40 inline-flex items-center gap-2.5 border rounded-full p-1.5 sm:pl-4 sm:pr-1.5 sm:py-1.5 transition-transform hover:-translate-y-0.5 ${
          darkTheme
            ? 'bg-[#151520]/95 border-[#3A3654] shadow-[0_12px_32px_rgba(0,0,0,0.55)] hover:border-[#7A6B9C]'
            : 'bg-white border-[#DCD6EB] shadow-[0_10px_30px_rgba(45,31,78,0.16)] hover:border-[#44326B]'
        }`}
      >
        <span className="hidden sm:block text-left leading-tight">
          <span
            className={`block text-xs font-bold ${darkTheme ? 'text-[#F5F4F8]' : 'text-[#171226]'}`}
          >
            Chat with us
          </span>
          <span
            className={`block text-[11px] font-mono ${
              darkTheme ? 'text-[#B8B3CA]' : 'text-[#57526B]'
            }`}
          >
            +973 3999 0391
          </span>
        </span>
        <span
          className={`w-10 h-10 rounded-full text-white flex items-center justify-center shrink-0 ${
            darkTheme ? 'bg-[#5D488F]' : 'bg-[#2D1F4E]'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
        </span>
      </a>

      {/* Interactive Modal Overlay */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#171226]/55 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-[#DCD6EB] rounded-2xl w-full max-w-md p-6 sm:p-7 shadow-2xl text-[#171226]">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#EFEBF7]">
              <h3 className="text-xl font-bold text-[#171226]">
                {activeModal.type === 'trial' && 'Start 14-day free trial'}
                {activeModal.type === 'demo' &&
                  (activeModal.preset === 'enterprise_trial'
                    ? 'Book Enterprise Pilot'
                    : 'Request a Demo')}
                {activeModal.type === 'login' && 'Portal Sign In'}
                {activeModal.type === 'contact' &&
                  (activeModal.subject ? activeModal.subject : 'Contact Us')}
                {activeModal.type === 'about' && 'About Us'}
                {activeModal.type === 'privacy' && 'Privacy Policy'}
                {activeModal.type === 'terms' && 'Terms of Service'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-[#7A6B9C] hover:text-[#2D1F4E] hover:bg-[#F3F0FA] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeModal.type === 'about' ||
            activeModal.type === 'privacy' ||
            activeModal.type === 'terms' ? (
              <div className="mt-4 space-y-3 text-sm text-[#57526B] leading-relaxed">
                {activeModal.type === 'about' && (
                  <p>
                    AI-powered property management software for modern real estate professionals
                    across the GCC and beyond. Invoices, leases, tenants and maintenance in one
                    place.
                  </p>
                )}
                {activeModal.type === 'privacy' && (
                  <p>
                    Built around Bahrain&apos;s Personal Data Protection Law (PDPL), with
                    role-based access, audit logs and encrypted invoice links. Each
                    organization&apos;s data is separated from every other organization&apos;s.
                  </p>
                )}
                {activeModal.type === 'terms' && (
                  <p>
                    14-day free trial. No credit card required. All plans include everything.
                    Upgrade or downgrade any time. Only your limits change, never your features.
                  </p>
                )}
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : submitted ? (
              <div className="mt-6 text-center py-4 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#157F4D] mx-auto" />
                <h4 className="text-base font-bold text-[#171226]">
                  {activeModal.type === 'login' ? 'Portal Sign In' : '14-day free trial'}
                </h4>
                <p className="text-sm text-[#57526B]">{email}</p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-3.5" noValidate>
                {activeModal.type === 'trial' && activeModal.plan && (
                  <div className="px-3.5 py-2 bg-[#F3F0FA] border border-[#DCD6EB] rounded-lg text-xs font-semibold text-[#2D1F4E]">
                    {activeModal.plan} ({activeModal.cycle || 'monthly'}) · 14-day free trial
                  </div>
                )}

                {activeModal.type !== 'login' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#57526B] mb-1">Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="James Carter"
                      className="w-full px-3.5 py-2 text-sm border border-[#DCD6EB] rounded-lg focus:outline-none focus:border-[#44326B]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#57526B] mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2 text-sm border border-[#DCD6EB] rounded-lg focus:outline-none focus:border-[#44326B]"
                  />
                </div>

                {activeModal.type === 'login' ? (
                  <div>
                    <label className="block text-xs font-semibold text-[#57526B] mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 text-sm border border-[#DCD6EB] rounded-lg focus:outline-none focus:border-[#44326B]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-[#57526B] mb-1">
                      Units
                    </label>
                    <select
                      value={portfolioSize}
                      onChange={(e) => setPortfolioSize(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-[#DCD6EB] rounded-lg bg-white focus:outline-none focus:border-[#44326B]"
                    >
                      <option value="15">15 (Starter)</option>
                      <option value="60">60 (Growth)</option>
                      <option value="200">200 (Pro)</option>
                      <option value="1,000+">1,000+ (Enterprise)</option>
                    </select>
                  </div>
                )}

                {(activeModal.type === 'contact' || activeModal.type === 'demo') && (
                  <div>
                    <label className="block text-xs font-semibold text-[#57526B] mb-1">
                      Notes
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-[#DCD6EB] rounded-lg focus:outline-none focus:border-[#44326B]"
                    />
                  </div>
                )}

                {error && <p className="text-xs font-semibold text-[#B42318]">{error}</p>}

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-xs font-semibold text-[#2D1F4E] border border-[#DCD6EB] rounded-lg hover:bg-[#F8F7FC] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#2D1F4E] hover:bg-[#44326B] rounded-lg cursor-pointer"
                  >
                    {activeModal.type === 'login'
                      ? 'Log in'
                      : activeModal.type === 'trial'
                        ? 'Start Free Trial'
                        : 'Request Demo'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
