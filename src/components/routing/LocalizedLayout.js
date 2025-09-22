import React, { useEffect, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useLanguageStore from '../../stores/languageStore'
import Footer from '../organisms/Footer/Footer'

const LocalizedLayout = ({ children, showFooter = true }) => {
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    setLanguage,
    currentLanguage,
    getBrowserLanguage,
    isSupportedLanguage
  } = useLanguageStore()

  const supportedLanguages = useMemo(() => ['ua', 'en', 'de', 'pl'], [])

  useEffect(() => {
    if (lang && isSupportedLanguage(lang)) {
      // Valid language in URL - update store if different
      if (currentLanguage !== lang) {
        setLanguage(lang)
      }
    } else if (!lang) {
      // No language in URL - detect browser language or use default
      const preferredLang = getBrowserLanguage()
      const currentPath = location.pathname.replace('/eurogranite-website', '')
      navigate(`/${preferredLang}${currentPath}`, { replace: true })
    } else {
      // Invalid language - redirect to browser-detected or default
      const fallbackLang = getBrowserLanguage()
      navigate(`/${fallbackLang}`, { replace: true })
    }
  }, [
    lang,
    currentLanguage,
    setLanguage,
    navigate,
    location.pathname,
    getBrowserLanguage,
    isSupportedLanguage
  ])

  // Don't render if language is not set correctly
  if (!lang || !supportedLanguages.includes(lang)) {
    return null
  }

  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  )
}

export default LocalizedLayout