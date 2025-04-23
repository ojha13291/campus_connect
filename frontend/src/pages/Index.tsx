
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Banner } from "@/components/Banner";
import { EventCard } from "@/components/EventCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { events } from "@/data/events";
import { clubs } from "@/data/clubs";
import { ClubCard } from "@/components/ClubCard";

export default function Index() {
  const currentDate = new Date();
  
  const upcomingEvents = events.slice(0, 3);
  
  const featuredClubs = clubs.slice(0, 3);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Banner />
        
        <section className="container py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
              <p className="text-muted-foreground mt-1">
                Discover what's happening around campus
              </p>
            </div>
            <Link to="/events">
              <Button variant="ghost" className="mt-4 md:mt-0">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
        
        <section className="container py-12 border-t">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Clubs</h2>
              <p className="text-muted-foreground mt-1">
                Explore student organizations and find your community
              </p>
            </div>
            <Link to="/clubs">
              <Button variant="ghost" className="mt-4 md:mt-0">
                View All Clubs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </section>
        
        <section className="container py-12 border-t">
          <div className="md:grid md:grid-cols-2 gap-8 items-center">
            <div className="mb-8 md:mb-0">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Campus News & Announcements</h2>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="campus">Campus Life</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground">May 10, 2025</p>
                    <h3 className="text-lg font-medium mt-1">Final Exam Schedule Released</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2">The final examination schedule for Spring 2025 has been posted. Students are advised to check their exam dates and times.</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground">May 8, 2025</p>
                    <h3 className="text-lg font-medium mt-1">Campus Housing Applications Open</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2">Housing applications for the Fall 2025 semester are now open. Early applicants will receive priority room selection.</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground">May 5, 2025</p>
                    <h3 className="text-lg font-medium mt-1">New Student Orientation Dates</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2">Orientation for incoming freshmen will be held from August 20-25. Registration is required through the student portal.</p>
                  </div>
                </TabsContent>
                <TabsContent value="academic" className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground">May 10, 2025</p>
                    <h3 className="text-lg font-medium mt-1">Final Exam Schedule Released</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2">The final examination schedule for Spring 2025 has been posted. Students are advised to check their exam dates and times.</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground">May 3, 2025</p>
                    <h3 className="text-lg font-medium mt-1">Summer Course Registration</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2">Registration for summer courses begins on May 15. Review the course catalog and prepare your schedule.</p>
                  </div>
                </TabsContent>
                <TabsContent value="campus" className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground">May 8, 2025</p>
                    <h3 className="text-lg font-medium mt-1">Campus Housing Applications Open</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2">Housing applications for the Fall 2025 semester are now open. Early applicants will receive priority room selection.</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground">May 5, 2025</p>
                    <h3 className="text-lg font-medium mt-1">New Student Orientation Dates</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2">Orientation for incoming freshmen will be held from August 20-25. Registration is required through the student portal.</p>
                  </div>
                </TabsContent>
              </Tabs>
              <Button variant="outline" className="mt-4 w-full">
                View All Announcements
              </Button>
            </div>
            
            <div className="bg-muted rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Campus Connect App</h3>
              <p className="text-muted-foreground mb-6">
                Get instant notifications for events, register on the go, and stay connected with your campus community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-apple"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
                  App Store
                </Button>
                <Button className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
