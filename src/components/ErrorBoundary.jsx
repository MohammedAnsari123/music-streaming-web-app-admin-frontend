import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Admin Error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
                    <div className="bg-[#181818] p-8 rounded-lg shadow-2xl max-w-2xl w-full border border-red-900/30">
                        <h1 className="text-3xl font-bold mb-4 text-red-500 flex items-center gap-2">
                            Admin Panel Error
                        </h1>
                        <p className="text-gray-400 mb-6">
                            An unexpected error occurred in the dashboard.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition"
                            >
                                Reload Dashboard
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md transition"
                            >
                                Go Home
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mt-8 p-4 bg-black rounded text-left overflow-auto max-h-96 border border-gray-800">
                                <p className="text-red-400 font-mono text-sm mb-2">{this.state.error.toString()}</p>
                                <pre className="text-gray-500 font-mono text-xs whitespace-pre-wrap">
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
