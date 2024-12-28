// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const InstructorProfile = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [selectedInstructor, setSelectedInstructor] = useState("");
//   const [instructorDetails, setInstructorDetails] = useState(null);

//   // Fetch all instructors.
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/studio/instructors")
//       .then((response) => {
//         setInstructors(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching instructors:", error);
//       });
//   }, []);

//   // Fetch details of the selected instructor
//   const fetchInstructor = (id) => {
//     axios
//       .get(`http://localhost:3000/studio/instructors/${id}`)
//       .then((response) => {
//         setInstructorDetails(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching instructor details:", error);
//       });
//   };

//   const handleInstructorChange = (e) => {
//     const instructorID = e.target.value;
//     setSelectedInstructor(instructorID);
//     if (instructorID) {
//       fetchInstructor(instructorID);
//     } else {
//       setInstructorDetails(null);
//     }
//   };

//   return (
//     <div>
//       <label>
//         Instructors:
//         <select
//           className="dropdown-button"
//           value={selectedInstructor}
//           onChange={handleInstructorChange}
//         >
//           <option value="">Select an Instructor</option>
//           {instructors.map((instructor) => (
//             <option
//               key={instructor.instructorID}
//               value={instructor.instructorID}
//             >
//               {instructor.instructorName}
//             </option>
//           ))}
//         </select>
//       </label>

//       {instructorDetails && (
//         <div className="homepage-content">
//           {/* Show profile picture only if this instructor is selected */}
//           {selectedInstructor === instructorDetails.instructorID && (
//             <div className="profile-picture">
//               <img
//                 src={instructorDetails.instructorProfilePic} // Assuming `profilePic` is a URL field in your instructor model
//                 alt={`${instructorDetails.instructorName}'s profile`}
//                 style={{
//                   width: "300px",
//                   padding: "30px",
//                 }}
//               />
//               <h2>{instructorDetails.instructorName}</h2>
//               <p>
//                 <strong>Years of Experience:</strong>{" "}
//                 {instructorDetails.yearsofExp}
//               </p>
//               <p>
//                 <strong>Position:</strong>{" "}
//                 {instructorDetails.instructorPosition}
//               </p>
//               <p>
//                 <strong>Specialty:</strong>{" "}
//                 {instructorDetails.instructorSpecialty}
//               </p>
//               <p>
//                 <strong>Email:</strong> {instructorDetails.instructorEmail}
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InstructorProfile;

import React, { useState, useEffect } from "react";
import axios from "axios";

const InstructorProfile = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  // Fetch all instructors.
  useEffect(() => {
    axios
      .get("http://localhost:3000/studio/instructors")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  const handleViewProfile = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleClosePopup = () => {
    setSelectedInstructor(null);
  };

  return (
    <div>
      <div className="instructors-grid">
        {instructors.map((instructor) => (
          <div className="instructor-card" key={instructor.instructorID}>
            <img
              src={instructor.instructorProfilePic}
              alt={`${instructor.instructorName}'s profile`}
              className="instructor-image"
            />
            <div className="instructor-overlay">
              <button
                className="view-profile-button"
                onClick={() => handleViewProfile(instructor)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedInstructor && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <img
              src={selectedInstructor.instructorProfilePic}
              alt={`${selectedInstructor.instructorName}'s profile`}
              className="popup-image"
            />
            <h2>{selectedInstructor.instructorName}</h2>
            <div className="quote-content">
              <h4>"{selectedInstructor.instructorQuote}"</h4>
            </div>
            <p>
              <strong>Years of Experience:</strong>{" "}
              {selectedInstructor.yearsofExp}
            </p>
            <p>
              <strong>Position:</strong> {selectedInstructor.instructorPosition}
            </p>
            <p>
              <strong>Specialty:</strong>{" "}
              {selectedInstructor.instructorSpecialty}
            </p>
            <p>
              <strong>Email:</strong> {selectedInstructor.instructorEmail}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorProfile;
