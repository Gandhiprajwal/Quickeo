import NavigationButtons from "./components/NavigationButtons/NavigationButtons";
import { HomePage, LoginPage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppWrapper from "./config/AppWrapper";

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}
