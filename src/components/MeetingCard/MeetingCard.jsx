import React from "react";
import "./MeetingCard.css";
import moment from "moment";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import user1 from "../../assets/user-1.jpeg";
import user2 from "../../assets/user-2.jpeg";
import user3 from "../../assets/user-3.jpeg";
import user4 from "../../assets/user-4.jpeg";
import user5 from "../../assets/user-5.jpeg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MeetingCard = (props) => {
  const { title, date, time, meetingId, onEditClick, showEditButton } = props;
  const meetingDate = moment(date).format("YYYY-MM-DD");
  const meetingLink = window.location.origin + "/join/" + meetingId;

  return (
    <div className="meeting-card">
      <div className="flex top">
        <div>
          <h3 className="title">{title}</h3>
          <p className="muted">{moment(date).format("DD MMMM, YYYY")}</p>
          <h4>{moment(time).format("h:mm a")}</h4>
        </div>
        <div className="flex-center buttons-wrapper">
          <button
            className="flex-center icon-wrapper"
            onClick={() => {
              navigator.clipboard.writeText(
                `${title}
                ${"Date:" + moment(date).format("DD MMMM, YYYY")}
                ${"Time:" + moment(time).format("h:mm a")}
                ${"Link:" + meetingLink}
                `
              );
              toast.success("Copied Successfully!", { position: "top-right" });
            }}
          >
            <HiOutlineClipboardCopy />
          </button>
          {showEditButton && (
            <button
              className="flex-center icon-wrapper"
              onClick={() =>
                onEditClick({
                  ...props,
                  date: new Date(date),
                  time: new Date(time),
                })
              }
            >
              <FiEdit />
            </button>
          )}
        </div>
      </div>
      <div className="flex-center bottom">
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
        {meetingDate === moment().format("YYYY-MM-DD") ? (
          <Link to={meetingLink} className="btn primary" target="_blank">
            Join
          </Link>
        ) : moment(meetingDate).isBefore(moment().format("YYYY-MM-DD")) ? (
          <Link to={""} className="btn">
            Ended
          </Link>
        ) : moment(meetingDate).isAfter(moment().format("YYYY-MM-DD")) ? (
          <Link to={""} className="btn">
            Upcoming
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
