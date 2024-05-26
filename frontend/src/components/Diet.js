import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Diet() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const userState = localStorage.getItem("isLoggedIn");
    if (userState===null || userState === 'false') {
      setShowNotification(true);
    }
  }, []);

  // const closeNotification = () => {
  //   setShowNotification(false);
  //   navigate('/');
  // };

  const usingSwal = () => {
    Swal.fire({
      icon: "error",
      title: "User Not Logged In",
      text: "Please sign in to view diet",
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
      <div>
      {showNotification && (
        // <Notification
        //   message="Please log in to view this page."
        //   onClose={closeNotification}
        // />
        // <div className='notification'></div>
        usingSwal()
      )}
      {!showNotification && (
        <p>hello</p>
      )

      }
    </div>
    );
  }

export default Diet;