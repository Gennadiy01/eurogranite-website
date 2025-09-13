// Дані продукції EuroGranite - Гранітна бруківка
// Створено: вересень 2025

// Типи обробки поверхні граніту
export const surfaceFinishTypes = {
  split: {
    id: 'split',
    name: {
      ua: 'Колота',
      en: 'Split',
      de: 'Gespalten',
      pl: 'Łupana'
    },
    description: {
      ua: 'Природна текстура з рельєфною поверхнею',
      en: 'Natural texture with relief surface',
      de: 'Natürliche Textur mit Relief-Oberfläche',
      pl: 'Naturalna tekstura z powierzchnią reliefową'
    },
    icon: '⛏️'
  },
  sawn: {
    id: 'sawn',
    name: {
      ua: 'Пиляна',
      en: 'Sawn',
      de: 'Gesägt',
      pl: 'Piłowana'
    },
    description: {
      ua: 'Рівна поверхня після алмазного різання',
      en: 'Even surface after diamond cutting',
      de: 'Ebene Oberfläche nach Diamantschnitt',
      pl: 'Równa powierzchnia po cięciu diamentowym'
    },
    icon: '🔷'
  },
  thermal: {
    id: 'thermal',
    name: {
      ua: 'Термооброблена',
      en: 'Thermal',
      de: 'Thermisch behandelt',
      pl: 'Termicznie obrobiona'
    },
    description: {
      ua: 'Антислизька поверхня після термообробки',
      en: 'Anti-slip surface after thermal treatment',
      de: 'Rutschfeste Oberfläche nach Wärmebehandlung',
      pl: 'Powierzchnia antypoślizgowa po obróbce termicznej'
    },
    icon: '🔥'
  }
};

// Комбіновані типи обробки
export const combinedFinishTypes = {
  'sawn-thermal-top': {
    id: 'sawn-thermal-top',
    name: {
      ua: 'Пиляна з термообробкою верху',
      en: 'Sawn with thermal top',
      de: 'Gesägt mit thermischer Oberseite',
      pl: 'Piłowana z termiczną górą'
    },
    description: {
      ua: 'Всі сторони пиляні, верх термооброблений',
      en: 'All sides sawn, top thermally treated',
      de: 'Alle Seiten gesägt, Oberseite thermisch behandelt',
      pl: 'Wszystkie boki piłowane, góra termicznie obrobiona'
    },
    surfaces: {
      top: 'thermal',
      sides: 'sawn',
      bottom: 'sawn'
    },
    icon: '🔷🔥'
  },
  'split-sawn-thermal': {
    id: 'split-sawn-thermal',
    name: {
      ua: '2 сторони колоті, 2 пиляні + термо верх',
      en: '2 sides split, 2 sawn + thermal top',
      de: '2 Seiten gespalten, 2 gesägt + therm. Oberseite',
      pl: '2 boki łupane, 2 piłowane + termo góra'
    },
    description: {
      ua: 'Комбінована обробка для особливої текстури',
      en: 'Combined processing for special texture',
      de: 'Kombinierte Bearbeitung für besondere Textur',
      pl: 'Łączona obróbka dla specjalnej tekstury'
    },
    surfaces: {
      top: 'thermal',
      front: 'split',
      back: 'split', 
      left: 'sawn',
      right: 'sawn',
      bottom: 'sawn'
    },
    icon: '⛏️🔷🔥'
  }
};

// Стандартні розміри бруківки
export const standardSizes = {
  small: { length: 10, width: 10, height: 5, unit: 'см' },
  medium: { length: 20, width: 10, height: 5, unit: 'см' },
  large: { length: 30, width: 15, height: 5, unit: 'см' },
  square: { length: 15, width: 15, height: 5, unit: 'см' },
  custom: { length: 'custom', width: 'custom', height: 'custom', unit: 'см' }
};

// Дані продуктів - зразки гранітної бруківки
export const productsData = {
  category: 'granite-pavers',
  categoryName: {
    ua: 'Гранітна бруківка',
    en: 'Granite Pavers',
    de: 'Granit-Pflastersteine',
    pl: 'Kostka granitowa'
  },
  categoryDescription: {
    ua: 'Високоякісна гранітна бруківка з різними типами обробки поверхні. Кожен виріб можна виготовити під замовлення з будь-якої доступної текстури граніту.',
    en: 'High-quality granite pavers with various surface finish types. Each product can be custom-made from any available granite texture.',
    de: 'Hochwertige Granit-Pflastersteine mit verschiedenen Oberflächenbearbeitungen. Jedes Produkt kann nach Maß aus jeder verfügbaren Granittextur hergestellt werden.',
    pl: 'Wysokiej jakości kostka granitowa z różnymi typami wykończenia powierzchni. Każdy produkt może być wykonany na zamówienie z dowolnej dostępnej tekstury granitu.'
  },
  samples: [
    {
      id: 'paver-gabbro-split-medium',
      textureId: 'black-001', // зв'язка з graniteData.js
      finishType: 'split',
      size: 'medium',
      dimensions: standardSizes.medium,
      price: {
        ua: '450 грн/м²',
        en: '$12.50/sqft',
        de: '15.80 €/m²',
        pl: '52 zł/m²'
      },
      priceNote: {
        ua: 'Ціна залежить від складності замовлення',
        en: 'Price depends on order complexity',
        de: 'Preis abhängig von der Bestellkomplexität',
        pl: 'Cena zależy od złożoności zamówienia'
      },
      image: '/eurogranite-website/images/textures/black/gabro.jpg',
      images: [
        '/eurogranite-website/images/textures/black/gabro.jpg',
        '/eurogranite-website/images/textures/thumbs/black/gabro.jpg'
      ],
      name: {
        ua: 'Бруківка Габро колота 20x10x5см',
        en: 'Gabbro Split Paver 20x10x5cm',
        de: 'Gabbro Gespalten Pflasterstein 20x10x5cm',
        pl: 'Kostka Gabro Łupana 20x10x5cm'
      },
      description: {
        ua: 'Елегантна чорна бруківка з габро з природною колотою поверхнею. Ідеальна для створення преміальних пішохідних зон та доріжок.',
        en: 'Elegant black gabbro paver with natural split surface. Perfect for creating premium pedestrian areas and walkways.',
        de: 'Eleganter schwarzer Gabbro-Pflasterstein mit natürlicher gespaltener Oberfläche. Perfekt für die Gestaltung von Premium-Fußgängerzonen und Gehwegen.',
        pl: 'Elegancka czarna kostka z gabro z naturalną łupaną powierzchnią. Idealna do tworzenia ekskluzywnych stref pieszych i chodników.'
      },
      features: {
        ua: ['Природна антислизька поверхня', 'Стійкість до морозу', 'Низьке водопоглинання'],
        en: ['Natural anti-slip surface', 'Frost resistance', 'Low water absorption'],
        de: ['Natürliche rutschfeste Oberfläche', 'Frostbeständigkeit', 'Geringe Wasseraufnahme'],
        pl: ['Naturalna powierzchnia antypoślizgowa', 'Odporność na mróz', 'Niska nasiąkliwość wodna']
      },
      applications: {
        ua: ['Пішохідні зони', 'Паркові доріжки', 'Приватні подвір\'я'],
        en: ['Pedestrian areas', 'Park walkways', 'Private courtyards'],
        de: ['Fußgängerzonen', 'Parkwege', 'Private Innenhöfe'],
        pl: ['Strefy piesze', 'Ścieżki parkowe', 'Prywatne dziedzińce']
      },
      inStock: true,
      customizable: true
    },
    {
      id: 'paver-rosa-sawn-thermal-square',
      textureId: 'red-brown-002',
      finishType: 'sawn-thermal-top',
      size: 'square',
      dimensions: standardSizes.square,
      price: {
        ua: '580 грн/м²',
        en: '$16.20/sqft',
        de: '19.50 €/m²',
        pl: '67 zł/m²'
      },
      priceNote: {
        ua: 'Комбінована обробка - підвищена вартість',
        en: 'Combined processing - premium pricing',
        de: 'Kombinierte Bearbeitung - Premium-Preis',
        pl: 'Łączona obróbka - cena premium'
      },
      image: '/eurogranite-website/images/textures/red-brown/3-didkovytske-rodovyshhe.jpg',
      images: [
        '/eurogranite-website/images/textures/red-brown/3-didkovytske-rodovyshhe.jpg',
        '/eurogranite-website/images/textures/thumbs/red-brown/3-didkovytske-rodovyshhe.jpg'
      ],
      name: {
        ua: 'Бруківка Rosa Ravenna пиляна+термо 15x15x5см',
        en: 'Rosa Ravenna Sawn+Thermal Paver 15x15x5cm',
        de: 'Rosa Ravenna Gesägt+Therm. Pflaster 15x15x5cm',
        pl: 'Kostka Rosa Ravenna Piłowana+Termo 15x15x5cm'
      },
      description: {
        ua: 'Преміальна рожева бруківка з комбінованою обробкою. Пиляні сторони забезпечують рівність укладання, термооброблений верх - безпеку ходіння.',
        en: 'Premium pink paver with combined processing. Sawn sides ensure even laying, thermally treated top provides walking safety.',
        de: 'Premium rosa Pflasterstein mit kombinierter Bearbeitung. Gesägte Seiten gewährleisten gleichmäßiges Verlegen, thermisch behandelte Oberseite bietet Gehsicherheit.',
        pl: 'Ekskluzywna różowa kostka z łączoną obróbką. Piłowane boki zapewniają równe układanie, termicznie obrobiona góra - bezpieczeństwo chodzenia.'
      },
      features: {
        ua: ['Комбінована обробка поверхні', 'Унікальний рожевий відтінок', 'Максимальна безпека'],
        en: ['Combined surface treatment', 'Unique pink shade', 'Maximum safety'],
        de: ['Kombinierte Oberflächenbehandlung', 'Einzigartiger rosa Farbton', 'Maximale Sicherheit'],
        pl: ['Łączona obróbka powierzchni', 'Unikalny różowy odcień', 'Maksymalne bezpieczeństwo']
      },
      applications: {
        ua: ['Елітні об\'єкти', 'Торгові центри', 'Ресторанні тераси'],
        en: ['Elite facilities', 'Shopping centers', 'Restaurant terraces'],
        de: ['Elite-Anlagen', 'Einkaufszentren', 'Restaurant-Terrassen'],
        pl: ['Obiekty elitarne', 'Centra handlowe', 'Tarasy restauracyjne']
      },
      inStock: false,
      customizable: true,
      leadTime: {
        ua: '14-21 робочий день',
        en: '14-21 business days',
        de: '14-21 Arbeitstage',
        pl: '14-21 dni roboczych'
      }
    },
    {
      id: 'paver-labradorite-split-sawn-large',
      textureId: 'labradorite-001',
      finishType: 'split-sawn-thermal',
      size: 'large',
      dimensions: standardSizes.large,
      price: {
        ua: '720 грн/м²',
        en: '$20.00/sqft',
        de: '24.30 €/m²',
        pl: '83 zł/m²'
      },
      priceNote: {
        ua: 'Рідкісна текстура - ексклюзивна ціна',
        en: 'Rare texture - exclusive pricing',
        de: 'Seltene Textur - Exklusivpreis',
        pl: 'Rzadka tekstura - cena ekskluzywna'
      },
      image: '/eurogranite-website/images/textures/labradorite/labro.jpg',
      images: [
        '/eurogranite-website/images/textures/labradorite/labro.jpg',
        '/eurogranite-website/images/textures/thumbs/labradorite/labro.jpg'
      ],
      name: {
        ua: 'Бруківка Лабрадорит мікс-обробка 30x15x5см',
        en: 'Labradorite Mixed-Finish Paver 30x15x5cm',
        de: 'Labradorit Misch-Finish Pflaster 30x15x5cm',
        pl: 'Kostka Labradoryt Mieszane wykończenie 30x15x5cm'
      },
      description: {
        ua: 'Унікальна бруківка з українського лабрадориту з комбінованою обробкою поверхонь. Створює неповторний візуальний ефект з райдужними переливами.',
        en: 'Unique paver from Ukrainian labradorite with combined surface treatment. Creates unrepeatable visual effect with rainbow iridescence.',
        de: 'Einzigartiger Pflasterstein aus ukrainischem Labradorit mit kombinierter Oberflächenbehandlung. Schafft unwiederholbaren visuellen Effekt mit Regenbogen-Irisierung.',
        pl: 'Unikalna kostka z ukraińskiego labradoryt z łączoną obróbką powierzchni. Tworzy niepowtarzalny efekt wizualny z tęczową iryzacją.'
      },
      features: {
        ua: ['Лабрадоресценція (райдужні переливи)', 'Ексклюзивна комбінована обробка', 'Великий формат'],
        en: ['Labradorescence (rainbow iridescence)', 'Exclusive combined treatment', 'Large format'],
        de: ['Labradoreszenz (Regenbogen-Irisierung)', 'Exklusive kombinierte Behandlung', 'Großformat'],
        pl: ['Labradorescencja (tęczowa iryzacja)', 'Ekskluzywna łączona obróbka', 'Duży format']
      },
      applications: {
        ua: ['Преміальні проекти', 'Музеї та галереї', 'Приватні маєтки'],
        en: ['Premium projects', 'Museums and galleries', 'Private estates'],
        de: ['Premium-Projekte', 'Museen und Galerien', 'Private Anwesen'],
        pl: ['Projekty premium', 'Muzea i galerie', 'Prywatne posiadłości']
      },
      inStock: false,
      customizable: true,
      leadTime: {
        ua: '21-30 робочих днів',
        en: '21-30 business days',
        de: '21-30 Arbeitstage',
        pl: '21-30 dni roboczych'
      },
      isExclusive: true
    }
  ],
  
  // Додаткова інформація про кастомізацію
  customizationOptions: {
    textures: {
      ua: 'Доступні всі 12 текстур граніту з каталогу',
      en: 'All 12 granite textures from catalog available',
      de: 'Alle 12 Granittexturen aus dem Katalog verfügbar',
      pl: 'Dostępne wszystkie 12 tekstur granitu z katalogu'
    },
    finishes: {
      ua: 'Будь-яка комбінація обробки поверхонь',
      en: 'Any combination of surface treatments',
      de: 'Jede Kombination von Oberflächenbehandlungen',
      pl: 'Dowolna kombinacja obróbek powierzchni'
    },
    sizes: {
      ua: 'Нестандартні розміри за індивідуальним замовленням',
      en: 'Custom sizes by individual order',
      de: 'Individuelle Größen nach Einzelbestellung',
      pl: 'Niestandardowe rozmiary na indywidualne zamówienie'
    }
  }
};

export default productsData;