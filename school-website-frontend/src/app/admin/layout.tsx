"use client";
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaSignOutAlt, FaNewspaper, FaChartBar, FaHome, FaBook } from 'react-icons/fa';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin-auth')) {
      router.push('/admin/login');
    }
  }, [router]);
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
          <button onClick={() => { localStorage.removeItem('admin-auth'); localStorage.removeItem('admin-profile'); router.push('/admin/login'); }} className="flex items-center mt-8 text-red-300 hover:text-red-500"><FaSignOutAlt className="mr-2" /> Logout</button>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-8 min-h-screen">{children}</main>
    </div>
  );
} 