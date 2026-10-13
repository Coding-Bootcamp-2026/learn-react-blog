import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { apiFetch } from '../api';
import { useAuth } from '../context/AuthContext';

export default function PostDetailPage() {
  const { id } = useParams(); // ambil :id dari URL
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await apiFetch(`/posts/${id}`);
        setPost(data.data); // data post ada di dalam key "data"
      } catch (err) {
        setError(err.status === 404 ? 'Post tidak ditemukan.' : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]); // jalankan ulang jika id di URL berubah

  async function handleDelete() {
    if (!confirm('Yakin ingin menghapus post ini?')) return;

    try {
      await apiFetch(`/posts/${id}`, { method: 'DELETE' });
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p className="text-gray-500">Memuat data...</p>;
  if (error) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">{error}</p>
    );
  }

  // Tombol Edit & Hapus hanya untuk pemilik post
  const isOwner = user && user.id === post.user_id;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <Link to="/" className="text-sm text-blue-600 hover:underline">
        ← Kembali
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        Dibuat pada{' '}
        {new Date(post.created_at).toLocaleString('id-ID', {
          dateStyle: 'long',
          timeStyle: 'short',
        })}
      </p>
      <p className="mt-6 leading-relaxed whitespace-pre-line">{post.body}</p>

      {isOwner && (
        <div className="mt-8 flex gap-2 border-t border-gray-200 pt-4">
          <Link
            to={`/posts/${post.id}/edit`}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      )}
    </article>
  );
}
