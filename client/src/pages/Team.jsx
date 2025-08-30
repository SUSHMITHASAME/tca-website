import React, { useEffect, useState } from "react";
import axios from "../axios";

const Team = () => {
  const [current, setCurrent] = useState(null);
  const [past, setPast] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get("/teams");
        setCurrent(res.data.currentLeadership);
        setPast(res.data.pastLeadership || []);
      } catch (err) {
        console.error("Error fetching team data", err);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className=" max-w-5xl pt-20 mx-auto font-sans">
      {/* Current Leadership */}
      <h1 className="text-center text-3xl font-semibold text-red-600 mb-6">
        Current Leadership ({current?.year})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 ">
        {current?.data?.map((pos, idx) => (
          <div
            key={idx}
            className="hover:shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 bg-gradient-to-r from-orange-300 to-red-400 rounded-2xl p-6 shadow-md text-white"
          >
            <h3 className="text-xl font-semibold mb-3 ">{pos.role}</h3>
            <ul className="space-y-1">
           {Array.isArray(pos.members) && pos.members.map((name, i) => <li key={i}>• {name}</li>)}

            </ul>
          </div>
        ))}
      </div>

      {/* Past Leadership */}
      <h2 className="text-center text-2xl font-semibold text-red-600 mb-6">
        Past Leadership
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
        {[...past]
          .sort((a, b) => {
            const [startA] = a.year.split("-").map(Number);
            const [startB] = b.year.split("-").map(Number);
            return startB - startA; // Sort latest year first
          })
          .map((yearBlock, i) => (
            <div
              key={i}
              className="p-6 bg-white shadow-md border border-orange-200 hover:shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 rounded-3xl"
            >
              <h3 className="text-lg font-bold text-red-700 mb-4">
                {yearBlock.year}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {yearBlock?.data?.map((pos, idx) => (
                  <div key={idx}>
                    <h4 className="font-semibold mb-2">{pos.role}</h4>
                    <ul className="space-y-1">
                      {Array.isArray(pos.members) && pos.members.map((name, i) => <li key={i}>• {name}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Team;
