import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../types';
import { 
  Building2, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  Copy, 
  Check, 
  Briefcase, 
  FileSpreadsheet, 
  Wrench
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactCTASectionProps {
  currentLang: Language;
  onOpenLegal?: (doc: 'rodo' | 'sygnalisci') => void;
}

interface PhoneContact {
  display: string;
  href: string;
  label?: Record<Language, string>;
}

interface DepartmentItem {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  email: string;
  address?: Record<Language, string>;
  phones: PhoneContact[];
  hours: Record<Language, string>;
  icon: React.ComponentType<{ className?: string }>;
  tag: Record<Language, string>;
}

const DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'sekretariat',
    name: {
      PL: 'Sekretariat Zarządu (Oświęcim)',
      EN: 'Executive Secretariat (Oświęcim)',
      DE: 'Vorstandssekretariat (Oświęcim)',
      UA: 'Секретаріат Керівництва (Освенцим)',
    },
    description: {
      PL: 'Siedziba główna, zarząd spółki, kancelaria ogólna, sprawy formalne i korespondencja.',
      EN: 'Corporate headquarters, executive board, general registry, formal matters and official correspondence.',
      DE: 'Hauptsitz, Unternehmensleitung, allgemeine Kanzlei und offizielle Korrespondenz.',
      UA: 'Головний офіс, керівництво компанії, загальна канцелярія та офіційне листування.',
    },
    email: 'firma@chemorozruch.pl',
    address: {
      PL: 'ul. Lipowa 5, 32-600 Oświęcim, Polska',
      EN: 'ul. Lipowa 5, 32-600 Oświęcim, Poland',
      DE: 'ul. Lipowa 5, 32-600 Oświęcim, Polen',
      UA: 'ul. Lipowa 5, 32-600 Oświęcim, Польща',
    },
    phones: [
      { display: '+48 33 842 39 20', href: 'tel:+48338423920' },
      { display: '+48 33 842 59 20', href: 'tel:+48338425920' },
      { display: '+48 604 163 594', href: 'tel:+48604163594', label: { PL: 'Kom.', EN: 'Mob.', DE: 'Mobil', UA: 'Моб.' } },
      { display: 'Fax: +48 33 842 34 91', href: 'tel:+48338423491', label: { PL: 'Fax', EN: 'Fax', DE: 'Fax', UA: 'Факс' } },
    ],
    hours: {
      PL: 'Pn – Pt: 07:00 – 15:00',
      EN: 'Mon – Fri: 07:00 – 15:00',
      DE: 'Mo – Fr: 07:00 – 15:00',
      UA: 'Пн – Пт: 07:00 – 15:00',
    },
    icon: Building2,
    tag: {
      PL: 'SEKRETARIAT ZARZĄDU',
      EN: 'EXECUTIVE SECRETARIAT',
      DE: 'VORSTANDSSEKRETARIAT',
      UA: 'СЕКРЕТАРІАТ КЕРІВНИЦТВА',
    },
  },
  {
    id: 'handlowy',
    name: {
      PL: 'Dział Handlowy',
      EN: 'Commercial Department',
      DE: 'Vertriebsabteilung',
      UA: 'Комерційний відділ',
    },
    description: {
      PL: 'Wyceny konstrukcji stalowych, aparatury ciśnieniowej i rurociągów, zapytania ofertowe, przetargi i kalkulacje.',
      EN: 'Steel structures estimation, pressure equipment & piping quotations, tenders, RFQs and commercial bids.',
      DE: 'Kalkulation von Stahlbauprojekten, Druckapparaten und Rohrleitungen, Ausschreibungen und Angebote.',
      UA: 'Розрахунки вартості металоконструкцій, ємностей під тиском і трубопроводів, комерційні пропозиції та тендери.',
    },
    email: 'dzialhandlowy@chemorozruch.pl',
    phones: [
      { display: '+48 33 842 59 20, wew. 137', href: 'tel:+48338425920' },
    ],
    hours: {
      PL: 'Pn – Pt: 07:00 – 15:00',
      EN: 'Mon – Fri: 07:00 – 15:00',
      DE: 'Mo – Fr: 07:00 – 15:00',
      UA: 'Пн – Пт: 07:00 – 15:00',
    },
    icon: FileSpreadsheet,
    tag: {
      PL: 'DZIAŁ HANDLOWY',
      EN: 'COMMERCIAL DEPT',
      DE: 'VERTRIEB',
      UA: 'КОМЕРЦІЙНИЙ ВІДДІЛ',
    },
  },
  {
    id: 'finansowy',
    name: {
      PL: 'Dział Finansowy',
      EN: 'Finance Department',
      DE: 'Finanzabteilung',
      UA: 'Фінансовий відділ',
    },
    description: {
      PL: 'Rozliczenia finansowe, faktury, księgowość i sprawy płatności.',
      EN: 'Financial accounting, invoicing, settlements and payment procedures.',
      DE: 'Finanzbuchhaltung, Rechnungsstellung und Zahlungsverkehr.',
      UA: 'Фінансовий облік, виставлення рахунків, взаєморозрахунки та платежі.',
    },
    email: 'dzialfinansowy@chemorozruch.pl',
    phones: [
      { display: '+48 33 842 59 20, wew. 114', href: 'tel:+48338425920' },
    ],
    hours: {
      PL: 'Pn – Pt: 07:00 – 15:00',
      EN: 'Mon – Fri: 07:00 – 15:00',
      DE: 'Mo – Fr: 07:00 – 15:00',
      UA: 'Пн – Пт: 07:00 – 15:00',
    },
    icon: Briefcase,
    tag: {
      PL: 'DZIAŁ FINANSOWY',
      EN: 'FINANCE DEPT',
      DE: 'FINANZEN',
      UA: 'ФІНАНСОВИЙ ВІДДІЛ',
    },
  },
  {
    id: 'personalny',
    name: {
      PL: 'Dział Personalny',
      EN: 'HR & Personnel Department',
      DE: 'Personalabteilung (HR)',
      UA: 'Відділ кадрів',
    },
    description: {
      PL: 'Sprawy pracownicze, rekrutacja monterów i spawaczy, szkolenia oraz uprawnienia zawodowe.',
      EN: 'Human resources, recruitment of welders and fitters, professional trainings and certifications.',
      DE: 'Personalwesen, Rekrutierung von Schweißern und Monteuren sowie Qualifikationen.',
      UA: 'Кадрові питання, працевлаштування монтажників і зварювальників, кваліфікації та навчання.',
    },
    email: 'dzialpersonalny@chemorozruch.pl',
    phones: [
      { display: '+48 33 842 59 20, wew. 108', href: 'tel:+48338425920' },
    ],
    hours: {
      PL: 'Pn – Pt: 07:00 – 15:00',
      EN: 'Mon – Fri: 07:00 – 15:00',
      DE: 'Mo – Fr: 07:00 – 15:00',
      UA: 'Пн – Пт: 07:00 – 15:00',
    },
    icon: Wrench,
    tag: {
      PL: 'DZIAŁ PERSONALNY',
      EN: 'HR & PERSONNEL',
      DE: 'PERSONALWESEN',
      UA: 'ВІДДІЛ КАДРІВ',
    },
  },
  {
    id: 'plock',
    name: {
      PL: 'Oddział w Płocku',
      EN: 'Płock Branch',
      DE: 'Niederlassung Płock',
      UA: 'Відділення в Плоцьку',
    },
    description: {
      PL: 'Sekretariat oddziału realizacyjnego przy kompleksie rafineryjno-petrochemicznym w Płocku.',
      EN: 'Operational branch secretariat stationed at the refining and petrochemical complex in Płock.',
      DE: 'Sekretariat der operativen Niederlassung am Raffinerie- und Petrochemiekomplex in Płock.',
      UA: 'Секретаріат виробничого відділення при нафтохімічному комплексі в Плоцьку.',
    },
    email: 'plock@chemorozruch.pl',
    address: {
      PL: 'ul. Witolda Zglenickiego 50 F, 09-400 Płock, Polska',
      EN: 'ul. Witolda Zglenickiego 50 F, 09-400 Płock, Poland',
      DE: 'ul. Witolda Zglenickiego 50 F, 09-400 Płock, Polen',
      UA: 'ul. Witolda Zglenickiego 50 F, 09-400 Płock, Польща',
    },
    phones: [
      { display: '+48 24 365 40 84', href: 'tel:+48243654084' },
      { display: '+48 517 487 041', href: 'tel:+48517487041', label: { PL: 'Kom.', EN: 'Mob.', DE: 'Mobil', UA: 'Моб.' } },
    ],
    hours: {
      PL: 'Pn – Pt: 07:00 – 15:00',
      EN: 'Mon – Fri: 07:00 – 15:00',
      DE: 'Mo – Fr: 07:00 – 15:00',
      UA: 'Пн – Пт: 07:00 – 15:00',
    },
    icon: Building2,
    tag: {
      PL: 'ODDZIAŁ W PŁOCKU',
      EN: 'PŁOCK BRANCH',
      DE: 'NIEDERLASSUNG PŁOCK',
      UA: 'ВІДДІЛЕННЯ В ПЛОЦЬКУ',
    },
  },
];

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({ currentLang }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' }
        );
      }

      if (listRef.current) {
        tl.fromTo(
          listRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentLang]);

  const handleCopy = (text: string, label: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2200);
  };

  const labels = {
    eyebrow: {
      PL: 'KONTAKT & DZIAŁY',
      EN: 'CONTACT & DEPARTMENTS',
      DE: 'KONTAKT & ABTEILUNGEN',
      UA: 'КОНТАКТИ ТА ВІДДІЛИ',
    },
    heading: {
      PL: 'Bezpośredni kontakt z działami',
      EN: 'Direct contact with our departments',
      DE: 'Direkter Kontakt zu den Fachabteilungen',
      UA: 'Прямий зв’язок з відділами',
    },
    subheading: {
      PL: 'Wybierz właściwy dział, aby nawiązać bezpośredni kontakt inżynierski. Kliknięcie adresu e-mail uruchamia program pocztowy.',
      EN: 'Select the relevant department to establish direct engineering contact. Clicking the email opens your email application.',
      DE: 'Wählen Sie die zuständige Abteilung für den direkten Kontakt. Ein Klick auf die E-Mail öffnet Ihr E-Mail-Programm.',
      UA: 'Оберіть відповідний відділ для прямого інженерного зв’язку. Натискання на e-mail відкриває поштовий клієнт.',
    },
    writeEmailBtn: {
      PL: 'Napisz e-mail',
      EN: 'Write email',
      DE: 'E-Mail schreiben',
      UA: 'Написати e-mail',
    },
    phoneLabel: {
      PL: 'Telefon',
      EN: 'Phone',
      DE: 'Telefon',
      UA: 'Телефон',
    },
  };

  return (
    <section
      id="kontakt-cta"
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F5] text-slate-900 overflow-hidden py-16 sm:py-20 lg:py-24 border-t border-slate-200"
    >
      <div id="kontakt" className="absolute -top-20 left-0 w-px h-px opacity-0 pointer-events-none" />
      <div id="contact" className="absolute -top-20 left-0 w-px h-px opacity-0 pointer-events-none" />
      {/* Background Architectural Subtle Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-slate-300/60" />
          <div className="w-px h-full bg-slate-300/40 hidden md:block" />
          <div className="w-px h-full bg-slate-300/40 hidden lg:block" />
          <div className="w-px h-full bg-slate-300/60" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* 1. SECTION HEADER (Spacious, clean typographic hierarchy) */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/70 text-red-700 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{labels.eyebrow[currentLang]}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-950 tracking-tight leading-[1.12] font-poppins">
            {labels.heading[currentLang]}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {labels.subheading[currentLang]}
          </p>
        </div>

        {/* 2. EDITORIAL DEPARTMENT CONTACT LIST */}
        <div
          ref={listRef}
          className="border-t border-slate-200 divide-y divide-slate-200/90 mb-16 sm:mb-20"
        >
          {DEPARTMENTS.map((dept) => {
            return (
              <div
                key={dept.id}
                className="group relative transition-colors duration-200 hover:bg-white/70"
              >
                {/* Main Row */}
                <div className="py-6 sm:py-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  
                  {/* Left Column: Department info & Credentials */}
                  <div className="flex-1 min-w-0 pr-0 lg:pr-8">
                    
                    {/* Tag badge & hours */}
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-slate-100 group-hover:bg-red-50 text-slate-600 group-hover:text-red-700 transition-colors">
                        {dept.tag[currentLang]}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{dept.hours[currentLang]}</span>
                      </span>
                    </div>

                    {/* Department Title */}
                    <h3 className="font-poppins font-bold text-xl sm:text-2xl lg:text-[26px] text-slate-950 tracking-tight transition-transform duration-200 transform group-hover:translate-x-1.5">
                      <a
                        href={`mailto:${dept.email}`}
                        className="hover:text-red-600 transition-colors"
                        aria-label={`${labels.writeEmailBtn[currentLang]} - ${dept.name[currentLang]}`}
                      >
                        {dept.name[currentLang]}
                      </a>
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl">
                      {dept.description[currentLang]}
                    </p>

                    {/* Address if specified */}
                    {dept.address && (
                      <div className="mt-3 flex items-center gap-2 text-sm font-sans text-slate-700">
                        <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{dept.address[currentLang]}</span>
                      </div>
                    )}

                    {/* Contact Credentials (Email & Phones) */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-mono">
                      
                      {/* Email Link */}
                      <div className="inline-flex items-center gap-2 min-h-[44px]">
                        <a
                          href={`mailto:${dept.email}`}
                          className="inline-flex items-center gap-2 text-slate-900 group-hover:text-red-600 font-bold hover:underline transition-colors py-1"
                          aria-label={`Email: ${dept.email}`}
                        >
                          <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <span>{dept.email}</span>
                        </a>
                        <button
                          type="button"
                          onClick={(e) => handleCopy(dept.email, `${dept.id}-email`, e)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 rounded transition-colors cursor-pointer"
                          title="Kopiuj email"
                          aria-label="Kopiuj email"
                        >
                          {copiedText === `${dept.id}-email` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Phone Links */}
                      {dept.phones.map((p, pIdx) => (
                        <div key={pIdx} className="inline-flex items-center gap-2 min-h-[44px]">
                          <a
                            href={p.href}
                            className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-950 font-medium transition-colors py-1"
                            aria-label={`Telefon: ${p.display}`}
                          >
                            <Phone className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors flex-shrink-0" />
                            <span>{p.display}</span>
                          </a>
                          <button
                            type="button"
                            onClick={(e) => handleCopy(p.display, `${dept.id}-phone-${pIdx}`, e)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 rounded transition-colors cursor-pointer"
                            title="Kopiuj telefon"
                            aria-label="Kopiuj telefon"
                          >
                            {copiedText === `${dept.id}-phone-${pIdx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ))}

                    </div>

                  </div>

                  {/* Right Column: Actions (Mailto button) */}
                  <div className="flex items-center gap-3 self-start lg:self-center flex-shrink-0 pt-2 lg:pt-0">
                    
                    {/* Action button: Napisz e-mail → */}
                    <a
                      href={`mailto:${dept.email}`}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[46px] rounded-xl bg-slate-900 hover:bg-red-600 text-white text-sm font-semibold tracking-wide transition-all duration-200 group-hover:shadow-md active:scale-[0.98]"
                      aria-label={`${labels.writeEmailBtn[currentLang]} - ${dept.name[currentLang]}`}
                    >
                      <span>{labels.writeEmailBtn[currentLang]}</span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                    </a>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContactCTASection;
