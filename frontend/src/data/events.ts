
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  category: string;
  image: string;
  registered?: boolean;
  attendees?: number;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Annual Tech Hackathon",
    date: "May 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Innovation Center, Building A",
    description: "Join us for a 24-hour coding marathon where students can collaborate, innovate, and compete for prizes. This year's theme focuses on sustainable technology solutions. Meals and refreshments will be provided. Participants should bring their own laptops and any necessary equipment.",
    organizer: "Computer Science Department",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    attendees: 120
  },
  {
    id: "2",
    title: "Spring Cultural Festival",
    date: "May 22, 2025",
    time: "11:00 AM - 8:00 PM",
    location: "University Quad",
    description: "Experience diverse cultures through performances, food stalls, art exhibitions, and interactive workshops. The annual Spring Cultural Festival celebrates our campus diversity with music, dance, and cuisine from around the world. Everyone is welcome to attend this free event.",
    organizer: "Student Cultural Association",
    category: "Cultural",
    image: "https://plus.unsplash.com/premium_photo-1670267552055-8f33a55c1af0?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    attendees: 450
  },
  {
    id: "3",
    title: "Career Networking Night",
    date: "June 5, 2025",
    time: "5:30 PM - 8:30 PM",
    location: "Business School Auditorium",
    description: "Connect with industry professionals and alumni from various sectors including finance, marketing, healthcare, and technology. This networking event provides an excellent opportunity for students to explore career paths, seek advice, and potentially find internship and job opportunities.",
    organizer: "Career Development Center",
    category: "Career",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    attendees: 200
  },
  {
    id: "4",
    title: "Environmental Awareness Workshop",
    date: "June 12, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Science Building, Room 302",
    description: "Learn about sustainable practices and how you can contribute to environmental conservation on campus and beyond. This interactive workshop will cover topics such as waste reduction, energy conservation, and sustainable living. Certificates will be provided to all participants.",
    organizer: "Environment Club",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1503058474900-cb76710f9cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    attendees: 75
  },
  {
    id: "5",
    title: "Sports Tournament Finals",
    date: "June 20, 2025",
    time: "3:00 PM - 7:00 PM",
    location: "University Sports Complex",
    description: "Cheer for your favorite teams as they compete in the finals of this semester's inter-department sports tournament. Events include basketball, volleyball, and soccer. Refreshments will be available, and special performances are planned for the halftime shows.",
    organizer: "Athletics Department",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1579187707643-35646d22b596?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    attendees: 350
  },
  {
    id: "6",
    title: "Research Symposium",
    date: "July 8, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Central Library Conference Hall",
    description: "Undergraduate and graduate students will present their research projects across various disciplines. This is an excellent opportunity to learn about cutting-edge research happening on campus and network with faculty and fellow researchers.",
    organizer: "Office of Research",
    category: "Academic",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    attendees: 180
  }
];

export const categoryIcons = {
  Technology: CalendarDays,
  Cultural: Users,
  Career: Clock,
  Workshop: CalendarDays,
  Sports: Users,
  Academic: MapPin
};

export const categories = [...new Set(events.map(event => event.category))];
