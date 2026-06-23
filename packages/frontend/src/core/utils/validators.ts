export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(phone);
};

export const isValidUUID = (id: string): boolean => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(id);
};

export const isValidAmount = (amount: number): boolean => {
  return amount > 0 && Number.isFinite(amount);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const isValidPercentage = (value: number): boolean => {
  return value >= 0 && value <= 100;
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\s/g, '');
  return /^\+?[0-9]{7,15}$/.test(cleaned);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
