type ValidationResult = {
  valid: boolean;
  error?: string;
};

export const validationResult = (
  value: string,
  errorMessage: string,
): ValidationResult => {
  if (!value) return { valid: false, error: errorMessage };
  return { valid: true };
};

export const verifyConfirmedPasswordInputField = (
  password: string,
  confirmPassword: string,
  errorMessage: string,
) => {
  if (password !== confirmPassword) {
    return { valid: false, error: errorMessage };
  }
  return { valid: true };
};
