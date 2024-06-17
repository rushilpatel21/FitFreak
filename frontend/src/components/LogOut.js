import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function LogOut({updateSignUpText, signUpText, loggedIn, setLoggedIn, signInText, updateSignInText,updateSignInRoute,updateSignUpRoute, signUpRoute, signInRoute, updateUserDetails, toggleUserDetailsModal, showUserDetails  }) {
  const navigate = useNavigate();
  updateUserDetails('');
  updateSignUpText('Sign Up');
  setLoggedIn(false);
  updateSignInText('Sign In');
  updateSignInRoute('/signin');
  updateSignUpRoute('/signup');
  Cookies.set("isLoggedIn",false);
  Cookies.remove("userDetails");
  // toggleUserDetailsModal(false);

  navigate('/');

    return (
      <></>
    );
  }

export default LogOut;