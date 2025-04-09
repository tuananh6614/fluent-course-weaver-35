
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="page-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              <span className="text-2xl font-heading font-bold">
                Edu<span className="text-secondary">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              EduHub là nền tảng học tập hiện đại nơi kiến thức gặp đổi mới,
              cung cấp nội dung giáo dục chất lượng cao cho người học trên toàn thế giới.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              {["Khóa Học", "Giới Thiệu", "Liên Hệ", "Câu Hỏi Thường Gặp", "Chính Sách Bảo Mật", "Điều Khoản Dịch Vụ"].map(
                (link, index) => (
                  <li key={index}>
                    <Link
                      to={`/${link === "Khóa Học" ? "courses" : link === "Giới Thiệu" ? "about" : link === "Liên Hệ" ? "contact" : link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Liên Hệ Với Chúng Tôi</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  123 Đường Giáo Dục, TP Tri Thức, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 shrink-0" />
                <a
                  href="tel:+11234567890"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  +84 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 shrink-0" />
                <a
                  href="mailto:info@eduhub.com"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  info@eduhub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/70">
          <p>© {new Date().getFullYear()} EduHub. Mọi quyền được bảo lưu.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Chính Sách Bảo Mật
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Điều Khoản Dịch Vụ
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Chính Sách Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
