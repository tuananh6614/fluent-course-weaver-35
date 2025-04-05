
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Người dùng đã cố truy cập vào đường dẫn không tồn tại:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Rất tiếc! Trang không tồn tại</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Quay Về Trang Chủ
        </a>
      </div>
    </div>
  );
};

export default NotFound;
