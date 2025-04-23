
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-md",
      variant === "compact" ? "flex flex-row h-auto" : "flex flex-col h-full"
    )}>
      {variant === "default" && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <Badge className="absolute top-3 right-3">{event.category}</Badge>
        </div>
      )}
      
      {variant === "compact" && (
        <div className="relative min-w-[120px] md:min-w-[150px] h-full">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover absolute inset-0"
          />
          <Badge className="absolute top-2 left-2">{event.category}</Badge>
        </div>
      )}
      
      <div className={variant === "compact" ? "flex-1" : ""}>
        <CardHeader className={variant === "compact" ? "p-3 pb-1" : ""}>
          <CardTitle className={cn(
            "line-clamp-1",
            variant === "compact" ? "text-base" : "text-xl"
          )}>
            {event.title}
          </CardTitle>
          <CardDescription className={variant === "compact" ? "text-sm" : ""}>
            {event.organizer}
          </CardDescription>
        </CardHeader>
        
        <CardContent className={cn(
          "space-y-2",
          variant === "compact" ? "p-3 pt-0 text-sm" : ""
        )}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className={cn("text-primary", variant === "compact" ? "h-3 w-3" : "h-4 w-4")} />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className={cn("text-primary", variant === "compact" ? "h-3 w-3" : "h-4 w-4")} />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className={cn("text-primary", variant === "compact" ? "h-3 w-3" : "h-4 w-4")} />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          {!variant || variant === "default" ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{event.attendees} attendees</span>
            </div>
          ) : null}
        </CardContent>
        
        <CardFooter className={variant === "compact" ? "p-3 pt-0" : ""}>
          <Link to={`/events/${event.id}`} className="w-full">
            <Button 
              variant="outline" 
              className="w-full"
              size={variant === "compact" ? "sm" : "default"}
            >
              View Details
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
}
