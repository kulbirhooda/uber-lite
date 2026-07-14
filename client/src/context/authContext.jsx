import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/auth";
import auth from "../lib/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.token) {
      authApi
        .me()
        .then(({ user }) => {
          auth.user = user;
          setUser(user);
        })
        .catch(() => {
          auth.logout();
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signin = async ({ email, password }) => {
    const { user, token } = await authApi.signin({ email, password });
    // Setting the token inside the localstorage too along with user
    auth.token = token;
    auth.user = user;
    setUser(user);
    return { user, token };
  };

  const signup = async ({ email, password, name }) => {
    const { user, token } = await authApi.signup({ email, password, name });
    // Setting the token inside the localstorage too along with user
    auth.token = token;
    auth.user = user;
    setUser(user);
    return { user, token };
  };

  const signupDriver = async ({ name, email, password, vehicleModel, plateNumber, vehicleType }) => {
    const { user, token } = await authApi.signupDriver({ name, email, password, vehicleModel, plateNumber, vehicleType });

    auth.token=token;
    auth.user=user;
    setUser(user);
    return {user , token};
  }

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        signin,
        signup,
        logout,
        token: auth.token || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
