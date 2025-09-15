import React, { useState } from 'react'
import useLanguageStore from '../../../stores/languageStore'
import useToastStore from '../../../stores/toastStore'
import Button from '../../atoms/Button/Button'
import { contactFormContent } from '../../../constants/contactFormData'
import { sendContactEmail } from '../../../services/emailService'

const ContactForm = () => {
  const { currentLanguage } = useLanguageStore()
  const { showSuccess, showError } = useToastStore()
  const content = contactFormContent[currentLanguage] || contactFormContent.en

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return false
    
    // Length validation: 2-50 characters
    const trimmedName = name.trim()
    if (trimmedName.length < 2 || trimmedName.length > 50) return false
    
    // Character validation: letters (Latin, Cyrillic, German, Polish), spaces, hyphens, apostrophes
    const nameRegex = /^[a-zA-ZА-Яа-яГґЄєІіЇїäöüßÄÖÜąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-']+$/
    return nameRegex.test(trimmedName)
  }

  const validateEmail = (email) => {
    const trimmedEmail = email.trim()
    
    // Length validation: 5-254 characters
    if (trimmedEmail.length < 5 || trimmedEmail.length > 254) return false
    
    // Strict email validation regex
    const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    
    // Check basic format
    if (!emailRegex.test(trimmedEmail)) return false
    
    // Additional checks
    const [username, domain] = trimmedEmail.split('@')
    
    // Username validations
    if (username.startsWith('.') || username.endsWith('.')) return false
    if (username.includes('..')) return false
    if (username.length > 64) return false
    
    // Domain validations
    const domainParts = domain.split('.')
    if (domainParts.length < 2) return false
    
    // Check each domain part
    for (const part of domainParts) {
      if (part.startsWith('-') || part.endsWith('-')) return false
      if (part.length === 0 || part.length > 63) return false
    }
    
    return true
  }

  const validatePhone = (phone) => {
    if (!phone.trim()) return true // Phone is optional
    
    const trimmedPhone = phone.trim()
    
    // Only allow digits and + symbol
    const phoneRegex = /^[+\d]+$/
    if (!phoneRegex.test(trimmedPhone)) return false
    
    // More specific validation after removing spaces/formatting
    const cleanPhone = trimmedPhone.replace(/[\s\-()]/g, '')
    const validFormatRegex = /^[+]?[1-9][\d]{0,15}$/
    
    return validFormatRegex.test(cleanPhone)
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = content.validation.nameRequired
    } else if (!validateName(formData.name)) {
      newErrors.name = content.validation.nameInvalid
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = content.validation.emailRequired
    } else if (!validateEmail(formData.email)) {
      newErrors.email = content.validation.emailInvalid
    }

    // Phone validation (optional)
    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = content.validation.phoneInvalid
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = content.validation.messageRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare form data for email service
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        language: currentLanguage
      }

      // Send email using EmailJS service
      const result = await sendContactEmail(emailData)
      
      if (result.success) {
        // Show success toast
        showSuccess(content.successMessage.description, 6000)
        
        // Show success message
        setIsSubmitted(true)
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        throw new Error(result.message || 'Failed to send email')
      }

    } catch (error) {
      console.error('Error submitting form:', error)
      
      // Show error toast based on language
      const errorMessages = {
        en: 'Failed to send message. Please try again or contact us directly.',
        ua: 'Не вдалося відправити повідомлення. Спробуйте ще раз або зв\'яжіться з нами безпосередньо.',
        de: 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
        pl: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.'
      }
      
      showError(errorMessages[currentLanguage] || errorMessages.en, 8000)
      
      // For now, still show success for better UX - in production, handle error properly
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg contact-form-success-enter lg-contact-grid-align">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="heading-3 mb-4 text-neutral-900">
            {content.successMessage.title}
          </h3>
          
          <p className="description-text text-neutral-600 mb-6">
            {content.successMessage.description}
          </p>
          
          <Button 
            variant="outline" 
            size="medium"
            onClick={() => setIsSubmitted(false)}
          >
            {currentLanguage === 'ua' ? 'Надіслати ще одне повідомлення' : 'Send Another Message'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl shadow-lg lg-contact-grid-align">
      <div>
        <h2 className="heading-3 mb-6 text-neutral-900">
          {content.formTitle}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-1">
            {content.fields.name.label}
            {content.fields.name.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={content.fields.name.placeholder}
            className={`w-full px-4 py-3 border lg-form-field-orange transition-colors focus:outline-none ${
              errors.name ? 'border-red-500' : ''
            }`}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm font-semibold contact-form-error" style={{color: '#dc2626'}} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-1">
            {content.fields.email.label}
            {content.fields.email.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={content.fields.email.placeholder}
            className={`w-full px-4 py-3 border lg-form-field-orange transition-colors focus:outline-none ${
              errors.email ? 'border-red-500' : ''
            }`}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm font-semibold contact-form-error" style={{color: '#dc2626'}} role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-1">
            {content.fields.phone.label}
            {!content.fields.phone.required && (
              <span className="text-neutral-500 text-xs ml-1">
                ({currentLanguage === 'ua' ? 'не обов\'язкове' : 'optional'})
              </span>
            )}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={content.fields.phone.placeholder}
            className={`w-full px-4 py-3 border lg-form-field-orange transition-colors focus:outline-none ${
              errors.phone ? 'border-red-500' : ''
            }`}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 text-sm font-semibold contact-form-error" style={{color: '#dc2626'}} role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-1">
            {content.fields.message.label}
            {content.fields.message.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={content.fields.message.placeholder}
            rows={5}
            className={`w-full px-4 py-3 border lg-form-field-orange transition-colors focus:outline-none resize-vertical ${
              errors.message ? 'border-red-500' : ''
            }`}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-sm font-semibold contact-form-error" style={{color: '#dc2626'}} role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 lg-form-submit-align">
          <Button 
            type="submit"
            variant="primary"
            size="large"
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? 'contact-form-button-loading' : ''}`}
          >
            {isSubmitting 
              ? (currentLanguage === 'ua' ? 'Відправляється...' 
                : currentLanguage === 'en' ? 'Sending...'
                : currentLanguage === 'de' ? 'Wird gesendet...'
                : 'Wysyłanie...')
              : content.submitButton
            }
          </Button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm