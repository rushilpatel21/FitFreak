import React, { useState, useEffect } from 'react';

import Popup from './Popup.js'; // Import Popup component

function UserDetails({ updateUserDetails, userDetails, toggleUserDetailsModal, showUserDetails }) {
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  
  useEffect(() => {
    if(localStorage.getItem("isLoggedIn") === 'true'){
      console.log('user has already logged in');
      const storedUser = JSON.parse(localStorage.getItem('userDetail'));
      // let username = storedUser.username;
      console.log(storedUser);
      updateUserDetails(storedUser);
      // navigate('/');
    }
  }, [updateUserDetails]); // Added updateUserDetails for deploy. 


  return (
    <div className="user-details-container align-modal">
      {/* <button onClick={toggleModal}>Open Modal</button> */}
      {showModal && (
        <Popup>
          <div className="user-details-grid">
            <p className="user-details-label">Username:</p>
            <p className="user-details">{userDetails.username}</p>

            <p className="user-details-label">Email:</p>
            <p className="user-details">{userDetails.email}</p>

            <p className="user-details-label">Weight:</p>
            <p className="user-details">{userDetails.weight}</p>

            <p className="user-details-label">Lifestyle:</p>
            <p className="user-details">{userDetails.lifestyle}</p>

            <p className="user-details-label">Goal:</p>
            <p className="user-details">{userDetails.goal}</p>

            <p className="user-details-label">Height:</p>
            <p className="user-details">{userDetails.height}</p>

            <p className="user-details-label bmi">BMI:</p>
            <p className="user-details">{userDetails.bmi}</p>

            <p className="user-details-label">Birthday:</p>
            <p className="user-details">{userDetails.birthday}</p>

            <p className="user-details-label">Age:</p>
            <p className="user-details">{userDetails.age}</p>

            <p className="user-details-label">Sex:</p>
            <p className="user-details">{userDetails.sex}</p>

            <button onClick={toggleModal}>Close</button>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default UserDetails;
