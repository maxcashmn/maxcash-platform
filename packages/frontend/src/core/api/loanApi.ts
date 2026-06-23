import { apiClient } from './client';
import { endpoints } from './endpoints';

export interface ApplyLoanData {
  amount: number;
  termMonths: number;
  purpose: string;
  employmentStatus: string;
  monthlyIncome: number;
}

export const loanApi = {
  applyForLoan: (data: ApplyLoanData) => apiClient.post(endpoints.loans.create, data),
  listLoans: () => apiClient.get(endpoints.loans.list),
  getLoan: (id: string) => apiClient.get(endpoints.loans.get(id)),
  approveLoan: (id: string) => apiClient.patch(endpoints.loans.approve(id)),
  rejectLoan: (id: string, reason: string) => apiClient.patch(endpoints.loans.reject(id), { reason }),
  disburseLoan: (id: string) => apiClient.patch(endpoints.loans.disburse(id)),
  getActiveLoans: () => apiClient.get(endpoints.loans.active),
};
