
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, BookOpen, BookMarked, Award, Settings } from "lucide-react";

const Profile: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 px-4 md:py-16">
        <div className="page-container">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-1/4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://github.com/shadcn.png" alt="Ảnh đại diện" />
                      <AvatarFallback>
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">Nguyễn Văn A</h2>
                    <p className="text-sm text-muted-foreground mt-1">user@example.com</p>
                  </div>
                  
                  <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#profile">
                        <User className="mr-2 h-4 w-4" />
                        Thông Tin Cá Nhân
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#courses">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Khóa Học Của Tôi
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#favorites">
                        <BookMarked className="mr-2 h-4 w-4" />
                        Khóa Học Yêu Thích
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#certificates">
                        <Award className="mr-2 h-4 w-4" />
                        Chứng Chỉ
                      </a>
                    </Button>
                    <Separator className="my-2" />
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="#settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Cài Đặt
                      </a>
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="profile">
                <TabsList className="mb-8">
                  <TabsTrigger value="profile">Thông Tin Cá Nhân</TabsTrigger>
                  <TabsTrigger value="courses">Khóa Học</TabsTrigger>
                  <TabsTrigger value="certificates">Chứng Chỉ</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông Tin Cá Nhân</CardTitle>
                      <CardDescription>
                        Quản lý thông tin cá nhân của bạn
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Họ</Label>
                            <Input id="firstName" placeholder="Nguyễn" defaultValue="Nguyễn" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Tên</Label>
                            <Input id="lastName" placeholder="Văn A" defaultValue="Văn A" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" placeholder="user@example.com" defaultValue="user@example.com" disabled />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input id="phone" placeholder="0123456789" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Giới thiệu bản thân</Label>
                          <textarea 
                            id="bio" 
                            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Giới thiệu ngắn về bản thân bạn..."
                            defaultValue="Tôi là một học viên đam mê học tập và phát triển bản thân."
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button>Lưu Thay Đổi</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {/* Courses Tab */}
                <TabsContent value="courses">
                  <Card>
                    <CardHeader>
                      <CardTitle>Khóa Học Của Tôi</CardTitle>
                      <CardDescription>
                        Các khóa học bạn đã đăng ký
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Bạn chưa đăng ký khóa học nào.</p>
                        <Button className="mt-4" asChild>
                          <a href="/courses">Khám Phá Khóa Học</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Certificates Tab */}
                <TabsContent value="certificates">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chứng Chỉ</CardTitle>
                      <CardDescription>
                        Chứng chỉ bạn đã đạt được
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">Bạn chưa có chứng chỉ nào.</p>
                        <p className="text-sm mt-2">Hoàn thành các khóa học để nhận chứng chỉ.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
