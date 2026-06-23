import React from 'react';

interface SkeletonProps { className?: string; variant?: 'text' | 'circular' | 'rectangular'; width?: string | number; height?: string | number; }

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'text', width, height }) => {
  const baseStyles = 'animate-pulse bg-gray-200 rounded';
  const variants = { text: 'rounded', circular: 'rounded-full', rectangular: 'rounded' };
  const styles = { width: width || (variant === 'text' ? '100%' : undefined), height: height || (variant === 'text' ? '1em' : variant === 'circular' ? '40px' : '100%') };
  return <div className={`${baseStyles} ${variants[variant]} ${className}`} style={styles} />;
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ lines = 1, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => <Skeleton key={i} variant="text" height="1em" />)}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
    <Skeleton variant="text" width="60%" height="24px" className="mb-4" />
    <SkeletonText lines={3} />
    <div className="mt-4 flex gap-2">
      <Skeleton variant="rectangular" width="80px" height="36px" />
      <Skeleton variant="rectangular" width="80px" height="36px" />
    </div>
  </div>
);
