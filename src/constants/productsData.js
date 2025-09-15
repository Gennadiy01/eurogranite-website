// Дані продукції EuroGranite - Гранітна бруківка
// Створено: вересень 2025

// SVG іконки для типів обробки
export const SplitIcon = ({ size = 16, color = "var(--accent-orange)" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M2 8L8 14L14 8M2 2L8 8L14 2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SawnIcon = ({ size = 16, color = "var(--accent-orange)" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect
      x="2" y="6" width="12" height="4"
      fill={color}
      rx="1"
    />
    <rect
      x="4" y="4" width="8" height="8"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      rx="1"
    />
  </svg>
);

export const ThermalIcon = ({ size = 16, color = "var(--accent-orange)" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M8 2v12M5 4l6 0M4 6l8 0M4 10l8 0M5 12l6 0"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="8" r="1.5" fill={color} />
  </svg>
);

// SVG іконки для кастомізації
export const TextureIcon = ({ size = 24, color = "var(--accent-orange)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Основний кристал граніту */}
    <path
      d="M12 2l8 4-8 14L4 6l8-4z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Внутрішня структура */}
    <path d="M12 2v18" stroke={color} strokeWidth="1.5"/>
    <path d="M4 6l8 4" stroke={color} strokeWidth="1.5"/>
    <path d="M20 6l-8 4" stroke={color} strokeWidth="1.5"/>
    {/* Точки включень мінералів */}
    <circle cx="8" cy="8" r="1" fill={color}/>
    <circle cx="16" cy="8" r="1" fill={color}/>
    <circle cx="10" cy="12" r="0.8" fill={color}/>
    <circle cx="14" cy="12" r="0.8" fill={color}/>
    <circle cx="12" cy="16" r="1" fill={color}/>
  </svg>
);

export const SurfaceIcon = ({ size = 24, color = "var(--accent-orange)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Основний блок каменю */}
    <rect x="2" y="8" width="20" height="10" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2" rx="1"/>

    {/* Колота поверхня (зубчаста) */}
    <path
      d="M2 8l1-2 2 2 1-1 2 1 1-2 2 2 2-1 1 1 2-2 2 2 1-1 1 1"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Пиляна поверхня (рівна) */}
    <line x1="2" y1="18" x2="22" y2="18" stroke={color} strokeWidth="2"/>

    {/* Термооброблена поверхня (хвилі) */}
    <path
      d="M3 10.5c1-0.5 2 0.5 3 0 1-0.5 2 0.5 3 0 1-0.5 2 0.5 3 0 1-0.5 2 0.5 3 0 1-0.5 2 0.5 3 0 1-0.5 2 0.5 3 0"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Іскри від термообробки */}
    <path d="M4 12l1-1-1-1" stroke={color} strokeWidth="1"/>
    <path d="M8 13l1-1-1-1" stroke={color} strokeWidth="1"/>
    <path d="M16 12l1-1-1-1" stroke={color} strokeWidth="1"/>
    <path d="M20 13l1-1-1-1" stroke={color} strokeWidth="1"/>
  </svg>
);

export const DimensionIcon = ({ size = 24, color = "var(--accent-orange)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* 3D блок бруківки */}
    <path
      d="M4 8l4-2 12 0 0 8-4 2-12 0z"
      fill={color}
      fillOpacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    {/* Верхня грань */}
    <path
      d="M4 8l4-2 12 0-4 2-12 0z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="1.5"
    />
    {/* Бічна грань */}
    <path
      d="M20 6v8l-4 2v-8z"
      fill={color}
      fillOpacity="0.3"
      stroke={color}
      strokeWidth="1.5"
    />

    {/* Розмірні лінії */}
    {/* Довжина */}
    <path d="M4 20h12" stroke={color} strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <path d="M16 20h-12" stroke={color} strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <text x="10" y="22" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold">L</text>

    {/* Ширина */}
    <path d="M22 6v8" stroke={color} strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <path d="M22 14v-8" stroke={color} strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <text x="23" y="11" textAnchor="start" fill={color} fontSize="6" fontWeight="bold">W</text>

    {/* Висота */}
    <path d="M2 8v8" stroke={color} strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <path d="M2 16v-8" stroke={color} strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
    <text x="1" y="13" textAnchor="end" fill={color} fontSize="6" fontWeight="bold">H</text>

    {/* Стрілочки для розмірних ліній */}
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="3" refY="2" orient="auto">
        <polygon points="0 0, 6 2, 0 4" fill={color}/>
      </marker>
    </defs>
  </svg>
);

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
    icon: <SplitIcon />
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
    icon: <SawnIcon />
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
    icon: <ThermalIcon />
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
    icon: (
      <div style={{ display: 'flex', gap: '2px' }}>
        <SawnIcon />
        <ThermalIcon />
      </div>
    )
  },
  'split-sawn-thermal': {
    id: 'split-sawn-thermal',
    name: {
      ua: '4 сторони колоті, 2 пиляні',
      en: '4 sides split, 2 sawn',
      de: '4 Seiten gespalten, 2 gesägt',
      pl: '4 boki łupane, 2 piłowane'
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
    icon: (
      <div style={{ display: 'flex', gap: '2px' }}>
        <SplitIcon />
        <SawnIcon />
      </div>
    )
  },
  'split-sawn-pencil': {
    id: 'split-sawn-pencil',
    name: {
      ua: '2 сторони колоті, 4 сторони пиляні',
      en: '2 sides split, 4 sides sawn',
      de: '2 Seiten gespalten, 4 Seiten gesägt',
      pl: '2 boki łupane, 4 boki piłowane'
    },
    description: {
      ua: 'Спеціальна обробка для бруківки з олівця',
      en: 'Special processing for pencil blocks',
      de: 'Spezielle Bearbeitung für Bleistift-Blöcke',
      pl: 'Specjalna obróbka dla bloków ołówkowych'
    },
    surfaces: {
      top: 'split',
      bottom: 'split',
      front: 'sawn',
      back: 'sawn',
      left: 'sawn',
      right: 'sawn'
    },
    icon: (
      <div style={{ display: 'flex', gap: '2px' }}>
        <SplitIcon />
        <SawnIcon />
      </div>
    )
  }
};

// Стандартні розміри бруківки з лендінгу Euro-Granite
export const standardSizes = {
  paver_200x100x50: { length: 200, width: 100, height: 50, unit: 'мм' },
  paver_100x100x50: { length: 100, width: 100, height: 50, unit: 'мм' },
  paver_100x100x60: { length: 100, width: 100, height: 60, unit: 'мм' },
  paver_100x100x80: { length: 100, width: 100, height: 80, unit: 'мм' },
  custom: { length: 'custom', width: 'custom', height: 'custom', unit: 'мм' }
};

// Дані продуктів - реальний каталог гранітної бруківки Euro-Granite
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
    // 1. Габро 200×100×50 - повний розпил + термообробка
    {
      id: 'paver-gabbro-sawn-thermal-200x100x50',
      textureId: 'black-001',
      finishType: 'sawn-thermal-top',
      size: 'paver_200x100x50',
      dimensions: standardSizes.paver_200x100x50,
      price: {
        ua: '1140 грн/м²',
        en: '21 €/m²',
        de: '21 €/m²',
        pl: '21 €/m²'
      },
      image: '/eurogranite-website/images/products/gabro-200x100x50.jpg',
      name: {
        ua: 'Габро пиляна з термообробкою',
        en: 'Gabbro Sawn with Thermal Treatment',
        de: 'Gabbro gesägt mit Wärmebehandlung',
        pl: 'Gabro piłowane z obróbką termiczną'
      },
      description: {
        ua: 'Бруківка з чорного граніту габро, пиляна з усіх боків з термообробленою верхньою поверхнею',
        en: 'Black granite gabbro paving stones, sawn on all sides with flame-treated top surface',
        de: 'Schwarze Granit-Gabbro-Pflastersteine, beidseitig gesägt mit wärmebehandelter Oberseite',
        pl: 'Kostka brukowa z czarnego granitu gabro, piłowana ze wszystkich stron z płomieniowaną powierzchnią górną'
      },
      features: {
        ua: ['Чорний граніт габро', 'Повний розпил + термообробка верхньої поверхні', 'Антислизька поверхня'],
        en: ['Black granite gabbro', 'Full saw + thermal treatment of top surface', 'Anti-slip surface'],
        de: ['Schwarzer Granit Gabbro', 'Vollständiger Schnitt + Wärmebehandlung der Oberseite', 'Rutschfeste Oberfläche'],
        pl: ['Czarny granit gabro', 'Pełne cięcie + obróbka termiczna górnej powierzchni', 'Powierzchnia antypoślizgowa']
      },
      inStock: true,
      customizable: true
    },

    // 2. Маславський зелений граніт 200×100×50
    {
      id: 'paver-maslavske-green-200x100x50',
      textureId: 'green-001',
      finishType: 'sawn-thermal-top',
      size: 'paver_200x100x50',
      dimensions: standardSizes.paver_200x100x50,
      price: {
        ua: '2250 грн/м²',
        en: '41 €/m²',
        de: '41 €/m²',
        pl: '41 €/m²'
      },
      image: '/eurogranite-website/images/products/maslavske-200x100x50.jpg',
      name: {
        ua: 'Зелений Маславський граніт',
        en: 'Green Maslavsky Granite',
        de: 'Grüner Maslavsky-Granit',
        pl: 'Zielony granit Maslavsky'
      },
      description: {
        ua: 'Бруківка з зеленого граніту Маславського родовища, пиляна з усіх боків з термообробленою верхньою поверхнею',
        en: 'Green granite paving stones from Maslavske deposit, sawn on all sides with flame-treated top surface',
        de: 'Grüner Granit Verde Olive Pflastersteine, beidseitig gesägt, Oberseite geflammt',
        pl: 'Kostka brukowa z zielonego granitu ze złoża Masławskiego, piłowana ze wszystkich stron z płomieniowaną powierzchnią górną'
      },
      features: {
        ua: ['Зелений граніт (Verde Oliva)', 'Маславське родовище', 'Повний розпил + термообробка'],
        en: ['Green granite (Verde Oliva)', 'Maslavske deposit', 'Full saw + thermal treatment'],
        de: ['Grüner Granit (Verde Olive)', 'Maslavske Lagerstätte', 'Vollschnitt + Wärmebehandlung'],
        pl: ['Zielony granit (Verde Oliva)', 'Złoże Masławskie', 'Pełne cięcie + obróbka termiczna']
      },
      inStock: true,
      customizable: true
    },

    // 3. Корец Екстра пиляно-колота 100×100×50
    {
      id: 'paver-korets-extra-mixed-100x100x50',
      textureId: 'red-brown-002',
      finishType: 'split-sawn-thermal',
      size: 'paver_100x100x50',
      dimensions: standardSizes.paver_100x100x50,
      price: {
        ua: '1630 грн/м²',
        en: '29 €/m²',
        de: '29 €/m²',
        pl: '29 €/m²'
      },
      image: '/eurogranite-website/images/products/korets-extra-100x100x50.jpg',
      name: {
        ua: 'Корец Екстра пиляно-колота',
        en: 'Korets Extra Sawn-Split',
        de: 'Korets Extra gesägt-gespalten',
        pl: 'Korec Extra piłowano-łupane'
      },
      description: {
        ua: 'Бруківка з червоно-коричневого граніту Корецького родовища, лицьова сторона, низ та два бока розпиляні, два протилежні бока розколоті, верхня частина термічно оброблена',
        en: 'Red-brown granite paving stones from Korets deposit, front side, bottom and two sides sawn, two opposite sides split, top surface flame-treated',
        de: 'Rotbrauner Granit Rosa Raveno Extra Pflastersteine, Vorderseite, Unterseite zwei gegenüberliegende Seiten gesägt, zwei gegenüberliegende Seiten gespalten, Oberseite geflammt',
        pl: 'Kostka brukowa z czerwono-brązowego granitu ze złoża Koreckiego, strona licowa, spód i dwa boki piłowane, dwa przeciwległe boki łupane, górna część płomieniowana'
      },
      features: {
        ua: ['Червоно-коричневий граніт (Rosa Ravena Extra)', 'Корецьке родовище', 'Пиляно-колота зі смуги'],
        en: ['Red-brown granite (Rosa Ravena Extra)', 'Korets deposit', 'Sawn-split from strip'],
        de: ['Rotbrauner Granit (Rosa Raveno Extra)', 'Korets Lagerstätte', 'Gesägt-gespalten aus Streifen'],
        pl: ['Czerwono-brązowy granit (Rosa Ravena Extra)', 'Złoże Koreckie', 'Piłowano-łupane z paska']
      },
      inStock: true,
      customizable: true
    },

    // 4. Корец світлий повнопил 200×100×50
    {
      id: 'paver-korets-light-sawn-200x100x50',
      textureId: 'red-brown-002',
      finishType: 'sawn-thermal-top',
      size: 'paver_200x100x50',
      dimensions: standardSizes.paver_200x100x50,
      price: {
        ua: '1770 грн/м²',
        en: '32 €/m²',
        de: '32 €/m²',
        pl: '32 €/m²'
      },
      image: '/eurogranite-website/images/products/korets-light-200x100x50.jpg',
      name: {
        ua: 'Корец світлий повнопил',
        en: 'Korets Light Full Sawn',
        de: 'Korets Hell vollständig gesägt',
        pl: 'Korec jasny w pełni piłowany'
      },
      description: {
        ua: 'Червоно-коричневий корецький граніт, бруківка пиляна з усіх сторін, термооброблена верхня поверхня',
        en: 'Red-brown Korets granite paving stones, sawn on all sides, flame-treated top surface',
        de: 'Rotbrauner Granit Rosa Raveno Extra Pflastersteine beidseitig gesägt, Oberseite wärmebehandelt',
        pl: 'Czerwono-brązowa kostka granitowa z Korca, piłowana ze wszystkich stron, płomieniowana powierzchnia górna'
      },
      features: {
        ua: ['Червоно-коричневий граніт (Rosa Ravena Extra)', 'Корецьке родовище', 'Повний розпил + термообробка'],
        en: ['Red-brown granite (Rosa Ravena Extra)', 'Korets deposit', 'Full saw + thermal treatment'],
        de: ['Rotbrauner Granit (Rosa Raveno Extra)', 'Korets Lagerstätte', 'Vollschnitt + Wärmebehandlung'],
        pl: ['Czerwono-brązowy granit (Rosa Ravena Extra)', 'Złoże Koreckie', 'Pełne cięcie + obróbka termiczna']
      },
      inStock: true,
      customizable: true
    },

    // 5. Омелянівський граніт 200×100×50
    {
      id: 'paver-omelyanivske-200x100x50',
      textureId: 'red-brown-003',
      finishType: 'sawn-thermal-top',
      size: 'paver_200x100x50',
      dimensions: standardSizes.paver_200x100x50,
      price: {
        ua: '1920 грн/м²',
        en: '35 €/m²',
        de: '35 €/m²',
        pl: '35 €/m²'
      },
      image: '/eurogranite-website/images/products/omelyanivske-200x100x50.jpg',
      name: {
        ua: 'Омелянівський граніт',
        en: 'Omelyanivske Granite',
        de: 'Omelyanivske Granit',
        pl: 'Granit omelianowski'
      },
      description: {
        ua: 'Бруківка з червоно-коричневого граніту Омелянівського родовища, пиляна з усіх боків з термообробленою верхньою поверхнею',
        en: 'Red-brown granite paving stones from Omelyanivske deposit, sawn on all sides with flame-treated top surface',
        de: 'Rotbrauner Granit Rosso Toledo Pflastersteine, beidseitig gesägt, Oberseite geflammt',
        pl: 'Kostka brukowa z czerwono-brązowego granitu ze złoża Omelianowskiego, piłowana ze wszystkich stron z płomieniowaną powierzchnią górną'
      },
      features: {
        ua: ['Червоно-коричневий граніт (Rosso Toledo)', 'Омелянівське родовище', 'Повний розпил + термообробка'],
        en: ['Red-brown granite (Rosso Toledo)', 'Omelyanivske deposit', 'Full saw + thermal treatment'],
        de: ['Rotbrauner Granit (Rosso Toledo)', 'Omelyanivske Lagerstätte', 'Vollschnitt + Wärmebehandlung'],
        pl: ['Czerwono-brązowy granit (Rosso Toledo)', 'Złoże Omelianowskie', 'Pełne cięcie + obróbka termiczna']
      },
      inStock: true,
      customizable: true
    },

    // 6. Лабрадорит змішаний 100×100×60
    {
      id: 'paver-labradorite-mixed-100x100x60',
      textureId: 'labradorite-001',
      finishType: 'split-sawn-thermal',
      size: 'paver_100x100x60',
      dimensions: standardSizes.paver_100x100x60,
      price: {
        ua: '600 грн/м²',
        en: '15 €/m²',
        de: '15 €/m²',
        pl: '15 €/m²'
      },
      image: '/eurogranite-website/images/products/labradorite-mixed-100x100x60.jpg',
      name: {
        ua: 'Лабрадорит змішаний',
        en: 'Labradorite Mixed',
        de: 'Labradorit gemischt',
        pl: 'Labradoryt mieszany'
      },
      description: {
        ua: 'Чорна гранітна бруківка з лабрадориту, лицьова сторона, низ, дві протилежні сторони розколоті, дві протилежні сторони пиляні',
        en: 'Black granite labradorite paving stones, front side, bottom, two opposite sides split, two opposite sides sawn',
        de: 'Schwarze Granit Labradorite Volga Blue Pflastersteine, Vorderseite, Unterseite, zwei gegenüberliegende Seiten gespalten, zwei gegenüberliegende Seiten gesägt',
        pl: 'Czarna kostka granitowa z labradorytu, strona licowa, spód, dwie przeciwległe strony łupane, dwie przeciwległe strony piłowane'
      },
      features: {
        ua: ['Чорний лабрадорит (Volga Blue)', 'Колота екстра (змішаний тип)', 'Колота покращена'],
        en: ['Black labradorite (Volga Blue)', 'Split extra (mixed type)', 'Split improved'],
        de: ['Schwarzer Labradorit (Volga Blue)', 'Gespaltene Extra (gemischter Typ)', 'Gespaltene verbessert'],
        pl: ['Czarny labradoryt (Volga Blue)', 'Łupane extra (typ mieszany)', 'Łupane ulepszone']
      },
      inStock: true,
      customizable: true
    },

    // 7. Покостівський граніт 200×100×50
    {
      id: 'paver-pokostivka-200x100x50',
      textureId: 'gray-001',
      finishType: 'sawn-thermal-top',
      size: 'paver_200x100x50',
      dimensions: standardSizes.paver_200x100x50,
      price: {
        ua: '1470 грн/м²',
        en: '27 €/m²',
        de: '27 €/m²',
        pl: '27 €/m²'
      },
      image: '/eurogranite-website/images/products/pokostivka-200x100x50.jpg',
      name: {
        ua: 'Покостівський граніт',
        en: 'Pokostivka Granite',
        de: 'Pokostivka Granit',
        pl: 'Granit pokostowski'
      },
      description: {
        ua: 'Сірий граніт покостівка, бруківка пиляна з усіх сторін, термооброблена верхня поверхня',
        en: 'Grey granite Pokostivka paving stones, sawn on all sides, flame-treated top surface',
        de: 'Grauer Granit Grey Ukraine Pflastersteine beidseitig gesägt, Oberseite geflammt',
        pl: 'Szara kostka granitowa pokostowska, piłowana ze wszystkich stron, płomieniowana powierzchnia górna'
      },
      features: {
        ua: ['Сірий граніт (Grey Ukraine)', 'Покостівське родовище', 'Повний розпил + термообробка'],
        en: ['Grey granite (Grey Ukraine)', 'Pokostivka deposit', 'Full saw + thermal treatment'],
        de: ['Grauer Granit (Grey Ukraine)', 'Pokostivka Lagerstätte', 'Vollschnitt + Wärmebehandlung'],
        pl: ['Szary granit (Grey Ukraine)', 'Złoże Pokostowskie', 'Pełne cięcie + obróbka termiczna']
      },
      inStock: true,
      customizable: true
    },

    // 8. Межерицький граніт 200×100×50
    {
      id: 'paver-mezheritske-200x100x50',
      textureId: 'red-brown-008',
      finishType: 'sawn-thermal-top',
      size: 'paver_200x100x50',
      dimensions: standardSizes.paver_200x100x50,
      price: {
        ua: '2470 грн/м²',
        en: '45 €/m²',
        de: '45 €/m²',
        pl: '45 €/m²'
      },
      image: '/eurogranite-website/images/products/mezheritske-200x100x50.jpg',
      name: {
        ua: 'Межерицький граніт',
        en: 'Mezheritske Granite',
        de: 'Mezheritske Granit',
        pl: 'Granit mieżerycki'
      },
      description: {
        ua: 'Бруківка з червоно-коричневого граніту Межерицького родовища, пиляна з усіх боків з термообробленою верхньою поверхнею',
        en: 'Red-brown granite paving stones from Mezheritske deposit, sawn on all sides with flame-treated top surface',
        de: 'Rotbrauner Granit Flower of Ukraine Pflastersteine, beidseitig gesägt, Oberseite geflammt',
        pl: 'Kostka brukowa z czerwono-brązowego granitu ze złoża Mieżeryckiego, piłowana ze wszystkich stron z płomieniowaną powierzchnią górną'
      },
      features: {
        ua: ['Червоно-коричневий граніт (Flower of Ukraine)', 'Межерицьке родовище', 'Повний розпил + термообробка'],
        en: ['Red-brown granite (Flower of Ukraine)', 'Mezheritske deposit', 'Full saw + thermal treatment'],
        de: ['Rotbrauner Granit (Flower of Ukraine)', 'Mezheritske Lagerstätte', 'Vollschnitt + Wärmebehandlung'],
        pl: ['Czerwono-brązowy granit (Flower of Ukraine)', 'Złoże Mieżeryckie', 'Pełne cięcie + obróbka termiczna']
      },
      inStock: true,
      customizable: true
    },

    // 9. Корец колотий з олівця 100×100×80
    {
      id: 'paver-korets-split-pencil-100x100x80',
      textureId: 'red-brown-002',
      finishType: 'split-sawn-pencil',
      size: 'paver_100x100x80',
      dimensions: standardSizes.paver_100x100x80,
      price: {
        ua: '1600 грн/м²',
        en: '32 €/m²',
        de: '32 €/m²',
        pl: '32 €/m²'
      },
      image: '/eurogranite-website/images/products/korets-split-pencil-100x100x80.jpg',
      name: {
        ua: 'Корец колотий з олівця',
        en: 'Korets Split from Pencil',
        de: 'Korets aus Bleistift gespalten',
        pl: 'Korec łupany z ołówka'
      },
      description: {
        ua: 'Бруківка з червоно-коричневого граніту Корецького родовища, лицьова сторона та низ колоті, всі бока пиляні (бруківка колота з олівця)',
        en: 'Red-brown granite paving stones from Korets deposit, front side and bottom split, all sides sawn (split from pencil blocks)',
        de: 'Rotbrauner Granit Rosa Raveno Extra Pflastersteine, Vorderseite, Unterseite gespalten, alle Seiten gesägt',
        pl: 'Kostka brukowa z czerwono-brązowego granitu ze złoża Koreckiego, strona licowa i spód łupane, wszystkie boki piłowane (kostka łupana z ołówka)'
      },
      features: {
        ua: ['Червоно-коричневий граніт (Rosa Ravena Extra)', 'Корецьке родовище', 'Колота з олівця'],
        en: ['Red-brown granite (Rosa Ravena Extra)', 'Korets deposit', 'Split from pencil'],
        de: ['Rotbrauner Granit (Rosa Raveno Extra)', 'Korets Lagerstätte', 'Aus Bleistift gespalten'],
        pl: ['Czerwono-brązowy granit (Rosa Ravena Extra)', 'Złoże Koreckie', 'Łupane z ołówka']
      },
      inStock: true,
      customizable: true
    },

    // 10. Лабрадорит повнопил 200×100×50
    {
      id: 'paver-labradorite-sawn-200x100x50',
      textureId: 'labradorite-001',
      finishType: 'sawn-thermal-top',
      size: 'paver_200x100x50',
      dimensions: standardSizes.paver_200x100x50,
      price: {
        ua: '1050 грн/м²',
        en: '19 €/m²',
        de: '19 €/m²',
        pl: '19 €/m²'
      },
      image: '/eurogranite-website/images/products/labradorite-sawn-200x100x50.jpg',
      name: {
        ua: 'Лабрадорит повнопил',
        en: 'Labradorite Full Sawn',
        de: 'Labradorit vollständig gesägt',
        pl: 'Labradoryt w pełni piłowany'
      },
      description: {
        ua: 'Чорна гранітна бруківка з лабрадориту, пиляна з усіх сторін, термооброблена верхня поверхня',
        en: 'Black granite labradorite paving stones, sawn on all sides, flame-treated top surface',
        de: 'Schwarze Granit Labradorite Volga Blue Pflastersteine, beidseitig gesägt, Oberseite geflammt',
        pl: 'Czarna kostka granitowa z labradorytu, piłowana ze wszystkich stron, płomieniowana powierzchnia górna'
      },
      features: {
        ua: ['Чорний лабрадорит (Volga Blue)', 'Повний розпил + термообробка', 'Термооброблена поверхня'],
        en: ['Black labradorite (Volga Blue)', 'Full saw + thermal treatment', 'Thermally treated surface'],
        de: ['Schwarzer Labradorit (Volga Blue)', 'Vollschnitt + Wärmebehandlung', 'Wärmebehandelte Oberfläche'],
        pl: ['Czarny labradoryt (Volga Blue)', 'Pełne cięcie + obróbka termiczna', 'Powierzchnia termicznie obrobiona']
      },
      inStock: true,
      customizable: true
    },

    // 11. Човнівський граніт 200×100×50
    {
      id: 'paver-chovnivske-200x100x50',
      textureId: 'green-002',
      finishType: 'sawn-thermal-top',
      size: 'paver_200x100x50',
      dimensions: standardSizes.paver_200x100x50,
      price: {
        ua: '2200 грн/м²',
        en: '40 €/m²',
        de: '40 €/m²',
        pl: '40 €/m²'
      },
      image: '/eurogranite-website/images/products/chovnivske-200x100x50.jpg',
      name: {
        ua: 'Човнівський граніт',
        en: 'Chovnivske Granite',
        de: 'Chovnivske Granit',
        pl: 'Granit czownowski'
      },
      description: {
        ua: 'Світло-зелена гранітна бруківка Човнівського родовища, розпиляна з кожного боку, верхня частина термооброблена',
        en: 'Light green granite paving stones from Chovnivske deposit, sawn on each side, top part flame-treated',
        de: 'Hellgrüner Granit Chovnovske Pflastersteine, beidseitig gesägt, Oberseite geflammt',
        pl: 'Jasno-zielona kostka granitowa ze złoża Czownowskiego, piłowana z każdej strony, górna część płomieniowana'
      },
      features: {
        ua: ['Світло-зелений граніт', 'Човнівське родовище', 'Повний розпил + термообробка'],
        en: ['Light green granite', 'Chovnivske deposit', 'Full saw + thermal treatment'],
        de: ['Hellgrüner Granit', 'Chovnivske Lagerstätte', 'Vollschnitt + Wärmebehandlung'],
        pl: ['Jasno-zielony granit', 'Złoże Czownowskie', 'Pełne cięcie + obróbka termiczna']
      },
      inStock: true,
      customizable: true
    },

    // 12. Габро колоте 100×100×50
    {
      id: 'paver-gabbro-split-pencil-100x100x50',
      textureId: 'black-001',
      finishType: 'split-sawn-pencil',
      size: 'paver_100x100x50',
      dimensions: standardSizes.paver_100x100x50,
      price: {
        ua: '750 грн/м²',
        en: '14 €/m²',
        de: '14 €/m²',
        pl: '14 €/m²'
      },
      image: '/eurogranite-website/images/products/gabbro-split-100x100x50.jpg',
      name: {
        ua: 'Габро колоте з олівця',
        en: 'Gabbro Split from Pencil',
        de: 'Gabbro aus Bleistift gespalten',
        pl: 'Gabro łupane z ołówka'
      },
      description: {
        ua: 'Бруківка з чорного граніту габро, лицьова сторона та низ колоті, всі бока пиляні (бруківка колота з олівця)',
        en: 'Black granite gabbro paving stones, front side and bottom split, all sides sawn (split from pencil blocks)',
        de: 'Schwarze Granit Gabbro Pflastersteine, Vorderseite, Unterseite gespalten, alle Seiten gesägt',
        pl: 'Kostka brukowa z czarnego granitu gabro, strona licowa i spód łupane, wszystkie boki piłowane (kostka łupana z ołówka)'
      },
      features: {
        ua: ['Чорний граніт габро', 'Колота з олівця', 'Пиляно-колота'],
        en: ['Black granite gabbro', 'Split from pencil', 'Sawn-split'],
        de: ['Schwarzer Granit Gabbro', 'Aus Bleistift gespalten', 'Gesägt-gespalten'],
        pl: ['Czarny granit gabro', 'Łupane z ołówka', 'Piłowano-łupane']
      },
      inStock: true,
      customizable: true
    }
  ],
  
  // Додаткова інформація про кастомізацію
  customizationOptions: {
    textures: {
      title: {
        ua: 'Текстури граніту',
        en: 'Granite Textures',
        de: 'Granittexturen',
        pl: 'Tekstury granitu'
      },
      description: {
        ua: 'Оберіть з 12 унікальних текстур граніту з українських родовищ. Від класичного чорного габро до ексклюзивного зеленого Маславського граніту.',
        en: 'Choose from 12 unique granite textures from Ukrainian deposits. From classic black gabbro to exclusive green Maslavske granite.',
        de: 'Wählen Sie aus 12 einzigartigen Granittexturen aus ukrainischen Lagerstätten. Von klassischem schwarzem Gabbro bis zu exklusivem grünem Maslavske-Granit.',
        pl: 'Wybierz spośród 12 unikalnych tekstur granitu z ukraińskich złóż. Od klasycznego czarnego gabro po ekskluzywny zielony granit Masławski.'
      },
      features: {
        ua: ['12 унікальних текстур', 'Українські родовища', 'Природні відтінки', 'Високоякісний граніт'],
        en: ['12 unique textures', 'Ukrainian deposits', 'Natural shades', 'High-quality granite'],
        de: ['12 einzigartige Texturen', 'Ukrainische Lagerstätten', 'Natürliche Farbtöne', 'Hochwertiger Granit'],
        pl: ['12 unikalnych tekstur', 'Ukraińskie złoża', 'Naturalne odcienie', 'Wysokiej jakości granit']
      },
      icon: <TextureIcon />
    },
    finishes: {
      title: {
        ua: 'Обробка поверхні',
        en: 'Surface Finishes',
        de: 'Oberflächenbearbeitungen',
        pl: 'Wykończenia powierzchni'
      },
      description: {
        ua: 'Комбінуйте різні типи обробки: колота, пиляна та термооброблена поверхня. Створіть унікальний дизайн для вашого проекту.',
        en: 'Combine different processing types: split, sawn and thermal treated surface. Create unique design for your project.',
        de: 'Kombinieren Sie verschiedene Bearbeitungsarten: gespaltene, gesägte und thermisch behandelte Oberfläche. Schaffen Sie ein einzigartiges Design für Ihr Projekt.',
        pl: 'Łącz różne rodzaje obróbki: łupaną, piłowaną i powierzchnię obrabianą termicznie. Stwórz unikalny design dla swojego projektu.'
      },
      features: {
        ua: ['Колота поверхня', 'Пиляна обробка', 'Термообробка', 'Комбіновані варіанти'],
        en: ['Split surface', 'Sawn processing', 'Thermal treatment', 'Combined options'],
        de: ['Gespaltene Oberfläche', 'Gesägte Bearbeitung', 'Wärmebehandlung', 'Kombinierte Optionen'],
        pl: ['Powierzchnia łupana', 'Obróbka piłowana', 'Obróbka termiczna', 'Opcje kombinowane']
      },
      icon: <SurfaceIcon />
    },
    sizes: {
      title: {
        ua: 'Індивідуальні розміри',
        en: 'Custom Dimensions',
        de: 'Individuelle Abmessungen',
        pl: 'Indywidualne wymiary'
      },
      description: {
        ua: 'Замовте бруківку будь-яких розмірів під ваш проект. Стандартні та нестандартні форми для унікальних архітектурних рішень.',
        en: 'Order pavers of any size for your project. Standard and custom shapes for unique architectural solutions.',
        de: 'Bestellen Sie Pflastersteine jeder Größe für Ihr Projekt. Standard- und Sonderformen für einzigartige architektonische Lösungen.',
        pl: 'Zamów kostkę brukową dowolnych rozmiarów dla swojego projektu. Standardowe i niestandardowe kształty dla unikalnych rozwiązań architektonicznych.'
      },
      features: {
        ua: ['Будь-які розміри', 'Стандартні формати', 'Спеціальні форми', 'Точна геометрія'],
        en: ['Any dimensions', 'Standard formats', 'Special shapes', 'Precise geometry'],
        de: ['Beliebige Abmessungen', 'Standardformate', 'Spezielle Formen', 'Präzise Geometrie'],
        pl: ['Dowolne wymiary', 'Standardowe formaty', 'Specjalne kształty', 'Precyzyjna geometria']
      },
      icon: <DimensionIcon />
    }
  }
};

export default productsData;