/**
 * scripts/prerender.ts
 *
 * Production Pre-rendering & SEO Engine for CHEMOROZRUCH.
 * Statically renders crawlable HTML files for:
 * 1. Homepage in 4 languages: /, /en/, /de/, /uk/
 * 2. 4 Service Landing Pages in 4 languages:
 *    - /konstrukcje-stalowe/, /en/konstrukcje-stalowe/, etc.
 *    - /remonty-modernizacje-instalacji-przemyslowych/, etc.
 *    - /aparaty-cisnieniowe/, etc.
 *    - /montaz-urzadzen-przemyslowych/, etc.
 * 3. 2 Legal Pages: /rodo, /sygnalisci (Polityka prywatnosci removed)
 */

import fs from 'fs';
import path from 'path';
import { COMPANY_DATA, getSafeOrganizationJsonLd } from '../src/data/companyData';
import { SERVICE_PAGES_DATA, ServicePageData } from '../src/data/servicePagesData';
import { Language, translations } from '../src/types';

interface PrerenderRoute {
  routePath: string;
  outputPath: string;
  lang: 'pl' | 'en' | 'de' | 'uk';
  langKey: Language;
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  isHome?: boolean;
  isService?: boolean;
  serviceSlug?: string;
  isLegal?: boolean;
  hreflangs: Array<{ lang: string; url: string }>;
  h1: string;
  bodyContent: string;
  structuredData: any;
}

const BASE_URL = 'https://chemorozruch.pl';

function getHreflangs(slugWithSlash = ''): Array<{ lang: string; url: string }> {
  return [
    { lang: 'pl', url: `${BASE_URL}/${slugWithSlash}` },
    { lang: 'en', url: `${BASE_URL}/en/${slugWithSlash}` },
    { lang: 'de', url: `${BASE_URL}/de/${slugWithSlash}` },
    { lang: 'uk', url: `${BASE_URL}/uk/${slugWithSlash}` },
    { lang: 'x-default', url: `${BASE_URL}/${slugWithSlash}` },
  ];
}

function buildRoutes(): PrerenderRoute[] {
  const routes: PrerenderRoute[] = [];

  // 1. Homepage Routes (PL, EN, DE, UK)
  const homeLangs: Array<{ langKey: Language; code: 'pl' | 'en' | 'de' | 'uk'; prefix: string }> = [
    { langKey: 'PL', code: 'pl', prefix: '' },
    { langKey: 'EN', code: 'en', prefix: 'en/' },
    { langKey: 'DE', code: 'de', prefix: 'de/' },
    { langKey: 'UA', code: 'uk', prefix: 'uk/' },
  ];

  const homepageTitles: Record<Language, string> = {
    PL: 'Konstrukcje stalowe i instalacje przemysłowe | CHEMOROZRUCH',
    EN: 'Industrial Steel Structures & Process Piping Assembly | CHEMOROZRUCH',
    DE: 'Stahlkonstruktionen & Industriemontagen | CHEMOROZRUCH',
    UA: 'Металоконструкції та промисловий монтаж установок | CHEMOROZRUCH',
  };

  const homepageDescriptions: Record<Language, string> = {
    PL: 'CHEMOROZRUCH – Generalny wykonawca konstrukcji stalowych, montażu urządzeń przemysłowych, aparatów ciśnieniowych i rurociągów technologicznych.',
    EN: 'CHEMOROZRUCH – Prime contractor for heavy industrial steel structures, pressure vessels, process piping, and mechanical plant assembly.',
    DE: 'CHEMOROZRUCH – Generalunternehmer für Stahlkonstruktionen, Druckbehälter, Industrieanlagenmontage und Rohrleitungsbau.',
    UA: 'CHEMOROZRUCH – Генеральний підрядник з виготовлення металоконструкцій, монтажу технологічного обладнання, ємностей під тиском та трубопроводів.',
  };

  homeLangs.forEach(({ langKey, code, prefix }) => {
    const canonical = `${BASE_URL}/${prefix}`;
    const outputPath = path.join('dist', prefix, 'index.html');
    const t = translations[langKey];
    const hreflangs = getHreflangs();

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        getSafeOrganizationJsonLd(),
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: BASE_URL,
          name: COMPANY_DATA.brandName.value,
          description: homepageDescriptions.PL,
          inLanguage: ['pl-PL', 'en-US', 'de-DE', 'uk-UA'],
        },
      ],
    };

    const servicesHtml = Object.values(SERVICE_PAGES_DATA)
      .map(
        (s) => `
        <article class="service-preview-card">
          <h3><a href="/${prefix}${s.slug}/">${s.meta[langKey].h1}</a></h3>
          <p>${s.meta[langKey].description}</p>
          <a href="/${prefix}${s.slug}/">${s.cta[langKey]?.btnText || 'Zobacz szczegóły oferty'} &rarr;</a>
        </article>
      `
      )
      .join('\n');

    const branchesHtml = t.locations.branches
      .map(
        (branch) => `
        <div class="branch-card">
          <h3>${branch.city} (${branch.role})</h3>
          <p>${branch.address}, ${branch.postalCode} ${branch.city}</p>
        </div>
      `
      )
      .join('\n');

    routes.push({
      routePath: `/${prefix}`,
      outputPath,
      lang: code,
      langKey,
      title: homepageTitles[langKey],
      description: homepageDescriptions[langKey],
      canonicalUrl: canonical,
      ogType: 'website',
      isHome: true,
      hreflangs,
      h1: `${COMPANY_DATA.brandName.value} – ${homepageTitles[langKey].split('|')[0].trim()}`,
      bodyContent: `
        <header class="header-nav">
          <div class="logo"><a href="/${prefix}" aria-label="CHEMOROZRUCH"><img src="/images/chemorozruch-logo-horizontal.svg" alt="CHEMOROZRUCH" width="2300" height="520" style="height:36px;width:auto;object-fit:contain;" /></a></div>
          <nav aria-label="Nawigacja główna">
            <a href="#company-discovery-section">${t.discovery.heading}</a>
            <a href="#competencies-section">${t.competencies.heading}</a>
            <a href="#tech-facilities">${t.facilities.headingLine1} ${t.facilities.headingLine2}</a>
            <a href="#realizations-section">${t.realizations.heading}</a>
            <a href="#certificates-section">${t.certificates.heading}</a>
            <a href="#locations-section">${t.locations.heading}</a>
            <a href="#kontakt-cta">${t.contactCTA.heading}</a>
          </nav>
        </header>
        <main>
          <section id="hero">
            <h1>${COMPANY_DATA.brandName.value} – ${homepageTitles[langKey].split('|')[0].trim()}</h1>
            <p>${t.hero.headline}</p>
            <p>${homepageDescriptions[langKey]}</p>
          </section>

          <section id="company-discovery-section">
            <h2>${t.discovery.heading}</h2>
            <p>${t.discovery.subheading}</p>
          </section>

          <section id="competencies-section">
            <h2>${t.competencies.heading}</h2>
            <p>${t.competencies.subheading}</p>
            <div class="services-grid">
              ${servicesHtml}
            </div>
          </section>

          <section id="tech-facilities">
            <h2>${t.facilities.headingLine1} ${t.facilities.headingLine2}</h2>
            <p>${t.facilities.supporting}</p>
          </section>

          <section id="realizations-section">
            <h2>${t.realizations.heading}</h2>
            <p>${t.realizations.supporting}</p>
          </section>

          <section id="certificates-section">
            <h2>${t.certificates.heading}</h2>
            <p>${t.certificates.supporting}</p>
          </section>

          <section id="locations-section">
            <h2>${t.locations.heading}</h2>
            <p>${t.locations.supporting}</p>
            <div class="branches-list">
              ${branchesHtml}
            </div>
          </section>

          <section id="kontakt-cta">
            <h2>${t.contactCTA.heading}</h2>
            <p>${t.contactCTA.supporting}</p>
            <p><strong>${COMPANY_DATA.brandName.value}</strong></p>
            <p>Siedziba: ${COMPANY_DATA.operationalAddress.value.fullString}</p>
            <p>Oddział Płock: ${COMPANY_DATA.plockBranchAddress.value.fullString}</p>
            <p>Telefon: ${COMPANY_DATA.contacts.generalHQ.phone} | Email: ${COMPANY_DATA.contacts.generalHQ.email}</p>
          </section>
        </main>
        <footer>
          <p>© ${new Date().getFullYear()} ${COMPANY_DATA.brandName.value}. ${t.footer.allRightsReserved}</p>
          <p>
            <a href="/rodo">${t.footer.columns.rodo}</a> |
            <a href="/sygnalisci">${t.footer.columns.whistleblower}</a>
          </p>
        </footer>
      `,
      structuredData,
    });
  });

  // 2. Service Pages (4 services x 4 languages = 16 pages)
  const servicesList: ServicePageData[] = Object.values(SERVICE_PAGES_DATA);

  servicesList.forEach((service) => {
    (['PL', 'EN', 'DE', 'UA'] as Language[]).forEach((langKey) => {
      const langCode: 'pl' | 'en' | 'de' | 'uk' = langKey === 'UA' ? 'uk' : (langKey.toLowerCase() as any);
      const prefix = langKey === 'PL' ? '' : `${langCode}/`;
      const canonical = `${BASE_URL}/${prefix}${service.slug}/`;
      const outputPath = path.join('dist', prefix, service.slug, 'index.html');
      const meta = service.meta[langKey];
      const hreflangs = getHreflangs(`${service.slug}/`);

      const structuredData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: langKey === 'PL' ? 'Strona główna' : langKey === 'EN' ? 'Home' : langKey === 'DE' ? 'Startseite' : 'Головна',
                item: `${BASE_URL}/${prefix}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: meta.title.split('|')[0].trim(),
                item: canonical,
              },
            ],
          },
          {
            '@type': 'Service',
            name: meta.h1,
            description: meta.description,
            provider: getSafeOrganizationJsonLd(),
            areaServed: ['Polska', 'Niemcy', 'Unia Europejska'],
            serviceType: meta.h1,
          },
        ],
      };

      const overviewText = service.overview[langKey]?.paragraphs?.map((p) => `<p>${p}</p>`).join('\n') || '';
      const scopeItems = service.scopeOfWork[langKey]?.items?.map((item) => `<li><strong>${item.title}:</strong> ${item.description}</li>`).join('\n') || '';
      const specsTable = service.technicalCapabilities[langKey]?.specs?.map((spec) => `<tr><td>${spec.label}</td><td>${spec.value}</td></tr>`).join('\n') || '';
      const materialsList = service.materialsAndNorms[langKey]?.materials?.join(', ') || '';
      const standardsList = service.materialsAndNorms[langKey]?.standards?.join(', ') || '';

      routes.push({
        routePath: `/${prefix}${service.slug}/`,
        outputPath,
        lang: langCode,
        langKey,
        title: meta.title,
        description: meta.description,
        canonicalUrl: canonical,
        ogType: 'article',
        isService: true,
        serviceSlug: service.slug,
        hreflangs,
        h1: meta.h1,
        bodyContent: `
          <header class="header-nav">
            <div class="logo"><a href="/${prefix}" aria-label="CHEMOROZRUCH"><img src="/images/chemorozruch-logo-horizontal.svg" alt="CHEMOROZRUCH" width="2300" height="520" style="height:36px;width:auto;object-fit:contain;" /></a></div>
            <nav aria-label="Nawigacja">
              <a href="/${prefix}">${service.breadcrumbs[langKey]?.home || 'Strona główna'}</a>
              <a href="/${prefix}#kontakt-cta">${service.cta[langKey]?.btnText || 'Zapytanie ofertowe'}</a>
            </nav>
          </header>
          <main class="service-page-container">
            <nav aria-label="Breadcrumb" class="breadcrumb">
              <a href="/${prefix}">${service.breadcrumbs[langKey]?.home || 'Strona główna'}</a> &gt;
              <span>${meta.title.split('|')[0].trim()}</span>
            </nav>
            <article>
              <h1>${meta.h1}</h1>
              <p class="service-lead">${meta.subtitle}</p>
              
              <section class="service-description">
                <h2>${service.scopeOfWork[langKey]?.title || 'Opis i charakterystyka inżynieryjna'}</h2>
                ${overviewText}
              </section>

              <section class="service-scope">
                <h2>${service.scopeOfWork[langKey]?.subtitle || 'Zakres prac i technologii'}</h2>
                <ul>
                  ${scopeItems}
                </ul>
              </section>

              <section class="service-specs">
                <h2>${service.technicalCapabilities[langKey]?.title || 'Parametry techniczne'}</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Parametr</th>
                      <th>Wartość / Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${specsTable}
                  </tbody>
                </table>
              </section>

              <section class="service-materials">
                <h2>${service.materialsAndNorms[langKey]?.title || 'Gatunki stali i normy wykonawcze'}</h2>
                <p><strong>Materiały:</strong> ${materialsList}</p>
                <p><strong>Certyfikowane normy:</strong> ${standardsList}</p>
              </section>

              <section class="service-cta">
                <h2>${service.cta[langKey]?.title || 'Skonsultuj projekt z działem inżynieryjnym'}</h2>
                <p>${service.cta[langKey]?.description || 'Zapraszamy do kontaktu z Działem Ofertowania CHEMOROZRUCH.'}</p>
                <p>Telefon: <strong>${service.cta[langKey]?.phone || COMPANY_DATA.contacts.tendering.phone}</strong> | Email: <strong>${service.cta[langKey]?.email || COMPANY_DATA.contacts.tendering.email}</strong></p>
              </section>
            </article>
          </main>
          <footer>
            <p>© ${new Date().getFullYear()} ${COMPANY_DATA.brandName.value}.</p>
            <p><a href="/rodo">RODO</a> | <a href="/sygnalisci">Sygnaliści</a></p>
          </footer>
        `,
        structuredData,
      });
    });
  });

  // 3. Legal Direct Access Pages (/rodo, /sygnalisci ONLY)
  const legalPages = [
    {
      slug: 'rodo',
      title: 'RODO – Informacja o zasadach przetwarzania danych osobowych | CHEMOROZRUCH',
      desc: 'Zasady przetwarzania danych osobowych w Przedsiębiorstwie Remontów i Modernizacji Chemorozruch Sp. z o.o., z siedzibą w Oświęcimiu przy ulicy Lipowej 5 zgodnie z RODO.',
      h1: 'Informacja o przetwarzaniu danych osobowych (RODO)',
      content: `
        <h1>Informacja o przetwarzaniu danych osobowych (RODO)</h1>
        <p>Na podstawie przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych (dalej także „RODO”), uprzejmie Państwa informujemy o zasadach przetwarzania danych osobowych w Przedsiębiorstwie Remontów i Modernizacji Chemorozruch Sp. z o.o., z siedzibą w Oświęcimiu przy ulicy Lipowej 5.</p>
        
        <h2>Administrator danych osobowych</h2>
        <p>Administratorem Państwa danych osobowych jest:</p>
        <p>Przedsiębiorstwo Remontów i Modernizacji Chemorozruch Sp. z o.o., z siedzibą w Oświęcimiu przy ulicy Lipowej 5, kod pocztowy 32-601, wpisana do Rejestru Przedsiębiorców KRS prowadzonego przez Sąd Rejonowy dla Krakowa Śródmieścia w Krakowie Wydział XII Gospodarczy Krajowego Rejestru Sądowego pod numerem KRS 0000129386.</p>
        <p>Można się z nami kontaktować w następujący sposób:</p>
        <ul>
          <li>listownie: ul. Lipowa 5, 32-601 Oświęcim</li>
          <li>przez elektroniczną skrzynkę podawczą dostępną pod adresem: <a href="mailto:rodo@chemorozruch.pl">rodo@chemorozruch.pl</a></li>
          <li>telefonicznie: <a href="tel:+48338425920">(33) 842-59-20</a></li>
        </ul>

        <h2>Cele i podstawy przetwarzania</h2>
        <p>Możemy przetwarzać Państwa dane osobowe</p>
        <ul>
          <li>na podstawie artykułu 6 ust. 1 lit. a, b, c RODO, ponieważ w zależności od konkretnego przypadku Państwa statusu osoba, której dane dotyczą wyraziła zgodę na przetwarzanie swoich danych osobowych w jednym lub większej liczbie określonych celów, przetwarzanie jest niezbędne do wykonania umowy, której stroną jest osoba, której dane dotyczą, lub do podjęcia działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy lub przetwarzanie jest niezbędne do wypełnienia obowiązku prawnego ciążącego na administratorze.</li>
          <li>w celach archiwalnych (dowodowych) dla zabezpieczenia informacji na wypadek prawnej potrzeby wykazania faktów, co jest naszym prawnie uzasadnionym interesem (podstawa z art. 6 ust. 1 lit. f RODO);</li>
          <li>w celu ewentualnego ustalenia, dochodzenia lub obrony przed roszczeniami, co jest naszym prawnie uzasadnionym interesem (podstawa z art. 6 ust. 1 lit. f RODO);</li>
        </ul>

        <h2>Kategorie danych osobowych</h2>
        <p>W celach wskazanych powyżej przetwarzamy podstawowe dane identyfikacyjne tj. imię i nazwisko, adres poczty elektronicznej, numer telefonu kontaktowego, NIP.</p>

        <h2>Odbiorcy danych osobowych</h2>
        <p>Odbiorcami Państwa danych osobowych są upoważnieni przez Administratora pracownicy Przedsiębiorstwa Remontów i Modernizacji Chemorozruch sp. z o.o. Państwa dane osobowe są przetwarzane w formie elektronicznej lub papierowej w celach organizacyjnych, księgowych, statystycznych, prawnych, informatycznych, handlowych, pocztowych oraz przez Podmioty obsługujące Administratora lub współpracujące z Administratorem - które to podmioty zostały w formie pisemnej zobowiązane do ochrony Pani/Pana danych osobowych. Odbiorcami Państwa danych osobowych mogą być również instytucje, takie w szczególności jak Zakład Ubezpieczeń Społecznych, Urząd Skarbowy, Państwowa Inspekcja Pracy, Sądy, organy ścigania upoważnione do ich przetwarzania na podstawie obowiązujących przepisów prawa.</p>

        <h2>Okres przechowywania danych</h2>
        <p>Państwa dane osobowe będą przechowywane i przetwarzane do czasu zgłoszenia przez Państwa żądania ich usunięcia, żądania sprostowania, ograniczenia przetwarzania, sprzeciwu wobec przetwarzania, żądania ich przeniesienia, wniesienia skargi do organu nadzorczego (którym jest Prezes Urzędu Ochrony Danych Osobowych) lub do upływu okresu przedawnienia potencjalnych roszczeń lub przez okres niezbędny do wypełnienia obowiązku prawnego Administratora (np. wynikającego z przepisów podatkowych lub rachunkowych).</p>

        <h2>Prawa osób, których dane dotyczą</h2>
        <p>Zgodnie z RODO przysługuje Państwu:</p>
        <ul>
          <li>prawo dostępu do swoich danych oraz otrzymania ich kopii;</li>
          <li>prawo do sprostowania (poprawiania) swoich danych;</li>
          <li>prawo do usunięcia danych osobowych, w sytuacji, gdy przetwarzanie danych nie następuje w celu wywiązania się z obowiązku wynikającego z przepisu prawa lub w ramach sprawowania władzy publicznej;</li>
          <li>prawo do ograniczenia przetwarzania danych;</li>
          <li>prawo do wniesienia sprzeciwu wobec przetwarzania danych;</li>
          <li>prawo do wniesienia skargi do Prezesa UODO (na adres Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00 - 193 Warszawa)</li>
        </ul>
        <p>Wyrażając przez Państwo zgodę na przetwarzanie danych osobowych, mają Państwo prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania.</p>

        <h2>Konsekwencje niepodania danych osobowych:</h2>
        <p>Podanie przez Państwa danych osobowych jest dobrowolne, ale niezbędne do zawarcia i wykonania umów dotyczących zatrudnienia, czy też umów z kontrahentami.</p>
        <p>Jeżeli wymagają tego przepisy prawa, możemy wymagać od Państwa podania innych niezbędnych danych, w szczególności ze względów rachunkowych lub podatkowych.</p>
        <p>Administrator danych osobowych dokłada wszelkich starań, aby zapewnić wszelkie środki fizycznej, technicznej i organizacyjnej ochrony danych osobowych przed ich przypadkowym czy umyślnym zniszczeniem, przypadkową utratą, zmianą, nieuprawnionym ujawnieniem, wykorzystaniem czy dostępem, zgodnie ze wszystkimi obowiązującymi przepisami.</p>
        <p>Niniejsza informacja ma charakter ogólny. Szczegółowe informacje dotyczące przetwarzania danych osobowych przez Administratora oraz przysługujących Państwu w związku z tym praw, stanowiące realizację obowiązku informacyjnego Administratora, o którym mowa w art. 13 RODO, zostanie Państwu przekazana każdorazowo w związku z załatwieniem konkretnej sprawy.</p>
      `,
    },
    {
      slug: 'sygnalisci',
      title: 'Sygnalisto! – Procedura Zgłoszeń Wewnętrznych | CHEMOROZRUCH',
      desc: 'Zanim dokonasz zgłoszenia wewnętrznego zapoznaj się z informacjami o procedurze i ochronie sygnalistów w Przedsiębiorstwie Remontów i Modernizacji Chemorozruch sp. z o.o.',
      h1: 'Sygnalisto! – CHEMOROZRUCH',
      content: `
        <h1>Sygnalisto!</h1>
        <p><strong>Zanim dokonasz zgłoszenia wewnętrznego zapoznaj się z poniższymi informacjami:</strong></p>

        <p>1. Zgłoszenie będzie rozpatrywane zgodnie z zapisami Dyrektywy Parlamentu. Europejskiego i Rady (UE) 2019/1937 z dnia 23.10.2019r. w sprawie ochrony osób zgłaszających naruszenia prawa Unii oraz Ustawy z dnia 14.06.2024 r. o ochronie sygnalistów.</p>

        <p>2. Kwestię zgłoszeń wewnętrznych określa także procedura zgłaszania przypadków nieprawidłowości, podejmowania działań następczych oraz ochrony osób dokonujących zgłoszeń obowiązująca w Przedsiębiorstwie Remontów i Modernizacji Chemorozruch sp. z o.o.</p>

        <p>3. Zgłoszenia można dokonać osobiście u Pełnomocnika ds. naruszeń prawa, mailowo wysyłając na adres: <a href="mailto:sygnalista@chemorozruch.pl">sygnalista@chemorozruch.pl</a> lub wysyłając list tradycyjny na adres Spółki tj. 32-601 Oświęcim ul. Lipowa 5.</p>

        <p>4. Zgłoszenie dotyczyć powinno naruszeń prawa a w szczególności</p>
        <ul>
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

        <p>5. Zgłoszenia może dokonać m.in.:</p>
        <ul>
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

        <p>6. Sygnalista podlega ochronie określonej w przepisach od chwili dokonania zgłoszenia, pod warunkiem, że miał uzasadnione podstawy sądzić, że informacja będąca przedmiotem zgłoszenia lub ujawnienia publicznego jest prawdziwa w momencie dokonywania zgłoszenia lub ujawnienia publicznego i że stanowi informację o naruszeniu prawa.</p>

        <p><strong>Jeżeli w treści zgłoszenia znajdą się dane osobowe to:</strong></p>

        <p>Administratorem tych danych będzie Przedsiębiorstwo Remontów i Modernizacji Chemorozruch sp. z o.o. z siedzibą w Oświęcimiu przy ulicy Lipowej 5.</p>

        <p>Dane będą przetwarzane wyłącznie w celu, zakresie i przez okres niezbędny do realizacji obowiązków związanych z przyjmowaniem i obsługą zgłoszeń sygnalistów (podstawa przetwarzania danych: art. 6 ust. 1 lit. c) RODO w zw. z ustawą o ochronie sygnalistów z dnia 14 czerwca 2024 r.</p>

        <p>Przepisy ustawy o ochronie sygnalistów wskazują m.in., że dane osobowe przetwarzane w związku z przyjęciem zgłoszenia lub podjęciem działań następczych oraz dokumenty związane z tym zgłoszeniem mają być przechowywane przez okres 3 lat po zakończeniu roku kalendarzowego, w którym zakończono działania następcze, lub po zakończeniu postępowań zainicjowanych tymi działaniami.</p>

        <p><strong>Spółka nie rozpatruje zgłoszeń anonimowych.</strong></p>

        <p>Podanie danych jest dobrowolne, ale niezbędne do przyjęcia zgłoszenia i prowadzenia działań następczych.</p>

        <p>Osoba, której dane są przetwarzane ma prawo dostępu do danych osobowych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do wniesienia sprzeciwu wobec przetwarzania oraz skargi do Prezesa Urzędu Ochrony Danych Osobowych.</p>

        <p>Więcej informacji możesz uzyskać w Siedzibie Spółki.</p>
      `,
    },
  ];

  legalPages.forEach((legal) => {
    const canonical = `${BASE_URL}/${legal.slug}`;
    const outputPath = path.join('dist', legal.slug, 'index.html');
    routes.push({
      routePath: `/${legal.slug}`,
      outputPath,
      lang: 'pl',
      langKey: 'PL',
      title: legal.title,
      description: legal.desc,
      canonicalUrl: canonical,
      ogType: 'article',
      isLegal: true,
      hreflangs: [{ lang: 'pl', url: canonical }],
      h1: legal.h1,
      bodyContent: `
        <header class="header-nav">
          <div class="logo"><a href="/" aria-label="CHEMOROZRUCH"><img src="/images/chemorozruch-logo-horizontal.svg" alt="CHEMOROZRUCH" width="2300" height="520" style="height:36px;width:auto;object-fit:contain;" /></a></div>
          <nav aria-label="Nawigacja"><a href="/">Powrót do strony głównej</a></nav>
        </header>
        <main class="legal-document-container">
          <article>
            ${legal.content}
          </article>
        </main>
        <footer>
          <p>© ${new Date().getFullYear()} ${COMPANY_DATA.brandName.value}. Wszelkie prawa zastrzeżone.</p>
        </footer>
      `,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: legal.title,
        description: legal.desc,
        url: canonical,
      },
    });
  });

  return routes;
}

// Generate the final static HTML using dist/index.html as template
async function prerender() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Template dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  // Extract JS scripts and CSS link tags injected by Vite
  const scriptMatch = templateHtml.match(/<script\s+type="module"\s+crossorigin\s+src="([^"]+)"><\/script>/);
  const cssMatch = templateHtml.match(/<link\s+rel="stylesheet"\s+crossorigin\s+href="([^"]+)">/);

  const scriptTag = scriptMatch ? scriptMatch[0] : '';
  const cssTag = cssMatch ? cssMatch[0] : '';

  console.log(`Extracted bundles:\n  CSS: ${cssTag}\n  JS: ${scriptTag}`);

  const routes = buildRoutes();
  console.log(`\nPrerendering ${routes.length} static routes...`);

  for (const route of routes) {
    const dir = path.dirname(route.outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Build hreflang link tags
    const hreflangTags = route.hreflangs
      .map((hl) => `<link rel="alternate" hreflang="${hl.lang}" href="${hl.url}" />`)
      .join('\n    ');

    // Structured data JSON-LD script
    const jsonLdTag = `<script type="application/ld+json">\n${JSON.stringify(route.structuredData, null, 2)}\n    </script>`;

    // Build the complete standalone pre-rendered HTML document
    const html = `<!DOCTYPE html>
<html lang="${route.lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#FAF9F5" />
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${route.canonicalUrl}" />
    
    <!-- Indexing and Robots Rules -->
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    
    <!-- Reciprocal Multi-language Hreflang Cluster -->
    ${hreflangTags}

    <!-- Open Graph Protocol -->
    <meta property="og:site_name" content="CHEMOROZRUCH" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:type" content="${route.ogType}" />
    <meta property="og:url" content="${route.canonicalUrl}" />
    <meta property="og:locale" content="${route.lang === 'pl' ? 'pl_PL' : route.lang === 'en' ? 'en_US' : route.lang === 'de' ? 'de_DE' : 'uk_UA'}" />
    <meta property="og:image" content="${BASE_URL}/images/chemorozruch_plant_topdown_1787214324065.jpg" />

    <!-- Twitter Card Meta -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${BASE_URL}/images/chemorozruch_plant_topdown_1787214324065.jpg" />

    <!-- Structured Data JSON-LD -->
    ${jsonLdTag}

    <!-- Favicon and Brand Assets -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Fonts preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet" />

    <!-- Production Compiled Styles -->
    ${cssTag}
  </head>
  <body class="bg-[#FAF9F5] text-slate-900 font-sans antialiased selection:bg-red-500 selection:text-white">
    <div id="root">${route.bodyContent}</div>
    ${scriptTag}
  </body>
</html>`;

    fs.writeFileSync(route.outputPath, html, 'utf8');
    const size = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
    console.log(`  ✓ [${route.lang.toUpperCase()}] ${route.routePath} -> ${route.outputPath} (${size} KB)`);
  }

  console.log(`\nPrerendering successfully generated ${routes.length} crawlable static HTML pages!`);
  
  // Clean up temporary cjs bundle if it exists
  const tempBundle = path.join(distDir, 'prerender.cjs');
  if (fs.existsSync(tempBundle)) {
    try {
      fs.unlinkSync(tempBundle);
    } catch {}
  }
}

prerender().catch((err) => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
