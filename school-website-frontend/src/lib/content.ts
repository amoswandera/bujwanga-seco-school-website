// Types for our content
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  status: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
}

// Content data
export const news: NewsItem[] = [
  {
    id: '1',
    title: 'Annual Science Fair 2024',
    description: 'Join us for our annual science fair showcasing innovative student projects.',
    image: '/news/science-fair.jpg',
    date: '2024-06-15',
    link: '/news-events/science-fair-2024',
  },
  {
    id: '2',
    title: 'New Sports Complex Opening',
    description: 'Our new state-of-the-art sports complex is now open for student activities.',
    image: '/news/sports-complex.jpg',
    date: '2024-06-10',
    link: '/news-events/sports-complex-opening',
  },
  {
    id: '3',
    title: 'Scholarship Program',
    description: 'Applications are now open for our merit-based scholarship program.',
    image: '/news/scholarship.jpg',
    date: '2024-06-05',
    link: '/news-events/scholarship-program',
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Parent-Teacher Conference',
    date: '2024-07-10',
    location: 'Main Hall',
    status: 'Upcoming',
  },
  {
    id: '2',
    title: 'Inter-School Sports Day',
    date: '2024-08-05',
    location: 'Sports Complex',
    status: 'Upcoming',
  },
  {
    id: '3',
    title: 'Graduation Ceremony',
    date: '2024-09-15',
    location: 'Auditorium',
    status: 'Upcoming',
  },
];

export const departments: Department[] = [
  {
    id: '1',
    name: 'Science',
    description: 'Biology, Chemistry, Physics, and more.',
  },
  {
    id: '2',
    name: 'Mathematics',
    description: 'Algebra, Geometry, Calculus, and Statistics.',
  },
  {
    id: '3',
    name: 'Languages',
    description: 'English, French, Kiswahili, and more.',
  },
  {
    id: '4',
    name: 'Humanities',
    description: 'History, Geography, Religious Studies.',
  },
  {
    id: '5',
    name: 'Arts',
    description: 'Music, Fine Arts, Drama.',
  },
  {
    id: '6',
    name: 'Technology',
    description: 'ICT, Computer Science, Robotics.',
  },
];

export const clubs: Club[] = [
  {
    id: '1',
    name: 'Science Club',
    description: 'Explore science through experiments and competitions.',
  },
  {
    id: '2',
    name: 'Debate Society',
    description: 'Sharpen your public speaking and critical thinking skills.',
  },
  {
    id: '3',
    name: 'Drama Club',
    description: 'Express yourself through acting and stage performances.',
  },
  {
    id: '4',
    name: 'Music Club',
    description: 'Join the school band or choir and perform at events.',
  },
  {
    id: '5',
    name: 'ICT Club',
    description: 'Learn coding, robotics, and new technologies.',
  },
  {
    id: '6',
    name: 'Environmental Club',
    description: 'Promote sustainability and environmental awareness.',
  },
]; 