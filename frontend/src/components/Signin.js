import React, { useState } from 'react';
// import './SignIn.css';


function Signin({updateSignUpText, signUpText, loggedIn, setLoggedIn, signInText, updateSignInText,updateSignInRoute,updateSignUpRoute, signUpRoute, signInRoute}) {
    const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignIn = (e) => {
      e.preventDefault();
      const userData = {
        username: username,
        // email: email,
        password: password,
      };
      console.log('User data:', userData); //Saving data
  
      setUsername('');
      // setEmail('');
      setPassword('');
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
          {/* <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter email'
              required
            />
          </div> */}
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