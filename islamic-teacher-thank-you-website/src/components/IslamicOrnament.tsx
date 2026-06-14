import { motion } from 'framer-motion';

export function OrnamentalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
      <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-gold-400/60" />
      <div className="flex items-center gap-2">
        <span className="text-gold-500 text-xs">✦</span>
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold-500 animate-rotate-slow" style={{ animationDuration: '20s' }}>
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <polygon points="20,2 26,14 38,14 28,22 32,36 20,28 8,36 12,22 2,14 14,14" />
            <circle cx="20" cy="20" r="8" />
          </g>
        </svg>
        <span className="text-gold-500 text-xs">✦</span>
      </div>
      <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-gold-400/60" />
    </div>
  );
}

export function IslamicStar({ className = '', size = 60 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      className={`text-gold-400 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      {/* 8-pointed star */}
      <polygon points="30,4 35,20 52,12 42,28 56,30 42,32 52,48 35,40 30,56 25,40 8,48 18,32 4,30 18,28 8,12 25,20" />
      <circle cx="30" cy="30" r="10" />
      <circle cx="30" cy="30" r="5" />
    </svg>
  );
}

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-gold-300/70 text-xs tracking-[0.3em] uppercase font-light">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-6 h-6 text-gold-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function FloatingStars() {
  const stars = [
    { x: '10%', y: '20%', delay: 0, size: 4 },
    { x: '85%', y: '15%', delay: 1, size: 3 },
    { x: '70%', y: '60%', delay: 2, size: 5 },
    { x: '15%', y: '70%', delay: 0.5, size: 3 },
    { x: '90%', y: '80%', delay: 1.5, size: 4 },
    { x: '50%', y: '10%', delay: 2.5, size: 3 },
    { x: '30%', y: '85%', delay: 0.8, size: 4 },
    { x: '60%', y: '30%', delay: 1.8, size: 3 },
    { x: '5%', y: '45%', delay: 2.2, size: 5 },
    { x: '95%', y: '50%', delay: 0.3, size: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute text-gold-400"
          style={{ left: star.x, top: star.y }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        >
          <svg width={star.size * 3} height={star.size * 3} viewBox="0 0 12 12">
            <polygon points="6,0 7.5,4.5 12,6 7.5,7.5 6,12 4.5,7.5 0,6 4.5,4.5" fill="currentColor" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function ArabicBismillah({ className = '' }: { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-gold-300/80 text-2xl md:text-3xl font-[var(--font-amiri)] leading-relaxed" dir="rtl">
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </p>
    </div>
  );
}

export function SectionTitle({ children, subtitle, className = '' }: { children: React.ReactNode; subtitle?: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`text-center mb-12 md:mb-16 ${className}`}
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold-500" />
        <IslamicStar size={32} className="animate-rotate-slow" />
        <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold-500" />
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-playfair)] text-islamic-green-800">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-islamic-green-600/80 font-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-gold-400/50" />
        <span className="text-gold-500 text-xs">✧ ✦ ✧</span>
        <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-gold-400/50" />
      </div>
    </motion.div>
  );
}
