import axios from "axios";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ChangePassword = (props) => {

    const [oldpassword , setOldPassword]=useState("");
    const [newpassword , setNewPassword]=useState("");
    const [confirmpassword , setConfirmPassword]=useState("");

    const BASE_URL = process.env.REACT_APP_BASE_URL;


   

    const changePassword=()=>{

        if(newpassword!=confirmpassword){
            toast.error("Password Doesn't match");
            return;
        }


        const token=localStorage.getItem("token");
        const obj={
            old_pass:oldpassword,
            new_pass:newpassword
        }
        axios
        .post(`${BASE_URL}auth/change-password`,obj,{
           headers: {
            "x-access-token":`${token}`,
            "version":"1.0.0",
            "Content-Type":"Application/json",
            }
        }).then((response)=>{
            if(response.data.success==false)
            {
                toast.error(response.data.message);
            }else{
                toast.success(response.data.message);
                setConfirmPassword("");
                setNewPassword("");
                setOldPassword("");
            }
        }).catch((error)=>{
            console.log(error);
        })
    }



    return (
        <>
            <div id="main-wrapper">
                <Header />

                <Sidebar />
                <div className="content-body">
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                            <li className="breadcrumb-item active"><a href="javascript:void(0)">Change password</a></li>
                        </ol>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card h-auto">
                                    <div className="card-body">
                                        <div className="profile-tab">
                                            <div className="custom-tab-1">
                                                <div className="tab-content">
                                                    <div className="settings-form">
                                                        <h4 className="text-primary">Change password</h4>
                                                        {/* <form> */}
                                                        <div className="row">

                                                            <div className="mb-3 col-md-6">
                                                                <label className="form-label">Old Password</label>
                                                                <input type="text" placeholder="old password" className="form-control"
                                                                    name="oldpassword"
                                                                  value={oldpassword}
                                                                  onChange={(e)=>setOldPassword(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="mb-3 col-md-6">
                                                                <label className="form-label">New Password</label>
                                                                <input type="text" className="form-control"
                                                                placeholder="New password"
                                                                    // defaultValue={profileinfo.email}
                                                                    name="newpassword"
                                                                  value={newpassword}
                                                                 onChange={(e)=>setNewPassword(e.target.value)}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="row">
                                                            <div className="mb-3 col-md-6">
                                                                <label className="form-label">Confirm password</label>
                                                                <input type="text" placeholder="confirm password" className="form-control"
                                                                    name="confirmpassword"
                                                                  value={confirmpassword}
                                                                  onChange={(e)=>setConfirmPassword(e.target.value)}
                                                                />
                                                            </div>

                                                        </div>









                                                        <button className="btn btn-primary" type="button" onClick={()=>changePassword()}>Change password</button>
                                                        {/* </form> */}
                                                    </div>

                                                </div>
                                            </div>
                                            {/* Modal */}
                                            <div className="modal fade" id="replyModal">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Post Reply</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                                                        </div>
                                                        <div className="modal-body">
                                                            <form>
                                                                <textarea className="form-control h-50" rows={4} defaultValue={"Message"} />
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary">Reply</button>
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
}
export default ChangePassword;