import axios from "axios";
import moment from 'moment';
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useMemo } from "react";
import { styled } from "styled-components";

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


const TransactionLog = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [usertransacLog, setUserTransacLog] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    GetAlltransactionLogs();
    const theme=localStorage.getItem("theme");
    document.body.className=theme;
  }, []);
  const GetAlltransactionLogs = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getTransactionAll`,
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
          setUserTransacLog(response.data.data);
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
      .delete(`${BASE_URL}admin/deleteTransaction/${id}`, {
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
          GetAlltransactionLogs();
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filteredItems = usertransacLog.filter(
    (item) =>
      item.user_details.length>0 && item.user_details[0].name.toLowerCase().includes(filterText.toLowerCase())
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
      name: "Cusmoter Name",
      selector: (row) => (row.user_details.length > 0 ? row.user_details[0].name: ""),
    },
    {
      name: "Credit Type",
      selector: (row) =>row.credit_type,
    },
    {
      name: "No of SMS",
      selector: 
      (row) => row.NoOfSms,
    },
    {
      name: "Per SMS Price",
      selector: (row) => row.PerSmsPrice
    },
    {
      name: "Transaction Id",
      selector: (row) => row.TransactionId,
    },

    {
      name: "Transaction date",
      selector: (row) =>moment(row.createdAt).format("DD-MM-YYYY hh:mm A ")
    },{
      name:"Action",
      selector:(row)=>    <button
      className="btn btn-danger"
      onClick={() => deleteTransactionLog(row._id)}
    >
      <i className="fa fa-trash"></i>
    </button>
    }


  ];







  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />
        <div className="content-body" >
        <div className="page-titles  ">
        <ol className="breadcrumb">
          <li><h5 className="bc-title">Transaction log</h5></li>
          <li className="breadcrumb-item"><a href="javascript:void(0)">
              <svg width={17} height={17} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.125 6.375L8.5 1.41667L14.875 6.375V14.1667C14.875 14.5424 14.7257 14.9027 14.4601 15.1684C14.1944 15.4341 13.8341 15.5833 13.4583 15.5833H3.54167C3.16594 15.5833 2.80561 15.4341 2.53993 15.1684C2.27426 14.9027 2.125 14.5424 2.125 14.1667V6.375Z" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.375 15.5833V8.5H10.625V15.5833" stroke="#2C2C2C" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Home </a>
          </li>
          <li className="breadcrumb-item active"><a href="javascript:void(0)">Transaction log:-</a></li>
        </ol>
        {/* <a className="text-primary fs-13" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">+ Add Task</a> */}
      </div>
          <div className="col-12 bst-seller pt-4" style={{padding:"30px",paddingTop:"40px"}}>
            <div className="card">
              <div className="card-body p-0" >
                <div className="card-header">
                <div className="tbl-caption">
                    <h4 className="heading mb-0 ps-3 p-2">
                      <i className="fa fa-pen"></i>&nbsp;&nbsp;Transaction Log
                    </h4>
                    <div>
                      {/* <button  className="btn btn-success">Download</button> */}
                    </div>
                  </div>
                </div>
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
                

                  {/* data table start  */}
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

                  {/* data table end  */}

                  {/* <hr style={{ margin: "0", padding: "0" }} /> */}
                  {/* <div className="container">
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
                        
                          <th>Customer Name</th>
                          <th>Credit type </th>
                          <th>No of SMS </th>
                          <th>Per SMS price</th>
                          

                          <th>Transaction Id</th>
                          <th>Transaction Date </th>
                          <th>Actions </th>
                        </tr>
                      </thead>
                      <tbody>
                        {usertransacLog.length > 0 &&
                          usertransacLog.map((item, index) => (
                            <tr>
                             
                              <td>
                                <span>
                                  {item.user_details.length > 0
                                    ? item.user_details[0].name
                                    : ""}
                                </span>
                              </td>
                              <td className="text-center">
                                <span>{item.credit_type}</span>
                              </td>
                              <td className="text-center"> {item.NoOfSms}</td>
                              <td className="text-center">
                                <span>{item.PerSmsPrice}</span>
                              </td>

                              <td className="text-center">{item._id}</td>
                              <td className="text-center">
                                {moment(item.createdAt).format("DD-mm-yyyy hh:mm A")}
                                
                              </td>
                              <td className="text-center">
                                {" "}
                               
                                &nbsp; &nbsp;
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteTransactionLog(item._id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>{" "}
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
export default TransactionLog;
