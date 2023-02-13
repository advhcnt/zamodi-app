import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FirstPage from "./pages/FirstPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import EchangeComponent from "./component/EchangeComponent";
import DashboardComponent from "./component/DashboardComponent";
import HistoriqueComponent from "./component/HistoriqueComponent";
import ContactComponent from "./component/ContactComponent";
import PartagerComponent from "./component/PartagerComponent";
import ServiceComponent from "./component/ServiceComponent";
import RechargeComponent from "./component/RechargeComponent";
import ProfileComponent from "./component/ProfileComponent";
import authService from "./services/authService";
import authHeader from "./services/auth-header";
import AdminDashboard from "./pages/Admin/AdminDashboardPage";
import HomeAdmin from "./component/Admin/HomeAdmin";
import Historique from "./component/Admin/Historique";
import Tickets from "./component/Admin/Tickets";
import Recharge from "./component/Admin/Recharge";
import Echange from "./component/Admin/Echange";
import Avis from "./component/Admin/Avis";
import { Error404 } from "./pages/errors/Error404";
import { NotificationsPage } from "./pages/NotificationsPage";
import RegisterAdmin from "./component/Admin/RegisterAdmin";
import DetailsNotificationClient from "./pages/DetailsNotificationClient";
// Import Swiper styles
import 'swiper/css';


function App(props) {
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) authHeader(currentUser.accessToken);
  }, []);
  return (
    <div>
      {/* google auth token 164454011985-g4tmud0sacpen1sogb30rn6tfs569c2s.apps.googleusercontent.com */}
      {/* FACEBOOK ID 717531253056662 */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<HomeAdmin />} />
          <Route path="historique" element={<Historique />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="contact" element={<Tickets />} />
          <Route path="operations" element={<Echange />} />
          <Route path="profile" element={<ProfileComponent />} />
          <Route path="avis" element={<Avis />} />
          <Route path="register-admin" element={<RegisterAdmin />} />

        </Route>
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<DashboardComponent />} />
          <Route path="profile" element={<ProfileComponent />} />
          <Route path="echange" element={<EchangeComponent />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="details/:identifiant" element={<DetailsNotificationClient />} />
          <Route path="recharge" element={<RechargeComponent />} />
          <Route path="historique" element={<HistoriqueComponent />} />
          <Route path="contact" element={<ContactComponent />} />
          <Route path="partager" element={<PartagerComponent />} />
          <Route path="service" element={<ServiceComponent />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
