import React from "react";
import axios from "axios";

function CancelReservation({
  reservationID,
  setReservationID,
  setReservationDetails,
  setErrorMessage,
}) {
  const handleCancelReservation = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/studio/reservations/${reservationID}`
      );
      setReservationDetails(null);
      setReservationID("");
      setErrorMessage("");
      alert(response.data.message);
    } catch (error) {
      setErrorMessage(
        "Error canceling reservation. Please check your reservation ID."
      );
    }
  };

  return (
    <div>
      <button onClick={handleCancelReservation}>Cancel Reservation</button>
    </div>
  );
}

export default CancelReservation;
