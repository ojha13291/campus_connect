
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Map, ArrowLeft, Book, Users } from "lucide-react";
import { clubs, clubIcons } from "@/data/clubs";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

export default function ClubDetails() {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useState(clubs.find(c => c.id === id));
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check local storage for following status
    const followedClubs = JSON.parse(localStorage.getItem("followedClubs") || "[]");
    setIsFollowing(followedClubs.includes(id));
  }, [id]);
  
  const handleFollowToggle = () => {
    if (isFollowing) {
      const followedClubs = JSON.parse(localStorage.getItem("followedClubs") || "[]");
      const updatedClubs = followedClubs.filter((clubId: string) => clubId !== id);
      localStorage.setItem("followedClubs", JSON.stringify(updatedClubs));
      setIsFollowing(false);
      
      toast({
        title: "Club Unfollowed",
        description: "You've unfollowed this club.",
      });
    } else {
      const followedClubs = JSON.parse(localStorage.getItem("followedClubs") || "[]");
      followedClubs.push(id);
      localStorage.setItem("followedClubs", JSON.stringify(followedClubs));
      setIsFollowing(true);
      
      toast({
        title: "Club Followed!",
        description: "You're now following this club.",
      });
    }
  };

  if (!club) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Club Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The club you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/clubs">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Clubs
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
          <Link to="/clubs" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clubs
          </Link>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[400px]">
                <img 
                  src={club.coverImage} 
                  alt={club.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge>{club.category}</Badge>
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold">{club.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">{club.members} members</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium">Founded</span>
                  </div>
                  <p className="pl-7 mt-1 text-muted-foreground">{club.founded}</p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">Meeting Schedule</span>
                  </div>
                  <p className="pl-7 mt-1 text-muted-foreground">{club.meetingSchedule}</p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="pl-7 mt-1 text-muted-foreground">{club.location}</p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-primary" />
                    <span className="font-medium">Category</span>
                  </div>
                  <p className="pl-7 mt-1 text-muted-foreground">{club.category}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">About This Club</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {club.description}
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Images & Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img 
                      src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b" 
                      alt="Club activity" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img 
                      src="https://images.unsplash.com/photo-1557734864-c78b6dfef1b1" 
                      alt="Club activity" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644" 
                      alt="Club activity" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="sticky top-20 space-y-6">
                <div className="border rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Join this Club</h2>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Button 
                      className="w-full"
                      variant={isFollowing ? "outline" : "default"}
                      onClick={handleFollowToggle}
                    >
                      {isFollowing ? "Unfollow Club" : "Follow Club"}
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      Send Membership Request
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    {isFollowing 
                      ? "You're now following this club." 
                      : "Follow to get updates on events and activities."}
                  </p>
                </div>
                
                <div className="border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact</h2>
                  
                  <div className="space-y-3">
                    {club.social.email && (
                      <p className="text-sm">
                        <span className="font-medium">Email:</span>{" "}
                        <a 
                          href={`mailto:${club.social.email}`} 
                          className="text-primary hover:underline"
                        >
                          {club.social.email}
                        </a>
                      </p>
                    )}
                    
                    {club.social.instagram && (
                      <p className="text-sm">
                        <span className="font-medium">Instagram:</span>{" "}
                        <a 
                          href={`https://instagram.com/${club.social.instagram}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-primary hover:underline"
                        >
                          @{club.social.instagram}
                        </a>
                      </p>
                    )}
                    
                    {club.social.twitter && (
                      <p className="text-sm">
                        <span className="font-medium">Twitter:</span>{" "}
                        <a 
                          href={`https://twitter.com/${club.social.twitter}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-primary hover:underline"
                        >
                          @{club.social.twitter}
                        </a>
                      </p>
                    )}
                    
                    {club.social.facebook && (
                      <p className="text-sm">
                        <span className="font-medium">Facebook:</span>{" "}
                        <a 
                          href={`https://facebook.com/${club.social.facebook}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-primary hover:underline"
                        >
                          {club.social.facebook}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                  <p className="text-muted-foreground text-sm">
                    No upcoming events at the moment. Follow the club to get notifications when events are announced.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
