import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center p-8">
          <div className="text-6xl animate-[float_3s_ease-in-out_infinite]">⚠️</div>
          <h2 className="font-orbitron text-2xl font-bold text-sky-500 dark:text-accent-cyan">
            Something went wrong
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            className="
              mt-2 px-8 py-3 rounded-full font-orbitron text-sm font-bold tracking-widest
              text-white bg-gradient-to-r from-sky-500 to-violet-600
              shadow-[0_0_20px_rgba(14,165,233,0.3)]
              hover:opacity-90 hover:-translate-y-0.5
              transition-all duration-200
            "
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
