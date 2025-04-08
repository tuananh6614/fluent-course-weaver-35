
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

const Certificate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState({
    courseName: "",
    studentName: "",
    completionDate: "",
    certificateId: "",
  });

  useEffect(() => {
    // Simulating API call to get certificate data
    // In a real app, you would fetch this data from your backend
    setTimeout(() => {
      setCertificate({
        courseName: "Khóa học Lập trình Web Cơ bản",
        studentName: "Nguyễn Văn A",
        completionDate: new Date().toLocaleDateString("vi-VN"),
        certificateId: id || "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDownload = () => {
    // In a real implementation, you would generate a PDF or image file
    alert("Tính năng tải chứng chỉ sẽ được cập nhật trong thời gian tới!");
  };

  const handleShare = () => {
    // In a real implementation, you would use the Web Share API or a custom share dialog
    if (navigator.share) {
      navigator.share({
        title: `Chứng chỉ ${certificate.courseName}`,
        text: `Tôi đã hoàn thành ${certificate.courseName} tại EduHub!`,
        url: window.location.href,
      });
    } else {
      alert("Tính năng chia sẻ sẽ được cập nhật trong thời gian tới!");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="page-container max-w-4xl mx-auto">
          <div className="bg-background border-8 border-primary/20 rounded-lg shadow-lg overflow-hidden">
            <div className="p-2 bg-primary text-primary-foreground text-center">
              <h2 className="text-lg font-semibold">EduHub - Nền tảng học tập trực tuyến</h2>
            </div>
            
            <div className="p-8 md:p-12 text-center relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 20 L80 40 L80 80 L20 80 L20 40 Z" stroke="currentColor" fill="none" />
                </svg>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-primary mb-6">Chứng Chỉ Hoàn Thành</h1>
              
              <p className="text-lg mb-8">
                Chứng nhận rằng
              </p>
              
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-8">
                {certificate.studentName}
              </h2>
              
              <p className="text-lg mb-8">
                đã hoàn thành xuất sắc khóa học
              </p>
              
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-12">
                {certificate.courseName}
              </h3>
              
              <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-500">Ngày cấp</p>
                  <p className="font-medium">{certificate.completionDate}</p>
                </div>
                
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-500">Mã chứng chỉ</p>
                  <p className="font-medium">{certificate.certificateId}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Chữ ký giám đốc</p>
                  <p className="font-heading font-bold italic text-primary">EduHub</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-muted flex justify-center gap-4">
              <Button variant="outline" onClick={handleDownload} className="gap-2">
                <Download size={16} />
                Tải xuống
              </Button>
              <Button variant="secondary" onClick={handleShare} className="gap-2">
                <Share2 size={16} />
                Chia sẻ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Certificate;
