import { useState, useEffect, createContext } from "react";
import { usersService } from "@/services";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await usersService.fetchUser({
        credentials: "include",
      });
      setUser(response.data?.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => {
    await fetchUser();
  };

  const logout = async () => {
    try {
      setLoading(true);
      setUser(null);
      await usersService.logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
