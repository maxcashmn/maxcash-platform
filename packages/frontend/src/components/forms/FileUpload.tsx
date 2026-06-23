import React, { useRef, useState } from 'react';

interface FileUploadProps {
  label?: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
  onFileSelect: (files: FileList | null) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  error,
  accept,
  multiple = false,
  onFileSelect,
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'} ${error ? 'border-red-500' : ''} ${className}`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => onFileSelect(e.target.files)}
        />
        <div className="text-gray-500">
          <span className="text-2xl block mb-2">📁</span>
          <p>Drag & drop files here, or click to browse</p>
          {accept && <p className="text-xs mt-1">Accepted: {accept}</p>}
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
