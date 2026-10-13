import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { apiFetch } from '../api';
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';

export default function EditPostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // 1. Ambil data post lama untuk mengisi form
  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await apiFetch(`/posts/${id}`);
        setPost(data.data); // data post ada di dalam key "data"
      } catch (err) {
        setMessage(err.status === 404 ? 'Post tidak ditemukan.' : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // 2. Kirim perubahan ke API
  async function handleUpdate(form) {
    setErrors({});
    setMessage('');
    setSaving(true);

    try {
      await apiFetch(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      });

      navigate(`/posts/${id}`);
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setMessage(err.message); // contoh: 403 "You do not own this post"
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Memuat data...</p>;
  if (!post) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">{message}</p>
    );
  }

  if (post.user_id !== user.id) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">
        Kamu tidak berhak mengedit post ini.
      </p>
    );
  }

  return (
    <div>
      <Link to={`/posts/${id}`} className="text-sm text-blue-600 hover:underline">
        ← Batal
      </Link>
      <h1 className="mt-4 mb-6 text-3xl font-bold">Edit Post</h1>

      {message && (
        <p className="mb-4 rounded-md bg-red-100 px-4 py-3 text-red-800">
          {message}
        </p>
      )}

      {/* Form baru dirender setelah data post siap, agar terisi data lama */}
      <PostForm
        initialData={{ title: post.title, body: post.body }}
        onSubmit={handleUpdate}
        errors={errors}
        loading={saving}
        submitLabel="Simpan Perubahan"
      />
    </div>
  );
}
