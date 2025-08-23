import React, { useEffect, useState } from "react";
// import { fetchYouTubeStats } from ".components/utils/fetchYouTubeStats";
import { fetchYouTubeStats } from "../components/utils/fetchYouTubeStats";
 // Make sure path is correct

const History = () => {
  // const [ytStats, setYtStats] = useState(null);

  // useEffect(() => {
  //   fetchYouTubeStats().then((data) => {
  //     setYtStats(data);
  //   });
  // }, []);

  const stats = [
    { label: "Years of Heritage", value: "60+" },
    {
      label: "YouTube Subscribers",
      value: "58K+",
      //  ytStats ? `${(ytStats.subscribers / 1000).toFixed(1)}K+` :
    },
    {
      label: "Video Views",
      value: "24M+",
      //  ytStats ? `${(ytStats.views / 1000000).toFixed(1)}M+` :
    },
    {
      label: "Videos Uploaded",
       value : "400+",
      // value: ytStats ? `${ytStats.videos}+` : "400+",
    },
  ];

  const historyData = [
    {
      year: "1960s",
      title: "Foundation",
      description:
        "TCA was founded by Telugu professors to celebrate Telugu festivals and uphold culture far from home. Funds were raised amongst professors to organize traditional events.",
    },
    {
      year: "1990s",
      title: "Student Participation",
      description:
        "Students residing on campus began attending events and participating. The body started evolving from a faculty-only association.",
    },
    {
      year: "Early 2000s",
      title: "Community Harmony",
      description:
        "Harmony developed between students, faculty, and staff bodies, creating a unified cultural community.",
    },
    {
      year: "2012",
      title: "Digital Era",
      description:
        "Due to rising internet culture and social media, students became an integral part of the association.",
    },
    {
      year: "October 2023",
      title: "Students' TCA",
      description:
        "A separate section was formed – the Students' Telugu Cultural Association, led by Governor Kumidhini Kesana.",
    },
  ];

  return (
    <section id="history" className="bg-[#fff4ec] py-1 px-6 sm:px-12 pt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl text-[#0a0606] font-display mb-6">
          Our Rich History
        </h2>
        <p className="text-md sm:text-lg text-orange-600 max-w-3xl mx-auto">
          From humble beginnings in the 1960s to becoming the most prominent cultural association at IIT Kharagpur
        </p>
        <p className="text-[#120c0c] italic mt-2">"Second Andhra"</p>
        <p className="text-sm text-[#816868] max-w-xl mx-auto mt-1">
          Kharagpur has been historically known by the alias "Second Andhra" because of the Telugu diaspora from then Andhra Pradesh settling at Kharagpur for Railway jobs and IITKGP being the first premiere institute of the Nation.
        </p>
      </div>

      {/* Timeline Blocks */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-20">
        {historyData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/50 backdrop-blur-md p-6 rounded-xl border border-stone-200 shadow-amber-900 hover:shadow-md transform transition-transform duration-300 ease-in-out hover:scale-103"
          >
            <p className="text-sm text-[#9f4747] font-bold">{item.year}</p>
            <h3 className="text-xl font-semibold text-[#551818] mt-1">
              {item.title}
            </h3>
            <p className="text-sm text-[#3b1f1f] mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center px-4 sm:px-20">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-gray-200 hover:shadow-md transform transition-transform duration-300 ease-in-out hover:scale-103"
          >
            <p className="text-3xl p-1 font-bold text-[#641b1b]">{stat.value}</p>
            <p className="text-sm text-[#3b1f1f]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default History;
