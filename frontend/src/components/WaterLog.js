import React, { useEffect,useState, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Swal from 'sweetalert2'

function WaterLog() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [waterDate, setWaterDate] = useState(new Date().toISOString().slice(0, 10));
  const [waterUnit, setWaterUnit] = useState('');
  const [waterQuantity, setWaterQuantity] = useState('');
  const [waterData,setWaterData] = useState([]);
  const [userName, setUserName] = useState('');
  const [apiData,setApiData] = useState([]);
  const [todayWaterData, setTodayWaterData] = useState([]); // Here i store todays data.

  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState===null || userState === 'false') {
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
      console.log("Water data updated:", waterData);
      setWaterUnit('');
      setWaterQuantity('');
    }
  }, [waterData]);

  const handleSubmit = useCallback (async (e) => {
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
          const today = new Date().toISOString.slice(0,10);
          if(waterDate === today){
            setTodayWaterData([...todayWaterData,waterObj]);
          }
        } else {
          console.error('Failed to submit data');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }else{
      alert('error');
    }



  },[userName,waterQuantity,waterDate, waterUnit, todayWaterData])
  // const closeNotification = () => {
  //   setShowNotification(false);
  //   navigate('/');
  // };

  useEffect (() => {
    console.log( "Api Data Final: " );
    console.log(apiData);
  },[apiData]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('userDetail'));
        const userId = storedUser.username;
        if(userId === ''){
          return;
        }
        console.log(userId);
        const uri = '/api/waterlog/' + userId;
        console.log('Request URI:', uri);
        const response = await axios.get(uri);
  
  
        if (response.status === 200) {
          console.log(typeof(response.data.waterLogs));
          setApiData(response.data.waterLogs);
          console.log("Set API Data");
          console.log(response.data.waterLogs);
        } else {
          throw new Error("Failed to fetch water data");
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
    

  }, [handleSubmit,todayWaterData]);

  useEffect(() => {
    console.log("apiData:", typeof (apiData));
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);
    const todayData = apiData.filter((item) => item.waterDate === today);

    setTodayWaterData(todayData);
  }, [apiData]);

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
          
            <div className='today-workout-log-container'>
        <h2 className='today-workout-title'>Today's Water Intake</h2>
        <div className="today-workout-content">
          {todayWaterData.length === 0 ? (
            <p className='workout-sub-title'>No Water data available for today.</p>
          ) : (
            <table className='workout-table'>
              <thead>
                <tr>
                  <th className='workout-th'>Date</th>
                  <th className='workout-th'>Quantity</th>
                  <th className='workout-th'>Unit</th>
                </tr>
              </thead>
              <tbody>
                {todayWaterData.map((water, index) => (
                  <tr key={index}>
                    <td className='workout-td'>{water.waterDate}</td>
                    <td className='workout-td'>{water.waterQuantity}</td>
                    <td className='workout-td'>{water.waterUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
          
            </div>
          </>
        )}
      </div>
    </>
    );
  }

export default WaterLog;