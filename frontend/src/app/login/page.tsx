'use client';

import { useState } from 'react';
import api from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make POST request to backend
      const res = await api.post('/auth/login', { email, password });

      // Save JWT token to localStorage
      localStorage.setItem('token', res.data.access_token);

      alert('Login successful!');
      window.location.href = '/'; // Redirect to home page
    } catch (err: any) {
      console.error('Login error:', err);
      alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded shadow-md flex flex-col gap-4 w-80"
      >
        <input
          type="email"
          placeholder="Email"
          className="p-2 text-black rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 text-black rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white font-semibold disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
