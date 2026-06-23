import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  details?: string;
  onAction?: () => void;
  actionText?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = 'Success!',
  message,
  details,
  onAction,
  actionText = 'Continue',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4 text-center">
        <div className="text-5xl">✅</div>
        <p className="text-gray-600">{message}</p>
        {details && <p className="text-sm text-gray-500">{details}</p>}
        <div className="flex gap-3 justify-center pt-2">
          {onAction ? (
            <Button onClick={onAction}>
              {actionText}
            </Button>
          ) : (
            <Button onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
