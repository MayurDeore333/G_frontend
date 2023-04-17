import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService'
import {useDispatch} from "react-redux";
import {SET_LOGIN, SET_NAME} from "../../redux/features/auth/authSlice";
import Loader from '../../components/loader/Loader'


const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
   const [formData, setformData] = useState(initialState);
   const {name, email, password, password2} = formData;

   const handleInputChange = (e)=> {
const{name, value}=e.target;
setformData({...formData,[name]:value})
   };

   const register = async(e)=> {
e.preventDefault();
 if (!name|| !email || !password) {
  return toast.error("All fields are required..")
 }
 if (password.length < 8) {
  return toast.error("Passwords must be upto 8 characters..")
 }
 if (!validateEmail(email)) {
  return toast.error("Please enter a valid email..")
 }
 if (password !== password2) {
  return toast.error("Passwords do not match..")
 }
  const userData = {
    name, email, password
  };
  setIsLoading(true);
  try {
    const data = await  registerUser(userData);
    // console.log(data);
    await dispatch(SET_LOGIN(true));
    await dispatch(SET_NAME(data.name));
    navigate("/items");
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    
  }
   };

  return (
    <>
     
      <div className="h-100 gradient-form py-5" style={{backgroundColor: "#eee"}}>
           <div className="container h-100">
            {isLoading && <Loader/>}
      <div className="row d-flex justify-content-center align-items-center h-100">
       
        <div className="card rounded-3 text-black">
        
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <img src="GPN_Logo-GBH.png"
                    style={{width: "185px" }} alt="logo"/>
                  <h4 className="mt-1 mb-5 pb-1">GrahakBhandar</h4>
                </div>

                <form onSubmit={register}>
                  <p>Please register as a new User</p>

                  <div className="form-outline mb-4">
                    <input type="text" id="form2Example11" className="form-control"
                      placeholder="Name" required name="name" value={name} onChange={handleInputChange}/>
                    {/* <label className="form-label" htmlFor="form2Example11">Name</label> */}
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example11" className="form-control"
                      placeholder="Email Address" required name="email" value={email} onChange={handleInputChange} />
                     
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control"  placeholder="New password" required name="password" value={password} onChange={handleInputChange}/>
                    
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control" placeholder="Confirm Password"required name="password2" value={password2} onChange={handleInputChange}/>
                   
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" onClick={register} type="button">Register</button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                  <Link type="button" className="btn btn-outline-danger mr-2" to="/"> Home</Link>
                    <p className="mb-0 me-2">Already have an account?</p>
                    <Link type="button" className="btn btn-outline-danger ml-2" to="/login">Login</Link>
                  </div>

                </form>

              </div>
            
          </div>
        </div>
      </div>
    
       </div>
    
    </>
  )
}

export default Register
