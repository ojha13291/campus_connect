
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/EventCard";
import { ClubCard } from "@/components/ClubCard";
import { events } from "@/data/events";
import { clubs } from "@/data/clubs";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const isMobile = useIsMobile();
  
  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter clubs based on search query
  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For "All" tab, create a mixed array of events and clubs
  const allResults = [...filteredEvents, ...filteredClubs];
  
  // Update document title when search query changes
  useEffect(() => {
    document.title = searchQuery ? `Search: ${searchQuery} - Campus Connect` : "Search - Campus Connect";
  }, [searchQuery]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Search</h1>
            <p className="text-muted-foreground">
              Find events, clubs, and other campus resources
            </p>
          </div>
          
          <div className="mb-8">
            <SearchBar 
              placeholder="Search events, clubs, and more..." 
              value={searchQuery}
              onChange={setSearchQuery}
              className="max-w-3xl mx-auto"
            />
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Results</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="clubs">Clubs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {searchQuery ? (
                <>
                  {allResults.length > 0 ? (
                    <div className="space-y-8">
                      {filteredEvents.length > 0 && (
                        <div>
                          <h2 className="text-xl font-semibold mb-4">Events</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.slice(0, 3).map(event => (
                              <EventCard key={event.id} event={event} />
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {filteredClubs.length > 0 && (
                        <div>
                          <h2 className="text-xl font-semibold mb-4">Clubs</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredClubs.slice(0, 3).map(club => (
                              <ClubCard key={club.id} club={club} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No results found</h3>
                      <p className="text-muted-foreground mt-2">
                        Try searching with different keywords
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
                    <div className="flex flex-wrap gap-2">
                      {["Technology", "Cultural", "Workshop", "Sports", "Career", "Arts"].map(term => (
                        <button
                          key={term}
                          className="px-4 py-2 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                          onClick={() => setSearchQuery(term)}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Trending Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {events.slice(0, 3).map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="events">
              {searchQuery ? (
                <>
                  {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No events found</h3>
                      <p className="text-muted-foreground mt-2">
                        Try searching with different keywords
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="clubs">
              {searchQuery ? (
                <>
                  {filteredClubs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredClubs.map(club => (
                        <ClubCard key={club.id} club={club} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No clubs found</h3>
                      <p className="text-muted-foreground mt-2">
                        Try searching with different keywords
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clubs.map(club => (
                    <ClubCard key={club.id} club={club} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
