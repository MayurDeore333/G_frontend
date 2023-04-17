import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';

const initialState = {
 
   
  password: "",
  password2: "",
 
};
const Reset = () => {
  const [formData, setformData] = useState(initialState);
   const {  password , password2 } = formData;

const {resetToken} = useParams()

   const handleInputChange = (e) => {
    const{name, value}=e.target;
    setformData({...formData,[name]:value})
       };

       const  reset = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
          return toast.error("Passwords must be upto 8 characters..")
         }
         if (password !== password2) {
          return toast.error("Passwords do not match..")
         }
         const userData = {
            password, password2,
        };
        try {
          const data = await resetPassword(userData, resetToken)
          toast.success(data.message);
        } catch (error) {
          console.log(error.message);
        }
       };
  return (
    <>
    <div>
      <div className="h-100 gradient-form py-5" style={{backgroundColor: "#eee"}}>
  <div className="container  h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
       
        <div className="card rounded-3 text-black">
        
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  {/* <img src="GPN_Logo-GBH.png"
                    style={{width: "185px", alt:"logo"}}/>
                  <h4 className="mt-1 mb-5 pb-1">GrahakBhandar</h4> */}
                  <h5 className="mb-3">RESET PASSWORD</h5>

                </div>

                <form onSubmit={reset}>
                  
                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example11" className="form-control"
                      placeholder="New Password" required name="password" value={password} onChange={handleInputChange} />
                    {/* <label className="form-label" for="form2Example11">Username</label> */}
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example11" className="form-control"
                      placeholder="Confirm Password" required name="password2" value={password2} onChange={handleInputChange}/>
                    {/* <label className="form-label" for="form2Example11">Username</label> */}
                  </div>

                  {/* <div className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control"  placeholder="password" />
                    
                    <label className="form-label" for="form2Example22">Password</label>
                  </div> */}

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button"  onClick={reset}>Reset Password</button>
                    {/* <Link className="text-muted" to="/forgot">Forgot password?</Link> */}
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                  <Link type="button" className="btn btn-outline-danger mr-2" to="/"> Home</Link>
                    <p className="mb-0 me-2"> </p>
                    <Link type="button" className="btn btn-outline-danger ml-2" to="/register"> Register</Link>
                  </div>

                </form>

              </div>
            
          </div>
        </div>
      </div>
    
</div>
    </div>
    </>
  )
}

export default Reset
