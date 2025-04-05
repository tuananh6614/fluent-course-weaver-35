
import React from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Contact: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Liên Hệ Với Chúng Tôi</h1>
            <p className="text-xl text-muted-foreground">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trong hành trình học tập.
              Hãy để lại thông tin và chúng tôi sẽ liên hệ lại sớm nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Thông Tin Liên Hệ</h2>
              
              <div className="space-y-6">
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Địa Chỉ</h3>
                      <p className="text-muted-foreground text-sm">
                        123 Đường Giáo Dục, TP Tri Thức, 10001
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm">
                        <a href="mailto:info@eduhub.com" className="hover:text-primary transition-colors">
                          info@eduhub.com
                        </a>
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <a href="mailto:support@eduhub.com" className="hover:text-primary transition-colors">
                          support@eduhub.com
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Điện Thoại</h3>
                      <p className="text-muted-foreground text-sm">
                        <a href="tel:+84123456789" className="hover:text-primary transition-colors">
                          +84 (123) 456-789
                        </a>
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <a href="tel:+84987654321" className="hover:text-primary transition-colors">
                          +84 (987) 654-321
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Giờ Làm Việc</h3>
                      <p className="text-muted-foreground text-sm">Thứ Hai - Thứ Sáu: 8:00 - 17:00</p>
                      <p className="text-muted-foreground text-sm">Thứ Bảy: 9:00 - 12:00</p>
                      <p className="text-muted-foreground text-sm">Chủ Nhật: Đóng cửa</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Gửi Tin Nhắn</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ Tên</Label>
                        <Input id="name" placeholder="Nguyễn Văn A" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="email@example.com" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Chủ Đề</Label>
                      <Input id="subject" placeholder="Tiêu đề tin nhắn của bạn" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Tin Nhắn</Label>
                      <Textarea
                        id="message"
                        placeholder="Hãy chia sẻ chi tiết về câu hỏi hoặc yêu cầu của bạn..."
                        className="h-36 resize-none"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full md:w-auto">
                      <Send className="mr-2 h-4 w-4" /> Gửi Tin Nhắn
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 pb-16">
        <div className="page-container">
          <div className="border rounded-lg overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4842318813153!2d106.76973841474946!3d10.850726892271124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2sHCMC%20University%20of%20Technology%20and%20Education!5e0!3m2!1sen!2s!4v1680322123380!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí của EduHub trên bản đồ"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted py-16">
        <div className="page-container">
          <SectionHeading
            title="Câu Hỏi Thường Gặp"
            subtitle="Những thắc mắc phổ biến về dịch vụ của chúng tôi"
            align="center"
          />

          <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Tôi có thể thanh toán bằng những hình thức nào?",
                answer: "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, và các ví điện tử phổ biến như MoMo, ZaloPay và VNPay."
              },
              {
                question: "Khóa học có chứng chỉ không?",
                answer: "Có, tất cả khóa học sau khi hoàn thành đều được cấp chứng chỉ có giá trị và được công nhận trên thị trường lao động."
              },
              {
                question: "Tôi có thể truy cập khóa học trong bao lâu?",
                answer: "Sau khi đăng ký, bạn có thể truy cập khóa học vĩnh viễn và xem lại nội dung bất kỳ lúc nào."
              },
              {
                question: "Làm thế nào để nhận hỗ trợ kỹ thuật?",
                answer: "Bạn có thể liên hệ đội ngũ hỗ trợ của chúng tôi qua email support@eduhub.com hoặc số hotline 1900-xxxx. Chúng tôi sẵn sàng hỗ trợ bạn 24/7."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
