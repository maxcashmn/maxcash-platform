import React from 'react';

interface TableProps { children: React.ReactNode; className?: string; }
interface TableHeaderProps { children: React.ReactNode; className?: string; }
interface TableRowProps { children: React.ReactNode; className?: string; onClick?: () => void; }
interface TableCellProps { children: React.ReactNode; className?: string; align?: 'left' | 'center' | 'right'; }

export const Table: React.FC<TableProps> = ({ children, className = '' }) => (
  <div className="overflow-x-auto">
    <table className={`w-full text-sm ${className}`}>{children}</table>
  </div>
);

export const TableHeader: React.FC<TableHeaderProps> = ({ children, className = '' }) => (
  <thead className={`bg-gray-50 ${className}`}><tr>{children}</tr></thead>
);

export const TableHeaderCell: React.FC<TableCellProps> = ({ children, className = '', align = 'left' }) => {
  const alignClasses = { left: 'text-left', center: 'text-center', right: 'text-right' };
  return <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${alignClasses[align]} ${className}`}>{children}</th>;
};

export const TableBody: React.FC<TableProps> = ({ children, className = '' }) => (
  <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>{children}</tbody>
);

export const TableRow: React.FC<TableRowProps> = ({ children, className = '', onClick }) => (
  <tr className={`${onClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${className}`} onClick={onClick}>{children}</tr>
);

export const TableCell: React.FC<TableCellProps> = ({ children, className = '', align = 'left' }) => {
  const alignClasses = { left: 'text-left', center: 'text-center', right: 'text-right' };
  return <td className={`px-6 py-4 whitespace-nowrap text-gray-900 ${alignClasses[align]} ${className}`}>{children}</td>;
};
