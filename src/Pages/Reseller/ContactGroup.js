import axios from "axios";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { styled } from "styled-components";
import moment from "moment";

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
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const ContactGroup = () => {
  const [numbercounter, setNumberCounter] = useState("");
  const [count, setCount] = useState();
  const [mobile_no, setMobile_No] = useState("");
  const [contactGroupName, setcontactGroupName] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [contactGroupData, setContactGroupData] = useState([]);
  const [filterText, setFilterText] = useState("");

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
    // {
    //   name: "group_name",
    //   selector: (row) => (row.user_details.length > 0 ? row.user_details[0].name: ""),
    // },
    {
      name: "Group Name",
      selector: (row) => row.group_name,
    },
    {
      name: "Contact Number Count",
      selector: (row) => row.contact_number_count,
    },

    {
      name: "Action",
      selector: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => deleteTransactionLog(row._id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ];
  // const filteredItems = contactGroupData.filter(
  //   (item) =>
  //     item.user_details.length>0 && item.user_details[0].name.toLowerCase().includes(filterText.toLowerCase())
  // );

  // const filteredItems = contactGroupData.filter();
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

  const deleteTransactionLog = (id) => {
    const token1 = localStorage.getItem("token");
    axios
      .delete(`${BASE_URL}admin/deleteContactGroup/${id}`, {
        headers: {
          "x-access-token": `${token1}`,
          version: "1.0.0",
          "Content-Type": "Application/json",
        },
      })
      .then((response) => {
        if (response.data.success == false) {
          toast.error(response.data.message);
        } else {
          GetAllContactGroup();
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.body.className = theme;
    if (numbercounter.length == 0) {
      setNumberCounter(0);
    }
  }, []);

  const RowCount = (text) => {
    // console.log(text);
    var lines = text.split(/\r|\r\n|\n/);
    console.log(lines);
    setCount(lines.length);
    // console.log("count", count);
    setNumberCounter(count);
    setMobile_No(text);
  };

  const OnSubmit = () => {
    // let formData = new FormData();
    // formData.append("contact_no", mobile_no);
    // formData.append("group_name", contactGroupName);
    const obj = {
      contact_no: mobile_no,
      group_name: contactGroupName,
    };
    const token = localStorage.getItem("token");

    axios
      .post(`${BASE_URL}admin/addContactGroup`, obj, {
        headers: {
          "x-access-token": `${token}`,
          "Content-Type": "Application/json",
          version: "1.0.0",
        },
      })
      .then((response) => {
        if (response.data.success == false) {
          toast.error(response.data.message);
          //   setLoading(false);
          // console.log(response.data.message);
        } else {
          //toast.success("Submitted successfully")
          GetAllContactGroup();
          toast.success(response.data.message);
          //   setLoading(false);
          setNumberCounter("");
          //setAudio("");
          setMobile_No("");
          //   setAudio("");
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  };
  return (
    <>
      <div id="main-wrapper">
        <Header />

        <Sidebar />

        <div fluid className="">
          <div className="content-body">
            <div className="page-titles  ">
              <ol className="breadcrumb">
                <li>
                  <h5 className="bc-title">Contact Group</h5>
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
                  <a href="javascript:void(0)">Contact Group:-</a>
                </li>
              </ol>
              {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
            </div>
            <div style={{ padding: "30px" }}>
              <div className="card">
                <div className="card-header p-3 ps-5">
                  <span>
                    <i className="fa fa-pen"></i>&nbsp;&nbsp;Contact group
                  </span>
                </div>
                <div className="card-body p-3">
                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">Group name:-</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4  ">
                      <input
                        type="text"
                        onChange={(e) => setcontactGroupName(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    {/* <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2 mt-2">
                                        <label className="m-2">Upload TXT:-</label>
                                    </div>
                                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4 mt-2">
                                        <input type="file" className="form-control" name="TXT"
                                        />
                                    </div> */}
                  </div>

                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">Enter Mobile Number:-</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4  ">
                      <textarea
                        rows={4}
                        cols={4}
                        className="form-control"
                        placeholder="Enter Mobile Here With Country Code"
                        onChange={(e) => RowCount(e.target.value)}
                      ></textarea>
                    </div>

                    {/* <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2 mt-2">
                                        <label className="m-2">Upload CSV:-</label>
                                    </div>
                                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4 mt-2">
                                        <input type="file" className="form-control" name="CSV"
                                        />
                                    </div> */}
                  </div>

                  <div className="row m-3">
                    <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                      <label className="m-2">Count:-</label>
                    </div>
                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4">
                      <input
                        type="text"
                        className="form-control"
                        name="numbercounter"
                        value={numbercounter}
                      />
                    </div>
                    {/* <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2 mt-2">
                                      <label>Upload xlsx:-</label>
                                    </div>
                                    <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4 mt-2">
                                       <input type='file' className='form-control'/>
                                    </div> */}
                  </div>

                  <div className="d-flex m-5">
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={() => OnSubmit()}
                    >
                      Submit
                    </button>
                  </div>

                  {/* listing */}
                  <>
                    <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
                      {/* data table start  */}
                      <DataTable
                        // columns={columns}
                        // data={users}
                        // pagination
                        // title="User List"
                        columns={columns}
                        data={contactGroupData}
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        // subHeaderComponent={subHeaderComponentMemo}
                        // selectableRows
                        persistTableHead
                      />
                    </div>
                  </>
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
export default ContactGroup;
