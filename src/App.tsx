import React, { useState, useEffect, useCallback } from 'react';
import { Language } from './types';
import { ParallaxSite } from './components/ParallaxSite';
import { ServiceLandingPage } from './components/ServiceLandingPage';
import { LegalPage } from './components/LegalPage';
import { LegalDocType } from './components/LegalModal';
import { SEOHead } from './components/SEOHead';

// 1. Dedicated Service SEO Landing Pages
const SERVICE_ROUTES: Record<string, string> = {
  // Polish canonical slugs
  'konstrukcje-stalowe': 'konstrukcje-stalowe',
  'remonty-modernizacje-instalacji-przemyslowych': 'remonty-modernizacje-instalacji-przemyslowych',
  'aparaty-cisnieniowe': 'aparaty-cisnieniowe',
  'montaz-urzadzen-przemyslowych': 'montaz-urzadzen-przemyslowych',
  // Multilingual alias routes
  'pressure-vessels': 'aparaty-cisnieniowe',
  'druckapparate': 'aparaty-cisnieniowe',
  'aparaty-vysokoho-tysku': 'aparaty-cisnieniowe',
  'structural-steel': 'konstrukcje-stalowe',
  'stahlbau': 'konstrukcje-stalowe',
  'metalevi-konstruktsiyi': 'konstrukcje-stalowe',
  'industrial-equipment-assembly': 'montaz-urzadzen-przemyslowych',
  'industriemontage': 'montaz-urzadzen-przemyslowych',
  'montazh-promyslovoho-obladnannya': 'montaz-urzadzen-przemyslowych',
  'overhaul-and-modernization': 'remonty-modernizacje-instalacji-przemyslowych',
  'instandsetzung-und-modernisierung': 'remonty-modernizacje-instalacji-przemyslowych',
  'remont-ta-modernizatsiya': 'remonty-modernizacje-instalacji-przemyslowych',
};

// 2. Verified Legal Document Direct Routes (RODO & Sygnaliści ONLY)
const LEGAL_ROUTES: Record<string, LegalDocType> = {
  'rodo': 'rodo',
  'sygnalisci': 'sygnalisci',
};

// 3. Confirmed Historical Production URLs (Client-side fallback for 301 server redirects)
const CONFIRMED_LEGACY_REDIRECTS: Record<string, string> = {
  '/o-firmie': 'company-discovery-section',
  '/oferta': 'competencies-section',
  '/certyfikaty': 'certificates-section',
  '/realizacje': 'realizations-section',
  '/kontakt': 'kontakt-cta',
};

/**
 * Parses pathname and returns the active language, service slug, legal doc, and raw slug.
 */
function parseUrl(pathname: string, search: string): {
  lang: Language;
  serviceSlug?: string;
  legalDoc?: LegalDocType;
  rawSlug?: string;
} {
  const parts = pathname.split('/').filter(Boolean);
  let lang: Language = 'PL';

  if (parts.length > 0) {
    const firstPart = parts[0].toLowerCase();
    if (firstPart === 'en') {
      lang = 'EN';
      parts.shift();
    } else if (firstPart === 'de') {
      lang = 'DE';
      parts.shift();
    } else if (firstPart === 'uk' || firstPart === 'ua') {
      lang = 'UA';
      parts.shift();
    }
  }

  // Fallback check for query params (?lang=en)
  if (lang === 'PL' && search) {
    const params = new URLSearchParams(search);
    const langParam = params.get('lang')?.toUpperCase();
    if (langParam === 'EN' || langParam === 'DE') {
      lang = langParam as Language;
    } else if (langParam === 'UK' || langParam === 'UA') {
      lang = 'UA';
    }
  }

  const rawSlug = parts[0];
  const serviceSlug = rawSlug && SERVICE_ROUTES[rawSlug] ? SERVICE_ROUTES[rawSlug] : undefined;
  const legalDoc = rawSlug && LEGAL_ROUTES[rawSlug] ? LEGAL_ROUTES[rawSlug] : undefined;

  return { lang, serviceSlug, legalDoc, rawSlug };
}

/**
 * Builds localized canonical path (e.g., '/', '/en/', '/konstrukcje-stalowe/', '/rodo')
 */
export function buildLocalizedPath(slug: string | undefined, lang: Language): string {
  const prefix = lang === 'PL' ? '' : lang === 'UA' ? '/uk' : `/${lang.toLowerCase()}`;
  if (!slug) {
    return prefix === '' ? '/' : `${prefix}/`;
  }
  const cleanSlug = slug.replace(/^\//, '').replace(/\/$/, '');
  const isLegal = cleanSlug === 'rodo' || cleanSlug === 'sygnalisci';
  const path = `${prefix}/${cleanSlug}${isLegal ? '' : '/'}`;
  return path;
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('PL');
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | undefined>(undefined);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);

  // Sync state with current location
  const handleLocationChange = useCallback(() => {
    const { pathname, search, hash } = window.location;
    const { lang, serviceSlug, legalDoc } = parseUrl(pathname, search);

    setCurrentLang(lang);
    setActiveServiceSlug(serviceSlug);
    setActiveLegalDoc(legalDoc || null);

    // Check confirmed client-side legacy redirect fallbacks
    const cleanPath = pathname.replace(/\/$/, '') || '/';
    const targetHash = CONFIRMED_LEGACY_REDIRECTS[cleanPath];
    if (targetHash) {
      const homePath = buildLocalizedPath(undefined, lang);
      window.history.replaceState({}, '', `${homePath}#${targetHash}`);
      setTimeout(() => {
        document.getElementById(targetHash)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (hash) {
      const hashId = hash.replace(/^#/, '');
      setTimeout(() => {
        document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, []);

  useEffect(() => {
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [handleLocationChange]);

  // Language switch handler: Preserves the active page, service, or legal doc while updating localized path
  const handleLanguageChange = (newLang: Language) => {
    const slug = activeServiceSlug || (activeLegalDoc ? activeLegalDoc : undefined);
    const targetPath = buildLocalizedPath(slug, newLang);
    window.history.pushState({}, '', targetPath);
    setCurrentLang(newLang);
  };

  // Home navigation handler
  const handleNavigateHome = (hash?: string) => {
    const targetPath = buildLocalizedPath(undefined, currentLang);
    const fullUrl = hash ? `${targetPath}#${hash}` : targetPath;
    window.history.pushState({}, '', fullUrl);
    setActiveServiceSlug(undefined);
    setActiveLegalDoc(null);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Service landing page navigation handler
  const handleNavigateService = (slug: string) => {
    const targetPath = buildLocalizedPath(slug, currentLang);
    window.history.pushState({}, '', targetPath);
    setActiveServiceSlug(slug);
    setActiveLegalDoc(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Legal document open handler
  const handleOpenLegal = (doc: 'rodo' | 'sygnalisci') => {
    const targetPath = buildLocalizedPath(doc, currentLang);
    window.history.pushState({}, '', targetPath);
    setActiveLegalDoc(doc);
    setActiveServiceSlug(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Homepage SEO meta titles based on language
  const homepageTitles: Record<Language, string> = {
    PL: 'Konstrukcje stalowe i instalacje przemysłowe | CHEMOROZRUCH',
    EN: 'Industrial Steel Structures & Process Piping Assembly | CHEMOROZRUCH',
    DE: 'Stahlkonstruktionen & Industriemontagen | CHEMOROZRUCH',
    UA: 'Металоконструкції та промисловий монтаж установок | CHEMOROZRUCH',
  };

  const homepageDescriptions: Record<Language, string> = {
    PL: 'CHEMOROZRUCH realizuje konstrukcje stalowe, montaż urządzeń przemysłowych, aparaty ciśnieniowe oraz remonty i modernizacje instalacji przemysłowych.',
    EN: 'CHEMOROZRUCH delivers structural steelwork, industrial equipment installation, pressure vessels, and chemical plant turnarounds.',
    DE: 'CHEMOROZRUCH fertigt Stahlkonstruktionen, montiert Industrieanlagen, Druckapparate und führt Generalreparaturen durch.',
    UA: 'CHEMOROZRUCH здійснює виготовлення металоконструкцій, монтаж промислового обладнання, апаратів високого тиску та ремонти.',
  };

  const currentHomepageCanonical = `https://chemorozruch.pl${buildLocalizedPath(undefined, currentLang)}`;

  return (
    <>
      {/* 1. SEO Head for Homepage (When not on a dedicated service or legal page) */}
      {!activeServiceSlug && !activeLegalDoc && (
        <SEOHead
          title={homepageTitles[currentLang]}
          description={homepageDescriptions[currentLang]}
          canonicalUrl={currentHomepageCanonical}
          currentLang={currentLang}
          routeSlug=""
          ogType="website"
        />
      )}

      {/* 2. Routing Decision: Direct Legal Page / Dedicated Service Landing Page / Main Interactive Experience */}
      {activeLegalDoc ? (
        <LegalPage
          docType={activeLegalDoc}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigateHome={handleNavigateHome}
          onNavigateService={handleNavigateService}
          onOpenLegal={handleOpenLegal}
        />
      ) : activeServiceSlug ? (
        <ServiceLandingPage
          slug={activeServiceSlug}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigateHome={handleNavigateHome}
          onNavigateService={handleNavigateService}
          onOpenLegal={handleOpenLegal}
        />
      ) : (
        <ParallaxSite
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigateService={handleNavigateService}
          onOpenLegal={handleOpenLegal}
        />
      )}
    </>
  );
}
