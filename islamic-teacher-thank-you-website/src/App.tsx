import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AudioPlayer from './components/AudioPlayer';
import Gallery from './components/Gallery';
import {
  OrnamentalDivider,
  ScrollIndicator,
  FloatingStars,
  ArabicBismillah,
  SectionTitle,
  IslamicStar,
} from './components/IslamicOrnament';

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#welkom', label: 'Welkom' },
    { href: '#bedankt', label: 'Bedankt' },
    { href: '#beste-meester', label: 'Beste Meester' },
    { href: '#galerij', label: 'Galerij' },
    { href: '#afsluiting', label: 'Afsluiting' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-islamic-green-950/95 backdrop-blur-xl shadow-lg shadow-islamic-green-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href="#welkom" className="flex items-center gap-2 group">
          <IslamicStar size={24} className="group-hover:animate-rotate-slow transition-all" />
          <span className="gold-text font-bold text-lg font-[var(--font-playfair)]">شكراً</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gold-300/70 hover:text-gold-300 text-sm tracking-wider uppercase transition-colors duration-300 font-light"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gold-400 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-islamic-green-950/98 backdrop-blur-xl border-t border-gold-500/10 px-4 py-6"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-gold-300/70 hover:text-gold-300 text-sm tracking-wider uppercase transition-colors border-b border-gold-500/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <motion.section
      id="welkom"
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="star-pattern absolute inset-0" />
      </div>

      <FloatingStars />

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <ArabicBismillah className="mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mb-6"
        >
          <IslamicStar size={50} className="mx-auto animate-glow mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[var(--font-playfair)] leading-tight mb-6"
        >
          <span className="gold-text-shimmer">Bedankt voor alles,</span>
          <br />
          <span className="text-white">beste meester!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="hero-subtitle text-lg md:text-xl text-gold-200/70 font-light max-w-2xl mx-auto leading-relaxed font-[var(--font-amiri)]"
          dir="rtl"
        >
          جزاك الله خيراً — Moge Allah u rijkelijk belonen
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
          <span className="text-gold-400/50 text-sm">✦ ✦ ✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
        </motion.div>
      </motion.div>

      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </motion.section>
  );
}

// Thank You Section
function ThankYouSection() {
  return (
    <section id="bedankt" className="relative py-20 md:py-32 bg-cream islamic-pattern-light">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionTitle subtitle="Een woord van dankbaarheid vanuit het hart">
          Persoonlijk Bedankje
        </SectionTitle>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative quote marks */}
          <div className="absolute -top-8 left-4 md:left-8 text-gold-300/30 text-8xl font-[var(--font-amiri)] leading-none select-none">
            ❝
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-20">
              <IslamicStar size={40} />
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <IslamicStar size={40} />
            </div>

            {/* TEXT BLOCK */}
            <div className="space-y-6 text-islamic-green-800/90 text-lg md:text-xl leading-relaxed font-light">
              <p>
                <span className="text-2xl md:text-3xl font-[var(--font-playfair)] font-semibold text-islamic-green-700 block mb-4">
                  Beste meester,
                </span>

                Soms komen er leraren in je leven die je nooit meer vergeet… en u bent er echt één van.
              </p>

              <p>
                U bent altijd zo rustig en geduldig, zelfs als iets moeilijk is.
                U legt alles zo goed uit dat ik het uiteindelijk toch begrijp.
              </p>

              <p>
                Door u heb ik niet alleen dingen uit boeken geleerd, maar ook wat echt belangrijk is in het leven:
                respect, doorzetten en goed doen voor anderen.
              </p>

              <p>
                Soms had ik het moeilijk, maar uw lessen gaven mij motivatie om niet op te geven.
                Dat zal ik nooit vergeten.
              </p>

              <p>
                Ik ben u echt heel dankbaar voor alles wat u voor mij heeft gedaan.
                U bent niet alleen een meester voor mij… maar iemand die mij echt heeft geholpen om beter te worden.
              </p>

              <p
                className="text-right font-[var(--font-amiri)] text-gold-600 text-xl md:text-2xl pt-4"
                dir="rtl"
              >
                جزاك الله خيراً يا أستاذي
              </p>
            </div>

          </div>

          {/* Closing quote */}
          <div className="absolute -bottom-4 right-4 md:right-8 text-gold-300/30 text-8xl font-[var(--font-amiri)] leading-none select-none rotate-180">
            ❝
          </div>
        </motion.div>

        <OrnamentalDivider className="mt-16" />
      </div>
    </section>
  );
}
// Best Teacher Section
function BestTeacherSection() {
  const reasons = [
    {
      icon: '📚',
      title: 'Kennis & Wijsheid',
      description: 'U deelt niet alleen kennis uit boeken, maar ook levenswijsheid die generaties overspant. Uw lessen gaan verder dan het curriculum.',
      arabic: 'العلم نور',
    },
    {
      icon: '💚',
      title: 'Geduld & Compassie',
      description: 'Uw onuitputtelijke geduld en mededogen voor elke leerling maakt u bijzonder. U ziet het potentieel in iedereen.',
      arabic: 'الصبر مفتاح الفرج',
    },
    {
      icon: '🌟',
      title: 'Inspiratie',
      description: 'U inspireert ons om groter te dromen en harder te werken. Uw passie voor onderwijs is aanstekelijk en motiveert iedereen.',
      arabic: 'كن مصدر إلهام',
    },
    {
      icon: '🤲',
      title: 'Geloof & Karakter',
      description: 'U leert ons niet alleen over de wereld, maar ook over onze deen. U bent een voorbeeld van goed karakter en toewijding.',
      arabic: 'خير الناس أنفعهم للناس',
    },
    {
      icon: '🕊️',
      title: 'Vrede & Respect',
      description: 'In uw klas heerst altijd een sfeer van respect en vrede. U leert ons om met liefde en begrip naar anderen te kijken.',
      arabic: 'السلام عليكم',
    },
    {
      icon: '🌱',
      title: 'Groei & Ontwikkeling',
      description: 'Dankzij u zijn wij gegroeid als mensen. U plant zaden van kennis die een leven lang bloeien.',
      arabic: 'من جدّ وجد',
    },
  ];

  return (
    <section id="beste-meester" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-islamic-green-900 via-islamic-green-800 to-islamic-green-900" />
      <div className="islamic-pattern-dark absolute inset-0" />

      {/* Decorative circles */}
      <div className="absolute top-20 -left-20 w-64 h-64 rounded-full border border-gold-500/10 animate-rotate-slow" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full border border-gold-500/5" style={{ animation: 'rotate-slow 40s linear infinite reverse' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold-500/50" />
            <IslamicStar size={32} className="animate-glow" />
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-playfair)] gold-text mb-4">
            Waarom u de beste meester bent
          </h2>
          <p className="text-gold-200/60 text-lg font-light max-w-2xl mx-auto">
            Er zijn zoveel redenen om u dankbaar te zijn
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-gold-400/30" />
            <span className="text-gold-500/40 text-xs">✧ ✦ ✧</span>
            <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-gold-400/30" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="h-full bg-islamic-green-800/50 backdrop-blur-sm border border-gold-500/10 hover:border-gold-500/30 rounded-2xl p-6 md:p-8 transition-all duration-500 relative overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="text-4xl mb-4">{reason.icon}</div>
                  <h3 className="text-xl font-bold text-gold-300 font-[var(--font-playfair)] mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gold-100/60 leading-relaxed text-sm mb-4">
                    {reason.description}
                  </p>
                  <p className="text-gold-400/50 text-sm font-[var(--font-amiri)] text-right" dir="rtl">
                    {reason.arabic}
                  </p>
                </div>

                {/* Corner ornament */}
                <div className="absolute -bottom-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <IslamicStar size={80} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Gallery Section
function GallerySection() {
  return (
    <section id="galerij" className="relative py-20 md:py-32 bg-cream islamic-pattern-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionTitle subtitle="Mooie momenten en herinneringen vastgelegd">
          Fotogalerij
        </SectionTitle>

        <Gallery />
      </div>
    </section>
  );
}

// Closing Section
function ClosingSection() {
  return (
    <section id="afsluiting" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-islamic-green-950 via-islamic-green-900 to-islamic-green-950" />
      <div className="star-pattern absolute inset-0" />

      <FloatingStars />

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <IslamicStar size={60} className="mx-auto mb-8 animate-glow" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-gold-300/60 text-3xl md:text-4xl font-[var(--font-amiri)] leading-relaxed mb-8" dir="rtl">
            مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللَّهَ
          </p>
          <p className="text-gold-200/50 text-base md:text-lg font-light italic">
            "Wie de mensen niet bedankt, bedankt Allah niet."
          </p>
          <p className="text-gold-400/40 text-sm mt-2">
            — Hadith, overgeleverd door Ahmad en Tirmidhi
          </p>
        </motion.div>

        <OrnamentalDivider />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-playfair)] gold-text-shimmer leading-tight">
            Moge Allah u zegenen
          </h2>

          <div className="max-w-2xl mx-auto space-y-6 text-gold-100/60 text-lg leading-relaxed font-light">
            <p>
              Beste meester, woorden schieten tekort om uit te drukken hoeveel u voor mij
              betekent. U heeft niet alleen mijn verstand verrijkt, maar ook mijn hart en ziel.
            </p>
            <p>
              Ik bid dat Allah u beloont met het allerbeste in dit leven en het hiernamaals.
              Moge Hij uw kennis vermeerderen, uw gezondheid beschermen en uw hart met vreugde vullen.
            </p>
            <p>
              U zult altijd een bijzondere plek in mijn hart hebben. Dank u wel voor alles.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="pt-8"
          >
            <p className="text-gold-400/80 text-2xl md:text-3xl font-[var(--font-amiri)]" dir="rtl">
              بارك الله فيكم وجزاكم الله خيراً
            </p>
            <p className="text-gold-300/40 text-sm mt-3 italic">
              Moge Allah u zegenen en u rijkelijk belonen
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.3 }}
            className="pt-8"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold-500/20 bg-gold-500/5">
              <span className="text-gold-400 text-lg">❤️</span>
              <span className="text-gold-300/70 font-[var(--font-playfair)] text-lg">
                Met liefde en dankbaarheid
              </span>
              <span className="text-gold-400 text-lg">❤️</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-islamic-green-950 border-t border-gold-500/10 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/30" />
          <IslamicStar size={20} className="text-gold-500/40" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/30" />
        </div>
        <p className="text-gold-400/30 text-sm font-light">
          Met dankbaarheid en respect gemaakt ✦ شكراً جزيلاً
        </p>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[200] bg-islamic-green-950 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <IslamicStar size={60} className="mx-auto mb-6" />
              </motion.div>
              <p className="text-gold-300/60 text-xl font-[var(--font-amiri)]" dir="rtl">
                بِسْمِ ٱللَّٰهِ
              </p>
              <div className="mt-6 flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gold-500"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <Navbar />
        <HeroSection />
        <ThankYouSection />
        <BestTeacherSection />
        <GallerySection />
        <ClosingSection />
        <Footer />
        <AudioPlayer />
      </motion.div>
    </>
  );
}
