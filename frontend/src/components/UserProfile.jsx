import React from "react";

function UserInfo({ userInfo, reservationMessage }) {
  // Check if userInfo is available and properly structured
  if (!userInfo) {
    return <p>No user information available.</p>;
  }

  const {
    name,
    email,
    membershipID,
    membershipTier,
    membershipValidTill,
    reservations = [], // Default to empty array if reservations are undefined
  } = userInfo;

  // Format membership validity if present
  const formattedValidity = membershipValidTill
    ? new Date(membershipValidTill).toLocaleDateString()
    : "N/A";

  // console.log(userInfo);
  console.log(userInfo.reservations);

  return (
    <div>
      <div className="word-content">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Membership Number: {membershipID}</p>
        <p>Membership Tier: {membershipTier}</p>
        <p>Membership Validity: {formattedValidity}</p>
        <div className="border">
          <h3>Reserved Classes</h3>
          {reservations.length === 0 ? (
            <p>No upcoming reservations.</p>
          ) : (
            <ul>
              {userInfo.reservations.map((reservation, index) => (
                <li key={reservation.reservationID || index}>
                  <strong>Reservation ID: </strong>
                  {reservation.reservationID} | <strong>Class Name: </strong>
                  {reservation.classID?.className || "Class name unavailable"}
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
