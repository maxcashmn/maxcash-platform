import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  error?: string;
  onRetry?: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title = 'Error',
  message,
  error,
  onRetry,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <p className="text-gray-600">{message}</p>
          {error && (
            <p className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          {onRetry && (
            <Button onClick={onRetry}>
              Try Again
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
