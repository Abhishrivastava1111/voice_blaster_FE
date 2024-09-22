import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Profile = (props) => {
  const navigate = useNavigate();
  const [src, setSrc] = useState("images/avatar/pencil.jpg");
  // const inputFile = useRef(null);

  const initialState = {
    name: "",
    email: "",
    password: "",
    company: "",
    status: "",
    mobile_no: "",
    usertype: "",
    address: "",
    address2: "",
    state: "",
    city: "",
    profile_image: "",
    // zip_code:""
  };
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [profileinfo, setProfileInfo] = useState([]);
  const [profileImage, setProfileImage] = useState(undefined);
  const [values, setValues] = useState(initialState);
  useEffect(() => {
    getProfileInfo();
    const theme = localStorage.getItem("theme");
    document.body.className = theme;

    // setValues("")
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const getProfileInfo = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BASE_URL}auth/view-profile`, {
        headers: {
          "Content-Type": "Application/json",
          version: "1.0.0",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        if (response.data.success == false) {
          // toast.error(response.data.message);

          if (response.data.error_code === 461) {
            navigate("/login");
          }
        } else {
          setProfileInfo(response.data.data);
          console.log(response.data.data);
          setValues(response.data.data);
          // toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateProinfo = () => {
    const token1 = localStorage.getItem("token");

    const formData = new FormData();
    // formData.append("email", profileinfo.email);
    formData.append("mobile_no", values.mobile_no);
    // formData.append("status", values.status)
    formData.append("name", values.name);
    formData.append("address", values.address);
    if (profileImage != undefined) {
      formData.append("profile_image", profileImage[0]);
    }

    // formData.append("state", values.state);
    // formData.append("city", values.city);
    formData.append("company", values.company);

    // console.log("in the function")

    axios
      .post(`${BASE_URL}auth/update-profile`, formData, {
        headers: {
          "x-access-token": `${token1}`,
          "Content-Type": "multipart/form-data",
          version: "1.0.0",
        },
      })
      .then((response) => {
        if (response.data.success == false) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          // defaultprevent();
          getProfileInfo();
          window.location.reload();

          // setValues({...values, [e.target.name]:""})
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div id="main-wrapper">
        <Header
          name={profileinfo.name}
          email={profileinfo.email}
          balance={profileinfo.balance}
        />

        <Sidebar />
        <div className="content-body">
          <div className="page-titles">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="javascript:void(0)">Home</a>
              </li>
              <li className="breadcrumb-item active">
                <a href="javascript:void(0)">Profile</a>
              </li>
            </ol>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="profile card card-body px-3 pt-3 pb-0">
                  <div className="profile-head">
                    <div className="photo-content">
                      <div className="cover-photo rounded" />
                    </div>
                    <div className="profile-info">
                      <div className="profile-photo">
                        <img
                          src={profileinfo.profile_image}
                          className="img-fluid rounded-circle"
                          style={{ aspectRatio: "1/1" }}
                          alt
                        />
                        {/* <button

                          className="rounded-circle"
                          style={{ width: "33px", position: "relative", top: -27, left: "55px", backgroundColor: "#fff" }}

                          type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        >
                          <img src={src} className="img-fluid rounded-circle" alt="upload img" />
                        </button> */}

                        {/* <input type="file" /> */}

                        {/* popup code start */}
                        <div
                          class="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1
                                  class="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Modal title
                                </h1>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">...</div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button type="button" class="btn btn-primary">
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* popup code end  */}
                      </div>
                      <div className="profile-details">
                        <div className="profile-name px-3 pt-2">
                          {/* <h4 className="text-primary mb-0">name</h4> */}
                          <p>{profileinfo.name}</p>
                        </div>
                        <div className="profile-email px-2 pt-2">
                          {/* <h4 className="text-muted mb-0">Email</h4> */}
                          <p>{profileinfo.email}</p>
                        </div>
                        {/* <div className="dropdown ms-auto">
                          <a
                            href="#"
                            className="btn btn-primary light sharp"
                            data-bs-toggle="dropdown"
                            aria-expanded="true"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              version="1.1"
                            >
                              <g
                                stroke="none"
                                strokeWidth={1}
                                fill="none"
                                fillRule="evenodd"
                              >
                                <rect x={0} y={0} width={24} height={24} />
                                <circle fill="#000000" cx={5} cy={12} r={2} />
                                <circle fill="#000000" cx={12} cy={12} r={2} />
                                <circle fill="#000000" cx={19} cy={12} r={2} />
                              </g>
                            </svg>
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li className="dropdown-item">
                              <i className="fa fa-user-circle text-primary me-2" />
                              view profile
                            </li>
                            <li className="dropdown-item">
                              <i className="fa fa-users text-primary me-2" />{" "}
                              Add to close friends
                            </li>
                            <li className="dropdown-item">
                              <i className="fa fa-plus text-primary me-2" /> Add
                              to group
                            </li>
                            <li className="dropdown-item">
                              <i className="fa fa-ban text-primary me-2" />{" "}
                              Block
                            </li>
                          </ul>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <div className="profile-statistics">
                      <div className="text-center">
                        <div className="row">
                          <div className="col">
                            <h3 className="m-b-0">{profileinfo.balance}</h3>
                            <span>Balance</span>
                          </div>
                          <div className="col">
                            <h3 className="m-b-0">100</h3>
                            <span>number of users</span>
                          </div>
                          <div className="col">
                            <h3 className="m-b-0">500</h3>
                            <span>number of Campaign</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-primary mb-1 me-1"
                          >
                            Follow
                          </a>
                          <a
                            href="javascript:void(0);"
                            className="btn btn-primary mb-1"
                            data-bs-toggle="modal"
                            data-bs-target="#sendMessageModal"
                          >
                            Send Message
                          </a>
                        </div>
                      </div>
              
                      <div className="modal fade" id="sendMessageModal">
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Send Message</h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              />
                            </div>
                            <div className="modal-body">
                              <form className="comment-form">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="mb-3">
                                      <label className="text-black font-w600 form-label">
                                        Name <span className="required">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="Author"
                                        name="Author"
                                        placeholder="Author"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="mb-3">
                                      <label className="text-black font-w600 form-label">
                                        Email{" "}
                                        <span className="required">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="Email"
                                        placeholder="Email"
                                        name="Email"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div className="mb-3">
                                      <label className="text-black font-w600 form-label">
                                        Comment
                                      </label>
                                      <textarea
                                        rows={4}
                                        className="form-control h-50"
                                        name="comment"
                                        placeholder="Comment"
                                        defaultValue={""}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div className="mb-3 mb-0">
                                      <input
                                        type="submit"
                                        defaultValue="Post Comment"
                                        className="submit btn btn-primary"
                                        name="submit"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="row">
              <div className="col-12">
                <div className="card h-auto">
                  <div className="card-body">
                    <div className="profile-tab">
                      <div className="custom-tab-1">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              href="#about-me"
                              data-bs-toggle="tab"
                              className="nav-link active show"
                            >
                              Personal Information
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#profile-settings"
                              data-bs-toggle="tab"
                              className="nav-link"
                            >
                              Account Setting
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div
                            id="about-me"
                            className="tab-pane fade active show"
                          >
                            {/* <div className="profile-about-me">
                <div className="pt-4 border-bottom-1 pb-3">
                  <h4 className="text-primary">About Me</h4>
                  <p className="mb-2">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence was created for the bliss of souls like mine.I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.</p>
                  <p>A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p>
                </div>
              </div> */}
                            {/* <div className="profile-skills mb-5">
                <h4 className="text-primary mb-2">Skills</h4>
                <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Admin</a>
                <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Dashboard</a>
                <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Photoshop</a>
                <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Bootstrap</a>
                <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Responsive</a>
                <a href="javascript:void(0);" className="btn btn-primary light btn-xs mb-1">Crypto</a>
              </div> */}
                            {/* <div className="profile-lang  mb-5">
                <h4 className="text-primary mb-2">Language</h4>
                <a href="javascript:void(0);" className="text-muted pe-3 f-s-16"><i className="flag-icon flag-icon-us" /> English</a> 
                <a href="javascript:void(0);" className="text-muted pe-3 f-s-16"><i className="flag-icon flag-icon-fr" /> French</a>
                <a href="javascript:void(0);" className="text-muted pe-3 f-s-16"><i className="flag-icon flag-icon-bd" /> Bangla</a>
              </div> */}
                            <div className="profile-personal-info">
                              {/* <h6 className="text-primary mb-4">
                                Personal Information
                              </h6> */}

                              <div className="p-5">
                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h6 className="f-w-500">
                                      Name <span className="pull-end">:</span>
                                    </h6>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    <span>{profileinfo.name}</span>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h6 className="f-w-500">
                                      Email <span className="pull-end">:</span>
                                    </h6>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    <span>{profileinfo.email}</span>
                                  </div>
                                </div>

                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h6 className="f-w-500">
                                      Company Name{" "}
                                      <span className="pull-end">:</span>
                                    </h6>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    <span>{profileinfo.company}</span>
                                  </div>
                                </div>

                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h6 className="f-w-500">
                                      Mobile Number{" "}
                                      <span className="pull-end">:</span>
                                    </h6>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    <span>{profileinfo.mobile_no}</span>
                                  </div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h6 className="f-w-500">
                                      Address{" "}
                                      <span className="pull-end">:</span>
                                    </h6>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    <span>{profileinfo.address}</span>
                                  </div>
                                </div>

                                <div className="row mb-2">
                                  <div className="col-sm-3 col-5">
                                    <h6 className="f-w-500">
                                      Status <span className="pull-end">:</span>
                                    </h6>
                                  </div>
                                  <div className="col-sm-9 col-7">
                                    <span>{profileinfo.status}</span>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="row mb-2">
                                <div className="col-sm-3 col-5">
                                  <h6 className="f-w-500">Address 2  <span className="pull-end">:</span></h6>
                                </div>
                                <div className="col-sm-9 col-7"><span>{profileinfo.address2}</span>
                                </div>
                              </div> */}
                              {/* <div className="row mb-2">
                                <div className="col-sm-3 col-5">
                                  <h6 className="f-w-500">State  <span className="pull-end">:</span></h6>
                                </div>
                                <div className="col-sm-9 col-7"><span>{profileinfo.state}</span>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-sm-3 col-5">
                                  <h6 className="f-w-500">City  <span className="pull-end">:</span></h6>
                                </div>
                                <div className="col-sm-9 col-7"><span>{profileinfo.city}</span>
                                </div>
                              </div> */}
                              {/* <div className="row mb-2">
                  <div className="col-sm-3 col-5">
                    <h5 className="f-w-500">Zipe Code  <span className="pull-end">:</span></h5>
                  </div>
                  <div className="col-sm-9 col-7"><span>{profileinfo.zip_code}</span>
                  </div>
                </div> */}
                              {/* <div className="row mb-2">
                  <div className="col-sm-3 col-5">
                    <h5 className="f-w-500">Password <span className="pull-end">:</span></h5>
                  </div>
                  <div className="col-sm-9 col-7"><span>{profileinfo.password}</span>
                  </div>
                </div> */}

                              {/* <div className="row mb-2">
                  <div className="col-sm-3 col-5">
                    <h5 className="f-w-500">Age <span className="pull-end">:</span>
                    </h5>
                  </div>
                  <div className="col-sm-9 col-7"><span>27</span>
                  </div>
                </div> */}
                              {/* <div className="row mb-2">
                  <div className="col-sm-3 col-5">
                    <h5 className="f-w-500">Location <span className="pull-end">:</span></h5>
                  </div>
                  <div className="col-sm-9 col-7"><span>Rosemont Avenue Melbourne,
                      Florida</span>
                  </div>
                </div> */}
                              {/* <div className="row mb-2">
                  <div className="col-sm-3 col-5">
                    <h5 className="f-w-500">Year Experience <span className="pull-end">:</span></h5>
                  </div>
                  <div className="col-sm-9 col-7"><span>07 Year Experiences</span>
                  </div>
                </div> */}
                            </div>
                          </div>
                          <div id="profile-settings" className="tab-pane fade">
                            <div className="pt-3">
                              <div className="settings-form">
                                {/* <h4 className="text-primary">
                                  Account Setting
                                </h4> */}
                                {/* <form> */}
                                <div className="row">
                                  <div className="mb-3 col-md-6">
                                    <label className="form-label">name</label>
                                    <input
                                      type="text"
                                      placeholder="name"
                                      className="form-control"
                                      name="name"
                                      value={values.name}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="mb-3 col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      // defaultValue={profileinfo.email}
                                      name="email"
                                      value={profileinfo.email}
                                      //  onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="mb-3 col-md-6">
                                    <label className="form-label">
                                      Mobile Number
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Mobile number"
                                      className="form-control"
                                      name="mobile_no"
                                      value={values.mobile_no}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="mb-3 col-md-6">
                                    <label className="form-label">
                                      Profile Image
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      name="profile_image"
                                      onChange={(e) =>
                                        setProfileImage(e.target.files)
                                      }
                                    />
                                  </div>
                                  {/* <div className="mb-3 col-md-6">
                                    <label className="form-label">Status</label>
                                    <select className="form-control"
                                      name="status"
                                      value={values.status}
                                      onChange={handleChange}
                                    >
                                      <option value="select">--select--</option>
                                      <option value="Active">Active</option>
                                      <option value="Inactive">Inactive</option>

                                    </select>
                                  </div> */}
                                </div>

                                <div className="row">
                                  <div className="mb-3 col-md-6">
                                    <label className="form-label">
                                      Address
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Address 1"
                                      className="form-control"
                                      name="address"
                                      value={values.address}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  {/* <div className="mb-3 col-md-6">
                                    <label className="form-label">Address 2</label>
                                    <input type="text" placeholder="Address 2" className="form-control"
                                      name="address2"
                                      value={values.address2}
                                      onChange={handleChange}
                                    />
                                  </div> */}

                                  <div className="mb-3 col-md-6">
                                    <label className="form-label">
                                      Company Name
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Company name:"
                                      className="form-control"
                                      name="company"
                                      value={values.company}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                {/* <div className="row">
                                  <div className="mb-3 col-md-6">
                                    <label className="form-label">User Type:</label>
                                    <select className="form-control"
                                      name="usertype"
                                      value={values.usertype}
                                      onChange={handleChange}
                                    >
                                      <option value="select">--select--</option>
                                      <option value="user">User</option>
                                      <option value="Reseller">Reseller</option>
                                    </select>
                                  </div>
                                </div> */}

                                {/* <div className="row">
                                  <div className="mb-3 col-md-6">
                                    <label className="form-label">State</label>
                                    <input type="text" placeholder="State:" className="form-control"
                                      name="state"
                                      value={values.state}
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="mb-3 col-md-6">
                                    <label className="form-label">City</label>
                                    <select className="form-control" placeholder="city"
                                      name="city"
                                      value={values.city}
                                      onChange={handleChange}
                                    >
                                      <option value="select">--select--</option>
                                      <option value="gwalior">Gwalior</option>
                                      <option value="guna">Guna</option>

                                    </select>
                                   
                                  </div>
                                </div> */}

                                {/* <div className="row">
                      <div className="mb-3 col-md-6">
                        <label className="form-label">City</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3 col-md-4">
                        <label className="form-label">State</label>
                        <select className="form-control default-select wide profile-page" id="inputState">
                          <option selected>Choose...</option>
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                        </select>
                      </div>
                      <div className="mb-3 col-md-2">
                        <label className="form-label">Zip</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div> */}
                                {/* <div className="mb-3">
                                  <div className="form-check custom-checkbox">
                                    <input type="checkbox" className="form-check-input" id="gridCheck" />
                                    <label className="form-check-label form-label" htmlFor="gridCheck"> Check me out</label>
                                  </div>
                                </div> */}
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => UpdateProinfo()}
                                >
                                  Update Profile
                                </button>
                                {/* </form> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Modal */}
                      <div className="modal fade" id="replyModal">
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Post Reply</h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              />
                            </div>
                            <div className="modal-body">
                              <form>
                                <textarea
                                  className="form-control h-50"
                                  rows={4}
                                  defaultValue={"Message"}
                                />
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger light"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="button" className="btn btn-primary">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
export default Profile;
