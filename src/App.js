import './App.css';
import SideBar from "./components/SideBar/SideBar";
import FavoriteFact from "./pages/FavoriteFact/FavoriteFact";
import {Route, Routes, useLocation} from "react-router-dom";
import FactSearch from "./components/FactSearch/FactSearch";
import UpgradePlan from "./pages/UpgradePlan/UpgradePlan";
import History from "./pages/History/History";
import Settings from "./pages/Settings/Settings";
import GenerateLTDCode from "./pages/Dashboard/GenerateLTDCode/GenerateLTDCode";
import GenerateCouponCode from "./pages/Dashboard/GenerateCouponCode/GenerateCouponCode";
import DashboardSettings from './pages/Dashboard/Settings/Settings'
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ManageUsers from "./pages/Dashboard/ManageUsers/ManageUsers";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import {useEffect} from "react";
import {verifyJwt} from "./api/auth";
import PrivateRoute from "./featured/PrivateRoute/PrivateRoute";
function App() {
    const {pathname}=useLocation()
    console.log('location:',pathname);

  return (
      <>
          <div className="dashboard">
              {pathname.includes("dashboard") ?  <AdminDashboard/> : <SideBar/>}
              <div className={`${pathname.includes("dashboard") ? "pl-[100px]":"main-content"} w-full ` }>
                  <Routes>
                      <Route path="/" element={<PrivateRoute><FactSearch/></PrivateRoute>} />
                      <Route path="/dashboard/LTD" element={ <GenerateLTDCode/> } />
                      <Route path="/dashboard/GenerateCouponCode" element={ <GenerateCouponCode/> } />
                      <Route path="/dashboard/settings" element={<DashboardSettings/> } />
                      <Route path="/dashboard/manageUsers" element={ <ManageUsers/> } />
                      <Route path="/favorites" element={<PrivateRoute><FavoriteFact/></PrivateRoute> } />
                      <Route path={"/upgrade"} element={<PrivateRoute><UpgradePlan/></PrivateRoute>}/>
                      <Route path={"/settings"} element={<PrivateRoute><Settings/></PrivateRoute>}/>
                      <Route path={"/signIn"} element={<SignIn/>}/>
                      <Route path={"/signUp"} element={<SignUp/>}/>
                  </Routes>
              </div>
          </div>
      </>
  );
}

export default App;
