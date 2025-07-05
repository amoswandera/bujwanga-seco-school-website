"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Application {
  id: string;
  attributes: {
    full_name: string;
    kjsea_number: string;
    admission_status?: string;
  };
}

export default function AdmissionsAdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newApp, setNewApp] = useState({ full_name: '', kjsea_number: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:4000/admission-applications');
      setApplications(res.data);
    } catch (err) {
      setError('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await axios.post('http://localhost:4000/admission-applications', {
        data: newApp
      });
      setShowAdd(false);
      setNewApp({ full_name: '', kjsea_number: '' });
      fetchApplications();
    } catch (err) {
      setError('Failed to add application');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await axios.delete(`http://localhost:4000/admission-applications/${id}`);
      fetchApplications();
    } catch (err) {
      setError('Failed to delete application');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admission Applications</h1>
      <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded" onClick={() => setShowAdd(true)}>Add New Application</button>
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-6 bg-white p-4 rounded shadow">
          <div className="mb-2">
            <label className="block font-semibold mb-1">Full Name</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={newApp.full_name} onChange={e => setNewApp({ ...newApp, full_name: e.target.value })} required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">KJSEA Number</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={newApp.kjsea_number} onChange={e => setNewApp({ ...newApp, kjsea_number: e.target.value })} required />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={adding}>{adding ? 'Adding...' : 'Add'}</button>
          <button type="button" className="ml-2 px-4 py-2 rounded border" onClick={() => setShowAdd(false)}>Cancel</button>
        </form>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">KJSEA Number</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td className="px-4 py-2 border">{app.attributes.full_name}</td>
                <td className="px-4 py-2 border">{app.attributes.kjsea_number}</td>
                <td className="px-4 py-2 border">{app.attributes.admission_status || 'pending'}</td>
                <td className="px-4 py-2 border space-x-2">
                  <Link href={`/admin/admissions/${app.id}`} className="text-blue-600 hover:underline">View</Link>
                  <Link href={`/admin/admissions/${app.id}?edit=true`} className="text-yellow-600 hover:underline">Edit</Link>
                  <button className="text-red-600 hover:underline ml-2" onClick={() => handleDelete(app.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 