"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsAdminPage() {
  const [admitted, setAdmitted] = useState(0);
  const [total, setTotal] = useState(0); // Now fetched from KJSEA registrations
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const admittedRes = await axios.get("http://localhost:1337/api/admission-applications?filters[admission_status][$eq]=approved");
      setAdmitted(admittedRes.data.data.length);
      const kjseaRes = await axios.get("http://localhost:1337/api/k-jsea-registrations");
      setTotal(kjseaRes.data.data.length);
    } catch (err) {
      setAdmitted(0);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const percent = total > 0 ? ((admitted / total) * 100).toFixed(1) : 0;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
          <span className="text-4xl font-bold text-purple-700 mb-2">{admitted}</span>
          <span className="text-lg text-gray-700 mb-4">Students Admitted</span>
          <span className="text-2xl font-bold text-green-600 mb-2">{percent}%</span>
          <span className="text-gray-500">of {total} expected students</span>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center">
          <span className="text-lg text-gray-700 mb-4">Admission Rate</span>
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600" style={{ width: `${percent}%` }}></div>
          </div>
          <span className="mt-2 text-sm text-gray-500">{admitted} / {total} students</span>
        </div>
      </div>
    </div>
  );
} 