import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkoutHistory = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [workoutDayData, setWorkoutDayData] = useState({});
  const [workoutMonthData, setWorkoutMonthData] = useState({});
  const [displayMode, setDisplayMode] = useState('Days');
  const [dataForWorkoutTotal, setDataForWorkoutTotal] = useState({});
  const [dataForWorkoutType, setDataForWorkoutType] = useState({});
  const [workoutTypeDayData, setWorkoutTypeDayData] = useState({});
  const [workoutTypeMonthData, setWorkoutTypeMonthData] = useState({});
  const [displayModeType, setDisplayModeType] = useState('Days');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userState = localStorage.getItem('isLoggedIn');
    if (!userState || userState === 'false') {
      setShowNotification(true);
    } else {
      const storedUser = JSON.parse(localStorage.getItem('userDetail'));
      setUserName(storedUser.username);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userName) return;
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/workoutlog/${userName}`);
        if (response.status === 200) {
          processData(response.data.workoutlog);
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };
    fetchData();
  }, [userName]);

  const processData = (workoutData) => {
    const today = new Date();
    const pastSevenDaysData = workoutData.filter(data => new Date(data.workoutDate) > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000));
    const pastSixMonthsData = workoutData.filter(data => new Date(data.workoutDate) > new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()));

    const workoutMinutesByDay = aggregateData(pastSevenDaysData, 'workoutDate', 'workoutMinutes');
    const workoutMinutesByMonth = aggregateData(pastSixMonthsData, data => new Date(data.workoutDate).toLocaleString('default', { month: 'long' }) + ' ' + new Date(data.workoutDate).getFullYear(), 'workoutMinutes');

    setWorkoutDayData(generateChartData(workoutMinutesByDay, 'Workout Minutes'));
    setWorkoutMonthData(generateChartData(workoutMinutesByMonth, 'Workout Minutes'));

    const todayWorkouts = workoutData.filter(data => data.workoutDate === today.toISOString().slice(0, 10));
    const pastMonthData = workoutData.filter(data => new Date(data.workoutDate) > new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()));

    const todayWorkoutMinutesByType = aggregateData(todayWorkouts, 'workoutType', 'workoutMinutes');
    const pastMonthWorkoutMinutesByType = aggregateData(pastMonthData, 'workoutType', 'workoutMinutes');

    setWorkoutTypeDayData(generateChartData(todayWorkoutMinutesByType, 'Workout Minutes', 'doughnut'));
    setWorkoutTypeMonthData(generateChartData(pastMonthWorkoutMinutesByType, 'Workout Minutes', 'doughnut'));
  };

  const aggregateData = (data, key, valueKey) => {
    return data.reduce((acc, curr) => {
      const keyValue = typeof key === 'function' ? key(curr) : curr[key];
      acc[keyValue] = (acc[keyValue] || 0) + parseInt(curr[valueKey]);
      return acc;
    }, {});
  };

  const generateChartData = (data, label, type = 'bar') => ({
    labels: Object.keys(data),
    datasets: [{
      label,
      data: Object.values(data),
      backgroundColor: type === 'bar'
        ? ['rgb(83,124,56)', 'rgb(123,165,145)', 'rgb(204, 34, 43)', 'rgb(241, 91, 76)', 'rgb(250, 164, 27)', 'rgb(255,212,91)', 'rgb(255,229,180)']
        : ['rgb(83,124,56)', 'rgb(123,165,145)', 'rgb(204, 34, 43)', 'rgb(241, 91, 76)'],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    setDataForWorkoutTotal(displayMode === 'Days' ? workoutDayData : workoutMonthData);
    setDataForWorkoutType(displayModeType === 'Days' ? workoutTypeDayData : workoutTypeMonthData);
  }, [displayMode, displayModeType, workoutDayData, workoutMonthData, workoutTypeDayData, workoutTypeMonthData]);

  const toggleDaysMonths = () => setDisplayMode(prevMode => prevMode === 'Days' ? 'Months' : 'Days');
  const toggleDaysMonthsType = () => setDisplayModeType(prevMode => prevMode === 'Days' ? 'Months' : 'Days');

  const usingSwal = () => {
    Swal.fire({
      icon: "error",
      title: "User Not Logged In",
      text: "Please sign in to view progress",
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sign In',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/signin');
      } else {
        navigate('/');
      }
    });
    setShowNotification(false);
  };

  return (
    <>
      {showNotification ? usingSwal() : (
        <div className='workout-container workout-container-history'>
          <div className="workout-history-container">
          <div className="button-title-container">
              <button className="toggle-button-water" onClick={toggleDaysMonths}>{displayMode}</button>
              <h2 className="water-history-title">{displayMode === 'Days' ? 'Water Intake by Days' : 'Water Intake by Months'}</h2>
            </div>
            {dataForWorkoutTotal && Object.keys(dataForWorkoutTotal).length > 0 && (
              <div className="chart-container">
                <Bar
                  data={dataForWorkoutTotal}
                  options={{
                    scales: {
                      x: { type: 'category' },
                    },
                  }}
                />
              </div>
            )}
          </div>
          <div className="workout-history-container">
          <div className="button-title-container">
              <button className="toggle-button-water" onClick={toggleDaysMonthsType}>{displayModeType}</button>
              <h2 className="water-history-title">{displayModeType === 'Days' ? 'Water Intake by Days' : 'Water Intake by Months'}</h2>
            </div>
            {dataForWorkoutType && Object.keys(dataForWorkoutType).length > 0 && (
              <div className="chart-container">
                <Doughnut data={dataForWorkoutType} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default WorkoutHistory;
