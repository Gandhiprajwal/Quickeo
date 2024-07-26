import React, { useEffect } from "react";
import "./LoginPage.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useTime } from "../../components/hooks/useTime.jsx";
import user1 from "../../assets/user-1.jpeg";
import user2 from "../../assets/user-2.jpeg";
import user3 from "../../assets/user-3.jpeg";
import user4 from "../../assets/user-4.jpeg";
import user5 from "../../assets/user-5.jpeg";
import { FcGoogle } from "react-icons/fc";
import NavigationButtons from "../../components/NavigationButtons/NavigationButtons.jsx";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../../config/firebase-config.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice.jsx";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { time, date } = useTime();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (activeUser) => {
      if (activeUser) navigate("/");
    });
  }, []);

  const loginWithGoogle = async () => {
    // Firebase
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName, email, photoURL, accessToken },
    } = await signInWithPopup(firebaseAuth, provider);
    if (accessToken) {
      dispatch(
        setUser({
          uid,
          displayName,
          email,
          photoURL,
          accessToken,
        })
      );
      navigate("/");
    }
  };
  return (
    <div className="login-page">
      <Navbar />
      <div className="flex flex-center login-form">
        <div className="column link-card">
          <NavigationButtons />
        </div>
        <div className="column flex-center login-form-details">
          <div className="top">
            <h1 className="time g-text">{time}</h1>
            <p className="muted">{date}</p>
          </div>
          <div className="middle">
            <h2>Collaborate with Teams</h2>
            <div className="flex-center users-container">
              <div className="profile">
                <img src={user1} alt="" />
              </div>
              <div className="profile">
                <img src={user2} alt="" />
              </div>
              <div className="profile">
                <img src={user3} alt="" />
              </div>
              <div className="profile">
                <img src={user4} alt="" />
              </div>
              <div className="profile">
                <img src={user5} alt="" />
              </div>
            </div>
            <h3 className="g-text">Via Voom Meeting</h3>
          </div>
          <div className="bottom">
            <button
              className="flex-center btn primary"
              onClick={loginWithGoogle}
            >
              <FcGoogle />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
