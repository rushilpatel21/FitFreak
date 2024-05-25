import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Swal from 'sweetalert2'

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
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userState = localStorage.getItem('isLoggedIn');
    if (userState===null || userState === 'false') {
      setShowNotification(true);
    } else {
      const storedUser = JSON.parse(localStorage.getItem('userDetail'));
      setUserName(storedUser.username);
    }
  }, []);

  useEffect(() => { //This is for bar graph as it will have total workout
    
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('userDetail'));
        const userId = storedUser.username;
        if (!userId) {
          return;
        }

        const response = await axios.get(`/api/workoutlog/${userId}`);

        if (response.status === 200) {
          const fetchedWorkoutData = response.data.workoutlog;

          const today = new Date();
          const pastSevenDaysData = fetchedWorkoutData.filter(data => {
            const workoutDate = new Date(data.workoutDate);
            return workoutDate > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          });
          const workoutMinutesByDay = {};
          pastSevenDaysData.forEach(data => {
            const workoutDate = data.workoutDate;
            const workoutMinutes = parseInt(data.workoutMinutes);
            if (workoutMinutesByDay[workoutDate]) {
              workoutMinutesByDay[workoutDate] += workoutMinutes;
            } else {
              workoutMinutesByDay[workoutDate] = workoutMinutes;
            }
          });
          setWorkoutDayData({
            labels: Object.keys(workoutMinutesByDay).map(date => new Date(date).getDate() + ' ' + new Date(date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(date).getFullYear()),
            datasets: [{
              label: 'Workout Minutes',
              data: Object.values(workoutMinutesByDay),
              backgroundColor: [
                'rgb(83,124,56)',
                'rgb(123,165,145)',
                'rgb(204, 34, 43)',
                'rgb(241, 91, 76)',
                'rgb(250, 164, 27)',
                'rgb(255,212,91)',
                'rgb(255,229,180)'
              ],
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          });
          const pastSixMonthsData = fetchedWorkoutData.filter(data => {
            const workoutDate = new Date(data.workoutDate);
            const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
            return workoutDate > sixMonthsAgo;
          });
          const workoutMinutesByMonth = {};
          pastSixMonthsData.forEach(data => {
            const workoutMonth = new Date(data.workoutDate).toLocaleString('default', { month: 'long' }) + ' ' + new Date(data.workoutDate).getFullYear();
            const workoutMinutes = parseInt(data.workoutMinutes);
            if (workoutMinutesByMonth[workoutMonth]) {
              workoutMinutesByMonth[workoutMonth] += workoutMinutes;
            } else {
              workoutMinutesByMonth[workoutMonth] = workoutMinutes;
            }
          });
          setWorkoutMonthData({
            labels: Object.keys(workoutMinutesByMonth),
            datasets: [{
              label: 'Workout Minutes',
              data: Object.values(workoutMinutesByMonth),
              backgroundColor: [
                'rgb(83,124,56)',
                'rgb(123,165,145)',
                'rgb(204, 34, 43)',
                'rgb(241, 91, 76)',
                'rgb(250, 164, 27)',
                'rgb(255,212,91)'
              ],
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }],
          });
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };
    
    fetchData();
  }, []);


  // useEffect(() => { //This is for doughnut graph as it will have types of workout
    
  //   const MockWorkoutDataForDays = { // One type would be for today, different types of workout
  //     labels: ['Cardio', 'Strength Training', 'Flexibility Training', 'Balance & Stability'],
  //     datasets: [
  //       {
  //         label: 'Workout Minutes',
  //         data: [30, 45, 60, 40],
  //         backgroundColor: [
  //           'rgb(83,124,56)',
  //           'rgb(123,165,145)',
  //           'rgb(204, 34, 43)',
  //           'rgb(241, 91, 76)'
  //         ],
  //         borderColor: 'rgba(54, 162, 235, 1)',
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  //   const MockWorkoutDataForMonths = { // this for the past 7 days, different types of workout
  //     labels: ['Cardio', 'Strength Training', 'Flexibility Training', 'Balance & Stability'],
  //     datasets: [
  //       {
  //         label: 'Workout Minutes',
  //         data: [450, 300, 500, 460], 
  //         backgroundColor: [
  //           'rgb(83,124,56)',
  //           'rgb(123,165,145)',
  //           'rgb(204, 34, 43)',
  //           'rgb(241, 91, 76)'
  //         ],
  //         borderColor: 'rgba(54, 162, 235, 1)',
  //         borderWidth: 1,
  //       },
  //     ],
  //   };

  //   setWorkoutTypeDayData(MockWorkoutDataForDays);
  //   setWorkoutTypeMonthData(MockWorkoutDataForMonths);
  //   console.log(workoutDayData);
  // }, []);

  useEffect(() => { // This is for doughnut graph as it will have types of workout

    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('userDetail'));
        const userId = storedUser.username;
        if (!userId) {
          return;
        }

        const response = await axios.get(`/api/workoutlog/${userId}`);

        if (response.status === 200) {
          const fetchedWorkoutData = response.data.workoutlog;

          // Filter data for today
          const today = new Date().toISOString().slice(0, 10);
          const todayWorkouts = fetchedWorkoutData.filter(data => data.workoutDate === today);

          // Aggregate workout minutes by type for today
          const todayWorkoutMinutesByType = {};
          todayWorkouts.forEach(data => {
            const workoutType = data.workoutType;
            const workoutMinutes = parseInt(data.workoutMinutes);
            if (todayWorkoutMinutesByType[workoutType]) {
              todayWorkoutMinutesByType[workoutType] += workoutMinutes;
            } else {
              todayWorkoutMinutesByType[workoutType] = workoutMinutes;
            }
          });

          // Prepare data for today's doughnut chart
          const todayWorkoutData = {
            labels: Object.keys(todayWorkoutMinutesByType),
            datasets: [{
              label: 'Workout Minutes',
              data: Object.values(todayWorkoutMinutesByType),
              backgroundColor: [
                'rgb(83,124,56)',
                'rgb(123,165,145)',
                'rgb(204, 34, 43)',
                'rgb(241, 91, 76)'
              ],
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          };

          // Filter data for the past month
          const pastMonthData = fetchedWorkoutData.filter(data => {
            const workoutDate = new Date(data.workoutDate);
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            return workoutDate > oneMonthAgo;
          });

          // Aggregate workout minutes by type for the past month
          const pastMonthWorkoutMinutesByType = {};
          pastMonthData.forEach(data => {
            const workoutType = data.workoutType;
            const workoutMinutes = parseInt(data.workoutMinutes);
            if (pastMonthWorkoutMinutesByType[workoutType]) {
              pastMonthWorkoutMinutesByType[workoutType] += workoutMinutes;
            } else {
              pastMonthWorkoutMinutesByType[workoutType] = workoutMinutes;
            }
          });

          // Prepare data for the past month's doughnut chart
          const pastMonthWorkoutData = {
            labels: Object.keys(pastMonthWorkoutMinutesByType),
            datasets: [{
              label: 'Workout Minutes',
              data: Object.values(pastMonthWorkoutMinutesByType),
              backgroundColor: [
                'rgb(83,124,56)',
                'rgb(123,165,145)',
                'rgb(204, 34, 43)',
                'rgb(241, 91, 76)'
              ],
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }],
          };

          // Set state with the fetched data
          setWorkoutTypeDayData(todayWorkoutData);
          setWorkoutTypeMonthData(pastMonthWorkoutData);
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };

    fetchData();
  }, []);





  useEffect(() => {
    setDataForWorkoutTotal(displayMode === 'Days' ? workoutDayData : workoutMonthData);
    setDataForWorkoutType(displayModeType === 'Days' ? workoutTypeDayData : workoutTypeMonthData);
  }, [displayMode, displayModeType, workoutDayData, workoutMonthData, workoutTypeDayData, workoutTypeMonthData]);

  // const closeNotification = () => {
  //   setShowNotification(false);
  //   navigate('/');
  // };

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

  const usingSwal = () => {
    Swal.fire({
      icon: "error",
      title: "User Not Logged In",
      text: "Please sign in to view progress",
      showCancelButton: true, // Add this to show the cancel button
      confirmButtonColor: '#dc3545', // Change the confirm button color to red
      cancelButtonColor: '#6c757d', // Optionally, change the cancel button color
      confirmButtonText: 'Sign In', // Optionally, change the confirm button text
      cancelButtonText: 'Close', // Optionally, change the cancel button text
      // footer: '<a href="#">Why do I have this issue?</a>'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate('/signin');
        // setShowNotification(false);
      } else {
        navigate('/');
        // setShowNotification(false);
      }
    });
    // navigate('/');
    setShowNotification(false);
    
  }

  return (
    <>
      {showNotification && (
        // <Notification
        //   message="Please log in to view this page."
        //   onClose={closeNotification}
        // />
        usingSwal()
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
