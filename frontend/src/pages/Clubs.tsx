
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClubCard } from "@/components/ClubCard";
import { SearchBar } from "@/components/SearchBar";
import { clubs } from "@/data/clubs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Clubs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const isMobile = useIsMobile();
  
  const categories = [...new Set(clubs.map(club => club.category))];
  
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = 
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(club.category);
    
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
        <h3 className="font-medium mb-3">Size</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="size-small" />
            <Label htmlFor="size-small" className="cursor-pointer">
              Small (1-50 members)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="size-medium" />
            <Label htmlFor="size-medium" className="cursor-pointer">
              Medium (51-100 members)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="size-large" />
            <Label htmlFor="size-large" className="cursor-pointer">
              Large (100+ members)
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
            <h1 className="text-3xl font-bold tracking-tight">Campus Clubs</h1>
            <p className="text-muted-foreground">
              Find your community and get involved in student organizations
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-20">
                <FiltersContent />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <SearchBar 
                  placeholder="Search clubs..." 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="flex-1"
                />
                
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
              </div>
              
              {filteredClubs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredClubs.map(club => (
                    <ClubCard key={club.id} club={club} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No clubs found</h3>
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
