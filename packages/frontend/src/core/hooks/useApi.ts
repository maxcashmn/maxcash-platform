import { useState, useCallback } from 'react';
import { useToast } from './useToast';

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const useApi = <T, P = any>(
  apiFn: (params?: P) => Promise<any>,
  options: UseApiOptions = {}
) => {
  const { 
    showSuccessToast = false, 
    showErrorToast = true,
    successMessage = 'Operation successful',
    errorMessage = 'Operation failed',
  } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const toast = useToast();

  const execute = useCallback(
    async (params?: P): Promise<T | null> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await apiFn(params);
        const data = response.data || response;
        setState({ data, isLoading: false, error: null });
        
        if (showSuccessToast) {
          toast.success(successMessage);
        }
        
        return data;
      } catch (error: any) {
        const message = error.response?.data?.message || errorMessage;
        setState({ data: null, isLoading: false, error: message });
        
        if (showErrorToast) {
          toast.error(message);
        }
        
        return null;
      }
    },
    [apiFn, showSuccessToast, showErrorToast, successMessage, errorMessage, toast]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
