import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "1",
          name: "Leo K",
          email: "XXXXXXXXXXXXX",
          avatar: "leo,png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
