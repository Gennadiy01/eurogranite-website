import { create } from 'zustand'

const useModalStore = create((set, get) => ({
  // State
  isOpen: false,
  modalType: null,
  modalData: null,
  
  // Actions
  openModal: (type, data = null) => {
    set({
      isOpen: true,
      modalType: type,
      modalData: data
    })
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  },
  
  closeModal: () => {
    set({
      isOpen: false,
      modalType: null,
      modalData: null
    })
    // Restore body scroll
    document.body.style.overflow = 'unset'
  },
  
  // Specific modal openers
  openGraniteModal: (graniteType) => {
    const { openModal } = get()
    openModal('granite', graniteType)
  },
  
  openImageModal: (imageData) => {
    const { openModal } = get()
    openModal('image', imageData)
  },
  
  openContactModal: () => {
    const { openModal } = get()
    openModal('contact')
  }
}))

export default useModalStore