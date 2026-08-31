import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, FileText, ArrowLeft, Printer, Building2, Mail, Phone } from 'lucide-react';
import { ChemorozruchLogo } from './ChemorozruchLogo';

export type LegalDocType = 'rodo' | 'sygnalisci' | null;

interface LegalModalProps {
  isOpen: boolean;
  docType: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, docType, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Scroll to top when docType changes
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen, docType]);

  if (!isOpen || !docType) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="legal-document-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-document-title"
    >
      {/* Background click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Large Accessible Modal Window */}
      <div className="relative w-full max-w-4xl h-full sm:h-[92vh] max-h-[1000px] bg-[#FAF9F5] sm:rounded-3xl border border-slate-200/90 shadow-[0_25px_70px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="flex-shrink-0 px-6 sm:px-8 py-4 sm:py-5 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              aria-label="Wróć do strony"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 flex-shrink-0">
                <ChemorozruchLogo className="w-full h-full" iconOnly={true} />
              </div>
              <div>
                <span className="font-poppins font-black text-xs sm:text-sm tracking-tight text-slate-950 block leading-tight">
                  CHEMOROZRUCH Sp. z o.o.
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  DOKUMENTACJA PRAWNA I COMPLIANCE
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Drukuj dokument"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drukuj</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 transition-colors cursor-pointer"
              aria-label="Zamknij dokument"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-10 text-slate-800 leading-relaxed font-sans overscroll-contain"
        >
          {docType === 'rodo' && <RodoExactLegalText />}
          {docType === 'sygnalisci' && <SygnalisciLegalText />}
        </div>

        {/* Bottom Verification Footer */}
        <div className="flex-shrink-0 px-6 sm:px-8 py-3.5 bg-slate-100/90 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dokument zatwierdzony przez Przedsiębiorstwo Remontów i Modernizacji Chemorozruch Sp. z o.o.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-red-600 font-bold hover:underline cursor-pointer"
          >
            Zamknij i wróć do serwisu
          </button>
        </div>

      </div>
    </div>
  );
};

// =========================================================================
// 1. EXACT USER-SUPPLIED POLISH RODO LEGAL TEXT
// =========================================================================
const RodoExactLegalText: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
    <div className="border-b border-slate-200 pb-5 mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold mb-3">
        <FileText className="w-3.5 h-3.5" />
        KLAUZULA INFORMACYJNA RODO
      </div>
      <h1 id="legal-document-title" className="font-poppins font-black text-2xl sm:text-3xl text-slate-950 tracking-tight leading-tight">
        Informacja o przetwarzaniu danych osobowych (RODO)
      </h1>
    </div>

    <p className="text-slate-800 leading-relaxed">
      Na podstawie przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (dalej także „RODO”), uprzejmie Państwa informujemy o zasadach przetwarzania danych osobowych w Przedsiębiorstwie Remontów i Modernizacji Chemorozruch Sp. z o.o., z siedzibą w Oświęcimiu przy ulicy Lipowej 5.
    </p>

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

    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Kategorie danych osobowych
      </h2>
      <p>
        W celach wskazanych powyżej przetwarzamy podstawowe dane identyfikacyjne tj. imię i nazwisko, adres poczty elektronicznej, numer telefonu kontaktowego, NIP.
      </p>
    </div>

    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Odbiorcy danych osobowych
      </h2>
      <p>
        Odbiorcami Państwa danych osobowych są upoważnieni przez Administratora pracownicy Przedsiębiorstwa Remontów i Modernizacji Chemorozruch sp. z o.o. Państwa dane osobowe są przetwarzane w formie elektronicznej lub papierowej w celach organizacyjnych, księgowych, statystycznych, prawnych, informatycznych, handlowych, pocztowych oraz przez Podmioty obsługujące Administratora lub współpracujące z Administratorem - które to podmioty zostały w formie pisemnej zobowiązane do ochrony Pani/Pana danych osobowych. Odbiorcami Państwa danych osobowych mogą być również instytucje, takie w szczególności jak Zakład Ubezpieczeń Społecznych, Urząd Skarbowy, Państwowa Inspekcja Pracy, Sądy, organy ścigania upoważnione do ich przetwarzania na podstawie obowiązujących przepisów prawa.
      </p>
    </div>

    <div className="pt-2 space-y-3">
      <h2 className="font-poppins font-bold text-lg sm:text-xl text-slate-950">
        Okres przechowywania danych
      </h2>
      <p>
        Państwa dane osobowe będą przechowywane i przetwarzane do czasu zgłoszenia przez Państwa żądania ich usunięcia, żądania sprostowania, ograniczenia przetwarzania, sprzeciwu wobec przetwarzania, żądania ich przeniesienia, wniesienia skargi do organu nadzorczego (którym jest Prezes Urzędu Ochrony Danych Osobowych) lub do upływu okresu przedawnienia potencjalnych roszczeń lub przez okres niezbędny do wypełnienia obowiązku prawnego Administratora (np. wynikającego z przepisów podatkowych lub rachunkowych).
      </p>
    </div>

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
// 2. OFICJALNY TEKST PROCEDURY SYGNALISTÓW
// =========================================================================
const SygnalisciLegalText: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base font-sans">
    <div className="border-b border-slate-200 pb-5 mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold mb-3">
        <ShieldCheck className="w-3.5 h-3.5" />
        PROCEDURA ZGŁOSZEŃ WEWNĘTRZNYCH
      </div>
      <h1 id="legal-document-title" className="font-poppins font-black text-2xl sm:text-3xl text-slate-950 tracking-tight leading-tight">
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

export default LegalModal;
