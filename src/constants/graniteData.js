// Granite products data based on products color v3.html
export const graniteTypes = [
  {
    id: 'black',
    name: {
      en: 'Black Granite',
      ua: 'Чорний граніт',
      de: 'Schwarzer Granit',
      pl: 'Czarny Granit'
    },
    subtitle: {
      en: 'Black Granite Premium',
      ua: 'Black Granite Premium',
      de: 'Black Granite Premium',
      pl: 'Black Granite Premium'
    },
    badge: {
      en: 'TOP Choice',
      ua: 'ТОП вибір',
      de: 'TOP Wahl',
      pl: 'TOP Wybór'
    },
    description: {
      en: 'Elite black granite with deep rich color and mirror polishing',
      ua: 'Елітний чорний граніт з глибоким насиченим кольором та дзеркальним поліруванням',
      de: 'Elite schwarzer Granit mit tiefem, sattem Farbton und Spiegelpolierung',
      pl: 'Elitarny czarny granit z głębokim nasyconym kolorem i lustrzanym polirowaniem'
    },
    colorClass: 'granite-black',
    materials: [
      {
        type: 'granite',
        name: { en: 'Black Granite Cubes', ua: 'Чорна гранітна бруківка', de: 'Schwarze Granitpflaster', pl: 'Czarna kostka granitowa' },
        characteristics: ['Density: 2.7 g/cm³', 'Compressive strength: 200 MPa', 'Water absorption: <0.5%']
      },
      {
        type: 'labradorite',
        name: { en: 'Black Labradorite', ua: 'Чорний лабрадорит', de: 'Schwarzer Labradorit', pl: 'Czarny labradoryt' },
        characteristics: ['Hardness: 6-6.5 Mohs', 'Density: 2.68-2.72 g/cm³', 'Iridescent surface']
      }
    ],
    textures: [
      {
        id: 'black-001',
        name: {
          en: 'Premium Black Classic',
          ua: 'Преміум чорний класичний',
          de: 'Premium Schwarz Klassisch',
          pl: 'Premium Czarny Klasyczny'
        },
        imageUrl: '/eurogranite-website/images/textures/black/gabro.jpg',
        thumbUrl: '/eurogranite-website/images/textures/thumbs/black/gabro.jpg',
        description: {
          en: 'Deep black granite with mirror finish and subtle mineral veining',
          ua: 'Глибокий чорний граніт з дзеркальним покриттям та тонкими мінеральними прожилками',
          de: 'Tiefer schwarzer Granit mit Spiegelfinish und subtiler Mineraladerung',
          pl: 'Głęboki czarny granit z lustrzanym wykończeniem i subtelnymi żyłkami mineralnymi'
        },
        properties: {
          density: '2.7 g/cm³',
          hardness: '6-7 Mohs',
          pattern: 'uniform',
          finish: 'polished',
          waterAbsorption: '<0.5%'
        }
      }
    ]
  },
  {
    id: 'gray',
    name: {
      en: 'Gray Granite',
      ua: 'Сірий граніт',
      de: 'Grauer Granit',
      pl: 'Szary Granit'
    },
    subtitle: {
      en: 'Gray Granite Classic',
      ua: 'Gray Granite Classic',
      de: 'Gray Granite Classic',
      pl: 'Gray Granite Classic'
    },
    badge: {
      en: 'Universal',
      ua: 'Універсальний',
      de: 'Universal',
      pl: 'Uniwersalny'
    },
    description: {
      en: 'Classic gray granite for universal use with excellent durability',
      ua: 'Класичний сірий граніт для універсального використання з відмінною стійкістю',
      de: 'Klassischer grauer Granit für universelle Verwendung mit ausgezeichneter Haltbarkeit',
      pl: 'Klasyczny szary granit do uniwersalnego zastosowania o doskonałej trwałości'
    },
    colorClass: 'granite-gray',
    materials: [
      {
        type: 'granite',
        name: { en: 'Gray Granite Cubes', ua: 'Сіра гранітна бруківка', de: 'Graue Granitpflaster', pl: 'Szara kostka granitowa' },
        characteristics: ['Density: 2.65 g/cm³', 'Compressive strength: 180 MPa', 'Frost resistance: F300']
      }
    ],
    textures: [
      {
        id: 'gray-001',
        name: {
          en: 'Classic Gray Standard',
          ua: 'Класичний сірий стандарт',
          de: 'Klassisch Grau Standard',
          pl: 'Klasyczny Szary Standard'
        },
        imageUrl: '/eurogranite-website/images/textures/gray/pokost.jpg',
        thumbUrl: '/eurogranite-website/images/textures/thumbs/gray/pokost.jpg',
        description: {
          en: 'Versatile gray granite with consistent texture and excellent durability',
          ua: 'Універсальний сірий граніт з однорідною текстурою та відмінною стійкістю',
          de: 'Vielseitiger grauer Granit mit gleichmäßiger Textur und ausgezeichneter Haltbarkeit',
          pl: 'Wszechstronny szary granit o jednolitej teksturze i doskonałej trwałości'
        },
        properties: {
          density: '2.65 g/cm³',
          hardness: '6-7 Mohs',
          pattern: 'uniform',
          finish: 'natural',
          frostResistance: 'F300'
        }
      }
    ]
  },
  {
    id: 'red-brown',
    name: {
      en: 'Red-Brown Granite',
      ua: 'Червоно-коричневий граніт',
      de: 'Rotbrauner Granit',
      pl: 'Czerwono-brązowy Granit'
    },
    subtitle: {
      en: 'Red-Brown Granite Elite',
      ua: 'Red-Brown Granite Elite',
      de: 'Red-Brown Granite Elite',
      pl: 'Red-Brown Granite Elite'
    },
    badge: {
      en: 'Unique',
      ua: 'Унікальний',
      de: 'Einzigartig',
      pl: 'Unikalny'
    },
    description: {
      en: 'Warm red-brown shade with natural texture and unique pattern',
      ua: 'Теплий червоно-коричневий відтінок з природною текстурою та унікальним візерунком',
      de: 'Warmer rotbrauner Farbton mit natürlicher Textur und einzigartigem Muster',
      pl: 'Ciepły czerwono-brązowy odcień z naturalną teksturą i unikalnym wzorem'
    },
    colorClass: 'granite-red-brown',
    materials: [
      {
        type: 'granite',
        name: { en: 'Red-Brown Granite Cubes', ua: 'Червоно-коричнева гранітна бруківка', de: 'Rotbraune Granitpflaster', pl: 'Czerwono-brązowa kostka granitowa' },
        characteristics: ['Density: 2.75 g/cm³', 'Compressive strength: 220 MPa', 'Unique iron oxide patterns']
      }
    ],
    textures: [
      {
        id: 'red-brown-001',
        name: {
          en: 'Maple Red-Brown',
          ua: 'Червоно-коричневий клен',
          de: 'Ahorn Rotbraun',
          pl: 'Klon Czerwono-brązowy'
        },
        imageUrl: '/eurogranite-website/images/textures/red-brown/maple-red-gr6.jpg',
        thumbUrl: '/eurogranite-website/images/textures/thumbs/red-brown/maple-red-gr6.jpg',
        description: {
          en: 'Rich maple-toned granite with warm red-brown coloration and fine mineral structure',
          ua: 'Насичений граніт кольору клена з теплим червоно-коричневим забарвленням та дрібною мінеральною структурою',
          de: 'Reichhaltiger ahornfarbener Granit mit warmer rotbrauner Färbung und feiner Mineralstruktur',
          pl: 'Bogaty granit w kolorze klonowym z ciepłym czerwono-brązowym zabarwieniem i drobną strukturą mineralną'
        },
        properties: {
          density: '2.74 g/cm³',
          hardness: '6-7 Mohs',
          pattern: 'fine-grained',
          finish: 'polished',
          maplePattern: 'visible'
        }
      }
    ]
  },
  {
    id: 'pink-gray',
    name: {
      en: 'Pink-Gray Granite',
      ua: 'Рожево-сірий граніт',
      de: 'Rosa-grauer Granit',
      pl: 'Różowo-szary Granit'
    },
    subtitle: {
      en: 'Pink-Gray Granite Elegant',
      ua: 'Pink-Gray Granite Elegant',
      de: 'Pink-Gray Granite Elegant',
      pl: 'Pink-Gray Granite Elegant'
    },
    badge: {
      en: 'Elegant',
      ua: 'Елегантний',
      de: 'Elegant',
      pl: 'Elegancki'
    },
    description: {
      en: 'Refined pink-gray granite with delicate color transitions and sophisticated texture',
      ua: 'Витончений рожево-сірий граніт з делікатними переходами кольорів та вишуканою текстурою',
      de: 'Anspruchsvoller rosa-grauer Granit mit zarten Farbübergängen und raffinierter Textur',
      pl: 'Wyrafinowany różowo-szary granit z delikatnymi przejściami kolorów i wykwintną teksturą'
    },
    colorClass: 'granite-pink-gray',
    materials: [
      {
        type: 'granite',
        name: { en: 'Pink-Gray Granite Cubes', ua: 'Рожево-сіра гранітна бруківка', de: 'Rosa-graue Granitpflaster', pl: 'Różowo-szara kostka granitowa' },
        characteristics: ['Density: 2.66 g/cm³', 'Delicate color transitions', 'Sophisticated mineral patterns']
      }
    ],
    textures: [
      {
        id: 'pink-gray-001',
        name: {
          en: 'Elegant Pink-Gray',
          ua: 'Елегантний рожево-сірий',
          de: 'Eleganter Rosa-Grau',
          pl: 'Elegancki Różowo-Szary'
        },
        imageUrl: '/eurogranite-website/images/textures/pink-gray/leopard-gg1a.jpg',
        thumbUrl: '/eurogranite-website/images/textures/thumbs/pink-gray/leopard-gg1a.jpg',
        description: {
          en: 'Sophisticated pink-gray granite with delicate color transitions and refined mineral patterns',
          ua: 'Витончений рожево-сірий граніт з делікатними переходами кольорів та витонченими мінеральними візерунками',
          de: 'Anspruchsvoller rosa-grauer Granit mit zarten Farbübergängen und raffinierten Mineralmustern',
          pl: 'Wyrafinowany różowo-szary granit z delikatnymi przejściami kolorów i szlachetnymi wzorami mineralnymi'
        },
        properties: {
          density: '2.66 g/cm³',
          hardness: '6-7 Mohs',
          pattern: 'transitional',
          finish: 'polished',
          colorTransitions: 'delicate'
        }
      }
    ]
  },
  {
    id: 'green',
    name: {
      en: 'Green Granite',
      ua: 'Зелений граніт',
      de: 'Grüner Granit',
      pl: 'Zielony Granit'
    },
    subtitle: {
      en: 'Green Granite Natural',
      ua: 'Green Granite Natural',
      de: 'Green Granite Natural',
      pl: 'Green Granite Natural'
    },
    badge: {
      en: 'Natural',
      ua: 'Природний',
      de: 'Natürlich',
      pl: 'Naturalny'
    },
    description: {
      en: 'Pure green granite with rich natural color and distinctive mineral patterns',
      ua: 'Чистий зелений граніт з насиченим природним кольором та характерними мінеральними візерунками',
      de: 'Reiner grüner Granit mit reichhaltiger natürlicher Farbe und markanten Mineralmustern',
      pl: 'Czysty zielony granit o bogatym naturalnym kolorze i charakterystycznych wzorach mineralnych'
    },
    colorClass: 'granite-green',
    materials: [
      {
        type: 'granite',
        name: { en: 'Green Granite Cubes', ua: 'Зелена гранітна бруківка', de: 'Grüne Granitpflaster', pl: 'Zielona kostka granitowa' },
        characteristics: ['Density: 2.70 g/cm³', 'Rich natural color', 'Distinctive mineral patterns']
      }
    ],
    textures: [
      {
        id: 'green-001',
        name: {
          en: 'Natural Forest Green',
          ua: 'Природний лісовий зелений',
          de: 'Natürliches Waldgrün',
          pl: 'Naturalny Leśny Zielony'
        },
        imageUrl: '/eurogranite-website/images/textures/green/maslavske.jpg',
        thumbUrl: '/eurogranite-website/images/textures/thumbs/green/maslavske.jpg',
        description: {
          en: 'Pure natural green granite with rich forest tones and distinctive mineral crystallization',
          ua: 'Чистий природний зелений граніт з насиченими лісовими тонами та характерною мінеральною кристалізацією',
          de: 'Reiner natürlicher grüner Granit mit reichen Waldtönen und charakteristischer Mineralkristallisation',
          pl: 'Czysty naturalny zielony granit o bogatych leśnych tonach i charakterystycznej krystalizacji mineralnej'
        },
        properties: {
          density: '2.70 g/cm³',
          hardness: '6-7 Mohs',
          pattern: 'crystalline',
          finish: 'natural',
          forestTones: 'rich'
        }
      }
    ]
  },
  {
    id: 'labradorite',
    name: {
      en: 'Labradorite',
      ua: 'Лабрадорит',
      de: 'Labradorit',
      pl: 'Labradoryt'
    },
    subtitle: {
      en: 'Labradorite Mystical',
      ua: 'Labradorite Mystical',
      de: 'Labradorite Mystical',
      pl: 'Labradorite Mystical'
    },
    badge: {
      en: 'Mystical',
      ua: 'Містичний',
      de: 'Mystisch',
      pl: 'Mistyczny'
    },
    description: {
      en: 'Exceptional labradorite with iridescent play of colors and magical light reflections',
      ua: 'Винятковий лабрадорит з райдужною грою кольорів та магічними відблисками світла',
      de: 'Außergewöhnlicher Labradorit mit schillerndem Farbenspiel und magischen Lichtreflexionen',
      pl: 'Wyjątkowy labradoryt z tęczową grą kolorów i magicznymi odbiciami światła'
    },
    colorClass: 'granite-labradorite',
    materials: [
      {
        type: 'labradorite',
        name: { en: 'Labradorite Premium', ua: 'Лабрадорит преміум', de: 'Labradorit Premium', pl: 'Labradoryt Premium' },
        characteristics: ['Hardness: 6-6.5 Mohs', 'Density: 2.68-2.72 g/cm³', 'Iridescent surface', 'Color play phenomenon']
      }
    ],
    textures: [
      {
        id: 'labradorite-001',
        name: {
          en: 'Mystical Blue Labradorite',
          ua: 'Містичний синій лабрадорит',
          de: 'Mystischer Blauer Labradorit',
          pl: 'Mistyczny Niebieski Labradoryt'
        },
        imageUrl: '/eurogranite-website/images/textures/labradorite/labro.jpg',
        thumbUrl: '/eurogranite-website/images/textures/thumbs/labradorite/labro.jpg',
        description: {
          en: 'Exceptional labradorite with brilliant blue-green iridescence and magical color play effects',
          ua: 'Винятковий лабрадорит з яскравою синьо-зеленою райдужністю та магічними ефектами гри кольорів',
          de: 'Außergewöhnlicher Labradorit mit brillanter blau-grüner Irisierung und magischen Farbspieleffekten',
          pl: 'Wyjątkowy labradoryt z brylantową niebiesko-zieloną tęczową i magicznymi efektami gry kolorów'
        },
        properties: {
          hardness: '6-6.5 Mohs',
          density: '2.68-2.72 g/cm³',
          pattern: 'iridescent',
          finish: 'polished',
          labradorescence: 'blue-green'
        }
      }
    ]
  }
]

// Container max width (standard)
export const CONTAINER_MAX_WIDTH = '1200px'

// Breakpoints for responsive design
export const BREAKPOINTS = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
}