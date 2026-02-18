'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';

// Static Indian movie data using YouTube thumbnails and trailer links
const MOVIE_ROWS = [
  {
    title: 'Bollywood Blockbusters',
    movies: [
      {
        title: 'Pathaan',
        imageUrl: 'https://img.youtube.com/vi/vqu4z34wENw/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=vqu4z34wENw',
      },
      {
        title: 'Jawan',
        imageUrl: 'https://img.youtube.com/vi/COv52Qyctws/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=COv52Qyctws',
      },
      {
        title: 'Kirik Party',
        imageUrl: 'https://img.youtube.com/vi/8QvBp7p9l2s/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=8QvBp7p9l2s',
      },
      {
        title: 'Brahmāstra: Part One – Shiva',
        imageUrl: 'https://img.youtube.com/vi/BUjXzrgntcY/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=BUjXzrgntcY',
      },
      {
        title: '3 Idiots',
        imageUrl: 'https://img.youtube.com/vi/xvszmNXdM4w/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=xvszmNXdM4w',
      },
    ],
  },
  {
    title: 'South Indian Hits',
    movies: [
      {
        title: 'RRR',
        imageUrl: 'https://img.youtube.com/vi/f_vbAtFSEc0/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=f_vbAtFSEc0',
      },
      {
        title: 'KGF Chapter 2',
        imageUrl: 'https://img.youtube.com/vi/JKa05nyUmuQ/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=JKa05nyUmuQ',
      },
      {
        title: 'Baahubali 2: The Conclusion',
        imageUrl: 'https://img.youtube.com/vi/qD-6d8Wo3do/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=qD-6d8Wo3do',
      },
      {
        title: 'Pushpa: The Rise',
        imageUrl: 'https://img.youtube.com/vi/Q1NKMPhP8PY/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=Q1NKMPhP8PY',
      },
      {
        title: 'Vikram',
        imageUrl: 'https://img.youtube.com/vi/OKBMCL-frPU/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=OKBMCL-frPU',
      },
    ],
  },
  {
    title: 'Indian Drama & Biopics',
    movies: [
      {
        title: 'Dangal',
        imageUrl: 'https://img.youtube.com/vi/x_7YlGv9u1g/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=x_7YlGv9u1g',
      },
      {
        title: 'Chhichhore',
        imageUrl: 'https://img.youtube.com/vi/tsxemFX0a7k/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=tsxemFX0a7k',
      },
      {
        title: 'MS Dhoni: The Untold Story',
        imageUrl: 'https://img.youtube.com/vi/6L6XqWoS8tw/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=6L6XqWoS8tw',
      },
      {
        title: 'U Turn',
        imageUrl: 'https://img.youtube.com/vi/9X_ViIPA-Sc/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=9X_ViIPA-Sc',
      },
      {
        title: 'Bhaag Milkha Bhaag',
        imageUrl: 'https://img.youtube.com/vi/3uICXnnW86U/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=3uICXnnW86U',
      },
    ],
  },
  {
    title: 'Kannada Short Movies',
    movies: [
      {
        title: 'Kannada Short Film - Love Story',
        imageUrl: 'https://img.youtube.com/vi/8QvBp7p9l2s/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=8QvBp7p9l2s',
      },
      {
        title: 'Kannada Short Film - Friendship',
        imageUrl: 'https://img.youtube.com/vi/9X_ViIPA-Sc/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=9X_ViIPA-Sc',
      },
      {
        title: 'Kannada Short Film - Family',
        imageUrl: 'https://img.youtube.com/vi/f_vbAtFSEc0/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=f_vbAtFSEc0',
      },
      {
        title: 'Kannada Short Film - Comedy',
        imageUrl: 'https://img.youtube.com/vi/JKa05nyUmuQ/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=JKa05nyUmuQ',
      },
      {
        title: 'Kannada Short Film - Drama',
        imageUrl: 'https://img.youtube.com/vi/qD-6d8Wo3do/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=qD-6d8Wo3do',
      },
    ],
  },
  {
    title: 'Kannada Songs',
    movies: [
      {
        title: 'KGF Chapter 2 - Toofan',
        imageUrl: 'https://img.youtube.com/vi/JKa05nyUmuQ/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=JKa05nyUmuQ',
      },
      {
        title: 'KGF Chapter 2 - Dheera Dheera',
        imageUrl: 'https://img.youtube.com/vi/OKBMCL-frPU/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=OKBMCL-frPU',
      },
      {
        title: 'RRR - Naatu Naatu (Kannada)',
        imageUrl: 'https://img.youtube.com/vi/f_vbAtFSEc0/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=f_vbAtFSEc0',
      },
      {
        title: 'Kantara - Varaha Roopam',
        imageUrl: 'https://img.youtube.com/vi/Q1NKMPhP8PY/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=Q1NKMPhP8PY',
      },
      {
        title: 'KGF Chapter 1 - Gali Gali',
        imageUrl: 'https://img.youtube.com/vi/COv52Qyctws/hqdefault.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=COv52Qyctws',
      },
    ],
  },
];

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);
  const heroVideoUrl = 'https://www.youtube.com/watch?v=aF08WVSvCok'; // Toxic movie trailer
  const heroImageUrl = 'https://img.youtube.com/vi/aF08WVSvCok/maxresdefault.jpg';
  
  const heroMovieInfo = {
    title: 'Toxic',
    description: 'A Fairy Tale for Grown-Ups. Rocking Star Yash returns in this epic thriller directed by Geetu Mohandas. Starring Yash, Kiara Advani, Nayanthara, Huma Qureshi, Tara Sutaria, and Rukmini Vasanth.',
    releaseDate: 'March 19, 2026',
    genre: 'Thriller, Action',
    director: 'Geetu Mohandas',
  };

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      return;
    }
    api
      .get('/auth/me')
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar user={user} />
      <main className="pt-16">
        {/* Hero banner */}
        <section className="relative h-[70vh] min-h-[400px] flex items-end pb-24 px-8">
          <div className="absolute inset-0">
            {!heroImageError ? (
              <img
                src={heroImageUrl}
                alt="Toxic Movie Trailer"
                className="w-full h-full object-cover"
                onError={() => {
                  setHeroImageError(true);
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#e50914] to-[#141414] flex items-center justify-center">
                <p className="text-white text-2xl font-bold">Toxic</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
          </div>
          <motion.div
            className="relative max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Toxic
            </h1>
            <p className="text-lg text-white/90 mb-6">
              A Fairy Tale for Grown-Ups. Rocking Star Yash returns in this epic thriller.
            </p>
            <div className="flex gap-3">
              <motion.button
                onClick={() => window.open(heroVideoUrl, '_blank', 'noopener,noreferrer')}
                className="px-8 py-3 bg-white text-black font-semibold rounded flex items-center gap-2 hover:bg-white/90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                ▶ Play
              </motion.button>
              <motion.button
                onClick={() => setShowInfoModal(true)}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded flex items-center gap-2 hover:bg-white/30 backdrop-blur"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                ℹ More Info
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Movie rows */}
        <section className="px-8 -mt-16 space-y-10 pb-16">
          {MOVIE_ROWS.map((row, rowIndex) => (
            <motion.div
              key={row.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * rowIndex }}
            >
              <h2 className="text-xl font-bold mb-4">{row.title}</h2>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {row.movies.map((movie, i) => (
                  <MovieCard
                    key={movie.title}
                    title={movie.title}
                    imageUrl={movie.imageUrl}
                    videoUrl={movie.videoUrl}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      {/* Info Modal */}
      {showInfoModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowInfoModal(false)}
        >
          <motion.div
            className="bg-[#181818] rounded-lg max-w-2xl w-full mx-4 p-8 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold mb-4">{heroMovieInfo.title}</h2>
            <div className="space-y-3 text-white/80">
              <p className="text-lg">{heroMovieInfo.description}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div>
                  <span className="text-white/60">Release Date:</span>
                  <span className="ml-2">{heroMovieInfo.releaseDate}</span>
                </div>
                <div>
                  <span className="text-white/60">Genre:</span>
                  <span className="ml-2">{heroMovieInfo.genre}</span>
                </div>
                <div>
                  <span className="text-white/60">Director:</span>
                  <span className="ml-2">{heroMovieInfo.director}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <motion.button
                onClick={() => {
                  window.open(heroVideoUrl, '_blank', 'noopener,noreferrer');
                  setShowInfoModal(false);
                }}
                className="px-6 py-2 bg-[#e50914] text-white font-semibold rounded hover:bg-[#f40612]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                ▶ Watch Trailer
              </motion.button>
              <motion.button
                onClick={() => setShowInfoModal(false)}
                className="px-6 py-2 bg-white/20 text-white font-semibold rounded hover:bg-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
