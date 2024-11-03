import './App.css';
import SideBar from "./components/SideBar/SideBar";
import FavoriteFact from "./pages/FavoriteFact/FavoriteFact";
import {Route, Routes, useLocation} from "react-router-dom";
import FactSearch from "./components/FactSearch/FactSearch";
import UpgradePlan from "./pages/UpgradePlan/UpgradePlan";
import Settings from "./pages/Settings/Settings";
import GenerateLTDCode from "./pages/Dashboard/GenerateLTDCode/GenerateLTDCode";
import GenerateCouponCode from "./pages/Dashboard/GenerateCouponCode/GenerateCouponCode";
import DashboardSettings from './pages/Dashboard/Settings/Settings'
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ManageUsers from "./pages/Dashboard/ManageUsers/ManageUsers";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import PrivateRoute from "./featured/PrivateRoute/PrivateRoute";
import {UserProvider} from "./context/UserContext";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import {Elements, PaymentElement} from "@stripe/react-stripe-js";

import PaymentPage from "./pages/UpgradePlan/PaymentPage/PaymentPage";
import {loadStripe} from "@stripe/stripe-js";
const stripePromise = loadStripe('pk_test_51N5Q2gG7nspIT2aiGMQPYjnXZuocyjrbHdcgDOML86WQOz6g9kd2HpJJ7k5C4DxmICXKiUgLOB2frndaFVBpRkVA00m9f1OyXF');

const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
}
function App() {
    const {pathname}=useLocation()
  return (
      <UserProvider>
          <div className="dashboard">
              {pathname.includes("dashboard") ?  <AdminDashboard/> : <SideBar/>}
              <div className={`${pathname.includes("dashboard") ? "main-content dashboardContent":"main-content"} w-full ` }>
                 <Elements options={options} stripe={stripePromise}>
                  <Routes>
                      <Route path="/" element={<PrivateRoute><FactSearch/></PrivateRoute>} />
                      <Route path="/dashboard/LTD" element={<PrivateRoute><GenerateLTDCode/></PrivateRoute> } />
                      <Route path="/dashboard/GenerateCouponCode" element={<PrivateRoute><GenerateCouponCode/></PrivateRoute> } />
                      <Route path="/dashboard/settings" element={<PrivateRoute><DashboardSettings/></PrivateRoute> } />
                      <Route path="/dashboard/manageUsers" element={<PrivateRoute><ManageUsers/></PrivateRoute> } />
                      <Route path="/favorites" element={<PrivateRoute><FavoriteFact/></PrivateRoute> } />
                      <Route path={"/upgrade"} element={<PrivateRoute><UpgradePlan/></PrivateRoute>}/>
                      <Route path={"/upgrade/pay/:id"} element={<PrivateRoute><PaymentPage/></PrivateRoute>}/>
                      <Route path={"/settings"} element={<PrivateRoute><Settings/></PrivateRoute>}/>
                      <Route path={"/signIn"} element={<SignIn/>}/>
                      <Route path={"/signUp"} element={<SignUp/>}/>
                      <Route path={"/forgot-password"} element={<ForgotPassword/>}/>
                      <Route path={"/reset-password/:token"} element={<ResetPassword/>}/>
                  </Routes>
                 </Elements>
              </div>
          </div>
      </UserProvider>
  );
}

export default App;
