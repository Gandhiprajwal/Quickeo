import React from "react";
import "./NewMeetingPage.css";
import { DashboardWrapper } from "../../components/DashboardWrapper/DashboardWrapper";
import MeetingForm from "../../components/MeetingForm/MeetingForm";
import { useNavigate } from "react-router-dom";

export const NewMeetingPage = () => {
    const navigate = useNavigate();
  return (
    <DashboardWrapper>
      <div className="new-meeting-page">
        <MeetingForm 
        onClose={()=>navigate(-1)}
        onUploadComplete={()=>navigate(-1)}
        />
      </div>
    </DashboardWrapper>
  );
};
