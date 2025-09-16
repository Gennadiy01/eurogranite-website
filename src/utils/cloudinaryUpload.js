// Utility for uploading images to Cloudinary with proper structure and tags
import { projectCategories, graniteTypeFilters } from '../constants/galleryData'

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`

/**
 * Upload single image to Cloudinary with automatic categorization
 * @param {File} file - Image file to upload
 * @param {Object} metadata - Image metadata
 * @returns {Promise<Object>} Cloudinary response
 */
export const uploadImageToCloudinary = async (file, metadata) => {
  const {
    category = 'driveways',
    graniteType = 'gabbro',
    year = new Date().getFullYear(),
    size = 'medium',
    location = '',
    description = ''
  } = metadata

  // Generate public_id based on category and timestamp
  const timestamp = Date.now()
  const publicId = `eurogranite/gallery/${category}/${graniteType}-${category}-${timestamp}`

  // Generate tags for filtering
  const tags = [
    'gallery',
    category,
    graniteType,
    year.toString(),
    size,
    'granite-paving'
  ].filter(Boolean)

  // Create form data
  const formData = new FormData()
  formData.append('file', file)
  formData.append('public_id', publicId)
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
  formData.append('tags', tags.join(','))
  formData.append('folder', `eurogranite/gallery/${category}`)

  // Add context metadata
  const context = {
    category,
    graniteType,
    year: year.toString(),
    size,
    location,
    description,
    uploadDate: new Date().toISOString()
  }

  formData.append('context', Object.entries(context)
    .map(([key, value]) => `${key}=${value}`)
    .join('|'))

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const result = await response.json()
    console.log('✅ Image uploaded successfully:', result.public_id)
    return result

  } catch (error) {
    console.error('❌ Upload error:', error)
    throw error
  }
}

/**
 * Upload multiple images with batch processing
 * @param {Array} files - Array of {file, metadata} objects
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Array>} Array of upload results
 */
export const uploadBatchImages = async (files, onProgress) => {
  const results = []
  const total = files.length

  for (let i = 0; i < files.length; i++) {
    const { file, metadata } = files[i]

    try {
      const result = await uploadImageToCloudinary(file, metadata)
      results.push({ success: true, result })

      if (onProgress) {
        onProgress({
          current: i + 1,
          total,
          percentage: Math.round(((i + 1) / total) * 100),
          currentFile: file.name
        })
      }
    } catch (error) {
      results.push({ success: false, error, fileName: file.name })
    }
  }

  return results
}

/**
 * Generate upload metadata from filename
 * @param {string} filename - Image filename
 * @returns {Object} Generated metadata
 */
export const parseFilenameMetadata = (filename) => {
  // Example filename: "black-granite-driveway-large-2024-kyiv.jpg"
  const parts = filename.toLowerCase().replace(/\.(jpg|jpeg|png|webp)$/i, '').split('-')

  const metadata = {
    category: 'driveways',
    graniteType: 'gabbro',
    size: 'medium',
    year: new Date().getFullYear(),
    location: ''
  }

  // Auto-detect category from filename
  const categories = ['driveway', 'walkway', 'plaza', 'courtyard']
  const foundCategory = categories.find(cat => parts.some(part => part.includes(cat)))
  if (foundCategory) {
    metadata.category = foundCategory.endsWith('s') ? foundCategory : `${foundCategory}s`
  }

  // Auto-detect granite type
  const graniteTypes = ['gabbro', 'black', 'grey', 'gray', 'red', 'brown', 'green', 'labradorite']
  const foundGranite = graniteTypes.find(type => parts.includes(type))
  if (foundGranite) {
    if (foundGranite === 'black' || foundGranite === 'gabbro') metadata.graniteType = 'gabbro'
    else if (foundGranite === 'grey' || foundGranite === 'gray') metadata.graniteType = 'real-grey'
    else if (foundGranite === 'red' || foundGranite === 'brown') metadata.graniteType = 'rosso-santiago'
    else if (foundGranite === 'green') metadata.graniteType = 'verde-oliva'
    else if (foundGranite === 'labradorite') metadata.graniteType = 'ukrainian-labradorite-volga-blue'
  }

  // Auto-detect size
  const sizes = ['small', 'medium', 'large']
  const foundSize = sizes.find(size => parts.includes(size))
  if (foundSize) metadata.size = foundSize

  // Auto-detect year
  const yearMatch = parts.find(part => /^\d{4}$/.test(part))
  if (yearMatch) metadata.year = parseInt(yearMatch)

  // Auto-detect location
  const locations = ['kyiv', 'lviv', 'kharkiv', 'odesa', 'dnipro']
  const foundLocation = locations.find(loc => parts.includes(loc))
  if (foundLocation) metadata.location = foundLocation.charAt(0).toUpperCase() + foundLocation.slice(1)

  return metadata
}

/**
 * Validate image file before upload
 * @param {File} file - Image file to validate
 * @returns {Object} Validation result
 */
export const validateImageFile = (file) => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const errors = []

  if (file.size > maxSize) {
    errors.push(`File size (${Math.round(file.size / 1024 / 1024)}MB) exceeds 10MB limit`)
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} not supported. Use JPG, PNG, or WebP`)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}