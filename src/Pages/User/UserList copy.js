import react, { useEffect, useState, memo } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const UserList = () => {
  const initialState = {
    name: "",
    email: "",
    mobile_no: "",
    role: "",
    password: "",
    profile_image: "",
    status: "",
    company: "",
  };
  let token = localStorage.getItem("token");
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [userProfile, setUserProfile] = useState(undefined);

  const [userToken, setUserToken] = useState(token);
  const [id, setID] = useState("");

  const [users, setUsers] = useState([]);

  const [show, setShow] = useState(false);

  const [showUserModel, setShowUserModel] = useState(false);

  const [credittype, setCreditType] = useState("");
  const [numofSMS, setNumOfSMS] = useState(0);
  const [perSMSprice, setPerSMSPrice] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setID(id);
    setShow(true);
  };

  const handleUserModelShow = (item = {}) => {
    console.log(item);
    if (Object.keys(item).length > 0) {
      setID(item._id);
      item.password = "";
      setValues(item);
      // setValues({password:""})
    }

    setShowUserModel(true);
  };

  const handleUserModelClose = () => setShowUserModel(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
  };

  useEffect(() => {
    let token1 = localStorage.getItem("token");
    setUserToken(token1);
    if (token1 == null) {
      navigate("/login");
    }
    getAllUser();
  }, []);

  const getAllUser = () => {
    let token2 = localStorage.getItem("token");
    axios
      .post(
        `${BASE_URL}admin/getAllUser`,
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
          toast.error(response.data.message);

          if (response.data?.error_code === 461) {
            navigate("/login");
          }
        } else {
          // toast.success(response.data.message);
          // console.log(response.data.message);
          // localStorage.setItem("user",response.data.data);
          // localStorage.setItem("token", response.data.data.token);

          setUsers(response.data.data);
          console.log("response.data.data", response.data.data);
          // navigate("/")
        }
      })
      .catch(function (error) {
        toast.error(error);
      });
  };
  const submit = () => {
    console.log("demo ==>");
    let token = localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    // console.log("values >>>",values);
// return;
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("mobile_no", values.mobile_no);
    formData.append("role", values.role);
    if (id) {
      formData.append("_id", id);
    } else {
      formData.append("password", values.password);
    }
    // if (userProfile != undefined) {
      formData.append("profile_image", userProfile[0]);
    // }

    formData.append("status", values.status);
    formData.append("company", values.company);

    axios
      .post(`${BASE_URL}admin/addUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          version: "1.0.0",
          "x-access-token": token,
        },
      })
      .then(function (response) {
        if (response.data.success === false) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          setValues(initialState);
          setShowUserModel(false);
          getAllUser();
        }
      })
      .catch(function (error) {
        toast.error(error);
      });
  };

  const DeleteUser = (id) => {
    // console.log("delete api called");
    const token3 = localStorage.getItem("token");
    axios
      .delete(`${BASE_URL}admin/deleteUser/${id}`, {
        headers: {
          "x-access-token": `${token3}`,
          version: "1.0.0",
        },
      })
      .then((response) => {
        if ((response.data.success = false)) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          getAllUser();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddBalance = () => {
    const obj = {
      user: id,
      credit_type: credittype,
      NoOfSms: numofSMS,
      PerSmsPrice: perSMSprice,
    };
    const token4 = localStorage.getItem("token");
    axios
      .post(`${BASE_URL}admin/addBalance`, obj, {
        headers: {
          "x-access-token": `${token4}`,
          version: "1.0.0",
        },
      })
      .then((response) => {
        if (response.data.success == false) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          setID();
          setShow(false);
          getAllUser();
          setCreditType("");
          setNumOfSMS(0);
          setPerSMSPrice(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="main-wrapper">
      <Header />

      <Sidebar />

      <div className="content-body">
        <div>
          <div className="page-titles">
            <ol className="breadcrumb">
              <li>
                <h5 className="bc-title">User List</h5>
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
                  User List{" "}
                </a>
              </li>
              <li className="breadcrumb-item active">
                <a href="javascript:void(0)">User List</a>
              </li>
            </ol>
            {/* <a
                className="text-primary fs-13"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample1"
                role="button"
                aria-controls="offcanvasExample1"
              >
                + Add Task
              </a> */}
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body p-0">
                    <div className="table-responsive active-projects style-1">
                      <div className="tbl-caption">
                        <h4 className="heading mb-0">User List</h4>
                        <div>
                          {/* <a className="btn btn-primary btn-sm"  data-toggle="modal" data-target="#exampleModal">+ Add User</a>
                           */}

                          <Button
                            variant="primary"
                            onClick={handleUserModelShow}
                          >
                            Add User +
                          </Button>
                          {/* <button type="button" className="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                    + Invite Employee
                  </button> */}
                        </div>
                      </div>
                      <table id="empoloyees-tblwrapper" className="table">
                        <thead>
                          <tr>
                            <th>S No.</th>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No.</th>
                            <th>Balance</th>
                            {/* <th>Gender</th>
                    <th>Location</th> */}
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.length > 0 &&
                            users.map((item, index) => (
                              <tr>
                                <td>
                                  <span>{index + 1}</span>
                                </td>

                                <td>
                                  <span>
                                    {item.role == 1 ? "User" : "Reseller"}
                                  </span>
                                </td>

                                <td>
                                  <div className="products">
                                    {/* <img
                                        src={item.profile_image}
                                        className="avatar avatar-md"
                                        alt
                                      /> */}
                                    <div>
                                      <h6>{item.name}</h6>
                                      {/* <span>Web Designer</span>	 */}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span>{item.email}</span>
                                </td>
                                <td>
                                  <span className="text-primary">
                                    {item.mobile_no}
                                  </span>
                                </td>
                                <td>
                                  <span>{item.balance}</span>
                                </td>

                                <td>
                                  <span className="badge badge-success light border-0">
                                    {item.status}
                                  </span>
                                </td>

                                <td>
                                  <div>
                                    <div>
                                      <button
                                        className="btn btn-info"
                                        onClick={() =>
                                          handleUserModelShow(item)
                                        }
                                      >
                                        <i className="fa fa-pencil" />
                                      </button>
                                      &nbsp;&nbsp;
                                      <button
                                        className="btn btn-primary"
                                        onClick={() => handleShow(item._id)}
                                      >
                                        <i
                                          className="fa fa-inr"
                                          style={{ fontSize: 17 }}
                                        />
                                      </button>
                                      &nbsp;&nbsp;
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => DeleteUser(item._id)}
                                      >
                                        <i className="fa fa-trash" />
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
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

      {/***********************************
     Footer end
 ************************************/}
      {/***********************************
    Support ticket button start
 ************************************/}
      {/***********************************
    Support ticket button end
 ************************************/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {/* <label>User Id:</label>
          <input type="text" className="form-control" 
          value={id}
          /> */}
          <label>Credit type:</label>
          <select
            className="form-control"
            name="credittype"
            value={credittype}
            onChange={(e) => setCreditType(e.target.value)}
          >
            <option value="select Credit type">---select Credit type---</option>
            <option value="Add">Add</option>
            <option value="Remove">Remove</option>
          </select>
          <label>No of SMS</label>
          <input
            type="number"
            className="form-control"
            value={numofSMS}
            onChange={(e) => setNumOfSMS(e.target.value)}
          />
          <label>Per SMS Price</label>
          <input
            type="number"
            className="form-control"
            value={perSMSprice}
            onChange={(e) => setPerSMSPrice(e.target.value)}
          />
          {/* <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
          {/* <textarea className="form-control" rows={3}></textarea> */}
          {/* <br></br> */}
          {/* <span>Tax Included:</span>&nbsp;&nbsp;&nbsp; */}
          {/* <input type="checkbox" /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => AddBalance()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUserModel} onHide={handleUserModelClose}>
        <Modal.Header closeButton>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <label>User Type:</label>
          <select className="form-control" onChange={handleChange} name="role">
            <option value="">---Select type---</option>
            <option selected={values.role === "1" ? true : false} value="1">
              User
            </option>
            <option selected={values.role === "2" ? true : false} value="2">
              Reseller
            </option>
          </select>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
          <label>Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            onChange={handleChange}
            value={values.company}
            // onChange={(e) => setNumOfSMS(e.target.value)}
          />
          <label>Email ID</label>
          <input
            type="text"
            name="email"
            value={values.email}
            className="form-control"
            onChange={handleChange}
            // value={perSMSprice}
            // onChange={(e) => setPerSMSPrice(e.target.value)}
          />
          <label>Mobile No.</label>
          <input
            type="text"
            name="mobile_no"
            value={values.mobile_no}
            className="form-control"
            onChange={handleChange}
          />
          <label>Profile</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setUserProfile(e.target.files)}
          />
          <div style={{ display: id ? "none" : "block" }}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <label>Status:</label>
          <select
            name="status"
            className="form-control"
            onChange={handleChange}
          >
            <option value="">---Select Status---</option>
            <option
              selected={values.status === "Active" ? true : false}
              value="Active"
            >
              Active
            </option>
            <option
              selected={values.status === "Inactive" ? true : false}
              value="Inactive"
            >
              Inactive
            </option>
          </select>
          {/* <textarea className="form-control" rows={3}></textarea> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUserModelClose}>
            Close
          </Button>
          <Button type="button" variant="primary" onClick={() => submit()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(UserList);
