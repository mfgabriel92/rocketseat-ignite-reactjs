import axios from "axios";
import Router from "next/router";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { setCookies } from "../utils/cookies";

interface User {
  name: string;
  email: string;
  permissions: string[];
  roles: string[];
}

interface SignIn {
  email: string;
  password: string;
}

interface AuthContextProps {
  signIn: (credentials: SignIn) => Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    async function getMe() {
      const { "@rocketseatIgniteReactJSChapterIV_token": token } = parseCookies();
      if (token) {
        const response = await api.get("http://localhost:3333/me");
        const { name, email, permissions, roles } = response?.data;
        setUser({ name, email, permissions, roles });
      }
    }

    getMe();
  }, []);

  async function signIn({ email, password }: SignIn) {
    try {
      const response = await axios.post("http://localhost:3333/sessions", { email, password });
      const { name, token, refreshToken, permissions, roles } = response?.data;

      setUser({
        name,
        email,
        permissions,
        roles,
      });

      setCookies("token", token);
      setCookies("refreshToken", refreshToken);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
