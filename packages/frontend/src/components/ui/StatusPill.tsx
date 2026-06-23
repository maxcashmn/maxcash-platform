import React from 'react';

interface StatusPillProps {
  status: string;
  className?: string;
  statusMap?: Record<string, { label: string; color: string }>;
}

const defaultStatusMap: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800' },
  inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  suspended: { label: 'Suspended', color: 'bg-red-100 text-red-800' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
  under_review: { label: 'Under Review', color: 'bg-blue-100 text-blue-800' },
  disbursed: { label: 'Disbursed', color: 'bg-indigo-100 text-indigo-800' },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-800' },
  defaulted: { label: 'Defaulted', color: 'bg-red-100 text-red-800' },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-800' },
};

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  className = '',
  statusMap = defaultStatusMap,
}) => {
  const statusConfig = statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color} ${className}`}>
      {statusConfig.label}
    </span>
  );
};
