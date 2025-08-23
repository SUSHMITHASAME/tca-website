// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [currentLeadership, setCurrentLeadership] = useState({
//     year: "",
//     data: [{ name: "", role: "" }],
//   });

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/teams");
//       const teamData = response.data;
//       console.log("Fetched Team Data:", teamData);

//       if (teamData && teamData.currentLeadership) {
//         // Ensure the shape always matches the default
//         setCurrentLeadership({
//           year: teamData.currentLeadership.year || "",
//           data:
//             teamData.currentLeadership.data?.map((m) => ({
//               name: m.name || "",
//               role: m.role || "",
//             })) || [{ name: "", role: "" }],
//         });
//       }
//     } catch (error) {
//       console.error("Failed to load data", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const hasInvalidMember = currentLeadership.data.some(
//       (member) => !member.name.trim() || !member.role.trim()
//     );
//     if (hasInvalidMember) {
//       alert("Please fill in all names and roles.");
//       return;
//     }

//     try {
//       await axios.put("http://localhost:5000/api/teams", {
//         currentLeadership,
//       });
//       alert("Data saved successfully");
//     } catch (error) {
//       console.error("Failed to save data", error);
//       alert("Failed to save data");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">
//         Admin Dashboard - Edit Current Leadership
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block font-medium">Academic Year</label>
//           <input
//             type="text"
//             value={currentLeadership.year || ""}
//             onChange={(e) =>
//               setCurrentLeadership({
//                 ...currentLeadership,
//                 year: e.target.value,
//               })
//             }
//             className="border border-gray-300 px-3 py-2 rounded w-full"
//             placeholder="e.g., 2025-26"
//           />
//         </div>

//         {currentLeadership.data.map((member, index) => (
//           <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
//             <div className="mb-2">
//               <label className="block font-medium">Name</label>
//               <input
//                 type="text"
//                 value={member.name || ""}
//                 onChange={(e) => {
//                   const newData = [...currentLeadership.data];
//                   newData[index] = {
//                     ...newData[index],
//                     name: e.target.value,
//                   };
//                   setCurrentLeadership({
//                     ...currentLeadership,
//                     data: newData,
//                   });
//                 }}
//                 className="border border-gray-300 px-3 py-2 rounded w-full"
//               />
//             </div>
//             <div>
//               <label className="block font-medium">Role</label>
//               <input
//                 type="text"
//                 value={member.role || ""}
//                 onChange={(e) => {
//                   const newData = [...currentLeadership.data];
//                   newData[index] = {
//                     ...newData[index],
//                     role: e.target.value,
//                   };
//                   setCurrentLeadership({
//                     ...currentLeadership,
//                     data: newData,
//                   });
//                 }}
//                 className="border border-gray-300 px-3 py-2 rounded w-full"
//               />
//             </div>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={() =>
//             setCurrentLeadership({
//               ...currentLeadership,
//               data: [...currentLeadership.data, { name: "", role: "" }],
//             })
//           }
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         >
//           Add Member
//         </button>

//         <button
//           type="submit"
//           className="bg-green-600 text-white px-6 py-2 rounded"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [currentLeadership, setCurrentLeadership] = useState({
    year: "",
    data: [{ name: "", role: "" }],
  });

  // Fetch existing team data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teams");
      const teamData = response.data;
      console.log("Fetched Team Data:", teamData);

      if (teamData && teamData.currentLeadership) {
        setCurrentLeadership({
          year: teamData.currentLeadership.year || "",
          data:
            teamData.currentLeadership.data?.map((m) => ({
              name: m.name || "",
              role: m.role || "",
            })) || [{ name: "", role: "" }],
        });
      }
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Validation
  const validateData = () => {
    const hasInvalidMember = currentLeadership.data.some(
      (member) => !member.name.trim() || !member.role.trim()
    );
    if (!currentLeadership.year.trim()) {
      alert("Please enter an academic year.");
      return false;
    }
    if (hasInvalidMember) {
      alert("Please fill in all names and roles.");
      return false;
    }
    return true;
  };

  // Update without archive
  const handleUpdate = async () => {
    if (!validateData()) return;

    try {
      await axios.put("http://localhost:5000/api/teams/update-current", {
        year: currentLeadership.year,
        data: currentLeadership.data,
      });
      await axios.delete(`http://localhost:5000/api/teams/past/${yearToDelete}`);
      alert("Current leadership updated successfully");
      fetchData();
    } catch (error) {
      console.error("Failed to update data", error);
      alert("Failed to update data");
    }
  };

  // Archive and update
  const handleArchiveAndUpdate = async () => {
    if (!validateData()) return;

    try {
      await axios.put("http://localhost:5000/api/teams/archive-and-update", {
        year: currentLeadership.year,
        data: currentLeadership.data,
      });
      alert("Leadership archived and updated successfully");
      fetchData();
    } catch (error) {
      console.error("Failed to archive & update data", error);
      alert("Failed to archive & update data");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Admin Dashboard - Edit Current Leadership
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <div className="mb-4">
          <label className="block font-medium">Academic Year</label>
          <input
            type="text"
            value={currentLeadership.year || ""}
            onChange={(e) =>
              setCurrentLeadership({
                ...currentLeadership,
                year: e.target.value,
              })
            }
            className="border border-gray-300 px-3 py-2 rounded w-full"
            placeholder="e.g., 2025-26"
          />
        </div>

        {currentLeadership.data.map((member, index) => (
          <div key={index} className="mb-4 border p-3 rounded bg-gray-50">
            <div className="mb-2">
              <label className="block font-medium">Name</label>
              <input
                type="text"
                value={member.name || ""}
                onChange={(e) => {
                  const newData = [...currentLeadership.data];
                  newData[index] = { ...newData[index], name: e.target.value };
                  setCurrentLeadership({
                    ...currentLeadership,
                    data: newData,
                  });
                }}
                className="border border-gray-300 px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block font-medium">Role</label>
              <input
                type="text"
                value={member.role || ""}
                onChange={(e) => {
                  const newData = [...currentLeadership.data];
                  newData[index] = { ...newData[index], role: e.target.value };
                  setCurrentLeadership({
                    ...currentLeadership,
                    data: newData,
                  });
                }}
                className="border border-gray-300 px-3 py-2 rounded w-full"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setCurrentLeadership({
              ...currentLeadership,
              data: [...currentLeadership.data, { name: "", role: "" }],
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Member
        </button>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Save Current
          </button>
          <button
            type="button"
            onClick={handleArchiveAndUpdate}
            className="bg-orange-600 text-white px-6 py-2 rounded"
          >
            Save & Archive
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;
