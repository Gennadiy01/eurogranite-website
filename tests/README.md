# 📋 Інструкція з тестування Eurogranite

## 🎯 Коли потрібно запускати тести

### Обов'язково:
- **Перед кожним комітом** - переконайтеся що не зламали існуючий функціонал
- **Після додавання нових функцій** - перевірте що все працює разом
- **Перед деплоєм на продакшн** - фінальна перевірка якості
- **При рефакторингу коду** - переконайтеся що логіка не змінилася

### Рекомендовано:
- **При виправленні багів** - додайте тест що воспроизводить проблему
- **При зміні залежностей** - перевірте сумісність
- **Періодично під час розробки** - для раннього виявлення проблем

## 🚀 Як запускати тести

### Основні команди:

```bash
# Запустити всі тести (може зайняти багато часу)
npm test

# Запустити тести без watch режиму
npm test -- --watchAll=false

# Запустити конкретний тест
npm test -- --testPathPattern="languageStore" --watchAll=false

# Запустити тести з покриттям коду
npm test -- --coverage --watchAll=false

# Запустити регресійні тести (автоматизовані)
npm run test:regression
```

### Швидкі тести для розробки:

```bash
# Тести логіки мов (швидкі, стабільні)
npm test -- --testPathPattern="languageStore" --watchAll=false

# Тести помилок (може бути повільно)
npm test -- --testPathPattern="ErrorBoundary" --watchAll=false

# Інтеграційні тести (повільні)
npm test -- --testPathPattern="App.test" --watchAll=false
```

## 📊 Очікувані результати

### ✅ Успішний результат:
```
PASS src/languageStore.test.js
  useLanguageStore
    ✓ has correct initial state (132 ms)
    ✓ setLanguage updates current language (44 ms)
    ✓ setLanguage updates document.documentElement.lang (24 ms)
    ✓ setLanguage ignores unsupported languages (23 ms)
    ✓ getBrowserLanguage returns supported browser language (40 ms)
    ✓ getBrowserLanguage returns default for unsupported language (24 ms)
    ✓ isSupportedLanguage correctly identifies supported languages (6 ms)
    ✓ getCurrentLanguage returns current language object (5 ms)
    ✓ language persists in localStorage (74 ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        38.448 s
```

### ⚠️ Очікувані проблеми:
- **Тести компонентів можуть бути повільними** (>2 хвилини)
- **App.test.js може таймаутити** - це відома проблема
- **ErrorBoundary тести потребують оптимізації**

### 🎯 Цільові показники:
- **languageStore: 9/9 тестів** ✅
- **ErrorBoundary: 4/4 тести** (при оптимізації)
- **App integration: 5/5 тестів** (при оптимізації)
- **Загальне покриття: >80%**

## 📁 Розташування тестових файлів

### Поточна структура (працююча):
```
src/
├── languageStore.test.js           ✅ ПРАЦЮЄ (9 тестів)
├── LazyLoadErrorBoundary.test.js   ⚠️ ПОВІЛЬНО
├── App.test.js                     ⚠️ ТАЙМАУТ
└── setupTests.js                   🔧 Конфігурація
```

### Цільова структура (організована):
```
tests/
├── components/
│   └── atoms/
│       └── ErrorBoundary/
│           └── LazyLoadErrorBoundary.test.js
├── stores/
│   └── languageStore.test.js
├── integration/
│   └── App.test.js
├── helpers/
│   ├── testUtils.js                📚 Допоміжні функції
│   └── mockData.js                 🎭 Тестові дані
└── setupTests.js                   🔧 Глобальна конфігурація
```

## 🔧 Налаштування та конфігурація

### Jest конфігурація в package.json:
```json
{
  "scripts": {
    "test": "react-scripts test",
    "test:regression": "node scripts/regression-test.js"
  }
}
```

### Глобальні моки в setupTests.js:
- `window.matchMedia` - для медіа-запитів
- `navigator.language` - для тестування мов
- `localStorage` - для збереження налаштувань
- `IntersectionObserver` - для lazy loading

## 🐛 Відомі проблеми та рішення

### Проблема: Тести таймаутять
**Рішення:**
```bash
# Використовуйте короткий таймаут
npm test -- --testTimeout=10000 --watchAll=false

# Або запускайте конкретні тести
npm test -- --testPathPattern="languageStore" --watchAll=false
```

### Проблема: Тести не знаходяться
**Рішення:**
- Переконайтеся що файли знаходяться в `src/` папці
- Файли мають закінчуватися на `.test.js` або `.spec.js`
- Перевірте що немає синтаксичних помилок

### Проблема: Моки не працюють
**Рішення:**
- Перевірте шляхи в `jest.mock()`
- Використовуйте відносні шляхи від тестового файлу
- Переконайтеся що `setupTests.js` завантажується

## 📈 Планы розвитку тестування

### Короткострокові:
1. **Оптимізувати повільні тести** - зменшити час виконання
2. **Додати тести для критичних компонентів** - Header, Footer, Navigation
3. **Покращити покриття коду** - додати тести для stores

### Довгострокові:
1. **E2E тестування** - Cypress або Playwright
2. **Візуальне тестування** - скріншот тести
3. **Автоматизація в CI/CD** - GitHub Actions

## 📞 Підтримка

При проблемах з тестами:
1. Перевірте цю документацію
2. Запустіть тести поетапно (починаючи з `languageStore.test.js`)
3. Перевірте логи помилок
4. Консультуйтеся з командою розробки

---

**📝 Останнє оновлення:** 22.09.2025
**📊 Статус тестів:** Частково працездатні (languageStore ✅, компоненти ⚠️)
**🎯 Пріоритет:** Оптимізація повільних тестів