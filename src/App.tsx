/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CurrencyCode } from './data/tenantyContent';
import { Navbar, ModalType } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RegionSection } from './components/RegionSection';
import { InteractiveDashboard } from './components/InteractiveDashboard';
import { WhoItsForSection } from './components/WhoItsForSection';
import { ChallengeAndFeatures } from './components/ChallengeAndFeatures';
import { ProductTourAndDay } from './components/ProductTourAndDay';
import { PdplSection } from './components/PdplSection';
import { PricingAndFaq } from './components/PricingAndFaq';
import { FooterAndModals } from './components/FooterAndModals';

import {
  Option1Navbar,
  Option1Hero,
  Option1Region,
} from './components/option1/Option1SectionsA';
import {
  Option1WhoItsFor,
  Option1ChallengeAndFeatures,
} from './components/option1/Option1SectionsB';
import {
  Option1ProductTourAndDay,
  Option1PdplSection,
} from './components/option1/Option1SectionsC';
import { Option1PricingFaqAndFooter } from './components/option1/Option1SectionsD';

import {
  Option3Navbar,
  Option3Hero,
  Option3Region,
} from './components/option3/Option3SectionsA';
import {
  Option3WhoItsFor,
  Option3ChallengeAndFeatures,
} from './components/option3/Option3SectionsB';
import {
  Option3ProductTourAndDay,
  Option3PdplSection,
} from './components/option3/Option3SectionsC';
import { Option3PricingFaqAndFooter } from './components/option3/Option3SectionsD';

type DesignOption = '1' | '2' | '3';

function getInitialOption(): DesignOption {
  if (typeof window === 'undefined') return '3';
  const param = new URLSearchParams(window.location.search).get('option');
  if (param === '1' || param === '2' || param === '3') return param;
  return '3';
}

export default function App() {
  const [designOption, setDesignOption] = useState<DesignOption>(getInitialOption);
  const [currency, setCurrency] = useState<CurrencyCode>('BHD');
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const selectOption = (next: DesignOption) => {
    setDesignOption(next);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('option', next);
      window.history.replaceState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const rootClass =
    designOption === '1'
      ? 'option-1 min-h-screen flex flex-col bg-white text-[#0B0A10]'
      : designOption === '2'
        ? 'option-2 min-h-screen flex flex-col bg-white text-[#171226]'
        : 'option-3 min-h-screen flex flex-col bg-[#09090D] text-[#F7F6FA]';

  return (
    <div className={rootClass}>
      {designOption === '1' && (
        <>
          <Option1Navbar onOpenModal={setActiveModal} />
          <main className="flex-1">
            <Option1Hero currency={currency} onOpenModal={setActiveModal} />
            <Option1Region currency={currency} onSelectCurrency={setCurrency} />
            <InteractiveDashboard variant="option1" />
            <Option1WhoItsFor onOpenModal={setActiveModal} />
            <Option1ChallengeAndFeatures />
            <Option1ProductTourAndDay currency={currency} onOpenModal={setActiveModal} />
            <Option1PdplSection />
            <Option1PricingFaqAndFooter currency={currency} onOpenModal={setActiveModal} />
          </main>
          <FooterAndModals
            activeModal={activeModal}
            onOpenModal={setActiveModal}
            hideCtaAndFooter
          />
        </>
      )}

      {designOption === '2' && (
        <>
          <Navbar onOpenModal={setActiveModal} />
          <main className="flex-1">
            <HeroSection currency={currency} onOpenModal={setActiveModal} />
            <RegionSection currency={currency} onSelectCurrency={setCurrency} />
            <InteractiveDashboard variant="option2" />
            <WhoItsForSection onOpenModal={setActiveModal} />
            <ChallengeAndFeatures />
            <ProductTourAndDay currency={currency} onOpenModal={setActiveModal} />
            <PdplSection />
            <PricingAndFaq currency={currency} onOpenModal={setActiveModal} />
          </main>
          <FooterAndModals activeModal={activeModal} onOpenModal={setActiveModal} />
        </>
      )}

      {designOption === '3' && (
        <>
          <Option3Navbar onOpenModal={setActiveModal} />
          <main className="flex-1">
            <Option3Hero currency={currency} onOpenModal={setActiveModal} />
            <Option3Region currency={currency} onSelectCurrency={setCurrency} />
            <InteractiveDashboard variant="option3" />
            <Option3WhoItsFor onOpenModal={setActiveModal} />
            <Option3ChallengeAndFeatures />
            <Option3ProductTourAndDay currency={currency} onOpenModal={setActiveModal} />
            <Option3PdplSection />
            <Option3PricingFaqAndFooter currency={currency} onOpenModal={setActiveModal} />
          </main>
          <FooterAndModals
            activeModal={activeModal}
            onOpenModal={setActiveModal}
            hideCtaAndFooter
            darkTheme
          />
        </>
      )}

      {/* Design Option 1 / Option 2 / Option 3 Switcher */}
      <div
        role="group"
        aria-label="Design option switcher"
        className="fixed left-4 bottom-4 z-40 inline-flex items-center p-1 rounded-full bg-[#0B0A10]/95 border border-[#352C52] shadow-[0_10px_28px_rgba(11,10,16,0.35)] backdrop-blur-sm"
      >
        <button
          type="button"
          aria-pressed={designOption === '1'}
          onClick={() => selectOption('1')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            designOption === '1'
              ? 'bg-white text-[#0B0A10]'
              : 'text-[#C9BEE6] hover:text-white'
          }`}
        >
          Option 1
        </button>
        <button
          type="button"
          aria-pressed={designOption === '2'}
          onClick={() => selectOption('2')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            designOption === '2'
              ? 'bg-white text-[#0B0A10]'
              : 'text-[#C9BEE6] hover:text-white'
          }`}
        >
          Option 2
        </button>
        <button
          type="button"
          aria-pressed={designOption === '3'}
          onClick={() => selectOption('3')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            designOption === '3'
              ? 'bg-[#5D488F] text-white'
              : 'text-[#C9BEE6] hover:text-white'
          }`}
        >
          Option 3
        </button>
      </div>
    </div>
  );
}
