import React from 'react';
import { Button } from '../ui/Button';

interface FormActionsProps {
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  submitText = 'Submit',
  cancelText = 'Cancel',
  loading = false,
  className = '',
}) => {
  return (
    <div className={`flex gap-3 justify-end ${className}`}>
      {onCancel && (
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          {cancelText}
        </Button>
      )}
      <Button type="submit" loading={loading}>
        {submitText}
      </Button>
    </div>
  );
};
