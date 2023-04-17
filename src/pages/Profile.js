// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { SpinnerImg } from "../components/loader/Loader";
// import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
// // import Card from "../../components/card/Card";
// import { SET_NAME, SET_USER } from "../redux/features/auth/authSlice";
// import { getUser } from "../services/authService";

// // import "./Profile.scss";
// const Profile = () => {
//   useRedirectLoggedOutUser("/login");
//   const dispatch = useDispatch();

//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     console.log("Getting user");
//     setIsLoading(true);
//     async function getUserData() {
//       const data = await getUser();
//       console.log(data);

//       setProfile(data);
//       setIsLoading(false);
//       await dispatch(SET_USER(data));
//       await dispatch(SET_NAME(data.name));
//     }
//     getUserData();
//   }, [dispatch]);

//   return (
//     <div className="profile --my2">
//       {isLoading && <SpinnerImg />}
//       <>
//         {!isLoading && profile === null ? (
//           <p>Something went wrong, please reload the page...</p>
//         ) : (
//          <>
//           <section className="vh-100 gradient-custom">
//         <div className="container py-5 h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//               <div
//                 className="card bg-dark text-white"
//                 style={{ borderradius: "1rem" }}
//               >
//                 <div className="card-body p-5 text-center">
//                   <div className="mb-md-5 mt-md-4 pb-5">
//                     <h2 className="fw-bold mb-2 text-uppercase">Add Product</h2>
                   
//                   </div>
//                   <span className="profile-photo">
//               <img src={profile?.photo} alt="profilepic" />
//             </span>
//             <span className="profile-data">
//               <p>
//                 <b>Name : </b> {profile?.name}
//               </p>
//               <p>
//                 <b>Email : </b> {profile?.email}
//               </p>
//               <p>
//                 <b>Phone : </b> {profile?.phone}
//               </p>
//               <p>
//                 <b>Bio : </b> {profile?.bio}
//               </p>
//               <div>
//                 <Link to="/edit-profile">
//                   <button className="btn btn-primary">Edit Profile</button>
//                 </Link>
//               </div>
//             </span>
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
//             {/* <span className="profile-photo">
//               <img src={profile?.photo} alt="profilepic" />
//             </span>
//             <span className="profile-data">
//               <p>
//                 <b>Name : </b> {profile?.name}
//               </p>
//               <p>
//                 <b>Email : </b> {profile?.email}
//               </p>
//               <p>
//                 <b>Phone : </b> {profile?.phone}
//               </p>
//               <p>
//                 <b>Bio : </b> {profile?.bio}
//               </p>
//               <div>
//                 <Link to="/edit-profile">
//                   <button className="btn btn-primary">Edit Profile</button>
//                 </Link>
//               </div>
//             </span> */}
//             </>
         
//         )}
//       </>
//     </div>
//   );
// };

// export default Profile;

