"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { events } from '@/lib/content';

interface NewsItem {
  id: string;
  attributes: {
    title: string;
    content: string;
    published_at?: string;
  };
}

export default function NewsEvents() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:1337/api/news');
      const data = await res.json();
      setNews(data.data);
    } catch (err) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">News & Events</h1>
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Latest News</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                {/* Optionally show an image if available in the future */}
                <span className="text-gray-400 text-6xl">📰</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.attributes.title}</h3>
                <p className="text-gray-600 mb-4">{item.attributes.content.slice(0, 100)}...</p>
                <span className="block text-xs text-gray-400 mb-2">{item.attributes.published_at ? new Date(item.attributes.published_at).toLocaleDateString() : ''}</span>
                {/* Optionally link to a full news page if implemented */}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="bg-blue-50 p-6 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-lg font-bold text-blue-600 mb-1">{event.title}</h4>
                <p className="text-gray-700">{event.date} &mdash; {event.location}</p>
              </div>
              <span className="mt-2 md:mt-0 text-blue-700 font-semibold">{event.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
} 