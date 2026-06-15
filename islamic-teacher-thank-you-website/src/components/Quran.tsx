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

  // 1. alle soera’s ophalen
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  // 2. geselecteerde soera laden
  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}`)
      .then((res) => res.json())
      .then((data) => setAyahs(data.data.ayahs));
  }, [selectedSurah]);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      {/* Surah selector */}
      <select
        className="mb-6 p-2 text-black rounded"
        value={selectedSurah}
        onChange={(e) => setSelectedSurah(Number(e.target.value))}
      >
        {surahs.map((s) => (
          <option key={s.number} value={s.number}>
            {s.number}. {s.englishName}
          </option>
        ))}
      </select>

      {/* Ayahs */}
      <div className="space-y-4 text-right font-[var(--font-amiri)] text-xl leading-loose">
        {ayahs.map((ayah) => (
          <p key={ayah.number}>{ayah.text}</p>
        ))}
      </div>
    </div>
  );
}
