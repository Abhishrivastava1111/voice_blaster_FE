import { useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";
import { Button, Modal } from "react-bootstrap";
const AdminResellerList=()=>{
    const [showUserModel, setShowUserModel] = useState(false);

    const handleUserModelShow = (item = {}) => {
        // console.log(item);
        // if (Object.keys(item).length > 0) {
        //   setID(item._id);
        //   item.password = "";
        //   setValues(item);
        //   // setValues({password:""})
        // }
    
        setShowUserModel(true);
      };

      
  const handleUserModelClose = () => setShowUserModel(false);
    return(
        <>
         <div id="main-wrapper">
                <Header />
                <Sidebar />
                <div className="content-body">
                    <div className="col-12 bst-seller">
                        <div className="card">
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
                                    <div className="tbl-caption">
                                        <h4 className="heading mb-0"><i className="fa fa-pen"></i>&nbsp;&nbsp; Reseller</h4>
                                        <div>
                                        <Button
                              variant="primary"
                              onClick={handleUserModelShow}
                            >
                              Add Reseller +
                            </Button>
                                            

                                            {/* <button  className="btn btn-success">Download</button> */}
                                     
                                        </div>
                                    </div>
                                    <hr style={{ margin: "0", padding: "0" }} />

                                    <div className="row m-2">
                                        <div className="col">

                                        </div>
                                        <div className="col-3">
                                            <input type="text" className="form-control" placeholder="Search here:-" />
                                        </div>
                                    </div>

                                    <table id="empoloyees-tbl" className="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="form-check custom-checkbox ms-0">
                                                        <input type="checkbox" className="form-check-input checkAllInput" id="checkAll2" required />
                                                        <label className="form-check-label" htmlFor="checkAll2" />
                                                    </div>
                                                </th>
                                                <th>FullName:- </th>
                                                <th>username:- </th>
                                                <th>Email</th>
                                                <th>Contact</th>

                                                <th>Created WN </th>
                                                <th>Created WI </th>
                                                <th>Created WB </th>
                                                <th>Created By </th>
                                                <th>Status </th>
                                                <th>Action </th>


                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    
                                                </td>
                                                <td>

                                                </td>

                                                <td>

                                                </td>


                                                <td>


                                                </td>

                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    
                                                </td>


                                            </tr>

                                        </tbody>
                                    </table>
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



            <Modal show={showUserModel} onHide={handleUserModelClose}>
        <Modal.Header closeButton>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <label>User Type:</label>
          <select className="form-control" 
        //   onChange={handleChange}
           name="role">
            <option value="">---Select type---</option>
            <option 
            // selected={values.role === "1" ? true : false} 
            value="1">
              User
            </option>
            <option
            //  selected={values.role === "1" ? true : false} 
             value="2">
              Reseller
            </option>
          </select>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            // onChange={handleChange}
            // value={values.name}
          />
          <label>Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            // onChange={handleChange}
            // value={values.company}
           
          />
          <label>Email ID</label>
          <input
            type="text"
            name="email"
            // value={values.email}
            className="form-control"
            // onChange={handleChange}
            
            
          />
          <label>Mobile No.</label>
          <input
            type="text"
            name="mobile_no"
            // value={values.mobile_no}
            className="form-control"
            // onChange={handleChange}
          />
          <label>Profile</label>
          <input
            type="file"
            className="form-control"
       
          />
          <div 
        //   style={{display:(id)?"none":"block"}}
          >
          <label>Password</label>
          <input
            type="password"
            name="password"
            // value={values.password}
            className="form-control"
            // onChange={handleChange}
          />
          </div>
          
          <label>Status:</label>
          <select
            name="status"
            className="form-control"
            // onChange={handleChange}
          >
            <option value="">---Select Status---</option>
            <option
            //  selected={values.status === "Active" ? true : false} 
             value="Active">Active</option>
            <option 
            // selected={values.status === "Inactive" ? true : false} 
            value="Inactive">Inactive</option>
          </select>
          {/* <textarea className="form-control" rows={3}></textarea> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUserModelClose}>
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}
export default AdminResellerList;