import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

//Here I have used Water  instead of Calories but its just internal.


function CaloriesBurnt(){
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [waterDataMonth, setWaterDataMonth] = useState({});
  const [waterDataDay, setWaterDataDay] = useState({});
  const [displayMode, setDisplayMode] = useState('Days');
  const [waterData, setWaterData] = useState(); 

  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState === 'false') {
      setShowNotification(true);
    }
  }, []);

  useEffect(() => {
    
    const MockWaterDataForDays = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [
        {
          label: 'Calories Burned',
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
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
    const MockWaterDataForMonths = {
      labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
      datasets: [
        {
          label: 'Calories Burned',
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
    
      setWaterDataDay(MockWaterDataForDays);
      setWaterDataMonth(MockWaterDataForMonths);
    // console.log(waterData);
  }, [displayMode]);

  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };

  useEffect(() => {
    setWaterData(displayMode === 'Days' ? waterDataDay : waterDataMonth);
  }, [displayMode, waterData, waterDataDay, waterDataMonth]);

  const toggleDaysMonths = () => {
    setDisplayMode(prevMode => (prevMode === 'Days' ? 'Months' : 'Days'));
    if(displayMode==='Days'){
      setWaterData(waterDataDay);
    }else {
      setWaterData(waterDataMonth);
    }
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
        <div className='water-container water-container-history'>
          <div className="water-history-container-1"> {/* This is for total Calories for last 7 days and for last 6 months */}
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
      )

      }
    </>
    );
  }

export default CaloriesBurnt;