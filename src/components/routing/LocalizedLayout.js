import React, { useEffect, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import useLanguageStore from '../../stores/languageStore'

const LocalizedLayout = ({ children }) => {
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { setLanguage, currentLanguage } = useLanguageStore()

  const supportedLanguages = useMemo(() => ['ua', 'en', 'de', 'pl'], [])

  // Check if admin route
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    // Don't interfere with admin routes - they're handled separately
    if (isAdminRoute) {
      return
    }

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
  }, [lang, currentLanguage, setLanguage, navigate, location.pathname, supportedLanguages, isAdminRoute])

  // Don't render anything for admin routes - they have their own layout
  if (isAdminRoute) {
    return null
  }

  // Don't render if language is not set correctly
  if (!lang || !supportedLanguages.includes(lang)) {
    return null
  }

  return <>{children}</>
}

export default LocalizedLayout