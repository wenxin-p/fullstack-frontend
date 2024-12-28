import React, { useState, useEffect } from "react";
import "./App.css";

//Images.
import cookingstudio from "./images/cookingstudio.png";
import profilepic from "./images/profilepic.png";

// Relevant frontend components.
import axios from "axios";
import UserLogin from "./components/Login";
import UserInfo from "./components/UserProfile.jsx";
import InstructorInfo from "./components/InstructorProfile.jsx";
import ClassFiltering from "./components/ClassFiltering.jsx";
import ClassSelect from "./components/ClassSelect.jsx";
import ReservationDetails from "./components/ReservDetails.jsx";

function App() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [classTiers, setClassTiers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedClassTier, setSelectedClassTier] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [instructorInfo, setInstructorInfo] = useState(null);
  const [reservationID, setReservationID] = useState("");
  const [reservationMessage, setReservationMessage] = useState("");
  const [reservationDetails, setReservationDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // State to control toggling of webpages.
  const [activeTab, setActiveTab] = useState("login");

  // Fetch all available classes
  useEffect(() => {
    axios
      .get("http://localhost:3000/studio/classes")
      .then((response) => {
        const allClasses = response.data;
        setClasses(allClasses);
        setFilteredClasses(allClasses);

        // Extract unique categories, tiers, and instructors
        setCategories([
          ...new Set(allClasses.map((classItem) => classItem.category)),
        ]);
        setClassTiers([
          ...new Set(allClasses.map((classItem) => classItem.classTier)),
        ]);
        setInstructors([
          ...new Set(allClasses.map((classItem) => classItem.instructorName)),
        ]);
      })
      .catch((error) => console.error("Error fetching classes", error));
  }, []);

  // Filter classes based on selected criteria
  useEffect(() => {
    let updatedClasses = classes;

    if (selectedCategory) {
      updatedClasses = updatedClasses.filter(
        (classItem) => classItem.category === selectedCategory
      );
    }
    if (selectedClassTier) {
      updatedClasses = updatedClasses.filter(
        (classItem) => classItem.classTier === selectedClassTier
      );
    }
    if (selectedInstructor) {
      updatedClasses = updatedClasses.filter(
        (classItem) => classItem.instructorName === selectedInstructor
      );
    }

    setFilteredClasses(updatedClasses);
  }, [selectedCategory, selectedClassTier, selectedInstructor, classes]);

  const renderContent = () => {
    switch (activeTab) {
      case "homepage":
        return (
          <div className="tab-content">
            <img src={cookingstudio} alt="Cooking Studio Image" />
            <h1> NOTICE </h1>
            <div className="notice-content">
              <h3>
                XYZ Cooking Studio at Orchard Plaza will be closed on the
                following days for private events:
              </h3>
              <h3>23 Dec 2024 | 26 Dec 2024 | 30 Dec 2024 |</h3>
              <h3>
                We apologise for any inconvenience caused and thank you for your
                understanding.
              </h3>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="tab-content">
            <h1>About Us</h1>
            <p>
              XYZ Cooking Studio always believes that happiness can be found
              using food as a medium.
            </p>
            <div className="aboutus">
              <div className="aboutus-item">
                <span>NOV 2021</span>
                <p>
                  Start-up company by joining tableware and cookware selling
                  company with cooking school in Singapore.
                </p>
              </div>
              <div className="aboutus-item">
                <span>AUG 2022</span>
                <p>First studio opened in city centre at Orchard, Singapore.</p>
              </div>
              <div className="aboutus-item">
                <span>DEC 2023</span>
                <p>First studio overseas, opened in Shanghai China.</p>
              </div>
              <div className="aboutus-item">
                <span>DEC 2024</span>
                <p>
                  New studios opening in Seoul, Korea and Tokyo, Japan by 31 Dec
                  2024.{" "}
                </p>
              </div>
            </div>
          </div>
        );
      case "instructors":
        return (
          <div className="tab-content">
            <h1>Our Instructors</h1>

            <InstructorInfo
              setInstructorInfo={setInstructorInfo}
              setErrorMessage={setErrorMessage}
            />
            {instructorInfo && (
              <InstructorInfo instructorInfo={instructorInfo} />
            )}
          </div>
        );

      case "classes":
        return (
          <div className="tab-content">
            <h1>Available Classes</h1>
            <h3>Check out our available classes for the month of December!</h3>
            <ClassFiltering
              categories={categories}
              classTiers={classTiers}
              instructors={instructors}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedClassTier={selectedClassTier}
              setSelectedClassTier={setSelectedClassTier}
              selectedInstructor={selectedInstructor}
              setSelectedInstructor={setSelectedInstructor}
            />
            <div className="border">
              <ClassSelect
                classes={filteredClasses}
                userInfo={userInfo}
                setReservationMessage={setReservationMessage}
                setReservationDetails={setReservationDetails}
                reservationMessage={reservationMessage}
              />
            </div>
            {/* Reservation Message Prompt */}
            {reservationMessage && <p>{reservationMessage}</p>}
          </div>
        );
      case "login":
        return (
          <div className="tab-content">
            <h1>User Login</h1>
            <img src={profilepic} alt="Profile Pic Image" width="150" />
            <UserLogin
              setUserInfo={setUserInfo}
              setErrorMessage={setErrorMessage}
            />
            {userInfo && <UserInfo userInfo={userInfo} />}
          </div>
        );
      case "reservations":
        return (
          <div className="tab-content">
            <ReservationDetails
              reservationID={reservationID}
              setReservationID={setReservationID}
              reservationDetails={reservationDetails}
              setReservationDetails={setReservationDetails}
              setErrorMessage={setErrorMessage}
            />
          </div>
        );
      case "contact":
        return (
          <div className="word-content">
            <div className="tab-content">
              <h1>Contact Us</h1>
            </div>
            <h2> SINGAPORE </h2>
            <p>Email: contact@xyz-cookingstudio.com</p>
            <p>Phone: +65 234 567 890</p>
            <p>Address: Capitol Building 11 Stamford Road #02-02</p>
            <h2> SHANGHAI </h2>
            <p>Email: contact@xyz-cookingstudio.com</p>
            <p>Phone: +86 234 567 890</p>
            <p>
              Address: Qing Nian Da Jie 167hao Bei Fang Guo Ji Chuan Mei Zhong
              Xin
            </p>
            <h2> SEOUL </h2>
            <p>Email: contact@xyz-cookingstudio.com</p>
            <p>Phone: +82 234 567 890</p>
            <p>Address: 42-1, Yongsandong 4(sa)-ga</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Tabs */}
      <header className="header">
        <nav>
          <ul className="tabs">
            <li
              className={`tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              User Login
            </li>
            <li
              className={`tab ${activeTab === "homepage" ? "active" : ""}`}
              onClick={() => setActiveTab("homepage")}
            >
              Homepage
            </li>
            <li
              className={`tab ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              About Us
            </li>
            <li
              className={`tab ${activeTab === "classes" ? "active" : ""}`}
              onClick={() => setActiveTab("classes")}
            >
              Classes
            </li>
            <li
              className={`tab ${activeTab === "instructors" ? "active" : ""}`}
              onClick={() => setActiveTab("instructors")}
            >
              Instructors
            </li>
            <li
              className={`tab ${activeTab === "reservations" ? "active" : ""}`}
              onClick={() => setActiveTab("reservations")}
            >
              Check Reservation
            </li>
            <li
              className={`tab ${activeTab === "contact" ? "active" : ""}`}
              onClick={() => setActiveTab("contact")}
            >
              Contact Us
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="content">{renderContent()}</main>
    </div>
  );
}

export default App;
