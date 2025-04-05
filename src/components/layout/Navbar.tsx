
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, BookOpen } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-heading font-bold text-foreground">
              Edu<span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/courses"
              className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              Khóa Học
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              Giới Thiệu
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              Liên Hệ
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button size="sm" variant="ghost">
              <Search className="h-5 w-5 mr-2" />
              Tìm Kiếm
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to="/login">Đăng Nhập</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Đăng Ký</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-in-right">
            <div className="p-4 bg-background/95 backdrop-blur-md mt-2 rounded-lg shadow-lg border">
              <nav className="flex flex-col space-y-3 mb-4">
                <Link
                  to="/courses"
                  className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Khóa Học
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Giới Thiệu
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Liên Hệ
                </Link>
              </nav>
              <div className="flex flex-col space-y-2">
                <Button size="sm" variant="outline" className="justify-start" asChild>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    Đăng Nhập
                  </Link>
                </Button>
                <Button size="sm" className="justify-start" asChild>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    Đăng Ký
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
