import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { toast } from "react-toastify";


const Support = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setpriority] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  useEffect(()=>{
    const theme=localStorage.getItem("theme");
    document.body.className=theme;
  },[])

  const AddSupport = () => {
    // console.log("i clicked");
    const token = localStorage.getItem("token");
    const obj = {
      subject: subject,
      message: message,
      priority: priority
    }
    axios.post(`${BASE_URL}admin/addSupport`, obj, {
      headers: {
        "Content-Type": "Application/json",
        "version": "1.0.0",
        "x-access-token": `${token}`
      }
    }).then((response) => {
      if (response.data.success == false) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setMessage("");
        setSubject("");
        setpriority("");
      }
    }).catch((error) => {
      console.log(error);
    })


  }








  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />
        <div className="">
        <div className="content-body main-body ">
        <div className="page-titles  ">
        <ol className="breadcrumb">
          <li><h5 className="bc-title">Support</h5></li>
          <li className="breadcrumb-item"><a href="javascript:void(0)">
              <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.125 6.375L8.5 1.41667L14.875 6.375V14.1667C14.875 14.5424 14.7257 14.9027 14.4601 15.1684C14.1944 15.4341 13.8341 15.5833 13.4583 15.5833H3.54167C3.16594 15.5833 2.80561 15.4341 2.53993 15.1684C2.27426 14.9027 2.125 14.5424 2.125 14.1667V6.375Z" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.375 15.5833V8.5H10.625V15.5833" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Home </a>
          </li>
          <li className="breadcrumb-item active"><a href="javascript:void(0)">Support:-</a></li>
        </ol>
        {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
      </div>
      <div style={{padding:"30px"}}>
      <div className="card">
              <div className="card-header p-3"><h6>support:-</h6></div>
              <div className="card-body">
              <div className="">
                <div className="row">
                  <div className="col">
                    <label className="mt-3"> Subject</label>
                    <input type="text" className="form-control inputType"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="mt-3"> Priority</label>

                    <select className="form-control inputType"
                    name="priority"
                    value={priority}
                    onChange={(e) => setpriority(e.target.value)}
                    >
                      <option value="select">--select--</option>
                      <option value="High">Hight</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                    </select>
                    {/* <input type="text" className="form-control mt-2"
                      name="priority"
                      value={priority}
                      onChange={(e) => setpriority(e.target.value)}
                    /> */}
                  </div>

                </div>

                <div className="row">
                  <div className="col">
                    <label className="mt-3"> Message</label>
                    {/* <input type="text"/> */}
                    <textarea rows={3} cols={4} className="form-control mt-2 inputType"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                </div>
                <div className="row">
                  <div className="col text-center">
                    <button type="button" className="btn btn-primary mt-3" onClick={() => AddSupport()}>Submit</button>
                  </div>

                </div>

              </div>
              </div>
            </div>
      </div>
        


       
        </div>
        </div>
        {/* <div className="footer">
          <div className="copyright">
            <p>
              Copyright © Developed by{" "}
              <a href="https://dexignzone.com/" target="_blank">
                DexignZone
              </a>{" "}
              2023
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Support;
