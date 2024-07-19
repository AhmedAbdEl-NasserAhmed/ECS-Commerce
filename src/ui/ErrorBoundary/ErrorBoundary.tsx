import Link from "next/link";
import React, { ReactNode, ErrorInfo, ReactElement } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  errorComponent?: ReactElement; // Error component should be of type ReactElement
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CustomErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can use your own error logging service here
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.errorComponent) {
        return this.props.errorComponent;
      }
      console.log(this.state);

      return (
        <div className="text-4xl h-screen flex justify-center items-center flex-col bg-gray-100 gap-12">
          <h2>Oops, there is an error!</h2>
          <Link href="/" className="bg-black text-white p-4 rounded-md">
            Try again?
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CustomErrorBoundary;
