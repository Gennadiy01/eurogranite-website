import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LazyLoadErrorBoundary from './LazyLoadErrorBoundary'

// Component that throws an error for testing
const ErrorThrowingComponent = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Test error for ErrorBoundary')
  }
  return <div data-testid="success-component">Component loaded successfully</div>
}

// Component that works normally
const WorkingComponent = () => {
  return <div data-testid="working-component">Working component</div>
}

describe('LazyLoadErrorBoundary', () => {
  let consoleErrorSpy

  beforeEach(() => {
    // Suppress console.error for error boundary tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore()
    }
  })

  test('renders children when there is no error', () => {
    render(
      <LazyLoadErrorBoundary>
        <WorkingComponent />
      </LazyLoadErrorBoundary>
    )

    expect(screen.getByTestId('working-component')).toBeInTheDocument()
    expect(screen.getByText('Working component')).toBeInTheDocument()
  })

  test('renders error fallback UI when child component throws error', () => {
    render(
      <LazyLoadErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </LazyLoadErrorBoundary>
    )

    // Should show error message
    expect(screen.getByText(/щось пішло не так/i)).toBeInTheDocument()
    expect(screen.getByText(/оновити сторінку або поверніться пізніше/i)).toBeInTheDocument()

    // Should not show the working component
    expect(screen.queryByTestId('success-component')).not.toBeInTheDocument()
  })

  test('does not render error UI when component loads successfully', () => {
    render(
      <LazyLoadErrorBoundary>
        <ErrorThrowingComponent shouldThrow={false} />
      </LazyLoadErrorBoundary>
    )

    expect(screen.getByTestId('success-component')).toBeInTheDocument()
    expect(screen.queryByText(/щось пішло не так/i)).not.toBeInTheDocument()
  })

  test('contains refresh button in error state', () => {
    render(
      <LazyLoadErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </LazyLoadErrorBoundary>
    )

    const refreshButton = screen.getByRole('button', { name: /оновити сторінку/i })
    expect(refreshButton).toBeInTheDocument()
  })

  test('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <LazyLoadErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </LazyLoadErrorBoundary>
    )

    // In development, should show error details
    expect(screen.getByText(/Error Details/i)).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  test('hides error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <LazyLoadErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </LazyLoadErrorBoundary>
    )

    // In production, should not show error details
    expect(screen.queryByText(/Error Details/i)).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  test('logs error to console in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <LazyLoadErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </LazyLoadErrorBoundary>
    )

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('LazyLoadErrorBoundary caught an error:'),
      expect.any(Error),
      expect.any(Object)
    )

    consoleSpy.mockRestore()
    process.env.NODE_ENV = originalEnv
  })

  test('handles multiple children correctly', () => {
    render(
      <LazyLoadErrorBoundary>
        <WorkingComponent />
        <div data-testid="additional-content">Additional content</div>
      </LazyLoadErrorBoundary>
    )

    expect(screen.getByTestId('working-component')).toBeInTheDocument()
    expect(screen.getByTestId('additional-content')).toBeInTheDocument()
  })

  test('error boundary resets when children change', () => {
    const { rerender } = render(
      <LazyLoadErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </LazyLoadErrorBoundary>
    )

    // Should show error UI
    expect(screen.getByText(/щось пішло не так/i)).toBeInTheDocument()

    // Re-render with working component
    rerender(
      <LazyLoadErrorBoundary>
        <WorkingComponent />
      </LazyLoadErrorBoundary>
    )

    // Should still show error UI (ErrorBoundary doesn't auto-reset)
    expect(screen.getByText(/щось пішло не так/i)).toBeInTheDocument()
  })
})