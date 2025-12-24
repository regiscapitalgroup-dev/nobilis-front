import { AxiosError } from 'axios';

type ApiErrorPayload = {
  message?: string;
  detail?: string;
  code?: string;
  errors?: any;
};

type HandleApiErrorOptions = {
  onUnauthorized?: () => void;
  onForbidden?: (data:any) => void;
  onNotFound?: () => void;
  onServerError?: () => void;
  onBadRequest?: (data:any) => void;
};

export function handleApiError(
  error: unknown,
  options?: HandleApiErrorOptions
): any {
  const err = error as AxiosError<ApiErrorPayload>;

  if (!err.response) {
    throw {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
  }

  const { status, data } = err.response;

  switch (status) {
    case 400:
      options?.onBadRequest?.(data);
      /* throw {
        status,
        message: data?.message || data?.detail || 'Bad request',
        data,
      }; */
      break;
    case 401:
      if (data?.code === 'token_not_valid') {
        options?.onUnauthorized?.();
      }
      /* throw {
        status,
        message: 'Session expired. Please log in again.',
        data,
      }; */
      break;
    case 403:
      options?.onForbidden?.(data);
      /* throw {
        status,
        message: 'You do not have permission to perform this action.',
        data,
      }; */
      break;
    case 404:
      options?.onNotFound?.();
      /* throw {
        status,
        message: 'Resource not found.',
        data,
      }; */
      break;
    case 500:
    default:
      options?.onServerError?.();
      /* throw {
        status,
        message: 'Unexpected server error.',
        data,
      }; */
      break;
  }
}

type ErrorObject = Record<string, string[]>;

export function parseApiErrors(errors: ErrorObject): string {
  if (!errors || typeof errors !== 'object') return '';

  return Object.entries(errors)
    .map(([field, messages]) => {
      if (!Array.isArray(messages)) return '';
      return `${field}: ${messages.join(', ')}`;
    })
    .filter(Boolean)
    .join(' | ');
}
