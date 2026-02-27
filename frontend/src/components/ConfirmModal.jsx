import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ConfirmModal = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-10 backdrop-blur-sm ${
        darkMode ? "bg-slate-900/70" : "bg-slate-900/40"
      }`}
    >
      <div className="surface-card w-full max-w-sm p-8 text-center">
        <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
          {title}
        </h2>
        <p className={`mt-3 text-sm ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
          {message}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={onConfirm}
            className={`rounded-xl px-5 py-3 text-sm font-semibold ${
              darkMode
                ? "bg-rose-500 text-white hover:bg-rose-400"
                : "bg-rose-500 text-white hover:bg-rose-600"
            }`}
          >
            {confirmText || "Confirm"}
          </button>
          <button
            onClick={onCancel}
            className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
              darkMode
                ? "border-slate-700 text-slate-200"
                : "border-slate-300 text-slate-700"
            }`}
          >
            {cancelText || "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;