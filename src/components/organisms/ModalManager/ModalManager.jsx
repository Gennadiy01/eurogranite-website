import React from 'react'
import useModalStore from '../../../stores/modalStore'
import GraniteModal from '../GraniteModal'

const ModalManager = () => {
  const { isOpen, modalType, modalData } = useModalStore()
  
  if (!isOpen) return null
  
  const renderModal = () => {
    switch (modalType) {
      case 'granite':
        return <GraniteModal granite={modalData} />
      case 'image':
        // Will implement in future phases
        return null
      case 'contact':
        // Will implement in future phases  
        return null
      default:
        return null
    }
  }
  
  return renderModal()
}

export default ModalManager