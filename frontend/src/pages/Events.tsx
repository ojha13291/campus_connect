
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventCard } from "@/components/EventCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Calendar, Filter } from "lucide-react";
import { events, categories } from "@/data/events";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const isMobile = useIsMobile();
  
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(event.category);
    
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label 
                htmlFor={`category-${category}`}
                className="cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-medium mb-3">Date</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="date-upcoming" />
            <Label htmlFor="date-upcoming" className="cursor-pointer">
              Upcoming
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="date-this-week" />
            <Label htmlFor="date-this-week" className="cursor-pointer">
              This Week
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="date-this-month" />
            <Label htmlFor="date-this-month" className="cursor-pointer">
              This Month
            </Label>
          </div>
        </div>
      </div>
      
      {isMobile && (
        <Button className="w-full">
          Apply Filters
        </Button>
      )}
    </div>
  );
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Campus Events</h1>
            <p className="text-muted-foreground">
              Discover and register for upcoming events at your university
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters for desktop */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-20">
                <FiltersContent />
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <SearchBar 
                  placeholder="Search events..." 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="flex-1"
                />
                
                {/* Mobile filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden flex gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FiltersContent />
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="hidden lg:block">
                  <Button variant="outline" className="flex gap-2">
                    <Calendar className="h-4 w-4" />
                    Calendar View
                  </Button>
                </div>
              </div>
              
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No events found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
