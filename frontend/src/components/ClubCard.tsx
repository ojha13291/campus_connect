
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Club } from "@/data/clubs";

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md flex flex-col h-full">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img 
          src={club.coverImage} 
          alt={club.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3">
          {club.category}
        </Badge>
      </div>
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{club.name}</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{club.members} members</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {club.description}
        </p>
      </CardContent>
      
      <CardFooter className="mt-auto">
        <Link to={`/clubs/${club.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Club
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
