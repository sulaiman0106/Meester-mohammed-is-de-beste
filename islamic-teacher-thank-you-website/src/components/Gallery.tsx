import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Auto-detect all images from the photos directory at build time
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const photoModules: Record<string, any> = (import.meta as any).glob(
  '../photos/*.{jpg,jpeg,png,webp,gif}',
  { eager: true }
);

interface PhotoItem {
  src: string;
  name: string;
}

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const photos: PhotoItem[] = useMemo(() => {
    return Object.entries(photoModules)
      .map(([path, mod]) => ({
        src: mod.default,
        name: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') || 'Foto',
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📷</div>
        <p className="text-islamic-green-600 text-lg font-medium">
          Voeg foto's toe aan de map <code className="bg-islamic-green-100 px-2 py-1 rounded text-sm">src/photos/</code>
        </p>
        <p className="text-islamic-green-500 mt-2 text-sm">
          Ondersteunde formaten: JPG, PNG, WebP, GIF
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="gallery-item group cursor-pointer rounded-2xl overflow-hidden shadow-lg relative"
            onClick={() => setSelectedPhoto(index)}
          >
            {/* Decorative corner ornaments */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-400 z-10 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-400 z-10 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-400 z-10 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-400 z-10 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="aspect-[4/3] overflow-hidden bg-islamic-green-100">
              <img
                src={photo.src}
                alt={photo.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            {/* Overlay with title */}
            <div className="absolute inset-0 bg-gradient-to-t from-islamic-green-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4">
              <p className="text-white font-medium capitalize text-sm">{photo.name}</p>
            </div>

            {/* Zoom icon */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-0 rotate-45">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] lightbox-overlay flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
                  }}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto((selectedPhoto + 1) % photos.length);
                  }}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={selectedPhoto}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/30">
                <img
                  src={photos[selectedPhoto].src}
                  alt={photos[selectedPhoto].name}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
              </div>
              <p className="text-center text-gold-300 mt-4 font-medium capitalize text-lg font-[var(--font-playfair)]">
                {photos[selectedPhoto].name}
              </p>
              <p className="text-center text-white/50 text-sm mt-1">
                {selectedPhoto + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
