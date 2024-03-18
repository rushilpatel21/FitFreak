import React, { useEffect,useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';
import { Bar } from 'react-chartjs-2';

function WorkoutMinutes(){
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [displayMode, setDisplayMode] = useState('days');
  
  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState === 'false') {
      setShowNotification(true);
    }
  }, []);
  useEffect(() => {
    // Fetch workout data here and update workoutData state
  }, []);
  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };
  const toggleDaysMonths = () => {
    // Implement toggle logic here
  };

    return (
      <>
      {showNotification && (
        <Notification
          message="Please log in to view this page."
          onClose={closeNotification}
        />
      )}
      {!showNotification && (
        <div>
          <button onClick={toggleDaysMonths}>Toggle Days/Months</button>
          <Bar data={workoutData} />
        </div>
        



      )

      }
    </>
    );
  }

export default WorkoutMinutes;