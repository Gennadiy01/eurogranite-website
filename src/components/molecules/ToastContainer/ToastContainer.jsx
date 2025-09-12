import React from 'react'
import Toast from '../../atoms/Toast'
import useToastStore from '../../../stores/toastStore'

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore()
  
  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

export default ToastContainer