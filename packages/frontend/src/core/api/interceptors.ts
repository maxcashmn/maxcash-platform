import { apiClient } from './client';

export const setupRetryInterceptor = () => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config;
      const shouldRetry = !error.response || error.response.status >= 500 || error.code === 'ECONNABORTED';
      
      if (!shouldRetry || !config || config._retryCount >= 3) {
        return Promise.reject(error);
      }
      
      config._retryCount = (config._retryCount || 0) + 1;
      const delay = Math.min(1000 * Math.pow(2, config._retryCount - 1), 10000);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return apiClient(config);
    }
  );
};

export const setupLoggingInterceptor = () => {
  if (import.meta.env.DEV) {
    apiClient.interceptors.request.use((config) => {
      console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`, config.data);
      return config;
    });
    
    apiClient.interceptors.response.use(
      (response) => {
        console.log(`✅ [${response.status}] ${response.config.url}`, response.data);
        return response;
      },
      (error) => {
        console.error(`❌ [${error.response?.status}] ${error.config?.url}`, error.response?.data);
        return Promise.reject(error);
      }
    );
  }
};
