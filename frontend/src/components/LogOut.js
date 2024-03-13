import { useNavigate } from 'react-router-dom';

function LogOut({updateSignUpText, signUpText, loggedIn, setLoggedIn, signInText, updateSignInText,updateSignInRoute,updateSignUpRoute, signUpRoute, signInRoute, updateUserDetails, toggleUserDetailsModal, showUserDetails  }) {
  const navigate = useNavigate();
  updateUserDetails('');
  updateSignUpText('Sign Up');
  setLoggedIn(false);
  updateSignInText('Sign In');
  updateSignInRoute('/signin');
  updateSignUpRoute('/signup');
  navigate('/');

    return (
      <></>
    );
  }

export default LogOut;