// Mockup configurations for granite texture visualization system
export const mockupTypes = [
  {
    id: 'kitchen-modern',
    name: {
      en: 'Modern Kitchen',
      ua: 'Сучасна кухня',
      de: 'Moderne Küche',
      pl: 'Nowoczesna Kuchnia'
    },
    description: {
      en: 'Contemporary kitchen design with granite countertops and backsplash',
      ua: 'Сучасний дизайн кухні з гранітними стільницями та фартухом',
      de: 'Zeitgenössisches Küchendesign mit Granitarbeitsplatten und Spritzschutz',
      pl: 'Współczesny projekt kuchni z granitowymi blatami i płytkami ochronnymi'
    },
    baseImage: '/images/mockups/kitchen-modern-base.jpg',
    category: 'interior',
    zones: [
      {
        id: 'countertop',
        name: {
          en: 'Countertop',
          ua: 'Стільниця',
          de: 'Arbeitsplatte',
          pl: 'Blat'
        },
        coordinates: { x: 120, y: 180, width: 450, height: 80 },
        perspective: 'horizontal-top',
        priority: 1
      },
      {
        id: 'backsplash',
        name: {
          en: 'Backsplash',
          ua: 'Фартух',
          de: 'Spritzschutz',
          pl: 'Płytki ochronne'
        },
        coordinates: { x: 120, y: 120, width: 450, height: 50 },
        perspective: 'vertical-flat',
        priority: 2
      },
      {
        id: 'island',
        name: {
          en: 'Kitchen Island',
          ua: 'Кухонний острів',
          de: 'Kücheninsel',
          pl: 'Wyspa kuchenna'
        },
        coordinates: { x: 200, y: 300, width: 280, height: 120 },
        perspective: 'horizontal-angled',
        priority: 3
      },
      {
        id: 'floor-accent',
        name: {
          en: 'Floor Accent',
          ua: 'Акцент підлоги',
          de: 'Bodenakzent',
          pl: 'Akcent podłogowy'
        },
        coordinates: { x: 80, y: 450, width: 550, height: 100 },
        perspective: 'horizontal-perspective',
        priority: 4
      }
    ]
  },
  {
    id: 'bathroom-luxury',
    name: {
      en: 'Luxury Bathroom',
      ua: 'Розкішна ванна',
      de: 'Luxusbadezimmer',
      pl: 'Luksusowa Łazienka'
    },
    description: {
      en: 'Elegant bathroom with granite vanity and decorative wall panels',
      ua: 'Елегантна ванна з гранітним умивальником та декоративними стіновими панелями',
      de: 'Elegantes Badezimmer mit Granitwaschbecken und dekorativen Wandpaneelen',
      pl: 'Elegancka łazienka z granitową umywalką i ozdobnymi panelami ściennymi'
    },
    baseImage: '/images/mockups/bathroom-luxury-base.jpg',
    category: 'interior',
    zones: [
      {
        id: 'vanity-top',
        name: {
          en: 'Vanity Top',
          ua: 'Стільниця умивальника',
          de: 'Waschtischplatte',
          pl: 'Blat umywalki'
        },
        coordinates: { x: 150, y: 220, width: 350, height: 60 },
        perspective: 'horizontal-top',
        priority: 1
      },
      {
        id: 'shower-wall',
        name: {
          en: 'Shower Wall',
          ua: 'Стіна душової',
          de: 'Duschwand',
          pl: 'Ściana prysznicowa'
        },
        coordinates: { x: 80, y: 80, width: 180, height: 300 },
        perspective: 'vertical-flat',
        priority: 2
      },
      {
        id: 'floor-tiles',
        name: {
          en: 'Floor Tiles',
          ua: 'Плитка підлоги',
          de: 'Bodenfliesen',
          pl: 'Płytki podłogowe'
        },
        coordinates: { x: 60, y: 400, width: 480, height: 120 },
        perspective: 'horizontal-perspective',
        priority: 3
      },
      {
        id: 'accent-wall',
        name: {
          en: 'Accent Wall',
          ua: 'Акцентна стіна',
          de: 'Akzentwand',
          pl: 'Ściana akcentowa'
        },
        coordinates: { x: 400, y: 100, width: 120, height: 280 },
        perspective: 'vertical-flat',
        priority: 4
      }
    ]
  },
  {
    id: 'facade-entrance',
    name: {
      en: 'Building Facade',
      ua: 'Фасад будівлі',
      de: 'Gebäudefassade',
      pl: 'Fasada Budynku'
    },
    description: {
      en: 'Architectural facade with granite cladding and entrance elements',
      ua: 'Архітектурний фасад з гранітним облицюванням та елементами входу',
      de: 'Architektonische Fassade mit Granitverkleidung und Eingangselementen',
      pl: 'Fasada architektoniczna z okładziną granitową i elementami wejściowymi'
    },
    baseImage: '/images/mockups/facade-entrance-base.jpg',
    category: 'exterior',
    zones: [
      {
        id: 'base-cladding',
        name: {
          en: 'Base Cladding',
          ua: 'Цокольне облицювання',
          de: 'Sockelverkleidung',
          pl: 'Okładzina cokołowa'
        },
        coordinates: { x: 50, y: 350, width: 500, height: 100 },
        perspective: 'vertical-flat',
        priority: 1
      },
      {
        id: 'entrance-steps',
        name: {
          en: 'Entrance Steps',
          ua: 'Вхідні сходи',
          de: 'Eingangsstufen',
          pl: 'Schody wejściowe'
        },
        coordinates: { x: 200, y: 400, width: 200, height: 80 },
        perspective: 'horizontal-angled',
        priority: 2
      },
      {
        id: 'columns',
        name: {
          en: 'Columns',
          ua: 'Колони',
          de: 'Säulen',
          pl: 'Kolumny'
        },
        coordinates: { x: 180, y: 150, width: 60, height: 200 },
        perspective: 'vertical-curved',
        priority: 3
      },
      {
        id: 'decorative-panels',
        name: {
          en: 'Decorative Panels',
          ua: 'Декоративні панелі',
          de: 'Dekorative Paneele',
          pl: 'Panele dekoracyjne'
        },
        coordinates: { x: 300, y: 180, width: 180, height: 120 },
        perspective: 'vertical-flat',
        priority: 4
      }
    ]
  }
]

// Perspective transformation configurations
export const perspectiveTransforms = {
  'horizontal-top': {
    transform: 'perspective(800px) rotateX(45deg)',
    transformOrigin: 'center bottom'
  },
  'horizontal-angled': {
    transform: 'perspective(800px) rotateX(25deg) rotateY(5deg)',
    transformOrigin: 'center center'
  },
  'horizontal-perspective': {
    transform: 'perspective(1000px) rotateX(60deg)',
    transformOrigin: 'center top'
  },
  'vertical-flat': {
    transform: 'none',
    transformOrigin: 'center center'
  },
  'vertical-curved': {
    transform: 'perspective(600px) rotateY(15deg)',
    transformOrigin: 'center center'
  }
}

// Zone interaction settings
export const zoneSettings = {
  defaultOpacity: 0.8,
  hoverOpacity: 1.0,
  blendMode: 'multiply',
  transitionDuration: '0.3s',
  borderRadius: '2px',
  shadowBlur: '4px'
}

// Mockup loading states
export const mockupStates = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
}

// Export utility functions
export const getMockupById = (id) => {
  return mockupTypes.find(mockup => mockup.id === id)
}

export const getZoneById = (mockupId, zoneId) => {
  const mockup = getMockupById(mockupId)
  return mockup?.zones.find(zone => zone.id === zoneId)
}

export const getMockupsByCategory = (category) => {
  return mockupTypes.filter(mockup => mockup.category === category)
}

export const getPerspectiveTransform = (perspective) => {
  return perspectiveTransforms[perspective] || perspectiveTransforms['vertical-flat']
}