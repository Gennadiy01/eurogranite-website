# 🎨 План Розробки Admin Panel UI

**Дата створення:** 3 жовтня 2025
**Версія:** 1.3.0
**Останнє оновлення:** 5 жовтня 2025 (Phase 1 Testing - Bundle Size Check)
**Статус:** ✅ Phase 1 Week 2 COMPLETED - Automated Testing PASSED
**Автор:** Claude Code

---

## 📋 Огляд

Цей документ описує детальний план розробки інтерфейсу адміністративної панелі для управління контентом сайту EuroGranite. Admin Panel UI буде інтегровано в існуючий проект як окремий розділ з захищеним доступом.

**Функціонал:**
- 🛍️ Управління продуктами (Products)
- 📝 Управління статтями (Articles)
- 🖼️ Управління галереєю (майбутнє)

---

## 🎯 Мета та Вимоги

### Основна Мета:
Створити зручний, інтуїтивно зрозумілий інтерфейс для управління контентом сайту EuroGranite:

**Продукти (Products):**
- Переглядати всі продукти
- Додавати нові продукти
- Редагувати існуючі продукти
- Видаляти продукти
- Завантажувати зображення продуктів

**Статті (Articles):** 🆕
- Створювати та публікувати статті
- Редагувати контент з Rich Text Editor
- Управляти SEO метаданими
- Мультимовна підтримка (4 мови)

### Функціональні Вимоги:
1. **CRUD Операції** - Create, Read, Update, Delete для продуктів та статей
2. **Мультимовність** - Підтримка 4 мов (UA, EN, DE, PL) для всього контенту
3. **Завантаження Файлів** - Upload зображень для продуктів та статей
4. **Валідація** - Перевірка коректності даних перед відправкою
5. **Попередній Перегляд** - Preview перед збереженням
6. **Пошук та Фільтрація** - Швидкий пошук по назві/ID/контенту
7. **Rich Text Editor** - Редагування статей з форматуванням 🆕
8. **SEO Оптимізація** - Meta tags, keywords для статей 🆕
9. **Автентифікація** - Захист доступу (Phase 2)

### Технічні Вимоги:
- Використання існуючого React stack (React 18, React Router v6)
- Інтеграція з Zustand для state management
- Responsive design (десктоп + планшет)
- Використання існуючих компонентів UI з основного сайту
- API інтеграція з backend Express.js сервером

---

## 🏗️ Технічний Стек

### Frontend (в проекті project_eurogranite):
- **Framework:** React 18
- **Routing:** React Router v6
- **State Management:** Zustand
- **Styling:** SASS/SCSS + CSS Modules (для admin)
- **Code Splitting:** React.lazy() для admin routes
- **Icons:** Lucide React
- **Form Handling:** React Hook Form (нова залежність)
- **HTTP Client:** Axios (нова залежність)
- **Rich Text Editor:** Draft.js або Slate (Phase 1.5) 🆕

### Backend (project_eurogranite_admin):
- **Framework:** Express.js ✅
- **File Upload:** Multer ✅
- **API Products:** 7 endpoints ✅
- **API Articles:** 5 endpoints 🆕 (потрібно додати)
- **Database:** JSON файли з auto-backup ✅
  - `data/products.json` ✅
  - `data/articles.json` 🆕

---

## 📂 Структура Проекту

### Нова Структура Файлів (в project_eurogranite):

```
src/
├── pages/
│   ├── Articles.jsx                    # 🔄 Оновлюється (замість "Coming soon")
│   └── admin/                          # 🆕 Admin Pages (lazy loaded)
│       ├── AdminDashboard.jsx          # Головна сторінка admin
│       ├── ProductsManager.jsx         # Управління продуктами
│       ├── ArticlesManager.jsx         # 🆕 Управління статтями
│       └── AdminLogin.jsx              # Сторінка входу (Phase 2)
│
├── components/
│   ├── shared/                         # 🆕 Shared Components (в main.js)
│   │   └── articles/
│   │       ├── ArticleCard.jsx         # Використовується Production + Admin
│   │       ├── ArticleGrid.jsx         # Grid layout для статей
│   │       └── ArticleCard.module.scss # CSS Modules!
│   │
│   └── admin/                          # 🆕 Admin Components (lazy loaded)
│       ├── products/
│       │   ├── ProductTable.jsx        # Таблиця продуктів
│       │   ├── ProductForm.jsx         # Форма продукту (create/edit)
│       │   ├── BasicInfoFields.jsx     # ID, texture, finish, size
│       │   ├── DimensionsFields.jsx    # Розміри
│       │   ├── PriceFields.jsx         # Ціни для 4 мов
│       │   ├── MultilingualFields.jsx  # Name, description, features
│       │   ├── ImageUploadField.jsx    # Завантаження зображення
│       │   ├── ProductPreview.jsx      # Попередній перегляд
│       │   └── products.module.scss    # CSS Modules
│       │
│       ├── articles/                   # 🆕 Admin Articles
│       │   ├── ArticlesTable.jsx       # Таблиця статей
│       │   ├── ArticleForm.jsx         # Форма статті
│       │   ├── ArticleEditor.jsx       # Rich Text Editor
│       │   ├── SEOFields.jsx           # Meta tags, keywords
│       │   ├── ArticlePreview.jsx      # Preview (використовує shared/ArticleCard)
│       │   └── articles.module.scss    # CSS Modules
│       │
│       ├── layout/
│       │   ├── AdminLayout.jsx         # Layout для admin
│       │   ├── AdminSidebar.jsx        # Sidebar навігація
│       │   ├── AdminHeader.jsx         # Header з logout
│       │   └── layout.module.scss      # CSS Modules
│       │
│       └── common/
│           ├── SearchBar.jsx           # Пошук
│           ├── ConfirmDialog.jsx       # Підтвердження видалення
│           ├── LoadingSpinner.jsx      # Індикатор завантаження
│           └── common.module.scss      # CSS Modules
│
├── stores/
│   ├── useProductsStore.js             # 🆕 Products store
│   ├── useArticlesStore.js             # 🆕 Articles store
│   └── useAuthStore.js                 # 🆕 Auth store (Phase 2)
│
├── services/
│   └── api/                            # 🆕 API Integration
│       ├── productsApi.js              # CRUD для продуктів
│       ├── articlesApi.js              # 🆕 CRUD для статей
│       └── uploadApi.js                # File upload API
│
├── utils/
│   ├── validators/
│   │   ├── productValidator.js         # Валідація продуктів
│   │   └── articleValidator.js         # 🆕 Валідація статей
│   └── formatters/
│       ├── productFormatter.js         # Форматування продуктів
│       └── articleFormatter.js         # 🆕 Форматування статей
│
└── constants/
    └── adminConstants.js               # Константи (routes, roles)
```

### 🎯 Code Splitting Strategy:

```jsx
// src/App.js
import { lazy, Suspense } from 'react';

// ✅ Production pages - в main.js
import Home from './pages/Home';
import Products from './pages/Products';
import Articles from './pages/Articles'; // 🔄 Оновлена версія

// ⚡ Admin pages - окремий chunk (lazy loaded)
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Production routes - main.js (~800 KB) */}
        <Route path="/:lang?" element={<Home />} />
        <Route path="/:lang/products" element={<Products />} />
        <Route path="/:lang/articles" element={<Articles />} />

        {/* Admin routes - admin.js (~335 KB, lazy loaded) */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Suspense>
  );
}
```

---

## 🎨 UI/UX Дизайн

### Основні Екрани:

#### 1. **Admin Dashboard** (`/admin`)
```
┌─────────────────────────────────────────────┐
│  🏠 EuroGranite Admin                  👤 Admin │
├─────────────────────────────────────────────┤
│  📊 Dashboard                                │
│  ├── Статистика:                             │
│  │   • Всього продуктів: 12                  │
│  │   • В наявності: 10                       │
│  │   • Під замовлення: 2                     │
│  │                                           │
│  ├── Швидкі дії:                             │
│  │   [+ Додати Продукт]  [📋 Список]        │
│  │                                           │
│  └── Останні оновлення:                      │
│      • Габро 200x100x50 - оновлено 2 год     │
│      • Лабрадорит - створено вчора           │
└─────────────────────────────────────────────┘
```

#### 2. **Product List** (`/admin/products`)
```
┌─────────────────────────────────────────────┐
│  📋 Список Продуктів          [🔍 Пошук...]  │
│                         [+ Додати Продукт]   │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐    │
│  │ ID         │ Назва      │ Ціна │ Дії │    │
│  ├─────────────────────────────────────┤    │
│  │ paver-...  │ Габро      │ 1140 │ ✏️🗑️│    │
│  │ paver-...  │ Маславське │ 2250 │ ✏️🗑️│    │
│  │ ...        │ ...        │ ... │ ✏️🗑️│    │
│  └─────────────────────────────────────┘    │
│                                              │
│  Показано: 12 з 12                          │
└─────────────────────────────────────────────┘
```

#### 3. **Product Create/Edit** (`/admin/products/new` або `/admin/products/:id/edit`)
```
┌─────────────────────────────────────────────┐
│  ✏️ Редагувати Продукт                        │
├─────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │ Основна Інфо    │  │ Preview          │  │
│  │                 │  │                  │  │
│  │ ID: [........] │  │  ┌────────────┐  │  │
│  │ Texture: [v]   │  │  │ [IMAGE]    │  │  │
│  │ Finish: [v]    │  │  │            │  │  │
│  │ Size: [v]      │  │  └────────────┘  │  │
│  │                 │  │  Габро 200x...  │  │
│  │ 🖼️ Upload Image │  │  1140 грн/м²    │  │
│  │                 │  │                  │  │
│  └─────────────────┘  └──────────────────┘  │
│                                              │
│  🌐 Мультимовні Поля (UA | EN | DE | PL)    │
│  ┌───────────────────────────────────────┐  │
│  │ Назва (UA): [........................]│  │
│  │ Опис (UA):  [.....текст..............│  │
│  │ Features:   • [.....................]│  │
│  │            • [.....................]│  │
│  └───────────────────────────────────────┘  │
│                                              │
│  [❌ Скасувати]      [💾 Зберегти Продукт]  │
└─────────────────────────────────────────────┘
```

### Дизайн-Система:

#### Кольори:
```scss
// Admin Panel Colors
$admin-primary: #1e40af;      // Blue 700
$admin-secondary: #64748b;    // Slate 500
$admin-success: #16a34a;      // Green 600
$admin-danger: #dc2626;       // Red 600
$admin-warning: #ea580c;      // Orange 600
$admin-bg: #f8fafc;           // Slate 50
$admin-card: #ffffff;         // White
$admin-border: #e2e8f0;       // Slate 200
```

#### Компоненти:
- Використовувати існуючі кнопки з основного сайту (`custom-button`)
- Адаптувати стилі для admin темних тонів
- Додати нові admin-specific компоненти (таблиці, форми)

---

## 🔄 Інтеграція з Backend API

### API Endpoints (вже існують):

```javascript
// GET /api/products - Отримати всі продукти
const getAllProducts = async () => {
  const response = await axios.get('http://localhost:5000/api/products');
  return response.data; // { success: true, count: 12, data: [...] }
};

// GET /api/products/:id - Отримати продукт по ID
const getProductById = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/products/${id}`);
  return response.data; // { success: true, data: {...} }
};

// POST /api/products - Створити новий продукт
const createProduct = async (productData) => {
  const response = await axios.post('http://localhost:5000/api/products', productData);
  return response.data; // { success: true, message: "...", data: {...} }
};

// PUT /api/products/:id - Оновити продукт
const updateProduct = async (id, productData) => {
  const response = await axios.put(`http://localhost:5000/api/products/${id}`, productData);
  return response.data; // { success: true, message: "...", data: {...} }
};

// DELETE /api/products/:id - Видалити продукт
const deleteProduct = async (id) => {
  const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
  return response.data; // { success: true, message: "...", data: {...} }
};

// POST /api/upload - Завантажити зображення (потрібна реалізація)
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axios.post('http://localhost:5000/api/upload', formData);
  return response.data; // { success: true, imageUrl: "..." }
};
```

### Zustand Store для Admin:

```javascript
// stores/useAdminStore.js
import { create } from 'zustand';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/api/productsApi';

export const useAdminStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  // Завантажити всі продукти
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const data = await getAllProducts();
      set({ products: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Додати продукт
  addProduct: async (productData) => {
    set({ loading: true });
    try {
      const data = await createProduct(productData);
      set((state) => ({
        products: [...state.products, data.data],
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Оновити продукт
  updateProduct: async (id, productData) => {
    set({ loading: true });
    try {
      const data = await updateProduct(id, productData);
      set((state) => ({
        products: state.products.map(p => p.id === id ? data.data : p),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Видалити продукт
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter(p => p.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));
```

### 🆕 Articles API Endpoints (потрібно додати в backend):

```javascript
// services/api/articlesApi.js

const API_BASE = 'http://localhost:5000/api';

// GET /api/articles - Отримати всі статті
export const getAllArticles = async () => {
  const response = await axios.get(`${API_BASE}/articles`);
  return response.data; // { success: true, count: 10, data: [...] }
};

// GET /api/articles/:id - Отримати статтю по ID
export const getArticleById = async (id) => {
  const response = await axios.get(`${API_BASE}/articles/${id}`);
  return response.data; // { success: true, data: {...} }
};

// POST /api/articles - Створити нову статтю
export const createArticle = async (articleData) => {
  const response = await axios.post(`${API_BASE}/articles`, articleData);
  return response.data; // { success: true, message: "...", data: {...} }
};

// PUT /api/articles/:id - Оновити статтю
export const updateArticle = async (id, articleData) => {
  const response = await axios.put(`${API_BASE}/articles/${id}`, articleData);
  return response.data; // { success: true, message: "...", data: {...} }
};

// DELETE /api/articles/:id - Видалити статтю
export const deleteArticle = async (id) => {
  const response = await axios.delete(`${API_BASE}/articles/${id}`);
  return response.data; // { success: true, message: "...", data: {...} }
};
```

### 🆕 Zustand Store для Articles:

```javascript
// stores/useArticlesStore.js
import { create } from 'zustand';
import { getAllArticles, createArticle, updateArticle, deleteArticle } from '../services/api/articlesApi';

export const useArticlesStore = create((set) => ({
  articles: [],
  loading: false,
  error: null,

  // Завантажити всі статті
  fetchArticles: async () => {
    set({ loading: true });
    try {
      const data = await getAllArticles();
      set({ articles: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Додати статтю
  addArticle: async (articleData) => {
    set({ loading: true });
    try {
      const data = await createArticle(articleData);
      set((state) => ({
        articles: [...state.articles, data.data],
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Оновити статтю
  updateArticle: async (id, articleData) => {
    set({ loading: true });
    try {
      const data = await updateArticle(id, articleData);
      set((state) => ({
        articles: state.articles.map(a => a.id === id ? data.data : a),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Видалити статтю
  deleteArticle: async (id) => {
    set({ loading: true });
    try {
      await deleteArticle(id);
      set((state) => ({
        articles: state.articles.filter(a => a.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));
```

### 🆕 Структура Даних для Статей:

```javascript
// Приклад article object:
{
  "id": "article-1696847123456",
  "title": {
    "ua": "Догляд за гранітом: Повний посібник",
    "en": "Granite Care: Complete Guide",
    "de": "Granitpflege: Vollständiger Leitfaden",
    "pl": "Pielęgnacja granitu: Kompletny przewodnik"
  },
  "excerpt": {
    "ua": "Короткий опис статті українською...",
    "en": "Short description in English...",
    "de": "Kurze Beschreibung auf Deutsch...",
    "pl": "Krótki opis po polsku..."
  },
  "content": {
    "ua": "<p>Повний контент статті HTML...</p>",
    "en": "<p>Full article content HTML...</p>",
    "de": "<p>Vollständiger Artikel HTML...</p>",
    "pl": "<p>Pełna treść artykułu HTML...</p>"
  },
  "image": "/images/articles/granite-care.jpg",
  "seo": {
    "metaTitle": { "ua": "...", "en": "...", "de": "...", "pl": "..." },
    "metaDescription": { "ua": "...", "en": "...", "de": "...", "pl": "..." },
    "keywords": ["granite", "care", "maintenance", "cleaning"]
  },
  "author": "Admin",
  "status": "published", // or "draft"
  "publishedAt": "2025-10-03T12:00:00.000Z",
  "createdAt": "2025-10-03T10:00:00.000Z",
  "updatedAt": "2025-10-03T11:00:00.000Z"
}
```

### 🆕 Backend Changes Required (project_eurogranite_admin):

```javascript
// server.js - додати articles endpoints

// Articles CRUD
app.get('/api/articles', getAllArticles);
app.get('/api/articles/:id', getArticleById);
app.post('/api/articles', createArticle);
app.put('/api/articles/:id', updateArticle);
app.delete('/api/articles/:id', deleteArticle);

// Створити data/articles.json
{
  "articles": []
}
```

---

## 🔐 Автентифікація (Phase 2)

### Планована Реалізація JWT:

1. **Backend Changes** (в project_eurogranite_admin):
   - Додати JWT токени
   - POST /api/auth/login - Login endpoint
   - POST /api/auth/logout - Logout endpoint
   - Middleware для перевірки токенів

2. **Frontend Changes**:
   - Login сторінка (`/admin/login`)
   - Protected routes для admin
   - Зберігання токену в localStorage
   - Auto-logout при закінченні токену

3. **Security Best Practices**:
   - HttpOnly cookies для токенів
   - CSRF захист
   - Rate limiting на login endpoint

---

## 📸 File Upload Implementation

### Backend (Multer - вже є залежність):

```javascript
// server.js - додати multer configuration
const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter (тільки зображення)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  res.json({
    success: true,
    imageUrl: `/uploads/products/${req.file.filename}`,
    filename: req.file.filename
  });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));
```

### Frontend (React):

```jsx
// components/admin/ProductForm/ImageUploadField.jsx
import { useState } from 'react';

const ImageUploadField = ({ currentImage, onImageChange }) => {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await uploadImage(formData);
      onImageChange(response.imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload-field">
      {preview && <img src={preview} alt="Preview" />}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <span>Завантаження...</span>}
    </div>
  );
};
```

---

## ✅ Етапи Розробки (Roadmap)

### **Phase 1: Базовий Функціонал** (1-2 тижні)

#### Week 1: Infrastructure & Product List ✅ ЗАВЕРШЕНО
- [x] **Day 1-2: Підготовка**
  - [x] Створити план розробки (цей документ)
  - [x] Встановити нові залежності (axios встановлено, react-hook-form - pending)
  - [x] Створити структуру папок
  - [x] Налаштувати API клієнт (productsApi.js)

- [x] **Day 3-4: Admin Layout & Navigation**
  - [x] Створити AdminLayout component
  - [x] Створити AdminSidebar з навігацією (вбудовано в AdminLayout)
  - [x] Створити AdminHeader (вбудовано в AdminLayout)
  - [x] Налаштувати React Router routes для admin (nested routing з Outlet)

- [x] **Day 5-7: Product List**
  - [x] Створити ProductTable component (вбудовано в ProductsManager)
  - [x] Створити Zustand store (useProductsStore)
  - [x] Інтегрувати API для GET /api/products
  - [x] Додати пошук та фільтрацію (базова функціональність)
  - [x] Додати delete функціонал (з підтвердженням)

#### Week 2: Product Create/Edit ✅ ЗАВЕРШЕНО (5.10.2025)
- [x] **Day 8-10: Product Form** ✅ ЗАВЕРШЕНО (4.10.2025)
  - [x] Створити ProductForm component (435 рядків)
  - [x] Додати всі основні поля форми:
    - [x] Basic Info: ID, textureId, finishType, size
    - [x] Dimensions: length, width, height (mm)
    - [x] Price: 4 мови (UA, EN, DE, PL)
    - [x] Name: 4 мови
    - [x] Description: 4 мови (textarea)
    - [x] Status: inStock, customizable
    - [x] Features: масив для 4 мов (додано 4.10.2025)
  - [x] Додано routing: `/admin/products/new`, `/admin/products/:id/edit`
  - [x] Інтегровано API для POST та PUT через useProductsStore
  - [x] Додано unsaved changes warning
  - [x] Додано автоматичну логіку для sawnSides (6 - splitSides)
  - [x] Виправлено parsePrice() - запобігання дублюванню валют
  - [ ] Розбити форму на підкомпоненти (BasicInfo, Dimensions, Price, Multilingual) - ⏳ Опціонально
  - [ ] Додати валідацію форми з react-hook-form - ⏳ Опціонально

- [x] **Day 11-12: Image Upload** ✅ ЗАВЕРШЕНО (5.10.2025)
  - [x] Реалізувати multer на backend (storage + validation)
  - [x] Створити ImageUploadField component
  - [x] Додати preview зображень (drag-and-drop + buttons)
  - [x] Тестування upload (всі тести пройдено)
  - [x] Виправлено preview sync в edit mode (useEffect)
  - [x] Виправлено відображення на production сторінках (backend URL)
  - [x] Додано progress bar під час upload

- [x] **Day 13-14: Testing & Bug Fixes** ✅ ЗАВЕРШЕНО
  - [x] Основне тестування CRUD операцій
  - [x] Виправлення routing bugs (admin routes conflict)
  - [x] Виправлення image handling (placeholder + path conversion)
  - [x] Виправлення price duplication bug (parsePrice regex)
  - [x] Виправлення table horizontal scroll на мобільних
  - [x] Cleanup duplicated prices в базі (fix-prices.js script)
  - [x] End-to-end тестування всіх функцій (automated + manual checklist)
  - [x] Bundle size перевірка (407 KB ✅ < 850 KB)
  - [x] ESLint warnings виправлено (0 warnings)
  - [x] Створено test artifacts (PHASE1_TEST_CHECKLIST.md, PHASE1_TEST_RESULTS.md)
  - [ ] Покращення UX/UI (опціонально для Phase 3)

### **Phase 1.5: Articles Management** 🆕 (1 тиждень)

#### Backend Preparation (1 день):
- [ ] **Backend Articles API**
  - [ ] Створити `data/articles.json`
  - [ ] Додати 5 CRUD endpoints в server.js
  - [ ] Реалізувати backup для articles
  - [ ] Тестування API endpoints

#### Frontend Production (2 дні):
- [ ] **Production Articles Page**
  - [ ] Створити shared/articles/ArticleCard.jsx (CSS Modules)
  - [ ] Створити shared/articles/ArticleGrid.jsx
  - [ ] Створити useArticlesStore.js
  - [ ] Оновити pages/Articles.jsx (замість "Coming soon")
  - [ ] Інтегрувати API для читання статей
  - [ ] Тестування на production pages

#### Admin Articles Manager (3-4 дні):
- [ ] **Articles CRUD**
  - [ ] Створити admin/articles/ArticlesTable.jsx
  - [ ] Створити admin/articles/ArticleForm.jsx
  - [ ] Додати Rich Text Editor (Draft.js або простий textarea для MVP)
  - [ ] Створити admin/articles/SEOFields.jsx
  - [ ] ArticlePreview (використовує shared/ArticleCard)
  - [ ] Інтегрувати API для CRUD операцій

- [ ] **Testing & Optimization**
  - [ ] Тестування всіх CRUD для статей
  - [ ] Перевірка що ArticleCard не дублюється в bundles
  - [ ] Bundle size validation (main.js < 850 KB)
  - [ ] E2E тести: створення → публікація → відображення

### **Phase 2: Автентифікація та Безпека** (1 тиждень)

- [ ] **Day 15-16: JWT Backend**
  - [ ] Додати JWT authentication в backend
  - [ ] Створити /api/auth/login endpoint
  - [ ] Додати middleware для захисту routes

- [ ] **Day 17-18: Auth Frontend**
  - [ ] Створити AdminLogin сторінку
  - [ ] Створити useAuthStore
  - [ ] Додати Protected Routes
  - [ ] Auto-logout при закінченні токену

- [ ] **Day 19-21: Security & Testing**
  - [ ] CORS hardening
  - [ ] Rate limiting
  - [ ] Security testing
  - [ ] Documentation update

### **Phase 3: Покращення та Оптимізація** (1 тиждень)

- [ ] **Advanced Features:**
  - [ ] Bulk operations (масове видалення)
  - [ ] Export/Import products (CSV/JSON)
  - [ ] Product duplication
  - [ ] Version history (rollback changes)

- [ ] **UX Improvements:**
  - [ ] Toast notifications
  - [ ] Keyboard shortcuts
  - [ ] Drag & drop for image upload
  - [ ] Auto-save drafts

- [ ] **Performance:**
  - [ ] Lazy loading components
  - [ ] Pagination для великої кількості продуктів
  - [ ] Image optimization
  - [ ] Caching strategies

---

## 🧪 Тестування

### Manual Testing Checklist:

#### Product List:
- [ ] Відображення всіх продуктів
- [ ] Пошук по назві/ID працює
- [ ] Кнопка "Додати Продукт" відкриває форму
- [ ] Кнопки "Редагувати" та "Видалити" працюють
- [ ] Підтвердження перед видаленням

#### Product Create:
- [ ] Всі поля форми працюють
- [ ] Валідація обов'язкових полів
- [ ] Мультимовні поля для 4 мов
- [ ] Upload зображення працює
- [ ] Preview оновлюється в реальному часі
- [ ] Збереження створює новий продукт
- [ ] Редірект після створення

#### Product Edit:
- [ ] Форма завантажується з даними продукту
- [ ] Всі поля можна редагувати
- [ ] Зміни зберігаються коректно
- [ ] Cancel повертає на список без змін

#### Image Upload:
- [ ] Upload зображення працює
- [ ] Preview показує нове зображення
- [ ] Валідація типу файлу (тільки зображення)
- [ ] Валідація розміру файлу (max 5MB)
- [ ] Handling помилок upload

### Automated Testing (опціонально):
```javascript
// tests/admin/ProductForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../components/admin/ProductForm/ProductForm';

test('renders product form with all fields', () => {
  render(<ProductForm />);
  expect(screen.getByLabelText(/ID/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Texture/i)).toBeInTheDocument();
  // ... інші поля
});

test('validates required fields', async () => {
  render(<ProductForm />);
  fireEvent.click(screen.getByText(/Зберегти/i));
  expect(await screen.findByText(/ID is required/i)).toBeInTheDocument();
});
```

---

## 📦 Нові Залежності

### Додати в package.json:

```json
{
  "dependencies": {
    "axios": "^1.6.2",           // HTTP client для API calls (30 KB)
    "react-hook-form": "^7.49.2", // Управління формами з валідацією (25 KB)
    "draft-js": "^0.11.7"        // 🆕 Rich Text Editor для статей (Phase 1.5) (~100 KB)
  }
}
```

**Примітка про Draft.js:**
- Альтернативи: Slate, Quill, TinyMCE
- Draft.js обрано за: React-friendly, lightweight (~100 KB), офіційна підтримка Facebook
- Для MVP можна почати з простого `<textarea>` і додати Draft.js пізніше

### Установка:

**Phase 1 (Products):**
```bash
cd "D:\Нове підприємство\Eurogranite\Сайт\project_eurogranite"
npm install axios react-hook-form
```

**Phase 1.5 (Articles):**
```bash
npm install draft-js
# Або для MVP без Rich Editor: пропустити цей крок
```

---

## 🚀 Деплой

### Development (локально):
```bash
# Terminal 1 - Backend
cd project_eurogranite_admin
npm run dev        # Nodemon на http://localhost:5000

# Terminal 2 - Frontend
cd project_eurogranite
npm start          # React на http://localhost:3000
```

### Production:
```bash
# Frontend build
cd project_eurogranite
npm run build

# Deploy до Hostinger
# (Admin panel доступний тільки з захищеним паролем - Phase 2)
```

### Backend Deployment (майбутнє):
- **Опція 1:** Hostinger VPS (окремий сервер для API)
- **Опція 2:** Railway.app / Render.com (безкоштовні tier)
- **Опція 3:** Vercel Serverless Functions

---

## 🔒 Безпека

### Immediate (Phase 1):
- ✅ Gitignore для .env та sensitive data
- ✅ CORS тільки для localhost:3000
- ⚠️ **WARNING:** API відкритий без автентифікації

### After Phase 2:
- ✅ JWT токени для автентифікації
- ✅ Protected routes на backend
- ✅ HttpOnly cookies
- ✅ Rate limiting
- ✅ Input sanitization

---

## 📊 Очікувані Результати

### Після Phase 1:
- ✅ Повнофункціональний CRUD для продуктів
- ✅ Зручний UI для управління каталогом
- ✅ Upload зображень
- ✅ Мультимовність (4 мови)
- ✅ Автоматичний backup при змінах
- ⚠️ Доступний тільки локально

### Після Phase 2:
- ✅ Захищений доступ з логін/паролем
- ✅ JWT автентифікація
- ✅ Можливість розмістити на production

### Після Phase 3:
- ✅ Advanced features (export, bulk operations)
- ✅ Оптимізована performance
- ✅ Відмінний UX

---

## 💡 Рекомендації

### Для Розробки:
1. **Починати з Phase 1** - спочатку CRUD, потім security
2. **Використовувати існуючі компоненти** з основного сайту (кнопки, інпути)
3. **Тестувати кожен feature окремо** перед переходом до наступного
4. **Документувати всі зміни** в цьому файлі

### Для UX:
1. **Зручність важливіша за красу** - UI має бути простим і швидким
2. **Валідація в реальному часі** - показувати помилки відразу
3. **Підтвердження для критичних дій** - особливо для delete
4. **Preview перед збереженням** - показувати як продукт виглядатиме на сайті

### Для Безпеки:
1. **Phase 1 - тільки локально** - не давати доступ до незахищеного API
2. **Phase 2 - обов'язково JWT** перед production deploy
3. **Регулярні backup** - перед кожним релізом

---

## 📊 Bundle Size Analysis (з Articles)

### Production Bundle (для звичайних користувачів):

```
ПОТОЧНИЙ СТАН (v1.3.5):
main.js = 730 KB

ПІСЛЯ PHASE 1 (Products Admin):
main.js = 730 KB + 50 KB (runtime) = 780 KB
admin.js (lazy) = ~280 KB (завантажується тільки в /admin)

ПІСЛЯ PHASE 1.5 (Articles):
main.js = 780 KB + 70 KB (Articles production) = 850 KB ✅
admin.js (lazy) = ~335 KB (Products + Articles admin)

ЗАГАЛЬНИЙ ЛІМІТ: < 900 KB для main.js
```

### Деталізація Bundle Size:

```javascript
┌─────────────────────────────────────────────────────┐
│ PRODUCTION BUNDLE (main.js)                         │
├─────────────────────────────────────────────────────┤
│ Поточний код (v1.3.5)............... 730 KB ✅      │
│ Runtime (code splitting)............. +50 KB        │
│ Articles (shared components):                       │
│   ├── ArticleCard.jsx................ +5 KB         │
│   ├── ArticleGrid.jsx................ +3 KB         │
│   ├── Articles page.................. +8 KB         │
│   └── useArticlesStore............... +4 KB         │
│ Dependencies:                                       │
│   ├── axios (main chunk)............. +30 KB        │
│   └── react-hook-form (tree-shaked).. +20 KB        │
│                                                     │
│ TOTAL: ~850 KB                              ✅      │
│ LIMIT: 900 KB                                       │
│ STATUS: ✅ В межах ліміту (+16% від поточного)     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ ADMIN BUNDLE (admin.js - lazy loaded)               │
├─────────────────────────────────────────────────────┤
│ Products Manager:                                   │
│   ├── ProductTable..................... 40 KB       │
│   ├── ProductForm...................... 60 KB       │
│   └── Components....................... 30 KB       │
│ Articles Manager: 🆕                                │
│   ├── ArticlesTable.................... 30 KB       │
│   ├── ArticleForm...................... 40 KB       │
│   ├── ArticleEditor (Draft.js)........ 100 KB      │
│   └── SEOFields........................ 10 KB       │
│ Admin Layout & Common................ 40 KB       │
│ Dependencies (shared with main)...... 25 KB       │
│                                                     │
│ TOTAL: ~335 KB                              ✅      │
│ NOTE: Завантажується ТІЛЬКИ при /admin             │
└─────────────────────────────────────────────────────┘
```

### Shared Components Strategy (уникнення дублювання):

```jsx
// ArticleCard існує в main.js і reused в admin.js
// Webpack автоматично не дублює код!

Bundle Sizes:
├── main.js (850 KB)
│   └── ArticleCard.jsx (5 KB) ✅ ОДНА КОПІЯ
│
└── admin.js (335 KB)
    └── import ArticleCard from main.js ✅ REUSED

✅ Економія: ~5 KB (уникнено дублювання)
```

### Performance Impact:

```
Користувач відвідує сайт:
├── Завантажує main.js (850 KB) ← 120 KB більше (14%)
└── Час завантаження: +0.3-0.5 сек (на 3G)

Користувач НЕ відвідує /admin:
└── admin.js (335 KB) НЕ завантажується ✅

Адміністратор заходить в /admin:
├── Завантажує main.js (850 KB)
└── Завантажує admin.js (335 KB) ← тільки при /admin
    TOTAL: 1185 KB для admin користувача
```

### Оптимізація Рекомендації:

**✅ Виконано:**
1. Code Splitting (React.lazy) для admin routes
2. Shared components для ArticleCard (не дублюється)
3. CSS Modules (уникнено глобальних конфліктів)
4. Tree-shaking для залежностей

**🔜 Можливо в майбутньому:**
1. WebP для OG-image та інших зображень
2. Compression (gzip/brotli) на Hostinger
3. Route-based code splitting для інших сторінок
4. CDN для static assets

---

## 📞 Підтримка та Ресурси

### Документація:
- **Цей Plan:** `docs/ADMIN_UI_DEVELOPMENT_PLAN.md`
- **Backend API:** `project_eurogranite_admin/README.md`
- **Admin Separation:** `docs/ADMIN_PANEL_SEPARATION.md`

### API Endpoints:
- **Base URL:** http://localhost:5000
- **Health:** GET /health
- **Products:** GET/POST/PUT/DELETE /api/products ✅
- **Articles:** GET/POST/PUT/DELETE /api/articles 🆕 (Phase 1.5)
- **Upload:** POST /api/upload

### Корисні Посилання:
- **React Hook Form:** https://react-hook-form.com/
- **Axios:** https://axios-http.com/
- **Zustand:** https://zustand-demo.pmnd.rs/
- **Multer:** https://github.com/expressjs/multer
- **Draft.js:** https://draftjs.org/ 🆕 (Rich Text Editor)
- **React.lazy():** https://react.dev/reference/react/lazy (Code Splitting)

---

## 🎯 Готовність до Старту

### Checklist Перед Початком:

#### Інфраструктура:
- [x] Backend API працює (http://localhost:5000) ✅
- [x] Структура backend готова ✅
- [x] products.json доступний ✅
- [ ] Нові залежності встановлені (axios, react-hook-form)

#### Планування:
- [x] План розробки створений ✅
- [x] Структура файлів визначена ✅
- [x] UI wireframes готові ✅
- [x] API integration зрозумілий ✅

#### Середовище:
- [x] Git репозиторії налаштовані ✅
- [x] Development environment працює ✅
- [ ] Створити нову гілку `feature/admin-ui`

---

**Готовий до розробки:** ✅ ТАК
**Наступний крок:** Установка залежностей та створення базової структури

---

**Створено:** 3 жовтня 2025
**Останнє оновлення:** 5 жовтня 2025 (Phase 1 Testing Completed)
**Версія:** 1.3.0
**Статус:** ✅ Phase 1 Week 2 COMPLETED - Automated Testing PASSED

### Що додано в v1.3.0 (5.10.2025):
- ✅ **Phase 1 Week 2 COMPLETED** - всі тести пройдено
- ✅ **Features Field** - динамічний масив для 4 мов (Day 8-10 завершено)
- ✅ **Image Upload System** - повна end-to-end реалізація:
  - ✅ Multer backend (storage, validation, 5MB limit)
  - ✅ ImageUploadField component (drag-and-drop + buttons)
  - ✅ Preview sync у всіх режимах (upload, edit, production)
  - ✅ Progress bar під час завантаження
  - ✅ Backend URL handling для uploaded files
- ✅ **Bug Fixes:**
  - ✅ Price duplication bug (parsePrice regex)
  - ✅ Table horizontal scroll на мобільних
  - ✅ Image preview в edit mode (useEffect sync)
  - ✅ Production image display (backend URL pattern)
  - ✅ ESLint warning в ImageUploadField (useEffect dependencies)
- ✅ **Testing & Quality Assurance:**
  - ✅ Bundle size: 407 KB (52% нижче ліміту 850 KB) ✅
  - ✅ Code splitting: Admin chunks lazy loaded окремо
  - ✅ ESLint: 0 warnings, 0 errors
  - ✅ Build: Clean production build
  - ✅ Test artifacts: PHASE1_TEST_CHECKLIST.md, PHASE1_TEST_RESULTS.md
- ✅ **Data Cleanup:**
  - ✅ fix-prices.js script (очистка дублікатів валют)
  - ✅ 4 продукти виправлено в базі
- 📊 Backend працює стабільно (http://localhost:5000)
- 📊 17 продуктів в базі даних

### Що додано в v1.2.0 (4.10.2025):
- ✅ **ProductForm Component** - повна функціональність create/edit (435 рядків)
- ✅ **Nested Routing** - правильна інтеграція React Router v6 з Outlet
- ✅ **Dashboard Component** - головна сторінка admin панелі
- ✅ **API Integration** - real-time sync між admin та production
- ✅ **Image Handling** - placeholder + path conversion для dev/production
- ✅ **Navigation Fixes** - вирішено конфлікт admin routes з localized routes
- ✅ **Unsaved Changes** - попередження при виході з форми
- 📊 Backend працює стабільно (http://localhost:5000)
- 📊 12 продуктів в базі даних (JSON)

### Що додано в v1.1.0 (3.10.2025):
- 🆕 Articles Management (Phase 1.5 - планується)
- 🆕 Shared Components Strategy (ArticleCard)
- 🆕 Articles API Endpoints (5 endpoints - планується)
- 🆕 useArticlesStore (Zustand - планується)
- 🆕 Rich Text Editor (Draft.js - планується)
- 🆕 Bundle Size Analysis з Articles
- 🆕 Code Splitting Strategy детальніше
- 📊 Оновлено Bundle Size: 850 KB (+16% від поточного)
