import React, { useEffect,useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';

function WorkoutLog() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState === 'false') {
      setShowNotification(true);
    }
  }, []);

  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };
    return (
      <div>
      {showNotification && (
        <Notification
          message="Please log in to view this page."
          onClose={closeNotification}
        />
      )}
      {!showNotification && (
        <>

        Rushil is doing  a workout right now. Please come back later!
        
        
        
        
        
        
        
        
        
        
        
        
        
        </>
      )

      }
    </div>
    );
  }

export default WorkoutLog;