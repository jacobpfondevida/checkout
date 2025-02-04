import { AxiosError } from 'axios';

export const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export const handleApiError = (error: unknown): void => {
  if (isAxiosError(error)) {
    if (error.response) {
      console.error('Response error:', error.response.data);
      alert(`Request failed: ${error.response.data || 'An unknown error occurred'}`);
    } else if (error.request) {
      console.error('Request error:', error.request);
      alert(`Request failed: ${error.request}.`);
    }
  } else {
    console.error('Unknown error:', error);
    alert(`An unknown error occurred: ${error}. Please try again.`);
  }
};
