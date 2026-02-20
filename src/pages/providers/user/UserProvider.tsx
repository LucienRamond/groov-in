import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { ProfileType } from "../../../utils/types/profileType";

interface Props {
  children?: React.ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState<ProfileType | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/user/@me`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data: ProfileType) => !data.id && setUser(null));
  }, [BASE_URL]);

  function setUserData(user_data: ProfileType | null) {
    setUser(user_data);
  }

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
