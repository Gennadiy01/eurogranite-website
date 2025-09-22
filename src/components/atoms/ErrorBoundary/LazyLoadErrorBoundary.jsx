import React from 'react'
import PropTypes from 'prop-types'

class LazyLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('LazyLoadErrorBoundary caught an error:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h2>Щось пішло не так при завантаженні сторінки</h2>
            <p>Спробуйте оновити сторінку або поверніться пізніше.</p>
            <button
              className="error-boundary__retry-btn"
              onClick={() => window.location.reload()}
            >
              Оновити сторінку
            </button>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary__details">
                <summary>Error Details (Development)</summary>
                <pre>{this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

LazyLoadErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

export default LazyLoadErrorBoundary