import { createContext } from "react";
import { ProfileType } from "../../../utils/types/profileType";

interface ContextProps {
  user: ProfileType | null;
  setUser: (arg0: ProfileType | null) => void;
}

const initialState = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<ContextProps>(initialState);
