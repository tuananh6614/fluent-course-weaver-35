
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash, Eye } from 'lucide-react';

const ManageCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Phần này sẽ được kết nối với backend sau này
  const courses: any[] = [];

  return (
    <Layout>
      <section className="py-12">
        <div className="page-container">
          <h1 className="text-3xl font-bold mb-8">Quản Trị Hệ Thống</h1>
          
          <Card className="p-6">
            <Tabs defaultValue="courses" className="w-full">
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
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Quản Lý Khóa Học</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm Khóa Học Mới
                </Button>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Tìm kiếm khóa học..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {courses.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tên Khóa Học</TableHead>
                      <TableHead>Danh Mục</TableHead>
                      <TableHead>Học Viên</TableHead>
                      <TableHead>Thời Gian Tạo</TableHead>
                      <TableHead className="text-right">Thao Tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Dữ liệu sẽ đuợc điền sau khi kết nối backend */}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 border rounded-md bg-muted/10">
                  <h3 className="text-lg font-medium mb-2">Chưa có khóa học nào</h3>
                  <p className="text-muted-foreground mb-4">Thêm khóa học mới để bắt đầu</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm Khóa Học Mới
                  </Button>
                </div>
              )}
            </Tabs>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ManageCourses;
