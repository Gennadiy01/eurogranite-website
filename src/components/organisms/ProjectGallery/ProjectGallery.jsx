import React, { useState, useEffect, useCallback } from 'react'
import CloudinaryImage from '../../atoms/CloudinaryImage/CloudinaryImage'
import useLanguageStore from '../../../stores/languageStore'
import { galleryProjects, projectCategories, getProjectsByCategory, getAllProjects } from '../../../constants/galleryData'

const ProjectGallery = () => {
  const { currentLanguage } = useLanguageStore()
  const [activeCategory, setActiveCategory] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(galleryProjects)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const content = {
    en: {
      title: 'Our Projects',
      subtitle: 'Premium granite paving installations across various project types',
      filterAll: 'All Projects',
      loadMore: 'Load More',
      close: 'Close'
    },
    ua: {
      title: 'Наші проекти',
      subtitle: 'Преміум установки гранітної бруківки в різних типах проектів',
      filterAll: 'Всі проекти',
      loadMore: 'Завантажити більше',
      close: 'Закрити'
    },
    de: {
      title: 'Unsere Projekte',
      subtitle: 'Premium-Granitpflaster-Installationen in verschiedenen Projekttypen',
      filterAll: 'Alle Projekte',
      loadMore: 'Mehr laden',
      close: 'Schließen'
    },
    pl: {
      title: 'Nasze Projekty',
      subtitle: 'Instalacje premium granitowej kostki brukowej w różnych typach projektów',
      filterAll: 'Wszystkie projekty',
      loadMore: 'Załaduj więcej',
      close: 'Zamknij'
    }
  }

  const currentContent = content[currentLanguage] || content.en

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(getAllProjects())
    } else {
      setFilteredProjects(getProjectsByCategory(activeCategory))
    }
  }, [activeCategory])

  const handleCategoryChange = (categoryId) => {
    setIsLoading(true)
    setActiveCategory(categoryId)

    // Simulate loading for smooth transition
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const openLightbox = (project, index) => {
    setSelectedImage({
      project,
      index,
      allProjects: filteredProjects
    })
  }

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
  }, [])

  const navigateLightbox = useCallback((direction) => {
    if (!selectedImage) return

    const currentIndex = selectedImage.index
    const totalImages = selectedImage.allProjects.length
    let newIndex

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1
    } else {
      newIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage({
      ...selectedImage,
      project: selectedImage.allProjects[newIndex],
      index: newIndex
    })
  }, [selectedImage])

  // Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && selectedImage) {
      navigateLightbox('next')
    }
    if (isRightSwipe && selectedImage) {
      navigateLightbox('prev')
    }
  }

  const handleKeyPress = useCallback((e) => {
    if (!selectedImage) return

    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowLeft') {
      navigateLightbox('prev')
    } else if (e.key === 'ArrowRight') {
      navigateLightbox('next')
    }
  }, [selectedImage, closeLightbox, navigateLightbox])

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, handleKeyPress])

  return (
    <section className="project-gallery-section">
      <div className="project-gallery-container">
        {/* Header */}
        <div className="project-gallery-header">
          <h2 className="project-gallery-title">
            {currentContent.title}
          </h2>
          <p className="project-gallery-subtitle">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="project-gallery-filters">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`filter-button ${activeCategory === 'all' ? 'active' : ''}`}
          >
            {currentContent.filterAll}
          </button>
          {projectCategories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
            >
              {category.name[currentLanguage] || category.name.en}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="project-gallery-grid">
          {isLoading ? (
            <div className="gallery-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="gallery-item"
                onClick={() => openLightbox(project, index)}
              >
                <CloudinaryImage
                  publicId={project.publicId}
                  alt={project.alt?.[currentLanguage] || project.alt?.en || `Granite paving project ${project.id}`}
                  width={600}
                  height={400}
                  className="gallery-image"
                />
                <div className="gallery-item-overlay">
                  <div className="gallery-item-info">
                    <span className="project-category">
                      {projectCategories.find(cat => cat.id === project.category)?.name[currentLanguage] ||
                       projectCategories.find(cat => cat.id === project.category)?.name.en}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div
              className="lightbox-container"
              onClick={e => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label={currentContent.close}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              <button
                className="lightbox-nav lightbox-prev"
                onClick={() => {
                  console.log('Previous button clicked');
                  navigateLightbox('prev');
                }}
                aria-label="Previous image"
                style={{
                  position: window.innerWidth > 1024 ? 'fixed' : 'absolute',
                  left: window.innerWidth > 1024 ?
                    (window.innerWidth >= 1920 ? 'calc(50vw - 800px)' :
                     window.innerWidth >= 1440 ? 'calc(50vw - 700px)' :
                     window.innerWidth >= 1280 ? 'calc(50vw - 600px)' : 'calc(50vw - 500px)') :
                    (window.innerWidth > 768 ? '1rem' : '0.5rem'),
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: window.innerWidth > 768 ? '3.5rem' : '2.5rem',
                  height: window.innerWidth > 768 ? '3.5rem' : '2.5rem',
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '2px solid rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  color: 'white',
                  zIndex: 1002,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="lightbox-image-container">
                <CloudinaryImage
                  publicId={selectedImage.project.publicId}
                  alt={selectedImage.project.alt?.[currentLanguage] || selectedImage.project.alt?.en || `Granite paving project ${selectedImage.project.id}`}
                  width={2400}
                  height={1600}
                  className="lightbox-image"
                  responsive={true}
                />
              </div>

              <button
                className="lightbox-nav lightbox-next"
                onClick={() => {
                  console.log('Next button clicked');
                  navigateLightbox('next');
                }}
                aria-label="Next image"
                style={{
                  position: window.innerWidth > 1024 ? 'fixed' : 'absolute',
                  right: window.innerWidth > 1024 ?
                    (window.innerWidth >= 1920 ? 'calc(50vw - 800px)' :
                     window.innerWidth >= 1440 ? 'calc(50vw - 700px)' :
                     window.innerWidth >= 1280 ? 'calc(50vw - 600px)' : 'calc(50vw - 500px)') :
                    (window.innerWidth > 768 ? '1rem' : '0.5rem'),
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: window.innerWidth > 768 ? '3.5rem' : '2.5rem',
                  height: window.innerWidth > 768 ? '3.5rem' : '2.5rem',
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '2px solid rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  color: 'white',
                  zIndex: 1002,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="lightbox-info">
                <div className="lightbox-counter">
                  {selectedImage.index + 1} / {selectedImage.allProjects.length}
                </div>
                {window.innerWidth <= 768 && (
                  <>
                    <div className="swipe-hint">
                      ← Swipe →
                    </div>
                    <button
                      className="mobile-exit-button"
                      onClick={closeLightbox}
                      aria-label={currentContent.close}
                    >
                      {currentContent.close}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectGallery