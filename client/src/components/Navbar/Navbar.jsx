import React, { useState } from "react";
import "./Navbar.css";
import { LuSearch } from "react-icons/lu";
import profilePlaceholder from "../../assets/profile-placeholder.png";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton/LogoutButton";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = ({ onMenuClick }) => {
  const [showProfileBar, setShowProfileBar] = useState(false);
  const {displayName, photoURL, email} =
    useSelector((state) => state.auth.userInfo) || {};
  return (
    <>
      <nav className="flex-center navbar">
        <div className="column">
          <div className="flex-center search-container">
            <div className="flex-center icon-wrapper">
              <LuSearch />
            </div>
            <input type="text" placeholder="Search for meetings"/>
          </div>
        </div>
        <div className="column">
          <div
            className="profile"
            onClick={() => setShowProfileBar(!showProfileBar)}
          >
            {photoURL ? (
              <img src={photoURL} alt="" />
            ) : (
              <img src={profilePlaceholder} alt="User placeholder" />
            )}
            {/* <img src={profilePlaceholder} alt="" /> */}
          </div>
          <div
            className="flex-center icon-wrapper menu-btn"
            onClick={onMenuClick}
          >
            <TiThMenu />
          </div>
        </div>
      </nav>
      {/* User profile bar */}
      {showProfileBar ? (
        <div
          className="overlay profile-bar-overlay"
          onClick={() => setShowProfileBar(!showProfileBar)}
        ></div>
      ) : (
        ""
      )}
      <div className={`nav-profile-bar ${showProfileBar ? "active" : ""}`}>
        <div className="flex-center user-container">
          <div className="profile">
            {photoURL ? (
              <img src={photoURL} alt="" />
            ) : (
              <img src={profilePlaceholder} alt="User placeholder" />
            )}
            {/* <img src={profilePlaceholder} alt="" /> */}
          </div>
          <div className="details">
            <h4 className="name">{displayName}</h4>
            <p className="muted email">{email}</p>
          </div>
        </div>
        <div className="flex-center theme-row">
          <p className="muted">Dark Theme</p>
          <ThemeToggle />
        </div>
        <div className="flex-center buttons-wrapper">
          {
            !email ?(
              <><Link to={"/login"} className="btn">
            Sign In
          </Link>
          <Link to={"/signup"} className="btn primary">
            Sign Up
          </Link></>
            ):
            <LogoutButton/>
          }
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
