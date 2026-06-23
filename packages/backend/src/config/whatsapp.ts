// In Cloudflare Workers, environment variables are directly available via `env`
// @ts-ignore - env is available in Workers environment
const getEnv = (key: string): string => {
  // @ts-ignore - env is available in Workers environment
  if (typeof env !== 'undefined' && env[key]) {
    // @ts-ignore - env is available in Workers environment
    return env[key];
  }
  // Fallback for local development with process.env
  // @ts-ignore - process is available in Node.js environment
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    // @ts-ignore - process is available in Node.js environment
    return process.env[key] as string;
  }
  return '';
};

export const whatsappConfig = {
  phoneNumberId: getEnv('WHATSAPP_PHONE_NUMBER_ID'),
  accessToken: getEnv('WHATSAPP_ACCESS_TOKEN'),
  businessAccountId: getEnv('WHATSAPP_BUSINESS_ACCOUNT_ID'),
  apiVersion: 'v25.0',
  baseUrl: 'https://graph.facebook.com',
  rateLimit: {
    maxPerMinute: 10,
    maxPerHour: 100,
    maxPerDay: 1000,
  },
  templates: {
    welcome: 'welcome_message',
    loanApproved: 'loan_approved',
    loanRejected: 'loan_rejected',
    paymentConfirmed: 'payment_confirmed',
    paymentOverdue: 'payment_overdue',
  },
} as const;

export type WhatsAppConfig = typeof whatsappConfig;
