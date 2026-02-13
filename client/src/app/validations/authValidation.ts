type ValidationResult = {
  valid: boolean;
  error?: string;
};

export const validationResult = (
  value: string,
  message: string,
): ValidationResult => {
  if (!value) return { valid: false, error: message };
  return { valid: true };
};

export const verifyConfirmPasswordInputField = (
  password: string,
  confirmPassword: string,
  message: string,
) => {
  if (password !== confirmPassword) {
    return { valid: false, error: message };
  }
  return { valid: true };
};
