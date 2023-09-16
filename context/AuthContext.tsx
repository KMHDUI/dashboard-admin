/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import jwt from "jwt-decode";
import axios from "axios";

export interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  role: string;
}

export const AuthStatus = {
  AUTHENTICATED: 1,
  NOT_AUTHENTICATED: 2,
  SESSION_EXPIRED: 3,
  TOKEN_UNVERIFIED: 4,
};

export interface AuthContextState {
  user: User | null;
  authStatus: number;
  loggingIn: boolean;
  setAuthStatus: Dispatch<React.SetStateAction<number>>;
  login: (token: string) => void;
  logout: () => void;
  authenticate: () => void;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextState | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [authStatus, setAuthStatus] = useState(AuthStatus.NOT_AUTHENTICATED);
  const router = useRouter();

  const initAuth = async () => {
    setLoggingIn(true);
    await authenticate();
    setLoggingIn(false);
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = (token: string) => {
    const decodedToken = jwt<User>(token);
    localStorage.setItem("authToken", token);
    setUser(decodedToken);
    setAuthStatus(AuthStatus.AUTHENTICATED);
    router.push("/dashboard");
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    localStorage.removeItem("authToken");
    setUser(null);
    setAuthStatus(AuthStatus.NOT_AUTHENTICATED);
  };

  const authenticate = async () => {
    try {
      const result = await axios.get("/api/auth/login");
      const tokenStatus = result.data.message;
      if (tokenStatus === "TOKEN_UNVERIFIED") {
        await logout();
        setAuthStatus(AuthStatus.TOKEN_UNVERIFIED);
        return AuthStatus.TOKEN_UNVERIFIED;
      } else if (tokenStatus === "TOKEN_DOES_NOT_EXIST") {
        await logout();
        setAuthStatus(AuthStatus.NOT_AUTHENTICATED);
        return AuthStatus.NOT_AUTHENTICATED;
      } else {
        if (!user) {
          const user = jwt<User>(tokenStatus);
          setUser(user);
        }
        localStorage.setItem("authToken", tokenStatus);
        setAuthStatus(AuthStatus.AUTHENTICATED);
        return AuthStatus.AUTHENTICATED;
      }
    } catch (err: any) {
      await logout();
      setAuthStatus(AuthStatus.TOKEN_UNVERIFIED);
      return AuthStatus.TOKEN_UNVERIFIED;
    }
  };

  const authContextValue: AuthContextState = {
    user,
    setUser,
    authStatus,
    setAuthStatus,
    login,
    logout,
    loggingIn,
    authenticate,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
