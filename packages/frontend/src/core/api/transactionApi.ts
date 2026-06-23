import { apiClient } from './client';
import { endpoints } from './endpoints';

export interface CreateTransactionData {
  type: string;
  amount: number;
  description?: string;
  metadata?: Record<string, any>;
}

export const transactionApi = {
  createTransaction: (data: CreateTransactionData) => apiClient.post(endpoints.transactions.create, data),
  listTransactions: () => apiClient.get(endpoints.transactions.list),
  getTransaction: (id: string) => apiClient.get(endpoints.transactions.get(id)),
  getTransactionByReference: (reference: string) => apiClient.get(endpoints.transactions.byReference(reference)),
};
