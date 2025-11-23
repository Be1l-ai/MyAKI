import React, { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeTogetherDays, setTimeTogetherDays] = useState(0);
  const [timeTogetherHours, setTimeTogetherHours] = useState(0);
  const [timeTogetherMinutes, setTimeTogetherMinutes] = useState(0);
  const [timeTogetherSeconds, setTimeTogetherSeconds] = useState(0);
  
  const [timeKnownDays, setTimeKnownDays] = useState(0);
  const [timeKnownHours, setTimeKnownHours] = useState(0);
  const [timeKnownMinutes, setTimeKnownMinutes] = useState(0);
  const [timeKnownSeconds, setTimeKnownSeconds] = useState(0);

  // Anniversary date: Nov 17, 2024
  const anniversaryDate = new Date('2024-11-17T00:00:00').getTime();
  // First met date: Sep 10, 2024
  const firstMetDate = new Date('2024-09-10T00:00:00').getTime();

  useEffect(() => {
    const updateCountdowns = () => {
      const now = Date.now();
      
      // Calculate time together (since anniversary)
      const togetherDiff = now - anniversaryDate;
      const togetherDays = Math.floor(togetherDiff / (1000 * 60 * 60 * 24));
      const togetherHours = Math.floor((togetherDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const togetherMinutes = Math.floor((togetherDiff % (1000 * 60 * 60)) / (1000 * 60));
      const togetherSeconds = Math.floor((togetherDiff % (1000 * 60)) / 1000);
      
      setTimeTogetherDays(togetherDays);
      setTimeTogetherHours(togetherHours);
      setTimeTogetherMinutes(togetherMinutes);
      setTimeTogetherSeconds(togetherSeconds);
      
      // Calculate time known (since first met)
      const knownDiff = now - firstMetDate;
      const knownDays = Math.floor(knownDiff / (1000 * 60 * 60 * 24));
      const knownHours = Math.floor((knownDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const knownMinutes = Math.floor((knownDiff % (1000 * 60 * 60)) / (1000 * 60));
      const knownSeconds = Math.floor((knownDiff % (1000 * 60)) / 1000);
      
      setTimeKnownDays(knownDays);
      setTimeKnownHours(knownHours);
      setTimeKnownMinutes(knownMinutes);
      setTimeKnownSeconds(knownSeconds);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-theme-black/80 backdrop-blur-sm rounded-lg shadow-2xl p-4 min-w-[80px] md:min-w-[100px] border-2 border-theme-gold/40">
        <div className="text-3xl md:text-4xl font-bold text-theme-gold font-modern">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="text-sm md:text-base text-white mt-2 font-modern">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full py-16 px-4">
      {/* Together Timer */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-romantic font-bold text-center text-gray-800 mb-4">
          We've Been Together For
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
          <TimeUnit value={timeTogetherDays} label="Days" />
          <TimeUnit value={timeTogetherHours} label="Hours" />
          <TimeUnit value={timeTogetherMinutes} label="Minutes" />
          <TimeUnit value={timeTogetherSeconds} label="Seconds" />
        </div>
        <p className="text-center text-gray-600 font-modern text-lg">
          Since November 17, 2024 ‹𝟹 <br/> I miss you ( •̯́ ₃ •̯̀)
        </p>
      </div>

      {/* Known Timer */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-romantic font-bold text-center text-gray-800 mb-4">
          And We Known Each Other For
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
          <TimeUnit value={timeKnownDays} label="Days" />
          <TimeUnit value={timeKnownHours} label="Hours" />
          <TimeUnit value={timeKnownMinutes} label="Minutes" />
          <TimeUnit value={timeKnownSeconds} label="Seconds" />
        </div>
        <p className="text-center text-gray-600 font-modern text-lg">
          Since September 10, 2024 𑣲
        </p>
      </div>
    </div>
  );
}
