import Link from 'next/link';

export default function Admissions() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Admissions</h1>
      <div className="flex justify-center mb-8">
        <Link href="/admissions/apply" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors">
          Apply Online
        </Link>
      </div>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Complete the online application form.</li>
          <li>Submit required documents (transcripts, birth certificate, etc.).</li>
          <li>Pay the application fee.</li>
          <li>Attend an interview or entrance exam (if required).</li>
          <li>Wait for admission decision via email or phone.</li>
        </ol>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Completed application form</li>
          <li>Academic transcripts</li>
          <li>Birth certificate</li>
          <li>Passport-sized photos</li>
          <li>Application fee payment</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">When is the application deadline?</h3>
            <p className="text-gray-600">Applications are accepted year-round, but early application is encouraged.</p>
          </div>
          <div>
            <h3 className="font-bold">Is financial aid available?</h3>
            <p className="text-gray-600">Yes, we offer scholarships and bursaries for qualified students. <Link href="/news-events/scholarship-program" className="text-blue-600 hover:underline">Learn more</Link>.</p>
          </div>
        </div>
      </section>
    </div>
  );
} 