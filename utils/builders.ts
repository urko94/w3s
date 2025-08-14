/**
 * Default action response builder
 */
export function ActionReturn(success: boolean, data: any) {
  return { success, data };
}

/**
 * @param {string} module
 * @param {string} method
 * @param {string} message
 * @returns {string} combined text
 */
export function StoreErrorMessage(module: string, method: string, message: string) {
  return `pinia${module ? `/${module}` : ''}${method ? `/${method}` : ''}${
    message ? `: ${message}` : ''
  }`;
}
