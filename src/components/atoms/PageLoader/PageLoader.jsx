import React from 'react'
import './PageLoader.scss'

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="page-loader__content">
        <div className="page-loader__spinner"></div>
        <p className="page-loader__text">Завантаження...</p>
      </div>
    </div>
  )
}

export default PageLoader