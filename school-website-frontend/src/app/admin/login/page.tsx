"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_USER = {
  username: 'admin',
  password: 'admin123',
  name: 'School Admin',
  email: 'admin@school.edu',
};

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      localStorage.setItem('admin-auth', 'true');
      localStorage.setItem('admin-profile', JSON.stringify(ADMIN_USER));
      router.push('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Username</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input type="password" className="w-full border rounded px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold">Login</button>
      </form>
    </div>
  );
} 