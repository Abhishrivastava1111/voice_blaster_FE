import Header from "../../Components/Header"
import Sidebar from "../../Components/Sidebar";
const AdminNotes=()=>{
    return(
        <>
           <div id="main-wrapper">
                <Header />

                <Sidebar />


                <div fluid className="container mt-3 mb-3">
                    <div className="content-body">
                        <div className="card">
                            <div className="card-header">Notes:-</div>
                            <div className="card-body">


                                <div className="row m-3">
                                    <div className="col-12 col-xs-12 col-sm-12 col-md-2">
                                        <label className="m-2">Title:-</label>
                                    </div>
                                    <div className="col">
                                        <textarea rows={4} cols={4} className="form-control" placeholder="Enter Title here:-"

                                        ></textarea>
                                    </div>
                                </div>



                                <div className="row m-3">
                                    <div className="col-12 col-xs-12 col-sm-12 col-md-2">
                                        <label className="m-2">Status:-</label>
                                    </div>
                                    <div className="col">
                                        <select className='form-control'>
                                            <option value="0" >--select-- </option>
                                            <option value='1'>Active </option>

                                            <option value='2'>Inactive </option>

                                        </select>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-center align-items-center m-5">   <button type="button" className="btn btn-primary " >Save</button></div>

                            </div>
                        </div>

                    
            <div className="col-xl-6 active-p">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects shorting">
                  <div className="tbl-caption">
                    <h4 className="heading mb-0">Notes Listing:-</h4>
                  </div>
                  <table id="projects-tbl" className="table ItemsCheckboxSec">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-check custom-checkbox ms-0">
                            <input type="checkbox" className="form-check-input checkAllInput" required />
                            <label className="form-check-label" htmlFor="checkAll" />
                          </div>
                        </th>
                        <th>Title</th>
                        <th>Status</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check custom-checkbox">
                            <input type="checkbox" className="form-check-input" id="customCheckBox2" required />
                            <label className="form-check-label" htmlFor="customCheckBox2" />
                          </div>
                        </td>
                        <td>Batman</td>
                      
                    
                      
                        <td className="">
                          <span className="badge badge-primary light border-0">Active</span>
                        </td>
                     
                      </tr>
                      <tr>
                        <td>
                          <div className="form-check custom-checkbox">
                            <input type="checkbox" className="form-check-input" id="customCheckBox2" required />
                            <label className="form-check-label" htmlFor="customCheckBox2" />
                          </div>
                        </td>
                        <td></td>
                     
                       
                      
                        <td className="">
                          <span className="badge badge-danger light border-0">Inactive</span>
                        </td>
                     
                      </tr>
                  
                  
                   
                   
                  
                    </tbody>
                  </table>
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
}
export default AdminNotes;