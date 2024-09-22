import react, { memo, Suspense } from "react";
import { ThreeCircles } from "react-loader-spinner";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Pages/Home";

import UserList from "./Pages/User/UserList";
import ResellerUserList from "./Pages/User/ResellerUserList";

import Login from "./Pages/Auth/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notes from "./Pages/User/Notes";


import PageNotFound from "./Pages/PageNotFound";
import VoiceBroadcast from "./Pages/User/VoiceBroadCast";
import SendWhatsapp from "./Pages/Reseller/SendWhatsapp";
import ContactGroup from "./Pages/Reseller/ContactGroup";
import CampaignReport from "./Pages/Reseller/CampaignReport";
import TransactionLog from "./Pages/Reseller/TransactionLog";
import Support from "./Pages/Reseller/Support";
import Admindashboard from "./Pages/Admin/Admindashboard";
import AdminCampaignReport from "./Pages/Admin/AdminCampaignReport";
import AdminNotes from "./Pages/Admin/AdminNotes";
import WebsiteOnOff from "./Pages/Admin/WebsiteOnOff";
import AdminUserList from "./Pages/Admin/AdminUserList";
import AdminResellerList from "./Pages/Admin/AdminResellerList";
import WhiteList from "./Pages/Admin/WhiteList";
import changePassword from "./Components/changePassword";

import Profile from "./Pages/Profile";
import ChangePassword from "./Components/changePassword";
import AdminSupport from "./Pages/Admin/AdminSupport";
import UserTransactionLog from "./Pages/Reseller/UserTransaction";
// import Notes from './Pages/User/Notes';
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>, 
    },
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/user-list",
      element: <UserList />,
    },
    {
      path: "/notes",
      element: <Notes />,
    },
    {
      path: "/voice_broadcast",
      element: <VoiceBroadcast />,
    },
    {
      path: "/send-voice-msg",
      element: <SendWhatsapp />,
    },
    {
      path: "/contact-group",
      element: <ContactGroup />,
    },
    {
      path: "/campaign-report",
      element: <CampaignReport />,
    },
    {
      path: "/transaction-log",
      element: <TransactionLog />,
    },
    {
      path: "/support",
      element: <Support />,
    },
    {
      path: "/admin-dashboard",
      element: <Admindashboard />,
    },
    {
      path: "/admin-campaign-report",
      element: <AdminCampaignReport />,
    },
    {
      path: "/admin_notes",
      element: <AdminNotes />,
    },
    {
      path: "/website-on-off",
      element: <WebsiteOnOff />,
    },
    {
      path: "/admin_user_list",
      element: <AdminUserList />,
    },
    {
      path: "/admin_reseller_list",
      element: <AdminResellerList />,
    },{
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/white-list",
      element:<WhiteList/>
    },

    {
      path:"/reseller-user-list",
      element:<ResellerUserList/>
    },{
      path:"/change-password",
      element:<ChangePassword/>
    },{
      path:"/adminsupport",
      element:<AdminSupport/>
    }

    ,{
      path:"/page-not-found",
      element:<PageNotFound/>
    },{
      path:"/user-transactionLog",
      element:<UserTransactionLog/>
    }

    

    
    
  ]);
  return (
    <>
      {/* <Suspense fallback={<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ThreeCircles
        height="80"
        width="80"
        radius="9"
        color='black'
        ariaLabel='three-dots-loading'
        wrapperStyle
        wrapperClass
      /></div>}> */}
      <ToastContainer />
      <RouterProvider router={router} />
      {/* </Suspense> */}
    </>
  );
};

export default memo(App);
