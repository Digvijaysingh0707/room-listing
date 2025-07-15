import React from 'react';
import './ErrorBoundary.css';

const errorIcon = (
    <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="error-boundary__icon"
    >
        <circle cx="32" cy="32" r="32" fill="#ffeaea" />
        <path d="M32 18v20" stroke="#e53935" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="46" r="3" fill="#e53935" />
    </svg>
);

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Caught by Error Boundary:', error, errorInfo);
        // Optional: send to logging service
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    {errorIcon}
                    <h2 className="error-boundary__heading">Oops! Something went wrong.</h2>
                    <p className="error-boundary__message">
                        {this.state.error?.message || 'An unexpected error occurred.'}
                    </p>
                    <button onClick={this.handleReload} className="error-boundary__button">
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
