import type { ErrorInfo, ReactNode } from "react";
import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div className="d-flex justify-center">
            <img className="w-600" src="/src/components/images/500.png" alt="Error" />
          </div>
          <h5 className="font-bold text-center mt-10">OOPS!!</h5>
          <div className="text-center ft-sz mt-10">
            Sorry, server encountered an unexpected error and could not complete your request now. Please try again!
          </div>
          <div className="d-flex justify-center mt-10"></div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;