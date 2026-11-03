export const ErrorGet = (response: any): string => {
  let errorString = 'There was a server error.';

  if (typeof response === 'string') return response || errorString;

  if (typeof response?.message === 'string' && response.message) {
    errorString = response.message;
  }
  if (typeof response?.detail === 'string' && response.detail) {
    errorString = response.detail;
  }
  if (Array.isArray(response)) {
    const location = typeof response[0]?.location === 'string' ? response[0].location : '';
    const message = typeof response[0]?.message === 'string' ? response[0].message : '';
    errorString = [location, message].filter(Boolean).join(': ') || errorString;
  }
  if (Array.isArray(response?.errors) && typeof response.errors[0]?.message === 'string' && response.errors[0].message) {
    errorString = response.errors[0].message;
  }
  return errorString;
}
