import React, { useEffect, useState, useCallback } from 'react';
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
  const [foodFinalData,setFoodFinalData] = useState([]);
  const [userName, setUserName] = useState('');
  const [apiData,setApiData] = useState([]);
  const [todayFoodData, setTodayFoodData] = useState([]); // Here i store todays data.

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
    if(foodData[0]){
      console.log(foodData[0]);
      // console.table(foodData);
      setFoodCalories(foodData[0].calories);
      setFoodFat(foodData[0].fat_total_g);
      setFoodSugar(foodData[0].sugar_g);
      setFoodProtein(foodData[0].protein_g);
      setFoodCarbohydrates(foodData[0].carbohydrates_total_g);
    }
  }, [foodData, setFoodCarbohydrates,setFoodProtein,setFoodSugar,setFoodFat,setFoodCalories]);
  useEffect(() => {
    if(foodFinalData){
      console.log("Final food data");
      console.log(foodFinalData[0]);
    }
  },[foodFinalData])
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
        if(!response.data[0]){
          alert('Sorry, We dont have the food name in our database. Please Fill the details manually');
        }
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
  

  const handleSubmit = useCallback (async (e) => {
    e.preventDefault();
    // const foodQuery = foodQuantity + " " + foodUnit + " " + foodName;
    // fetchFoodData(foodQuery);
    if(!foodData[0] || foodName.toLowerCase() !== foodData[0].name.toLowerCase()){
      let foodGrams = 0;
      if(!foodData[0]){
        console.log("No food data");
      }else if(foodName !== foodData[0].name){
        console.log("2nd \nfood name " + foodName);
        console.log("food data[0]" + foodData[0].name );
      }
      if(foodUnit === 'g'){
        foodGrams = foodQuantity;
      }else if(foodUnit === 'kg'){
        foodGrams = Math.round(foodQuantity * 1000);
      }else if(foodUnit === 'lb'){
        foodGrams = Math.round((foodQuantity*2.20462).toFixed(2));
      }else if(foodUnit === ' '){
        foodGrams = 250*foodQuantity;
      }
      // console.log("No Food"); 
      
      // I have removed the [ ] from the foodObj.
      const foodObj = 
        {
          userName,
          "name": foodName,
          "calories": foodCalories,
          "serving_size_g": foodGrams,
          "fat_total_g": foodFat,
          "fat_saturated_g": 0,
          "protein_g": foodProtein,
          "sodium_mg": 0,
          "potassium_mg": 0,
          "cholesterol_mg": 0,
          "carbohydrates_total_g": foodCarbohydrates,
          "fiber_g": 0,
          "sugar_g": foodSugar,
          "date": foodDate
        }
      const foodObj2 = [
        {
          "name": foodName,
          "calories": foodCalories,
          "serving_size_g": foodGrams,
          "fat_total_g": foodFat,
          "fat_saturated_g": 0,
          "protein_g": foodProtein,
          "sodium_mg": 0,
          "potassium_mg": 0,
          "cholesterol_mg": 0,
          "carbohydrates_total_g": foodCarbohydrates,
          "fiber_g": 0,
          "sugar_g": foodSugar
          
        }
      ]
      console.log("Inside Manual Food Entry");
      console.log(foodObj2[0]);
      setFoodFinalData(foodObj2);

      setFoodQuantity('');
      setFoodUnit(' ');
      setFoodName('');
      setFoodCalories('');
      setFoodFat('');
      setFoodSugar('');
      setFoodProtein('');
      setFoodCarbohydrates('');
      console.log("Final from if for backend : ");
      // const foodObj = foodData[0];
      console.log(foodObj);
      try{
        const response = await fetch('/api/foodLogGet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(foodObj)
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
      setFoodQuantity('');
      setFoodUnit(' ');
      setFoodName('');
      setFoodCalories('');
      setFoodFat('');
      setFoodSugar('');
      setFoodProtein('');
      setFoodCarbohydrates('');
      setFoodFinalData(foodData);
      console.log("Final from else for backend : ");
      // const foodObj = foodData[0];
      const foodObj = {
          userName,
          "name": foodData[0].name,
          "calories": foodData[0].calories,
          "serving_size_g": foodData[0].serving_size_g,
          "fat_total_g": foodData[0].fat_total_g,
          "fat_saturated_g": foodData[0].fat_saturated_g,
          "protein_g": foodData[0].protein_g,
          "sodium_mg": foodData[0].sodium_mg,
          "potassium_mg": foodData[0].potassium_mg,
          "cholesterol_mg": foodData[0].cholesterol_mg,
          "carbohydrates_total_g": foodData[0].carbohydrates_total_g,
          "fiber_g": foodData[0].fiber_g,
          "sugar_g": foodData[0].sugar_g,
          "date": foodDate
      }
      console.log(foodObj);
      try{
        const response = await fetch('/api/foodLogGet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(foodObj)
        });
        if (response.ok) {
          console.log('Data submitted successfully');
        } else {
          console.error('Failed to submit data');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
    console.log(foodData[0]);
    clearValues();
    
  },[userName, foodCalories , foodCarbohydrates, foodFat, foodData, foodDate, foodName, foodProtein, foodQuantity, foodSugar, foodUnit ])

  const closeNotification = () => {
    setShowNotification(false);
    navigate('/');
  };
  const clearValues  = ()=>{
    setFoodQuantity('');
    setFoodUnit(' ');
    setFoodName('');
    setFoodCalories('');
    setFoodFat('');
    setFoodSugar('');
    setFoodProtein('');
    setFoodCarbohydrates('');
    setFoodData([]);
  }

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
        const uri = '/api/foodlog/' + userId;
        console.log('Request URI:', uri);
        const response = await axios.get(uri);
  
  
        if (response.status === 200) {
          console.log(typeof(response.data.foodLogs));
          // const parsedData = JSON.parse(response.data.foodLogs);
          setApiData(response.data.foodLogs);
          console.log("Set API Data");
          console.log(response.data.foodLogs);
        } else {
          throw new Error("Failed to fetch food data");
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
    

  }, [handleSubmit]);

  useEffect(() => {
    console.log("apiData:", typeof (apiData));
    const today = new Date().toISOString().slice(0, 10);
    console.log(today);
    const todayData = apiData.filter((item) => item.date === today);

    setTodayFoodData(todayData);
  }, [apiData]);

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
                    min="0"
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
                    min="0"
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
                    min="0"
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
                    min="0"
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
                    min="0"
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
      <div className='today-workout-log-container'>
        <h2 className='today-workout-title'>Today's Food Intake</h2>
        <div className="today-workout-content">
          {todayFoodData.length === 0 ? (
            <p className='workout-sub-title'>No Food data available for today.</p>
          ) : (
            <table className='workout-table'>
              <thead>
                <tr>
                  <th className='workout-th'>Date</th>
                  <th className='workout-th'>Name</th>
                  <th className='workout-th'>Calories</th>
                  <th className='workout-th'>Quantity (gm)</th>
                  <th className='workout-th'>Fat</th>
                  <th className='workout-th'>Protein</th>
                  <th className='workout-th'>Carbohydrates</th>
                  <th className='workout-th'>Sugar</th>
                </tr>
              </thead>
              <tbody>
                {todayFoodData.map((food, index) => (
                  <tr key={index}>
                    <td className='workout-td'>{food.date}</td>
                    <td className='workout-td'>{food.name}</td>
                    <td className='workout-td'>{food.calories}</td>
                    <td className='workout-td'>{food.serving_size_g}</td>
                    <td className='workout-td'>{food.fat_total_g}</td>
                    <td className='workout-td'>{food.protein_g}</td>
                    <td className='workout-td'>{food.carbohydrates_total_g}</td>
                    <td className='workout-td'>{food.sugar_g}</td>
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

export default FoodLog;
