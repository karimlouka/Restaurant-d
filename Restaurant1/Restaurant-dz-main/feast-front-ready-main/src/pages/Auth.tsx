import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Navigate } from "react-router-dom";

export default function Auth() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAdmin, signIn } = useAuth();

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = signIn(password);
    if (!success) {
      setError("كلمة المرور غير صحيحة.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">تسجيل الدخول للوحة التحكم</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              تسجيل الدخول
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            كلمة المرور الافتراضية هي: adminpassword123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
