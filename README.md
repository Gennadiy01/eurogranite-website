# EuroGranite - Premium Ukrainian Granite Website

Modern multilingual website showcasing premium granite products from Ukrainian quarries.

**Live Site:** 🌐 https://eg.yalivets.top
**Tech Stack:** React 18 + React Router + Zustand
**Languages:** 🇺🇦 Ukrainian | 🇬🇧 English | 🇩🇪 German | 🇵🇱 Polish

---

## 🎯 Project Overview

EuroGranite is a professional showcase website for a granite products manufacturer. The site features:

- **Product Catalog** - 12 granite varieties with detailed specifications
- **Texture Gallery** - Interactive viewer with 50+ texture samples
- **Multilingual Support** - Full content in 4 languages
- **SEO Optimized** - Static HTML generation + React SPA
- **Responsive Design** - Mobile-first approach with Atomic Design

---

## 🏗️ Project Structure

```
project_eurogranite/               # Main Website (Frontend)
├── src/
│   ├── components/
│   │   ├── atoms/                # Basic components (Button, Icon, etc.)
│   │   ├── molecules/            # Composite components
│   │   └── organisms/            # Complex sections
│   ├── pages/                    # Page components
│   ├── stores/                   # Zustand state management
│   ├── constants/                # Product data, translations
│   └── utils/                    # Helper functions
├── public/                       # Static assets
├── docs/                         # Documentation
└── build/                        # Production build
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/Gennadiy01/eurogranite-website.git
cd eurogranite-website

# Install dependencies
npm install

# Start development server
npm start
```

Development server will run on `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Output will be in /build directory
```

---

## 📦 Related Projects

This project is part of the EuroGranite ecosystem:

### 🔧 Admin Panel Backend
**Repository:** [eurogranite-admin-panel](https://github.com/Gennadiy01/eurogranite-admin-panel)
**Purpose:** Backend API for managing product data
**Tech:** Express.js + Node.js + PostgreSQL
**Location:** `../project_eurogranite_admin/`

**🌐 Production API:**
- **Backend:** https://eurogranite-admin-panel-production.up.railway.app
- **Products API:** https://eurogranite-admin-panel-production.up.railway.app/api/products
- **Health Check:** https://eurogranite-admin-panel-production.up.railway.app/health

The admin panel provides:
- REST API for CRUD operations on products
- PostgreSQL database on Railway
- JWT authentication
- Image upload functionality
- CORS-enabled for frontend integration

---

## 🌐 Features

### Multilingual Support
- 🇺🇦 Ukrainian (default)
- 🇬🇧 English
- 🇩🇪 German
- 🇵🇱 Polish

Language switching preserves current page and user preferences.

### Product Catalog
- **12 granite varieties** from Ukrainian quarries
- Detailed specifications (dimensions, prices, features)
- Multiple finish types (polished, thermal, sawn, split)
- High-quality product images

### Texture Gallery
- **50+ texture samples** organized by type
- Interactive viewer with zoom functionality
- Filterable by granite type and color
- Responsive grid layout

### SEO Optimization
- Static HTML generation for each page
- Structured data (Schema.org JSON-LD)
- OpenGraph and Twitter Card meta tags
- Multilingual hreflang tags
- Sitemap.xml with all language versions

---

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - UI library
- **React Router v6** - Client-side routing
- **Zustand 4.4.1** - State management
- **SCSS** - Styling with variables
- **React Helmet** - SEO meta tags management

### Build & Deploy
- **Create React App** - Build tooling
- **GitHub Actions** - CI/CD pipeline
- **Hostinger** - Production hosting

### Design System
- **Atomic Design** - Component architecture
- **Mobile-first** - Responsive breakpoints
- **Accessibility** - WCAG 2.1 compliant

---

## 📖 Documentation

Comprehensive documentation is available in the `/docs` directory:

### Main Documents
- **[Поточний_стан_проекту.md](docs/Поточний_стан_проекту.md)** - Development history (30 sessions)
- **[Структура_проекту.md](docs/Структура_проекту.md)** - Detailed project structure
- **[Design_System_Actual.md](docs/Design_System_Actual.md)** - Design system guidelines
- **[Правила_розробки_проекту.md](docs/Правила_розробки_проекту.md)** - Development rules

### Deployment
- **[HOSTINGER_DEPLOYMENT_STATUS.md](docs/HOSTINGER_DEPLOYMENT_STATUS.md)** - Deployment guide
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Step-by-step deployment
- **[Система_контролю_версій_та_деплою.md](docs/Система_контролю_версій_та_деплою.md)** - Git workflow

### Archived Plans
Completed development plans are archived in `/docs/archive/completed-plans/`:
- SEO Optimization Plan ✅
- Static HTML Migration Plan ✅
- Bundle Analysis ✅
- Image Optimization Plan ✅

---

## 🔧 Development

### Available Scripts

```bash
npm start          # Start development server (port 3000)
npm run dev        # Start dev server on custom port (3005)
npm run build      # Create production build
npm test           # Run tests
```

### Environment Variables

Create `.env` file in the root directory:

```env
# Site URL (for SEO and canonical URLs)
SITE_URL=https://eg.yalivets.top

# Backend API URL (Railway)
REACT_APP_API_URL=https://eurogranite-admin-panel-production.up.railway.app/api

# Image optimization (optional)
GENERATE_SOURCEMAP=false
```

---

## 🎨 Design System

### Color Palette
- **Primary:** #c2410c (Orange - brand color)
- **Secondary:** #1a1a1a (Nearly black - headings)
- **Neutral:** #404040, #737373, #a3a3a3 (Text hierarchy)
- **Background:** #f8f8f8, #ffffff (Light grays)

### Typography
- **Headings:** System fonts stack
- **Body:** 16px base, 1.6 line-height
- **Hierarchy:** hero-title → heading-2 → heading-3 → body-text

### Components
Atomic Design structure:
- **Atoms:** Button, Input, Icon, Badge
- **Molecules:** ProductCard, LanguageSwitcher, Breadcrumbs
- **Organisms:** Header, Hero, ProductGrid, Footer

---

## 📄 License

Copyright © 2025 EuroGranite. All rights reserved.

This is a commercial project for EuroGranite company.

---

## 📞 Contact & Support

**Project Documentation:** `/docs` directory
**Admin Panel:** [eurogranite-admin-panel](https://github.com/Gennadiy01/eurogranite-admin-panel)
**Issues:** Report via GitHub Issues

---

**Created:** August 2025
**Last Updated:** October 2, 2025
**Version:** 1.1.0
**Status:** 🟢 LIVE - Deployed on Hostinger
