
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock, MapPin, Share2, Users, ArrowLeft } from "lucide-react";
import { events } from "@/data/events";
import { EventCard } from "@/components/EventCard";
import { useToast } from "@/components/ui/use-toast";

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState(events.find(e => e.id === id));
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Check local storage for registration
    const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
    setIsRegistered(registeredEvents.includes(id));
  }, [id]);
  
  const handleRegistration = () => {
    if (isRegistered) {
      // Unregister
      const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
      const updatedEvents = registeredEvents.filter((eventId: string) => eventId !== id);
      localStorage.setItem("registeredEvents", JSON.stringify(updatedEvents));
      setIsRegistered(false);
      
      toast({
        title: "Registration Cancelled",
        description: "You've been removed from this event.",
      });
    } else {
      // Register
      const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]");
      registeredEvents.push(id);
      localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
      setIsRegistered(true);
      
      toast({
        title: "Registration Successful!",
        description: "You've been registered for this event.",
      });
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Check out this event: ${event?.title}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Could not share', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Event link copied to clipboard",
      });
    }
  };

  // Get related events (same category, excluding current)
  const relatedEvents = events
    .filter(e => e.category === event?.category && e.id !== id)
    .slice(0, 3);

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/events">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <Link to="/events" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px]">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge>{event.category}</Badge>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold">{event.title}</h1>
                <p className="text-muted-foreground mt-2">Organized by {event.organizer}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted p-3 rounded-lg flex flex-col items-center justify-center text-center">
                  <CalendarDays className="h-5 w-5 text-primary mb-2" />
                  <span className="text-sm font-medium">Date</span>
                  <span className="text-sm text-muted-foreground">{event.date}</span>
                </div>
                
                <div className="bg-muted p-3 rounded-lg flex flex-col items-center justify-center text-center">
                  <Clock className="h-5 w-5 text-primary mb-2" />
                  <span className="text-sm font-medium">Time</span>
                  <span className="text-sm text-muted-foreground">{event.time}</span>
                </div>
                
                <div className="bg-muted p-3 rounded-lg flex flex-col items-center justify-center text-center">
                  <MapPin className="h-5 w-5 text-primary mb-2" />
                  <span className="text-sm font-medium">Location</span>
                  <span className="text-sm text-muted-foreground">{event.location}</span>
                </div>
                
                <div className="bg-muted p-3 rounded-lg flex flex-col items-center justify-center text-center">
                  <Users className="h-5 w-5 text-primary mb-2" />
                  <span className="text-sm font-medium">Attendees</span>
                  <span className="text-sm text-muted-foreground">{event.attendees}</span>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="sticky top-20 space-y-6">
                <div className="border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Registration</h2>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Button 
                      className="w-full"
                      variant={isRegistered ? "outline" : "default"}
                      onClick={handleRegistration}
                    >
                      {isRegistered ? "Cancel Registration" : "Register Now"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleShare}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Event
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    {isRegistered 
                      ? "You're registered for this event." 
                      : "Registration is free and only takes a moment."}
                  </p>
                </div>
                
                <div className="border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Organizer</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{event.organizer}</p>
                      <p className="text-sm text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Contact Organizer
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {relatedEvents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Similar Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
