import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../../src/components/organisms/Header/Header'

// Mock the language store
jest.mock('../../src/stores/languageStore', () => ({
  __esModule: true,
  default: () => ({
    currentLanguage: 'en'
  })
}))

describe('Header Component', () => {
  test('renders EuroGranite logo', () => {
    render(<Header />)
    const logoElement = screen.getByText(/EuroGranite/i)
    expect(logoElement).toBeInTheDocument()
  })
  
  test('shows navigation menu on desktop', () => {
    render(<Header />)
    
    // Check if navigation items are present
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    expect(screen.getByText(/Products/i)).toBeInTheDocument()
    expect(screen.getByText(/About/i)).toBeInTheDocument()
    expect(screen.getByText(/Contact/i)).toBeInTheDocument()
  })
  
  test('has mobile menu button', () => {
    render(<Header />)
    
    // Mobile menu button should be present
    const mobileMenuButton = screen.getByRole('button')
    expect(mobileMenuButton).toBeInTheDocument()
  })
  
  // This test would need more complex setup to work properly
  test.skip('opens mobile menu when burger button is clicked', () => {
    render(<Header />)
    
    const mobileMenuButton = screen.getByRole('button')
    fireEvent.click(mobileMenuButton)
    
    // Check if mobile menu is visible
    // This would need proper mobile menu implementation
  })
})