'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      router.push('/');
      router.refresh();
    } catch (err: unknown) {
      const res = err && typeof err === 'object' && 'response' in err ? (err as { response?: { data?: { error?: string } } }).response : null;
      setError(res?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">
      <nav className="p-6">
        <Link href="/" className="text-[#e50914] font-bold text-3xl tracking-tight">
          NETFLIX
        </Link>
      </nav>
      <motion.div
        className="flex-1 flex items-center justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md bg-black/70 rounded-lg p-12 shadow-2xl">
          <h1 className="text-3xl font-bold mb-8">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#e50914] text-sm bg-[#e50914]/20 p-3 rounded"
              >
                {error}
              </motion.p>
            )}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#333] text-white rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#333] text-white rounded px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e50914] text-white font-semibold py-3 rounded hover:bg-[#f40612] disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>
          <p className="mt-6 text-gray-400">
            New to Netflix?{' '}
            <Link href="/signup" className="text-white hover:underline">
              Sign up now
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
}
