import axios from "axios";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import moment from "moment";

function AdminAudioApproval() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [audios, setAudios] = useState([])
    const [statusFilter, setStatusFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 2;

    const getAllAudiosDetails = () => {
        const token = localStorage.getItem("token");
        axios
            .post(
                `${BASE_URL}admin/getAllAudiosDetails`,
                {
                    page: currentPage,
                    limit: limit,
                    statusFilter: statusFilter,
                },
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
                    toast.error(response.data.message);
                } else {
                    setAudios(response.data.data.data);
                    setTotalPages(response.data.data.totalPages);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };//end of getAllAudiosDetails



    useEffect(() => {
        getAllAudiosDetails();
    }, [currentPage])

    useEffect(() => { }, [audios])


    var acceptReject = (audio_id, modifiedStatus) => {
        const token = localStorage.getItem("token");
        axios
            .post(
                `${BASE_URL}admin/changeAudioStatus`,
                {
                    audio_id: audio_id,
                    modified_status: modifiedStatus,
                },
                {
                    headers: {
                        "x-access-token": `${token}`,
                        "Content-Type": "Application/json",
                        version: "1.0.0",
                    },
                }
            )
            .then((response) => {
                var modifiedStatusAudios = audios
                .map((audio) => {
                    if (audio.audio_id == audio_id)
                        audio.status = modifiedStatus;
                    return audio
                });
                setAudios(modifiedStatusAudios);
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            });
    }//end of acceptReject


    const audioActions = (audio) => {
        return (
            <div>
                {
                    audio.status != "pending" ?
                        <button title="change status to pending" className="btn btn-warning m-1" onClick={() => { acceptReject(audio.audio_id, "pending") }}>
                            <i class="fa-regular fa-bell"></i>
                        </button>
                        : ''
                }
                {audio.status != "approved" ?
                    <button title="approve" className="btn btn-success m-1" onClick={() => { acceptReject(audio.audio_id, "approved") }}>
                        <i class="fa-solid fa-check"></i>
                    </button>
                    : ''
                }
                {
                    audio.status != "rejected" ?
                        <button title="reject" className="btn btn-danger m-1" onClick={() => { acceptReject(audio.audio_id, "rejected") }}>
                            <i class="fa-regular fa-circle-xmark"></i>
                        </button>
                        : ''
                }
            </div>
        )
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const preNextBtn = (displayText, compareToHide) => {
        return (
            <div style={{
                "margin": "10px",
                fontSize: "1.2rem",
                cursor: "pointer",
                display: currentPage == compareToHide ? "none" : "block",

            }}
                onClick={() => {

                    console.log("here");
                    handlePageChange(currentPage - (compareToHide == 1 ? 1 : -1)

                    )
                }}
            >
                {displayText}
            </div>
        )
    }




    return (
        <>
            <div id="main-wrapper">
                <Header />
                <Sidebar />
                <div className=" content-body " style={{ height: "100vh" }}>
                    <div className="page-titles  ">
                        <ol className="breadcrumb">
                            <li>
                                <h5 className="bc-title">Audio Approvals</h5>
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
                                <a href="javascript:void(0)">Audio Approvals</a>
                            </li>
                        </ol>
                        {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
                    </div>

                    <div className="col-12 bst-seller pt-5" style={{ padding: "30px" }}>
                        <div className="card">
                            <div className="card-header p-3">
                                <h4 className="heading mb-0">Audio List</h4>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-bordered table-responsive" style={{ textAlign: "center" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ verticalAlign: "top" }} >sr. no.</th>
                                            <th style={{ verticalAlign: "top" }}>audio name</th>
                                            <th style={{ verticalAlign: "top" }}>audio</th>
                                            <th style={{ verticalAlign: "top" }}>
                                                <div>
                                                    uploaded by <br />
                                                    <input type="checkbox" id="showuserdetailscheckbox" className="form-check-input" value="show details" checked={showUserDetails} onChange={() => { setShowUserDetails(!showUserDetails) }} ></input>
                                                    <label class="form-check-label" for="showuserdetailscheckbox">
                                                        show user details
                                                    </label>
                                                </div>
                                            </th>
                                            <th style={{ verticalAlign: "top" }}>uploaded at</th>
                                            <th style={{ verticalAlign: "top" }}>status</th>
                                            <th style={{ verticalAlign: "top" }}>actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            audios.map((audio, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {(currentPage - 1) * limit + (index + 1)}
                                                        </td>
                                                        <td>
                                                            {audio.audio_file_display_name}
                                                        </td>
                                                        <td >
                                                            <ReactAudioPlayer
                                                                controls={true}
                                                                src={audio.audio_file}
                                                            />
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {audio.uploaded_by_user.name}
                                                                {showUserDetails ?
                                                                    <>
                                                                        <br />
                                                                        {`(${audio.uploaded_by_user.email})`}
                                                                        <br />
                                                                        {`(${audio.uploaded_by_user.mobile_no})`}
                                                                    </>
                                                                    :
                                                                    ' '

                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {moment(audio.upload_date).format(
                                                                "DD-MM-YYYY hh:mm A "
                                                            )}
                                                        </td>
                                                        <td>
                                                            {audio.status}
                                                        </td>
                                                        <td>
                                                            {audioActions(audio)}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-end align-items-center" style={{ "padding": "5px" }}>
                                    {preNextBtn("<<", 1)}
                                    <div style={{ "marginRight": "10px" }}>
                                        page {currentPage} of {totalPages}
                                    </div>
                                    {preNextBtn(">>", totalPages)}
                                    <div>
                                        <select className="form-select" onChange={(e) => handlePageChange(e.target.value)}>
                                            <option disabled selected>go to page</option>
                                            {Array(totalPages).fill().map((_, index) => index + 1).map((pageNo) => <option disabled={currentPage == pageNo} value={pageNo}>{pageNo}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )


}//end of AdminAudioApproval
export default AdminAudioApproval;