import axios from "axios";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
// import Layout from '../../Components/Layout';

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { styled } from "styled-components";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";


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
      placeholder="Filter By Title"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const Notes = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const [noteslist, setNotesList] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    GetData();
    const theme=localStorage.getItem("theme");
  document.body.className=theme;
  }, []);

  const OnSubmit = () => {
    //  console.log("submitted");
    // toast.success("Submitted successfully")
    // const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("token");

    const obj = {
      title: title,
      status: status,
    };

    axios
      .post(`${BASE_URL}admin/addNotes`, obj, {
        headers: {
          "x-access-token": `${token}`,
          "Content-Type": "Application/json",
          version: "1.0.0",
        },
      })
      .then((response) => {
        if (response.data.data == false) {
          //toast.error(response.data.message);
        } else {
          // console.log("")
          toast.success(response.data.message);
          setTitle("");
          setStatus("");
          GetData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetData = () => {
    // console.log("API Hit successfully");
    // const BASE_URL = process.env.REACT_APP_BASE_URL;
    setNotesList([]);
    const token1 = localStorage.getItem("token");

    axios
      .post(
        `${BASE_URL}admin/getNotes`,
        {},
        {
          headers: {
            "x-access-token": `${token1}`,
            version: "1.0.0",
          },
        }
      )
      .then((response) => {
        if (response.data.data == false) {
         // toast.error(response.data.message);
        } else {
          // GetData();
          setNotesList(response.data.data);
          // console.log("response",response.data.data);
          // toast.success(response.data.message);
        }
      });
  };

  const DeleteNotesListItem = (id) => {
    const token3 = localStorage.getItem("token");

    axios
      .delete(`${BASE_URL}admin/deleteNotes/${id}`, {
        headers: {
          "x-access-token": `${token3}`,
          version: "1.0.0",
        },
      })
      .then((response) => {
        if (response.data.data == false) {
          //toast.error(response.data.message);
        } else {
          setNotesList([]);
          console.log("delete response", response.data.data);
          toast.success(response.data.message);
          GetData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const filteredItems = noteslist.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
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
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Status",
      selector: (row) =>row.status,
    },
    {
      name: "Action",
      selector: (row)=> (
      <div>
      <button
        className="btn btn-danger"
        onClick={() => DeleteNotesListItem(row._id)}
      >
        <i className="fa fa-trash"></i>
      </button>
      </div>
      ),
      
    }
   
  
  ];
  

  
  return (
    <>
      <div id="main-wrapper" className="main-body">
        <Header />

        <Sidebar />

        <div fluid className="mt-3 mb-3" >
          <div className="content-body">
            <div>
            <div className="page-titles  ">
        <ol className="breadcrumb">
          <li><h5 className="bc-title">Notes</h5></li>
          <li className="breadcrumb-item"><a href="javascript:void(0)">
              <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.125 6.375L8.5 1.41667L14.875 6.375V14.1667C14.875 14.5424 14.7257 14.9027 14.4601 15.1684C14.1944 15.4341 13.8341 15.5833 13.4583 15.5833H3.54167C3.16594 15.5833 2.80561 15.4341 2.53993 15.1684C2.27426 14.9027 2.125 14.5424 2.125 14.1667V6.375Z" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.375 15.5833V8.5H10.625V15.5833" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Home </a>
          </li>
          <li className="breadcrumb-item active"><a href="javascript:void(0)">Notes:-</a></li>
        </ol>
        {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
      </div>
        
            </div>
            <div className="" style={{padding:"30px"}}>
            <div className="card">
              <div className="card-header ps-3">Notes:-</div>
              <div className="card-body p-0">
                <div className="row m-3">


                  <div className="col-12 col-xs-12 col-sm-12 col-md-2">
                    <label className="m-2">Title:-</label>
                  </div>
                  <div className="col">
                    <textarea
                      rows={4}
                      cols={4}
                      className="form-control"
                      placeholder="Enter Title here:-"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                  </div>

                </div>

                <div className="row m-3">
                  <div className="col-12 col-xs-12 col-sm-12 col-md-2">
                    <label className="m-2">Status:-</label>
                  </div>
                  <div className="col">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="0">--select-- </option>
                      <option value="Active">Active </option>

                      <option value="Inactive">Inactive </option>
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center m-5">
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={() => OnSubmit()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 active-p">
              <div className="card">
                <div className="card-header">
                <div className="tbl-caption">
                      <h4 className="heading mb-0 ps-3">Notes Listing:-</h4>
                    </div>
                </div>
                <div className="card-body p-3">
                  <div className="table-responsive active-projects shorting">
                    

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
                selectableRows
                persistTableHead
              />


                    {/* <table id="projects-tbl" className="table ItemsCheckboxSec">
                      <thead>
                        <tr>
                          <th>
                            <div className="form-check custom-checkbox ms-0">
                              <input
                                type="checkbox"
                                className="form-check-input checkAllInput"
                                required
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkAll"
                              />
                            </div>
                          </th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {noteslist.length > 0 &&
                          noteslist.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <div className="form-check custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customCheckBox2"
                                    required
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="customCheckBox2"
                                  />
                                </div>
                              </td>
                              <td>{item.title}</td>
                              <td className="">
                                <span className="badge badge-primary light border-0">
                                  {item.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => DeleteNotesListItem(item._id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}

               
                      </tbody>
                    </table> */}
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="copyright">
            <p>
              Copyright © Developed by{" "}
              <a href="https://dexignzone.com/" target="_blank">
                DexignZone
              </a>{" "}
              2023
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notes;
