import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const PageNotFound = (props) => {
  const navigate = useNavigate();
  const [websiteInfo, setWebsiteInfo] = useState({
    title: "",
    description: "",
  });
  // const inputFile = useRef(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    getWebsiteInfo();
    const theme=localStorage.getItem("theme");
    document.body.className=theme;
  }, []);

  const getWebsiteInfo = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BASE_URL}admin/getWebsiteInfo`, {
        headers: {
          "Content-Type": "Application/json",
          version: "1.0.0",
          "x-access-token": `${token}`,
        },
      })
      .then((response) => {
        if (response.data.success == false) {
        } else {
          console.log(response.data.data);
          setWebsiteInfo(response.data.data);
          // toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">500</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">{websiteInfo.title}</span>
          </p>
          <p className="lead">{websiteInfo.description}</p>
          {/* <a href="index.html" className="btn btn-primary">Go Home</a> */}
        </div>
      </div>
    </>
  );
};
export default PageNotFound;
