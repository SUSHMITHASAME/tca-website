import React from 'react';
import { FaUsers, FaStar, FaSeedling, FaVideo, FaMusic, FaBookOpen, FaGifts, FaSearch, FaLanguage, FaMoon } from "react-icons/fa";

const highlights = [
  {
    title: "Cultural Heritage",
    description: "Preserving and celebrating the rich traditions of Telugu culture through festivals, arts, and community gatherings.",
    icon: <FaSeedling size={30} className="text-orange-600" />,
  },
  {
    title: "Community Building",
    description: "Bringing together Telugu students, faculty, and staff to create lasting bonds and a supportive environment.",
    icon: <FaUsers size={30} className="text-orange-600" />,
  },
  {
    title: "Excellence",
    description: "Maintaining high standards in events while adapting to modern student needs.",
    icon: <FaStar size={30} className="text-orange-600" />,
  },
];


const About = () => {
  return (
    <div className="bg-[#fffaf5] text-gray-800 px-6 py-12 pt-25">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className=" text-4xl font-semibold text-center text-[#191818] mb-4">About TCA</h1>

        {/* History Section
       <section>
          {/* <div className='w-full md:w-[60%] lg:w-[65%] backdrop-blur-md bg-white/50 p-6 sm:p-8 rounded-xl shadow-xl'>
          <h2 className="text-2xl font-semibold text-[#cc4444] mb-2">Our History</h2>
          <p className="leading-relaxed text-lg">
            Once lovingly called the <span className="font-medium">"Second Andhra"</span>, Kharagpur has long been a home
            to Telugu-speaking families — drawn here by Indian Railways and IIT Kharagpur, the nation's first premier institute.
            <br /><br />
            In the 1960s, a few visionary Telugu professors established the Telugu Cultural Association (TCA) to celebrate festivals and preserve their identity far from home.
            Initially supported by faculty, TCA evolved in the ’90s and early 2000s as students began actively participating in events alongside staff and professors.
            <br /><br />
            With the rise of social media and growing Telugu student strength, TCA formally embraced student leadership in <span className="font-medium">October 2023</span> with the creation of the <span className="font-medium">Students’ Telugu Cultural Association (STCA)</span>.
          </p>
          </div>*

        {/* Vision Section */}
          {/* <div className='w-full md:w-[60%] lg:w-[65%] backdrop-blur-md bg-white/50 p-6 sm:p-8 rounded-xl shadow-xl'>
          <h2 className="text-2xl font-semibold text-[#cc4444] mb-2">Our Vision</h2> */}
          <p className="text-center w-full md:w-[90%] lg:w-[100%] backdrop-blur-md bg-white/50 p-4 sm:p-8 rounded-xl shadow-xl leading-relaxed text-lg">
            STCA aims to build a strong Telugu community at IIT Kharagpur that proudly celebrates our culture through
            <span className="font-medium"> language, music, dance, art, and festivals</span>.
            Rooted in tradition and embracing Gen-Z spirit, we believe in a <span className="italic">"culture-holistic"</span> approach — making every celebration feel like home for our Telugu junta.
          </p>

      </div>
      {/* Top Highlights */}
      <section className="bg-[#fffaf5] pt-16 px-4 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-semibold text-[#5b1b1b] font-display mb-2">Our Highlights</h2>
          <p className="text-md text-[#3f1e1e] max-w-xl mx-auto">
            What we stand for and continuously aim to promote.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-center">
            {highlights.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 shadow-amber-900 hover:shadow-md transform transition-transform duration-300 ease-in-out hover:scale-103">
                <div className="mb-3 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#5b1b1b]">{item.title}</h3>
                <p className="text-sm mt-2 text-[#472f2f]">{item.description}</p>
              </div>
            ))}
        </div>
      </section>
  
    </div>
  );

};


export default About;
