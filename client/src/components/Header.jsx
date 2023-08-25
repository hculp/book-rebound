import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../context/CurrentUser';

 function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <nav className="flex flex-row justify-between">
      <p className="text-5xl self-start">Book Rebound</p>
      {isLoggedIn() ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button type="button" onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
 }

 export default Header