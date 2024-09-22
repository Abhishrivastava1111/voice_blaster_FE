import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();

  const [userToken, setUserToken] = useState();
  const [role, setRole] = useState(0);
  useEffect(() => {
    let token1 = localStorage.getItem("token");
    setUserToken(token1);
    if (token1 == null) {
      navigate("/login");
    }

    let uRole = localStorage.getItem("role");
    setRole(uRole);
    // getAllUser();
  }, []);


  return (
    <>
      <div className="deznav">
        <div className="deznav-scroll">
          <ul className="metismenu" id="menu">
            {/* <li className="menu-title">YOUR COMPANY</li> */}
            {role != 3 ? (
              <li>
                <a href="/" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Dashboard</span>
                </a>
              </li>
            ) : (
              <li>
                <a href="/admin-dashboard" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Dashboard</span>
                </a>
              </li>
            )}

            {role != 3 ? (
              <li>
                <a href="/send-whatsapp" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Send Whatsapp </span>
                </a>
              </li>
            ) : null}
            {role != 3 ? (
              <li>
                <a href="/contact-group" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Contact Group </span>
                </a>
              </li>
            ) : null}

            {role != 3 ? (
              <li>
                <a href="/campaign-report" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Campaign report </span>
                </a>
              </li>
            ) : null}

            {role == 3 ? (
              <li>
                <a
                  href="/admin-campaign-report"
                  className
                  aria-expanded="false"
                >
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Campaign report </span>
                </a>
              </li>
            ) : null}
            {/* <li><Link to="/voice_broadcast" className aria-expanded="false">
              <div className="menu-icon">
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.5 18.3333V10H12.5V18.3333" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>	
              <span className="nav-text">Voice Broad Casting </span>
            </Link>
          </li> */}

            {/* <li>
              <a
                className="has-arrow "
                href="javascript:void(0);"
                aria-expanded="false"
              >
                <div className="menu-icon">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z"
                      stroke="#888888"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z"
                      stroke="#888888"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="nav-text">Manage Clients</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <a href="/admin_user_list">User</a>
                </li>
                <li>
                  <a href="/admin_reseller_list">Reseller</a>
                </li>
             
              </ul>
            </li> */}

            {role != 1 && role != 2? (
              <li>
                <a
                  className="has-arrow "
                  href="javascript:void(0);"
                  aria-expanded="false"
                >
                  <div className="menu-icon">
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">User</span>
                </a>
                <ul aria-expanded="false">
                  <li>
                    <a href="/user-list">Add User</a>
                  </li>
                  {/* <li><a href="index-3.html">Inactive User</a></li> */}
                </ul>
              </li>
            ) : null}

{role == 2? (
              <li>
                <a
                  className="has-arrow "
                  href="javascript:void(0);"
                  aria-expanded="false"
                >
                  <div className="menu-icon">
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.986 14.0673C7.4407 14.0673 4.41309 14.6034 4.41309 16.7501C4.41309 18.8969 7.4215 19.4521 10.986 19.4521C14.5313 19.4521 17.5581 18.9152 17.5581 16.7693C17.5581 14.6234 14.5505 14.0673 10.986 14.0673Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.986 11.0054C13.3126 11.0054 15.1983 9.11881 15.1983 6.79223C15.1983 4.46564 13.3126 2.57993 10.986 2.57993C8.65944 2.57993 6.77285 4.46564 6.77285 6.79223C6.76499 9.11096 8.63849 10.9975 10.9563 11.0054H10.986Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">User</span>
                </a>
                <ul aria-expanded="false">
                  <li>
                    <a href="/reseller-user-list">Add User</a>
                  </li>
                  {/* <li><a href="index-3.html">Inactive User</a></li> */}
                </ul>
              </li>
            ) : null}
            

            {role == 3 ? (
              <li>
                <a href="/notes" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Notes </span>
                </a>
              </li>
            ) : null}

            {/* <li>
              <a href="/admin_notes" className aria-expanded="false">
                <div className="menu-icon">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                      stroke="#888888"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 18.3333V10H12.5V18.3333"
                      stroke="#888888"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="nav-text">Admin Notes </span>
              </a>
            </li> */}

            {/* <li>
              <a href="/admin_transaction_log" className aria-expanded="false">
                <div className="menu-icon">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                      stroke="#888888"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 18.3333V10H12.5V18.3333"
                      stroke="#888888"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="nav-text">Admin Transaction Log</span>
              </a>
            </li> */}

            {role == 3 ? (
              <li>
                <a href="/transaction-log" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Transaction Log</span>
                </a>
              </li>
            ) : null}
            {role == 3 ? (
              <li>
                <a href="/website-on-off" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Website</span>
                </a>
              </li>
            ) : null}
            {role == 3 ? (
              <li>
                <a href="/support" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">Support</span>
                </a>
              </li>
            ) : null}

{role == 3 ? (
              <li>
                <a href="/white-list" className aria-expanded="false">
                  <div className="menu-icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 7.49999L10 1.66666L17.5 7.49999V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.49999Z"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 18.3333V10H12.5V18.3333"
                        stroke="#888888"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="nav-text">White List Number</span>
                </a>
              </li>
            ) : null}


          </ul>
          <div className="help-desk">
            <a href="javascript:void(0)" className="btn btn-primary">
              Help Desk
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
