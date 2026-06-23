import React from 'react';

interface LoaderProps { size?: 'sm' | 'md' | 'lg'; className?: string; }

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'h-4 w-4 border-2', md: 'h-8 w-8 border-3', lg: 'h-12 w-12 border-4' };
  return <div className={`inline-block animate-spin rounded-full border-solid border-primary-500 border-t-transparent ${sizes[size]} ${className}`} />;
};

export const FullPageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen"><Loader size="lg" /></div>
);
