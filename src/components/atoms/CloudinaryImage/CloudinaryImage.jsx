import React from 'react'
import PropTypes from 'prop-types'

/**
 * CloudinaryImage - Optimized image component using Cloudinary
 * Simplified version for granite paving gallery
 */
const CloudinaryImage = ({
  publicId,
  alt = 'Granite paving project',
  width = 800,
  height = 600,
  className = '',
  quality = 'auto',
  format = 'auto',
  responsive = false,
  onClick,
  onLoad,
  onError,
  ...props
}) => {
  // Get cloud name from environment or use default
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'eurogranite'

  // Build optimized Cloudinary URL with responsive support
  const buildImageUrl = (w, h) => {
    if (responsive) {
      // For responsive images, use different crop modes based on screen size
      const isMobile = window.innerWidth <= 768
      const cropMode = isMobile ? 'c_fill,g_center' : 'c_fit'
      return `https://res.cloudinary.com/${cloudName}/image/upload/w_${w},h_${h},${cropMode},f_${format},q_${quality}/${publicId}`
    }
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_${w},h_${h},c_fill,f_${format},q_${quality}/${publicId}`
  }

  const imageUrl = buildImageUrl(width, height)

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  )
}

CloudinaryImage.propTypes = {
  publicId: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  quality: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  format: PropTypes.string,
  responsive: PropTypes.bool,
  onClick: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func
}

export default CloudinaryImage