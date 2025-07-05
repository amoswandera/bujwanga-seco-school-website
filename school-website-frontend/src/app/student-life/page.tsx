import Image from 'next/image';

export default function StudentLife() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Student Life</h1>
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Clubs & Societies</h2>
        <ul className="grid md:grid-cols-3 gap-8">
          {clubs.map((club, idx) => (
            <li key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-blue-600">{club.name}</h3>
              <p className="text-gray-600">{club.desc}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Sports</h2>
        <div className="relative h-64 w-full mb-4">
          <Image src="/student-life-sports.jpg" alt="Sports" fill className="object-cover rounded-lg" />
        </div>
        <p className="text-gray-600">We offer a wide range of sports including football, basketball, athletics, and more. Our new sports complex is open to all students.</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Campus Life</h2>
        <p className="text-gray-600">Our vibrant campus life includes cultural events, leadership opportunities, and a supportive community for all students.</p>
      </section>
    </div>
  );
}

const clubs = [
  { name: 'Science Club', desc: 'Explore science through experiments and competitions.' },
  { name: 'Debate Society', desc: 'Sharpen your public speaking and critical thinking skills.' },
  { name: 'Drama Club', desc: 'Express yourself through acting and stage performances.' },
  { name: 'Music Club', desc: 'Join the school band or choir and perform at events.' },
  { name: 'ICT Club', desc: 'Learn coding, robotics, and new technologies.' },
  { name: 'Environmental Club', desc: 'Promote sustainability and environmental awareness.' },
]; 