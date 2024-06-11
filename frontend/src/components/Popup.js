import React from 'react';
import '../styles/Popup.css';

function Popup({ children }) {
  return (
    <div className="popup-container">
      <div className='blackout-container'></div>
      <div className="popup-content">{children}</div>
    </div>
  );
}

export default Popup;
