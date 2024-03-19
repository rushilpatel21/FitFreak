import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function WorkoutHistory() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [workoutDayData, setWorkoutDayData] = useState({}); // This is for 7 days
  const [workoutMonthData, setWorkoutMonthData] = useState({}); // This is for 6 months
  const [displayMode, setDisplayMode] = useState('Days'); // This is for display mode
  const [dataForWorkoutTotal,setDataForWorkoutTotal] = useState({}); // This is for workout data (total)
  const [dataForWorkoutType,setDataForWorkoutType] = useState({}); // This is for workout data (type)
  const [workoutTypeDayData,setWorkoutTypeDayData] = useState({});
  const [workoutTypeMonthData,setWorkoutTypeMonthData] = useState({});
  const [displayModeType, setDisplayModeType] = useState('Days');

  useEffect(() => {
    const userState = localStorage.getItem('isLoggedIn');
    if (userState === 'false') {
      setShowNotification(true);
    }
  }, []);

  useEffect(() => { //This is for bar graph as it will have total workout
    
    const MockWorkoutDataForDays = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [
        {
          label: 'Workout Minutes',
          data: [30, 45, 60, 40, 50, 20, 80],
          backgroundColor: [
            'rgb(83,124,56)',
            'rgb(123,165,145)',
            'rgb(204, 34, 43)',
            'rgb(241, 91, 76)',
            'rgb(250, 164, 27)',
            'rgb(255,212,91)',
            'rgb(255,229,180)'
          ],
          // backgroundColor: 'rgba(54, 162, 235, 0.6)',
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
          backgroundColor: [
            'rgb(83,124,56)',
            'rgb(123,165,145)',
            'rgb(204, 34, 43)',
            'rgb(241, 91, 76)',
            'rgb(250, 164, 27)',
            'rgb(255,212,91)'
          ],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
    setWorkoutDayData(MockWorkoutDataForDays);
    setWorkoutMonthData(MockWorkoutDataForMonths);
    console.log(workoutDayData);
  }, []);


  useEffect(() => { //This is for doughnut graph as it will have types of workout
    
    const MockWorkoutDataForDays = { // One type would for for today, different types of workout
      labels: ['Cardio', 'Strength Training', 'Flexibility Training', 'Balance & Stability'],
      datasets: [
        {
          label: 'Workout Minutes',
          data: [30, 45, 60, 40],
          backgroundColor: [
            'rgb(83,124,56)',
            'rgb(123,165,145)',
            'rgb(204, 34, 43)',
            'rgb(241, 91, 76)'
          ],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
    const MockWorkoutDataForMonths = { // this for the past 7 days, different types of workout
      labels: ['Cardio', 'Strength Training', 'Flexibility Training', 'Balance & Stability'],
      datasets: [
        {
          label: 'Workout Minutes',
          data: [450, 300, 500, 460], 
          backgroundColor: [
            'rgb(83,124,56)',
            'rgb(123,165,145)',
            'rgb(204, 34, 43)',
            'rgb(241, 91, 76)'
          ],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    setWorkoutTypeDayData(MockWorkoutDataForDays);
    setWorkoutTypeMonthData(MockWorkoutDataForMonths);
    console.log(workoutDayData);
  }, []);




  useEffect(() => {
    setDataForWorkoutTotal(displayMode === 'Days' ? workoutDayData : workoutMonthData);
    setDataForWorkoutType(displayModeType === 'Days' ? workoutTypeDayData : workoutTypeMonthData);
  }, [displayMode, displayModeType, workoutDayData, workoutMonthData, workoutTypeDayData, workoutTypeMonthData]);

  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };

  const toggleDaysMonths = () => {
    
    setDisplayMode(prevMode => (prevMode === 'Days' ? 'Months' : 'Days'));
    if(displayMode === 'Days'){
      setDataForWorkoutTotal(workoutDayData);
      // setDataForWorkoutType(workoutTypeDayData);
    }else {
      setDataForWorkoutTotal(workoutMonthData);
      // setDataForWorkoutType(workoutTypeMonthData);
    }

  };

  const toggleDaysMonthsType = () => {
    setDisplayModeType(prevMode => (prevMode==='Days' ? 'Months' : 'Days'));
    if(displayModeType === 'Days'){
      // setDataForWorkoutTotal(workoutDayData);
      setDataForWorkoutType(workoutTypeDayData);
    }else {
      // setDataForWorkoutTotal(workoutMonthData);
      setDataForWorkoutType(workoutTypeMonthData);
    }
  }
  return (
    <>
      {showNotification && (
        <Notification
          message="Please log in to view this page."
          onClose={closeNotification}
        />
      )}
      {!showNotification && (
        <div className='workout-container workout-container-history'>
          <div className="workout-history-container-1"> {/* This is for total workout for last 7 days and for last 6 months */}
            <button className="toggle-button-workout" onClick={toggleDaysMonths}>{displayMode}</button>
            <h2 className="workout-history-title">{displayMode === 'Days' ? 'Workout Minutes by Days' : 'Workout Minutes by Months'}</h2>
            {dataForWorkoutTotal && Object.keys(dataForWorkoutTotal).length > 0 && (
              <div className="chart-container">
                <Bar
                  data={dataForWorkoutTotal}
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
          <div className="workout-history-container-2"> {/* This is for Types of workout. 1) Today's and 2) This week's, can add more later */}
            <button className="toggle-button-workout" onClick={toggleDaysMonthsType}>{displayModeType}</button>
            <h2 className="workout-history-title">{displayModeType === 'Days' ? 'Today\'s Workout Distribution' : 'Month\'s Workout Distribution'}</h2>
            {dataForWorkoutType && Object.keys(dataForWorkoutType).length > 0 && (
              <div className="chart-container-1">
                <Doughnut
                  data={dataForWorkoutType}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WorkoutHistory;
