export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
            <input type="text" id="name" name="name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea id="message" name="message" rows={5} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">Send Message</button>
        </form>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <ul className="text-gray-700 space-y-2">
          <li><strong>Address:</strong> 123 Education Street, City, State 12345</li>
          <li><strong>Phone:</strong> (123) 456-7890</li>
          <li><strong>Email:</strong> info@schoolname.edu</li>
        </ul>
      </section>
    </div>
  );
} 