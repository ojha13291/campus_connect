
import { Book, Calendar, Clock, Map, Search, Users } from "lucide-react";

export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  founded: string;
  meetingSchedule: string;
  location: string;
  logo: string;
  coverImage: string;
  social: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    email: string;
  }
}

export const clubs: Club[] = [
  {
    id: "1",
    name: "Tech Innovation Club",
    description: "A community of tech enthusiasts who collaborate on innovative projects, participate in hackathons, and explore emerging technologies. We host workshops, coding sessions, and bring in industry speakers regularly.",
    category: "Technology",
    members: 185,
    founded: "2018",
    meetingSchedule: "Every Tuesday, 6:00 PM",
    location: "Engineering Building, Room 204",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    social: {
      instagram: "techinnovate",
      twitter: "techinnovate",
      facebook: "techinnovateclub",
      email: "techinnovate@university.edu"
    }
  },
  {
    id: "2",
    name: "Cultural Diversity Association",
    description: "We celebrate the rich diversity of cultures represented on campus through events, discussions, and community service. Our mission is to promote understanding and appreciation of different cultures and traditions.",
    category: "Cultural",
    members: 120,
    founded: "2010",
    meetingSchedule: "Every Other Wednesday, 5:30 PM",
    location: "Student Center, Room 305",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1725618878496-233974f2fd59?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    social: {
      instagram: "diversityassoc",
      facebook: "culturaldiversityassociation",
      email: "diversity@university.edu"
    }
  },
  {
    id: "3",
    name: "Environmental Action Coalition",
    description: "Dedicated to promoting sustainability and environmental awareness on campus and in our community. We organize clean-ups, recycling initiatives, and educational campaigns about environmental issues.",
    category: "Environment",
    members: 65,
    founded: "2015",
    meetingSchedule: "Fridays, 3:00 PM",
    location: "Science Building, Room 103",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1503058474900-cb76710f9cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    social: {
      instagram: "enviroaction",
      twitter: "enviroaction",
      facebook: "environmentalactioncoalition",
      email: "environment@university.edu"
    }
  },
  {
    id: "4",
    name: "Business Leaders Network",
    description: "Connecting aspiring business professionals with opportunities for networking, skill development, and career preparation. We host networking events, case competitions, and workshops with industry leaders.",
    category: "Business",
    members: 95,
    founded: "2012",
    meetingSchedule: "Mondays, 7:00 PM",
    location: "Business School, Room 130",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    social: {
      linkedin: "business-leaders-network",
      instagram: "businessleaders",
      twitter: "bizleadersnet",
      email: "businessleaders@university.edu"
    }
  },
  {
    id: "5",
    name: "Performing Arts Society",
    description: "A collaborative space for students passionate about theater, music, dance, and other performing arts. We produce several shows throughout the year and welcome performers of all experience levels.",
    category: "Arts",
    members: 110,
    founded: "2008",
    meetingSchedule: "Thursdays, 6:30 PM",
    location: "Arts Center, Room 210",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    social: {
      instagram: "performingartssoc",
      facebook: "performingartssociety",
      email: "arts@university.edu"
    }
  },
  {
    id: "6",
    name: "Sports club",
    description: "A collaborative space for students passionate about soccer, basketball, volleyball, and other sports. We organize several tournaments throughout the year and welcome athletes of all skill levels.",
    category: "sports",
    members: 310,
    founded: "1993",
    meetingSchedule: "Thursdays, 6:30 PM",
    location: "Arts Center, Room 210",
    logo: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    social: {
      instagram: "ssclub",
      facebook: "sportsclub",
      email: "sports@university.edu"
    }
  }
];

export const clubCategories = [...new Set(clubs.map(club => club.category))];

export const clubIcons = {
  members: Users,
  founded: Clock,
  meetingSchedule: Calendar,
  location: Map,
  category: Book,
};
