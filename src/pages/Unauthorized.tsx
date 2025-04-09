
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Quyền truy cập bị từ chối</h1>
          <p className="text-gray-600 mb-8">
            Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ với quản trị viên nếu bạn cho rằng đây là lỗi.
          </p>
          <div className="space-y-4">
            <Button onClick={() => navigate(-1)} variant="outline">
              Quay lại trang trước
            </Button>
            <Button onClick={() => navigate("/")} className="ml-4">
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Unauthorized;
