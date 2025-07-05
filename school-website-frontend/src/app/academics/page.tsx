import Image from 'next/image';
import { departments } from '@/lib/content';

export default function Academics() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Academics</h1>
      
      {/* Curriculum Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Curriculum</h2>
        <p className="text-gray-600 mb-4">
          Our school offers a comprehensive curriculum designed to challenge and inspire students at every level. 
          We emphasize critical thinking, creativity, and real-world application of knowledge.
        </p>
        <div className="relative h-64 w-full mb-4">
          <Image 
            src="/academics/curriculum.jpg" 
            alt="Curriculum" 
            fill 
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </section>

      {/* Facilities Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Our Facilities</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative h-48">
            <Image 
              src="/academics/laboratory.jpg" 
              alt="Science Laboratory" 
              fill 
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Science Laboratory</h3>
            </div>
          </div>
          <div className="relative h-48">
            <Image 
              src="/academics/library.jpg" 
              alt="Library" 
              fill 
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Library</h3>
            </div>
          </div>
          <div className="relative h-48">
            <Image 
              src="/academics/classroom.jpg" 
              alt="Modern Classroom" 
              fill 
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Modern Classroom</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Departments</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-blue-600">{dept.name}</h3>
              <p className="text-gray-600">{dept.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Support Section */}
      <section className="bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Academic Support</h2>
        <p className="text-gray-600 mb-4">
          We are committed to helping every student reach their full potential through:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>One-on-one tutoring sessions</li>
          <li>Academic counseling and guidance</li>
          <li>Enrichment programs for advanced learners</li>
          <li>Remedial classes for students who need extra support</li>
          <li>Study skills workshops</li>
        </ul>
      </section>
    </div>
  );
} 