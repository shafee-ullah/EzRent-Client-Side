import React from "react";
import { toast } from "react-hot-toast";

/**
 * PaymentErrorBoundary Component
 * Catches JavaScript errors anywhere in the payment component tree
 */
class PaymentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error("Payment Error Boundary caught an error:", error, errorInfo);

    // Show user-friendly error message
    toast.error(
      "Something went wrong with the payment system. Please try again."
    );

    // Ensure we have valid error info
    const safeErrorInfo = errorInfo || {
      componentStack: "No component stack available",
    };

    this.setState({
      error: error,
      errorInfo: safeErrorInfo,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Payment Error
            </h2>
            <p className="text-gray-600 mb-4">
              We encountered an unexpected error while processing your payment.
              This has been logged and our team will investigate.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Try Again
              </button>

              <button
                onClick={() => (window.location.href = "/dashboard/guest")}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Go to Dashboard
              </button>
            </div>

            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto">
                  {this.state.error
                    ? this.state.error.toString()
                    : "No error details available"}
                  {this.state.errorInfo && this.state.errorInfo.componentStack
                    ? `\n\nComponent Stack:\n${this.state.errorInfo.componentStack}`
                    : "\n\nNo component stack available"}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PaymentErrorBoundary;
