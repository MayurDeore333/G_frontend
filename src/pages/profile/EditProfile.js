// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import Card from "../../components/card/Card";
// import Loader from "../../components/loader/Loader";
// import { selectUser } from "../../redux/features/auth/authSlice";
// // import "./Profile.scss";
// import { toast } from "react-toastify";
// import { updateUser } from "../../services/authService";
// import ChangePassword from "../../components/changePassword/ChangePassword";


// const EditProfile = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const user = useSelector(selectUser);
//   const { email } = user;

//   useEffect(() => {
//     if (!email) {
//       navigate("/profile");
//     }
//   }, [email, navigate]);

//   const initialState = {
//     name: user?.name,
//     email: user?.email,
//     phone: user?.phone,
//     bio: user?.bio,
//     photo: user?.photo,
//   };
//   const [profile, setProfile] = useState(initialState);
//   const [profileImage, setProfileImage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setProfileImage(e.target.files[0]);
//   };

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       // Handle Image upload
//       let imageURL;
//       if (
//         profileImage &&
//         (profileImage.type === "image/jpeg" ||
//           profileImage.type === "image/jpg" ||
//           profileImage.type === "image/png")
//       ) {
//         const image = new FormData();
//         image.append("file", profileImage);
//         image.append("cloud_name", "       ");
//         image.append("upload_preset", "      ");

//         // First save image to cloudinary
//         const response = await fetch(
//           // "https://api.cloudinary.com/v1_1/zinotrust/image/upload",
//           { method: "post", body: image }
//         );
//         const imgData = await response.json();
//         imageURL = imgData.url.toString();

//         // Save Profile
//         const formData = {
//           name: profile.name,
//           phone: profile.phone,
//           bio: profile.bio,
//           photo: profileImage ? imageURL : profile.photo,
//         };

//         const data = await updateUser(formData);
//         console.log(data);
//         toast.success("User Updated..");
//         navigate("/profile");
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setIsLoading(false);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="profile --my2">
//       {isLoading && <Loader/>}

//       {/* <Card cardClass={"card --flex-dir-column"}> */}
//         <span className="profile-photo">
//           <img src={user?.photo} alt="profilepic" />
//         </span>
//         <form className="form-control" onSubmit={saveProfile}>
//           <span className="profile-data">
//             <p>
//               <label>Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={profile?.name}
//                 onChange={handleInputChange}
//               />
//             </p>
//             <p>
//               <label>Email:</label>
//               <input type="text" name="email" value={profile?.email} disabled />
//               <br />
//               <code>Email cannot be changed.</code>
//             </p>
//             <p>
//               <label>Phone:</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={profile?.phone}
//                 onChange={handleInputChange}
//               />
//             </p>
//             <p>
//               <label>Bio:</label>
//               <textarea
//                 name="bio"
//                 value={profile?.bio}
//                 onChange={handleInputChange}
//                 cols="30"
//                 rows="10"
//               ></textarea>
//             </p>
//             <p>
//               <label>Photo:</label>
//               <input type="file" name="image" onChange={handleImageChange} />
//             </p>
//             <div>
//               <button className="--btn --btn-primary">Edit Profile</button>
//             </div>
//           </span>
//         </form>
//       {/* </Card> */}
//       <br />
//       < ChangePassword />
//     </div>
//   );
// };

// export default EditProfile;

import React, { useState } from "react";
import { toast } from "react-toastify";
// import { changePassword } from "../../services/authService";
 
// import Card from "../card/Card";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/authService";


const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error("New passwords do not match");
    }

    const formData = {
      oldPassword,
      password,
    };

    const data = await changePassword(formData);
    toast.success(data);
    navigate("/items");
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderradius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className=" md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-0 text-uppercase">Change Password</h2>
                   
                  </div>
                  <form onSubmit={changePass}>
                  <div className="form-outline form-white mb-4">
          <input
            type="password"
            placeholder="Old Password"
            required
            name="oldPassword"
            className="form-control form-control-lg"
            value={oldPassword}
            onChange={handleInputChange}
          />
           </div>
           <div className="form-outline form-white mb-4">
          <input
            type="password"
            placeholder="New Password"
            required
            name="password"
            className="form-control form-control-lg"
            value={password}
            onChange={handleInputChange}
          />
          </div>
          <div className="form-outline form-white mb-4">
          <input
            type="password"
            placeholder="Confirm New Password"
            required
            name="password2"
            className="form-control form-control-lg"
            value={password2}
            onChange={handleInputChange}
          />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Change Password
          </button>
        </form>
                  <div>
                    <p className="mb-0 text-white-50 fw-bold">
                      GrahakBhandar, Government Polytechnic, Nashik.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;