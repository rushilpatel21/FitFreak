import React from 'react';
import '../styles/Popup.css'; // Import CSS file for styling

function Popup({ children }) {
  return (
    <div className="popup-container">
      <div className="popup-content">{children}</div>
    </div>
  );
}

export default Popup;
