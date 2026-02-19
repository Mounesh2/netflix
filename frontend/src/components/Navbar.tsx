'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavbarUser {
  name?: string;
  email?: string;
}

interface NavbarProps {
  user?: NavbarUser | null;
  onSearch?: (query: string) => void;
}

export default function Navbar({ user, onSearch }: NavbarProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
    router.refresh();
  };

  const handleSearchSubmit = () => {
    const q = searchInput.trim();
    if (q && onSearch) onSearch(q);
  };

  const profileInitial =
    (user?.name && user.name.trim().charAt(0).toUpperCase()) ||
    (user?.email && user.email.trim().charAt(0).toUpperCase()) ||
    'U';

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-gradient-to-b from-black/80 to-transparent transition-all"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href="/" className="text-[#e50914] font-bold text-2xl tracking-tight">
        NETFLIX
      </Link>
      <div className="flex items-center gap-4">
        {onSearch && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              className="px-3 py-1.5 rounded bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-[#e50914] focus:outline-none w-40 sm:w-52 text-sm"
            />
            <motion.button
              onClick={handleSearchSubmit}
              className="px-3 py-1.5 rounded bg-[#e50914] text-white text-sm font-medium hover:bg-[#f40612]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Search
            </motion.button>
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-sm font-semibold border border-gray-600">
          {profileInitial}
        </div>
        <motion.button
          onClick={handleLogout}
          className="text-sm font-medium text-white/90 hover:text-white px-4 py-2 rounded bg-[#333] hover:bg-[#e50914] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  );
}
