import React from 'react'
// import "./Login.scss";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
 import Loader from '../../components/loader/Loader';
 
const initialState = {
 
 email: "",
  password: "",
 
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
   const [formData, setformData] = useState(initialState);
   const {  email, password } = formData;

   const handleInputChange = (e) => {
    const{name, value}=e.target;
    setformData({...formData,[name]:value})
       };

       const login =  async (e) => {
       e.preventDefault();
       if ( !email || !password) {
        return toast.error("All fields are required..")
       }
       if (!validateEmail(email)) {
        return toast.error("Please enter a valid email..")
       }
       const userData = {
        email, password
      };
setIsLoading(true);
try {
  const data = await loginUser(userData);
  console.log(data);
  await dispatch(SET_LOGIN(true));
  await dispatch(SET_NAME(data.name));
  navigate("/");
  setIsLoading(false);
} catch (error) {
  setIsLoading(false);
}
       };

  return (
    <>
     <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white"   style={{borderradius : "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">
            <div className="avatar" style={{margin: "0 auto 16px", borderradius : "50%", background: "linear-gradient(-45deg, #c157a1, #c7a1ff)", padding: "2px",
 width: "120px",
 height: "120px"}}>



          <img src="GPN_Logo-GBH.png" style={{width: "100%", height: "100%", objectfit: "cover",borderradius: "50%", border: "4px solid #161616"}}alt="logo" />
        </div>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your email and password!</p>
              <form onSubmit={login}>
              <div className="form-outline form-white mb-4">
                <input type="email" id="typeEmailX"  placeholder="Email Address" className="form-control form-control-lg" required name="email" value={email} onChange={handleInputChange}/>
                
              </div>

              <div className="form-outline form-white mb-4">
                <input type="password" placeholder="Password" id="typePasswordX" className="form-control form-control-lg" required name="password" value={password} onChange={handleInputChange}/>
               
              </div>
             
              {/* <p className="small mb-5 pb-lg-2"><Link className="text-white-50" to="/">Forgot password?</Link></p> */}

              <button className="btn btn-outline-light btn-lg px-5 mt-5" onClick={login} type="submit">Login</button>
              </form>

             </div>

             <div>
              <p className="mb-0 text-white-50 fw-bold mb-2 ">GrahakBhandar, Government Polytechnic, Nashik. 
              </p>
             </div>
            
            


            </div>
        
          </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Login;
