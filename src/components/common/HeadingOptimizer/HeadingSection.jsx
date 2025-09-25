import React from 'react'
import PropTypes from 'prop-types'
import './heading-section.css'

// Optimized heading component for proper SEO hierarchy
const HeadingSection = ({
  level = 2,
  children,
  className = '',
  size = 'default',
  color = 'dark',
  spacing = 'default',
  textAlign = 'left',
  id = null,
  style = {}
}) => {
  // Ensure level is between 1-6
  const headingLevel = Math.max(1, Math.min(6, level))
  const HeadingTag = `h${headingLevel}`

  // Generate CSS classes based on props
  const headingClasses = [
    'heading-optimized',
    `heading-level-${headingLevel}`,
    `heading-size-${size}`,
    `heading-color-${color}`,
    `heading-spacing-${spacing}`,
    `heading-align-${textAlign}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <HeadingTag
      className={headingClasses}
      id={id}
      style={style}
    >
      {children}
    </HeadingTag>
  )
}

HeadingSection.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large', 'xl', 'xxl']),
  color: PropTypes.oneOf(['dark', 'light', 'primary', 'secondary']),
  spacing: PropTypes.oneOf(['none', 'small', 'default', 'large']),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  id: PropTypes.string,
  style: PropTypes.object
}

export default HeadingSection