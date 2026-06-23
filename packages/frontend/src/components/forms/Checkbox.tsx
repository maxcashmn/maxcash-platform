import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        className={`mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 ${className}`}
        {...props}
      />
      <div>
        <label className="text-sm text-gray-700">{label}</label>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};
