import React, { useState } from "react";
import districtsData from "../data/mpDistricts.json";
import DistrictModal from "./DistrictModal";

const LandingPage = () => {
  const [year, setYear] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const currentYear = new Date().getFullYear();
    const trimmedYear = year.trim();

    // 1️⃣ Required
    if (!trimmedYear) {
      setError("Year is required.");
      return;
    }

    // 2️⃣ Numbers only
    if (!/^\d{4}$/.test(trimmedYear)) {
      setError("Please enter a valid 4-digit year.");
      return;
    }

    const numericYear = Number(trimmedYear);

    // 3️⃣ Minimum year check
    if (numericYear < 1956) {
      setError("Year cannot be before 1956.");
      return;
    }

    // 4️⃣ Future year check
    if (numericYear > currentYear) {
      setError(`Year cannot be greater than ${currentYear}.`);
      return;
    }

    setError("");

    const result = districtsData.districts.filter(
      (district) => district.creation_year === numericYear,
    );

    setFilteredDistricts(result);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 rounded-full blur-[120px] opacity-30 top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-[120px] opacity-30 bottom-[-100px] right-[-100px]" />

      {/* Main Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-4xl text-center relative z-10">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8">
          Madhya Pradesh District Finder
        </h1>

        {/* Search Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
          <input
            type="text"
            placeholder="Enter Year (e.g. 2003)"
            value={year}
            maxLength={4}
            onChange={(e) => {
              const value = e.target.value;

              // Allow only digits
              if (/^\d*$/.test(value)) {
                setYear(value);
                setError(""); // clear error while typing
              }
            }}
            className="px-6 py-3 rounded-xl bg-white/20 text-white 
  placeholder-white/70 border border-white/30 
  focus:outline-none focus:ring-2 focus:ring-pink-400 
  w-64 backdrop-blur-md caret-white"
          />

          <button
            onClick={handleSearch}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
          >
            Search
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 mb-6 font-semibold text-2xl">{error}</p>
        )}

        {/* Map Section */}
        <div className="relative mt-6 flex justify-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <img
              src="/MP-Map-55.jpg"
              alt="MP Map"
              className="w-full max-h-[450px] object-contain"
            />

            {/* 🔥 Small Total District Badge */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 shadow-lg">
              <p className="text-white text-xs tracking-wide">
                Total Districts
              </p>
              <p className="text-yellow-300 text-lg font-bold text-center">
                {districtsData.total_districts}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <DistrictModal
          year={year}
          districts={filteredDistricts}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;
