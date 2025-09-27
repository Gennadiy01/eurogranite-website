import React, { useState, useEffect, useRef } from 'react'

const AnimatedCounter = ({ 
  targetNumber, 
  duration = 2000, 
  delay = 0, 
  suffix = '', 
  step = 1,
  onComplete 
}) => {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const elementRef = useRef(null)

  // Check if element is in view using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])
  
  // Parse target number (remove + suffix if present)
  const parseTargetNumber = (target) => {
    if (typeof target === 'string') {
      return parseInt(target.replace('+', ''))
    }
    return target
  }

  const finalTarget = parseTargetNumber(targetNumber)

  // Start counter animation when in view
  useEffect(() => {
    if (!isInView || hasStarted) return

    const timer = setTimeout(() => {
      setHasStarted(true)
      
      const steps = Math.ceil(finalTarget / step)
      const stepDuration = duration / steps
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep += 1
        const newValue = Math.min(currentStep * step, finalTarget)
        
        setCurrentNumber(newValue)

        if (newValue >= finalTarget) {
          clearInterval(interval)
          if (onComplete) {
            onComplete()
          }
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, hasStarted, finalTarget, duration, delay, step, onComplete])

  return (
    <span
      ref={elementRef}
      className="hero-stat-number animated-counter"
      style={{
        opacity: hasStarted ? 1 : 0.3,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      {currentNumber}{suffix}
    </span>
  )
}

export default AnimatedCounter