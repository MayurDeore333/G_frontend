import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { logoutUser } from '../services/authService';
import Loader from '../components/loader/Loader';
import { ShowOnLogin, ShowOnLogout } from '../components/loader/protect/HiddenLink';
 

// import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser';


const Home = () => {
  //  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const logout = async () => {
    setIsLoading(true);
    await logoutUser();
 
    await dispatch(SET_LOGIN(false));
 
    // navigate("/login");
    setIsLoading(false);
  };

  return (
    <div>
      

         {/* {isLoading&& <Loader/>}
      <nav
        className="navbar mt-0 py-0 navbar-expand-lg "
        style={{
          backgroundColor:   "#282a35",
        }}
      >
        <Link className="navbar-brand" style={{ color: "white",paddingLeft:"5px"  }} to="/">
          {" "}
          <img
            src="GPN_Logo-GBH.png"
            alt=""
            
            height="45"
        className="d-inline-block  "
          />
         <h4   className="d-inline-block" ><b>GrahakBhandar</b></h4>
        </Link>
       
        <button
          className="navbar-toggler"
          style={{ color: "white",backgroundColor:"white" }}
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
           aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
             <ShowOnLogout>
            <li className="nav-item  ">
              <Link className="nav-link" style={{ color: "white"}} to="/login">
                <b>Login</b>
              </Link>
            </li>
            </ShowOnLogout>
           
            <ShowOnLogin>
            <Link className="nav-link" style={{ color: "white"}} to="/dashboard">
                <b>Dashboard</b>
              </Link>
            <button onClick={logout} className="btn btn-danger">
                <b> Logout </b>
                </button>   
            </ShowOnLogin>
           
            
       
          </ul>
        </div>
      </nav> */}
    GPN GrahakBhandar 
    </div>
  )
}

export default Home

