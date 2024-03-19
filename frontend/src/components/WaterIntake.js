import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function WaterIntake(){
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [workoutData, setWorkoutData] = useState({});
  const [displayMode, setDisplayMode] = useState('Days');

  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState === 'false') {
      setShowNotification(true);
    }
  }, []);

  useEffect(() => {
    // Mock workout data for demonstration
    const MockWorkoutDataForDays = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [
        {
          label: 'Workout Minutes',
          data: [30, 45, 60, 40, 50, 20, 80], // Mock workout minutes for each day
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
    const MockWorkoutDataForMonths = {
      labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
      datasets: [
        {
          label: 'Workout Minutes',
          data: [45, 30, 90, 20, 70,110], 
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
    
    
    if(displayMode === 'Days'){
      setWorkoutData(MockWorkoutDataForDays);
    }else {
      setWorkoutData(MockWorkoutDataForMonths);
    }
    console.log(workoutData);
  }, [displayMode]);

  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };

  const toggleDaysMonths = () => {
    
    setDisplayMode(prevMode => (prevMode === 'Days' ? 'Months' : 'Days'));
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
        <div className="workout-history-container">
          <button className="toggle-button" onClick={toggleDaysMonths}>{displayMode}</button>
          <h2 className="workout-history-title">{displayMode === 'Days' ? 'Water Intake by Days' : 'Water Intake by Months'}</h2>
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
      )

      }
    </div>
    );
  }

export default WaterIntake;