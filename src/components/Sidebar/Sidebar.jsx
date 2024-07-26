import React from "react";
import "./Sidebar.css";
import { BiLogoDiscourse } from "react-icons/bi";
import { sidebar } from "../../data";
import { Link, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const Sidebar = ({ show, onClose }) => {
  const { pathname } = useLocation();
  return (
    <>
      {show ? (
        <div className="overlay sidebar-overlay" onClick={onClose}></div>
      ) : (
        ""
      )}
      <aside className={`flex sidebar ${show?'show':''}`}>
        <div className="flex sidebar-wrapper">
          <div className="flex-center top">
            <div className="flex-center logo">
              <div className="flex-center primary">
                <BiLogoDiscourse />
              </div>
              <span className="g-text">voom</span>
            </div>
            <div className="flex-center icon-wrapper cancel-btn" onClick={onClose}>
              <FaTimes />
            </div>
          </div>
          <div className="middle">
            {sidebar.map((list, index) => (
              <Link
                to={list.route}
                className={`flex-center tab ${
                  list.activeRoutes.includes(pathname) ? "active" : ""
                }`}
                key={index}
              >
                {list.icon}
                {list.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
