"use client";
import { useEffect, useState } from 'react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin-profile');
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('admin-profile', JSON.stringify(profile));
    setEditing(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Name</label>
        <input
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2"
          value={profile.name}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Email</label>
        <input
          name="email"
          type="email"
          className="w-full border rounded px-3 py-2"
          value={profile.email}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>
      <div className="flex space-x-4">
        {!editing ? (
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setEditing(true)}>
            Edit
          </button>
        ) : (
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </div>
  );
} 