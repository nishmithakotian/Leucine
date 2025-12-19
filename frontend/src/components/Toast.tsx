interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "12px 16px",
        backgroundColor: type === "success" ? "#4caf50" : "#f44336",
        color: "white",
        borderRadius: "4px",
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
}

export default Toast;
