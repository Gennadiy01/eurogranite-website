// Simplified Gallery data structure for EuroGranite granite paving projects
// Using only basic project categories with Cloudinary integration

export const projectCategories = [
  {
    id: 'driveway',
    name: {
      en: 'Driveways',
      ua: 'Під\'їзні шляхи',
      de: 'Zufahrten',
      pl: 'Podjazdy'
    },
    cloudinaryFolder: 'eurogranite/gallery/driveway',
    tags: ['gallery', 'driveway']
  },
  {
    id: 'walkway',
    name: {
      en: 'Walkways',
      ua: 'Пішохідні доріжки',
      de: 'Gehwege',
      pl: 'Chodniki'
    },
    cloudinaryFolder: 'eurogranite/gallery/walkway',
    tags: ['gallery', 'walkway']
  },
  {
    id: 'plaza',
    name: {
      en: 'Plazas',
      ua: 'Площі',
      de: 'Plätze',
      pl: 'Place'
    },
    cloudinaryFolder: 'eurogranite/gallery/plaza',
    tags: ['gallery', 'plaza']
  },
  {
    id: 'courtyard',
    name: {
      en: 'Courtyards',
      ua: 'Внутрішні дворики',
      de: 'Innenhöfe',
      pl: 'Dziedzińce'
    },
    cloudinaryFolder: 'eurogranite/gallery/courtyard',
    tags: ['gallery', 'courtyard']
  }
]

// Simplified gallery projects - demo data for each category
// In production, these will be replaced with actual Cloudinary images
export const galleryProjects = [
  // Driveways - під'їзні шляхи
  {
    id: 'driveway-01',
    publicId: 'eurogranite/gallery/driveway/project-01',
    category: 'driveway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'driveway'],
    alt: {
      en: 'Granite driveway project',
      ua: 'Проект гранітного під\'їзного шляху',
      de: 'Granit-Zufahrt-Projekt',
      pl: 'Projekt granitowego podjazdu'
    }
  },
  {
    id: 'driveway-02',
    publicId: 'eurogranite/gallery/driveway/project-02',
    category: 'driveway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'driveway']
  },
  {
    id: 'driveway-03',
    publicId: 'eurogranite/gallery/driveway/project-03',
    category: 'driveway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'driveway']
  },

  // Walkways - пішохідні доріжки
  {
    id: 'walkway-01',
    publicId: 'eurogranite/gallery/walkway/project-01',
    category: 'walkway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'walkway'],
    alt: {
      en: 'Granite walkway project',
      ua: 'Проект гранітної пішохідної доріжки',
      de: 'Granit-Gehweg-Projekt',
      pl: 'Projekt granitowego chodnika'
    }
  },
  {
    id: 'walkway-02',
    publicId: 'eurogranite/gallery/walkway/project-02',
    category: 'walkway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'walkway']
  },
  {
    id: 'walkway-03',
    publicId: 'eurogranite/gallery/walkway/project-03',
    category: 'walkway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'walkway']
  },

  // Plazas - площі
  {
    id: 'plaza-01',
    publicId: 'eurogranite/gallery/plaza/project-01',
    category: 'plaza',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'plaza'],
    alt: {
      en: 'Granite plaza project',
      ua: 'Проект гранітної площі',
      de: 'Granit-Platz-Projekt',
      pl: 'Projekt granitowego placu'
    }
  },
  {
    id: 'plaza-02',
    publicId: 'eurogranite/gallery/plaza/project-02',
    category: 'plaza',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'plaza']
  },
  {
    id: 'plaza-03',
    publicId: 'eurogranite/gallery/plaza/project-03',
    category: 'plaza',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'plaza']
  },

  // Courtyards - внутрішні дворики
  {
    id: 'courtyard-01',
    publicId: 'eurogranite/gallery/courtyard/project-01',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard'],
    alt: {
      en: 'Granite courtyard project',
      ua: 'Проект гранітного внутрішнього дворика',
      de: 'Granit-Innenhof-Projekt',
      pl: 'Projekt granitowego dziedzińca'
    }
  },
  {
    id: 'courtyard-02',
    publicId: 'eurogranite/gallery/courtyard/project-02',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-03',
    publicId: 'eurogranite/gallery/courtyard/project-03',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  }
]

// Hero slider images for homepage - granite paving focus
export const heroSliderImages = [
  {
    id: 'hero-01',
    publicId: 'eurogranite/hero-slider/hero-driveway-premium',
    width: 1920,
    height: 1080
  },
  {
    id: 'hero-02',
    publicId: 'eurogranite/hero-slider/hero-plaza-commercial',
    width: 1920,
    height: 1080
  },
  {
    id: 'hero-03',
    publicId: 'eurogranite/hero-slider/hero-walkway-residential',
    width: 1920,
    height: 1080
  },
  {
    id: 'hero-04',
    publicId: 'eurogranite/hero-slider/hero-courtyard-pattern',
    width: 1920,
    height: 1080
  }
]

// Simplified filtering utilities - only by category
export const getProjectsByCategory = (category) => {
  return galleryProjects.filter(project => project.category === category)
}

export const getProjectsByTags = (tags) => {
  return galleryProjects.filter(project =>
    tags.every(tag => project.tags && project.tags.includes(tag))
  )
}

// Helper function to get all projects (for "All" filter)
export const getAllProjects = () => {
  return galleryProjects
}

// Cloudinary utilities for simplified structure
export const getCloudinaryFolderByCategory = (category) => {
  const categoryData = projectCategories.find(cat => cat.id === category)
  return categoryData?.cloudinaryFolder || 'eurogranite/gallery'
}

// Simplified upload preset helper
export const generateUploadPreset = (category) => {
  return {
    folder: `eurogranite/gallery/${category}`,
    tags: ['gallery', category],
    context: {
      category: category,
      uploadDate: new Date().toISOString()
    }
  }
}