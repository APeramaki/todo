import { createContext } from "react";

export interface User {
  id?: number;
  password?: string;
  email: string;
  token: string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  signUp: () => Promise<void>;
  signIn: () => Promise<void>;
}
export const UserContext = createContext<UserContextType>({
  user: { email: "", token: "" },
  setUser: () => {},
  signUp: async () => {},
  signIn: async () => {},
});
