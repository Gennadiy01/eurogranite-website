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
    ]
  },
  {
    id: 'gray-green',
    name: {
      en: 'Gray-Green Granite',
      ua: 'Сіро-зелений граніт',
      de: 'Graugrüner Granit',
      pl: 'Szaro-zielony Granit'
    },
    subtitle: {
      en: 'Gray-Green Granite Rare',
      ua: 'Gray-Green Granite Rare',
      de: 'Gray-Green Granite Rare',
      pl: 'Gray-Green Granite Rare'
    },
    badge: {
      en: 'Rare',
      ua: 'Рідкісний',
      de: 'Selten',
      pl: 'Rzadki'
    },
    description: {
      en: 'Unique gray-green granite with natural inclusions and noble shade',
      ua: 'Унікальний сіро-зеленуватий граніт з природними включеннями та благородним відтінком',
      de: 'Einzigartiger graugrüner Granit mit natürlichen Einschlüssen und edlem Farbton',
      pl: 'Unikalny szaro-zielony granit z naturalnymi wtrąceniami i szlachetnym odcieniem'
    },
    colorClass: 'granite-gray-green',
    materials: [
      {
        type: 'granite',
        name: { en: 'Gray-Green Granite Cubes', ua: 'Сіро-зелена гранітна бруківка', de: 'Graugrüne Granitpflaster', pl: 'Szaro-zielona kostka granitowa' },
        characteristics: ['Density: 2.68 g/cm³', 'Unique mineral composition', 'Natural green inclusions']
      }
    ]
  },
  {
    id: 'black-green',
    name: {
      en: 'Black-Green Granite',
      ua: 'Чорно-зелений граніт',
      de: 'Schwarzgrüner Granit',
      pl: 'Czarno-zielony Granit'
    },
    subtitle: {
      en: 'Black-Green Granite Exclusive',
      ua: 'Black-Green Granite Exclusive',
      de: 'Black-Green Granite Exclusive',
      pl: 'Black-Green Granite Exclusive'
    },
    badge: {
      en: 'Exclusive',
      ua: 'Ексклюзивний',
      de: 'Exklusiv',
      pl: 'Ekskluzywny'
    },
    description: {
      en: 'Premium black-green granite for the most special and exclusive projects',
      ua: 'Преміальний чорно-зеленуватий граніт для найособливіших та ексклюзивних проектів',
      de: 'Premium schwarzgrüner Granit für die besonderen und exklusivsten Projekte',
      pl: 'Premium czarno-zielony granit do najbardziej wyjątkowych i ekskluzywnych projektów'
    },
    colorClass: 'granite-black-green',
    materials: [
      {
        type: 'granite',
        name: { en: 'Black-Green Granite Cubes', ua: 'Чорно-зелена гранітна бруківка', de: 'Schwarzgrüne Granitpflaster', pl: 'Czarno-zielona kostka granitowa' },
        characteristics: ['Density: 2.72 g/cm³', 'Premium quality', 'Exclusive dark green patterns']
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