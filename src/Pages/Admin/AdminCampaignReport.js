import axios from "axios";
import moment from "moment";
import React from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { toast } from "react-toastify";
import { useEffect, useState, useMemo } from "react";
import Spinner from "react-bootstrap/Spinner";
import ReactAudioPlayer from "react-audio-player";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { styled } from "styled-components";
import { CSVLink, CSVDownload } from "react-csv";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="srearch by Created By"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const AdminCampaignReport = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [campaignreport, setCampaignReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contactlist, setContactList] = useState([]);
  const [file, setFile] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;
  const [id, setId] = useState("");
  // const [id1 , setId1]=useState("");
  const [show, setShow] = useState(false);
  const handleShow = (show) => setShow(show);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // const [uploadShow , setUploadShow]=useState(false)
  // const handleshowUpload=(uploadShow)=>setUploadShow(uploadShow)
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = (id) => {
    setId(id);
    setShow1(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //export data

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  //export data
  useEffect(() => {
    getAllSendMessage();
    const theme = localStorage.getItem("theme");
    document.body.className = theme;
  }, [currentPage]);

  const getAllSendMessage = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getAllSendMessage`,
        {
          // params: {
          page: currentPage,
          limit: limit,
          // },
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
          // toast.error(response.data.message);
        } else {
          setCampaignReport(response.data.data.data);
          console.log("admin report", response.data.data);
          //  setItems(response.data.items);
          setTotalPages(response.data.data.totalPages);

          // console.log(response.data.data);
          // toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteCampreport = (id) => {
    let confirm = window.confirm("Are you sure?");

    // console.log(confirm);
    if (confirm === false) {
      return;
    }

    const token = localStorage.getItem("token");
    axios
      .delete(`${BASE_URL}admin/deleteSendMessage/${id}`, {
        headers: {
          "Content-Type": "Application/json",
          version: "1.0.0",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        if (response.data.success == false) {
          toast.error(response.data.message);
        } else {
          toast.error(response.data.message);
          getAllSendMessage();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateReport = () => {
    if (file == undefined) {
      toast.error("please choose a file ");
      return;
    }
    setIsLoading(true);
    // console.log("in side the update report");
    const token = localStorage.getItem("token");
    const formData = new FormData();
    // upload.single("final_report_file"),
    // console.log(file)
    // return;
    formData.append("final_report_file", file[0]);

    axios
      .put(`${BASE_URL}admin/updateReport/${id}`, formData, {
        headers: {
          version: "1.0.0",
          "x-access-token": `${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.success == false) {
          setIsLoading(false);
          toast.error(response.data.message);
        } else {
          //  $("#exampleModal").modal("hide");
          toast.success(response.data.message);
          setIsLoading(false);

          getAllSendMessage();
          handleClose1();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   console.log("File has been set.")
  // },[file]);
  const [viewCompaing, setViewCompaing] = useState({});

  const [status, setStatus] = useState("");

  const view = (item) => {
    handleShow(true);
    console.log(item);
    setViewCompaing(item);
    setContactList(item.report);
    // console.log("contact list",item.contact_no);
  };
  // const uploadpopupshow=(uploadupshow)=>setUploadupshow(true);

  // const uploadreport=(item)=> {
  //   handleshowUpload(true)
  // }
  // const closeupdatereport=(uploadupshow)=>

  const ChangeStatus = () => {
    console.log();
    const token = localStorage.getItem("token");
    axios
      .put(
        `${BASE_URL}admin/updateSendMessageStatus/${viewCompaing._id}`,
        { status: status },
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
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          getAllSendMessage();
          //   getAllUserSendmessage();
          handleShow(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const exportToCsv = () => {
    // console.log(contactlist);
    var CsvString = "";
    // arrayList.forEach(function (RowItem, RowIndex) {
    contactlist.forEach(function (ColItem, ColIndex) {
      CsvString += ColItem + "\n";
    });
    // CsvString += "\r\n";
    // });
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", "somedata.csv");
    document.body.appendChild(x);
    x.click();
  };

  const filteredItems = campaignreport.filter(
    (item) =>
      item.createBy_user_details.length > 0 &&
      item.createBy_user_details[0].name &&
      item.createBy_user_details[0].name
        .toLowerCase()
        .includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);


  const preNextBtn = (displayText , compareToHide ) => {
    return (
      <div style={{
        "margin" : "10px",
        fontSize : "1.2rem",
        cursor : "pointer",
        display : currentPage == compareToHide ? "none" : "block" ,
      
       }} 
       onClick={()=>handlePageChange(currentPage - ( compareToHide == 1 ? 1 : -1 ) )}
       >
        {displayText} 
       </div>
    )
  }

  const columns = [
    // {
    //   name: "Profile image",
    //   selector: (row) => (
    //     <img
    //       src="images/avatar/profile.webp"
    //       onClick={() => console.log(row.profile_image)}
    //       className="img-fluid"
    //       style={{ borderRadius: "50%", width: "30px" }}
    //     />
    //   ),
    // },
    {
      // name: "Unique ID",
      name: "S No.",
      // selector: (row) => row._id,
      cell: (row, index) => index + 1,
    },
    {
      name: "Number Of Count",
      selector: (row) => row.msg_count,
    },
    {
      name: "Created By",
      selector: (row) =>
        row.createBy_user_details.length > 0
          ? row.createBy_user_details[0].name
          : "",
    },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format("DD-MM-YYYY hh:mm A "),
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => DeleteCampreport(row._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
          &nbsp;
          <button className="btn btn-primary btn-sm" onClick={() => view(row)}>
            <i className="fa fa-eye"></i>
          </button>
          &nbsp;
          {/* <Button variant="primary" onClick={handleShow1}>
       <i className="fa fa-upload  btn-sm"/>
      </Button> */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleShow1(row._id)}
          >
            <i className="fa fa-upload"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />
        <div className=" content-body " style={{ height: "100vh" }}>
          <div className="page-titles  ">
            <ol className="breadcrumb">
              <li>
                <h5 className="bc-title">Campaign report</h5>
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
                <a href="javascript:void(0)">Campaign report</a>
              </li>
            </ol>
            {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
          </div>

          <div className="col-12 bst-seller pt-5" style={{ padding: "30px" }}>
            <div className="card">
              <div className="card-header p-3">
                <h4 className="heading mb-0">User List</h4>
              </div>
              <div className="card-body p-0">
                {/* <DataTable
                  // columns={columns}
                  // data={users}
                  // pagination
                  // title="User List"
                  columns={columns}
                  data={filteredItems}
                  pagination
                  paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                  subHeader
                  subHeaderComponent={subHeaderComponentMemo}
                  // selectableRows
                  persistTableHead
                /> */}
                <div style={{ textAlign: "center" }}>
                  {/* <input
                    type="text"
                    placeholder="Searching"
                    className="form-control"
                    style={{ width: "40%", textAlign: "center" }}
                  ></input> */}
                </div>
                <table className="table table-bordered table-responsive ">
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Number Of Count</th>
                      <th>Created By</th>
                      <th>Created At</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignreport.length > 0 &&
                      campaignreport.map((item, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.msg_count}</td>
                            <td>
                              {item.createBy_user_details.length > 0
                                ? item.createBy_user_details[0].name
                                : ""}
                            </td>
                            <td>
                              {moment(item.createdAt).format(
                                "DD-MM-YYYY hh:mm A "
                              )}
                            </td>
                            <td>{item.status}</td>
                            <td>
                              {
                                <>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => DeleteCampreport(item._id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                  &nbsp;
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => view(item)}
                                  >
                                    <i className="fa fa-eye"></i>
                                  </button>
                                  &nbsp;
                                  {/* <Button variant="primary" onClick={handleShow1}>
       <i className="fa fa-upload  btn-sm"/>
      </Button> */}
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleShow1(item._id)}
                                  >
                                    <i className="fa fa-upload"></i>
                                  </button>
                                </>
                              }
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end align-items-center" style={{ "padding": "5px" }}>
                  { preNextBtn("<<" , 1 ) }
                  <div style={{ "marginRight": "10px" }}>
                    page {currentPage} of {totalPages}
                  </div>
                  { preNextBtn(">>" , totalPages ) }
                  {/* {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      disabled={index + 1 === currentPage}
                      style={{ padding: "10px", margin: "1px" }}
                    >
                      {index + 1}
                    </button>
                  ))} */}
                  <div>
                    <select className="form-select" onChange={(e)=> handlePageChange(e.target.value) }>
                      <option disabled selected>go to page</option>
                      {Array(totalPages).fill().map((_ , index)=> index + 1).map((pageNo) => <option  disabled={currentPage == pageNo} value={pageNo}>{pageNo}</option>)}
                    </select>
                  </div>
                </div>
                {/* <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
                  <div className="tbl-caption">
                    <h4 className="heading mb-0">
                      <i className="fa fa-pen"></i> Campaign report
                    </h4>

                    <div>

                    </div>
                  </div>
                  <hr style={{ margin: "0", padding: "0" }} />

                  <div className="row m-2">
                    <div className="col"></div>
                    <div className="col-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search here:-"
                      />
                    </div>
                  </div>

                  <table id="empoloyees-tbl" className="table">
                    <thead>
                      <tr>

                        <th>Unique ID</th>
                        <th>Number Of Count </th>
                        <th>Created By </th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignreport.length > 0 &&
                        campaignreport.map((item, index) => (
                          <tr key={index}>

                            <td>
                              <span>{item._id}</span>
                            </td>
                            <td>
                              <div className="products">
                                <div>
                                  <span>{item.msg_count}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              {item.createBy_user_details.length > 0
                                ? item.createBy_user_details[0].name
                                : ""}
                            </td>
                            <td>
                              <span>

                                {moment(item.createdAt).format(
                                  "DD-mm-yyyy hh:mm A"
                                )}
                              </span>
                            </td>

                            <td>
                              {item.status != "Failed" ? (
                                <span className="badge badge-success light border-0 text-center">
                                  {item.status}
                                </span>
                              ) : (
                                <span className="badge badge-danger light border-0 text-center">
                                  {item.status}
                                </span>
                              )}
                            </td>
                            <td>


                              <Button variant="primary" onClick={() => view(item)}>
                                <i className="fa fa-eye"></i>
                              </Button>
                              &nbsp;&nbsp;{" "}

                              <button
                                className="btn btn-danger"
                                onClick={() => DeleteCampreport(item._id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                              &nbsp;&nbsp;
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => setId(item._id)}
                              >
                                <i className="fa fa-upload"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div> */}
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

      {/* model popup start */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title> Upload Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div class="modal-body text-center">
            <input
              type="file"
              name="file"
              // value={ufile}
              // onChange={(e)=>setUfile(e.target.files)}

              // type="file"

              onChange={(e) => setFile(e.target.files)}

            // name="filename"
            // value={filename}
            // onChange={(e) => setFillName(e.target.files)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => UpdateReport()}
          >
            {isLoading ? (
              <div>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              "Upload"
            )}
          </button>
        </Modal.Footer>
      </Modal>

      {/* end  */}
      {/* <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Upload Report
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center">
              <input
                type="file"
                name="file"
               

                onChange={(e) => setFile(e.target.files)}

              
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => UpdateReport()}
              >
                {isLoading ? (
                  <div>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* model popup end  */}

      {/* view popup */}

      <Modal show={show} onHide={() => handleShow()}>
        <Modal.Header closeButton>
          <Modal.Title> View</Modal.Title>
        </Modal.Header>
        <div className="m-3">
          <span>Unique Id:</span>&nbsp;&nbsp;&nbsp;
          <span>{viewCompaing._id}</span>
          <br />
          <br />
          <span>Number of Contact Number Count:</span>&nbsp;&nbsp;&nbsp;
          <span>{viewCompaing.msg_count}</span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="btn btn-primary" onClick={() => exportToCsv()}>
            <i className="fa fa-download"></i>Download
          </button>
          <br />
          <br />
          <span>Date:</span>&nbsp;&nbsp;&nbsp;
          <span>
            {moment(viewCompaing.createdAt).format("DD-MM-YYYY hh:mm A ")}
          </span>
          <br />
          <br />
          <span>Report Download:</span>&nbsp;&nbsp;&nbsp;
          <span>
            {viewCompaing?.final_report_file != undefined ? (
              <a href={viewCompaing.final_report_file}>Download</a>
            ) : (
              ""
            )}
          </span>
          <br />
          <br />
          <span>Audio:</span>&nbsp;&nbsp;&nbsp;
          <span>
            {" "}
            {viewCompaing.audio_file}
            <ReactAudioPlayer
              src={viewCompaing.audio_file}
              controls
              style={{ padding: 5 }}
            />
            {/* <a href={viewCompaing.audio_file} target="_blank">
                  Download
                </a> */}
            {/* <audio controls style={{height:'25px'}}>
                  <source src={viewCompaing.audio_file} type="audio/ogg" />
                  <source src={viewCompaing.audio_file} type="audio/mp3" />
                </audio> */}
          </span>
          <br />
          <br />
          <span>Created By:</span>&nbsp;&nbsp;&nbsp;
          <span>
            {viewCompaing?.createBy_user_details != undefined &&
              viewCompaing?.createBy_user_details?.length > 0
              ? viewCompaing.createBy_user_details[0].name
              : ""}
          </span>
          <br />
          <br />
          <span>Status:</span>&nbsp;&nbsp;&nbsp;
          <span>
            <select
              className="form-controller"
              name="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option
                selected={viewCompaing.status == "Pending" ? true : false}
                value="Pending"
              >
                Pending
              </option>
              <option
                selected={viewCompaing.status == "Process" ? true : false}
                value="Process"
              >
                Process
              </option>
              <option
                selected={viewCompaing.status == "Complete" ? true : false}
                value="Complete"
              >
                Complete
              </option>
              <option
                selected={viewCompaing.status == "Failed" ? true : false}
                value="Failed"
              >
                Failed
              </option>
            </select>
          </span>
        </div>

        {/* <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleShow()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => ChangeStatus()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                View
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <span>Unique Id:</span>&nbsp;&nbsp;&nbsp;
              <span>{viewCompaing._id}</span>
              <br />
              <br />
              <span>Number of Contact Number Count:</span>&nbsp;&nbsp;&nbsp;
              <span>{viewCompaing.msg_count}</span>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <button className="btn btn-primary" onClick={() => exportToCSV(contactlist,'fileName')}>
           
                <i className="fa fa-download"></i>Download
              </button> */}
              <CSVLink data={contactlist}>Download me</CSVLink>
              {/* <CSVDownload data={contactlist} target="_blank" /> */}
              <br />
              <br />
              <span>Date:</span>&nbsp;&nbsp;&nbsp;
              <span>{viewCompaing.createdAt}</span>
              <br />
              <br />
              <span>Report Download:</span>&nbsp;&nbsp;&nbsp;
              <span>
                {viewCompaing?.final_report_file != undefined ? (
                  <a href={viewCompaing.final_report_file}>Download</a>
                ) : (
                  ""
                )}
              </span>
              <br />
              <br />
              <span>Audio:</span>&nbsp;&nbsp;&nbsp;
              <span>
                {" "}
                <ReactAudioPlayer
                  src={viewCompaing.audio_file}
                  controls
                  style={{ padding: 5 }}
                />
                {/* <a href={viewCompaing.audio_file} target="_blank">
                  Download
                </a> */}
                {/* <audio controls style={{height:'25px'}}>
                  <source src={viewCompaing.audio_file} type="audio/ogg" />
                  <source src={viewCompaing.audio_file} type="audio/mp3" />
                </audio> */}
              </span>
              <br />
              <br />
              <span>Created By:</span>&nbsp;&nbsp;&nbsp;
              <span>
                {viewCompaing?.createBy_user_details != undefined &&
                  viewCompaing?.createBy_user_details?.length > 0
                  ? viewCompaing.createBy_user_details[0].name
                  : ""}
              </span>
              <br />
              <br />
              <span>Status:</span>&nbsp;&nbsp;&nbsp;
              <span>
                <select
                  className="form-controller"
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Process">Process</option>
                  <option value="Complete">Complete</option>
                  <option value="Failed">Failed</option>
                </select>
              </span>
            </div>

            {/* audio_file */}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => ChangeStatus()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* view popup end  */}
    </>
  );
};
export default AdminCampaignReport;
