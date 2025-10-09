/**
 * Utilities for surface finish type processing
 */

/**
 * Генерує опис обробки з правильними відмінками для всіх мов
 * @param {Object} processing - Об'єкт з sawnSides, splitSides, thermalTop
 * @param {string} language - Код мови ('ua', 'en', 'de', 'pl')
 * @returns {string} - Опис обробки
 */
export const generateFinishDescription = (processing, language = 'ua') => {
  const { sawnSides, splitSides, thermalTop } = processing;

  // Переклади для різних мов
  const translations = {
    ua: {
      allSawn: 'Пиляна з усіх сторін',
      allSplit: 'Колота',
      sides: ['сторона', 'сторони', 'сторін'],
      sawn: ['пиляна', 'пиляні', 'пиляних'],
      split: ['колота', 'колоті', 'колотих'],
      withThermal: ' з термообробкою верху'
    },
    en: {
      allSawn: 'Sawn on all sides',
      allSplit: 'Split',
      sides: ['side', 'sides', 'sides'],
      sawn: ['sawn', 'sawn', 'sawn'],
      split: ['split', 'split', 'split'],
      withThermal: ' with thermal top'
    },
    de: {
      allSawn: 'Auf allen Seiten gesägt',
      allSplit: 'Gespalten',
      sides: ['Seite', 'Seiten', 'Seiten'],
      sawn: ['gesägt', 'gesägt', 'gesägt'],
      split: ['gespalten', 'gespalten', 'gespalten'],
      withThermal: ' mit thermischer Oberseite'
    },
    pl: {
      allSawn: 'Piłowana ze wszystkich stron',
      allSplit: 'Łupana',
      sides: ['strona', 'strony', 'stron'],
      sawn: ['piłowana', 'piłowane', 'piłowanych'],
      split: ['łupana', 'łupane', 'łupanych'],
      withThermal: ' z obróbką termiczną góry'
    }
  };

  const t = translations[language] || translations.ua;

  // Функція для правильного відмінювання (для української та польської)
  const getWordForm = (count, forms) => {
    if (language === 'en' || language === 'de') {
      return count === 1 ? forms[0] : forms[1];
    }
    // Для української та польської
    if (count === 1) return forms[0];
    if (count >= 2 && count <= 4) return forms[1];
    return forms[2];
  };

  let description = '';

  // 6 пиляних, 0 колотих
  if (sawnSides === 6 && splitSides === 0) {
    description = t.allSawn;
  }
  // 0 пиляних, 6 колотих
  else if (sawnSides === 0 && splitSides === 6) {
    description = t.allSplit;
  }
  // Змішані комбінації
  else {
    const parts = [];

    if (splitSides > 0) {
      parts.push(`${splitSides} ${getWordForm(splitSides, t.sides)} ${getWordForm(splitSides, t.split)}`);
    }

    if (sawnSides > 0) {
      parts.push(`${sawnSides} ${getWordForm(sawnSides, t.sawn)}`);
    }

    description = parts.join(', ');
  }

  // Додаємо термообробку
  if (thermalTop) {
    description += t.withThermal;
  }

  return description;
};

/**
 * Парсить finishType назад в surfaceProcessing (для зворотної сумісності)
 * @param {string} finishType - Тип обробки
 * @returns {Object} - Об'єкт з sawnSides, splitSides, thermalTop
 */
export const parseFinishType = (finishType) => {
  switch (finishType) {
    case 'sawn':
      return { sawnSides: 6, splitSides: 0, thermalTop: false };
    case 'split':
      return { sawnSides: 0, splitSides: 6, thermalTop: false };
    case 'thermal':
      return { sawnSides: 0, splitSides: 6, thermalTop: true };
    case 'sawn-thermal-top':
      return { sawnSides: 6, splitSides: 0, thermalTop: true };
    case 'split-sawn':
      return { sawnSides: 2, splitSides: 4, thermalTop: false };
    case 'split-sawn-thermal':
      return { sawnSides: 2, splitSides: 4, thermalTop: true };
    case 'split-sawn-pencil':
      return { sawnSides: 4, splitSides: 2, thermalTop: false };
    case 'mixed':
      return { sawnSides: 3, splitSides: 3, thermalTop: false };
    case 'mixed-thermal':
      return { sawnSides: 3, splitSides: 3, thermalTop: true };
    default:
      return { sawnSides: 6, splitSides: 0, thermalTop: false };
  }
};
