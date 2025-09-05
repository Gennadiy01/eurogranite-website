import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

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
  const elementRef = useRef(null)
  const controls = useAnimation()
  
  // Check if element is in view
  const isInView = useInView(elementRef, { threshold: 0.3, once: true })
  
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
      
      // Animate opacity
      controls.start({
        opacity: 1,
        transition: { duration: 0.3 }
      })
      
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
  }, [isInView, hasStarted, finalTarget, duration, delay, step, controls, onComplete])

  return (
    <motion.span 
      ref={elementRef}
      className="hero-stat-number animated-counter"
      initial={{ opacity: 0.3 }}
      animate={controls}
    >
      {currentNumber}{suffix}
    </motion.span>
  )
}

export default AnimatedCounter