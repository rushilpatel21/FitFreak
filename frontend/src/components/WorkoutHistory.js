import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function WorkoutHistory() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [displayMode, setDisplayMode] = useState('days');

  useEffect(() => {
    const userState = localStorage.getItem('isLoggedIn');
    if (userState === 'false') {
      setShowNotification(true);
    }
  }, []);

  useEffect(() => {
    // Mock workout data for demonstration
    const MockWorkoutData = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
      datasets: [
        {
          label: 'Workout Minutes',
          data: [30, 45, 60, 40, 50], // Mock workout minutes for each day
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
    
    setWorkoutData(MockWorkoutData);
    console.log(workoutData);
  }, []);

  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };

  const toggleDaysMonths = () => {
    setDisplayMode(prevMode => (prevMode === 'days' ? 'months' : 'days'));
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
        <div className="workout-history-container">
          <button className="toggle-button" onClick={toggleDaysMonths}>Toggle Days/Months</button>
          <h2 className="workout-history-title">{displayMode === 'days' ? 'Workout Minutes by Day' : 'Workout Minutes by Month'}</h2>
          {workoutData && Object.keys(workoutData).length > 0 && (
            <div className="chart-container">
              <Bar
                data={workoutData}
                options={{
                  scales: {
                    x: {
                      type: 'category',
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default WorkoutHistory;
