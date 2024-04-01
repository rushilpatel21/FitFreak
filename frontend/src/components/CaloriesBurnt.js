import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Notification from './Notification.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Swal from 'sweetalert2'

function CaloriesBurnt() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [waterDataMonth, setWaterDataMonth] = useState({});
  const [waterDataDay, setWaterDataDay] = useState({});
  const [displayMode, setDisplayMode] = useState('Days');
  const [waterData, setWaterData] = useState();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState === 'false') {
      setShowNotification(true);
    } else {
      const storedUser = JSON.parse(localStorage.getItem('userDetail'));
      setUserName(storedUser.username);
    }
  }, []);

  useEffect(() => {
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
            const caloriesBurnt = parseInt(data.caloriesBurnt);
            if (workoutMinutesByDay[workoutDate]) {
              workoutMinutesByDay[workoutDate] += caloriesBurnt;
            } else {
              workoutMinutesByDay[workoutDate] = caloriesBurnt;
            }
          });
          
          setWaterDataDay({
            labels: Object.keys(workoutMinutesByDay).map(date => new Date(date).getDate() + ' ' + new Date(date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(date).getFullYear()),
            datasets: [{
              label: 'Calories Burned',
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
            const workoutMinutes = parseInt(data.caloriesBurnt);
            if (workoutMinutesByMonth[workoutMonth]) {
              workoutMinutesByMonth[workoutMonth] += workoutMinutes;
            } else {
              workoutMinutesByMonth[workoutMonth] = workoutMinutes;
            }
          });
          setWaterDataMonth({
            labels: Object.keys(workoutMinutesByMonth),
            datasets: [{
              label: 'Calories Burned',
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

  // const closeNotification = () => {
  //   setShowNotification(false);
  //   navigate('/');
  // };

  useEffect(() => {
    setWaterData(displayMode === 'Days' ? waterDataDay : waterDataMonth);
  }, [displayMode, waterDataDay, waterDataMonth]);

  const toggleDaysMonths = () => {
    setDisplayMode(prevMode => (prevMode === 'Days' ? 'Months' : 'Days'));
  };

  const usingSwal = () => {
    Swal.fire({
      icon: "error",
      title: "User Not Logged In",
      text: "Please sign in to view log",
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
        <div className='water-container water-container-history'>
          <div className="water-history-container-1">
            <button className="toggle-button-water" onClick={toggleDaysMonths}>{displayMode}</button>
            <h2 className="calories-history-title">{displayMode === 'Days' ? 'Calories Burned by Days' : 'Calories Burned by Months'}</h2>
            {waterData && Object.keys(waterData).length > 0 && (
              <div className="chart-container-water">
                <Bar
                  data={waterData}
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
        </div>
      )}
    </>
  );
}

export default CaloriesBurnt;
