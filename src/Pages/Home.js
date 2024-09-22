import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from '../Components/Sidebar';
import Dashboard from '../Components/Dashboard';
import Header from '../Components/Header';
import UserDashboard from '../Components/UserDashboard';
import moment from 'moment';
const Home = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  let role = localStorage.getItem("role");
  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token)
    if (token == null) {
      navigate("/login");
    }
  }, []);

  //getAllNotes
  useEffect(() => {
    getAllNotes();
  }, []);

  const [notes, setNotes] = useState([]);

  const getAllNotes = () => {
    let token2 = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getAllNotes`,
        {},
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

          // if (response.data?.error_code === 461) {
          //   navigate("/login");
          // }
        } else {
          // toast.success(response.data.message);
          // console.log(response.data.message);
          // localStorage.setItem("user",response.data.data);
          // localStorage.setItem("token", response.data.data.token);

          setNotes(response.data.data);
          console.log("response.data.data", response.data.data);
          // navigate("/")
        }
      })
      .catch(function (error) {
        // toast.error(error);
      });
  };


  const [campaignreport, setCampaignReport] = useState([]);


  useEffect(() => {
    getAllSendMessage();
  }, []);

  const getAllSendMessage = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getAllLetestMessage`,
        {},
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
          setCampaignReport(response.data.data);
          console.log(response.data.data);
          // console.log(response.data.data);
          // toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const theme=localStorage.getItem("theme");
  document.body.className=theme;

  return (

    <div>
      {/********************
  Preloader start
    *********************/}
      {/* <div id="preloader">
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  </div> */}
      {/********************
  Preloader end
    *********************/}
      {/***********************************
  Main wrapper start
    ************************************/}
      <div id="main-wrapper">
        {/***********************************
      Nav header start
  ************************************/}
        <Header />
        {/***********************************
      Header end ti-comment-alt
  ************************************/}
        {/***********************************
      Sidebar start
  ************************************/}
        <Sidebar />
        {/***********************************
      Sidebar end
  ************************************/}
        {/***********************************
      Content body start
  ************************************/}
        <div className="content-body  " style={{height:"100vh"}}>
          {
            role!=3?(
              <>
            <UserDashboard/>

            <div className="container-fluid">
              <div className="row">
                {/* <div className="col-xl-8 col-lg-8 col-xxl-8 col-sm-8">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Recent Campaign</h4>
                      
                    </div>
                    <div className="card-body">
                      <div className="table-responsive recentOrderTable">
                        <table className="table verticle-middle table-responsive-md">
                          <thead>
                            <tr>
                            <th scope="col">S no.</th>
                              <th scope="col">Number Of Count</th>
                              <th scope="col">Created By</th>
                              <th scope="col">Created At</th>
                              <th scope="col">Status</th>
                          
                            </tr>
                          </thead>
                          <tbody>
                            {campaignreport.length>0 && campaignreport.map((item,index)=>
                                    <tr>
                                    <td>{index+1}</td>
                                 
                                    <td>{item.msg_count}</td>
                                    <td>  {item.createBy_user_details.length > 0
                                ? item.createBy_user_details[0].name
                                : ""}</td>
                                  <td>{item.createdAt}</td>
                                    <td>
                                      <span className="badge badge-rounded badge-warning">
                                        {item.status}
                                      </span>
                                    </td>
                          
                                  </tr>
                            )}
                    
             
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-4">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Notice</h4>
                    </div>

                    <div className="card-body pb-0">
                      {/* <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p> */}
                      <ul class="list-group list-group-flush noticelist">

                      {notes.length > 0 &&
                  notes.map((item, index) => (
                    <li class="list-group-item d-flex px-0 justify-content-between blink_me d-inline noticelist" style={{color:"red"}}>
                    <div className='d-inline'>   <i class="fa fa-circle " aria-hidden="true" style={{fontSize:"10px"}}/></div>&nbsp;&nbsp;
                 <div className='d-inline'>  {`${ item.title}`}</div>
                     
                       
                      </li>
                     
                  ))}
                       
                        {/* <li class="list-group-item d-flex px-0 justify-content-between">
                          <strong>Education</strong>
                         
                        </li>
                        <li class="list-group-item d-flex px-0 justify-content-between">
                          <strong>Designation</strong>
                       
                        </li>
                        <li class="list-group-item d-flex px-0 justify-content-between">
                          <strong>Operation Done</strong>
                         
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </>
            ):(
            <>
            <Dashboard />

            
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-xxl-8 col-sm-8">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Recent Campaign</h4>
                      
                    </div>
                    <div className="card-body">
                      <div className="table-responsive recentOrderTable">
                        <table className="table verticle-middle table-responsive-md">
                          <thead>
                            <tr>
                            <th scope="col" className='tableHead'>S no.</th>
                              {/* <th scope="col">Unique ID	.</th> */}
                              <th scope="col " className='tableHead'>Number Of Count</th>
                              <th scope="col" className='tableHead'>Created By</th>
                              <th scope="col" className='tableHead'>Created At</th>
                              <th scope="col" className='tableHead'>Status</th>
                              {/* <th scope="col">Bills</th> */}
                              {/* <th scope="col" /> */}
                            </tr>
                          </thead>
                          <tbody>
                            {campaignreport.length>0 && campaignreport.map((item,index)=>
                                    <tr>
                                    <td className='tabledata'>{index+1}</td>
                                    {/* <td>{item._id}</td> */}
                                    <td className='tabledata'>{item.msg_count}</td>
                                    <td className='tabledata'>  {item.createBy_user_details.length > 0
                                ? item.createBy_user_details[0].name
                                : ""}</td>
                                  <td className='tabledata'>
                                  {moment(item.createdAt).format("DD-MM-YYYY hh:mm A ")}
                                    </td>
                                    <td className='tabledata'>
                                      <span className="badge badge-rounded badge-warning">
                                        {item.status}
                                      </span>
                                    </td>
                          
                                  </tr>
                            )}
                    
             
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-xxl-4 col-sm-4">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Notice</h4>
                    </div>

                    <div class="card-body pb-0">
                      {/* <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p> */}
                      <ul class="list-group list-group-flush">

                      {notes.length > 0 &&
                  notes.map((item, index) => (
                  
                    <li class="list-group-item d-flex px-0 justify-content-between blink_me d-inline noticelist" style={{color:"red"}}>
                      <div className='d-inline'>   <i class="fa fa-circle " aria-hidden="true" style={{fontSize:"10px"}}/></div>&nbsp;&nbsp;
                   <div className='d-inline'>  {`${ item.title}`}</div>
                       
                         
                        </li>
                     
                  ))}
                       
                        {/* <li class="list-group-item d-flex px-0 justify-content-between">
                          <strong>Education</strong>
                         
                        </li>
                        <li class="list-group-item d-flex px-0 justify-content-between">
                          <strong>Designation</strong>
                       
                        </li>
                        <li class="list-group-item d-flex px-0 justify-content-between">
                          <strong>Operation Done</strong>
                         
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </>
            )
             
          }
          
        </div>
{/* {
  notes.length>0 && notes.map((item,index)=><p>{item.title}</p>)
} */}
        {/* <div className="footer">
          <div className="copyright">
            <p>Copyright © Developed by <a href="https://dexignzone.com/" target="_blank">DexignZone</a> 2023</p>
          </div>
        </div> */}
        {/***********************************
      Footer end
  ************************************/}
        {/***********************************
     Support ticket button start
  ************************************/}
        {/***********************************
     Support ticket button end
  ************************************/}
      </div>
    </div>



  )
}

export default memo(Home);
