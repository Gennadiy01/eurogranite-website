// Mock data for tests

export const mockGalleryData = [
  {
    id: 'test-01',
    publicId: 'test-image-01',
    alt: 'Test Image 1',
    category: 'test'
  },
  {
    id: 'test-02',
    publicId: 'test-image-02',
    alt: 'Test Image 2',
    category: 'test'
  }
]

export const mockProducts = [
  {
    id: 'granite-001',
    name: 'Test Granite',
    category: 'granite',
    description: 'Test granite description',
    image: 'test-granite-image'
  },
  {
    id: 'marble-001',
    name: 'Test Marble',
    category: 'marble',
    description: 'Test marble description',
    image: 'test-marble-image'
  }
]

export const mockArticles = [
  {
    id: 'article-001',
    title: 'Test Article',
    slug: 'test-article',
    excerpt: 'Test article excerpt',
    content: 'Test article content',
    publishedAt: '2024-01-01',
    author: 'Test Author'
  }
]

export const mockLanguageData = {
  ua: {
    common: {
      loading: 'Завантаження...',
      error: 'Помилка',
      retry: 'Спробувати знову'
    },
    navigation: {
      home: 'Головна',
      products: 'Продукція',
      about: 'Про нас',
      contact: 'Контакти',
      gallery: 'Галерея'
    }
  },
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Try Again'
    },
    navigation: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      gallery: 'Gallery'
    }
  }
}

export const mockCloudinaryConfig = {
  cloudName: 'test-cloud',
  apiKey: 'test-key',
  apiSecret: 'test-secret'
}

export const mockFormData = {
  contact: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+380123456789',
    message: 'Test message content'
  },
  newsletter: {
    email: 'newsletter@example.com'
  }
}

export const mockApiResponses = {
  success: {
    status: 'success',
    message: 'Operation completed successfully'
  },
  error: {
    status: 'error',
    message: 'Operation failed',
    code: 'GENERIC_ERROR'
  },
  validation: {
    status: 'error',
    message: 'Validation failed',
    errors: {
      email: 'Invalid email format',
      phone: 'Invalid phone number'
    }
  }
}