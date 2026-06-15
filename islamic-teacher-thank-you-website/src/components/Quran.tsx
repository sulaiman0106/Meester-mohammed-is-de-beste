import { useEffect, useState } from "react";

type Surah = {
  number: number;
  englishName: string;
  name: string;
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

  // Load all surahs
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  // Load selected surah
  useEffect(() => {
    setLoading(true);

    fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}`)
      .then((res) => res.json())
      .then((data) => {
        setAyahs(data.data.ayahs);
        setLoading(false);
      });
  }, [selectedSurah]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Surah selector */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <label className="text-gray-800 font-medium">
          Kies een soera:
        </label>

        <select
          className="p-3 rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
          value={selectedSurah}
          onChange={(e) => setSelectedSurah(Number(e.target.value))}
        >
          {surahs.map((s) => (
            <option key={s.number} value={s.number}>
              {s.number}. {s.englishName}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-600 text-center mb-6">Laden...</p>
      )}

      {/* Ayahs */}
      <div className="space-y-6 bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
        {ayahs.map((ayah) => (
          <div
            key={ayah.number}
            className="border-b border-gray-100 pb-4 last:border-0"
          >
            <p className="text-gray-900 text-lg md:text-xl leading-relaxed font-[var(--font-amiri)]">
              {ayah.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
