import axios from "axios";
import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavHeader = () => {
  const navigate = useNavigate();
  const [profileinfo, setProfileInfo] = useState([]);
  const [logo, setLogo] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const LogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    getInfo();
  }, []);
  const getInfo = () => {
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
        } else {
          setProfileInfo(response.data.data) ; 
          // toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getWebsiteInfo();
  }, []);
  const getWebsiteInfo = () => {
    let token2 = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}admin/getWebsiteInfo`, {
        headers: {
          "Content-Type": "application/json",
          version: "1.0.0",
          "x-access-token": token2,
        },
      })
      .then(function (response) {
        if (response.data.success === false) {
          // toast.error(response.data.message);
          // if (response.data?.error_code === 461) {
          //   navigate("/login");
          // }
        } else {
          // toast.success(response.data.message);
          //console.log("website info", response.data.data);
          // localStorage.setItem("user",response.data.data);
          // localStorage.setItem("token", response.data.data.token);

          setLogo(response.data.data.logo);
          //console.log("response.data.data", response.data.data);
          // navigate("/")

          if (response.data.data.status != "Active") {
            navigate("/page-not-found");
          }
        }
      })
      .catch(function (error) {
        toast.error(error);
      });
  };

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    //console.log("theme", theme);
    if (theme == "light-theme") {
      localStorage.setItem("theme", "dark-theme");
      var theme2 = localStorage.getItem("theme");

      document.body.className = theme2;
      //console.log("document.body.className", document.body.className);
      // window.location.reload();
    } else {
      localStorage.setItem("theme", "light-theme");
      var theme2 = localStorage.getItem("theme");
      document.body.className = theme2;
      //console.log("document.body.className", document.body.className);

      // window.location.reload();
    }
  };

  return (
    <>
      <div className="nav-header">
        <a href={() => false} className="brand-logo">
          {/* <svg className="logo-abbr" width={39} height={23} viewBox="0 0 39 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="w3" d="M32.0362 22H19.0466L20.7071 18.7372C20.9559 18.2484 21.455 17.9378 22.0034 17.9305L31.1036 17.8093C33.0753 17.6497 33.6571 15.9246 33.7015 15.0821C33.7015 13.2196 32.1916 12.5765 31.4367 12.4878H23.7095L25.9744 8.49673H30.4375C31.8763 8.3903 32.236 7.03332 32.236 6.36814C32.3426 4.93133 30.9482 4.61648 30.2376 4.63865H28.6955C28.2646 4.63865 27.9788 4.19212 28.1592 3.8008L29.7047 0.44798C31.0903 0.394765 32.8577 0.780573 33.5683 0.980129C38.6309 3.42801 37.0988 7.98676 35.6999 9.96014C38.1513 11.9291 38.4976 14.3282 38.3644 15.2816C38.098 20.1774 34.0346 21.8005 32.0362 22Z" fill="var(--primary)" />
          <path className="react-w" d="M9.89261 21.4094L0 2.80536H4.86354C5.41354 2.80536 5.91795 3.11106 6.17246 3.59864L12.4032 15.5355C12.6333 15.9762 12.6261 16.5031 12.3842 16.9374L9.89261 21.4094Z" fill="white" />
          <path className="react-w" d="M17.5705 21.4094L7.67786 2.80536H12.5372C13.0894 2.80536 13.5954 3.11351 13.8489 3.60412L20.302 16.0939L17.5705 21.4094Z" fill="white" />
          <path className="react-w" d="M17.6443 21.4094L28.2751 0H23.4513C22.8806 0 22.361 0.328884 22.1168 0.844686L14.8271 16.2416L17.6443 21.4094Z" fill="white" />
          <path className="react-w" d="M9.89261 21.4094L0 2.80536H4.86354C5.41354 2.80536 5.91795 3.11106 6.17246 3.59864L12.4032 15.5355C12.6333 15.9762 12.6261 16.5031 12.3842 16.9374L9.89261 21.4094Z" stroke="white" />
          <path className="react-w" d="M17.5705 21.4094L7.67786 2.80536H12.5372C13.0894 2.80536 13.5954 3.11351 13.8489 3.60412L20.302 16.0939L17.5705 21.4094Z" stroke="white" />
          <path className="react-w" d="M17.6443 21.4094L28.2751 0H23.4513C22.8806 0 22.361 0.328884 22.1168 0.844686L14.8271 16.2416L17.6443 21.4094Z" stroke="white" />
        </svg> */}
          {/* <svg className="brand-title" width={47} height={16} viewBox="0 0 47 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.36 15.2C7.2933 15.2 6.3 15.0267 5.38 14.68C4.4733 14.32 3.68 13.82 3 13.18C2.3333 12.5267 1.8133 11.76 1.44 10.88C1.0667 9.99999 0.880005 9.03999 0.880005 7.99999C0.880005 6.95999 1.0667 5.99999 1.44 5.11999C1.8133 4.23999 2.34 3.47999 3.02 2.83999C3.7 2.18666 4.49331 1.68666 5.40001 1.33999C6.30671 0.979988 7.3 0.799988 8.38 0.799988C9.5267 0.799988 10.5733 0.999988 11.52 1.39999C12.4667 1.78666 13.2667 2.36666 13.92 3.13999L12.24 4.71999C11.7333 4.17332 11.1667 3.76666 10.54 3.49999C9.9133 3.21999 9.2333 3.07999 8.5 3.07999C7.7667 3.07999 7.0933 3.19999 6.48 3.43999C5.88 3.67999 5.35331 4.01999 4.90001 4.45999C4.46001 4.89999 4.1133 5.41999 3.86 6.01999C3.62 6.61999 3.5 7.27999 3.5 7.99999C3.5 8.71999 3.62 9.37999 3.86 9.97999C4.1133 10.58 4.46001 11.1 4.90001 11.54C5.35331 11.98 5.88 12.32 6.48 12.56C7.0933 12.8 7.7667 12.92 8.5 12.92C9.2333 12.92 9.9133 12.7867 10.54 12.52C11.1667 12.24 11.7333 11.82 12.24 11.26L13.92 12.86C13.2667 13.62 12.4667 14.2 11.52 14.6C10.5733 15 9.52 15.2 8.36 15.2ZM16.4113 15V0.999988H22.1713C23.4113 0.999988 24.4713 1.19999 25.3513 1.59999C26.2446 1.99999 26.9313 2.57332 27.4113 3.31999C27.8913 4.06666 28.1313 4.95332 28.1313 5.97999C28.1313 7.00669 27.8913 7.89329 27.4113 8.63999C26.9313 9.37329 26.2446 9.93999 25.3513 10.34C24.4713 10.7267 23.4113 10.92 22.1713 10.92H17.8513L19.0113 9.73999V15H16.4113ZM25.5713 15L22.0313 9.91999H24.8112L28.3713 15H25.5713ZM19.0113 10.02L17.8513 8.77999H22.0513C23.1979 8.77999 24.0579 8.53329 24.6312 8.03999C25.2179 7.54669 25.5113 6.85999 25.5113 5.97999C25.5113 5.08666 25.2179 4.39999 24.6312 3.91999C24.0579 3.43999 23.1979 3.19999 22.0513 3.19999H17.8513L19.0113 1.91999V10.02ZM31.0402 15V0.999988H33.1802L39.3002 11.22H38.1802L44.2002 0.999988H46.3402L46.3602 15H43.9002L43.8802 4.85999H44.4002L39.2802 13.4H38.1202L32.9202 4.85999H33.5202V15H31.0402Z" fill="black" />
        </svg> */}
          <img src={logo} alt="demo" style={{ height: "50px" }} />
        </a>
        <div className="nav-control">
          <div className="hamburger">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>
        </div>
      </div>

      {/***********************************
      Nav header end
  ************************************/}

      {/***********************************
      Header start
  ************************************/}

      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left ">
                {/*  <div className="input-group search-area">
                <span className="input-group-text"><a href="javascript:void(0)">
                    <svg width={19} height={19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8.78605" cy="8.78605" r="8.23951" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M14.5168 14.9447L17.7471 18.1667" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a></span>
                <input type="text" className="form-control" placeholder="Search" />
              </div>*/}
              </div>

              <ul className="navbar-nav header-right">
                {/* theme button start  */}

                {/* <label className="mt-2">
  <input className="toggle-checkbox" type="checkbox" />
  <div className="toggle-slot">
    <div className="sun-icon-wrapper">
      <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false" />
    </div>
    <div className="toggle-button"   onClick={() => toggleTheme()}  />
    <div className="moon-icon-wrapper">
      <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false" />
    </div>
  </div>
</label> */}

                {/* theme button end  */}

                <li className="nav-item align-items-center header-border">
                  <span
                    onClick={() => LogOut()}
                    className="btn btn-primary btn-sm"
                  >
                    Logout
                  </span>
                </li>

                <li className="nav-item ps-3">
                  <div className="dropdown header-profile2">
                    <a
                      className="nav-link"
                      href={() => false}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="header-info2 d-flex align-items-center">
                        <div className="header-media">
                          <img
                            src={profileinfo.profile_image}
                            alt="profile image"
                          />
                        </div>
                        <div className="header-info">
                          <h6>{profileinfo.name}</h6>
                          <p style={{ fontSize: "8px" }}>{profileinfo.email}</p>
                          <p style={{ fontSize: "8px" }}>
                            {profileinfo.balance}
                          </p>
                        </div>
                      </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end" style={{}}>
                      <div className="card border-0 mb-0">
                        <div className="card-header py-2">
                          <div className="products">
                            <img
                              src={profileinfo.profile_image}
                              style={{ aspectRatio: "1/1" }}
                              className="avatar avatar-md"
                              alt="profile image"
                            />
                            <div>
                              <h6>{profileinfo.name}</h6>
                              <span>{profileinfo.email}</span>
                              <p>{profileinfo.balance}</p>
                            </div>
                          </div>
                        </div>
                        <div className="card-body px-0 py-2">
                          <a href="/profile" className="dropdown-item ai-icon ">
                            {/* <svg
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.9848 15.3462C8.11714 15.3462 4.81429 15.931 4.81429 18.2729C4.81429 20.6148 8.09619 21.2205 11.9848 21.2205C15.8524 21.2205 19.1543 20.6348 19.1543 18.2938C19.1543 15.9529 15.8733 15.3462 11.9848 15.3462Z"
                                stroke="var(--primary)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.9848 12.0059C14.5229 12.0059 16.58 9.94779 16.58 7.40969C16.58 4.8716 14.5229 2.81445 11.9848 2.81445C9.44667 2.81445 7.38857 4.8716 7.38857 7.40969C7.38 9.93922 9.42381 11.9973 11.9524 12.0059H11.9848Z"
                                stroke="var(--primary)"
                                strokeWidth="1.42857"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg> */}
                            <span className="ms-2">Profile </span>
                          </a>
                          <a
                            href="/change-password"
                            className="dropdown-item ai-icon "
                          >
                            {/* <span class="material-symbols-outlined">
key
</span> */}
                            <span className="ms-2">Change Password </span>
                          </a>
                          {/* <a
                            href="email-inbox.html"
                            className="dropdown-item ai-icon "
                          >
                           
                            <span className="ms-2">Notification </span>
                          </a> */}
                        </div>
                        <div className="card-footer px-0 py-2">
                          {/* <a href="javascript:void(0);" className="dropdown-item ai-icon ">
                          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.8066 7.62355L20.1842 6.54346C19.6576 5.62954 18.4907 5.31426 17.5755 5.83866V5.83866C17.1399 6.09528 16.6201 6.16809 16.1307 6.04103C15.6413 5.91396 15.2226 5.59746 14.9668 5.16131C14.8023 4.88409 14.7139 4.56833 14.7105 4.24598V4.24598C14.7254 3.72916 14.5304 3.22834 14.17 2.85761C13.8096 2.48688 13.3145 2.2778 12.7975 2.27802H11.5435C11.0369 2.27801 10.5513 2.47985 10.194 2.83888C9.83666 3.19791 9.63714 3.68453 9.63958 4.19106V4.19106C9.62457 5.23686 8.77245 6.07675 7.72654 6.07664C7.40418 6.07329 7.08843 5.98488 6.8112 5.82035V5.82035C5.89603 5.29595 4.72908 5.61123 4.20251 6.52516L3.53432 7.62355C3.00838 8.53633 3.31937 9.70255 4.22997 10.2322V10.2322C4.82187 10.574 5.1865 11.2055 5.1865 11.889C5.1865 12.5725 4.82187 13.204 4.22997 13.5457V13.5457C3.32053 14.0719 3.0092 15.2353 3.53432 16.1453V16.1453L4.16589 17.2345C4.41262 17.6797 4.82657 18.0082 5.31616 18.1474C5.80575 18.2865 6.33061 18.2248 6.77459 17.976V17.976C7.21105 17.7213 7.73116 17.6515 8.21931 17.7821C8.70746 17.9128 9.12321 18.233 9.37413 18.6716C9.53867 18.9488 9.62708 19.2646 9.63043 19.5869V19.5869C9.63043 20.6435 10.4869 21.5 11.5435 21.5H12.7975C13.8505 21.5 14.7055 20.6491 14.7105 19.5961V19.5961C14.7081 19.088 14.9088 18.6 15.2681 18.2407C15.6274 17.8814 16.1154 17.6806 16.6236 17.6831C16.9451 17.6917 17.2596 17.7797 17.5389 17.9393V17.9393C18.4517 18.4653 19.6179 18.1543 20.1476 17.2437V17.2437L20.8066 16.1453C21.0617 15.7074 21.1317 15.1859 21.0012 14.6963C20.8706 14.2067 20.5502 13.7893 20.111 13.5366V13.5366C19.6717 13.2839 19.3514 12.8665 19.2208 12.3769C19.0902 11.8872 19.1602 11.3658 19.4153 10.9279C19.5812 10.6383 19.8213 10.3981 20.111 10.2322V10.2322C21.0161 9.70283 21.3264 8.54343 20.8066 7.63271V7.63271V7.62355Z" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12.175" cy="11.889" r="2.63616" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="ms-2">Settings </span>
                        </a> */}
                          {/* <a href="page-login.html" className="dropdown-item ai-icon"> */}
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1={21} y1={12} x2={9} y2={12} />
                          </svg> */}

                          <span
                            className="ms-2 logoutdiv"
                            onClick={() => LogOut()}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp; Logout{" "}
                          </span>
                          {/* </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavHeader;
