import { useState, useEffect } from "react";
import { AuthContext } from "@/contexts";
import { usersService } from "@/services";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await usersService.fetchUser();
      setUser(response.data?.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => {
    const userLogged = await fetchUser();
    return userLogged?.data?.user;
  };

  const logout = async () => {
    try {
      setLoading(true);
      await usersService.logOut();
      await fetchUser();
      setUser(null);
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
