# Product Images Directory

Ця папка містить зображення продуктів для каталогу EuroGranite.

## 📁 Структура

```
products/
├── border-black-gabbro-100x200x800.jpg
├── border-labradorite-custom.jpg
├── paving-stone-gabbro-100x100x100.jpg
└── ...
```

---

## 📸 Додавання нового зображення продукту

### Крок 1: Підготовка зображення

1. **Формат:** JPG, PNG або WebP
2. **Розмір:** Рекомендовано 800x600px або більше
3. **Якість:** Оптимізуйте для web (до 500KB)
4. **Назва файлу:** Використовуйте kebab-case на англійській

**Приклад назв:**
```
paving-stone-gabbro-100x100x100.jpg
border-labradorite-100x200x1000.jpg
curb-stone-grey-150x300x1000.jpg
courtyard-tile-polished.jpg
```

---

### Крок 2: Розміщення файлу

1. Скопіюйте зображення в цю папку:
   ```
   project_eurogranite/public/images/products/
   ```

2. Перевірте що файл з'явився в папці

---

### Крок 3: Оновлення продукту в Admin Panel

1. Відкрийте Admin Panel: `http://localhost:3002/admin/products`
2. Відредагуйте або створіть продукт
3. В полі **"Зображення продукту"** введіть:
   ```
   /images/products/назва-вашого-файлу.jpg
   ```

**Приклад:**
```
/images/products/paving-stone-gabbro-100x100x100.jpg
```

4. Збережіть продукт

---

### Крок 4: Commit в Git

```bash
cd "D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite"

# Додати нове зображення
git add public/images/products/your-new-image.jpg

# Commit
git commit -m "feat: Add product image for [product name]"

# Push
git push origin feature/admin-ui-v2
```

---

## 🔍 Перевірка

### Локально:
1. Запустіть frontend: `npm start`
2. Відкрийте: `http://localhost:3002/ua/products`
3. Перевірте що зображення відображається

### Production:
Після deploy на Hostinger зображення буде доступне за адресою:
```
https://eg.yalivets.top/images/products/your-image.jpg
```

---

## 📝 Найменування файлів

### Формат назви:
```
[тип-продукту]-[текстура]-[розміри].jpg
```

### Приклади:

**Бруківка:**
- `paving-stone-gabbro-100x100x100.jpg`
- `paving-stone-labradorite-100x100x50.jpg`

**Бордюри:**
- `border-gabbro-100x200x1000.jpg`
- `border-grey-granite-150x300x1000.jpg`

**Плитка:**
- `tile-polished-300x300x20.jpg`
- `tile-thermal-600x300x30.jpg`

**Custom:**
- `courtyard-pavement-custom.jpg`
- `walkway-stones-mixed.jpg`

---

## 🚨 Важливо

### ✅ DO:
- Використовуйте осмислені назви файлів
- Оптимізуйте зображення перед завантаженням
- Commit images разом з оновленням продукту
- Використовуйте `/images/products/` prefix в Admin Panel

### ❌ DON'T:
- Не використовуйте кирилицю в назвах файлів
- Не завантажуйте неоптимізовані зображення (>1MB)
- Не використовуйте пробіли в назвах (замість цього `kebab-case`)
- Не завантажуйте зображення через backend API (Railway ephemeral storage)

---

## 🔧 Troubleshooting

### Зображення не відображається:

1. **Перевірте шлях:**
   ```javascript
   // Правильно:
   /images/products/paving-stone-gabbro.jpg

   // Неправильно:
   images/products/paving-stone-gabbro.jpg  (без /)
   /uploads/paving-stone-gabbro.jpg  (старий backend upload)
   ```

2. **Перевірте що файл існує:**
   ```bash
   ls "public/images/products/"
   ```

3. **Перевірте регістр:** Назва файлу case-sensitive на Linux/Hostinger!
   ```bash
   # На Windows може працювати:
   /images/products/Image.JPG

   # На Linux НЕ спрацює, потрібно:
   /images/products/image.jpg
   ```

4. **Очистіть cache браузера:** Ctrl+Shift+R

---

## 📊 Поточні зображення

Станом на 11 жовтня 2025:

- **12 старих продуктів** - використовують зображення з різних папок public/
- **9 нових продуктів** - потребують додавання зображень в цю папку

**TODO:** Перенести всі product images в цю папку для консистентності.

---

**Остання оновлення:** 11 жовтня 2025
