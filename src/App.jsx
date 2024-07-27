import {
  HomePage,
  LoginPage,
  NewMeetingPage,
  MeetingPage,
  ProfilePage,
  JoinPage,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppWrapper from "./config/AppWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";

export default function App() {
  const theme = useSelector((state) => state.auth.theme);
  return (
    <SkeletonTheme
      baseColor={`${theme === "light" ? "#FFFFF" : "#121316"} `}
      highlightColor={`${theme === "light" ? "#f5f5f5" : "#26282b"}`}
    >
      <BrowserRouter>
        <AppWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/new-meeting" element={<NewMeetingPage />} />
            <Route path="/meetings" element={<MeetingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/join/:id" element={<JoinPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AppWrapper>
        <ToastContainer />
      </BrowserRouter>
    </SkeletonTheme>
  );
}
