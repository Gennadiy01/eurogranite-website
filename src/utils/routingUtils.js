/**
 * Централізована система для роботи з маршрутизацією
 */

import { getLanguageFromPath } from './languageUtils'
import { BASE_URL } from './urlUtils'

/**
 * Нормалізує шлях, видаляючи зайві слеші та пробіли
 */
export const normalizePath = (path) => {
  if (!path || typeof path !== 'string') {
    return '/'
  }

  return path
    .trim()                    // Видаляємо пробіли з країв
    .replace(/\/+/g, '/')      // Замінюємо множинні слеші одним
    .replace(/\/$/, '') || '/' // Видаляємо кінцевий слеш (крім кореня)
}

/**
 * Отримує поточний шлях з pathname (статичні маршрути)
 */
export const getCurrentPath = () => {
  if (typeof window === 'undefined') {
    return '/'
  }

  // Для продакшн завжди використовуємо pathname (статичні маршрути)
  return normalizePath(window.location.pathname)
}

/**
 * Парсить шлях і витягує мову та сторінку
 */
export const parseRoute = (path) => {
  const normalizedPath = normalizePath(path)

  // Видаляємо базовий шлях
  const withoutBasePath = normalizedPath.replace(BASE_URL, '') || '/'

  // Визначаємо мову
  const language = getLanguageFromPath(normalizedPath)

  // Видаляємо префікс мови для отримання сторінки
  const pageWithSlash = withoutBasePath.replace(/^\/(ua|en|de|pl)/, '') || '/'

  // Очищуємо сторінку від слешів
  const page = pageWithSlash.replace(/^\//, '').replace(/\/$/, '')

  return {
    language,
    page,
    route: normalizedPath
  }
}

/**
 * Валідні сторінки
 */
export const VALID_PAGES = ['', 'products', 'about', 'gallery', 'articles', 'contact', 'admin/upload']

/**
 * Перевіряє чи є сторінка валідною
 */
export const isValidPage = (page) => {
  return VALID_PAGES.includes(page)
}

/**
 * Тестова функція для перевірки парсингу різних URL
 */
export const testRouteParsing = () => {
  const testCases = [
    // Базові випадки
    '/eurogranite-website/',
    '/eurogranite-website/products/',
    '/eurogranite-website/ua/products/',
    '/eurogranite-website/de/gallery/',
    '/eurogranite-website/pl/about/',

    // Проблемні випадки
    '/eurogranite-website/de/gallery//',
    '/eurogranite-website//products/',
    '/eurogranite-website/ua//about//',

    // Край випадки
    '',
    '/',
    '/products',
    '/ua/products',
    '/de/gallery',

    // Hash роутинг
    '#/eurogranite-website/products/',
    '#/ua/products/',
  ]

  console.log('=== ТЕСТ ПАРСИНГУ МАРШРУТІВ ===')
  testCases.forEach(testPath => {
    const result = parseRoute(testPath)
    console.log(`"${testPath}" -> language: "${result.language}", page: "${result.page}", valid: ${isValidPage(result.page)}`)
  })
  console.log('=== КІНЕЦЬ ТЕСТУ ===')

  return testCases.map(path => ({ path, ...parseRoute(path) }))
}