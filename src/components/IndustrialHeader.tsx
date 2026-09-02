import React, { useState, useEffect, useRef } from 'react';
import { Language, translations } from '../types';
import { ChemorozruchLogo } from './ChemorozruchLogo';
import { ArrowUpRight, Menu, X, Globe, Phone, Mail, ChevronDown } from 'lucide-react';
import { buildLocalizedPath } from '../App';

interface IndustrialHeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenInquiry: () => void;
}

export const IndustrialHeader: React.FC<IndustrialHeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenInquiry,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];
  const languages: Language[] = ['PL', 'EN', 'DE', 'UA'];

  const navItems = [
    { id: 'company-discovery-section', label: { PL: 'O firmie', EN: 'About us', DE: 'Über uns', UA: 'Про нас' } },
    { id: 'competencies-section', label: { PL: 'Oferta', EN: 'Offer', DE: 'Angebot', UA: 'Послуги' } },
    { id: 'certyfikaty-jakosc', label: { PL: 'Certyfikaty', EN: 'Certificates', DE: 'Zertifikate', UA: 'Сертифікати' } },
    { id: 'realizacje', label: { PL: 'Realizacje', EN: 'Realizations', DE: 'Referenzen', UA: 'Об’єкти' } },
    { id: 'kontakt-cta', label: { PL: 'Kontakt', EN: 'Contact', DE: 'Kontakt', UA: 'Контакти' } },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      const headerOffset = 70;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      const homePath = buildLocalizedPath(undefined, currentLang);
      window.location.href = `${homePath}#${id}`;
    }
  };

  return (
    <>
      <header
        id="main-industrial-header"
        className={`fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-300 pt-safe ${
          scrolled
            ? 'py-2 sm:py-2.5 border-b border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
            : 'py-2.5 sm:py-3.5 lg:py-4 border-b border-transparent'
        }`}
      >
        {/* ========================================================
            NATURAL DISSOLVE EXTENSION INTO HERO (UNSCROLLED)
            - Pinned beneath the solid white header bar (top-full)
            - Smoothly fades opacity to 0 on scroll with zero background flash
            - The main header above is ALWAYS 100% pure solid white (#FFFFFF)
        ======================================================== */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-full pointer-events-none transition-opacity duration-300 ${
            scrolled || mobileMenuOpen ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            height: '48px',
            background:
              'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.70) 50%, rgba(255,255,255,0.30) 80%, rgba(255,255,255,0) 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Official Brand Logo — enlarged 30-50% larger, locked into pure white background with zero flash */}
          <a
            id="header-brand"
            href={buildLocalizedPath(undefined, currentLang)}
            className="flex items-center cursor-pointer group select-none flex-shrink-0 focus:outline-hidden hover:opacity-95"
            aria-label="CHEMOROZRUCH - Strona główna"
            onClick={(e) => {
              // If on homepage, smooth scroll to top without full page reload
              if (
                window.location.pathname === '/' ||
                window.location.pathname === `/${currentLang.toLowerCase()}/` ||
                window.location.pathname === '/uk/'
              ) {
                e.preventDefault();
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="h-[52px] xs:h-[58px] sm:h-[66px] md:h-[76px] lg:h-[84px] xl:h-[92px] w-auto flex items-center justify-start">
              <ChemorozruchLogo
                variant="horizontal"
                className="h-full w-auto max-h-full object-contain select-none pointer-events-none"
                alt="CHEMOROZRUCH"
                priority={true}
              />
            </div>
          </a>

          {/* Center: Desktop Navigation Bar (Visible on 1024px+) — on clean white header surface */}
          <nav
            aria-label="Główna nawigacja"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="px-3.5 py-1.5 text-[13px] xl:text-sm font-semibold text-slate-800 hover:text-red-600 hover:bg-slate-100/70 rounded-full transition-colors duration-150 whitespace-nowrap"
              >
                {item.label[currentLang]}
              </a>
            ))}
          </nav>

          {/* Right: Actions Container (Desktop, Tablet, Mobile) */}
          <div id="header-right-actions" className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 flex-shrink-0">
            {/* Desktop Language Switcher (1024px+) */}
            <nav
              id="header-language-desktop"
              aria-label="Wybór języka"
              className="hidden lg:flex items-center gap-0.5 text-xs font-semibold text-slate-600 bg-slate-100/90 p-0.5 rounded-full border border-slate-200/70"
            >
              {languages.map((lang) => {
                const isActive = currentLang === lang;
                return (
                  <button
                    key={lang}
                    id={`lang-btn-${lang.toLowerCase()}`}
                    type="button"
                    onClick={() => onLanguageChange(lang)}
                    className={`min-h-[28px] min-w-[32px] px-2 py-1 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'text-white bg-red-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/70'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {lang}
                  </button>
                );
              })}
            </nav>

            {/* Mobile / Tablet Compact Touch-Friendly Language Selector (< 1024px) */}
            <div ref={langDropdownRef} className="relative lg:hidden">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="min-h-[38px] min-w-[38px] sm:min-h-[40px] sm:min-w-[40px] px-2 sm:px-2.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer hover:bg-slate-200/80"
                aria-expanded={langDropdownOpen}
                aria-label={`Zmień język. Aktualny: ${currentLang}`}
              >
                <Globe className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{currentLang}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Touch dropdown menu */}
              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Język / Lang
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        onLanguageChange(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full min-h-[44px] px-3.5 py-2 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer ${
                        currentLang === lang
                          ? 'bg-red-50 text-red-600'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang === 'PL' ? 'Polski (PL)' : lang === 'EN' ? 'English (EN)' : lang === 'DE' ? 'Deutsch (DE)' : 'Українська (UA)'}</span>
                      {currentLang === lang && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary CTA Button: "Wyślij zapytanie" — NEVER clipped on any screen */}
            <button
              id="header-inquiry-btn"
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="group relative inline-flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs lg:text-sm font-bold tracking-wide text-white min-h-[38px] sm:min-h-[42px] px-3.5 sm:px-4.5 lg:px-5 py-1.5 sm:py-2 rounded-full bg-red-600 hover:bg-red-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>{t.header.inquiryBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 hidden xs:inline-block" />
            </button>

            {/* Mobile / Tablet Menu Toggle (< 1024px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[38px] min-w-[38px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition-colors cursor-pointer active:scale-95 border border-slate-200/70"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu nawigacji'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN / DRAWER NAVIGATION (< 1024px) */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-30 lg:hidden bg-slate-950/60 backdrop-blur-md pt-[calc(4.25rem+env(safe-area-inset-top,0px))] pb-safe animate-in fade-in duration-200 flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobilne"
        >
          {/* Scrollable Container */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 space-y-5">
              <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
                NAWIGACJA GŁÓWNA
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col divide-y divide-slate-100">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="flex items-center justify-between py-3.5 text-base font-bold text-slate-900 hover:text-red-600 transition-colors"
                  >
                    <span>{item.label[currentLang]}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </nav>

              {/* Language Selector inside mobile menu (Large 44px buttons) */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase mb-3">
                  WYBIERZ JĘZYK / SELECT LANGUAGE
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {languages.map((lang) => {
                    const isActive = currentLang === lang;
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          onLanguageChange(lang);
                        }}
                        className={`min-h-[44px] rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                          isActive
                            ? 'bg-red-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Inquiry CTA button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
                >
                  <span>{t.header.inquiryBtn}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Contact Box in Mobile Menu */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-md text-xs text-slate-700 space-y-3">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                {currentLang === 'PL'
                  ? 'Szybki kontakt z centralą'
                  : currentLang === 'EN'
                  ? 'Quick headquarters contact'
                  : currentLang === 'DE'
                  ? 'Direkter Kontakt zur Zentrale'
                  : 'Швидкий зв’язок з офісом'}
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                <a href="tel:+48338425920" className="font-semibold hover:text-red-600 transition-colors">
                  +48 33 842 59 20
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-600 shrink-0" />
                <a href="mailto:firma@chemorozruch.pl" className="font-semibold hover:text-red-600 transition-colors">
                  firma@chemorozruch.pl
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndustrialHeader;
