import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../core/hooks/useToast';
import { useApi } from '../../core/hooks/useApi';
import { loanApi, ApplyLoanData } from '../../core/api/loanApi';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const LoanApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ApplyLoanData & { confirmTerms?: boolean }>({
    amount: 0,
    termMonths: 12,
    purpose: '',
    employmentStatus: '',
    monthlyIncome: 0,
    confirmTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.confirmTerms) {
      toast.error('Please confirm you agree to the terms and conditions');
      return;
    }

    if (formData.amount <= 0) {
      toast.error('Please enter a valid loan amount');
      return;
    }

    if (formData.monthlyIncome <= 0) {
      toast.error('Please enter your monthly income');
      return;
    }

    setLoading(true);

    try {
      const response = await loanApi.applyForLoan({
        amount: formData.amount,
        termMonths: formData.termMonths,
        purpose: formData.purpose,
        employmentStatus: formData.employmentStatus,
        monthlyIncome: formData.monthlyIncome,
      });

      toast.success('Loan application submitted successfully!');
      navigate('/my-loans');
    } catch (error) {
      toast.error('Failed to submit loan application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Loan Amount ($)"
              type="number"
              placeholder="5000"
              min="1"
              value={formData.amount || ''}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              required
            />
            <Input
              label="Term (Months)"
              type="number"
              placeholder="12"
              min="1"
              max="60"
              value={formData.termMonths || ''}
              onChange={(e) => setFormData({ ...formData, termMonths: Number(e.target.value) })}
              required
            />
          </div>

          <Input
            label="Loan Purpose"
            placeholder="e.g., Business expansion, Education, Home improvement"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            required
          />

          <Input
            label="Employment Status"
            placeholder="e.g., Employed, Self-employed, Business owner"
            value={formData.employmentStatus}
            onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
            required
          />

          <Input
            label="Monthly Income ($)"
            type="number"
            placeholder="3000"
            min="1"
            value={formData.monthlyIncome || ''}
            onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
            required
          />
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="confirmTerms"
            checked={formData.confirmTerms}
            onChange={(e) => setFormData({ ...formData, confirmTerms: e.target.checked })}
            className="mt-1"
          />
          <label htmlFor="confirmTerms" className="text-sm text-gray-600">
            I confirm that the information provided is accurate and I agree to the
            terms and conditions of the loan agreement.
          </label>
        </div>
      </Card>

      <Button type="submit" loading={loading} fullWidth size="lg">
        Submit Application
      </Button>
    </form>
  );
};
