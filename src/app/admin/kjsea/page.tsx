"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

interface KJSEARegistration {
  id: string;
  attributes: {
    kjsea_number: string;
  };
}

export default function KJSEAAdminPage() {
  const [registrations, setRegistrations] = useState<KJSEARegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newReg, setNewReg] = useState('');
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:4000/k-jsea-registrations');
      setRegistrations(res.data);
    } catch (err) {
      setError('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setSuccess(null);
    try {
      await axios.post('http://localhost:4000/k-jsea-registrations', {
        kjsea_number: newReg
      });
      setNewReg('');
      setSuccess('KJSEA number has been added to the system.');
      fetchRegistrations();
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to add registration');
      }
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    try {
      await axios.delete(`http://localhost:4000/k-jsea-registrations/${id}`);
      fetchRegistrations();
    } catch (err) {
      setError('Failed to delete registration');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">KJSEA Registrations</h1>
      <form onSubmit={handleAdd} className="mb-6 bg-white p-4 rounded shadow">
        <div className="mb-2">
          <label className="block font-semibold mb-1">KJSEA Number</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={newReg} onChange={e => setNewReg(e.target.value)} required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={adding}>{adding ? 'Adding...' : 'Add'}</button>
      </form>
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">KJSEA Number</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(reg =>
              reg.attributes ? (
                <tr key={reg.id}>
                  <td className="px-4 py-2 border">{reg.attributes.kjsea_number}</td>
                  <td className="px-4 py-2 border">
                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(reg.id)}>Delete</button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      )}
    </div>
  );
} 