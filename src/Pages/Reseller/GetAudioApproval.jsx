import { useRef, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { toast } from "react-toastify";
import axios from "axios";

function GetAudioAprroval() {
  const [audio, setAudio] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  var audioInputRef = useRef(0);

  const handleFileNameChange = (e) => {
    const value = e.target.value;

    if (value.length > 30) {
      setErrorMessage("File name cannot exceed 30 characters.");
    } else {
      setErrorMessage(""); // Clear the error message if valid
      setFileName(value);
    }
  };

  const OnSubmit = () => {
    setLoading(true);
    if (audio == null || audio.length === 0) {
      toast.error("audio is mandatory");
      setLoading(false);
      return;
    }

    // Validation: Check file type for .mp3
    const file = audio[0];
    const allowedExtensions1 = /(\.mp3)$/i;
    const allowedExtensions2 = /(\.mp4)$/i;
    if (
      !(
        allowedExtensions1.exec(file.name) || allowedExtensions2.exec(file.name)
      )
    ) {
      toast.error("Only MP3 and MP4 files are allowed");
      setLoading(false);
      return;
    }
    let formData = new FormData();
    formData.append("audio", audio[0]);
    formData.append("fileName", fileName);
    const token = localStorage.getItem("token");
    axios
      .post(`${BASE_URL}admin/getAudioApproval`, formData, {
        headers: {
          "x-access-token": `${token}`,
          "Content-Type": "multipart/form-data",
          version: "1.0.0",
        },
      })
      .then((response) => {
        setLoading(false);
        if (response.data.success == false) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          setFileName("");
          audioInputRef.current.value = null;
          setAudio(null);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Upload audio file failed.. Please contact the admin");
        setLoading(false);
      });
  }; //end of OnSubmit

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
                  <h5 className="bc-title">Get Audio Approval</h5>
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
                  <a href="javascript:void(0)">Get Audio approval:-</a>
                </li>
              </ol>
            </div>
            <div style={{ padding: "30px" }}>
              <div className="card">
                <div className="card-header p-3">
                  <span>
                    <i className="fa fa-pen"></i>&nbsp;&nbsp;
                    <h6 className="d-inline">Get Audio approval</h6>
                  </span>
                </div>
                <div className="card-body">
                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">Audio File name :-</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4  mt-2">
                      <input
                        type="text"
                        placeholder="Enter a name (defaults to file name)"
                        className="form-control inputType"
                        name="fileName"
                        onChange={handleFileNameChange}
                        value={fileName}
                      />
                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">Upload Audio:-</label>
                    </div>
                    <div className="col-5 col-xs-9 col-sm-9 col-md-9 col-lg-4  mt-2">
                      <input
                        ref={audioInputRef}
                        id="audio"
                        type="file"
                        className="form-control inputType"
                        name="audio"
                        accept=".mp3"
                        onChange={(e) => setAudio(e.target.files)}
                        multiple={false}
                      />
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-2">
                      <input
                        type="button"
                        className="btn btn-primary m-2"
                        onClick={OnSubmit}
                        value="upload"
                        disabled={loading}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} //end of function GetAudioAprroval

export default GetAudioAprroval;
