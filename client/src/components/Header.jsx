import { Link } from 'react-router-dom';
import { useCurrentUserContext } from '../context/CurrentUser';

function Header() {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();

  return (
    <div className="grid grid-cols-2 border-2 border-black">
      <Link to="/" className="text-5xl ml-2 justify-start">
        Book Rebound
      </Link>
      <nav className="flex flex-row justify-end p-5 bg-forestback-100">
        {/* <Link to="/" className="text-5xl self-start ml-2">Book Rebound</Link> */}
        {isLoggedIn() ? (
          <>
            <Link className="mr-5" to="/dashboard">
              Dashboard
            </Link>
            <button type="button" onClick={logoutUser}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="pr-5" to="/login">
              Login
            </Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
