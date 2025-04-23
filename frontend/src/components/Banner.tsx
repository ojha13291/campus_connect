
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BannerContent {
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  image: string;
  bgColor: string;
}

const bannerContents: BannerContent[] = [
  {
    title: "Spring Cultural Festival",
    subtitle: "Experience diverse cultures through food, performances & art",
    cta: "Learn More",
    link: "/events/2",
    image: "https://images.unsplash.com/photo-1683585940613-3f77b9147325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    bgColor: "from-purple-700 to-indigo-900"
  },
  {
    title: "Tech Hackathon 2025",
    subtitle: "Join 200+ students for 24 hours of coding, creating & competing",
    cta: "Register Now",
    link: "/events/1",
    image: "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    bgColor: "from-blue-600 to-indigo-800"
  },
  {
    title: "Join Campus Clubs",
    subtitle: "Discover 50+ student organizations to match your interests",
    cta: "Explore Clubs",
    link: "/clubs",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    bgColor: "from-violet-600 to-purple-800"
  }
];

export function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerContents.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative h-[350px] sm:h-[400px] md:h-[450px]">
      {bannerContents.map((content, index) => (
        <motion.div
          key={index}
          className={cn(
            "absolute inset-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 overflow-hidden",
            `bg-gradient-to-r ${content.bgColor}`
          )}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === current ? 2.5 : 0,
            zIndex: index === current ? 10 : 0,
          }}
          transition={{ duration: 0.7 }}
        >
          <div className="z-10 max-w-xl space-y-4 text-center md:text-left text-white">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: index === current ? 0 : 20, opacity: index === current ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {content.title}
            </motion.h1>
            <motion.p 
              className="text-md md:text-lg opacity-90"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: index === current ? 0 : 20, opacity: index === current ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {content.subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: index === current ? 0 : 20, opacity: index === current ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to={content.link}>
                <Button className="mt-4 bg-white text-primary hover:bg-white/90">
                  {content.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src={content.image} 
              alt={content.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      ))}
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {bannerContents.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
