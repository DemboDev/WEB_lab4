import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { EquipmentListPage } from "./pages/EquipmentListPage";
import { AddEquipmentPage } from "./pages/AddEquipmentPage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<EquipmentListPage />} />
        <Route path="/add" element={<AddEquipmentPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
