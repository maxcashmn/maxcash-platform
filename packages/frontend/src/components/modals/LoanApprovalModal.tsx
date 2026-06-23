import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { TextArea } from '../forms/TextArea';
import { formatCurrency } from '../../core/utils/formatters';

interface LoanApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (notes?: string) => void;
  onReject: (reason: string) => void;
  loan: {
    id: string;
    amount: number;
    purpose: string;
    termMonths: number;
    monthlyIncome: number;
    employmentStatus: string;
  } | null;
  loading?: boolean;
}

export const LoanApprovalModal: React.FC<LoanApprovalModalProps> = ({
  isOpen,
  onClose,
  onApprove,
  onReject,
  loan,
  loading = false,
}) => {
  const [notes, setNotes] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  if (!loan) return null;

  const handleSubmit = () => {
    if (action === 'approve') {
      onApprove(notes);
    } else if (action === 'reject') {
      onReject(rejectReason);
    }
  };

  const isActionValid = () => {
    if (action === 'reject') {
      return rejectReason.trim().length > 0;
    }
    return true;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Loan Application Review" size="lg">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-semibold">{formatCurrency(loan.amount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Term</p>
            <p className="font-semibold">{loan.termMonths} months</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Income</p>
            <p className="font-semibold">{formatCurrency(loan.monthlyIncome)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Employment Status</p>
            <p className="font-semibold">{loan.employmentStatus}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Purpose</p>
          <p className="text-gray-900">{loan.purpose}</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex gap-4 mb-4">
            <Button
              variant={action === 'approve' ? 'success' : 'outline'}
              onClick={() => setAction('approve')}
              fullWidth
            >
              ✅ Approve
            </Button>
            <Button
              variant={action === 'reject' ? 'danger' : 'outline'}
              onClick={() => setAction('reject')}
              fullWidth
            >
              ❌ Reject
            </Button>
          </div>

          {action === 'approve' && (
            <TextArea
              label="Notes (Optional)"
              placeholder="Add any notes about this approval..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          )}

          {action === 'reject' && (
            <TextArea
              label="Rejection Reason *"
              placeholder="Please provide a reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              required
            />
          )}

          <div className="flex gap-3 justify-end mt-4">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!action || !isActionValid()}
              loading={loading}
            >
              {action === 'approve' ? 'Approve' : action === 'reject' ? 'Reject' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
