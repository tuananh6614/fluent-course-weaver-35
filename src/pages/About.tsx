
import React from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/common/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Award, Users, Globe, Target, Clock } from "lucide-react";

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Về <span className="text-gradient">EduHub</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Chúng tôi là nền tảng giáo dục trực tuyến hàng đầu với sứ mệnh cung cấp kiến thức 
                chất lượng và kỹ năng thực tế cho tất cả mọi người, ở bất kỳ đâu trên thế giới.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Thành lập năm 2018</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">+100,000 Học viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Học viên từ 60+ quốc gia</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                  alt="Đội ngũ làm việc cùng nhau"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-background p-4 rounded-lg shadow-lg">
                <div className="font-bold text-2xl text-center mb-2 text-primary">200+</div>
                <div className="text-sm">Chuyên gia giảng dạy</div>
              </div>
              <div className="absolute -top-4 -left-4 bg-background p-4 rounded-lg shadow-lg">
                <div className="font-bold text-2xl text-center mb-2 text-primary">500+</div>
                <div className="text-sm">Khóa học chất lượng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="page-container">
          <SectionHeading 
            title="Sứ Mệnh & Tầm Nhìn"
            subtitle="Chúng tôi hướng tới mục tiêu rõ ràng và định hình tương lai của học tập"
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Sứ Mệnh</h3>
                <p className="text-center text-muted-foreground">
                  Chúng tôi cam kết cung cấp giáo dục chất lượng cao, dễ tiếp cận cho tất cả mọi người. 
                  Thông qua việc loại bỏ các rào cản truyền thống và tạo ra môi trường học tập linh hoạt, 
                  chúng tôi trao quyền cho học viên phát triển kỹ năng thiết yếu để thành công trong thế giới đang thay đổi nhanh chóng.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="mb-6 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Tầm Nhìn</h3>
                <p className="text-center text-muted-foreground">
                  Chúng tôi hình dung một thế giới nơi giáo dục chất lượng không bị giới hạn bởi địa lý, tài chính hoặc nền tảng xã hội. 
                  Mục tiêu của chúng tôi là trở thành nền tảng giáo dục trực tuyến hàng đầu thế giới, nuôi dưỡng một cộng đồng toàn cầu 
                  gồm những người học tập suốt đời được trao quyền để theo đuổi đam mê và đạt được mục tiêu của họ.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-muted">
        <div className="page-container">
          <SectionHeading 
            title="Giá Trị Cốt Lõi"
            subtitle="Những nguyên tắc định hướng cách chúng tôi hoạt động và phục vụ học viên"
            align="center"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                icon: <BookOpen className="h-10 w-10" />,
                title: "Chất Lượng",
                description: "Chúng tôi không ngừng theo đuổi sự xuất sắc trong tất cả nội dung và trải nghiệm giáo dục."
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Hòa Nhập",
                description: "Chúng tôi tin rằng giáo dục nên tiếp cận được với tất cả mọi người, bất kể hoàn cảnh của họ."
              },
              {
                icon: <Award className="h-10 w-10" />,
                title: "Đổi Mới",
                description: "Chúng tôi áp dụng công nghệ và phương pháp giảng dạy mới để liên tục cải thiện trải nghiệm học tập."
              },
              {
                icon: <Clock className="h-10 w-10" />,
                title: "Linh Hoạt",
                description: "Chúng tôi đáp ứng nhu cầu học tập đa dạng và lịch trình bận rộn của học viên hiện đại."
              }
            ].map((value, index) => (
              <Card key={index} className="border-none overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="page-container">
          <SectionHeading 
            title="Đội Ngũ Lãnh Đạo"
            subtitle="Những người đứng sau tầm nhìn và sứ mệnh của chúng tôi"
            align="center"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                name: "Nguyễn Văn An",
                position: "Đồng sáng lập & CEO",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
                bio: "Với hơn 15 năm kinh nghiệm trong lĩnh vực giáo dục và công nghệ"
              },
              {
                name: "Trần Thị Bình",
                position: "Đồng sáng lập & COO",
                image: "https://randomuser.me/api/portraits/women/1.jpg",
                bio: "Chuyên gia trong phát triển chương trình học và thiết kế trải nghiệm học tập"
              },
              {
                name: "Lê Hoàng Dũng",
                position: "Giám đốc Công nghệ",
                image: "https://randomuser.me/api/portraits/men/2.jpg",
                bio: "Nhà phát triển phần mềm với đam mê tạo ra các nền tảng học tập trực tuyến"
              },
              {
                name: "Phạm Minh Hiền",
                position: "Giám đốc Học thuật",
                image: "https://randomuser.me/api/portraits/women/2.jpg",
                bio: "Tiến sĩ Giáo dục với 10 năm kinh nghiệm trong nghiên cứu và giảng dạy"
              }
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-primary/10">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary mb-2">{member.position}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn sàng bắt đầu hành trình học tập của bạn?</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Tham gia cùng hàng ngàn học viên khác đã thay đổi cuộc sống của họ thông qua nền tảng của chúng tôi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/courses" className="bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-white/90 transition-colors">
              Khám phá khóa học
            </a>
            <a href="/register" className="bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary-foreground/20 transition-colors">
              Đăng ký ngay
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
