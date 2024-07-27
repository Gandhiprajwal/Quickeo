import React from "react";
import "./NoMeetingPlaceholder.css";
import { Link } from "react-router-dom";

const NoMeetingPlaceholder = () => {
  return (
    <div className="no-meeting-placeholder">
      <p>You don't have any meeting</p>
      <Link to={"/new-meeting"} className="btn primary">
        Create Meeting
      </Link>
    </div>
  );
};

export default NoMeetingPlaceholder;
