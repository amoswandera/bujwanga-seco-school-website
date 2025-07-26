"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function AdmissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = params;
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(searchParams.get('edit') === 'true');
  const [form, setForm] = useState<any>({});
  const [adminComment, setAdminComment] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchApp();
  }, [id]);

  const fetchApp = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin-token');
      const res = await axios.get(`http://localhost:4000/admission-applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApp(res.data);
      setForm(res.data);
    } catch (err) {
      setError('Failed to fetch application');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    setActionLoading(true);
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem('admin-token');
      await axios.patch(
        `http://localhost:4000/admission-applications/${id}`,
        {
          admission_status: status,
          admin_comment: adminComment
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setApp((prev: any) => ({ ...prev, admission_status: status, admin_comment: adminComment }));
      setAdminComment('');
      fetchApp();
      if (status === 'approved') {
        setSuccessMessage('Student has been approved!');
      }
    } catch (err) {
      setError('Failed to update status or send SMS');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`http://localhost:1337/api/admission-applications/${id}`, {
        data: form
      });
      setEditing(false);
      fetchApp();
    } catch (err) {
      setError('Failed to update application');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await axios.delete(`http://localhost:1337/api/admission-applications/${id}`);
      router.push('/admin/admissions');
    } catch (err) {
      setError('Failed to delete application');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!app) return <p>Application not found.</p>;

  const attrs = app;
  const fileFields = [
    { label: 'Birth Cert/Passport', key: 'birth_cert_or_passport_media_id' },
    { label: 'KJSEA Result Slip', key: 'kjsea_result_slip_media_id' },
    { label: 'Birth Cert', key: 'birth_cert_media_id' },
    { label: 'Passport Photo', key: 'passport_photo_media_id' },
    { label: 'Guardian ID Photos', key: 'guardian_id_photos_media_id' },
    { label: 'Assessment Results', key: 'assessment_results_media_id' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Application Details</h1>
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded">
          {successMessage}
        </div>
      )}
      {editing ? (
        <form onSubmit={handleSave} className="space-y-4">
          {Object.entries(form).map(([key, value]) => (
            typeof value === 'string' || typeof value === 'number' ? (
              <div key={key}>
                <label className="block font-semibold mb-1">{key.replace(/_/g, ' ')}</label>
                <input
                  name={key}
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={value as string}
                  onChange={handleChange}
                />
              </div>
            ) : null
          ))}
          <div className="flex space-x-4 mt-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={updating}>{updating ? 'Saving...' : 'Save'}</button>
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <table className="min-w-full border border-gray-300 mb-4">
            <tbody>
              <tr><th className="text-left border px-4 py-2">Name</th><td className="border px-4 py-2">{attrs.full_name}</td></tr>
              <tr><th className="text-left border px-4 py-2">KJSEA Number</th><td className="border px-4 py-2">{attrs.kjsea_number}</td></tr>
              <tr><th className="text-left border px-4 py-2">Status</th><td className="border px-4 py-2">{attrs.admission_status || 'pending'}</td></tr>
              <tr><th className="text-left border px-4 py-2">Date of Birth</th><td className="border px-4 py-2">{attrs.date_of_birth}</td></tr>
              <tr><th className="text-left border px-4 py-2">Religion</th><td className="border px-4 py-2">{attrs.religion}</td></tr>
              <tr><th className="text-left border px-4 py-2">Health Condition</th><td className="border px-4 py-2">{attrs.health_condition}</td></tr>
              <tr><th className="text-left border px-4 py-2">Grade 9 Marks</th><td className="border px-4 py-2">{attrs.grade9_marks}</td></tr>
              <tr><th className="text-left border px-4 py-2">Grade 9 Year</th><td className="border px-4 py-2">{attrs.grade9_year}</td></tr>
              <tr><th className="text-left border px-4 py-2">Grade 9 Mean Grade</th><td className="border px-4 py-2">{attrs.grade9_mean_grade}</td></tr>
              <tr><th className="text-left border px-4 py-2">Guardian Name</th><td className="border px-4 py-2">{attrs.guardian_name}</td></tr>
              <tr><th className="text-left border px-4 py-2">Guardian Contact</th><td className="border px-4 py-2">{attrs.guardian_contact}</td></tr>
              <tr><th className="text-left border px-4 py-2">Guardian Occupation</th><td className="border px-4 py-2">{attrs.guardian_occupation}</td></tr>
              <tr><th className="text-left border px-4 py-2">Guardian ID</th><td className="border px-4 py-2">{attrs.guardian_id}</td></tr>
              <tr><th className="text-left border px-4 py-2">Admin Comment</th><td className="border px-4 py-2">{attrs.admin_comment}</td></tr>
              <tr>
                <th className="text-left border px-4 py-2">Files</th>
                <td className="border px-4 py-2">
                  <ul className="list-disc ml-6">
                    {fileFields.map((file, idx) => {
                      const filePath = app[file.key];
                      return filePath ? (
                        <li key={idx}>
                          {file.label}: <a href={`http://localhost:4000${filePath.replace(/^.*uploads[\\/]/, '/uploads/')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">Download</a>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col space-y-4 mt-8">
            <textarea
              className="border rounded px-3 py-2 mb-2"
              placeholder="Admin comment (optional, e.g. request for more info)"
              value={adminComment}
              onChange={e => setAdminComment(e.target.value)}
            />
            <div className="flex space-x-4">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                disabled={actionLoading || app.admission_status === 'approved'}
                onClick={() => handleStatusUpdate('approved')}
              >
                Approve
              </button>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                disabled={actionLoading || app.admission_status === 'rejected'}
                onClick={() => handleStatusUpdate('rejected')}
              >
                Reject
              </button>
              <button
                className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
                disabled={actionLoading}
                onClick={() => handleStatusUpdate(app.admission_status || 'pending')}
              >
                Request More Info
              </button>
            </div>
          </div>
          <div className="flex space-x-4 mt-8">
            <button
              className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
} 