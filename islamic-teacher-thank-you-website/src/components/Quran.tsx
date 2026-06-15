import { useEffect, useState, useRef } from "react";

type Surah = {
  number: number;
  englishName: string;
};

type Ayah = {
  number: number;
  text: string;
};

export default function Quran() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  useEffect(() => {
    setLoading(true);

    fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}`)
      .then((res) => res.json())
      .then((data) => {
        setAyahs(data.data.ayahs);
        setLoading(false);
      });

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setPlaying(false);
  }, [selectedSurah]);

  const audioSrc =
    `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${selectedSurah}.mp3`;

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* selector + audio */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">

        <select
          className="p-3 rounded-lg border border-gray-300 bg-white text-black"
          value={selectedSurah}
          onChange={(e) => setSelectedSurah(Number(e.target.value))}
        >
          {surahs.map((s) => (
            <option key={s.number} value={s.number}>
              {s.number}. {s.englishName}
            </option>
          ))}
        </select>

        <button
          onClick={toggleAudio}
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          {playing ? "⏸ Pauzeer" : "▶ Start recitatie"}
        </button>
      </div>

      {/* audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={() => setPlaying(false)}
      />

      {/* loading */}
      {loading && (
        <p className="text-black text-center">Laden...</p>
      )}

      {/* ayahs */}
      <div className="space-y-6 bg-white rounded-2xl shadow-lg p-6 border">
        {ayahs.map((ayah) => (
          <p
            key={ayah.number}
            className="text-black text-lg leading-loose text-right font-[var(--font-amiri)]"
          >
            {ayah.text}
          </p>
        ))}
      </div>
    </div>
  );
}
