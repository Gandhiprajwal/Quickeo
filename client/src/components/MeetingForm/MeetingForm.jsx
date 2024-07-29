import React, { useEffect, useState } from "react";
import "./MeetingForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MeetingForm = ({ mode, onClose, onUploadComplete, preload }) => {
  //  solve the accessToken null error
  const userInfo = useSelector((state) => state.auth.userInfo) || {};
  const accessToken = userInfo?.accessToken;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    title: "",
    date: "",
    time: "",
  });
  useEffect(() => {
    if (preload) {
      setData(preload);
    }
  }, [preload]);
  const submitMeeting = async () => {
    let apiPath = process.env.REACT_APP_API_BASE_URL + "/create-meeting";
    if (mode === "edit") {
      apiPath =
        process.env.REACT_APP_API_BASE_URL + "/edit-meeting/" + data._id;
    }
    if (accessToken) {
      setLoader(true);
      console.log(process.env.REACT_APP_API_BASE_URL);
      axios
        .post(apiPath, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setLoader(false);
          const { status, message } = res.data;
          if (status === "success") {
            toast.success("Meeting created successfully", {
              position: "top-right",
            });
            return onUploadComplete();
          }
          toast.error(message, {
            position: "top-right",
          });
        })
        .catch((err) => {
          setLoader(false);
        });
    }
  };
  return (
    <div className="create-meeting-form">
      <div className="top">
        <h1 className="title">
          {mode === "edit" ? "Edit Meeting" : "Create Meeting"}
        </h1>
      </div>
      <div className="middle">
        <div className="control-container">
          <label htmlFor="title">Meeting Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Meeting Title"
            className="control"
            value={data.title}
            onChange={(event) =>
              setData({ ...data, title: event.target.value })
            }
          />
        </div>
        <div className="flex row">
          <div className="control-container">
            <label htmlFor="date">Date</label>
            <DatePicker
              selected={data.date}
              minDate={new Date()}
              onChange={(dateValue) => setData({ ...data, date: dateValue })}
              placeholderText="Select a date"
              wrapperClassName="control"
            />
          </div>
          <div className="control-container">
            <label htmlFor="time">Time</label>
            <DatePicker
              selected={data.time}
              onChange={(timeValue) => setData({ ...data, time: timeValue })}
              placeholderText="Select a time"
              showTimeSelectOnly
              showTimeSelect
              timeIntervals={30}
              timeCaption="'Time"
              date={"h:mm aa"}
              wrapperClassName="control"
            />
          </div>
        </div>
      </div>
      <div className="flex-center bottom">
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
        <button className="btn primary" onClick={submitMeeting}>
          {loader
            ? "Please wait..."
            : mode === "edit"
            ? "Edit Meeting"
            : "Create Meeting"}
        </button>
      </div>
    </div>
  );
};

export default MeetingForm;
