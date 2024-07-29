import React from "react";
import "./ProfilePage.css";
import { DashboardWrapper } from "../../components/DashboardWrapper/DashboardWrapper";
import { useSelector } from "react-redux";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const ProfilePage = () => {
  const { displayName, email, photoURL } = useSelector(
    (state) => state.auth.userInfo
  );
  return (
    <DashboardWrapper>
      <div className="profile-page">
        <div className="flex-center user-container">
          <div className="profile">
            <img src={photoURL} alt={displayName} />
          </div>
          <div className="details">
            <h4>{displayName}</h4>
            <p className="muted">{email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default ProfilePage;
