import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import "./TopNav.css";

const TopNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({...state}));

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null
    })

    window.localStorage.removeItem("auth");
    history.push('/login');
  }

  return(
    <div className='nav d-flex justify-content-around'>
    <Link className='nav-link' to="/">Home</Link>
    
    {auth !== null && (<a className="nav-link pointer" onClick={logout}>
      Logout
    </a>)}
    {auth === null && (
      <>
        <Link className='nav-link' to="/register">Register</Link>
        <Link className='nav-link' to="/login">Login</Link>
      </>
    )}
    
  </div>
  )
}

export default TopNav;