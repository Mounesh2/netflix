'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MovieCardProps {
  title: string;
  imageUrl: string;
  videoUrl?: string;
  index?: number;
}

export default function MovieCard({ title, imageUrl, videoUrl, index = 0 }: MovieCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl);

  const handleClick = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      // Try alternative thumbnail formats
      if (imageUrl.includes('/hqdefault.jpg')) {
        setImgSrc(imageUrl.replace('/hqdefault.jpg', '/mqdefault.jpg'));
      } else if (imageUrl.includes('/maxresdefault.jpg')) {
        setImgSrc(imageUrl.replace('/maxresdefault.jpg', '/hqdefault.jpg'));
      } else {
        // Fallback to a placeholder
        setImgSrc('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="112"%3E%3Crect fill="%23333" width="200" height="112"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E' + encodeURIComponent(title) + '%3C/text%3E%3C/svg%3E');
      }
    }
  };

  return (
    <motion.div
      className="relative min-w-[200px] h-[112px] rounded overflow-hidden cursor-pointer group bg-[#333]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.08, zIndex: 10 }}
      onClick={handleClick}
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={handleImageError}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm font-medium truncate">{title}</p>
      </div>
    </motion.div>
  );
}
