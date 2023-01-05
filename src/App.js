import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FirstPage from "./pages/FirstPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import './App.css'
import EchangeComponent from "./component/EchangeComponent";
import DashboardComponent from "./component/DashboardComponent";
import HistoriqueComponent from "./component/HistoriqueComponent";
import ContactComponent from "./component/ContactComponent";
import PartagerComponent from "./component/PartagerComponent";
import ServiceComponent from "./component/ServiceComponent";
import RechargeComponent from "./component/RechargeComponent";
import ProfileComponent from "./component/ProfileComponent";
import authService from "./services/authService";
import authHeader from './services/auth-header'
import AdminDashboard from "./pages/Admin/AdminDashboardPage";

function App(props) {
  
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if(currentUser) authHeader(currentUser.accessToken)
  }, [])
  return (
    <div>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<DashboardComponent />} />
          <Route path="profile" element={<ProfileComponent />} />
          <Route path="echange" element={<EchangeComponent />} />
          <Route path="recharge" element={<RechargeComponent />}/>
          <Route path="historique" element={<HistoriqueComponent />} />
          <Route path="contact" element={<ContactComponent />} />
          <Route path="partager" element={<PartagerComponent />} />
          <Route path="service" element={<ServiceComponent />}/>
        </Route>
       
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
