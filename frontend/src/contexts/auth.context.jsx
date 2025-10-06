import { createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
} from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // --- Auto-login (restore session) ---
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch {
        toast.error('Session expired. Please log in again.');
        logoutUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // --- Login ---
  const login = async (signInData) => {
    try {
      setLoading(true);
      const data = await loginUser(signInData);
      setUser(data);
      toast.success(`Welcome back, ${data.user?.name || data.name}`);
      navigate('/');
      return data;
    } catch (err) {
      toast.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Register ---
  const register = async (signUpData) => {
    try {
      setLoading(true);
      const data = await registerUser(signUpData);
      setUser(data);
      toast.success(`Welcome, ${data.user?.name || data.name}`);
      navigate('/');
      return data;
    } catch (err) {
      toast.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- Logout ---
  const logout = () => {
    logoutUser();
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
