import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          color: '#ff6b6b',
          background: '#1e1e1e',
          borderRadius: '8px',
          margin: '1rem',
          fontFamily: 'monospace'
        }}>
          <h2>⚠️ Something went wrong rendering this section.</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem', color: '#ccc' }}>
            <summary style={{ cursor: 'pointer', color: '#ffa500' }}>
              Click to see error details
            </summary>
            <p style={{ color: '#ff6b6b' }}>{this.state.error && this.state.error.toString()}</p>
            <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </details>
          <button
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
          >
            🔄 Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
