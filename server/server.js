const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Шлях до файлу з даними продуктів
const PRODUCTS_DATA_PATH = path.join(__dirname, '..', 'src', 'constants', 'productsData.js');
const PRODUCTS_JSON_PATH = path.join(__dirname, 'data', 'products.json');

// Створити папку data якщо не існує
async function ensureDataDir() {
  const dataDir = path.dirname(PRODUCTS_JSON_PATH);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Синхронізація з JS файлом константи
async function syncFromJSFile() {
  try {
    console.log('🔄 Завантаження всіх продуктів з константи...');

    // Завантажуємо всі 12 продуктів з константи
    const allProducts = [
      // 1. Габро 200×100×50 - повний розпил + термообробка
      {
        id: 'paver-gabbro-sawn-thermal-200x100x50',
        textureId: 'black-001',
        finishType: 'sawn-thermal-top',
        size: 'paver_200x100x50',
        dimensions: { length: 200, width: 100, height: 50, unit: 'мм' },
        price: { ua: '1140 грн/м²', en: '21 €/m²', de: '21 €/m²', pl: '21 €/m²' },
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
        dimensions: { length: 200, width: 100, height: 50, unit: 'мм' },
        price: { ua: '2250 грн/м²', en: '41 €/m²', de: '41 €/m²', pl: '41 €/m²' },
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
        dimensions: { length: 100, width: 100, height: 50, unit: 'мм' },
        price: { ua: '1750 грн/м²', en: '32 €/m²', de: '32 €/m²', pl: '32 €/m²' },
        image: '/eurogranite-website/images/products/korets-extra-100x100x50.jpg',
        name: {
          ua: 'Корец Екстра пиляно-колота',
          en: 'Korets Extra Sawn-Split',
          de: 'Korets Extra gesägt-gespalten',
          pl: 'Korets Extra piłowano-łupane'
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
        dimensions: { length: 200, width: 100, height: 50, unit: 'мм' },
        price: { ua: '1950 грн/м²', en: '36 €/m²', de: '36 €/m²', pl: '36 €/m²' },
        image: '/eurogranite-website/images/products/korets-light-200x100x50.jpg',
        name: {
          ua: 'Корец світлий повнопил',
          en: 'Korets Light Full Sawn',
          de: 'Korets Hell vollständig gesägt',
          pl: 'Korets jasny w pełni piłowany'
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
        dimensions: { length: 200, width: 100, height: 50, unit: 'мм' },
        price: { ua: '2470 грн/м²', en: '45 €/m²', de: '45 €/m²', pl: '45 €/m²' },
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
        dimensions: { length: 100, width: 100, height: 60, unit: 'мм' },
        price: { ua: '600 грн/м²', en: '15 €/m²', de: '15 €/m²', pl: '15 €/m²' },
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
        dimensions: { length: 200, width: 100, height: 50, unit: 'мм' },
        price: { ua: '1470 грн/м²', en: '27 €/m²', de: '27 €/m²', pl: '27 €/m²' },
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
        dimensions: { length: 200, width: 100, height: 50, unit: 'мм' },
        price: { ua: '2470 грн/м²', en: '45 €/m²', de: '45 €/m²', pl: '45 €/m²' },
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
        finishType: 'split-from-pencil',
        size: 'paver_100x100x80',
        dimensions: { length: 100, width: 100, height: 80, unit: 'мм' },
        price: { ua: '1470 грн/м²', en: '27 €/m²', de: '27 €/m²', pl: '27 €/m²' },
        image: '/eurogranite-website/images/products/korets-split-pencil-100x100x80.jpg',
        name: {
          ua: 'Корец колотий з олівця',
          en: 'Korets Split from Pencil',
          de: 'Korets aus Bleistift gespalten',
          pl: 'Korets łupane z ołówka'
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
        dimensions: { length: 200, width: 100, height: 50, unit: 'мм' },
        price: { ua: '1050 грн/м²', en: '19 €/m²', de: '19 €/m²', pl: '19 €/m²' },
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
        dimensions: { length: 200, width: 100, height: 50, unit: 'мм' },
        price: { ua: '2250 грн/м²', en: '41 €/m²', de: '41 €/m²', pl: '41 €/m²' },
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
        finishType: 'split-from-pencil',
        size: 'paver_100x100x50',
        dimensions: { length: 100, width: 100, height: 50, unit: 'мм' },
        price: { ua: '880 грн/м²', en: '16 €/m²', de: '16 €/m²', pl: '16 €/m²' },
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
          de: 'Schwarze Granit-Gabbro-Pflastersteine, Vorderseite und Unterseite gespalten, alle Seiten gesägt',
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
    ];

    await fs.writeFile(PRODUCTS_JSON_PATH, JSON.stringify(allProducts, null, 2));
    console.log(`📄 Синхронізовано ${allProducts.length} продуктів з константи до JSON файлу`);
  } catch (error) {
    console.error('❌ Помилка синхронізації:', error.message);
  }
}

// Читання продуктів з JSON
async function readProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_JSON_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Якщо файл не існує, створюємо порожній масив
    await fs.writeFile(PRODUCTS_JSON_PATH, JSON.stringify([], null, 2));
    return [];
  }
}

// Запис продуктів у JSON
async function writeProducts(products) {
  await fs.writeFile(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2));
}

// Створення бекапу
async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(__dirname, 'backups', `products-backup-${timestamp}.json`);

  try {
    const backupDir = path.dirname(backupPath);
    await fs.mkdir(backupDir, { recursive: true });

    const products = await readProducts();
    await fs.writeFile(backupPath, JSON.stringify(products, null, 2));

    return backupPath;
  } catch (error) {
    console.error('❌ Помилка створення бекапу:', error.message);
    throw error;
  }
}

// API Routes

// GET /api/products - Отримати всі продукти
app.get('/api/products', async (req, res) => {
  try {
    const products = await readProducts();
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/products - Додати новий продукт
app.post('/api/products', async (req, res) => {
  try {
    const products = await readProducts();
    const newProduct = {
      id: `product-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(newProduct);
    await writeProducts(products);

    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Продукт успішно створено'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /api/products/:id - Оновити продукт
app.put('/api/products/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const productIndex = products.findIndex(p => p.id === req.params.id);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Продукт не знайдено'
      });
    }

    products[productIndex] = {
      ...products[productIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    await writeProducts(products);

    res.json({
      success: true,
      data: products[productIndex],
      message: 'Продукт успішно оновлено'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/products/:id - Видалити продукт
app.delete('/api/products/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const filteredProducts = products.filter(p => p.id !== req.params.id);

    if (filteredProducts.length === products.length) {
      return res.status(404).json({
        success: false,
        error: 'Продукт не знайдено'
      });
    }

    await writeProducts(filteredProducts);

    res.json({
      success: true,
      message: 'Продукт успішно видалено'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/products/save - Зберегти зміни
app.post('/api/products/save', async (req, res) => {
  try {
    // Створюємо бекап перед збереженням
    const backupPath = await createBackup();

    const products = await readProducts();

    res.json({
      success: true,
      message: 'Зміни успішно збережено',
      backup: path.basename(backupPath),
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/products/reset - Скинути до оригінального стану
app.post('/api/products/reset', async (req, res) => {
  try {
    // Створюємо бекап поточного стану
    const backupPath = await createBackup();

    // Синхронізуємо з оригінальним JS файлом
    await syncFromJSFile();

    const products = await readProducts();

    res.json({
      success: true,
      message: 'Дані скинуто до оригінального стану',
      backup: path.basename(backupPath),
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/products/stats - Статистика
app.get('/api/products/stats', async (req, res) => {
  try {
    const products = await readProducts();

    const stats = {
      total: products.length,
      inStock: products.filter(p => p.inStock).length,
      outOfStock: products.filter(p => !p.inStock).length,
      categories: {
        gabbro: products.filter(p => p.textureId?.includes('black')).length,
        granite: products.filter(p =>
          p.textureId?.includes('red-brown') || p.textureId?.includes('gray')
        ).length,
        green: products.filter(p => p.textureId?.includes('green')).length,
        labradorite: products.filter(p => p.textureId?.includes('labradorite')).length
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Ініціалізація сервера
async function initServer() {
  try {
    await ensureDataDir();

    // Синхронізуємо дані при старті, якщо JSON файл не існує
    try {
      await fs.access(PRODUCTS_JSON_PATH);
    } catch {
      console.log('📄 Початкова синхронізація даних...');
      await syncFromJSFile();
    }

    app.listen(PORT, () => {
      console.log(`🚀 API сервер запущено на http://localhost:${PORT}`);
      console.log(`📁 Дані зберігаються в: ${PRODUCTS_JSON_PATH}`);
      console.log(`💾 Бекапи зберігаються в: ${path.join(__dirname, 'backups')}`);
    });
  } catch (error) {
    console.error('❌ Помилка запуску сервера:', error.message);
    process.exit(1);
  }
}

initServer();