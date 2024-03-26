import React, { useEffect,useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';
// import axios from 'axios'; 

function WaterLog() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [waterDate, setWaterDate] = useState(new Date().toISOString().slice(0, 10));
  const [waterUnit, setWaterUnit] = useState('');
  const [waterQuantity, setWaterQuantity] = useState('');
  const [waterData,setWaterData] = useState([]);
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
    if (waterData && waterData.length !== 0) {
      console.log("Workout data updated:", waterData);
      setWaterUnit('');
      setWaterQuantity('');
    }
  }, [waterData]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(waterDate && waterQuantity && waterUnit && userName){
      const waterObj = {
        userName,
        waterDate,
        waterQuantity,
        waterUnit
      }
      console.log(waterObj);
      setWaterData(waterObj);
      try{
        const response = await fetch('/api/waterLogGet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(waterObj)
        });
        if (response.ok) {
          console.log('Data submitted successfully');
        } else {
          console.error('Failed to submit data');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }else{
      alert('error');
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
      <div className='water-log-container'>
        {!showNotification && (
          <>
            <div className='water-container'>
              <h2 className='water-title'>Log Water Intake</h2>
              <form onSubmit={handleSubmit} className='water-form'>
                <div>
                  <label className='date-water-log' htmlFor="waterDate">
                    Date :
                  </label>
                  <input
                    className="date-input"
                    type="date"
                    id="waterDate"
                    value={waterDate}
                    onChange={(e) => {
                      setWaterDate(e.target.value);
                    }}
                    required
                  />
                </div>
                <div>
                  <input className='water-form-quant'
                    type="number"
                    id="waterQuantity"
                    value={waterQuantity}
                    placeholder='Number of'
                    min="1"
                    onChange={(e) => {
                      setWaterQuantity(e.target.value);
                    }}
                    required
                  />
                  <select className='water-form-unit'
                    id="waterUnit"
                    value={waterUnit}
                    onChange={(e) => {
                      setWaterUnit(e.target.value);
                    }}
                    required
                  >
                    <option value="">Select an Option</option>
                    <option value="Glass">Glass</option>
                    <option value="l">Litre</option>
                    <option value="ml">Milli-Litre</option>
                  </select>              
                </div>
                <button type="submit">Add Water Intake</button>
              </form>
            </div>
            <div className='water-log-right'>
          
              <div className='today-water-log-container'>
                <h2 className='today-water-title'>Today's Water Intake</h2>
              </div>
          
            </div>
          </>
        )}
      </div>
    </>
    );
  }

export default WaterLog;