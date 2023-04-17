// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import { loginUser, validateEmail } from '../../services/authService';
// import { SET_LOGIN, SET_NAME, SET_ADMIN } from '../../redux/features/auth/authSlice';
// import Loader from '../../components/loader/Loader';

// const initialState = {
//   email: "",
//   password: "",
//   adminUsername: "",
//   adminPassword: ""
// };

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState(initialState);
//   const { email, password, adminUsername, adminPassword } = formData;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value })
//   };

//   const login = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       return toast.error("All fields are required..")
//     }
//     if (!validateEmail(email)) {
//       return toast.error("Please enter a valid email..")
//     }
//     const userData = {
//       email,
//       password
//     };
//     setIsLoading(true);
//     try {
//       const data = await loginUser(userData);
//       console.log(data);
//       await dispatch(SET_LOGIN(true));
//       await dispatch(SET_NAME(data.name));
//       setIsLoading(false);
//       navigate("/dashboard");
//     } catch (error) {
//       setIsLoading(false);
//     }
//   };

//   const adminLogin = async (e) => {
//     e.preventDefault();
//     if (!adminUsername || !adminPassword) {
//       return toast.error("All fields are required..")
//     }
//     const adminData = {
//       adminUsername,
//       adminPassword
//     };
//     setIsLoading(true);
//     try {
//       // Replace this with your own logic for admin authentication
//       if (adminUsername === "admin" && adminPassword === "password") {
//         await dispatch(SET_ADMIN(true));
//         setIsLoading(false);
//         navigate("/dashboard");
//       } else {
//         toast.error("Invalid admin credentials.");
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setIsLoading(false);
//     }
//   };

//   const isAdmin = useSelector(state => state.auth.isAdmin);

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6 mx-auto">
//           <div className="card">
//             <div className="card-body">
//               <h1 className="card-title text-center">Login</h1>
//               <form>
//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input type="email" className="form-control" name="email" value={email} onChange={handleInputChange} />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <input type="password" className="form-control" name="password" value={password} onChange={handleInputChange} />
//                 </div>
//                 <div className="form-group">
//                   <button className="btn btn-primary btn-block" onClick={login}>Login</button>
//                 </div>
//               </form>
//               <hr />
//               <form>
//                 <div className="form-group">
//                   <label htmlFor="adminUsername">Admin Username</label>
//                   <input type="text" className="form-control"