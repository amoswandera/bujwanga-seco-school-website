import Image from 'next/image';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative h-[400px] mb-12">
        <Image
          src="/about-hero.jpg"
          alt="School Campus"
          fill
          className="object-cover rounded-lg"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            About Our School
          </h1>
        </div>
      </div>

      {/* History Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Our History</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 mb-4">
              Founded in 1990, our school has been a cornerstone of educational
              excellence for over three decades. What began as a small institution
              with just 100 students has grown into a comprehensive educational
              community serving over 1,000 students annually.
            </p>
            <p className="text-gray-600">
              Throughout our history, we have maintained our commitment to
              academic excellence while adapting to the changing needs of our
              students and society. Our campus has expanded to include
              state-of-the-art facilities while preserving the historic buildings
              that tell our story.
            </p>
          </div>
          <div className="relative h-[300px]">
            <Image
              src="/history.jpg"
              alt="School History"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
            <p className="text-gray-600">
              To provide a transformative educational experience that empowers
              students to become lifelong learners, critical thinkers, and
              responsible global citizens. We are committed to fostering academic
              excellence, character development, and social responsibility.
            </p>
          </div>
          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-green-600">Our Vision</h3>
            <p className="text-gray-600">
              To be a leading educational institution that inspires innovation,
              embraces diversity, and prepares students to make meaningful
              contributions to society. We envision a future where our graduates
              are leaders in their chosen fields and positive forces for change.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-blue-600 mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Our Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {leadership.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.position}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const values = [
  {
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: 'Excellence',
    description:
      'We strive for excellence in all aspects of education, from academics to character development.',
  },
  {
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: 'Community',
    description:
      'We foster a supportive and inclusive community where everyone feels valued and respected.',
  },
  {
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: 'Innovation',
    description:
      'We embrace innovation and creativity in teaching and learning to prepare students for the future.',
  },
];

const leadership = [
  {
    name: 'Dr. Sarah Johnson',
    position: 'Principal',
    description:
      'With over 20 years of experience in education, Dr. Johnson leads our school with vision and dedication.',
    image: '/leadership/principal.jpg',
  },
  {
    name: 'Michael Chen',
    position: 'Deputy Principal',
    description:
      'Mr. Chen oversees academic programs and student affairs, ensuring excellence in all aspects of education.',
    image: '/leadership/deputy.jpg',
  },
  {
    name: 'Dr. Emily Rodriguez',
    position: 'Head Teacher',
    description:
      'Dr. Rodriguez leads our curriculum development and ensures the highest standards of academic excellence.',
    image: '/leadership/head-teacher.jpg',
  },
]; 