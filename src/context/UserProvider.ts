import React, { useState, createElement } from "react";
import { UserContext, type User } from "./UserContext";
import axios from "axios";

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({
  children,
}: UserProviderProps): React.JSX.Element {
  const userFromStorage = sessionStorage.getItem("user");
  const [user, setUser] = useState<User>(
    userFromStorage
      ? JSON.parse(userFromStorage)
      : { email: "", token: "", password: "" }
  );

  const signUp = async () => {
    const headers = { headers: { "Content-Type": "application/json" } };
    await axios.post(
      `${import.meta.env.VITE_API_URL}/user/signup`,
      { user: user },
      headers
    );
    setUser({ email: "", token: "", password: "" });
  };

  const signIn = async () => {
    const headers = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post<User>(
      `${import.meta.env.VITE_API_URL}/user/signin`,
      { user: user },
      headers
    );
    setUser(response.data);
    sessionStorage.setItem("user", JSON.stringify(response.data));
  };
  return createElement(
    UserContext.Provider,
    { value: { user, setUser, signUp, signIn } },
    children
  );
}
