import React, { memo, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ValidEmail } from "../../functions/validationFunction";

const Login = () => {
  const navigate = useNavigate();

  // const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  const Login = () => {
    let obj = {
      email: email,
      role:3,
      password: password,
    };
    if (!ValidEmail(email)) {
      toast.error("Enter Valid Email");
      return;
    }
    if (password.length == "") {
      toast.error("password is rquired to login");
      return;
    }
    // if (password.length > 6 || password.length < 4) {
    //   toast.error("password is incorrect");
    //   return;
    // }
    axios
      .post(`${BASE_URL}auth/login`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.success === false) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          //console.log(response.data.message);
          localStorage.setItem("user", response.data.data);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", response.data.data.role);
          localStorage.setItem("theme", "light-theme");
          //console.log("response.data.data", response.data.data);
          navigate("/");
          window.location.reload();
        }
      })
      .catch(function (error) {
        toast.error(error);
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
          toast.error(response.data.message);

          if (response.data?.error_code === 461) {
            navigate("/login");
          }
        } else {
          // toast.success(response.data.message);
          // console.log(response.data.message);
          // localStorage.setItem("user",response.data.data);
          // localStorage.setItem("token", response.data.data.token);

          setLogo(response.data.data.logo);
          // console.log("response.data.data", response.data.data);
          // navigate("/")

          if (response.data.data.status !== "Active") {
            navigate("/page-not-found");
          }

        }
      })
      .catch(function (error) {
        toast.error(error);
      });
  };
  return (
    <>
      <div className="authincation h-100">
        <div className="container h-100">
          <div
            className="row justify-content-center h-100 align-items-center"
            style={{ marginTop: "50px" }}
          >
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                        <a href="index-2.html">
                          <img src={logo} alt />
                        </a>
                      </div>
                      <h4 className="text-center mb-4">Sign In your account</h4>
                      {/* <form action="https://w3crm.dexignzone.com/xhtml/index.html"> */}
                      {/* <div className="mb-3">
                    <label className="mb-1"><strong>Username</strong></label>
                    <input type="text" className="form-control" placeholder="username" />
                  </div> */}
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email"
                          name="email"
                          value={email}
                          onChange={(e) =>setEmail(e.target.value)}
                        />
                        {/*  */}
                      </div>
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter Password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="text-center mt-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-block"
                          onClick={() => Login()}
                        >
                          Sign In
                        </button>
                      </div>
                      {/* </form> */}
                      {/* <div className="new-account mt-3">
                  <p>Already have an account? <a className="text-primary" href="page-login.html">Sign in</a></p>
                </div> */}
                    </div>
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

export default memo(Login);
