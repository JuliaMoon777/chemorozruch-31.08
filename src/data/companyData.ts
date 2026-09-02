/**
 * Centralized Company Data Source of Truth for CHEMOROZRUCH
 *
 * STRICT GOVERNANCE:
 * - Every data field conforms to { value: T, requiresConfirmation: boolean }
 * - Unconfirmed fields (requiresConfirmation: true) are flagged for human verification
 *   and MUST NOT be output into Schema.org / JSON-LD structured data.
 * - Confirmed fields (requiresConfirmation: false) are safe for production SEO.
 */

export interface CompanyField<T = string> {
  value: T;
  requiresConfirmation: boolean;
  formatted?: string;
  notes?: string;
}

export interface AddressValue {
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  fullString: string;
}

export interface CoordinatesValue {
  lat: number;
  lng: number;
}

export interface CompanyDataConfig {
  // Required Canonical Fields per Mandate
  legalCompanyName: CompanyField<string>;
  legalForm: CompanyField<string>;
  registeredAddress: CompanyField<AddressValue>;
  operationalAddress: CompanyField<AddressValue>;
  oswiecimAddress: CompanyField<AddressValue>;
  plockAddress: CompanyField<AddressValue>;
  plockBranchAddress: CompanyField<AddressValue>;
  NIP: CompanyField<string>;
  REGON: CompanyField<string>;
  KRS: CompanyField<string>;
  mainPhone: CompanyField<string>;
  offerPhone: CompanyField<string>;
  plockPhone: CompanyField<string>;
  generalEmail: CompanyField<string>;
  offerEmail: CompanyField<string>;
  plockEmail: CompanyField<string>;
  rodoEmail: CompanyField<string>;
  sygnalisciEmail: CompanyField<string>;
  coordinates: CompanyField<{
    oswiecimHQ: CoordinatesValue;
    plockBranch: CoordinatesValue;
  }>;

  // Additional Verified Constants
  brandName: CompanyField<string>;
  foundingYear: CompanyField<number>;
  vatId: CompanyField<string>;

  // Convenience contacts map for UI components
  contacts: {
    generalHQ: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      description?: string;
      requiresConfirmation: boolean;
    };
    tendering: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      description?: string;
      requiresConfirmation: boolean;
    };
    finance: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      description?: string;
      requiresConfirmation: boolean;
    };
    hr: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      description?: string;
      requiresConfirmation: boolean;
    };
    management: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      requiresConfirmation: boolean;
    };
    plockBranch: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      phoneMobile?: string;
      phoneMobileClean?: string;
      description?: string;
      requiresConfirmation: boolean;
    };
    careers: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      requiresConfirmation: boolean;
    };
    privacyDPO: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      requiresConfirmation: boolean;
    };
    whistleblower: {
      department: string;
      email: string;
      phone: string;
      phoneClean: string;
      requiresConfirmation: boolean;
    };
  };

  // Backwards-compatible legacy accessors
  legalName: string;
  nip: string;
  nipFormatted: string;
  regon: string;
  krs: string;
}

export const COMPANY_DATA: CompanyDataConfig = {
  // 1. Legal Company Name — discrepancy exists between full historical registry name and abbreviated Sp. z o.o.
  legalCompanyName: {
    value: 'CHEMOROZRUCH Sp. z o.o.',
    requiresConfirmation: true,
    notes: 'Legal text in older bylaws mentions full form: Przedsiębiorstwo Budowy i Napraw Aparatury Chemicznej i Przemysłowej „CHEMOROZRUCH” Spółka z o.o.',
  },

  // 2. Legal Form — flagged to verify Sp. z o.o. vs S.A.
  legalForm: {
    value: 'Spółka z ograniczoną odpowiedzialnością (Sp. z o.o.)',
    requiresConfirmation: true,
    notes: 'Requires confirmation of current corporate registry status (Sp. z o.o. vs S.A.)',
  },

  // 3. Registered Address (Siedziba rejestrowa)
  registeredAddress: {
    value: {
      streetAddress: 'ul. Lipowa 5',
      postalCode: '32-600',
      city: 'Oświęcim',
      country: 'Polska',
      fullString: 'ul. Lipowa 5, 32-600 Oświęcim, Polska',
    },
    requiresConfirmation: false,
  },

  // 4. Operational Address (Adres operacyjny / Zakład produkcyjny)
  operationalAddress: {
    value: {
      streetAddress: 'ul. Lipowa 5',
      postalCode: '32-600',
      city: 'Oświęcim',
      country: 'Polska',
      fullString: 'ul. Lipowa 5, 32-600 Oświęcim, Polska',
    },
    requiresConfirmation: false,
  },

  // 5. Oświęcim Address
  oswiecimAddress: {
    value: {
      streetAddress: 'ul. Lipowa 5',
      postalCode: '32-600',
      city: 'Oświęcim',
      country: 'Polska',
      fullString: 'ul. Lipowa 5, 32-600 Oświęcim, Polska',
    },
    requiresConfirmation: false,
  },

  // 6. Płock Address
  plockAddress: {
    value: {
      streetAddress: 'ul. Witolda Zglenickiego 50 F',
      postalCode: '09-400',
      city: 'Płock',
      country: 'Polska',
      fullString: 'ul. Witolda Zglenickiego 50 F, 09-400 Płock, Polska',
    },
    requiresConfirmation: false,
  },
  plockBranchAddress: {
    value: {
      streetAddress: 'ul. Witolda Zglenickiego 50 F',
      postalCode: '09-400',
      city: 'Płock',
      country: 'Polska',
      fullString: 'ul. Witolda Zglenickiego 50 F, 09-400 Płock, Polska',
    },
    requiresConfirmation: false,
  },

  // 7. NIP
  NIP: {
    value: '',
    formatted: '',
    requiresConfirmation: true,
    notes: 'Pending confirmation - excluded from schema and public display',
  },

  // 8. REGON
  REGON: {
    value: '',
    requiresConfirmation: true,
    notes: 'Pending confirmation - excluded from schema and public display',
  },

  // 9. KRS
  KRS: {
    value: '',
    requiresConfirmation: true,
    notes: 'Pending confirmation - excluded from schema and public display',
  },

  // 10. Main Phone (Sekretariat Zarządu)
  mainPhone: {
    value: '+48 33 842 59 20',
    formatted: '+48 33 842 59 20',
    requiresConfirmation: false,
  },

  // 11. Offer Phone (Dział Handlowy)
  offerPhone: {
    value: '+48 33 842 59 20, wew. 137',
    formatted: '+48 33 842 59 20, wew. 137',
    requiresConfirmation: false,
  },

  // 12. Płock Phone
  plockPhone: {
    value: '+48 24 365 40 84',
    formatted: '+48 24 365 40 84',
    requiresConfirmation: false,
  },

  // 13. General Email (Sekretariat Zarządu / Firma)
  generalEmail: {
    value: 'firma@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 14. Offer Email (Dział Handlowy)
  offerEmail: {
    value: 'dzialhandlowy@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 15. Płock Email
  plockEmail: {
    value: 'plock@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 16. RODO Email
  rodoEmail: {
    value: 'rodo@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 17. Sygnaliści Email
  sygnalisciEmail: {
    value: 'sygnalisci@chemorozruch.pl',
    requiresConfirmation: false,
  },

  // 18. Coordinates
  coordinates: {
    value: {
      oswiecimHQ: { lat: 50.0385, lng: 19.2635 },
      plockBranch: { lat: 52.5855, lng: 19.6890 },
    },
    requiresConfirmation: true,
  },

  // 19. Brand Name (Confirmed)
  brandName: {
    value: 'CHEMOROZRUCH',
    requiresConfirmation: false,
  },

  // 20. Founding Year (Confirmed: 1971)
  foundingYear: {
    value: 1971,
    requiresConfirmation: false,
  },

  // VAT ID
  vatId: {
    value: '',
    requiresConfirmation: true,
  },

  // Backwards-compatible shortcuts for UI components
  legalName: 'CHEMOROZRUCH',
  nip: '',
  nipFormatted: '',
  regon: '',
  krs: '',

  contacts: {
    generalHQ: {
      department: 'Sekretariat Zarządu / Centrala Oświęcim',
      email: 'firma@chemorozruch.pl',
      phone: '+48 33 842 59 20',
      phoneClean: '+48338425920',
      description: 'Sekretariat Zarządu',
      requiresConfirmation: false,
    },
    tendering: {
      department: 'Dział Handlowy',
      email: 'dzialhandlowy@chemorozruch.pl',
      phone: '+48 33 842 59 20, wew. 137',
      phoneClean: '+48338425920',
      description: 'Wyceny, zapytania ofertowe, kosztorysowanie i realizacje',
      requiresConfirmation: false,
    },
    finance: {
      department: 'Dział Finansowy',
      email: 'dzialfinansowy@chemorozruch.pl',
      phone: '+48 33 842 59 20, wew. 114',
      phoneClean: '+48338425920',
      description: 'Księgowość, finanse i rozliczenia',
      requiresConfirmation: false,
    },
    hr: {
      department: 'Dział Personalny',
      email: 'dzialpersonalny@chemorozruch.pl',
      phone: '+48 33 842 59 20, wew. 108',
      phoneClean: '+48338425920',
      description: 'Sprawy pracownicze i rekrutacja',
      requiresConfirmation: false,
    },
    management: {
      department: 'Sekretariat Zarządu',
      email: 'firma@chemorozruch.pl',
      phone: '+48 33 842 59 20',
      phoneClean: '+48338425920',
      requiresConfirmation: false,
    },
    plockBranch: {
      department: 'Oddział w Płocku',
      email: 'plock@chemorozruch.pl',
      phone: '+48 24 365 40 84',
      phoneClean: '+48243654084',
      phoneMobile: '+48 517 487 041',
      phoneMobileClean: '+48517487041',
      description: 'Sekretariat oddziału w Płocku',
      requiresConfirmation: false,
    },
    careers: {
      department: 'Dział Personalny',
      email: 'dzialpersonalny@chemorozruch.pl',
      phone: '+48 33 842 59 20, wew. 108',
      phoneClean: '+48338425920',
      requiresConfirmation: false,
    },
    privacyDPO: {
      department: 'Inspektor Ochrony Danych (RODO)',
      email: 'rodo@chemorozruch.pl',
      phone: '+48 33 842 59 20',
      phoneClean: '+48338425920',
      requiresConfirmation: false,
    },
    whistleblower: {
      department: 'Zgłoszenia Wewnętrzne (Sygnaliści)',
      email: 'sygnalisci@chemorozruch.pl',
      phone: '+48 33 842 59 20',
      phoneClean: '+48338425920',
      requiresConfirmation: false,
    },
  },
};

/**
 * Generates a strictly compliant Schema.org Organization structured data object.
 * CRITICAL DIRECTIVE: ONLY confirmed fields (requiresConfirmation === false) are emitted.
 * Any unconfirmed field (address, NIP, KRS, phones, coordinates) is excluded.
 */
export function getSafeOrganizationJsonLd(): object {
  const org: Record<string, any> = {
    '@type': 'Organization',
    '@id': 'https://chemorozruch.pl/#organization',
    name: COMPANY_DATA.brandName.value,
    url: 'https://chemorozruch.pl/',
    logo: 'https://chemorozruch.pl/images/chemorozruch-logo-horizontal.png',
    description: 'Inżynieria i wykonawstwo przemysłowe: konstrukcje stalowe, aparaty ciśnieniowe, montaż instalacji przemysłowych oraz remonty technologiczne.',
  };

  if (!COMPANY_DATA.legalCompanyName.requiresConfirmation) {
    org.legalName = COMPANY_DATA.legalCompanyName.value;
  }
  if (!COMPANY_DATA.foundingYear.requiresConfirmation) {
    org.foundingDate = `${COMPANY_DATA.foundingYear.value}`;
  }
  if (!COMPANY_DATA.NIP.requiresConfirmation) {
    org.taxID = COMPANY_DATA.NIP.value;
  }
  if (!COMPANY_DATA.vatId.requiresConfirmation) {
    org.vatID = COMPANY_DATA.vatId.value;
  }
  if (!COMPANY_DATA.generalEmail.requiresConfirmation) {
    org.email = COMPANY_DATA.generalEmail.value;
  }
  if (!COMPANY_DATA.mainPhone.requiresConfirmation) {
    org.telephone = COMPANY_DATA.mainPhone.value;
  }
  if (!COMPANY_DATA.registeredAddress.requiresConfirmation) {
    org.address = {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_DATA.registeredAddress.value.streetAddress,
      addressLocality: COMPANY_DATA.registeredAddress.value.city,
      postalCode: COMPANY_DATA.registeredAddress.value.postalCode,
      addressCountry: 'PL',
    };
  }

  return org;
}
