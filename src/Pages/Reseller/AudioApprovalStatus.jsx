import axios from "axios";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ReactAudioPlayer from "react-audio-player";
import moment from "moment";


function AudioApprovalStatus() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("token");
    const [audioData, setAudioData] = useState([]);

    useEffect(() => {
        getUserAudioData()
    }
        , [])


    var getUserAudioData = () => {
        axios
            .post(
                `${BASE_URL}admin/getUserAudios`,
                {},
                {
                    headers: {
                        "Content-Type": "Application/json",
                        version: "1.0.0",
                        "x-access-token": `${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.success == false) {
                    toast.error("unable to load data..please contact admin");
                } else {
                    setAudioData(response.data.data);

                }
            })
            .catch((error) => {
                toast.error("unable to load data..please contact admin");
            });
    }//end of getUserAudioData



    const columns = [
        {
            name: "sr. No.",
            center: true,
            cell: (row, index) => index + 1,
            maxWidth: '7px'
        },
        {
            name: "audio name",
            selector: (row) => row.audio_file_display_name,
        },
        {
            name: "uploaded at",
            selector: (row) => moment(row.upload_date).format("DD-MM-YYYY hh:mm A "),
        },
        {
            name: "link",
            center: true,
            selector: (row) => row.audio_file,
            maxWidth: "10px",
            cell: (row) => <a href={row.audio_file} target="_blank" rel="noopener noreferrer">Download</a>
        },
        {
            name: "file",
            center: true,
            cell: (row) => (
                <ReactAudioPlayer
                    controls={true}
                    src={row.audio_file}

                    style={{ padding: 5, width: '200px' }}
                />
            ),
        },
        {
            name: "status",
            selector: (row) => row.status,
        }
    ];

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
                                    <h5 className="bc-title">Audio Approval Status</h5>
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
                                    <a href="javascript:void(0)">Audio Approval Status:-</a>
                                </li>
                            </ol>
                        </div>
                        <div style={{ padding: "30px" }}>
                            <div className="card">
                                <div className="card-header p-3">
                                    <span>
                                        <i className="fa fa-pen"></i>&nbsp;&nbsp;
                                        <h6 className="d-inline">Audio Approval Status</h6>
                                    </span>
                                </div>
                                <DataTable
                                    columns={columns}
                                    data={audioData}
                                    pagination
                                    persistTableHead
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}//end of AudioApprovalStatus

export default AudioApprovalStatus;