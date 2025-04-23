
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    
    // Default to light if not saved
    if (savedTheme) {
      setTheme(savedTheme);
      root.classList.add(savedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  function toggleTheme() {
    const root = window.document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";
    
    root.classList.remove(theme);
    root.classList.add(newTheme);
    
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className={cn(
        "h-5 w-5 transition-all",
        theme === "dark" ? "scale-0" : "scale-100"
      )} />
      <Moon className={cn(
        "absolute h-5 w-5 transition-all",
        theme === "light" ? "scale-0" : "scale-100"
      )} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
