// import React, { useState } from "react";
// import "./ChangePassword.scss";
// import { toast } from "react-toastify";
// import { changePassword } from "../../services/authService";
// // import Card from "../card/Card";
// import { useNavigate } from "react-router-dom";


// const initialState = {
//   oldPassword: "",
//   password: "",
//   password2: "",
// };

// const ChangePassword = () => {
//   const navigate = useNavigate();
//   const [formData, setformData] = useState(initialState);
//   const { oldPassword, password, password2 } = formData;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };

//   const changePass = async (e) => {
//     e.preventDefault();

//     if (password !== password2) {
//       return toast.error("New passwords do not match");
//     }

//     const formData = {
//       oldPassword,
//       password,
//     };

//     const data = await changePassword(formData);
//     toast.success(data);
//     navigate("/profile");
//   };

//   return (
//     <div className="change-password">
//       {/* <Card cardClass={"password-card"}> */}
//         <h3>Change Password</h3>
//         <form onSubmit={changePass} className="--form-control">
//           <input
//             type="password"
//             placeholder="Old Password"
//             required
//             name="oldPassword"
//             value={oldPassword}
//             onChange={handleInputChange}
//           />
//           <input
//             type="password"
//             placeholder="New Password"
//             required
//             name="password"
//             value={password}
//             onChange={handleInputChange}
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             required
//             name="password2"
//             value={password2}
//             onChange={handleInputChange}
//           />
//           <button type="submit" className="--btn --btn-primary">
//             Change Password
//           </button>
//         </form>
//       {/* </Card> */}
//     </div>
//   );
// };

// export default ChangePassword;


// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { changePassword } from "../../services/authService";
// // import Card from "../card/Card";
// import { useNavigate } from "react-router-dom";


// const initialState = {
//   oldPassword: "",
//   password: "",
//   password2: "",
// };

// const ChangePassword = () => {
//   const navigate = useNavigate();
//   const [formData, setformData] = useState(initialState);
//   const { oldPassword, password, password2 } = formData;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };

//   const changePass = async (e) => {
//     e.preventDefault();

//     if (password !== password2) {
//       return toast.error("New passwords do not match");
//     }

//     const formData = {
//       oldPassword,
//       password,
//     };

//     const data = await changePassword(formData);
//     toast.success(data);
//     navigate("/profile");
//   };

//   return (
//     <>
//       <section className="vh-100 gradient-custom">
//         <div className="container py-5 h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//               <div
//                 className="card bg-dark text-white"
//                 style={{ borderradius: "1rem" }}
//               >
//                 <div className="card-body p-5 text-center">
//                   <div className="mb-md-5 mt-md-4 pb-5">
//                     <h2 className="fw-bold mb-2 text-uppercase">Change Password</h2>
                   
//                   </div>
//                   <form onSubmit={changePass}>
//           <input
//             type="password"
//             placeholder="Old Password"
//             required
//             name="oldPassword"
//             value={oldPassword}
//             onChange={handleInputChange}
//           />
//           <input
//             type="password"
//             placeholder="New Password"
//             required
//             name="password"
//             value={password}
//             onChange={handleInputChange}
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             required
//             name="password2"
//             value={password2}
//             onChange={handleInputChange}
//           />
//           <button type="submit" className="--btn --btn-primary">
//             Change Password
//           </button>
//         </form>
//                   <div>
//                     <p className="mb-0 text-white-50 fw-bold">
//                       GrahakBhandar, Government Polytechnic, Nashik.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ChangePassword;
