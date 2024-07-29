import React, { useEffect, useState } from "react";
import "./MeetingPage.css";
import { DashboardWrapper } from "../../components/DashboardWrapper/DashboardWrapper";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import MeetingCard from "../../components/MeetingCard/MeetingCard";
import MeetingForm from "../../components/MeetingForm/MeetingForm";
import Skeleton from "react-loading-skeleton";
import NoMeetingPlaceholder from "../../components/NoMeetingPlaceholder/NoMeetingPlaceholder";

export const MeetingPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [loader, setLoader] = useState(false);
  const [preload, setPreload] = useState(null);
  const [viewEditForm, setViewEditForm] = useState(false);
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
    <DashboardWrapper>
      {viewEditForm ? (
        <div className="overlay form-overlay">
          <MeetingForm
            mode={"edit"}
            preload={preload}
            onClose={() => {
              setViewEditForm(!viewEditForm);
              setPreload(null);
            }}
            onUploadComplete={() => {
              setViewEditForm(!viewEditForm);
              setPreload(null);
              getMeetings();
            }}
          />
        </div>
      ) : (
        ""
      )}
      <div className="meetings-page">
        {loader && !meetings.length ? (
          <Skeleton
            height={100}
            borderRadius={10}
            count={4}
            style={{ marginBottom: 10 }}
          />
        ) : (
          meetings.map((meeting, index) => (
            <MeetingCard
              showEditButton={true}
              key={index}
              {...meeting}
              onEditClick={(meetingData) => {
                setPreload(meetingData);
                setViewEditForm(!viewEditForm);
              }}
            />
          ))
        )}
        {!loader && meetings && !meetings.length && <NoMeetingPlaceholder />}
      </div>
    </DashboardWrapper>
  );
};
