import { useCallback } from 'react';
import { showErrorAlert } from '../../helpers/alert';
import { AlertConfig } from '../../types/alert';

export const useAlert = () => {
  const showError = useCallback((config: AlertConfig) => {
    showErrorAlert(config);
  }, []);

  return { showError };
};