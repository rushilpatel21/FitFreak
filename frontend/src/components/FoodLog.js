import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.js';
import axios from 'axios';

function FoodLog() {
  const apiKey = 'Tk0v+INWYmZJFQpv59/b/A==vLu7ncZY9kxHT7FH';  //Api Key from api-ninjas.com 
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [foodDate, setFoodDate] = useState(new Date().toISOString().slice(0, 10));
  const [foodUnit, setFoodUnit] = useState(' ');
  const [foodQuantity, setFoodQuantity] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodData, setFoodData] = useState([]); // Here we accept the api's response data for our query results
  const [foodCalories, setFoodCalories] = useState();
  const [foodFat, setFoodFat] = useState();
  const [foodSugar, setFoodSugar] = useState();
  const [foodProtein, setFoodProtein] = useState();
  const [foodCarbohydrates, setFoodCarbohydrates] = useState();
  // const [foodFinalData,setFoodFinalData] = useState();

  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState === 'false') {
      setShowNotification(true);
    }
  }, []);

  useEffect(() => {
    if(foodData[0]){
      console.log(foodData[0]);
      // console.table(foodData);
      setFoodCalories(foodData[0].calories);
      setFoodFat(foodData[0].fat_total_g);
      setFoodSugar(foodData[0].sugar_g);
      setFoodProtein(foodData[0].protein_g);
      setFoodCarbohydrates(foodData[0].carbohydrates_total_g);
    }
    
    
  }, [foodData, setFoodCarbohydrates,setFoodProtein,setFoodSugar,setFoodFat,setFoodCalories  ]);

  const fetchFoodData = async (query) => {
    console.log('inside api call');
    axios.get('https://api.api-ninjas.com/v1/nutrition', {
      params: { query },
      headers: { 'X-Api-Key': apiKey }
    })
      .then(response => {
        setFoodData(response.data);
        // setFoodCalories(response.data.calories);
        // setFoodFat(response.data.fat_total_g);
        // setFoodSugar(response.data.sugar_g);
        // setFoodProtein(response.data.protein_g);
        // setFoodCarbohydrates(response.data.carbohydrates_total_g);
      })
      .catch(error => {
        console.error('Error:', error.response.data);
      });
  }
  const handleFetchFoodData = () => {
    console.log('From Auto Detect');
    if(foodQuantity && foodUnit && foodName){
      console.log('Inside Auto Detect');
      const foodQuery = foodQuantity + " " + foodUnit + " " + foodName;
      fetchFoodData(foodQuery);
    }
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const foodQuery = foodQuantity + " " + foodUnit + " " + foodName;
    // fetchFoodData(foodQuery);
    setFoodQuantity('');
    setFoodUnit('');
    setFoodName('');
    setFoodCalories('');
    setFoodFat('');
    setFoodSugar('');
    setFoodProtein('');
    setFoodCarbohydrates('');
    console.log(foodData[0]);
    // console.log(foodFinalData);
  }

  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };

  return (
    <>
      <div>
        {showNotification && (
          <Notification
            message="Please log in to view this page."
            onClose={closeNotification}
          />
        )}
      </div>
      <div className='food-log-container'>
        {!showNotification && (
          <>
            <div className='food-container'>
              <h2 className='food-title'>Log Food Intake</h2>
              <form onSubmit={handleSubmit} className='food-form'>
                <div>
                  <label className='date-food-log' htmlFor="foodDate">
                    Date :
                  </label>
                  <input
                    className="date-input"
                    type="date"
                    id="foodDate"
                    value={foodDate}
                    onChange={(e) => {
                      setFoodDate(e.target.value);
                      // handleFetchFoodData();
                    }}
                    required
                  />
                </div>
                <div>
                  <input className='food-form-quant'
                    type="number"
                    id="foodQuantity"
                    value={foodQuantity}
                    placeholder='Number of'
                    min="1"
                    onChange={(e) => {
                      setFoodQuantity(e.target.value);
                      // handleFetchFoodData();
                    }}
                    required
                  />
                  <select className='food-form-unit'
                    id="foodUnit"
                    value={foodUnit}
                    onChange={(e) => {
                      setFoodUnit(e.target.value);
                      // handleFetchFoodData();
                    }}
                    required
                  >
                    <option value=" ">Number</option>
                    <option value="kg">Kilo Grams</option>
                    <option value="g">Grams</option>
                    <option value="lb">Pounds</option>
                  </select>
                  <input className='food-form-name'
                    type="text"
                    id="foodName"
                    value={foodName}
                    placeholder='Food Name'
                    onChange={(e) => {
                      setFoodName(e.target.value);
                      // handleFetchFoodData();
                    }}
                    required
                  />
                  <button type='button' className='handle-fetch-btn' onClick={handleFetchFoodData}>Auto Fill</button>
                </div>
                <div>
                  <label className='date-food-log' htmlFor="foodDate">
                    Calories (g) :
                  </label>
                  <input
                    className="date-input"
                    type="number"
                    id="foodCalories"
                    value={foodCalories || ''}
                    placeholder='Food Calories'
                    min="1"
                    step="0.01"
                    onChange={(e) => {
                      setFoodCalories(e.target.value);
                    }}
                    required
                  />
                </div>
                <div>
                  <label className='date-food-log' htmlFor="foodDate">
                    Fat (g) :
                  </label>
                  <input
                    className="date-input"
                    type="number"
                    id="foodFat"
                    value={foodFat || ''}
                    placeholder='Food Fat (g)'
                    min="1"
                    step="0.01"
                    onChange={(e) => {
                      setFoodFat(e.target.value);
                    }}
                    required
                  />
                </div>
                <div>
                  <label className='date-food-log' htmlFor="foodSugar">
                    Sugar (g) :
                  </label>
                  <input
                    className="date-input"
                    type="number"
                    id="foodSugar"
                    value={foodSugar || ''}
                    placeholder='Food Sugar (g)'
                    min="1"
                    step="0.01"
                    onChange={(e) => {
                      setFoodSugar(e.target.value);
                    }}
                    required
                  />
                </div>
                <div>
                  <label className='date-food-log' htmlFor="foodProtein">
                    Protein (g) :
                  </label>
                  <input
                    className="date-input"
                    type="number"
                    id="foodProtein"
                    value={foodProtein || ''}
                    placeholder='Food Protein (g)'
                    min="1"
                    step="0.01"
                    onChange={(e) => {
                      setFoodProtein(e.target.value);
                    }}
                    required
                  />
                </div>
                <div>
                  <label className='date-food-log' htmlFor="foodCarbohydrates">
                  Carbohydrates (g) :
                  </label>
                  <input
                    className="date-input"
                    type="number"
                    id="foodCarbohydrates"
                    value={foodCarbohydrates || ''}
                    placeholder='Food Carbohydrates (g)'
                    min="1"
                    step="0.01"
                    onChange={(e) => {
                      setFoodCarbohydrates(e.target.value);
                    }}
                    required
                  />
                </div>
                <button type="submit">Add Food Intake</button>
              </form>
            </div>
            <div className='food-log-right'>
          
              <div className='today-food-log-container'>
                <h2 className='today-food-title'>Today's Food Intake</h2>
              </div>
          
            </div>
          </>
        )}
      </div>
      
      
    </>
  );
}

export default FoodLog;
