"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface NewsItem {
  id: string;
  attributes: {
    title: string;
    content: string;
    published_at?: string;
  };
}

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newNews, setNewNews] = useState({ title: "", content: "" });
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNews, setEditNews] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:1337/api/news");
      setNews(res.data.data);
    } catch (err) {
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await axios.post("http://localhost:1337/api/news", { data: newNews });
      setShowAdd(false);
      setNewNews({ title: "", content: "" });
      fetchNews();
    } catch (err) {
      setError("Failed to add news");
    } finally {
      setAdding(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setEditNews({ title: item.attributes.title, content: item.attributes.content });
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      await axios.put(`http://localhost:1337/api/news/${editingId}`, { data: editNews });
      setEditingId(null);
      fetchNews();
    } catch (err) {
      setError("Failed to update news");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;
    try {
      await axios.delete(`http://localhost:1337/api/news/${id}`);
      fetchNews();
    } catch (err) {
      setError("Failed to delete news");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">News Management</h1>
      <button className="mb-4 bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => setShowAdd(true)}>
        Add News Article
      </button>
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-6 bg-white p-4 rounded shadow">
          <div className="mb-2">
            <label className="block font-semibold mb-1">Title</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={newNews.title} onChange={e => setNewNews({ ...newNews, title: e.target.value })} required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Content</label>
            <textarea className="w-full border rounded px-3 py-2" value={newNews.content} onChange={e => setNewNews({ ...newNews, content: e.target.value })} required />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={adding}>{adding ? "Adding..." : "Add"}</button>
          <button type="button" className="ml-2 px-4 py-2 rounded border" onClick={() => setShowAdd(false)}>Cancel</button>
        </form>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-4">
        {news.map(item => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
            {editingId === item.id ? (
              <form onSubmit={handleEditSave} className="flex-1 flex flex-col md:flex-row md:items-center md:space-x-4">
                <input type="text" className="border rounded px-3 py-2 mb-2 md:mb-0" value={editNews.title} onChange={e => setEditNews({ ...editNews, title: e.target.value })} required />
                <textarea className="border rounded px-3 py-2 mb-2 md:mb-0" value={editNews.content} onChange={e => setEditNews({ ...editNews, content: e.target.value })} required />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                <button type="button" className="ml-2 px-4 py-2 rounded border" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold">{item.attributes.title}</h2>
                  <p className="text-gray-700 mt-2">{item.attributes.content}</p>
                  {item.attributes.published_at && <p className="text-xs text-gray-400 mt-1">Published: {new Date(item.attributes.published_at).toLocaleDateString()}</p>}
                </div>
                <div className="flex space-x-2 mt-4 md:mt-0">
                  <button className="text-yellow-600 hover:underline" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="text-red-600 hover:underline" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 