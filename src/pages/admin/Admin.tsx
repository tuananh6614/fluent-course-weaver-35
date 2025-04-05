
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="py-12">
        <div className="page-container">
          <h1 className="text-3xl font-bold mb-8">Quản Trị Hệ Thống</h1>
          
          <Card className="p-6">
            <Tabs 
              defaultValue="dashboard" 
              className="w-full" 
              onValueChange={(value) => navigate(`/admin/${value === 'dashboard' ? '' : value}`)}
            >
              <TabsList className="mb-8 w-full justify-start">
                <TabsTrigger value="dashboard" asChild>
                  <Link to="/admin/dashboard">Tổng Quan</Link>
                </TabsTrigger>
                <TabsTrigger value="courses" asChild>
                  <Link to="/admin/courses">Khóa Học</Link>
                </TabsTrigger>
                <TabsTrigger value="users" asChild>
                  <Link to="/admin/users">Người Dùng</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="text-center py-24">
              <h2 className="text-2xl font-medium">Chào mừng đến với trang quản trị</h2>
              <p className="text-muted-foreground mt-2">Vui lòng chọn một mục trong menu để tiếp tục.</p>
            </div>

            <Outlet />
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
