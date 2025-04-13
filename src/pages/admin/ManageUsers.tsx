
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Search, Edit, Eye, Lock, Unlock, RefreshCcw } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

// API URL
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '/api';

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users - fixed to use proper query options structure
  const { data: usersResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    },
    // Using onError directly without meta (proper way for React Query v5)
    onError: (err: any) => {
      console.error("Error fetching users:", err);
      toast.error("Không thể tải danh sách người dùng", {
        description: err.response?.data?.message || "Vui lòng thử lại sau"
      });
    }
  });

  // Block/unblock user mutation
  const toggleBlockMutation = useMutation({
    mutationFn: async ({ userId, action }: { userId: number, action: 'block' | 'unblock' }) => {
      return await axios.put(
        `${API_URL}/users/${userId}/${action}`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    },
    onSuccess: (data, variables) => {
      const action = variables.action === 'block' ? 'khóa' : 'mở khóa';
      toast.success(`Đã ${action} người dùng thành công`);
      refetch();
    },
    onError: (err: any) => {
      toast.error("Thao tác không thành công", {
        description: err.response?.data?.message || "Vui lòng thử lại sau"
      });
    }
  });

  // Filter users based on search query
  const users = usersResponse?.data || [];
  const filteredUsers = users.filter((user: any) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      user.full_name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower)
    );
  });

  const handleToggleBlock = (userId: number, isBlocked: boolean) => {
    const action = isBlocked ? 'unblock' : 'block';
    toggleBlockMutation.mutate({ userId, action });
  };

  // Error handler for useQuery
  useEffect(() => {
    if (error) {
      console.error("Error in useEffect:", error);
    }
  }, [error]);

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
                {isLoading || error ? (
                  <Button variant="outline" onClick={() => refetch()} disabled={isLoading}>
                    <RefreshCcw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Tải lại
                  </Button>
                ) : null}
              </div>
              
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : error ? (
                <div className="text-center py-12 border rounded-md bg-muted/10">
                  <h3 className="text-lg font-medium mb-2">Không thể tải dữ liệu</h3>
                  <p className="text-muted-foreground mb-4">Đã xảy ra lỗi khi tải danh sách người dùng</p>
                  <Button onClick={() => refetch()}>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Thử lại
                  </Button>
                </div>
              ) : filteredUsers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Họ Tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Vai Trò</TableHead>
                      <TableHead>Trạng Thái</TableHead>
                      <TableHead>Ngày Đăng Ký</TableHead>
                      <TableHead className="text-right">Thao Tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user: any) => (
                      <TableRow key={user.user_id}>
                        <TableCell className="font-medium">{user.user_id}</TableCell>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                            {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.is_blocked ? 'destructive' : 'default'} className="capitalize">
                            {user.is_blocked ? 'Đã khóa' : 'Hoạt động'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString('vi-VN')}
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleBlock(user.user_id, user.is_blocked)}
                            disabled={toggleBlockMutation.isPending}
                            title={user.is_blocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                          >
                            {user.is_blocked ? (
                              <Unlock className="h-4 w-4" />
                            ) : (
                              <Lock className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            title="Xem chi tiết"
                          >
                            <Link to={`/admin/users/${user.user_id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            title="Chỉnh sửa"
                          >
                            <Link to={`/admin/users/${user.user_id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 border rounded-md bg-muted/10">
                  <h3 className="text-lg font-medium mb-2">Chưa có người dùng nào</h3>
                  <p className="text-muted-foreground">Không có dữ liệu người dùng trong hệ thống</p>
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
