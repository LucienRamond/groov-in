import { createContext } from "react";

type Toast = {
  title: string;
  description: string;
};

interface ContextProps {
  toggleToast: (arg0: Toast) => void;
}

export const ToastContext = createContext<ContextProps>({
  toggleToast: () => {},
});
