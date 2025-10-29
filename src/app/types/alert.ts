export type AlertConfig = {
    title: string;
    message: string;
    errorCode?: string;
    confirmButtonText?: string;
    onConfirm?: () => void;
};