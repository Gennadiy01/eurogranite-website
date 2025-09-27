import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAdminArticlesStore = create(
  persist(
    (set, get) => ({
      // Стан статей
      articles: [],
      currentArticle: null,
      isLoading: false,
      error: null,

      // Фільтрація та пошук
      searchQuery: '',
      currentCategory: 'all',
      sortBy: 'newest',

      // Модальні вікна
      isEditModalOpen: false,
      isCreateModalOpen: false,

      // Статистика
      statistics: {
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        recentArticles: 0,
        articlesByCategory: {}
      },

      // Категорії статей
      categories: [
        { id: 'granite', name: { ua: 'Граніт', en: 'Granite', de: 'Granit', pl: 'Granit' } },
        { id: 'marble', name: { ua: 'Мармур', en: 'Marble', de: 'Marmor', pl: 'Marmur' } },
        { id: 'quartz', name: { ua: 'Кварц', en: 'Quartz', de: 'Quarz', pl: 'Kwarc' } },
        { id: 'care', name: { ua: 'Догляд', en: 'Care', de: 'Pflege', pl: 'Pielęgnacja' } },
        { id: 'design', name: { ua: 'Дизайн', en: 'Design', de: 'Design', pl: 'Projekt' } },
        { id: 'news', name: { ua: 'Новини', en: 'News', de: 'Nachrichten', pl: 'Aktualności' } }
      ],

      // Завантаження статей
      loadArticles: async () => {
        set({ isLoading: true, error: null })

        try {
          // Симулюємо API запит - в реальному проекті тут буде запит до сервера
          await new Promise(resolve => setTimeout(resolve, 1000))

          const mockArticles = [
            {
              id: 1,
              title: {
                ua: 'Як доглядати за гранітними поверхнями',
                en: 'How to care for granite surfaces',
                de: 'Wie man Granitoberflächen pflegt',
                pl: 'Jak dbać o powierzchnie granitowe'
              },
              content: {
                ua: 'Граніт - це міцний природний камінь, який потребує правильного догляду...',
                en: 'Granite is a durable natural stone that requires proper care...',
                de: 'Granit ist ein haltbarer Naturstein, der richtige Pflege benötigt...',
                pl: 'Granit to trwały kamień naturalny, który wymaga odpowiedniej pielęgnacji...'
              },
              excerpt: {
                ua: 'Основні поради щодо догляду за гранітними поверхнями у вашому домі',
                en: 'Essential tips for caring for granite surfaces in your home',
                de: 'Grundlegende Tipps zur Pflege von Granitoberflächen in Ihrem Zuhause',
                pl: 'Podstawowe wskazówki dotyczące pielęgnacji powierzchni granitowych w domu'
              },
              category: 'care',
              status: 'published',
              author: 'admin',
              featuredImage: 'articles/granite-care.jpg',
              tags: ['граніт', 'догляд', 'поради'],
              seo: {
                metaTitle: {
                  ua: 'Догляд за гранітом - професійні поради',
                  en: 'Granite Care - Professional Tips',
                  de: 'Granitpflege - Professionelle Tipps',
                  pl: 'Pielęgnacja granitu - profesjonalne porady'
                },
                metaDescription: {
                  ua: 'Дізнайтеся як правильно доглядати за гранітними поверхнями. Професійні поради від експертів EuroGranite.',
                  en: 'Learn how to properly care for granite surfaces. Professional advice from EuroGranite experts.',
                  de: 'Erfahren Sie, wie Sie Granitoberflächen richtig pflegen. Professionelle Beratung von EuroGranite-Experten.',
                  pl: 'Dowiedz się, jak właściwie dbać o powierzchnie granitowe. Profesjonalne porady ekspertów EuroGranite.'
                }
              },
              createdAt: '2024-01-15T10:30:00Z',
              updatedAt: '2024-01-15T10:30:00Z',
              publishedAt: '2024-01-15T10:30:00Z'
            },
            {
              id: 2,
              title: {
                ua: 'Тенденції дизайну кухонь 2024',
                en: 'Kitchen Design Trends 2024',
                de: 'Küchendesign-Trends 2024',
                pl: 'Trendy w projektowaniu kuchni 2024'
              },
              content: {
                ua: 'У 2024 році кухонний дизайн зосереджується на природних матеріалах...',
                en: 'In 2024, kitchen design focuses on natural materials...',
                de: 'Im Jahr 2024 konzentriert sich das Küchendesign auf natürliche Materialien...',
                pl: 'W 2024 roku projektowanie kuchni koncentruje się na naturalnych materiałach...'
              },
              excerpt: {
                ua: 'Огляд найактуальніших тенденцій у дизайні кухонь на поточний рік',
                en: 'Overview of the most current kitchen design trends for this year',
                de: 'Überblick über die aktuellsten Küchendesign-Trends für dieses Jahr',
                pl: 'Przegląd najnowszych trendów w projektowaniu kuchni na ten rok'
              },
              category: 'design',
              status: 'published',
              author: 'admin',
              featuredImage: 'articles/kitchen-trends-2024.jpg',
              tags: ['дизайн', 'кухня', 'тенденції'],
              seo: {
                metaTitle: {
                  ua: 'Кухонні тренди 2024 - натуральний камінь',
                  en: 'Kitchen Trends 2024 - Natural Stone',
                  de: 'Küchen-Trends 2024 - Naturstein',
                  pl: 'Trendy kuchenne 2024 - kamień naturalny'
                },
                metaDescription: {
                  ua: 'Відкрийте найкращі тенденції дизайну кухонь 2024 року з використанням природного каменю.',
                  en: 'Discover the best kitchen design trends of 2024 using natural stone.',
                  de: 'Entdecken Sie die besten Küchendesign-Trends 2024 mit Naturstein.',
                  pl: 'Odkryj najlepsze trendy projektowania kuchni 2024 z użyciem kamienia naturalnego.'
                }
              },
              createdAt: '2024-02-01T09:15:00Z',
              updatedAt: '2024-02-01T09:15:00Z',
              publishedAt: '2024-02-01T09:15:00Z'
            },
            {
              id: 3,
              title: {
                ua: 'Переваги кварцових стільниць',
                en: 'Benefits of Quartz Countertops',
                de: 'Vorteile von Quarz-Arbeitsplatten',
                pl: 'Zalety blatów kwarcowych'
              },
              content: {
                ua: 'Кварцові стільниці стають все більш популярними завдяки своїм унікальним властивостям...',
                en: 'Quartz countertops are becoming increasingly popular due to their unique properties...',
                de: 'Quarz-Arbeitsplatten werden aufgrund ihrer einzigartigen Eigenschaften immer beliebter...',
                pl: 'Blaty kwarcowe stają się coraz bardziej popularne ze względu na swoje unikalne właściwości...'
              },
              excerpt: {
                ua: 'Чому кварцові стільниці - це ідеальний вибір для сучасної кухні',
                en: 'Why quartz countertops are the perfect choice for modern kitchens',
                de: 'Warum Quarz-Arbeitsplatten die perfekte Wahl für moderne Küchen sind',
                pl: 'Dlaczego blaty kwarcowe to idealny wybór do nowoczesnej kuchni'
              },
              category: 'quartz',
              status: 'draft',
              author: 'admin',
              featuredImage: 'articles/quartz-benefits.jpg',
              tags: ['кварц', 'стільниці', 'переваги'],
              seo: {
                metaTitle: {
                  ua: 'Кварцові стільниці - переваги та особливості',
                  en: 'Quartz Countertops - Benefits and Features',
                  de: 'Quarz-Arbeitsplatten - Vorteile und Eigenschaften',
                  pl: 'Blaty kwarcowe - zalety i cechy'
                },
                metaDescription: {
                  ua: 'Дізнайтеся про всі переваги кварцових стільниць для вашої кухні. Якість та довговічність від EuroGranite.',
                  en: 'Learn about all the benefits of quartz countertops for your kitchen. Quality and durability from EuroGranite.',
                  de: 'Erfahren Sie alles über die Vorteile von Quarz-Arbeitsplatten für Ihre Küche. Qualität und Langlebigkeit von EuroGranite.',
                  pl: 'Dowiedz się o wszystkich zaletach blatów kwarcowych do Twojej kuchni. Jakość i trwałość od EuroGranite.'
                }
              },
              createdAt: '2024-02-10T14:20:00Z',
              updatedAt: '2024-02-12T11:45:00Z',
              publishedAt: null
            }
          ]

          set({ articles: mockArticles, isLoading: false })
          get().updateStatistics()
        } catch (error) {
          set({ error: 'Помилка завантаження статей', isLoading: false })
        }
      },

      // Отримання відфільтрованих статей
      getFilteredArticles: () => {
        const { articles, searchQuery, currentCategory, sortBy } = get()

        let filtered = [...articles]

        // Фільтрація за категорією
        if (currentCategory !== 'all') {
          filtered = filtered.filter(article => article.category === currentCategory)
        }

        // Пошук
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filtered = filtered.filter(article =>
            article.title.ua.toLowerCase().includes(query) ||
            article.title.en.toLowerCase().includes(query) ||
            article.content.ua.toLowerCase().includes(query) ||
            article.content.en.toLowerCase().includes(query) ||
            article.tags.some(tag => tag.toLowerCase().includes(query))
          )
        }

        // Сортування
        switch (sortBy) {
          case 'newest':
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            break
          case 'oldest':
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            break
          case 'title':
            filtered.sort((a, b) => a.title.ua.localeCompare(b.title.ua))
            break
          case 'status':
            filtered.sort((a, b) => a.status.localeCompare(b.status))
            break
          case 'category':
            filtered.sort((a, b) => a.category.localeCompare(b.category))
            break
          default:
            break
        }

        return filtered
      },

      // Додавання нової статті
      addArticle: async (articleData) => {
        set({ isLoading: true, error: null })

        try {
          // Симулюємо API запит
          await new Promise(resolve => setTimeout(resolve, 1000))

          const newArticle = {
            id: Date.now(),
            ...articleData,
            author: 'admin',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: articleData.status === 'published' ? new Date().toISOString() : null
          }

          set(state => ({
            articles: [...state.articles, newArticle],
            isLoading: false,
            isCreateModalOpen: false
          }))

          get().updateStatistics()
          return { success: true, article: newArticle }
        } catch (error) {
          set({ error: 'Помилка створення статті', isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Оновлення статті
      updateArticle: async (articleId, updates) => {
        set({ isLoading: true, error: null })

        try {
          // Симулюємо API запит
          await new Promise(resolve => setTimeout(resolve, 1000))

          set(state => ({
            articles: state.articles.map(article =>
              article.id === articleId
                ? {
                    ...article,
                    ...updates,
                    updatedAt: new Date().toISOString(),
                    publishedAt: updates.status === 'published' && !article.publishedAt
                      ? new Date().toISOString()
                      : article.publishedAt
                  }
                : article
            ),
            isLoading: false,
            isEditModalOpen: false,
            currentArticle: null
          }))

          get().updateStatistics()
          return { success: true }
        } catch (error) {
          set({ error: 'Помилка оновлення статті', isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Видалення статті
      deleteArticle: async (articleId) => {
        set({ isLoading: true, error: null })

        try {
          // Симулюємо API запит
          await new Promise(resolve => setTimeout(resolve, 500))

          set(state => ({
            articles: state.articles.filter(article => article.id !== articleId),
            isLoading: false
          }))

          get().updateStatistics()
          return { success: true }
        } catch (error) {
          set({ error: 'Помилка видалення статті', isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Видалення кількох статей
      deleteMultipleArticles: async (articleIds) => {
        set({ isLoading: true, error: null })

        try {
          // Симулюємо API запит
          await new Promise(resolve => setTimeout(resolve, 1000))

          set(state => ({
            articles: state.articles.filter(article => !articleIds.includes(article.id)),
            isLoading: false
          }))

          get().updateStatistics()
          return { success: true, count: articleIds.length }
        } catch (error) {
          set({ error: 'Помилка видалення статей', isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Зміна статусу статей
      updateArticleStatus: async (articleIds, newStatus) => {
        set({ isLoading: true, error: null })

        try {
          // Симулюємо API запит
          await new Promise(resolve => setTimeout(resolve, 1000))

          set(state => ({
            articles: state.articles.map(article =>
              articleIds.includes(article.id)
                ? {
                    ...article,
                    status: newStatus,
                    updatedAt: new Date().toISOString(),
                    publishedAt: newStatus === 'published' && !article.publishedAt
                      ? new Date().toISOString()
                      : article.publishedAt
                  }
                : article
            ),
            isLoading: false
          }))

          get().updateStatistics()
          return { success: true, count: articleIds.length }
        } catch (error) {
          set({ error: 'Помилка оновлення статусу статей', isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Зміна категорії статей
      updateArticleCategory: async (articleIds, newCategory) => {
        set({ isLoading: true, error: null })

        try {
          // Симулюємо API запит
          await new Promise(resolve => setTimeout(resolve, 1000))

          set(state => ({
            articles: state.articles.map(article =>
              articleIds.includes(article.id)
                ? {
                    ...article,
                    category: newCategory,
                    updatedAt: new Date().toISOString()
                  }
                : article
            ),
            isLoading: false
          }))

          get().updateStatistics()
          return { success: true, count: articleIds.length }
        } catch (error) {
          set({ error: 'Помилка оновлення категорії статей', isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Оновлення статистики
      updateStatistics: () => {
        const { articles } = get()
        const now = new Date()
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

        const stats = {
          totalArticles: articles.length,
          publishedArticles: articles.filter(article => article.status === 'published').length,
          draftArticles: articles.filter(article => article.status === 'draft').length,
          recentArticles: articles.filter(article => new Date(article.createdAt) > oneMonthAgo).length,
          articlesByCategory: {}
        }

        // Статистика по категоріях
        articles.forEach(article => {
          if (!stats.articlesByCategory[article.category]) {
            stats.articlesByCategory[article.category] = 0
          }
          stats.articlesByCategory[article.category]++
        })

        set({ statistics: stats })
      },

      // Експорт даних статей
      exportArticlesData: () => {
        const { articles } = get()
        const dataStr = JSON.stringify(articles, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `articles_export_${new Date().toISOString().split('T')[0]}.json`
        link.click()
        URL.revokeObjectURL(url)
      },

      // Управління модальними вікнами
      openCreateModal: () => set({ isCreateModalOpen: true, currentArticle: null }),
      openEditModal: (article) => set({ isEditModalOpen: true, currentArticle: article }),
      closeCreateModal: () => set({ isCreateModalOpen: false, currentArticle: null }),
      closeEditModal: () => set({ isEditModalOpen: false, currentArticle: null }),

      // Фільтри та пошук
      setSearchQuery: (query) => set({ searchQuery: query }),
      setCurrentCategory: (category) => set({ currentCategory: category }),
      setSortBy: (sortBy) => set({ sortBy }),

      // Очищення помилок
      clearError: () => set({ error: null })
    }),
    {
      name: 'admin-articles-storage',
      partialize: (state) => ({
        articles: state.articles,
        searchQuery: state.searchQuery,
        currentCategory: state.currentCategory,
        sortBy: state.sortBy
      })
    }
  )
)

export default useAdminArticlesStore