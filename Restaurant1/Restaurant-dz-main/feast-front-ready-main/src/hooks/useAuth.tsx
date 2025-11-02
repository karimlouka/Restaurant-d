import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// كلمة مرور بسيطة للدخول إلى لوحة التحكم
const ADMIN_PASSWORD = "adminpassword123"; // يجب تغييرها إلى كلمة مرور قوية في بيئة الإنتاج

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  signIn: (password: string) => boolean;
  signOut: () => void;
}

export const useAuth = (): AuthContextType => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // التحقق من حالة المصادقة المخزنة محليًا
    const storedAuth = localStorage.getItem("isAdminAuthenticated");
    if (storedAuth === "true") {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const signIn = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("isAdminAuthenticated", "true");
      navigate("/admin", { replace: true });
      return true;
    }
    return false;
  }, [navigate]);

  const signOut = useCallback(() => {
    setIsAdmin(false);
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/", { replace: true });
  }, [navigate]);

  return {
    isAdmin,
    loading,
    signIn,
    signOut,
  };
};
