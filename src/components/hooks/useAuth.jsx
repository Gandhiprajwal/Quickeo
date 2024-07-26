import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../config/firebase-config";
import { setUser } from "../../redux/authSlice";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (activeUser) => {
      if (!activeUser) navigate("/login");
      else {
        const { uid, email, displayName, photoURL, accessToken } = activeUser;
        dispatch(
          setUser({
            uid,
            email,
            displayName,
            photoURL,
            accessToken,
          })
        );
      }
    });
    return ()=> unsubscribe();
  }, [dispatch, navigate.onAuthStateChanged]);
  return <div>useAuth</div>;
};

export default useAuth;
