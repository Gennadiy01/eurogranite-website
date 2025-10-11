# Тестування CRUD операцій з продуктами та зображеннями

**Дата:** 11 жовтня 2025
**Мета:** Перевірити створення, редагування та видалення продуктів з зображеннями на localhost та Railway production

---

## 📋 Чек-лист тестування

### Localhost тести:
- [ ] Тест 1: Створити новий продукт з зображенням
- [ ] Тест 2: Редагувати продукт та змінити зображення
- [ ] Тест 3: Видалити продукт

### Production (Railway) тести:
- [ ] Тест 4: Deploy змін на Railway
- [ ] Тест 5: Створити новий продукт з зображенням на production
- [ ] Тест 6: Редагувати продукт на production
- [ ] Тест 7: Перевірити синхронізацію БД

---

## 🧪 ТЕСТ 1: Створення продукту з зображенням (Localhost)

### Передумови:
- ✅ Frontend запущений: `http://localhost:3002`
- ✅ Backend запущений: `http://localhost:5000`
- ✅ Авторизація в Admin Panel

### Кроки:

#### 1. Підготовка зображення

Створіть або візьміть тестове зображення:
- Розмір: 800x600px або більше
- Формат: JPG
- Назва файлу: `test-product-image.jpg`
- Вага: до 500KB

Розмістіть файл у папці:
```
D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite\public\images\products\test-product-image.jpg
```

#### 2. Створення продукту в Admin Panel

1. Відкрийте: `http://localhost:3002/admin/products`
2. Натисніть кнопку **"+ Додати продукт"**
3. Заповніть форму:

**Базова інформація:**
- **ID продукту:** `test-product-localhost-001`
- **Тип продукту:** `paver` (Бруківка)
- **Текстура:** Оберіть будь-яку (наприклад, `gabbro`)

**Назви (всіма мовами):**
- **UA:** `Тестовий продукт 001`
- **EN:** `Test Product 001`
- **DE:** `Testprodukt 001`
- **PL:** `Produkt testowy 001`

**Опис (всіма мовами):**
- **UA:** `Тестовий опис для перевірки функціоналу`
- **EN:** `Test description for functionality check`
- **DE:** `Testbeschreibung zur Funktionsprüfung`
- **PL:** `Testowy opis do sprawdzenia funkcjonalności`

**Розміри:**
- **Length:** `200`
- **Width:** `100`
- **Height:** `50`
- **Unit:** `mm`

**Ціна:**
- **EUR:** `25.00`
- **UAH:** `1000.00`

**Зображення продукту:**

**ВАРІАНТ А: Використання існуючого статичного зображення**
```
/images/products/gabro-200x100x50.jpg
```

**ВАРІАНТ Б: Завантаження нового зображення через форму**
- Клікніть на область завантаження
- Оберіть файл `test-product-image.jpg`
- Зачекайте завершення завантаження
- Система автоматично збереже шлях `/uploads/test-product-image-*.jpg`

⚠️ **ВАЖЛИВО:** Варіант Б працює тільки якщо backend запущений!

#### 3. Збереження продукту

1. Натисніть **"Зберегти продукт"**
2. Перевірте повідомлення: "Продукт успішно створено"
3. Перенаправлення на список продуктів

#### 4. Перевірка на Frontend

1. Відкрийте: `http://localhost:3002/ua/products`
2. Знайдіть картку "Тестовий продукт 001"
3. Перевірте:
   - ✅ Зображення відображається
   - ✅ Назва правильна
   - ✅ Ціна відображається
   - ✅ Розміри відображаються

4. Клікніть на картку → Детальна сторінка
5. Перевірте всю інформацію

#### 5. Перевірка в БД

Відкрийте консоль:
```bash
cd "D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite_admin"
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  const product = await prisma.product.findUnique({
    where: { id: 'test-product-localhost-001' }
  });
  console.log('Product found:', product ? 'YES' : 'NO');
  if (product) {
    console.log('Image:', product.image);
    console.log('Name UA:', product.name?.ua);
  }
  await prisma.\$disconnect();
})();
"
```

### ✅ Критерії успіху:
- Продукт створено в БД
- Зображення відображається в Admin Panel
- Зображення відображається на Frontend
- Всі дані збережені коректно

---

## 🧪 ТЕСТ 2: Редагування продукту та зміна зображення (Localhost)

### Кроки:

#### 1. Відкрити продукт на редагування

1. `http://localhost:3002/admin/products`
2. Знайдіть **"Тестовий продукт 001"**
3. Натисніть **"Редагувати"** (іконка олівця)

#### 2. Змінити дані

Оновіть:
- **Назва UA:** `Тестовий продукт 001 (Оновлено)`
- **Ціна EUR:** `30.00`

#### 3. Змінити зображення

**ВАРІАНТ А: Змінити на інше статичне зображення**
```
/images/products/labradorite-sawn-200x100x50.jpg
```

**ВАРІАНТ Б: Завантажити нове зображення**
- Натисніть **"Змінити"** на превью зображення
- Оберіть інший файл
- Зачекайте завантаження

#### 4. Зберегти зміни

1. Натисніть **"Зберегти зміни"**
2. Перевірте повідомлення: "Продукт успішно оновлено"

#### 5. Перевірка змін

1. Frontend: `http://localhost:3002/ua/products`
2. Перевірте:
   - ✅ Назва оновлена: "Тестовий продукт 001 (Оновлено)"
   - ✅ Ціна оновлена: €30.00
   - ✅ Зображення змінилось

### ✅ Критерії успіху:
- Зміни збережені в БД
- Нове зображення відображається
- Старе зображення НЕ використовується

---

## 🧪 ТЕСТ 3: Видалення продукту (Localhost)

### Кроки:

#### 1. Відкрити список продуктів

`http://localhost:3002/admin/products`

#### 2. Видалити тестовий продукт

1. Знайдіть **"Тестовий продукт 001 (Оновлено)"**
2. Натисніть **"Видалити"** (іконка смітника)
3. Підтвердіть видалення у модальному вікні

#### 3. Перевірка видалення

1. Frontend: `http://localhost:3002/ua/products`
2. Переконайтесь, що продукт **НЕ** відображається

#### 4. Перевірка в БД

```bash
cd "D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite_admin"
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  const product = await prisma.product.findUnique({
    where: { id: 'test-product-localhost-001' }
  });
  console.log('Product exists:', product ? 'YES (ERROR!)' : 'NO (SUCCESS)');
  await prisma.\$disconnect();
})();
"
```

### ✅ Критерії успіху:
- Продукт видалено з БД
- Продукт НЕ відображається в Admin Panel
- Продукт НЕ відображається на Frontend

⚠️ **ПРИМІТКА:** Зображення залишається в `public/images/products/` (static files). Це нормально - статичні файли не видаляються автоматично.

---

## 🚀 ТЕСТ 4: Deploy змін на Railway

### Передумови:
- ✅ Всі локальні зміни закомічені
- ✅ Git репозиторій чистий

### Кроки:

#### 1. Перевірити поточний стан

```bash
cd "D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite"
git status
```

#### 2. Commit та Push змін

Якщо є незакомічені зміни:

```bash
git add .
git commit -m "test: Add product CRUD testing documentation

- Add comprehensive testing guide
- Include localhost and production tests
- Document static image workflow testing

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin feature/admin-ui-v2
```

#### 3. Merge в master (якщо потрібно)

```bash
git checkout master
git merge feature/admin-ui-v2
git push origin master
```

#### 4. Перевірити Railway deployment

1. Відкрийте: https://railway.app/dashboard
2. Перейдіть до проекту **eurogranite-admin-panel**
3. Перевірте статус deployment:
   - 🟢 Building...
   - 🟢 Deploying...
   - ✅ Active

#### 5. Перевірити Health Check

Відкрийте в браузері:
```
https://eurogranite-admin-panel-production.up.railway.app/health
```

Очікуваний результат:
```json
{
  "status": "ok",
  "timestamp": "2025-10-11T...",
  "database": "connected"
}
```

### ✅ Критерії успіху:
- Git push успішний
- Railway deployment завершений без помилок
- Health check повертає status: ok

---

## 🧪 ТЕСТ 5: Створення продукту на Production (Railway)

### Передумови:
- ✅ Railway backend працює
- ✅ Production БД PostgreSQL доступна

### Кроки:

#### 1. Підготувати зображення

Розмістіть тестове зображення:
```
D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite\public\images\products\test-product-production.jpg
```

#### 2. **ВАЖЛИВО:** Commit зображення в Git

```bash
cd "D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite"
git add public/images/products/test-product-production.jpg
git commit -m "test: Add test image for production CRUD testing"
git push origin master
```

#### 3. Build та deploy Frontend з новим зображенням

```bash
npm run build
# Deploy на Hostinger (згідно з вашим процесом)
```

#### 4. Використовувати Railway Admin Panel

⚠️ **ВАЖЛИВА ПРИМІТКА:**
Railway backend НЕ має свого Admin Panel UI. Admin Panel - це частина frontend.

Є 2 варіанти:

**ВАРІАНТ A: Використати localhost Admin Panel → Railway Backend**
1. Оновіть `.env` для роботи з Railway:
   ```
   REACT_APP_API_URL=https://eurogranite-admin-panel-production.up.railway.app/api
   ```
2. Перезапустіть dev server: `npm start`
3. Відкрийте: `http://localhost:3002/admin/products`
4. Створіть продукт з ID: `test-product-production-001`
5. Використайте шлях зображення: `/images/products/test-product-production.jpg`

**ВАРІАНТ B: API запит напряму (curl/Postman)**
```bash
curl -X POST https://eurogranite-admin-panel-production.up.railway.app/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "id": "test-product-production-001",
    "type": "paver",
    "name": {
      "ua": "Продукт Production Test",
      "en": "Production Test Product",
      "de": "Production Testprodukt",
      "pl": "Produkt Production Test"
    },
    "image": "/images/products/test-product-production.jpg",
    ...
  }'
```

#### 5. Перевірити в Production БД

```bash
cd "D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite_admin"

# Змінити DATABASE_URL на Railway production
# Або використати Railway CLI:

railway run node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  const product = await prisma.product.findUnique({
    where: { id: 'test-product-production-001' }
  });
  console.log('Product in Production DB:', product ? 'YES' : 'NO');
  await prisma.\$disconnect();
})();
"
```

### ✅ Критерії успіху:
- Продукт створено в Railway PostgreSQL БД
- Зображення доступне через production frontend
- Дані коректні

---

## 🧪 ТЕСТ 6: Редагування продукту на Production

### Кроки:

Аналогічно до Тесту 2, але:
- Використовуйте Railway backend
- Змінюйте продукт `test-product-production-001`

---

## 🧪 ТЕСТ 7: Синхронізація БД

### Мета:
Перевірити, що localhost та production БД працюють незалежно і правильно.

### Кроки:

#### 1. Підрахувати продукти в localhost БД

```bash
cd "D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite_admin"
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  const count = await prisma.product.count();
  console.log('Localhost DB products:', count);
  await prisma.\$disconnect();
})();
"
```

#### 2. Підрахувати продукти в production БД

Використовуючи Railway CLI або змінивши DATABASE_URL:

```bash
railway run node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  const count = await prisma.product.count();
  console.log('Production DB products:', count);
  await prisma.\$disconnect();
})();
"
```

#### 3. Порівняти результати

- Localhost БД: __ продуктів
- Production БД: __ продуктів

⚠️ **ВАЖЛИВО:** Кількість може відрізнятись - це нормально, якщо ви тестували лише локально або лише на production.

### ✅ Критерії успіху:
- Обидві БД відповідають
- Немає помилок підключення

---

## 📊 Очікувані результати

### Після всіх тестів:

**Localhost:**
- Створено, відредаговано та видалено тестовий продукт ✅
- Static images workflow працює ✅
- БД операції виконуються коректно ✅

**Production (Railway):**
- Backend працює на Railway ✅
- PostgreSQL БД працює ✅
- Static images доступні через frontend ✅
- CRUD операції працюють через API ✅

---

## ⚠️ Відомі обмеження

1. **Railway НЕ має Admin Panel UI** - використовуйте localhost Admin Panel з Railway API
2. **Static images в Git** - зображення треба комітити та деплоїти окремо
3. **Ephemeral storage** - НЕ використовуйте `/uploads/` на Railway (втрачається при redeploy)

---

## 🔧 Troubleshooting

### Зображення не відображається на production:
1. Перевірте, що файл є в Git: `git ls-files public/images/products/`
2. Перевірте, що frontend deployed з новим build
3. Перевірте шлях в БД (має бути `/images/products/...`)

### CORS помилка при створенні продукту:
1. Перевірте CORS_ORIGIN в Railway Variables
2. Має включати ваш frontend домен

### 401 Unauthorized:
1. Перевірте JWT_SECRET в Railway Variables
2. Перевірте токен авторизації

---

**Автор:** Development Team
**Дата:** 11 жовтня 2025
