import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LazyLoadErrorBoundary from './components/atoms/ErrorBoundary/LazyLoadErrorBoundary'

const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('LazyLoadErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for test environment
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    console.error.mockRestore()
  })

  test('renders children when there is no error', () => {
    render(
      <LazyLoadErrorBoundary>
        <ThrowError shouldThrow={false} />
      </LazyLoadErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  test('displays error UI when child component throws', () => {
    render(
      <LazyLoadErrorBoundary>
        <ThrowError shouldThrow={true} />
      </LazyLoadErrorBoundary>
    )

    expect(screen.getByText(/Щось пішло не так при завантаженні сторінки/)).toBeInTheDocument()
    expect(screen.getByText('Оновити сторінку')).toBeInTheDocument()
  })

  test('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <LazyLoadErrorBoundary>
        <ThrowError shouldThrow={true} />
      </LazyLoadErrorBoundary>
    )

    expect(screen.getByText('Error Details (Development)')).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  test('hides error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <LazyLoadErrorBoundary>
        <ThrowError shouldThrow={true} />
      </LazyLoadErrorBoundary>
    )

    expect(screen.queryByText('Error Details (Development)')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
})