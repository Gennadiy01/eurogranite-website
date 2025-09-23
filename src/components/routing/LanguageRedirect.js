import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useLanguageStore from '../../stores/languageStore'

const LanguageRedirect = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentLanguage } = useLanguageStore()

  useEffect(() => {
    // Get basename based on environment
    const basename = process.env.NODE_ENV === 'development' ? '' : '/eurogranite-website'

    // Get the current path without basename
    const currentPath = location.pathname.replace(basename, '')

    // If we're at root or any path without language prefix, redirect to localized version
    if (currentPath === '/' || !currentPath.match(/^\/(ua|en|de|pl)/)) {
      const defaultLang = currentLanguage || 'en'  // Default to 'en' for consistency
      const newPath = currentPath === '/' ? `/${defaultLang}` : `/${defaultLang}${currentPath}`
      navigate(newPath, { replace: true })
    }
  }, [navigate, location.pathname, currentLanguage])

  return null
}

export default LanguageRedirect