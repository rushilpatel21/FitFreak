import React, { useEffect,useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';
// import axios from 'axios'; 

function WorkoutLog() {
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

  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState === 'false') {
      setShowNotification(true);
    }else{
      const storedUser = JSON.parse(localStorage.getItem('userDetail'));
      setUserName(storedUser.username);
      
    }
  }, []);

  useEffect(() => {
    console.log(userName);
  }, [userName]);

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

  const handleSubmit = async (e) => {
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
        } else {
          console.error('Failed to submit data');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
      // setWorkoutData(prevWorkoutData => [...prevWorkoutData, workoutObj]);
      // console.log(workoutObj);
      // console.log(workoutData); 
    }
  }

  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };

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