import React from 'react';
import '../styles/Notification.css';

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification-overlay">
      <div className="notification-container">
        <div className="notification-content">
          <p>{message}</p>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Notification;
