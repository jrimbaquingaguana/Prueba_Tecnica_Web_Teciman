import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRecordPage from "../pages/CreateRecordPage";
import RecordsPage from "../pages/RecordsPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateRecordPage />} />
        <Route path="/records" element={<RecordsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;