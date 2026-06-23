import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { formatCurrency, formatDate, formatRelativeTime } from '../../core/utils/formatters';
import { capitalize } from '../../core/utils/formatters';

interface LoanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: {
    id: string;
    amount: number;
    interestRate: number;
    termMonths: number;
    purpose: string;
    status: string;
    monthlyPayment?: number;
    totalRepayment?: number;
    totalInterest?: number;
    approvedBy?: string;
    approvedAt?: string;
    disbursedAt?: string;
    createdAt: string;
  } | null;
  onAction?: (action: 'approve' | 'reject' | 'disburse') => void;
}

export const LoanDetailsModal: React.FC<LoanDetailsModalProps> = ({
  isOpen,
  onClose,
  loan,
  onAction,
}) => {
  if (!loan) return null;

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      disbursed: 'bg-indigo-100 text-indigo-800',
      active: 'bg-emerald-100 text-emerald-800',
      completed: 'bg-gray-100 text-gray-800',
      defaulted: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Loan Details" size="lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Loan Amount</p>
            <p className="text-lg font-semibold">{formatCurrency(loan.amount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Interest Rate</p>
            <p className="text-lg font-semibold">{loan.interestRate}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Term</p>
            <p className="text-lg font-semibold">{loan.termMonths} months</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
              {capitalize(loan.status.replace('_', ' '))}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Purpose</p>
          <p className="text-gray-900">{loan.purpose}</p>
        </div>

        {loan.monthlyPayment && (
          <Card>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Payment</p>
                <p className="font-semibold">{formatCurrency(loan.monthlyPayment)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Repayment</p>
                <p className="font-semibold">{formatCurrency(loan.totalRepayment || 0)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="font-semibold">{formatCurrency(loan.totalInterest || 0)}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="text-sm text-gray-500">
          <p>Created: {formatRelativeTime(loan.createdAt)}</p>
          {loan.approvedAt && <p>Approved: {formatDate(loan.approvedAt)}</p>}
          {loan.disbursedAt && <p>Disbursed: {formatDate(loan.disbursedAt)}</p>}
        </div>

        {onAction && (
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            {loan.status === 'pending' && (
              <>
                <Button variant="outline" onClick={() => onAction('reject')}>
                  Reject
                </Button>
                <Button variant="success" onClick={() => onAction('approve')}>
                  Approve
                </Button>
              </>
            )}
            {loan.status === 'approved' && (
              <Button variant="primary" onClick={() => onAction('disburse')}>
                Disburse
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
