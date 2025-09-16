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
  onClick,
  onLoad,
  onError,
  ...props
}) => {
  // Get cloud name from environment or use default
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'eurogranite'

  // Build optimized Cloudinary URL
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},c_fill,f_${format},q_${quality}/${publicId}`

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
  onClick: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func
}

export default CloudinaryImage