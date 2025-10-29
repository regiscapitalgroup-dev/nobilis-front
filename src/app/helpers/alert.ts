import Swal from 'sweetalert2';
import { ALERT_COLORS, COMPANY_LOGO_SVG } from '../constants/alert';
import { AlertConfig } from '../types/alert';

export const showErrorAlert = (config: AlertConfig): void => {
    Swal.fire({
        html: `
      <div style="text-align: center; padding: 20px;">
        <div style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 30px; display: flex; align-items: center; justify-content: center;">
          ${COMPANY_LOGO_SVG}
        </div>
        <h2 style="font-family: Oswald, sans-serif; font-weight: 500; color: ${ALERT_COLORS.primary}; font-size: 32px; margin-bottom: 20px; line-height: 1.2;">
          ${config.title}
        </h2>
        <p style="font-family: Satoshi, sans-serif; font-weight: 300; color: ${ALERT_COLORS.secondary}; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">
          ${config.message}
        </p>
        ${config.errorCode ? `
          <p style="font-family: Satoshi, sans-serif; font-weight: 300; color: ${ALERT_COLORS.tertiary}; font-size: 12px; line-height: 1.4;">
            Error Code: ${config.errorCode}
          </p>
        ` : ''}
      </div>
    `,
        showCloseButton: false,
        showConfirmButton: true,
        confirmButtonText: config.confirmButtonText || 'Close',
        customClass: {
            popup: 'custom-popup',
            confirmButton: 'custom-button',
        },
        buttonsStyling: false,
    }).then((result) => {
        if (result.isConfirmed && config.onConfirm) {
            config.onConfirm();
        }
    });
};