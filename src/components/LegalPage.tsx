import React, { useEffect } from 'react';
import { Language, translations } from '../types';
import { IndustrialHeader } from './IndustrialHeader';
import { IndustrialFooter } from './IndustrialFooter';
import { SEOHead } from './SEOHead';
import { ArrowLeft, Printer, ShieldCheck, FileText, Mail, Building2 } from 'lucide-react';

interface LegalPageProps {
  docType: 'rodo' | 'sygnalisci';
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateHome: (hash?: string) => void;
  onNavigateService?: (slug: string) => void;
  onOpenLegal: (doc: 'rodo' | 'sygnalisci') => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  docType,
  currentLang,
  onLanguageChange,
  onNavigateHome,
  onOpenLegal,
}) => {
  const t = translations[currentLang];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [docType]);

  const handlePrint = () => {
    window.print();
  };

  const seoTitle =
    docType === 'rodo'
      ? 'RODO – Informacja o zasadach przetwarzania danych osobowych | CHEMOROZRUCH'
      : 'Procedura Zgłoszeń Wewnętrznych (Sygnaliści) | CHEMOROZRUCH';

  const seoDescription =
    docType === 'rodo'
      ? 'Zasady przetwarzania danych osobowych w Przedsiębiorstwie Remontów i Modernizacji Chemorozruch Sp. z o.o., z siedzibą w Oświęcimiu przy ulicy Lipowej 5 zgodnie z RODO.'
      : 'Wewnętrzna procedura dokonywania zgłoszeń naruszeń prawa oraz ochrona sygnalistów w CHEMOROZRUCH Sp. z o.o.';

  const canonicalUrl = `https://chemorozruch.pl/${docType}`;

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-slate-900 font-sans flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* 1. SEO Head */}
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        currentLang={currentLang}
        routeSlug={docType}
        ogType="article"
      />

      {/* 2. Top Header */}
      <IndustrialHeader
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenInquiry={() => onNavigateHome('kontakt-cta')}
      />

      {/* 3. Main Document Canvas */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-24">
        {/* Navigation Breadcrumb & Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80">
          <button
            type="button"
            onClick={() => onNavigateHome()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Powrót do strony głównej</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Drukuj dokument</span>
            </button>
          </div>
        </div>

        {/* Document Container Card */}
        <article className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 border border-slate-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] space-y-8">
          {docType === 'rodo' ? (
            <ExactRodoContent />
          ) : (
            <ExactSygnalisciContent />
          )}
        </article>

        {/* Compliance Footer Note */}
        <div className="mt-8 p-4 rounded-xl bg-slate-100/80 border border-slate-200/70 flex items-center justify-between text-xs text-slate-600 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dokumentacja prawna Przedsiębiorstwa Remontów i Modernizacji Chemorozruch Sp. z o.o.</span>
          </div>
          <span className="hidden sm:inline text-slate-400">KRS: 0000129386</span>
        </div>
      </main>

      {/* 4. Global Footer */}
      <IndustrialFooter
        currentLang={currentLang}
        onLanguageChange={onLanguageChange}
        onOpenLegal={(doc) => onOpenLegal(doc)}
      />
    </div>
  );
};

// =========================================================================
// EXACT POLISH RODO CONTENT SUPPLIED BY USER (NO ALTERATIONS / WORDING PRESERVED)
// =========================================================================
export const ExactRodoContent: React.FC = () => (
  <div className="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
    <div className="border-b border-slate-200 pb-5 mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold mb-3">
        <FileText className="w-3.5 h-3.5" />
        KLAUZULA INFORMACYJNA RODO
      </div>
      <h1 className="font-poppins font-black text-2xl sm:text-3xl text-slate-950 tracking-tight leading-tight">
        Informacja o zasadach przetwarzania danych osobowych (RODO)
      </h1>
    </div>

    <p className="text-slate-800 leading-relaxed">
      Na podstawie przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (dalej także „RODO”), uprzejmie Państwa informujemy o zasadach przetwarzania danych osobowych w Przedsiębiorstwie Remontów i Modernizacji Chemorozruch Sp. z o.o., z siedzibą w Oświęcimiu przy ulicy Lipowej 5.
    </p>

    {/* Section 1 */}
    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Administrator danych osobowych
      </h2>
      <p>
        Administratorem Państwa danych osobowych jest:
      </p>
      <p>
        Przedsiębiorstwo Remontów i Modernizacji Chemorozruch Sp. z o.o., z siedzibą w Oświęcimiu przy ulicy Lipowej 5, kod pocztowy 32-601, wpisana do Rejestru Przedsiębiorców KRS prowadzonego przez Sąd Rejonowy dla Krakowa Śródmieścia w Krakowie Wydział XII Gospodarczy Krajowego Rejestru Sądowego pod numerem KRS 0000129386.
      </p>
      <p>
        Można się z nami kontaktować w następujący sposób:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>listownie: ul. Lipowa 5, 32-601 Oświęcim</li>
        <li>
          przez elektroniczną skrzynkę podawczą dostępną pod adresem:{' '}
          <a href="mailto:rodo@chemorozruch.pl" className="text-red-600 font-bold hover:underline">
            rodo@chemorozruch.pl
          </a>
        </li>
        <li>
          telefonicznie:{' '}
          <a href="tel:+48338425920" className="text-red-600 font-bold hover:underline">
            (33) 842-59-20
          </a>
        </li>
      </ul>
    </div>

    {/* Section 2 */}
    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Cele i podstawy przetwarzania
      </h2>
      <p>
        Możemy przetwarzać Państwa dane osobowe
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          na podstawie artykułu 6 ust. 1 lit. a, b, c RODO, ponieważ w zależności od konkretnego przypadku Państwa statusu osoba, której dane dotyczą wyraziła zgodę na przetwarzanie swoich danych osobowych w jednym lub większej liczbie określonych celów, przetwarzanie jest niezbędne do wykonania umowy, której stroną jest osoba, której dane dotyczą, lub do podjęcia działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy lub przetwarzanie jest niezbędne do wypełnienia obowiązku prawnego ciążącego na administratorze.
        </li>
        <li>
          w celach archiwalnych (dowodowych) dla zabezpieczenia informacji na wypadek prawnej potrzeby wykazania faktów, co jest naszym prawnie uzasadnionym interesem (podstawa z art. 6 ust. 1 lit. f RODO);
        </li>
        <li>
          w celu ewentualnego ustalenia, dochodzenia lub obrony przed roszczeniami, co jest naszym prawnie uzasadnionym interesem (podstawa z art. 6 ust. 1 lit. f RODO);
        </li>
      </ul>
    </div>

    {/* Section 3 */}
    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Kategorie danych osobowych
      </h2>
      <p>
        W celach wskazanych powyżej przetwarzamy podstawowe dane identyfikacyjne tj. imię i nazwisko, adres poczty elektronicznej, numer telefonu kontaktowego, NIP.
      </p>
    </div>

    {/* Section 4 */}
    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Odbiorcy danych osobowych
      </h2>
      <p>
        Odbiorcami Państwa danych osobowych są upoważnieni przez Administratora pracownicy Przedsiębiorstwa Remontów i Modernizacji Chemorozruch sp. z o.o. Państwa dane osobowe są przetwarzane w formie elektronicznej lub papierowej w celach organizacyjnych, księgowych, statystycznych, prawnych, informatycznych, handlowych, pocztowych oraz przez Podmioty obsługujące Administratora lub współpracujące z Administratorem - które to podmioty zostały w formie pisemnej zobowiązane do ochrony Pani/Pana danych osobowych. Odbiorcami Państwa danych osobowych mogą być również instytucje, takie w szczególności jak Zakład Ubezpieczeń Społecznych, Urząd Skarbowy, Państwowa Inspekcja Pracy, Sądy, organy ścigania upoważnione do ich przetwarzania na podstawie obowiązujących przepisów prawa.
      </p>
    </div>

    {/* Section 5 */}
    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Okres przechowywania danych
      </h2>
      <p>
        Państwa dane osobowe będą przechowywane i przetwarzane do czasu zgłoszenia przez Państwa żądania ich usunięcia, żądania sprostowania, ograniczenia przetwarzania, sprzeciwu wobec przetwarzania, żądania ich przeniesienia, wniesienia skargi do organu nadzorczego (którym jest Prezes Urzędu Ochrony Danych Osobowych) lub do upływu okresu przedawnienia potencjalnych roszczeń lub przez okres niezbędny do wypełnienia obowiązku prawnego Administratora (np. wynikającego z przepisów podatkowych lub rachunkowych).
      </p>
    </div>

    {/* Section 6 */}
    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Prawa osób, których dane dotyczą
      </h2>
      <p>
        Zgodnie z RODO przysługuje Państwu:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>prawo dostępu do swoich danych oraz otrzymania ich kopii;</li>
        <li>prawo do sprostowania (poprawiania) swoich danych;</li>
        <li>prawo do usunięcia danych osobowych, w sytuacji, gdy przetwarzanie danych nie następuje w celu wywiązania się z obowiązku wynikającego z przepisu prawa lub w ramach sprawowania władzy publicznej;</li>
        <li>prawo do ograniczenia przetwarzania danych;</li>
        <li>prawo do wniesienia sprzeciwu wobec przetwarzania danych;</li>
        <li>prawo do wniesienia skargi do Prezesa UODO (na adres Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00 - 193 Warszawa)</li>
      </ul>
      <p>
        Wyrażając przez Państwo zgodę na przetwarzanie danych osobowych, mają Państwo prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania.
      </p>
    </div>

    {/* Section 7 */}
    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Konsekwencje niepodania danych osobowych:
      </h2>
      <p>
        Podanie przez Państwa danych osobowych jest dobrowolne, ale niezbędne do zawarcia i wykonania umów dotyczących zatrudnienia, czy też umów z kontrahentami.
      </p>
      <p>
        Jeżeli wymagają tego przepisy prawa, możemy wymagać od Państwa podania innych niezbędnych danych, w szczególności ze względów rachunkowych lub podatkowych.
      </p>
      <p>
        Administrator danych osobowych dokłada wszelkich starań, aby zapewnić wszelkie środki fizycznej, technicznej i organizacyjnej ochrony danych osobowych przed ich przypadkowym czy umyślnym zniszczeniem, przypadkową utratą, zmianą, nieuprawnionym ujawnieniem, wykorzystaniem czy dostępem, zgodnie ze wszystkimi obowiązującymi przepisami.
      </p>
      <p>
        Niniejsza informacja ma charakter ogólny. Szczegółowe informacje dotyczące przetwarzania danych osobowych przez Administratora oraz przysługujących Państwu w związku z tym praw, stanowiące realizację obowiązku informacyjnego Administratora, o którym mowa w art. 13 RODO, zostanie Państwu przekazana każdorazowo w związku z załatwieniem konkretnej sprawy.
      </p>
    </div>
  </div>
);

// =========================================================================
// SYGNALIŚCI PROCEDURA (DEDICATED INFORMATION / LEGAL PAGE)
// =========================================================================
export const ExactSygnalisciContent: React.FC = () => (
  <div className="space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base font-sans">
    <div className="border-b border-slate-200 pb-5 mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold mb-3">
        <ShieldCheck className="w-3.5 h-3.5" />
        PROCEDURA ZGŁOSZEŃ WEWNĘTRZNYCH
      </div>
      <h1 className="font-poppins font-black text-2xl sm:text-3xl text-slate-950 tracking-tight leading-tight">
        Sygnalisto!
      </h1>
    </div>

    <p className="text-slate-900 font-medium leading-relaxed">
      Zanim dokonasz zgłoszenia wewnętrznego zapoznaj się z poniższymi informacjami:
    </p>

    <div className="space-y-4 pt-1">
      <p className="leading-relaxed">
        1. Zgłoszenie będzie rozpatrywane zgodnie z zapisami Dyrektywy Parlamentu. Europejskiego i Rady (UE) 2019/1937 z dnia 23.10.2019r. w sprawie ochrony osób zgłaszających naruszenia prawa Unii oraz Ustawy z dnia 14.06.2024 r. o ochronie sygnalistów.
      </p>

      <p className="leading-relaxed">
        2. Kwestię zgłoszeń wewnętrznych określa także procedura zgłaszania przypadków nieprawidłowości, podejmowania działań następczych oraz ochrony osób dokonujących zgłoszeń obowiązująca w Przedsiębiorstwie Remontów i Modernizacji Chemorozruch sp. z o.o.
      </p>

      <p className="leading-relaxed">
        3. Zgłoszenia można dokonać osobiście u Pełnomocnika ds. naruszeń prawa, mailowo wysyłając na adres:{' '}
        <a
          href="mailto:sygnalista@chemorozruch.pl"
          className="text-red-600 font-bold hover:underline"
        >
          sygnalista@chemorozruch.pl
        </a>{' '}
        lub wysyłając list tradycyjny na adres Spółki tj. 32-601 Oświęcim ul. Lipowa 5.
      </p>

      <div className="space-y-2">
        <p className="leading-relaxed">
          4. Zgłoszenie dotyczyć powinno naruszeń prawa a w szczególności
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-800">
          <li>korupcji;</li>
          <li>zamówień publicznych;</li>
          <li>usług, produktów i rynków finansowych;</li>
          <li>przeciwdziałania praniu pieniędzy oraz finansowaniu terroryzmu;</li>
          <li>bezpieczeństwa produktów i ich zgodności z wymogami;</li>
          <li>bezpieczeństwa transportu;</li>
          <li>ochrony środowiska;</li>
          <li>ochrony radiologicznej i bezpieczeństwa jądrowego;</li>
          <li>ochrony prywatności i danych osobowych;</li>
        </ul>
      </div>

      <div className="space-y-2">
        <p className="leading-relaxed">
          5. Zgłoszenia może dokonać m.in.:
        </p>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-800">
          <li>pracownik;</li>
          <li>pracownik tymczasowy;</li>
          <li>osoba świadcząca pracę na innej podstawie niż stosunek pracy, w tym na podstawie umowy cywilnoprawnej;</li>
          <li>przedsiębiorca;</li>
          <li>prokurent;</li>
          <li>akcjonariusz lub wspólnik;</li>
          <li>członek organu osoby prawnej lub jednostki organizacyjnej nieposiadającej osobowości prawnej;</li>
          <li>osoba świadcząca pracę pod nadzorem i kierownictwem wykonawcy, podwykonawcy lub dostawcy;</li>
          <li>stażysta;</li>
          <li>praktykant;</li>
        </ul>
      </div>

      <p className="leading-relaxed">
        6. Sygnalista podlega ochronie określonej w przepisach od chwili dokonania zgłoszenia, pod warunkiem, że miał uzasadnione podstawy sądzić, że informacja będąca przedmiotem zgłoszenia lub ujawnienia publicznego jest prawdziwa w momencie dokonywania zgłoszenia lub ujawnienia publicznego i że stanowi informację o naruszeniu prawa.
      </p>
    </div>

    <div className="pt-4 border-t border-slate-200/80 space-y-4">
      <p className="font-semibold text-slate-950">
        Jeżeli w treści zgłoszenia znajdą się dane osobowe to:
      </p>

      <p className="leading-relaxed">
        Administratorem tych danych będzie Przedsiębiorstwo Remontów i Modernizacji Chemorozruch sp. z o.o. z siedzibą w Oświęcimiu przy ulicy Lipowej 5.
      </p>

      <p className="leading-relaxed">
        Dane będą przetwarzane wyłącznie w celu, zakresie i przez okres niezbędny do realizacji obowiązków związanych z przyjmowaniem i obsługą zgłoszeń sygnalistów (podstawa przetwarzania danych: art. 6 ust. 1 lit. c) RODO w zw. z ustawą o ochronie sygnalistów z dnia 14 czerwca 2024 r.
      </p>

      <p className="leading-relaxed">
        Przepisy ustawy o ochronie sygnalistów wskazują m.in., że dane osobowe przetwarzane w związku z przyjęciem zgłoszenia lub podjęciem działań następczych oraz dokumenty związane z tym zgłoszeniem mają być przechowywane przez okres 3 lat po zakończeniu roku kalendarzowego, w którym zakończono działania następcze, lub po zakończeniu postępowań zainicjowanych tymi działaniami.
      </p>

      <p className="leading-relaxed font-semibold text-slate-900">
        Spółka nie rozpatruje zgłoszeń anonimowych.
      </p>

      <p className="leading-relaxed">
        Podanie danych jest dobrowolne, ale niezbędne do przyjęcia zgłoszenia i prowadzenia działań następczych.
      </p>

      <p className="leading-relaxed">
        Osoba, której dane są przetwarzane ma prawo dostępu do danych osobowych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do wniesienia sprzeciwu wobec przetwarzania oraz skargi do Prezesa Urzędu Ochrony Danych Osobowych.
      </p>

      <p className="leading-relaxed text-slate-900 font-medium">
        Więcej informacji możesz uzyskać w Siedzibie Spółki.
      </p>
    </div>
  </div>
);

export default LegalPage;
