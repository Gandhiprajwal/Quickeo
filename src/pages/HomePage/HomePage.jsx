import React from "react";
import "./HomePage.css";
import { DashboardWrapper } from "../../components/DashboardWrapper/DashboardWrapper";
import CurrentTimeCard from "./CurrentTimeCard/CurrentTimeCard";
import NavigationButtons from "../../components/NavigationButtons/NavigationButtons";
import MeetingsList from "./MeetingsList/MeetingsList.jsx";

export const HomePage = () => {
  return (
    <DashboardWrapper>
      <div className="homepage">
        <div className="column left">
          <CurrentTimeCard />
          <NavigationButtons />
        </div>
        <div className="column right">
          <MeetingsList />
        </div>
      </div>
    </DashboardWrapper>
  );
};
