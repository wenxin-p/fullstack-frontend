import React from "react";

function UserInfo({ userInfo, reservationMessage }) {
  return (
    <div>
      <div className="word-content">
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
        <p>Membership Number: {userInfo.membershipID}</p>
        <p>Membership Tier: {userInfo.membershipTier}</p>
        <p>Membership Validity: {userInfo.membershipValidTill}</p>
        <div className="border">
          <h3>Reserved Classes</h3>
          {userInfo.reservations.length === 0 ? (
            <p>No upcoming reservations.</p>
          ) : (
            <ul>
              {userInfo.reservations.map((reservation) => (
                <li key={reservation.reservationID}>
                  <strong>Reservation ID: </strong>
                  {reservation.reservationID} | <strong>Class Name: </strong>
                  {reservation.classID.className}
                </li>
              ))}
            </ul>
          )}
          {reservationMessage && <p>{reservationMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
