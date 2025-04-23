
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Home, Search, Users } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { title: "Home", path: "/", icon: Home },
    { title: "Events", path: "/events", icon: Calendar },
    { title: "Clubs", path: "/clubs", icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="rounded-full bg-primary p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary-foreground"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span>SMVIT Campus Connect</span>
          </Link>
        </div>

        
        <div className="hidden md:flex md:items-center md:gap-5">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="mr-2">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <ModeToggle />

          
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("h-5 w-5 transition-all", isMenuOpen ? "rotate-90" : "")}
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-56" : "max-h-0"
        )}
      >
        <div className="container py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
