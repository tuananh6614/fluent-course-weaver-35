import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";

interface CourseCardProps {
  id: string | number;
  title: string;
  instructor?: string;
  thumbnail: string;
  category: string;
  rating: number;
  students: number;
  duration: string;
  price?: number;
  featured?: boolean;
  level?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  instructor,
  thumbnail,
  category,
  rating,
  students,
  duration,
  price,
  featured = false,
  level,
}) => {
  return (
    <Link to={`/courses/${id}`} className="block group">
      <Card className={`overflow-hidden card-hover h-full ${featured ? 'border-primary/50 shadow-md' : ''}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97";
            }}
          />
          <Badge className="absolute top-2 left-2 bg-primary">
            {category}
          </Badge>
          {level && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              {level}
            </Badge>
          )}
        </div>
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {instructor && (
            <p className="text-sm text-muted-foreground">{instructor}</p>
          )}
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 mr-1" fill="currentColor" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>{students.toLocaleString()} học viên</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
        </CardContent>
        <CardFooter>
          {price !== undefined ? (
            <div className="font-semibold">
              {price === 0 ? (
                <span className="text-secondary">Miễn phí</span>
              ) : (
                <span>${price.toFixed(2)}</span>
              )}
            </div>
          ) : (
            <div className="h-6"></div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
