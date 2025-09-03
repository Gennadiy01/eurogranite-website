# Tests Directory

Цей директорій містить всі тести для проекту Eurogranite.

## Структура:

### `components/`
Тести для React компонентів:
- `Header.test.js` - тестування Header компонента
- `Hero.test.js` - тестування Hero компонента
- Додайте нові тести компонентів сюди

### `__mocks__/`
Mock файли для тестування:
- `languageStore.js` - mock для language store

### `setupTests.js`
Налаштування Jest для всіх тестів

## Як запускати тести:

```bash
# Запустити всі тести
npm test

# Запустити тести з покриттям
npm test -- --coverage

# Запустити тести в watch режимі
npm test -- --watch

# Запустити конкретний тест
npm test Header.test.js
```

## Додавання нових тестів:

1. Створіть новий `.test.js` файл в відповідній папці
2. Імпортуйте необхідні утиліти з `@testing-library/react`
3. Додайте mock'и для stores якщо потрібно
4. Напишіть тести використовуючи Jest матчери

## Приклад тесту:

```javascript
import { render, screen } from '@testing-library/react'
import MyComponent from '../src/components/MyComponent'

test('renders component correctly', () => {
  render(<MyComponent />)
  const element = screen.getByText(/expected text/i)
  expect(element).toBeInTheDocument()
})
```