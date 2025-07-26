"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaUser, FaSignOutAlt, FaNewspaper, FaChartBar, FaHome, FaBook } from 'react-icons/fa';
import axios from 'axios';

// Create axios instance with auth interceptor
const api = axios.create({
  baseURL: 'http://localhost:4000'
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin-token');
      localStorage.removeItem('admin-user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    const userData = localStorage.getItem('admin-user');
    if (!token || !userData) {
      // Only redirect if not already on login page
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      return;
    }
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      localStorage.removeItem('admin-token');
      localStorage.removeItem('admin-user');
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [router, pathname]);

  // Only show loading if not on login page
  if (!user && pathname !== '/admin/login') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col p-6 shadow-lg min-h-screen">
        <div className="flex items-center mb-10">
          <FaHome className="text-3xl mr-3" />
          <h2 className="text-2xl font-extrabold tracking-wide">Admin Panel</h2>
        </div>
        <nav className="flex flex-col space-y-4 text-lg">
          <Link href="/admin" className="flex items-center hover:text-blue-300"><FaHome className="mr-2" /> Dashboard</Link>
          <Link href="/admin/admissions" className="flex items-center hover:text-blue-300"><FaBook className="mr-2" /> Admissions</Link>
          <Link href="/admin/kjsea" className="flex items-center hover:text-blue-300"><FaBook className="mr-2" /> KJSEA Registrations</Link>
          <Link href="/admin/kjsea-numbers" className="flex items-center hover:text-blue-300"><FaBook className="mr-2" /> Registered KJSEA Numbers</Link>
          <Link href="/admin/news" className="flex items-center hover:text-blue-300"><FaNewspaper className="mr-2" /> News Management</Link>
          <Link href="/admin/analytics" className="flex items-center hover:text-blue-300"><FaChartBar className="mr-2" /> Analytics</Link>
          <Link href="/admin/profile" className="flex items-center hover:text-blue-300"><FaUser className="mr-2" /> Profile</Link>
          <button onClick={() => {
            localStorage.removeItem('admin-token');
            localStorage.removeItem('admin-user');
            router.push('/admin/login');
          }} className="flex items-center mt-8 text-red-300 hover:text-red-500"><FaSignOutAlt className="mr-2" /> Logout</button>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-8 min-h-screen">{children}</main>
    </div>
  );
} 