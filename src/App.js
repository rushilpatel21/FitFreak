import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import your CSS file
import logo from './assets/logo.png'; // Import your logo image

function MenuBar() {
  return (
    <div className="menu-bar">
      <div>
        <p id="title-name">
          <Link to="/">
            <img id="title-image" src={logo} alt="FITFREAK" />
          </Link> 
        </p>
      </div>
      <div>
        <p id="web-links">
          <Link to="/music">Music</Link>
          <Link to="/graph">Graph</Link>
        </p>
      </div>
      <div>
        <p id="datetime"></p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="header-area header-transparent">
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-md-1">
                <div className="logo">
                  <Link to="/"><img id='title-image' src={logo} alt="FITFREAK" /></Link>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10">
                <div className="menu-main d-flex align-items-center justify-content-end">
                  <div className="main-menu f-right d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/workoutLog">Workout Log</Link></li> {/*We give them suggestions too, We allow user to log workout and view their logged workout*/}
                        <li><Link>Progress</Link>
                          <ul className="submenu">
                            <li><Link to="/caloriesBurnt">Calories Burnt</Link></li>
                            <li><Link to="/workoutMinutes">Workout Minutes</Link></li>
                            <li><Link to="/waterIntake">Water Intake</Link></li>
                          </ul>
                        </li> {/*We show user a graph for their workout*/}
                        <li><Link to="/music">Music</Link></li>
                        <li><Link to="/diet">Diet</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>
                  <div className="header-right-btn f-right d-none d-lg-block ml-30">
                    {/* <a href="from.html" className="btn header-btn">
                    <Routes>
                    <Route path="/Signin" element={<Signin />} />
                    </Routes>

                    </a> */}
                    <div className="btn header-btn">
                      <Link  to="/signup" >Sign Up</Link>
                    </div>
                    <div className="btn header-btn">
                      <Link  to="/signin" >Sign In</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Content() {
  return (
    <div id="content">
      {/* Content goes here */}
    </div>
  );
}

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      email: email,
    };
    // Save user data (e.g., send it to a server or store it locally)
    console.log('User data:', userData);

    // Reset form fields after submission
    setUsername('');
    setEmail('');
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

function Signin(){

}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return (
    <h2>This is rushil patel</h2>
  );
}

function WorkoutLog() {
  return <h2>Services</h2>;
}

function CaloriesBurnt(){
  return (
    <h1>Hello</h1>
  );
}

function WorkoutMinutes(){
  return (
    <h1>Hello</h1>
  );
}

function WaterIntake(){
  return (
    <h1>Hello</h1>
  );
}

function Music() {
  return <h2>Music</h2>;
}

function Diet() {
  return <h2>Diet</h2>;
}

function Contact() {
  return <h2>Contact</h2>;
}

function App() {
  return (
    <Router>
      <div>
        {/* <MenuBar /> */}
        <Header />
        <Content />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/workoutLog" element={<WorkoutLog />} />
          <Route path="/caloriesBurnt" element={<CaloriesBurnt />} />
          <Route path="/workoutMinutes" element={<WorkoutMinutes />} />
          <Route path="/waterIntake" element={<WaterIntake />} />
          <Route path="/music" element={<Music />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
