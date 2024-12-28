import React from "react";
import axios from "axios";

function ClassSelect({
  classes,
  userInfo,
  setReservationMessage,
  setReservationDetails,
}) {
  // To call createreservations function.
  const handleReserve = async (classID) => {
    if (!userInfo || !userInfo._id) {
      setReservationMessage("You must log in before making a reservation.");
      window.alert("You must log in before making a reservation.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/studio/reservations",
        {
          classID,
          membershipID: userInfo.membershipID,
        }
      );

      const successMessage = `Reservation successful! Reservation ID: ${response.data.reservationID}`;
      setReservationMessage(successMessage);
      // Display a success prompt
      window.alert(successMessage);
      setReservationDetails(null);
    } catch (error) {
      let errorMessage = "Error making reservation. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setReservationMessage(errorMessage);
      window.alert(errorMessage);
    }
  };

  return (
    <div>
      {classes.length === 0 ? (
        <p>No classes available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Class ID</th>
              <th>Category</th>
              <th>Class Name</th>
              <th>Class Tier</th>
              <th>Instructor</th>
              <th>Class Date</th>
              <th>Class Timing</th>
              <th>Reserve</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id}>
                <td>{classItem.classID}</td>
                <td>{classItem.category}</td>
                <td>{classItem.className}</td>
                <td>{classItem.classTier}</td>
                <td>{classItem.instructorName}</td>
                <td>{classItem.classDate}</td>
                <td>{classItem.classTiming}</td>
                <td>
                  <button onClick={() => handleReserve(classItem.classID)}>
                    Reserve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClassSelect;
