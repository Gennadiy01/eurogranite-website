import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Main store for granite gallery, comparison and mockup system
const useGraniteSystemStore = create()(
  devtools(
    (set, get) => ({
      // Gallery state
      gallery: {
        isOpen: false,
        currentGroup: null,
        currentFilter: 'all', // for universal gallery filtering
        currentTextureIndex: 0,
        selectedTexture: null,
        selectedTextureId: null, // for direct texture access
        isLoading: false,
        error: null
      },

      // Comparison state
      comparison: {
        selectedTextures: [], // max 4 textures
        isComparisonOpen: false,
        compareMode: 'side-by-side', // 'side-by-side' | 'grid' | 'overlay'
        showProperties: true,
        isExporting: false
      },

      // Mockup visualization state
      mockup: {
        currentMockupId: 'kitchen-modern',
        appliedTextures: {}, // { zoneId: textureId }
        isVisualizationOpen: false,
        draggedTexture: null,
        hoveredZone: null,
        mockupHistory: [],
        currentHistoryIndex: -1
      },

      // UI state
      ui: {
        activeTab: 'gallery', // 'gallery' | 'comparison' | 'mockup'
        showTooltips: true,
        theme: 'light', // 'light' | 'dark'
        viewMode: 'desktop' // 'desktop' | 'mobile'
      },

      // Gallery actions
      openGallery: (groupId, textureIndex = 0) => {
        set((state) => ({
          gallery: {
            ...state.gallery,
            isOpen: true,
            currentGroup: groupId,
            currentTextureIndex: textureIndex,
            error: null
          }
        }))
      },

      // Universal Gallery actions (opens all textures with optional filter)
      openUniversalGallery: (filterId = 'all', textureIndex = 0) => {
        set((state) => ({
          gallery: {
            ...state.gallery,
            isOpen: true,
            currentGroup: null, // null means universal gallery
            currentFilter: filterId,
            currentTextureIndex: textureIndex,
            selectedTextureId: null, // Clear selected texture ID when using filter
            error: null
          }
        }))
      },

      // Open gallery directly at specific texture
      openGalleryAtTexture: (textureId, graniteTypes) => {
        set((state) => {
          // Create flat list of all textures to find global index
          const allTextures = [];
          graniteTypes.forEach(group => {
            group.textures.forEach(texture => {
              allTextures.push({ ...texture, groupName: group.name });
            });
          });

          // Find texture in the flat list
          const globalTextureIndex = allTextures.findIndex(texture => texture.id === textureId);

          if (globalTextureIndex !== -1) {
            return {
              gallery: {
                ...state.gallery,
                isOpen: true,
                currentGroup: null, // No filter, show all textures
                currentFilter: 'all',
                currentTextureIndex: globalTextureIndex,
                selectedTextureId: textureId,
                error: null
              }
            };
          }

          // Fallback: open universal gallery if texture not found
          return {
            gallery: {
              ...state.gallery,
              isOpen: true,
              currentGroup: null,
              currentFilter: 'all',
              currentTextureIndex: 0,
              selectedTextureId: textureId, // Still set the ID for fallback handling
              error: `Texture ${textureId} not found`
            }
          };
        })
      },

      closeGallery: () => {
        set((state) => ({
          gallery: {
            ...state.gallery,
            isOpen: false,
            currentGroup: null,
            currentFilter: 'all',
            currentTextureIndex: 0,
            selectedTexture: null,
            selectedTextureId: null
          }
        }))
      },

      // Set filter for universal gallery
      setGalleryFilter: (filterId) => {
        set((state) => ({
          gallery: {
            ...state.gallery,
            currentFilter: filterId,
            currentTextureIndex: 0 // reset to first texture when filtering
          }
        }))
      },

      selectTexture: (texture) => {
        set((state) => ({
          gallery: {
            ...state.gallery,
            selectedTexture: texture
          }
        }))
      },

      navigateTexture: (direction) => {
        set((state) => {
          const newIndex = direction === 'next' 
            ? state.gallery.currentTextureIndex + 1
            : state.gallery.currentTextureIndex - 1
          
          return {
            gallery: {
              ...state.gallery,
              currentTextureIndex: Math.max(0, newIndex)
            }
          }
        })
      },

      setGalleryLoading: (isLoading) => {
        set((state) => ({
          gallery: {
            ...state.gallery,
            isLoading
          }
        }))
      },

      setGalleryError: (error) => {
        set((state) => ({
          gallery: {
            ...state.gallery,
            error,
            isLoading: false
          }
        }))
      },

      // Comparison actions
      addToComparison: (texture) => {
        set((state) => {
          // Max 4 textures for comparison
          if (state.comparison.selectedTextures.length >= 4) {
            return state
          }

          // Check if texture already exists
          const exists = state.comparison.selectedTextures.find(t => t.id === texture.id)
          if (exists) {
            return state
          }

          return {
            comparison: {
              ...state.comparison,
              selectedTextures: [...state.comparison.selectedTextures, texture]
            }
          }
        })
      },

      removeFromComparison: (textureId) => {
        set((state) => ({
          comparison: {
            ...state.comparison,
            selectedTextures: state.comparison.selectedTextures.filter(t => t.id !== textureId)
          }
        }))
      },

      clearComparison: () => {
        set((state) => ({
          comparison: {
            ...state.comparison,
            selectedTextures: []
          }
        }))
      },

      openComparison: () => {
        set((state) => ({
          comparison: {
            ...state.comparison,
            isComparisonOpen: true
          },
          ui: {
            ...state.ui,
            activeTab: 'comparison'
          }
        }))
      },

      closeComparison: () => {
        set((state) => ({
          comparison: {
            ...state.comparison,
            isComparisonOpen: false
          }
        }))
      },

      setCompareMode: (mode) => {
        set((state) => ({
          comparison: {
            ...state.comparison,
            compareMode: mode
          }
        }))
      },

      toggleProperties: () => {
        set((state) => ({
          comparison: {
            ...state.comparison,
            showProperties: !state.comparison.showProperties
          }
        }))
      },

      setExporting: (isExporting) => {
        set((state) => ({
          comparison: {
            ...state.comparison,
            isExporting
          }
        }))
      },

      // Mockup actions
      selectMockup: (mockupId) => {
        set((state) => ({
          mockup: {
            ...state.mockup,
            currentMockupId: mockupId
          }
        }))
      },

      applyTextureToZone: (zoneId, textureId) => {
        set((state) => {
          const newAppliedTextures = {
            ...state.mockup.appliedTextures,
            [zoneId]: textureId
          }

          // Add to history
          const newHistory = [
            ...state.mockup.mockupHistory.slice(0, state.mockup.currentHistoryIndex + 1),
            { appliedTextures: newAppliedTextures, timestamp: Date.now() }
          ]

          return {
            mockup: {
              ...state.mockup,
              appliedTextures: newAppliedTextures,
              mockupHistory: newHistory,
              currentHistoryIndex: newHistory.length - 1
            }
          }
        })
      },

      removeTextureFromZone: (zoneId) => {
        set((state) => {
          const newAppliedTextures = { ...state.mockup.appliedTextures }
          delete newAppliedTextures[zoneId]

          // Add to history
          const newHistory = [
            ...state.mockup.mockupHistory.slice(0, state.mockup.currentHistoryIndex + 1),
            { appliedTextures: newAppliedTextures, timestamp: Date.now() }
          ]

          return {
            mockup: {
              ...state.mockup,
              appliedTextures: newAppliedTextures,
              mockupHistory: newHistory,
              currentHistoryIndex: newHistory.length - 1
            }
          }
        })
      },

      clearMockup: () => {
        set((state) => {
          const newHistory = [
            ...state.mockup.mockupHistory,
            { appliedTextures: {}, timestamp: Date.now() }
          ]

          return {
            mockup: {
              ...state.mockup,
              appliedTextures: {},
              mockupHistory: newHistory,
              currentHistoryIndex: newHistory.length - 1
            }
          }
        })
      },

      openVisualization: () => {
        set((state) => ({
          mockup: {
            ...state.mockup,
            isVisualizationOpen: true
          },
          ui: {
            ...state.ui,
            activeTab: 'mockup'
          }
        }))
      },

      closeVisualization: () => {
        set((state) => ({
          mockup: {
            ...state.mockup,
            isVisualizationOpen: false
          }
        }))
      },

      setDraggedTexture: (texture) => {
        set((state) => ({
          mockup: {
            ...state.mockup,
            draggedTexture: texture
          }
        }))
      },

      setHoveredZone: (zoneId) => {
        set((state) => ({
          mockup: {
            ...state.mockup,
            hoveredZone: zoneId
          }
        }))
      },

      // History actions
      undoMockup: () => {
        set((state) => {
          if (state.mockup.currentHistoryIndex > 0) {
            const newIndex = state.mockup.currentHistoryIndex - 1
            const historyItem = state.mockup.mockupHistory[newIndex]
            
            return {
              mockup: {
                ...state.mockup,
                appliedTextures: historyItem.appliedTextures,
                currentHistoryIndex: newIndex
              }
            }
          }
          return state
        })
      },

      redoMockup: () => {
        set((state) => {
          if (state.mockup.currentHistoryIndex < state.mockup.mockupHistory.length - 1) {
            const newIndex = state.mockup.currentHistoryIndex + 1
            const historyItem = state.mockup.mockupHistory[newIndex]
            
            return {
              mockup: {
                ...state.mockup,
                appliedTextures: historyItem.appliedTextures,
                currentHistoryIndex: newIndex
              }
            }
          }
          return state
        })
      },

      // UI actions
      setActiveTab: (tab) => {
        set((state) => ({
          ui: {
            ...state.ui,
            activeTab: tab
          }
        }))
      },

      toggleTooltips: () => {
        set((state) => ({
          ui: {
            ...state.ui,
            showTooltips: !state.ui.showTooltips
          }
        }))
      },

      setTheme: (theme) => {
        set((state) => ({
          ui: {
            ...state.ui,
            theme
          }
        }))
      },

      setViewMode: (viewMode) => {
        set((state) => ({
          ui: {
            ...state.ui,
            viewMode
          }
        }))
      },

      // Reset actions
      resetGallery: () => {
        set((state) => ({
          gallery: {
            isOpen: false,
            currentGroup: null,
            currentFilter: 'all',
            currentTextureIndex: 0,
            selectedTexture: null,
            selectedTextureId: null,
            isLoading: false,
            error: null
          }
        }))
      },

      resetComparison: () => {
        set((state) => ({
          comparison: {
            selectedTextures: [],
            isComparisonOpen: false,
            compareMode: 'side-by-side',
            showProperties: true,
            isExporting: false
          }
        }))
      },

      resetMockup: () => {
        set((state) => ({
          mockup: {
            currentMockupId: 'kitchen-modern',
            appliedTextures: {},
            isVisualizationOpen: false,
            draggedTexture: null,
            hoveredZone: null,
            mockupHistory: [],
            currentHistoryIndex: -1
          }
        }))
      },

      resetAll: () => {
        const { resetGallery, resetComparison, resetMockup } = get()
        resetGallery()
        resetComparison()
        resetMockup()
        
        set((state) => ({
          ui: {
            activeTab: 'gallery',
            showTooltips: true,
            theme: 'light',
            viewMode: 'desktop'
          }
        }))
      }
    }),
    {
      name: 'granite-system-store',
      partialize: (state) => ({
        ui: {
          showTooltips: state.ui.showTooltips,
          theme: state.ui.theme
        },
        comparison: {
          selectedTextures: state.comparison.selectedTextures
        },
        mockup: {
          currentMockupId: state.mockup.currentMockupId,
          appliedTextures: state.mockup.appliedTextures
        }
      })
    }
  )
)

export default useGraniteSystemStore