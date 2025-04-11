
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Search, Edit, Trash, Eye, Shield, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Phần này sẽ được kết nối với backend sau này
  const users = [
    { 
      id: 1, 
      name: "Nguyễn Văn A", 
      email: "nguyenvana@example.com", 
      role: "user", 
      created_at: "2023-05-15",
      status: "active"
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@example.com",
      role: "user",
      created_at: "2023-06-20",
      status: "blocked"
    }
  ];

  // Simulate blocking/unblocking a user
  const toggleUserStatus = (userId: number) => {
    console.log(`Toggle status for user ID: ${userId}`);
    // Will be implemented with backend integration later
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="page-container">
          <h1 className="text-3xl font-bold mb-8">Quản Trị Hệ Thống</h1>
          
          <Card className="p-6">
            <Tabs defaultValue="users" className="w-full">
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
                <h2 className="text-xl font-semibold">Quản Lý Người Dùng</h2>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Tìm kiếm người dùng..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {users.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Họ Tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Vai Trò</TableHead>
                      <TableHead>Ngày Đăng Ký</TableHead>
                      <TableHead>Trạng Thái</TableHead>
                      <TableHead className="text-right">Thao Tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={user.role === "admin" ? "bg-primary/10" : ""}>
                            {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.created_at}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === "active" ? "default" : "destructive"}
                            className="px-2 py-0.5">
                            {user.status === "active" ? "Đang hoạt động" : "Đã khóa"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Button variant="ghost" size="icon" title="Xem chi tiết">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {user.status === "active" ? (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive" 
                                title="Khóa tài khoản"
                                onClick={() => toggleUserStatus(user.id)}>
                                <ShieldX className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-primary" 
                                title="Mở khóa tài khoản"
                                onClick={() => toggleUserStatus(user.id)}>
                                <ShieldCheck className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 border rounded-md bg-muted/10">
                  <h3 className="text-lg font-medium mb-2">Chưa có người dùng nào</h3>
                  <p className="text-muted-foreground">Người dùng sẽ xuất hiện tại đây khi họ đăng ký tài khoản</p>
                </div>
              )}
            </Tabs>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ManageUsers;
