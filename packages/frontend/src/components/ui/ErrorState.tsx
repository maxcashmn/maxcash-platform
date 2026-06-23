import React from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content.',
  error,
  onRetry,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-5xl mb-4">❌</div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
      {error && (
        <p className="mt-2 text-xs text-red-500">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
};
