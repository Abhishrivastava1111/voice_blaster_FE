import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Components/Header";
import Dashboard from "../../Components/Dashboard";
import Sidebar from "../../Components/Sidebar";
const AdminDashboard = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  useEffect(() => {
    const theme=localStorage.getItem("theme");
    document.body.className=theme;
    let token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    getAllNotes();
  }, []);
  const [notes, setNotes] = useState([]);

  const getAllNotes = () => {
    let token2 = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getAllNotes`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            version: "1.0.0",
            "x-access-token": token2,
          },
        }
      )
      .then(function (response) {
        if (response.data.success === false) {
          // toast.error(response.data.message);

          if (response.data?.error_code === 461) {
            navigate("/login");
          }
        } else {
          // toast.success(response.data.message);
          // console.log(response.data.message);
          // localStorage.setItem("user",response.data.data);
          // localStorage.setItem("token", response.data.data.token);

          setNotes(response.data.data);
          console.log("response.data.data", response.data.data);
          // navigate("/")
        }
      })
      .catch(function (error) {
        // toast.error(error);
      });
  };


  const [campaignreport, setCampaignReport] = useState([]);


  useEffect(() => {
    getAllSendMessage();
  }, []);

  const getAllSendMessage = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getAllSendMessage`,
        {},
        {
          headers: {
            "x-access-token": `${token}`,
            "Content-Type": "Application/json",
            version: "1.0.0",
          },
        }
      )
      .then((response) => {
        if (response.data.success == false) {
          // toast.error(response.data.message);
        } else {
          setCampaignReport(response.data.data);
          console.log(response.data.data);
          // console.log(response.data.data);
          // toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        {/********************
  Preloader start
    *********************/}
        {/* <div id="preloader">
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  </div> */}
        {/********************
  Preloader end
    *********************/}
        {/***********************************
  Main wrapper start
    ************************************/}
        <div id="main-wrapper">
          {/***********************************
      Nav header start
  ************************************/}
          <Header />
          {/***********************************
      Header end ti-comment-alt
  ************************************/}
          {/***********************************
      Sidebar start
  ************************************/}
          <Sidebar />
          {/***********************************
      Sidebar end
  ************************************/}
          {/***********************************
      Content body start
  ************************************/}
          <div className="content-body">
            <Dashboard />

            {/* <div
              className="container-fluid"
              style={{ backgroundColor: "#0d99ff" }}
            >
              <marquee direction="left">
                {notes.length > 0 &&
                  notes.map((item, index) => (
                    <a
                      style={{
                        padding: 5,
                        color: "#fff",
                        // fontWeight: "bolder",
                        fontSize: "15px",
                      }}
                    >
                      {item.title} |{" "}
                    </a>
                  ))}
              </marquee>
            </div> */}

          </div>

          {/* <div className="footer">
      <div className="copyright">
        <p>Copyright © Developed by <a href="https://dexignzone.com/" target="_blank">DexignZone</a> 2023</p>
      </div>
    </div> */}
          {/***********************************
      Footer end
  ************************************/}
          {/***********************************
     Support ticket button start
  ************************************/}
          {/***********************************
     Support ticket button end
  ************************************/}
        </div>
      </div>
    </>
  );
};

export default memo(AdminDashboard);
