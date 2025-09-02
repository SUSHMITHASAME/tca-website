import React from "react";
import { Sparkles, Flower, Sun, Moon, Star } from "lucide-react"; // icons

const Events = () => {
  const springEvents = [
    {
      name: "Bhogi & Sankranthi",
      description:
        "A harvest festival where TCA celebrates with traditional rituals, rangoli, festive food, and cultural performances.",
      icon: <Sun className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "Shivaratri Cinema Screening",
      description:
        "Students gather to watch devotional cinema that brings together faith and bonding.",
      icon: <Moon className="w-6 h-6 text-purple-500" />,
    },
    {
      name: "Holi Flashmob",
      description:
        "A vibrant celebration of colors with energetic dance and music to spread joy.",
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    },
    {
      name: "Fundae Session",
      description:
        "Fun and interactive activities organized to strengthen bonding among juniors and seniors.",
      icon: <Star className="w-6 h-6 text-yellow-500" />,
    },
    {
      name: "Ugadi",
      description:
        "Telugu New Year marked with prayers, special food, and cultural activities at campus.",
      icon: <Flower className="w-6 h-6 text-green-500" />,
    },
    {
      name: "Sri Rama Navami",
      description:
        "Commemorated with devotional programs, bhajans, and cultural performances.",
      icon: <Sparkles className="w-6 h-6 text-red-500" />,
    },
  ];

  const autumnEvents = [
    {
      name: "Freshers Introduction",
      description:
        "Welcoming new Telugu students with interactive sessions and cultural ice-breakers.",
      icon: <Sun className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "Treasure Hunt",
      description:
        "Fun-filled campus-wide event where teams solve clues and challenges together.",
      icon: <Sparkles className="w-6 h-6 text-blue-500" />,
    },
    {
      name: "Telugu Bhasha Dinotsavam",
      description:
        "Celebrating the richness of Telugu language with poetry, speeches, and literary activities.",
      icon: <Flower className="w-6 h-6 text-green-600" />,
    },
    {
      name: "Vinayaka Chavithi",
      description:
        "Festivities include idol installation, puja, and cultural activities honoring Lord Ganesha.",
      icon: <Star className="w-6 h-6 text-yellow-600" />,
    },
    {
      name: "Janmashtami Cinema Screening",
      description:
        "Screening of devotional films to celebrate Krishna Janmashtami with bhakti and joy.",
      icon: <Moon className="w-6 h-6 text-indigo-500" />,
    },
    {
      name: "Cultural Night",
      description:
        "The flagship event showcasing Telugu dance, music, skits, and traditional performances.",
      icon: <Sparkles className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <section className="bg-[#FFF9F5] py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-brown-800 mb-3">
          Our Events
        </h2>
        <p className="text-brown-600 mb-12">
          From festive celebrations to cultural showcases, TCA organizes events
          throughout the year that bring together our Telugu community.
        </p>

        {/* Spring Events */}
        <h3 className="text-2xl font-semibold text-brown-800 mb-6">Spring</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 ">
          {springEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 text-left "
            >
              <div className="flex items-center gap-3 mb-3">
                {event.icon}
                <h4 className="text-lg font-semibold text-brown-800  text-orange-500">
                  {event.name}
                </h4>
              </div>
              <p className="text-brown-700">{event.description}</p>
            </div>
          ))}
        </div>

        {/* Autumn Events */}
        <h3 className="text-2xl font-semibold text-brown-800 mb-6">Autumn</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {autumnEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                {event.icon}
                <h4 className="text-lg font-semibold text-brown-800 text-orange-500">
                  {event.name}
                </h4>
              </div>
              <p className="text-brown-700">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;

