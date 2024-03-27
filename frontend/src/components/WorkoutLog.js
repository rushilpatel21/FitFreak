import React, { useEffect,useState, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';
import axios from 'axios'; 

function WorkoutLog({ userDetails }) {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().slice(0, 10));
  const [workoutType, setWorkoutType] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [workoutMinutes, setWorkoutMinutes] = useState('');
  const [caloriesBurnt, setCaloriesBurnt] = useState('');
  const [startTime, setStartTime] = useState('');
  const [workoutData,setWorkoutData] = useState([]);
  const [userName, setUserName] = useState('');
  const [apiData,setApiData] = useState([]);
  const [todayWorkoutData, setTodayWorkoutData] = useState([]); // Here i store todays data.
  

  // useEffect(() => {
  //   console.log(userDetails);
  // }, [userDetails])


  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState === 'false') {
      setShowNotification(true);
    }else{
      const storedUser = JSON.parse(localStorage.getItem('userDetail'));
      setUserName(storedUser.username);
      
    }
  }, []);

  
  // useEffect(() => {
  //   console.log(userName);
  // }, [userName]);

  useEffect(() => {
    if (workoutData && workoutData.length !== 0) {
      console.log("Workout data updated:", workoutData);
      setWorkoutType('');
      setWorkoutName('');
      setWorkoutMinutes('');
      setCaloriesBurnt('');
      setStartTime('');
      setWorkoutData('');
    }
  }, [workoutData]);

  // const getWorkoutData = useCallback( async () => {
  //   try {
  //     const storedUser = JSON.parse(localStorage.getItem('userDetail'));
  //     const userId = storedUser.username;
  //     if(userId === ''){
  //       return;
  //     }
  //     console.log(userId);
  //     const uri = '/api/workoutLog/' + userId;
  //     console.log('Request URI:', uri);
  //     const response = await axios.get(uri);


  //     if (response.status === 200) {
  //       console.log(response.data.workoutLog);
  //       setApiData(response.data.workoutLogs);
  //       console.log(response.data.workoutLogs);
  //     } else {
  //       throw new Error("Failed to fetch workout data");
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Server responded with error status:', error.response.status);
  //       console.error('Error response data:', error.response.data);
  //     } else if (error.request) {
  //       console.error('No response received from the server:', error.request);
  //     } else {
  //       console.error('Error setting up the request:', error.message);
  //     }
  //   }
  // },[]);

  


  useEffect(() => {
    // Filter today's workout data
    console.log("apiData:", typeof (apiData));
    const today = new Date().toISOString().slice(0, 10);
    const todayData = apiData.filter((item) => item.workoutDate === today);
    setTodayWorkoutData(todayData);
  }, [apiData]);

  const handleSubmit = useCallback (async (e) => {
    e.preventDefault(); 
    if(workoutDate && workoutType && workoutName && workoutMinutes &&caloriesBurnt && startTime ){
      const workoutObj = {
        userName,
        workoutDate,
        workoutType,
        workoutName,
        workoutMinutes,
        caloriesBurnt,
        startTime
      }
      setWorkoutData(workoutObj);

      try{
        const response = await fetch('/api/workoutLogGet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(workoutObj)
        });
        if (response.ok) {
          console.log('Data submitted successfully');
          const today = new Date().toISOString().slice(0, 10);
          if (workoutDate === today) {
            setTodayWorkoutData([...todayWorkoutData, workoutObj]); 
          }
        } else {
          console.error('Failed to submit data');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
      
    }
    
  }, [workoutDate, workoutType, workoutName, workoutMinutes, caloriesBurnt, startTime, userName, todayWorkoutData])

  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };


  useEffect (() => {
    console.log( "Api Data Final: " );
    console.log(apiData);
  },[apiData]);

  
  useEffect(() => {
    // const fetchData = async () => {
    //   await getWorkoutData();
    // };
    // if(userName){
    //   getWorkoutData();
    // }
    // fetchData();
    // getWorkoutData();
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('userDetail'));
        const userId = storedUser.username;
        if(userId === ''){
          return;
        }
        console.log(userId);
        const uri = '/api/workoutLog/' + userId;
        console.log('Request URI:', uri);
        const response = await axios.get(uri);
  
  
        if (response.status === 200) {
          console.log(typeof(response.data.workoutlog));
          // const parsedData = JSON.parse(response.data.workoutlog);
          setApiData(response.data.workoutlog);
          console.log(response.data.workoutlog);
        } else {
          throw new Error("Failed to fetch workout data");
        }
      } catch (error) {
        if (error.response) {
          console.error('Server responded with error status:', error.response.status);
          console.error('Error response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received from the server:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
  
    }
    fetchData();
    

  }, [handleSubmit, todayWorkoutData]); //[userName, getWorkoutData]

    return (
      <>
      {showNotification && (
        <Notification
          message="Please log in to view this page."
          onClose={closeNotification}
        />
      )}
      <div className='workout-log-container'>
      {!showNotification && (
        <>
        <div className='workout-container'>
        <h2 className='workout-title'>Add New Workout</h2>
        <form onSubmit={handleSubmit} className='workout-form'>
          <div>
            <label className='workout-label' htmlFor="workoutDate">
              Workout Date:
            </label>
            <input
              className="data-input"
              type="date"
              id="workoutDate"
              value={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='workout-label' htmlFor="workoutType">
              Workout Type:
            </label>
            <select
              className="data-input"
              id="workoutType"
              value={workoutType}
              onChange={(e) => {
                setWorkoutType(e.target.value);
                // setExerciseList(e.target.value);
              }}
              required
            >
              <option value="">Select Workout Type</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength Training">Strength Training</option>
              <option value="Flexibility Training">Flexibility Training</option>
              <option value="Balance And Stability">Balance & Stability</option>
            </select>
          </div>
          <div>
            <label className='workout-label' htmlFor="workoutName">
              Workout Name:
            </label>
            <select
              // type="text"
              className="data-input"
              id="workoutName"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              required
            >
              {workoutType === '' && <option value="">Select Workout Type First</option>}
              {workoutType === 'Cardio' && (
                <>
                <option value="">Select Cardio Exercise Below:</option>
                <option value="Walking">Walking</option>
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="JumpRope">Jump Rope</option>
                <option value="Elliptical Training">Elliptical Training</option>
                <option value="Rowing">Rowing</option>         
                </>       
              )}
              {workoutType === 'Strength Training' && (
                <>
                <option value="">Select Strength Training Exercise Below:</option>
                <option value="Barbell Squats">Barbell Squats</option>
                <option value="Deadlifts">Deadlifts</option>
                <option value="Bench Press">Bench Press</option>
                <option value="Pull-Ups">Pull-Ups</option>
                <option value="Dumbbell Lunges">Dumbbell Lunges</option>
                <option value="Push-Ups">Push-Ups</option>
                </>
              )}
              {workoutType === 'Flexibility Training' && (
                <>
                <option value="">Select Flexibility Training Exercise Below:</option>
                <option value="Static Stretching">Static Stretching</option>
                <option value="Yoga Poses">Yoga Poses</option>
                <option value="Pilates">Pilates</option>
                <option value="Foam Rolling">Foam Rolling</option>
                <option value="Tai Chi">Tai Chi</option>
                </>
                
              )}
              {workoutType === 'Balance And Stability' && (
                <>
                <option value="">Select Balance & Stability Exercise Below:</option>
                <option value="Single-Leg Balance">Single-Leg Balance</option>
                <option value="Bosu Ball Exercises">Bosu Ball Exercises</option>
                <option value="Stability Ball Exercises">Stability Ball Exercises</option>
                <option value="Balance Board Exercises">Balance Board Exercises</option>
                <option value="Tai Chi Balance Exercises">Tai Chi Balance Exercises</option>
                </>
                
              )}
            </select>
          </div>
          <div>
            <label className='workout-label' htmlFor="workoutMinutes">
              Minutes:
            </label>
            <input
              className="data-input"
              type="number"
              id="workoutMinutes"
              min='1'
              value={workoutMinutes}
              onChange={(e) => setWorkoutMinutes(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='workout-label' htmlFor="caloriesBurnt">
              Calories Burnt:
            </label>
            <input
              className="data-input"
              type="number"
              id="caloriesBurnt"
              min='1'
              value={caloriesBurnt}
              onChange={(e) => setCaloriesBurnt(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='workout-label' htmlFor="startTime">
              Start Time:
            </label>
            <input
              className="data-input"
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Workout</button>
        </form>
      </div>
      <div className='food-log-right'>
      <div className='today-workout-log-container'>
        <h2 className='today-workout-title'>Today's Workout</h2>
        <div className="today-workout-content">
          {todayWorkoutData.length === 0 ? (
            <p className='workout-sub-title'>No workout data available for today.</p>
          ) : (
            <table className='workout-table'>
              <thead>
                <tr>
                  <th className='workout-th'>Date</th>
                  <th className='workout-th'>Type</th>
                  <th className='workout-th'>Name</th>
                  <th className='workout-th'>Minutes</th>
                  <th className='workout-th'>Calories Burnt</th>
                  <th className='workout-th'>Start Time</th>
                </tr>
              </thead>
              <tbody>
                {todayWorkoutData.map((workout, index) => (
                  <tr key={index}>
                    <td className='workout-td'>{workout.workoutDate}</td>
                    <td className='workout-td'>{workout.workoutType}</td>
                    <td className='workout-td'>{workout.workoutName}</td>
                    <td className='workout-td'>{workout.workoutMinutes}</td>
                    <td className='workout-td'>{workout.caloriesBurnt}</td>
                    <td className='workout-td'>{workout.startTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
      </>
      )

      }
      </div>
    </>
    );
  }

export default WorkoutLog;