'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useForm } from 'react-hook-form';

export default function HomePage() {
  const [projects, setProjects] = useState<any[]>([]);
  const { register, handleSubmit, reset } = useForm();

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await api.get('/projects', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first.');
      return;
    }

    try {
      await api.post(
        '/projects',
        { title: data.title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      reset();
      fetchProjects();
    } catch (err: any) {
      alert('Failed to create project: ' + (err.response?.data?.message || 'Error'));
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex gap-2">
        <input
          {...register('title')}
          placeholder="New task"
          className="p-2 text-black rounded flex-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <ul>
        {projects.length === 0 && <p>No tasks yet.</p>}
        {projects.map((p) => (
          <li
            key={p.id}
            className="bg-gray-800 p-3 rounded mb-2 shadow-sm"
          >
            {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
