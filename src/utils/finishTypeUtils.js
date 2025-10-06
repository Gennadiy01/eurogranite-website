/**
 * Utilities for surface finish type processing
 */

/**
 * Генерує український опис обробки з правильними відмінками
 * @param {Object} processing - Об'єкт з sawnSides, splitSides, thermalTop
 * @returns {string} - Опис обробки українською мовою
 */
export const generateFinishDescription = (processing) => {
  const { sawnSides, splitSides, thermalTop } = processing;

  // Функція для правильного відмінювання
  const getSidesWord = (count, forms) => {
    // forms = ['сторона', 'сторони', 'сторін']
    if (count === 1) return forms[0];
    if (count >= 2 && count <= 4) return forms[1];
    return forms[2];
  };

  const getSawnWord = (count) => {
    if (count === 1) return 'пиляна';
    if (count >= 2 && count <= 4) return 'пиляні';
    return 'пиляних';
  };

  const getSplitWord = (count) => {
    if (count === 1) return 'колота';
    if (count >= 2 && count <= 4) return 'колоті';
    return 'колотих';
  };

  let description = '';

  // 6 пиляних, 0 колотих
  if (sawnSides === 6 && splitSides === 0) {
    description = 'Пиляна з усіх сторін';
  }
  // 0 пиляних, 6 колотих
  else if (sawnSides === 0 && splitSides === 6) {
    description = 'Колота';
  }
  // Змішані комбінації
  else {
    const parts = [];

    if (splitSides > 0) {
      parts.push(`${splitSides} ${getSidesWord(splitSides, ['сторона', 'сторони', 'сторін'])} ${getSplitWord(splitSides)}`);
    }

    if (sawnSides > 0) {
      parts.push(`${sawnSides} ${getSawnWord(sawnSides)}`);
    }

    description = parts.join(', ');
  }

  // Додаємо термообробку
  if (thermalTop) {
    description += ' з термообробкою верху';
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
