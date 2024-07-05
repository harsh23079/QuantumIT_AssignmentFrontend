import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const register = async (userData) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/auth/register",
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (error) {
      console.error("Registration error:", error.response.data);
    }
  };

  const login = async (userData) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/auth/login",
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (error) {
      console.error("Login error:", error.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
//if user object present then it become true
  const isAuthenticated = !!user;
  console.log("isAuth", isAuthenticated);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
