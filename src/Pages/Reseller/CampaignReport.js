import axios from "axios";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { toast } from "react-toastify";
import { useEffect, useState, useMemo } from "react";
import ReactAudioPlayer from "react-audio-player";
import moment from "moment";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { styled } from "styled-components";
import { CSVLink, CSVDownload } from "react-csv";

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
      placeholder="Filter By Phone Number"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const CampaignReport = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [allUserSendMessage, setAllUserSendMessage] = useState([]);
  const [contactlist, setContactList] = useState([]);

  const [viewCompaing, setViewCompaing] = useState({});

  const [status, setStatus] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    getAllUserSendmessage();
    const theme = localStorage.getItem("theme");
    document.body.className = theme;
  }, []);

  const view = (item) => {
    console.log("veiw", item);
    setViewCompaing(item);
    // setContactList(item.contact_no);
    setContactList(item.report);
    console.log(item.report);
  };

  const downloadAudio = (audioUrl) => {
    // Create an anchor element
    const link = document.createElement("a");

    // Set the href attribute to the audio file URL
    link.href = audioUrl;

    // Set the download attribute with a filename
    link.download = audioUrl; // "your-audio-file.mp3";

    // Append the anchor to the body
    document.body.appendChild(link);

    // Trigger the click event on the anchor
    link.click();

    // Remove the anchor from the body
    document.body.removeChild(link);
  };

  const getAllUserSendmessage = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getAllUserSendMessage`,
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
          // toast.error(response.data.message);
        } else {
          setAllUserSendMessage(response.data.data);
          // console.log("allUserSend Message",allUserSendMessage);
          toast.success(response.data.message);
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ChangeStatus = () => {
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
          getAllUserSendmessage();
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

  const filteredItems = allUserSendMessage.filter(
    (item) =>
      item.createBy_user_details.length > 0 &&
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
      // name: "Unique Id",
      // selector: (row) => row._id,
      name: "S No.",
      cell: (row, index) => index + 1,
    },
    {
      name: "Numbers",
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
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => view(row)}
          >
            <i className="fa fa-eye"></i>
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
        <div className=" content-body">
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
                <a href="javascript:void(0)">Campaign report:-</a>
              </li>
            </ol>
            {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
          </div>
          <div className="col-12 bst-seller pt-3" style={{ padding: "30px" }}>
            <div className="card mt-3">
              <div className="card-body  ">
                <div className="tbl-caption p-3">
                  <h4 className="heading mb-0">
                    <i className="fa fa-pen"></i>&nbsp;&nbsp; Campaign report
                  </h4>
                  <div></div>
                </div>
                <hr style={{ margin: "0", padding: "0" }} />
                <DataTable
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
                />

                {/* <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
                  <div className="tbl-caption">
                    <h4 className="heading mb-0">
                      <i className="fa fa-pen"></i>&nbsp;&nbsp;Campaign report
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
                        <th>Numbers </th>
                        <th>Created By </th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUserSendMessage.length > 0 &&
                        allUserSendMessage.map((item, index) => (
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
                            <td>{item.createBy_user_details.length > 0 ? item.createBy_user_details[0].name : ""}</td>
                            <td>
                              <span>
                                {moment(item.createdAt).format("DD-mm-yyyy hh:mm A")}
                              </span>
                            </td>

                            <td className="text-start">
                              <span className="badge badge-success light border-0 text-center">
                                {item.status}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                onClick={() => view(item)}
                              >
                                <i className="fa fa-eye"></i>
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

      {/* view popup */}
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
              <span>{viewCompaing?.msg_count}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <button className="btn btn-primary" onClick={() => exportToCsv()}>
                <i className="fa fa-download"></i>Download
              </button>
               */}
              {viewCompaing?.final_report_file !== undefined && contactlist ? (
                <a href={viewCompaing.final_report_file}>Download</a>
              ) : (
                <CSVLink data={contactlist}>Download me</CSVLink>
              )}
              {/* <CSVDownload data={contactlist} target="_blank" /> */}
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
                {viewCompaing?.final_report_file !== undefined ? (
                  <a href={viewCompaing.final_report_file}>Download</a>
                ) : (
                  ""
                )}
              </span>
              <br />
              <br />
              <span>Audio :</span>&nbsp;&nbsp;&nbsp;
              <span>
                {" "}
                {viewCompaing?.audio_file !== undefined ? (
                  <>
                    {viewCompaing.audio_file}
                    <ReactAudioPlayer
                      src={viewCompaing.audio_file}
                      controls
                      style={{ padding: 5 }}
                    />
                  </>
                ) : (
                  // <a href={viewCompaing.audio_file}>
                  //   {" "}
                  //   {viewCompaing.audio_file}
                  // </a>
                  ""
                )}
                {/* <ReactAudioPlayer
                  src={viewCompaing.audio_file}
                  controls
                  style={{ padding: 5 }}
                /> 

                      <button
                  //   onClick={() => downloadAudio(viewCompaing.audio_file)}
                  // >
                  //   Download Audio
                  // </button>
                  */}
              </span>
              <br />
              <br />
              <span>Created By:</span>&nbsp;&nbsp;&nbsp;
              <span>
                {viewCompaing?.createBy_user_details !== undefined &&
                  viewCompaing?.createBy_user_details?.length > 0
                  ? viewCompaing.createBy_user_details[0].name
                  : ""}
              </span>
              {/* <br/>
              <br />
              <span>Status:</span>&nbsp;&nbsp;&nbsp;
              <span><select className="form-controller" name="status"  onChange={(e)=>setStatus(e.target.files)}>
                <option value="Pending">Pending</option>
                <option value="Process">Process</option>
                <option value="Complete">Complete</option>
                <option value="Failed">Failed</option>
                </select></span> */}
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
              {/* <button type="button" class="btn btn-primary" onClick={()=>ChangeStatus()}>
                Update
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* view popup end  */}
    </>
  );
};
export default CampaignReport;
