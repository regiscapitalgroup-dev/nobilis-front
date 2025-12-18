type LoaderOverlayProps = {
  visible: boolean;
  message?: string;
};

export function LoaderOverlay({ visible, message }: LoaderOverlayProps) {
  if (!visible) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="spinner" />
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
