import React from 'react'
import { getLanguageFromPath } from '../../../utils/languageUtils'
import './PageLoader.scss'

const PageLoader = () => {
  const currentLanguage = getLanguageFromPath(window.location.pathname)

  const loadingText = {
    ua: 'Завантаження...',
    en: 'Loading...',
    de: 'Laden...',
    pl: 'Ładowanie...'
  }

  const text = loadingText[currentLanguage] || loadingText.ua

  return (
    <div className="page-loader">
      <div className="page-loader__content">
        <div className="page-loader__spinner"></div>
        <p className="page-loader__text">{text}</p>
      </div>
    </div>
  )
}

export default PageLoader