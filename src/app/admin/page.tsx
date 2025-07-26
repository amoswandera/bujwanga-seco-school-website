'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [kjseaNumbers, setKjseaNumbers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKJSEA = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:4000/k-jsea-registrations');
        // If backend returns array of objects with kjsea_number
        setKjseaNumbers(res.data.map((reg: any) => reg.kjsea_number));
      } catch (err) {
        setError('Failed to fetch KJSEA numbers');
      } finally {
        setLoading(false);
      }
    };
    fetchKJSEA();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin!</h1>
      <div className="space-y-4">
        <p>Use the sidebar to manage school services.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Link href="/admin/admissions" className="bg-blue-600 text-white p-8 rounded-xl shadow-lg flex flex-col items-center hover:bg-blue-700 transition">
            <span className="text-2xl font-bold mb-2">Admissions</span>
            <span>Manage student applications</span>
          </Link>
          <Link href="/admin/kjsea" className="bg-green-600 text-white p-8 rounded-xl shadow-lg flex flex-col items-center hover:bg-green-700 transition">
            <span className="text-2xl font-bold mb-2">KJSEA Registrations</span>
            <span>Manage KJSEA registrations</span>
          </Link>
          <Link href="/admin/news" className="bg-yellow-500 text-white p-8 rounded-xl shadow-lg flex flex-col items-center hover:bg-yellow-600 transition">
            <span className="text-2xl font-bold mb-2">News Management</span>
            <span>Post and manage school news</span>
          </Link>
          <Link href="/admin/analytics" className="bg-purple-600 text-white p-8 rounded-xl shadow-lg flex flex-col items-center hover:bg-purple-700 transition">
            <span className="text-2xl font-bold mb-2">Analytics</span>
            <span>View school analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 