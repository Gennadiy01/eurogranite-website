import { render, screen } from '@testing-library/react'
import Hero from '../../src/components/organisms/Hero/Hero'

// Mock the language store
jest.mock('../../src/stores/languageStore', () => ({
  __esModule: true,
  default: () => ({
    currentLanguage: 'en'
  })
}))

describe('Hero Component', () => {
  test('renders hero title', () => {
    render(<Hero />)
    
    const titleElement = screen.getByText(/Premium Granite Products/i)
    expect(titleElement).toBeInTheDocument()
  })
  
  test('renders hero subtitle', () => {
    render(<Hero />)
    
    const subtitleElement = screen.getByText(/for European Markets/i)
    expect(subtitleElement).toBeInTheDocument()
  })
  
  test('renders hero description', () => {
    render(<Hero />)
    
    const descriptionElement = screen.getByText(/Leading manufacturer/i)
    expect(descriptionElement).toBeInTheDocument()
  })
  
  test('renders call-to-action buttons', () => {
    render(<Hero />)
    
    const catalogButton = screen.getByText(/View Catalog/i)
    const quoteButton = screen.getByText(/Get Quote/i)
    
    expect(catalogButton).toBeInTheDocument()
    expect(quoteButton).toBeInTheDocument()
  })
  
  test('renders statistics section', () => {
    render(<Hero />)
    
    // Check for stats numbers
    expect(screen.getByText(/15\+/)).toBeInTheDocument()
    expect(screen.getByText(/500\+/)).toBeInTheDocument()
    expect(screen.getByText(/25/)).toBeInTheDocument()
    
    // Check for stats labels
    expect(screen.getByText(/Years Experience/i)).toBeInTheDocument()
    expect(screen.getByText(/Projects/i)).toBeInTheDocument()
    expect(screen.getByText(/EU Countries/i)).toBeInTheDocument()
  })
})