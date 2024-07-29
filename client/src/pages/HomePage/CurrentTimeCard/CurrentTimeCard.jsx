import { useSelector } from "react-redux";
import "./CurrentTimeCard.css";
import React from "react";
import {useTime} from "../../../components/hooks/useTime.jsx";

const CurrentTimeCard = () => {
  const { displayName } = useSelector((state) => state.auth.userInfo) || {};
  const { time,date } = useTime();
  return (
    <div className="current-time-card">
      <h1>
        Hi,{" "}
        <span className="g-text">
          {displayName ? displayName.split(" ")[0] : ""}
        </span>
        <div className="card">
          <h1 className="time">{time}</h1>
          <p>{date}</p>
        </div>
      </h1>
    </div>
  );
};

export default CurrentTimeCard;
