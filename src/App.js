import './App.css';
import SideBar from "./components/SideBar/SideBar";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import PrivateRoute from "./featured/PrivateRoute/PrivateRoute";
import PublicRoute from "./featured/PublicRoute/PublicRoute";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import FactSearch from "./components/FactSearch/FactSearch";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import GenerateLTDCode from "./pages/Dashboard/GenerateLTDCode/GenerateLTDCode";
import GenerateCouponCode from "./pages/Dashboard/GenerateCouponCode/GenerateCouponCode";
import DashboardSettings from './pages/Dashboard/Settings/Settings';
import ManageUsers from "./pages/Dashboard/ManageUsers/ManageUsers";
import FavoriteFact from "./pages/FavoriteFact/FavoriteFact";
import UpgradePlan from "./pages/UpgradePlan/UpgradePlan";
import Settings from "./pages/Settings/Settings";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import CheckLTDCode from "./pages/Dashboard/CheckLTDCode/CheckLTDCode";

function App() {
    const { pathname } = useLocation();
    return (
        <UserProvider>
            <div className="dashboard">
                { pathname.includes("dashboard") ?  (
                    <AdminDashboard />
                ) : (
                    <SideBar />
                )}
                <div className={`${pathname.includes("dashboard") ? "main-content dashboardContent" : "main-content"} w-full`}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/signIn" element={<PublicRoute><SignIn /></PublicRoute>} />
                        <Route path="/signUp" element={<PublicRoute><SignUp /></PublicRoute>} />
                        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                        <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />

                        {/* Private Routes for all authenticated users */}
                        <Route path="/" element={<PrivateRoute><FactSearch /></PrivateRoute>} />
                        <Route path="/favorites" element={<PrivateRoute><FavoriteFact /></PrivateRoute>} />
                        <Route path="/upgrade" element={<PrivateRoute><UpgradePlan /></PrivateRoute>} />
                        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

                        {/* Admin-only Routes */}
                        <Route path="/dashboard/LTD" element={<PrivateRoute role="admin"><GenerateLTDCode /></PrivateRoute>} />
                        <Route path="/dashboard/GenerateCouponCode" element={<PrivateRoute role="admin"><GenerateCouponCode /></PrivateRoute>} />
                        <Route path="/dashboard/settings" element={<PrivateRoute role="admin"><DashboardSettings /></PrivateRoute>} />
                        <Route path="/dashboard/manageUsers" element={<PrivateRoute role="admin"><ManageUsers /></PrivateRoute>} />
                        <Route path="/dashboard/checkCode" element={<PrivateRoute role="admin"><CheckLTDCode /></PrivateRoute>} />

                    </Routes>
                </div>
            </div>
        </UserProvider>
    );
}

export default App;
