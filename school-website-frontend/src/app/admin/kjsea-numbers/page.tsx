'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface KJSEAReg {
  id: number;
  kjsea_number: string;
}

export default function RegisteredKJSEANumbersPage() {
  const [kjseaNumbers, setKjseaNumbers] = useState<KJSEAReg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchKJSEA();
  }, []);

  const fetchKJSEA = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:4000/k-jsea-registrations');
      setKjseaNumbers(res.data);
    } catch (err) {
      setError('Failed to fetch KJSEA numbers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this KJSEA number?')) return;
    try {
      await axios.delete(`http://localhost:4000/k-jsea-registrations/${id}`);
      setKjseaNumbers(kjseaNumbers.filter((reg) => reg.id !== id));
    } catch (err) {
      setError('Failed to delete KJSEA number');
    }
  };

  const handleEdit = (id: number, current: string) => {
    setEditingId(id);
    setEditValue(current);
  };

  const handleEditSave = async (id: number) => {
    if (!editValue.trim()) return;
    try {
      await axios.put(`http://localhost:4000/k-jsea-registrations/${id}`, { kjsea_number: editValue });
      setKjseaNumbers(kjseaNumbers.map((reg) => reg.id === id ? { ...reg, kjsea_number: editValue } : reg));
      setEditingId(null);
      setEditValue('');
    } catch (err) {
      setError('Failed to update KJSEA number');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Registered KJSEA Numbers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : kjseaNumbers.length === 0 ? (
        <p>No KJSEA numbers registered yet.</p>
      ) : (
        <ul className="list-disc ml-6">
          {kjseaNumbers.map((reg) => (
            <li key={reg.id} className="flex items-center space-x-4 mb-2">
              {editingId === reg.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    className="border rounded px-2 py-1 mr-2"
                  />
                  <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleEditSave(reg.id)}>Save</button>
                  <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{reg.kjsea_number}</span>
                  <button className="text-yellow-600 hover:underline ml-2" onClick={() => handleEdit(reg.id, reg.kjsea_number)}>Edit</button>
                  <button className="text-red-600 hover:underline ml-2" onClick={() => handleDelete(reg.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 