import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { forgotPassword, validateEmail } from '../../services/authService';

const Forgot = () => {
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email..")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email..")
    }
    const userData = {
      email,
    };
    await forgotPassword(userData);
    setEmail("");
  };
  return (
    <>
      <div>
        <div className="h-100 gradient-form py-5" style={{ backgroundColor: "#eee" }}>
          <div className="container  h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">

              <div className="card rounded-3 text-black">

                <div className="card-body p-md-5 mx-md-4">

                  <div className="text-center">
                    <img src="GPN_Logo-GBH.png"
                      style={{ width: "185px" }} alt="logo" />
                    <h4 className="mt-1 mb-5 pb-1">GrahakBhandar</h4>
                    <h5 className="mb-3">FORGOT PASSWORD</h5>

                  </div>

                  <form onSubmit={forgot}>

                    <div className="form-outline mb-4">
                      <input 
                        type="email" 
                        className="form-control"
                        placeholder="Email" 
                        required 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} />
                      {/* <label className="form-label" for="form2Example11">Username</label> */}
                    </div>

                    {/* <div className="form-outline mb-4">
                    <input type="password" id="form2Example22" className="form-control"  placeholder="password" />
                    
                    <label className="form-label" for="form2Example22">Password</label>
                  </div> */}

                    <div className="text-center pt-1 mb-5 pb-1">
                      <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Get Reset Email</button>
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

export default Forgot
