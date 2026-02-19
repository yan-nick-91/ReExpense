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
