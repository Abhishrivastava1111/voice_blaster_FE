import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const SendWhatsapp = () => {
  const initialState = {
    // mobile_no: "",
    // audio: "",
    // count: "",
    groupimport: "",
    txtimport: "",
    csvimport: "",
  };
  const [numbercounter, setNumberCounter] = useState("");
  const [mobile_no, setMobile_No] = useState("");
  const [count, setCount] = useState(0);
  const [audio, setAudio] = useState(undefined);
  const [contactGroupData, setContactGroupData] = useState([]);
  const [values, setValues] = useState(initialState);
  const [isloading, setLoading] = useState(false);
  const maxFileSize = 5000000;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.body.className = theme;
    if (numbercounter.length == 0) {
      setNumberCounter(0);
    }
  }, [count]);

  const RowCount = (text) => {
    console.log(text);
    var lines = text.split(/\r|\r\n|\n/);
    console.log(lines);
    setCount(lines.length);
    // console.log("count", count);
    setNumberCounter(count);
    setMobile_No(text);
  };

  const GroupRowCount = (text) => {
    console.log(text);
    // return;
    var lines = text.split(/\r|\r\n|\n/);
    console.log(lines);
    setCount(lines.length);
    // console.log("count", count);
    setNumberCounter(count);
    setMobile_No(text);
  };

  const OnSubmit = () => {
    setLoading(true);
    // const BASE_URL = process.env.REACT_APP_BASE_URL;
    //  const   obj = {
    //         contact_no: mobile_no,
    //         msg_count: count,
    //         audio_file: audio
    //     }

    if (audio == undefined) {
      toast.error("audio is mandatory");
      setLoading(false);
      return;
    }

    // if (audio[0].size > maxFileSize) {
    //   toast.error("Audio size must be of 5MB or Less");
    //   setLoading(false);
    //   return;
    // }
    // console.log("audio size is:",audio[0].size);

    let formData = new FormData();
    formData.append("contact_no", mobile_no);
    formData.append("msg_count", count);
    formData.append("audio", audio[0]);

    console.log("submitted");

    const token = localStorage.getItem("token");

    axios
      .post(`${BASE_URL}admin/addSendMessage`, formData, {
        headers: {
          "x-access-token": `${token}`,
          "Content-Type": "multipart/form-data",
          version: "1.0.0",
        },
      })
      .then((response) => {
        if (response.data.success == false) {
          toast.error(response.data.message);
          setLoading(false);
          // console.log(response.data.message);
        } else {
          //toast.success("Submitted successfully")
          toast.success(response.data.message);
          setLoading(false);
          setNumberCounter("");
          //setAudio("");
          setMobile_No("");
          setAudio("");
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const allowedExtensions = ["csv"];
  const handleFileChange = (e) => {
    // $('#thefile').change(function(e) {
    if (e.target.files != undefined) {
      var reader = new FileReader();
      var theInfo = "";
      var file = document.getElementById("thefile").files[0];
      reader.onload = function (e) {
        var lenlen = e.target.result.split("\n").length;
        for (let i = 0; i < lenlen; i++) {
          theInfo += e.target.result.split("\n")[i] + "\n";
        }
        // $('#res3').val('');
        // $('#res3').val(theInfo);
        // countLines();
        // $('#import-txt').fadeOut();
        // $('#import-group').fadeOut();
        // MNumber();
      };
      reader.readAsText(e.target.files.item(0));
    }
  };

  // const uploadAudio=(e)=>{
  //   if(audio.size>maxFileSize)
  //   {
  //     toast.error("file should be of 5 MB or Less");
  //   }
  //   setAudio(e.target.value)
  // }
  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      let text = e.target.result;
      text = text.trim();
      // console.log(text)
      // alert(text)
      var lines = text.split(/\r|\r\n|\n/);

      lines = lines.filter(function (el) {
        return el != "";
      });
      // console.log(lines);
      setCount(lines.length);
      // console.log("count", count);
      setNumberCounter(count);
      setMobile_No(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const showCSVFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      let text = e.target.result;
      text = text.trim();
      console.log("text ==>", text);
      // alert(text)
      var lines = text.split(/\r|\r\n|\n/);

      lines = lines.filter(function (el) {
        return el != "";
      });
      console.log("line ==>", lines);

      setCount(lines.length);
      // console.log("count", count);
      setNumberCounter(count);
      console.log(count);
      setMobile_No(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  useEffect(() => {
    GetAllContactGroup();
    const theme = localStorage.getItem("theme");
    document.body.className = theme;
  }, []);
  const GetAllContactGroup = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getAllContactGroup`,
        { page: 1 },
        {
          headers: {
            "x-access-token": `${token}`,
            version: "1.0.0",
            "Content-Type": "Application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.data == false) {
          // toast.error(response.data.message);
        } else {
          // toast.success(response.data.message);
          setContactGroupData(response.data.data);
          console.log("transactionlog response:", response.data.data);
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
        <div fluid className=" main-body">
          <div className="content-body" style={{ height: "100vh" }}>
            <div className="page-titles  ">
              <ol className="breadcrumb">
                <li>
                  <h5 className="bc-title">Send voice SMS</h5>
                </li>
                <li className="breadcrumb-item">
                  <a href="javascript:void(0)">
                    <svg
                      width={17}
                      height={17}
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.125 6.375L8.5 1.41667L14.875 6.375V14.1667C14.875 14.5424 14.7257 14.9027 14.4601 15.1684C14.1944 15.4341 13.8341 15.5833 13.4583 15.5833H3.54167C3.16594 15.5833 2.80561 15.4341 2.53993 15.1684C2.27426 14.9027 2.125 14.5424 2.125 14.1667V6.375Z"
                        stroke="#2C2C2C"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.375 15.5833V8.5H10.625V15.5833"
                        stroke="#2C2C2C"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Home{" "}
                  </a>
                </li>
                <li className="breadcrumb-item active">
                  <a href="javascript:void(0)">Send voice SMS:-</a>
                </li>
              </ol>
              {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
            </div>
            <div style={{ padding: "30px" }}>
              <div className="card">
                <div className="card-header p-3">
                  <span>
                    <i className="fa fa-pen"></i>&nbsp;&nbsp;
                    <h6 className="d-inline">Send Voice SMS</h6>
                  </span>
                </div>
                <div className="card-body">
                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">Enter Mobile Number:-</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4  ">
                      <textarea
                        rows={4}
                        cols={4}
                        className="form-control inputType"
                        placeholder="Enter Mobile Here With Country Code"
                        onChange={(e) => RowCount(e.target.value)}
                        name="mobile_no"
                        value={mobile_no}
                        // onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2 mt-2">
                      <label className="m-2">Upload Audio:-</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4 mt-2">
                      <input
                        type="file"
                        className="form-control inputType"
                        name="audio"
                        accept=".mp3"
                        // value={audio}
                        // onChange={(e)=>uploadAudio(e)}

                        onChange={(e) => setAudio(e.target.files)}
                        // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">Count:-</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4">
                      <input
                        type="text"
                        className="form-control inputType"
                        name="numbercounter"
                        value={count}
                        disabled
                        // onChange={handleChange}
                      />
                    </div>
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2 mt-2"></div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4 mt-2"></div>
                  </div>

                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">Group Import</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4">
                      <select
                        className="form-control inputType"
                        onChange={(e) => GroupRowCount(e.target.value)}
                      >
                        <option className="">--select--</option>
                        {contactGroupData &&
                          contactGroupData.map((item, index) => (
                            <option key={index} value={item.contact_no}>
                              {item.group_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2 mt-2"></div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4 mt-2"></div>
                  </div>

                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">TXT Import</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4">
                      <input
                        type="file"
                        className="form-control inputType"
                        // onChange={(e) => handleFileChange(e)}
                        onChange={(e) => showFile(e)}
                        id="csvInput"
                        name="file"
                      />
                    </div>
                    {/* <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2 mt-2">

                                    </div>
                                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4 mt-2">

                                    </div> */}
                  </div>

                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">CSV Import</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4">
                      <input
                        type="file"
                        className="form-control inputType"
                        onChange={(e) => showCSVFile(e)}
                      />
                    </div>
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2 mt-2"></div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4 mt-2"></div>
                  </div>

                  <div className="d-flex justify-content-center align-items-center m-5">
                    {" "}
                    {isloading ? (
                      <button
                        type="button"
                        className="btn btn-primary  inputType"
                        // onClick={() => OnSubmit()}
                      >
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "25px" }}
                        ></i>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary  inputType"
                        onClick={() => OnSubmit()}
                      >
                        Submit
                      </button>
                    )}
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
export default SendWhatsapp;
