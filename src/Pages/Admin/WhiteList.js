import axios from "axios";
import React from "react";
import { useEffect, useState, useMemo} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import moment from "moment";
import DataTable from "react-data-table-component";
import { styled } from "styled-components";
import { Button } from "react-bootstrap";


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

const WhiteList = () => {
    const navigate = useNavigate();
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
  const [whiteList, setWhiteList] = useState([]);
  const [values, setValues] = useState(initialState);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const theme=localStorage.getItem("theme");
    document.body.className=theme;
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

  const OnSubmit = () => {
    let obj={
        contact_no:mobile_no
    }

    const token = localStorage.getItem("token");
    axios
      .post(`${BASE_URL}admin/addWhiteList`, obj, {
        headers: {
          "x-access-token": `${token}`,
          "Content-Type": "Application/json",
          version: "1.0.0",
        },
      })
      .then((response) => {
        if (response.data.success == false) {
          // toast.error(response.data.message);
          console.log(response.data.message);
        } else {
          //toast.success("Submitted successfully")
          toast.success(response.data.message);
          getAllWhiteList();
          setNumberCounter("");
          //setAudio("");
          setMobile_No("");
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let token1 = localStorage.getItem("token");
    getAllWhiteList();
  
    
    if (token1 == null) {
      navigate("/login");
    }
   
  }, []);

  const getAllWhiteList = () => {
    console.log("get list");
    let token2 = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getAllWhiteList`,
        {
          page: "1",
        },
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

          setWhiteList(response.data.data);
          console.log(".data.data", response.data.data);
          // navigate("/")
        }
      })
      .catch(function (error) {
        toast.error(error);
      });
  };

  const DeleteItem = (id) => {
    // console.log("get list");
    // return;
    const token3 = localStorage.getItem("token");

    axios
      .delete(`${BASE_URL}admin/deleteWhiteList/${id}`, {
        headers: {
          "x-access-token": `${token3}`,
          version: "1.0.0",
        },
      })
      .then((response) => {
        // window.location.reload(false);
        getAllWhiteList();   getAllWhiteList();
        if (response.data.data == false) {
          toast.error(response.data.message);
        } else {
          // console.log("delete");
         
          setWhiteList([])
       
          
          // console.log("delete response", response.data.data);
          toast.success(response.data.message);
          
         
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const filteredItems = whiteList.filter(
    (item) =>
      item.phoneNo && item.phoneNo.toLowerCase().includes(filterText.toLowerCase())
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
      name: "Mobile Number",
      selector: (row) => row.phoneNo,
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
        onClick={() => DeleteItem(row._id)}
      >
        <i className="fa fa-trash"></i>
      </button>
      </div>),
      
    }
   

  ];

  return (
    <>
      <div id="main-wrapper ">
        <Header />
        <Sidebar />
        <div  className="   " >
      
      
          <div className="content-body " style={{height:"100vh"}}>
          <div className="page-titles  ">
        <ol className="breadcrumb">
          <li><h5 className="bc-title">White List</h5></li>
          <li className="breadcrumb-item"><a href="javascript:void(0)">
              <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.125 6.375L8.5 1.41667L14.875 6.375V14.1667C14.875 14.5424 14.7257 14.9027 14.4601 15.1684C14.1944 15.4341 13.8341 15.5833 13.4583 15.5833H3.54167C3.16594 15.5833 2.80561 15.4341 2.53993 15.1684C2.27426 14.9027 2.125 14.5424 2.125 14.1667V6.375Z" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.375 15.5833V8.5H10.625V15.5833" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Home </a>
          </li>
          <li className="breadcrumb-item active"><a href="javascript:void(0)">White List:-</a></li>
        </ol>
        {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
      </div>
      <div style={{padding:"30px"}}>
      <div className="card">
              <div className="card-header p-3">
                <span>
                  <i className="fa fa-pen"></i>&nbsp;&nbsp;White List Number
                </span>
              </div>
              <div className="card-body p-5">
                <div className="row m-3">
                  <div className="col-3 col-xs-3 col-sm-3 col-md-3 col-lg-2">
                    <label className="m-2">Enter Mobile Number:-</label>
                  </div>
                  <div className="col-9 col-xs-9 col-sm-9 col-md-9 col-lg-4  ">
                    <textarea
                      rows={4}
                      cols={4}
                      className="form-control inputType"
                      placeholder="Enter Mobile Here"
                      onChange={(e) => RowCount(e.target.value)}
                      name="mobile_no"
                      value={mobile_no}
                      // onChange={handleChange}
                    ></textarea>
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


               
             

                <div className="d-flex justify-content-center align-items-center m-5">
                  {" "}
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={() => OnSubmit()}
                  >
                    Submit
                  </button>
                </div>



              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h6>White List:-</h6>
              </div>
              <div className="card-body">
                
              <div className="col-12 active-p">
              {/* <div className="card"> */}
                {/* <div className="card-body p-0"> */}
                  <div className="table-responsive active-projects shorting">
                
                    {/* <table id="projects-tbl" className="table ItemsCheckboxSec">
                      <thead>
                        <tr>
                         
                          <th>Title</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {whiteList.length > 0 &&
                          whiteList.map((item, index) => (
                            <tr key={index}>
                             
                              <td>{item.phoneNo}</td>
                              <td className="">
                                <span className="badge badge-primary light border-0">
                                  {item.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => DeleteItem(item._id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}

                      
                      </tbody>
                    </table> */}


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

                  </div>
                {/* </div> */}
              {/* </div> */}
            </div>
              </div>
            </div>

      </div>
           
          </div>
          
        </div>

     
      </div>
    </>
  );
};
export default WhiteList;
