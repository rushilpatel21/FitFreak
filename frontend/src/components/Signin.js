import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Signin({updateSignUpText, signUpText, loggedIn, setLoggedIn, signInText, updateSignInText,updateSignInRoute,updateSignUpRoute, signUpRoute, signInRoute, toggleUserDetailsModal, showUserDetails}) {
    const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const checkUserName = async () => {
      try {
        const uri = `${process.env.REACT_APP_BACKEND_URL}/api/users/` + username;
        // console.log('Request URI:', uri);
        const response = await axios.get(uri);
        
        if (response.status === 200) {
          // console.log("Username exists:", response.data.users[0]);
          setUserData(response.data.users[0]);
          if(password !== response.data.users[0].password){
            alert("Wrong Password!");
            setPassword('');
            return;
          }else{
            await updateSignUpText(username);
            setLoggedIn(true);
            updateSignInText('Log Out');
            updateSignInRoute('/logOut');
            updateSignUpRoute('#');
            setUsername('');
            setPassword('');
            // console.log("Inside submit form" + JSON.stringify(response.data.users[0]));
            localStorage.setItem('userDetail',JSON.stringify(response.data.users[0]));
            localStorage.setItem('isLoggedIn',true);
            navigate('/');
          }
        } else {
          // console.log("Username does not exist or other server error:", response.status);
          alert("UserName doesnt exsist, please sign up or re-check username");
          setUsername('');
          // return;
          return;
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
    };
    useState(() => {
      if(userData){
        // console.log( "User Data: " + userData);
      }
     
    },[userData])

    const handleSignIn = async (e) => {
      e.preventDefault();
      // const userData1 = {
      //   username: username,
      //   password: password,
      // };
      // console.log('User data:', userData1); //Saving data
      await checkUserName();
      // if(isExit === "2"){
      //   alert("UserName doesnt exsist, please sign up or re-check username");
      //   setUsername('');
      //   return;
      // }
      // console.log("Before user data: " + userData);
      // const pwd = userData.password;
      // console.log(pwd);
      // if(password !== pwd){
      //   alert("Wrong Password!");
      //   setPassword('');
      //   return;
      // }
      // updateSignUpText(username);
      // setLoggedIn(true);
      // updateSignInText('Log Out');
      // updateSignInRoute('/logOut');
      // updateSignUpRoute('#');
      // setUsername('');
      // setPassword('');
      // console.log("Inside submit form" + JSON.stringify(userData));
      // localStorage.setItem('userDetail',JSON.stringify(userData));
      // localStorage.setItem('isLoggedIn',true);
      // navigate('/');
    };
  
    return (
      <div className="sign-in-container">
        <h2 className="sign-in-title">Sign In</h2>
        <form onSubmit={handleSignIn} className="sign-in-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter username'
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }

  export default Signin;