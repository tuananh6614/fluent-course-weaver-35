
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate request to backend
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Yêu cầu đã được gửi", {
        description: "Hãy kiểm tra email của bạn để đặt lại mật khẩu."
      });
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <div className="py-16 md:py-24 min-h-screen flex items-center">
        <div className="page-container max-w-md">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={handleBackToLogin}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại đăng nhập
          </Button>
          
          <h1 className="text-3xl font-bold text-center mb-2">Quên mật khẩu</h1>
          <p className="text-center text-muted-foreground mb-8">
            Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
          </p>

          {isSubmitted ? (
            <div className="space-y-4">
              <Alert className="bg-primary/10 border-primary/20">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertDescription>
                  Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn. Hãy kiểm tra hộp thư và làm theo hướng dẫn.
                </AlertDescription>
              </Alert>
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Không nhận được email? Hãy kiểm tra thư rác hoặc
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Thử lại
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-r-transparent mr-2"></div>
                    Đang gửi...
                  </div>
                ) : (
                  "Gửi hướng dẫn đặt lại"
                )}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Đã nhớ mật khẩu?{" "}
                  <Button variant="link" className="p-0 h-auto" onClick={handleBackToLogin}>
                    Quay lại đăng nhập
                  </Button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
