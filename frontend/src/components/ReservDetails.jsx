import React from "react";
import axios from "axios";
import CancelReservation from "./CancelReserv";

function ReservationDetails({
  reservationID,
  setReservationID,
  reservationDetails,
  setReservationDetails,
  setErrorMessage,
}) {
  const handleGetReservation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/studio/reservations/${reservationID}`
      );
      setReservationDetails(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Reservation not found. Please check the reservation ID."
      );
      setReservationDetails(null);
    }
  };

  return (
    <div>
      <h1>Check Reservation Details</h1>
      <div className="input-container">
        <div>
          Reservation ID:
          <input
            type="text"
            placeholder="Enter Reservation ID"
            value={reservationID}
            onChange={(e) => setReservationID(e.target.value)}
            className="input"
          />
        </div>
        <button className="input-button" onClick={handleGetReservation}>
          Get Reservation
        </button>
      </div>
      <div>
        <div className="word-content">
          {reservationDetails ? (
            <div className="border">
              <div>
                <h2>Reservation Details</h2>
                <p>Reservation ID: {reservationDetails.reservationID}</p>
                <p>
                  Class Date:{" "}
                  {new Date(
                    reservationDetails.classID.classDate
                  ).toLocaleDateString()}
                </p>
                <p>Class Timing: {reservationDetails.classID.classTiming}</p>
                <p>Class Name: {reservationDetails.classID.className}</p>
                <p>Instructor: {reservationDetails.classID.instructorName}</p>
                <CancelReservation
                  reservationID={reservationID}
                  setReservationID={setReservationID}
                  setReservationDetails={setReservationDetails}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            </div>
          ) : null}{" "}
        </div>
      </div>
    </div>
  );
}

export default ReservationDetails;
