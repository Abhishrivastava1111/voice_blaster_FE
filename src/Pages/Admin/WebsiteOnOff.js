import axios from "axios";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WebsiteOnOff = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const initialState = {
    name: "",
    email: "",
    favicon_icon: "",
    logo: "",
    phone_no: "",
    title: "",
    description: "",
    status: "Active",
  };

  const [webSiteInfo, setWebSiteInfo] = useState(initialState);

  const [logo, setLogo] = useState(undefined);

  const [id, setId] = useState("");

  const [faviconIcon, setFaviconIcon] = useState(undefined);

  const handleChange = (e) => {
    setWebSiteInfo({ ...webSiteInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getWebsiteInfo();
    const theme=localStorage.getItem("theme");
    document.body.className=theme;
  }, []);
  const getWebsiteInfo = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}admin/getWebsiteInfo`, {
        headers: {
          "x-access-token": `${token}`,
          version: "1.0.0",
          "Content-Type": "Application/json",
        },
      })
      .then((response) => {
        if (response.data.data == false) {
          // toast.error(response.data.message);
        } else {
          // toast.success(response.data.message);
          setWebSiteInfo(response.data.data);
          setId(response.data.data._id);
          // console.log("transactionlog response:", response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Submit = () => {
    const token = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("id", id);
    formData.append("name", webSiteInfo.name);
    formData.append("email", webSiteInfo.email);
    formData.append("status", webSiteInfo.status);
    
    if (faviconIcon !== undefined) {
      formData.append("favicon_icon", faviconIcon[0]);
    }

    if (logo !== undefined) {
      formData.append("logo", logo[0]);
    }

   //formData.append("favicon_icon", faviconIcon[0]);
    formData.append("phone_no", webSiteInfo.phone_no);
    formData.append("title", webSiteInfo.title);
    // formData.append("logo", webSiteInfo.mobile_no);
    formData.append("description", webSiteInfo.description);

    axios
      .post(`${BASE_URL}admin/addUpdateWebsiteInfo`, formData, {
        headers: {
          "x-access-token": `${token}`,
          version: "1.0.0",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.success === false) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          getWebsiteInfo();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />
        <div className="content-body">
        <div className="page-titles  ">
        <ol className="breadcrumb">
          <li><h5 className="bc-title">Website On OFF</h5></li>
          <li className="breadcrumb-item"><a href="javascript:void(0)">
              <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.125 6.375L8.5 1.41667L14.875 6.375V14.1667C14.875 14.5424 14.7257 14.9027 14.4601 15.1684C14.1944 15.4341 13.8341 15.5833 13.4583 15.5833H3.54167C3.16594 15.5833 2.80561 15.4341 2.53993 15.1684C2.27426 14.9027 2.125 14.5424 2.125 14.1667V6.375Z" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.375 15.5833V8.5H10.625V15.5833" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Home </a>
          </li>
          <li className="breadcrumb-item active"><a href="javascript:void(0)">Website On OFF:-</a></li>
        </ol>
        {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
      </div>
          <div className="pt-4"  style={{height:"100vh",padding:"30px"}}>
          <div className="card">
            <div className="card-header ps-4 p-3">Website On Off</div>
            <div className="card-body">
              <div className="row">
                <div className="col-3 text-center">
                  <label className="mt-3">Title :</label>
                </div>
                <div className="col-5 mt-3">
                  <input
                    type="text"
                    value={webSiteInfo.title}
                    onChange={handleChange}
                    name="title"
                    className="form-control inputType"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3 text-center">
                  <label className="mt-3">Description :</label>
                </div>
                <div className="col-5 mt-3">
                  <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={webSiteInfo.description}
                    className="form-control inputType"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3 text-center">
                  <label className="mt-3">Website name :</label>
                </div>
                <div className="col-5 mt-3">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={webSiteInfo.name}
                    className="form-control inputType"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3 text-center">
                  <label className="mt-3">Website Email :</label>
                </div>
                <div className="col-5 mt-3">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={webSiteInfo.email}
                    className="form-control inputType"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3 text-center">
                  <label className="mt-3">Phone Number :</label>
                </div>
                <div className="col-5 mt-3">
                  <input
                    type="text"
                    name="phone_no"
                    onChange={handleChange}
                    value={webSiteInfo.phone_no}
                    className="form-control inputType"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3 text-center">
                  <label className="mt-3">Website logo</label>
                </div>
                <div className="col-5 mt-3">
                  <input
                    type="file"
                    className="form-control inputType"
                    onChange={(e) => setLogo(e.target.files)}
                  />
                  <img
                    src={webSiteInfo.logo}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3 text-center">
                  <label className="mt-3">Website Favicon Icon</label>
                </div>
                <div className="col-5 mt-3">
                  <input
                    type="file"
                    className="form-control inputType"
                    onChange={(e) => setFaviconIcon(e.target.files)}
                  />
                  <img
                    src={webSiteInfo.favicon_icon}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-3 text-center ">
                  <label className="mt-3">Status:</label>
                </div>
                <div className="col-5">
                  <select
                    className="form-control mt-3 inputType"
                    name="status"
                    onChange={handleChange}
                  >
                    <option value="">-select-</option>
                    <option
                      selected={webSiteInfo.status === "Active" ? true : false}
                      value="Active"
                    >
                      Active
                    </option>
                    <option
                      selected={
                        webSiteInfo.status === "InActive" ? true : false
                      }
                      value="InActive"
                    >
                      InActive
                    </option>
                  </select>

                  <div className="mt-3">
                    <button type="submit"
                      onClick={() => Submit()}
                      className="btn btn-success"
                    >
                      Update
                    </button>
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
export default WebsiteOnOff;
