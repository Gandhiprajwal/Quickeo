import React, { useState, useEffect } from "react";
import "./MeetingsList.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import MeetingCard from "../../../components/MeetingCard/MeetingCard";
import { Link } from "react-router-dom";
import NoMeetingPlaceholder from "../../../components/NoMeetingPlaceholder/NoMeetingPlaceholder";

const MeetingsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loader, setLoader] = useState(false);
  const { accessToken } = useSelector((state) => state.auth.userInfo) || {};
  const getMeetings = async () => {
    setLoader(true);
    setMeetings([]);
    await axios
      .get(process.env.REACT_APP_API_BASE_URL + "/my-meetings", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setLoader(false);
        // console.log(res.data);
        const { status, message } = res.data;
        if (status === "success") {
          setMeetings(message);
        }
      })
      .catch((err) => {
        setLoader(false);
        toast.error("Something went wrong", { position: "top-right" });
      });
  };
  useEffect(() => {
    if (accessToken) {
      getMeetings();
    }
  }, [accessToken]);
  return (
    <div className="meetings-list">
      <h2 className="main-title">Meetings List</h2>
      {loader ? (
        <Skeleton
          count={4}
          height={100}
          borderRadius={10}
          style={{ marginBottom: 10 }}
        />
      ) : (
        ""
      )}
      {meetings &&
        meetings.map((meeting, index) =>
          index < 3 ? <MeetingCard {...meeting} key={index} /> : ""
        )}
      {meetings && meetings.length > 3 ? (
        <Link to={"/meetings"} className="btn primary">
          View all meetings
        </Link>
      ) : (
        ""
      )}
      {!loader && meetings && !meetings.length && <NoMeetingPlaceholder />}
    </div>
  );
};

export default MeetingsList;
