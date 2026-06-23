import { apiClient } from './client';
import { endpoints } from './endpoints';

export interface InitiateTransferData {
  toUserId: string;
  amount: number;
  description?: string;
}

export const transferApi = {
  initiateTransfer: (data: InitiateTransferData) => apiClient.post(endpoints.transfers.create, data),
  listTransfers: () => apiClient.get(endpoints.transfers.list),
  getTransfer: (id: string) => apiClient.get(endpoints.transfers.get(id)),
  getTransferByReference: (reference: string) => apiClient.get(endpoints.transfers.byReference(reference)),
};
