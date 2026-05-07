import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Kitchen from "./pages/Kitchen";
import Inventory from "./pages/Inventory";
import Tables from "./pages/Tables";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />


        <Route element={<Layout pageTitle="Quản Lý Hệ Thống" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />

          <Route path="/orders" element={<Tables />} />
        </Route>


        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
