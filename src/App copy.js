
import react,{memo,Suspense,useEffect} from 'react';
import { ThreeCircles } from 'react-loader-spinner'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Pages/Home'

import UserList from './Pages/User/UserList'



import Login from './Pages/Auth/Login'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notes from './Pages/User/Notes';
import VoiceBroadcast from './Pages/User/VoiceBroadCast';
import SendWhatsapp from './Pages/Reseller/SendWhatsapp';
import ContactGroup from './Pages/Reseller/ContactGroup';
import CampaignReport from './Pages/Reseller/CampaignReport';
import TransactionLog from './Pages/Reseller/TransactionLog';
import Support from './Pages/Reseller/Support';
import Admindashboard from './Pages/Admin/Admindashboard';
import AdminCampaignReport from './Pages/Admin/AdminCampaignReport';
import AdminNotes from './Pages/Admin/AdminNotes';
import WebsiteOnOff from './Pages/Admin/WebsiteOnOff';
import AdminUserList from './Pages/Admin/AdminUserList';
import AdminResellerList from './Pages/Admin/AdminResellerList';
// import Notes from './Pages/User/Notes';
const App=()=> {
  // useEffect(() => window.location.hash = '', []);
  const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/user-list",
        element:<UserList/>
      },{
        path:"/notes",
        element:<Notes/>

      },{
        path:"/voice_broadcast",
        element:<VoiceBroadcast/>
      },{
        path:"/send_whatsapp",
        element:<SendWhatsapp/>
      },{
        path:"/contact_group",
        element:<ContactGroup/>
      },{
        path:"/campaign_report",
        element:<CampaignReport/>
      },{
        path:"/transaction_log",
        element:<TransactionLog/>
      },{
        path:"/support",
        element:<Support/>
      },{
        path:"/admin_dashboard",
        element:<Admindashboard/>
      },{
        path:"/admin_campaign_report",
        element:<AdminCampaignReport/>
      },{
        path:"/admin_notes",
        element:<AdminNotes/>
      },{
        path:"/website_on_off",
        element:<WebsiteOnOff/>
      },{
        path:"/admin_user_list",
        element:<AdminUserList/>
      },{
        path:"/admin_reseller_list",
        element:<AdminResellerList/>
      }
    ]);
  return (
<>

<Suspense fallback={<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <ThreeCircles
        height="80"
        width="80"
        radius="9"
        color='black'
        ariaLabel='three-dots-loading'
        wrapperStyle
        wrapperClass
      /></div>}>
<ToastContainer/>
<RouterProvider router={router}/>
</Suspense>
</>
 
  );
}

export default memo(App);
