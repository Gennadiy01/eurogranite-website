// Granite products data based on Ukrainian granite catalog documentation
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
      en: 'Elite black granite with deep rich color and perfect processing quality',
      ua: 'Елітний чорний граніт з глибоким насиченим кольором та досконалою якістю обробки',
      de: 'Elite schwarzer Granit mit tiefem, sattem Farbton und perfekter Verarbeitungsqualität',
      pl: 'Elitarny czarny granit z głębokim nasyconym kolorem i doskonałą jakością obróbki'
    },
    colorClass: 'granite-black',
    materials: [
      {
        type: 'granite',
        name: { en: 'Black Granite Cubes', ua: 'Чорна гранітна бруківка', de: 'Schwarze Granitpflaster', pl: 'Czarna kostka granitowa' },
        characteristics: ['Bulk density: 2900–3100 kg/m³', 'Compressive strength: 268–306 MPa', 'Water absorption: 0.05–0.11%']
      }
    ],
    textures: [
      {
        id: 'black-001',
        name: {
          en: 'Gabbro',
          ua: 'Gabbro',
          de: 'Gabbro',
          pl: 'Gabbro'
        },
        imageUrl: '/images/textures/black/gabro.jpg',
        thumbUrl: '/images/textures/thumbs/black/gabro.jpg',
        description: {
          en: 'Black fine-grained anorthosite. A rich black color when polished. Quarry location: The village of Kamianobrodske, Zhytomyr region. Features: Extremely durable, ideal for paving stones, curbs, and facade panels.',
          ua: 'Чорний дрібнозернистий анортозит. Насичений чорний колір при поліруванні. Видобуток: Село Кам\'янобрідське, Житомирська область. Особливості: Надзвичайно міцний, ідеальний для бруківки, бордюрів та фасадних панелей.',
          de: 'Schwarzer feinkörniger Anorthosit. Beim Polieren hat er eine satte schwarze Farbe. Abbauort: Das Dorf Kamianobrodske, Region Schytomyr. Besonderheiten: Extrem haltbar und perfekt für Pflastersteine, Bordsteine und Fassadenplatten.',
          pl: 'Czarny drobnoziarnisty anortozyt. Po wypolerowaniu ma nasycony czarny kolor. Lokalizacja kamieniołomu: Wieś Kamianobrodske, obwód żytomierski. Właściwości: Niezwykle trwały, idealny na kostkę brukową, krawężniki i płyty elewacyjne.'
        },
        properties: {
          density: '2900–3100 kg/m³',
          compressiveStrength: '268–306 MPa',
          waterAbsorption: '0.05–0.11%',
          quarry: 'Kamianobrodske'
        },
        groupName: 'Black Granite'
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
        characteristics: ['Bulk density: 2730–2740 kg/m³', 'Compressive strength: 220 MPa', 'Water absorption: 0.24%']
      }
    ],
    textures: [
      {
        id: 'gray-001',
        name: {
          en: 'Real Grey',
          ua: 'Real Grey',
          de: 'Real Grey',
          pl: 'Real Grey'
        },
        imageUrl: '/images/textures/gray/pokost.jpg',
        thumbUrl: '/images/textures/thumbs/gray/pokost.jpg',
        description: {
          en: 'Grey granite. Steel gray with black and white inclusions. Quarry location: The Pokostivske deposit, Zhytomyr region. Features: One of the most common Ukrainian granites, used for stairs, countertops, and facades.',
          ua: 'Сірий граніт. Сталево-сірий з чорними та білими вкрапленнями. Видобуток: Покостівське родовище, Житомирська область. Особливості: Найпоширеніший український граніт, використовується для сходів, стільниць та фасадів.',
          de: 'Grauer Granit. Stahlgrau mit schwarzen und weißen Einschlüssen. Abbauort: Das Pokostivske-Vorkommen, Region Schytomyr. Besonderheiten: Einer der häufigsten ukrainischen Granite, wird für Treppen, Arbeitsplatten und Fassaden verwendet.',
          pl: 'Szary granit. Stalowo-szary z czarnymi i białymi wtrąceniami. Lokalizacja kamieniołomu: Złoże Pokostivske, obwód żytomierski. Właściwości: Jeden z najpopularniejszych granitów ukraińskich, używany na schody, blaty i fasady.'
        },
        properties: {
          density: '2730–2740 kg/m³',
          compressiveStrength: '220 MPa',
          waterAbsorption: '0.24%',
          quarry: 'Pokostivske'
        },
        groupName: 'Gray Granite'
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
        characteristics: ['Density: 2760 kg/m³', 'Compressive strength: 230–255 MPa', 'Water absorption: 0.15%']
      }
    ],
    textures: [
      {
        id: 'green-001',
        name: {
          en: 'Verde Oliva',
          ua: 'Verde Oliva',
          de: 'Verde Oliva',
          pl: 'Verde Oliva'
        },
        imageUrl: '/images/textures/green/maslavske.jpg',
        thumbUrl: '/images/textures/thumbs/green/maslavske.jpg',
        description: {
          en: 'Green fine-grained granite. Green with a unique pattern. Quarry location: The Maslaivske deposit, Zhytomyr region. Features: High resistance to heat and UV radiation.',
          ua: 'Зелений дрібнозернистий граніт. Зелений з унікальним візерунком. Видобуток: Маслаївське родовище, Житомирська область. Особливості: Висока стійкість до спеки та ультрафіолету.',
          de: 'Grüner feinkörniger Granit. Grün mit einem einzigartigen Muster. Abbauort: Das Maslaivske-Vorkommen, Region Schytomyr. Besonderheiten: Hohe Beständigkeit gegen Hitze und UV-Strahlung.',
          pl: 'Zielony drobnoziarnisty granit. Zielony z unikalnym wzorem. Lokalizacja kamieniołomu: Złoże Maslaivske, obwód żytomierski. Właściwości: Wysoka odporność na ciepło i promieniowanie UV.'
        },
        properties: {
          density: '2760 kg/m³',
          compressiveStrength: '230–255 MPa',
          waterAbsorption: '0.15%',
          quarry: 'Maslaivske'
        },
        groupName: 'Green Granite'
      },
      {
        id: 'green-002',
        name: {
          en: 'Chovnovske',
          ua: 'Chovnovske',
          de: 'Chovnovske',
          pl: 'Chovnovske'
        },
        imageUrl: '/images/textures/green/chovnovske.jpg',
        thumbUrl: '/images/textures/thumbs/green/chovnovske.jpg',
        description: {
          en: 'Green medium-grained granite. Unusual green color with gray and brown inclusions. Quarry location: Chovnova village, Khoroshiv district, Zhytomyr region. Features: High strength, frost resistance, very low water absorption, and resistance to natural climate conditions.',
          ua: 'Зелений середньозернистий граніт. Дуже незвичайний зелений колір з сірими і коричневими вкрапленнями. Видобуток: Село Човнова, Хорошівський район, Житомирська область. Особливості: Висока міцність, морозостійкість, дуже низьке водопоглинання та стійкість до природного клімату.',
          de: 'Grüner mittelkörniger Granit. Ungewöhnliche grüne Farbe mit grauen und braunen Einschlüssen. Abbauort: Dorf Chovnova, Bezirk Khoroshiv, Region Schytomyr. Besonderheiten: Hohe Festigkeit, Frostbeständigkeit, sehr geringe Wasseraufnahme und Beständigkeit gegen natürliche Klimabedingungen.',
          pl: 'Zielony średnioziarnisty granit. Niezwykły zielony kolor z szarymi i brązowymi wtrąceniami. Lokalizacja kamieniołomu: Wieś Chovnova, rejon Khoroshiv, obwód żytomierski. Właściwości: Wysoka wytrzymałość, odporność na mróz, bardzo niskie pochlanianie wody i odporność na naturalne warunki klimatyczne.'
        },
        properties: {
          density: '2700 kg/m³',
          compressiveStrength: '90–120 MPa',
          waterAbsorption: '0.2–0.5%',
          quarry: 'Chovnova'
        },
        groupName: 'Green Granite'
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
        characteristics: ['Various densities: 2470–2850 kg/m³', 'Compressive strength: 120–306 MPa', 'Water absorption: 0.13–1.02%']
      }
    ],
    textures: [
      {
        id: 'red-brown-001',
        name: {
          en: 'Rosso Santiago',
          ua: 'Rosso Santiago',
          de: 'Rosso Santiago',
          pl: 'Rosso Santiago'
        },
        imageUrl: '/images/textures/red-brown/2-vasylivske-rodovyshhe.jpg',
        thumbUrl: '/images/textures/thumbs/red-brown/2-vasylivske-rodovyshhe.jpg',
        description: {
          en: 'Brown-black coarse-grained granite. Red-brown with black and gray inclusions. Quarry location: The Kapustianske deposit, Kirovohrad region. Features: Strong, resistant to damage and temperature changes, perfect for cladding.',
          ua: 'Коричнево-чорний грубозернистий граніт. Червоно-коричневий з чорними й сірими вкрапленнями. Видобуток: Капустянське родовище, Кіровоградська область. Особливості: Міцний, стійкий до пошкоджень та перепадів температур, ідеальний для облицювання.',
          de: 'Braun-schwarzer grobkörniger Granit. Rot-braun mit schwarzen und grauen Einschlüssen. Abbauort: Das Kapustianske-Vorkommen, Region Kirowohrad. Besonderheiten: Stark, resistent gegen Beschädigungen und Temperaturschwankungen, ideal für Verkleidungen.',
          pl: 'Brązowo-czarny gruboziarnisty granit. Czerwono-brązowy z czarnymi i szarymi wtrąceniami. Lokalizacja kamieniołomu: Złoże Kapustianske, obwód kirowohradzki. Właściwości: Mocny, odporny na uszkodzenia i zmiany temperatury, idealny do okładzin.'
        },
        properties: {
          density: '2850 kg/m³',
          compressiveStrength: '120–165 MPa',
          waterAbsorption: '0.13–0.22%',
          quarry: 'Kapustianske'
        },
        groupName: 'Red-Brown Granite'
      },
      {
        id: 'red-brown-002',
        name: {
          en: 'Rosa Ravena Extra',
          ua: 'Rosa Ravena Extra',
          de: 'Rosa Ravena Extra',
          pl: 'Rosa Ravena Extra'
        },
        imageUrl: '/images/textures/red-brown/3-didkovytske-rodovyshhe.jpg',
        thumbUrl: '/images/textures/thumbs/red-brown/3-didkovytske-rodovyshhe.jpg',
        description: {
          en: 'Red-brown with a pinkish tint. Quarry location: The village of Zhadkivka, Korets district, Rivne region. Features: Resistant to moisture and low temperatures.',
          ua: 'Червоно-коричневий із рожевим відтінком. Видобуток: Село Жадківка, Корецький район, Рівненська область. Особливості: Стійкий до вологи та низьких температур.',
          de: 'Rot-braun mit einem rosa Farbton. Abbauort: Das Dorf Zhadkivka, Bezirk Korets, Region Riwne. Besonderheiten: Beständig gegen Feuchtigkeit und niedrige Temperaturen.',
          pl: 'Czerwono-brązowy z różowawym odcieniem. Lokalizacja kamieniołomu: Wieś Żadkiwka, rejon korecki, obwód rówieński. Właściwości: Odporny na wilgoć i niskie temperatury.'
        },
        properties: {
          density: '2695–2730 kg/m³',
          compressiveStrength: '212–240 MPa',
          waterAbsorption: '0.15–0.41%',
          quarry: 'Zhadkivka'
        },
        groupName: 'Red-Brown Granite'
      },
      {
        id: 'red-brown-003',
        name: {
          en: 'Rosso Toledo',
          ua: 'Rosso Toledo',
          de: 'Rosso Toledo',
          pl: 'Rosso Toledo'
        },
        imageUrl: '/images/textures/red-brown/9-omelyanivske-rodovyshhe.jpg',
        thumbUrl: '/images/textures/thumbs/red-brown/9-omelyanivske-rodovyshhe.jpg',
        description: {
          en: 'Carrot orange medium-grained granite. A vibrant carrot-orange with black and gray inclusions. Quarry location: The Omelyanivske deposit, Zhytomyr region. Features: One of the most popular granites in Ukraine, used for cladding facades, bridges, and embankments.',
          ua: 'Морквяно-помаранчевий середньозернистий граніт. Морквяно-помаранчевий з чорними та сірими вкрапленнями. Видобуток: Омелянівське родовище, Житомирська область. Особливості: Один із найпопулярніших в Україні, використовується для облицювання фасадів, мостів та набережних.',
          de: 'Karottenoranges mittelkörniges Granit. Ein lebhaftes Karottenorange mit schwarzen und grauen Einschlüssen. Abbauort: Das Omelyanivske-Vorkommen, Region Schytomyr. Besonderheiten: Einer der beliebtesten Granite in der Ukraine, wird für die Verkleidung von Fassaden, Brücken und Uferpromenaden verwendet.',
          pl: 'Marchewkowo-pomarańczowy średnioziarnisty granit. Żywy pomarańcz marchewkowy z czarnymi i szarymi wtrąceniami. Lokalizacja kamieniołomu: Złoże Omelyanivske, obwód żytomierski. Właściwości: Jeden z najpopularniejszych granitów na Ukrainie, używany do okładzin fasad, mostów i nabrzeży.'
        },
        properties: {
          density: '2600–2640 kg/m³',
          compressiveStrength: '240 MPa',
          waterAbsorption: '0.15–1.02%',
          quarry: 'Omelyanivske'
        },
        groupName: 'Red-Brown Granite'
      },
      {
        id: 'red-brown-004',
        name: {
          en: 'Leopard',
          ua: 'Leopard',
          de: 'Leopard',
          pl: 'Leopard'
        },
        imageUrl: '/images/textures/pink-gray/leopard-gg1a.jpg',
        thumbUrl: '/images/textures/thumbs/pink-gray/leopard-gg1a.jpg',
        description: {
          en: 'Pinkish-grey coarse-grained granite. Dark gray with pink and beige inclusions, resembling a leopard\'s skin. Quarry location: The Kornynske deposit, Zhytomyr region. Features: High strength and resistance to temperature changes.',
          ua: 'Рожево-сірий грубозернистий граніт. Темно-сірий з рожевими та бежевими вкрапленнями, що нагадує шкіру леопарда. Видобуток: Корнинське родовище, Житомирська область. Особливості: Висока міцність та стійкість до перепадів температур.',
          de: 'Rosa-grauer grobkörniger Granit. Dunkelgrau mit rosa und beigen Einschlüssen, die an das Fell eines Leoparden erinnern. Abbauort: Das Kornynske-Vorkommen, Region Schytomyr. Besonderheiten: Hohe Festigkeit und Beständigkeit gegen Temperaturschwankungen.',
          pl: 'Różowo-szary gruboziarnisty granit. Ciemnoszary z różowymi i beżowymi wtrąceniami, przypominającymi skórę lamparta. Lokalizacja kamieniołomu: Złoże Kornynske, obwód żytomierski. Właściwości: Wysoka wytrzymałość i odporność na wahania temperatury.'
        },
        properties: {
          density: '2730 kg/m³',
          compressiveStrength: '190 MPa',
          waterAbsorption: '0.31%',
          quarry: 'Kornynske'
        },
        groupName: 'Red-Brown Granite'
      },
      {
        id: 'red-brown-005',
        name: {
          en: 'Maple Red',
          ua: 'Maple Red',
          de: 'Maple Red',
          pl: 'Maple Red'
        },
        imageUrl: '/images/textures/red-brown/maple-red-gr6.jpg',
        thumbUrl: '/images/textures/thumbs/red-brown/maple-red-gr6.jpg',
        description: {
          en: 'Red fine-grained granite. A bright crimson-red with small black inclusions. Quarry location: The village of Liznyky, Zhytomyr region. Features: Considered an elite granite due to its popularity and high price, used for monuments and facades.',
          ua: 'Червоний дрібнозернистий граніт. Яскравий малиново-червоний з дрібними чорними вкрапленнями. Видобуток: Село Лізники, Житомирська область. Особливості: Вважається елітним через свою популярність та високу ціну, використовується для монументів та фасадів.',
          de: 'Roter feinkörniger Granit. Ein leuchtendes Himbeerrot mit kleinen schwarzen Einschlüssen. Abbauort: Das Dorf Liznyky, Region Schytomyr. Besonderheiten: Gilt aufgrund seiner Beliebtheit und seines hohen Preises als Elite-Granit, wird für Denkmäler und Fassaden verwendet.',
          pl: 'Czerwony drobnoziarnisty granit. Jasny, malinowo-czerwony z drobnymi czarnymi wtrąceniami. Lokalizacja kamieniołomu: Wieś Liznyky, obwód żytomierski. Właściwości: Uważany za elitarny ze względu na swoją popularność i wysoką cenę, używany do pomników i fasad.'
        },
        properties: {
          density: '2650 kg/m³',
          compressiveStrength: '135–260 MPa',
          waterAbsorption: '0.18%',
          quarry: 'Liznyky'
        },
        groupName: 'Red-Brown Granite'
      },
      {
        id: 'red-brown-006',
        name: {
          en: 'Star of Ukraine',
          ua: 'Star of Ukraine',
          de: 'Star of Ukraine',
          pl: 'Star of Ukraine'
        },
        imageUrl: '/images/textures/red-brown/5-kapustynske-rodovyshhe.jpg',
        thumbUrl: '/images/textures/thumbs/red-brown/5-kapustynske-rodovyshhe.jpg',
        description: {
          en: 'Light red-brown fine-grained granite. Light brown with a pinkish or dark brown tint. Quarry location: The Didkovytske deposit, Zhytomyr region. Features: Resistant to temperature fluctuations, used for countertops and monuments.',
          ua: 'Світло червоно-коричневий дрібнозернистий граніт. Світло-коричневий з рожевим або темно-коричневим відтінком. Видобуток: Дідковицьке родовище, Житомирська область. Особливості: Стійкий до перепадів температур, використовується для стільниць та пам\'ятників.',
          de: 'Hellrotbrauner feinkörniger Granit. Hellbraun mit einem rosa oder dunkelbraunen Farbton. Abbauort: Das Didkovytske-Vorkommen, Region Schytomyr. Besonderheiten: Beständig gegen Temperaturschwankungen, wird für Arbeitsplatten und Denkmäler verwendet.',
          pl: 'Jasnoczerwono-brązowy drobnoziarnisty granit. Jasnobrązowy z różowym lub ciemnobrązowym odcieniem. Lokalizacja kamieniołomu: Złoże Didkovytske, obwód żytomierski. Właściwości: Odporny na wahania temperatury, używany na blaty i pomniki.'
        },
        properties: {
          density: '2470–2770 kg/m³',
          compressiveStrength: '149–245 MPa',
          waterAbsorption: '0.13–0.24%',
          quarry: 'Didkovytske'
        },
        groupName: 'Red-Brown Granite'
      },
      {
        id: 'red-brown-007',
        name: {
          en: 'Ukrainian Autumn',
          ua: 'Ukrainian Autumn',
          de: 'Ukrainian Autumn',
          pl: 'Ukrainian Autumn'
        },
        imageUrl: '/images/textures/red-brown/6-leznykivske-rodovyshhe.jpg',
        thumbUrl: '/images/textures/thumbs/red-brown/6-leznykivske-rodovyshhe.jpg',
        description: {
          en: 'Brown or beige with shades of gray, green, and gold fine-grained granite. Quarry location: The Vasylivske deposit, Zhytomyr region. Features: Popular for its autumnal colors and resistance to mechanical damage and temperature changes.',
          ua: 'Коричневий або бежевий з відтінками сірого, зеленого та золотого дрібнозернистий граніт. Видобуток: Василівське родовище, Житомирська область. Особливості: Популярний завдяки осіннім відтінкам та стійкості до механічних пошкоджень та перепадів температур.',
          de: 'Braun oder Beige mit Grau-, Grün- und Goldtönen feinkörniger Granit. Abbauort: Das Vasylivske-Vorkommen, Region Schytomyr. Besonderheiten: Beliebt wegen seiner herbstlichen Farben und Beständigkeit gegen mechanische Beschädigungen und Temperaturschwankungen.',
          pl: 'Brązowy lub beżowy z odcieniami szarości, zieleni i złota drobnoziarnisty granit. Lokalizacja kamieniołomu: Złoże Vasylivske, obwód żytomierski. Właściwości: Popularny ze względu na jesienne kolory i odporność na uszkodzenia mechaniczne oraz zmiany temperatury.'
        },
        properties: {
          density: '2680–2685 kg/m³',
          compressiveStrength: '180–210 MPa',
          waterAbsorption: '0.45–0.48%',
          quarry: 'Vasylivske'
        },
        groupName: 'Red-Brown Granite'
      },
      {
        id: 'red-brown-008',
        name: {
          en: 'Flower of Ukraine',
          ua: 'Flower of Ukraine',
          de: 'Flower of Ukraine',
          pl: 'Flower of Ukraine'
        },
        imageUrl: '/images/textures/red-brown/8-mezhyritske-rodovyshhe.jpg',
        thumbUrl: '/images/textures/thumbs/red-brown/8-mezhyritske-rodovyshhe.jpg',
        description: {
          en: 'Pinkish-brown with dark inclusions. Quarry location: The Mezhyritske deposit, Zhytomyr region. Features: Resistant to scratches, impacts, and moisture.',
          ua: 'Рожево-коричневий з темними вкрапленнями. Видобуток: Межиріцьке родовище, Житомирська область. Особливості: Стійкий до подряпин, ударів та вологи.',
          de: 'Rosa-braun mit dunklen Einschlüssen. Abbauort: Das Mezhyritske-Vorkommen, Region Schytomyr. Besonderheiten: Kratz-, stoß- und feuchtigkeitsbeständig.',
          pl: 'Różowo-brązowy z ciemnymi wtrąceniami. Lokalizacja kamieniołomu: Złoże Mezhyritske, obwód żytomierski. Właściwości: Odporny na zarysowania, uderzenia i wilgoć.'
        },
        properties: {
          density: '2620 kg/m³',
          compressiveStrength: '171 MPa',
          waterAbsorption: '0.55%',
          quarry: 'Mezhyritske'
        },
        groupName: 'Red-Brown Granite'
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
        characteristics: ['Bulk density: 2800–2860 kg/m³', 'Compressive strength: 135–166 MPa', 'Water absorption: 0.08–0.17%']
      }
    ],
    textures: [
      {
        id: 'labradorite-001',
        name: {
          en: 'Ukrainian Labradorite Volga Blue',
          ua: 'Ukrainian Labradorite Volga Blue',
          de: 'Ukrainian Labradorite Volga Blue',
          pl: 'Ukrainian Labradorite Volga Blue'
        },
        imageUrl: '/images/textures/labradorite/labro.jpg',
        thumbUrl: '/images/textures/thumbs/labradorite/labro.jpg',
        description: {
          en: 'A black-blue rock with metallic sheen and iridescence. Quarry location: The Pivnichne deposit, village of Osnyky, Zhytomyr region. Features: Used for wall cladding, flooring, and monuments.',
          ua: 'Чорно-синя порода з металевим блиском та іризацією. Видобуток: Північне родовище, село Осники, Житомирська область. Особливості: Використовується для облицювання стін, підлогового покриття та пам\'ятників.',
          de: 'Ein schwarz-blauer Stein mit metallischem Glanz und Irisieren. Abbauort: Das Pivnichne-Vorkommen, Dorf Osnyky, Region Schytomyr. Besonderheiten: Wird für Wandverkleidungen, Bodenbeläge und Denkmäler verwendet.',
          pl: 'Czarno-niebieska skała z metalicznym połyskiem i iryzacją. Lokalizacja kamieniołomu: Złoże Pivnichne, wieś Osnyky, obwód żytomierski. Właściwości: Używany do okładzin ściennych, posadzek i pomników.'
        },
        properties: {
          density: '2800–2860 kg/m³',
          compressiveStrength: '135–166 MPa',
          waterAbsorption: '0.08–0.17%',
          quarry: 'Pivnichne'
        },
        groupName: 'Labradorite'
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