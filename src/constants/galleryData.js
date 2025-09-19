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
    publicId: 'eurogranite/gallery/driveway/driveway-01',
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
    publicId: 'eurogranite/gallery/driveway/driveway-02',
    category: 'driveway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'driveway']
  },
  {
    id: 'driveway-03',
    publicId: 'eurogranite/gallery/driveway/driveway-03',
    category: 'driveway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'driveway']
  },

  // Walkways - пішохідні доріжки
  {
    id: 'walkway-01',
    publicId: 'eurogranite/gallery/walkway/walkway-01',
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
    publicId: 'eurogranite/gallery/walkway/walkway-02',
    category: 'walkway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'walkway']
  },
  {
    id: 'walkway-03',
    publicId: 'eurogranite/gallery/walkway/walkway-03',
    category: 'walkway',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'walkway']
  },

  // Plazas - площі
  {
    id: 'plaza-01',
    publicId: 'eurogranite/gallery/plaza/plaza-01',
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
    publicId: 'eurogranite/gallery/plaza/plaza-02',
    category: 'plaza',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'plaza']
  },
  {
    id: 'plaza-03',
    publicId: 'eurogranite/gallery/plaza/plaza-03',
    category: 'plaza',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'plaza']
  },

  // Courtyards - внутрішні дворики
  // Test image
  {
    id: 'test-courtyard',
    publicId: 'courtyard-08_t7jzid',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard'],
    alt: {
      en: 'Test Granite courtyard project',
      ua: 'Тест проект дворика',
      de: 'Test Granit-Innenhof-Projekt',
      pl: 'Test Projekt dziedzinca'
    }
  },
  {
    id: 'courtyard-01',
    publicId: 'courtyard-01_cf1gtk',
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
    publicId: 'courtyard-02_b4t2fy',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-05',
    publicId: 'courtyard-24_xsvjxc',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-06',
    publicId: 'courtyard-23_uzycey',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-07',
    publicId: 'courtyard-22_cavqkd',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-08',
    publicId: 'courtyard-21_bfc4ok',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-09',
    publicId: 'courtyard-20_fzfkih',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-10',
    publicId: 'courtyard-19_ztttjo',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-11',
    publicId: 'courtyard-17_fbwdns',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-12',
    publicId: 'courtyard-18_n4lheu',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-13',
    publicId: 'courtyard-14_mqsqof',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-14',
    publicId: 'courtyard-12_ay11xk',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-17',
    publicId: 'courtyard-11_zq5ekz',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-18',
    publicId: 'courtyard-10_kmxzfn',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-19',
    publicId: 'courtyard-09_ubui9t',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-20',
    publicId: 'courtyard-06_hv32cu',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-21',
    publicId: 'courtyard-08_t7jzid',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-22',
    publicId: 'courtyard-07_u5samo',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-23',
    publicId: 'courtyard-04_ypncbr',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-24',
    publicId: 'courtyard-05_ey6i75',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-26',
    publicId: 'courtyard-02_b4t2fy',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-27',
    publicId: 'courtyard-01_cf1gtk',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-28',
    publicId: 'courtyard-44_j8vffz',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-29',
    publicId: 'courtyard-46_lvr4mw',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-30',
    publicId: 'courtyard-45_sygfdt',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-31',
    publicId: 'courtyard-43_qhprmv',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-32',
    publicId: 'courtyard-42_ednl0l',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-33',
    publicId: 'courtyard-41_camytw',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-34',
    publicId: 'courtyard-40_jafhu6',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-35',
    publicId: 'courtyard-39_xn73df',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-36',
    publicId: 'courtyard-36_olixwp',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-37',
    publicId: 'courtyard-38_p46dv5',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-38',
    publicId: 'courtyard-37_zjppld',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-39',
    publicId: 'courtyard-34_nx4er9',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-40',
    publicId: 'courtyard-35_dteijl',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-41',
    publicId: 'courtyard-30_q87i3b',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-42',
    publicId: 'courtyard-31_hjsafn',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-43',
    publicId: 'courtyard-33_v5rtgr',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-44',
    publicId: 'courtyard-32_ttvzci',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-45',
    publicId: 'courtyard-29_mcamg5',
    category: 'courtyard',
    width: 1920,
    height: 1280,
    tags: ['gallery', 'courtyard']
  },
  {
    id: 'courtyard-46',
    publicId: 'courtyard-28_rxy0op',
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