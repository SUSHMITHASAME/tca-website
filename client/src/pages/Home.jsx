import React from "react";
import { FaBirthdayCake, FaUsers, FaHistory } from "react-icons/fa";
const Home = () => {
  return (
    <section
  id="home"
  className="relative -mt-20 px-4 text-white min-h-[90vh] flex flex-col items-center justify-center bg-cover bg-center m-0 p-0"
  style={{
    backgroundImage: "url('/hero.png')", // ✅ Correct path
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-[#E9724C]/70"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center text-center">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl p-1 sm:p-0 md:pd-1 lg:p-3 font-bold font-display leading-snug">
      తెలుగు సాంస్కృతిక సంఘం
    </h1>
    <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-snug">
      Telugu Cultural Association
    </h1>
    <p className="text-base sm:text-lg md:text-xl mt-4 font-medium tracking-wide">
      Preserving and celebrating Telugu heritage at IIT Kharagpur since 1960
    </p>

    {/* Stats */}
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 max-w-3xl">
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-2 sm:p-1 md:p-2 lg:p-4 px-10 sm:px-10 md:px-20 lg:px-30 rounded-xl border border-[#eb7b3f] shadow-md text-center">
        <FaBirthdayCake className="text-4xl text-white mb-1" />
        <p className="text-1xl font-bold">1960</p>
        <p className="text-sm font-medium">Founded</p>
      </div>
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-3 rounded-xl border border-[#f7b37b] shadow-md text-center">
        <FaUsers className="text-4xl text-white mb-1" />
        <p className="text-1xl font-bold">100+</p>
        <p className="text-sm font-medium">Members</p>
      </div>
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-3 rounded-xl border border-[#f7b37b] shadow-md text-center">
        <FaHistory className="text-4xl text-white mb-1" />
        <p className="text-1xl font-bold">{new Date().getFullYear() - 1960}+</p>
        <p className="text-sm font-medium">Years of Culture</p>
      </div>
    </div>
  </div>
</section>

  );
};

export default Home;