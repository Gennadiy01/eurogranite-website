import React, { useEffect, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useLanguageStore from '../../stores/languageStore'

const LocalizedLayout = ({ children }) => {
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { setLanguage, currentLanguage } = useLanguageStore()

  const supportedLanguages = useMemo(() => ['ua', 'en', 'de', 'pl'], [])

  useEffect(() => {
    if (lang && supportedLanguages.includes(lang)) {
      if (currentLanguage !== lang) {
        setLanguage(lang)
      }
    } else if (!lang) {
      // Redirect to default language if no language in URL
      const defaultLang = 'en'
      const basename = ''
      const currentPath = location.pathname.replace(basename, '')
      navigate(`/${defaultLang}${currentPath}`, { replace: true })
    } else {
      // Invalid language, redirect to default
      navigate('/en', { replace: true })
    }
  }, [lang, currentLanguage, setLanguage, navigate, location.pathname, supportedLanguages])

  // Don't render if language is not set correctly
  if (!lang || !supportedLanguages.includes(lang)) {
    return null
  }

  return <>{children}</>
}

export default LocalizedLayout