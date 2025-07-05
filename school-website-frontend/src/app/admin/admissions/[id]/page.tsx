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

  useEffect(() => {
    fetchApp();
  }, [id]);

  const fetchApp = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:1337/api/admission-applications/${id}?populate=*`);
      setApp(res.data.data);
      setForm(res.data.data.attributes);
    } catch (err) {
      setError('Failed to fetch application');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    setActionLoading(true);
    try {
      await axios.patch(`http://localhost:4000/admission-applications/${id}`, {
        admission_status: status,
        admin_comment: adminComment
      });
      setApp((prev: any) => ({ ...prev, admission_status: status, admin_comment: adminComment }));
      setAdminComment('');
      fetchApp();
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

  const attrs = app.attributes;
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
          <div className="mb-4"><strong>Name:</strong> {attrs.full_name}</div>
          <div className="mb-4"><strong>KJSEA Number:</strong> {attrs.kjsea_number}</div>
          <div className="mb-4"><strong>Status:</strong> {attrs.admission_status || 'pending'}</div>
          <div className="mb-4"><strong>Date of Birth:</strong> {attrs.date_of_birth}</div>
          <div className="mb-4"><strong>Religion:</strong> {attrs.religion}</div>
          <div className="mb-4"><strong>Health Condition:</strong> {attrs.health_condition}</div>
          <div className="mb-4"><strong>Grade 9 Marks:</strong> {attrs.grade9_marks}</div>
          <div className="mb-4"><strong>Grade 9 Year:</strong> {attrs.grade9_year}</div>
          <div className="mb-4"><strong>Grade 9 Mean Grade:</strong> {attrs.grade9_mean_grade}</div>
          <div className="mb-4"><strong>Guardian Name:</strong> {attrs.guardian_name}</div>
          <div className="mb-4"><strong>Guardian Contact:</strong> {attrs.guardian_contact}</div>
          <div className="mb-4"><strong>Guardian Occupation:</strong> {attrs.guardian_occupation}</div>
          <div className="mb-4"><strong>Guardian ID:</strong> {attrs.guardian_id}</div>
          <div className="mb-4"><strong>Admin Comment:</strong> {attrs.admin_comment}</div>
          <div className="mb-4">
            <strong>Files:</strong>
            <ul className="list-disc ml-6">
              {fileFields.map((file, idx) => {
                const filePath = app[file.key];
                return filePath ? (
                  <li key={idx}>
                    {file.label}: <a href={filePath.replace(/^.*uploads[\\/]/, '/uploads/')} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">Download</a>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
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