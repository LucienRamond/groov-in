import { useState } from "react";
import { ToastContext } from "./toastContext";
import ToastComponent from "../../components/ToastComponent";

interface Props {
  children?: React.ReactNode;
}

interface Toast {
  title: string;
  description: string;
}

const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toast, setToast] = useState<Toast | undefined>(undefined);

  const toggleToastHandler = ({ title, description }: Toast) => {
    if (title === "") {
      setToast(undefined);
    } else {
      setToast({
        title: title,
        description: description,
      });
    }
  };

  return (
    <ToastContext.Provider
      value={{
        toggleToast: ({ title, description }: Toast) =>
          toggleToastHandler({ title, description }),
      }}
    >
      {children}
      {toast && (
        <ToastComponent title={toast?.title} description={toast?.description} />
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
