import Header from "../../Components/Header"
import Sidebar from "../../Components/Sidebar";
const AdminTransactionLog=()=>{
    return(
        <>
         <div id="main-wrapper">
 <Header/>
 <Sidebar />
<div className="content-body">
<div className="col-12 bst-seller">
  <div className="card">
    <div className="card-body p-0">
      <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
        <div className="tbl-caption">
          <h4 className="heading mb-0"><i className="fa fa-pen"></i>&nbsp;&nbsp; Admin Transaction Log</h4> 
          <div>
           
          {/* <button  className="btn btn-success">Download</button> */}
         
          </div>
        </div>
        <hr style={{margin:"0", padding:"0"}}/>

        <div className="row m-2">
            <div className="col">

            </div>
            <div className="col-3">
                <input type="text" className="form-control" placeholder="Search here:-"/>
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
              <th>Username</th>
              <th>SMS type </th>
              <th>No of SMS </th>
              <th>Per SMS price</th>
              <th>Description</th>
              <th>Created By </th>
              <th>Created At </th>

              
            </tr>
          </thead>
          <tbody>
          
            <tr>
              <td>
                <div className="form-check custom-checkbox">
                  <input type="checkbox" className="form-check-input" id="customCheckBox1111" required />
                  <label className="form-check-label" htmlFor="customCheckBox1111" />
                </div>
              </td>
              <td><span>1018</span></td>
              <td>
                <div className="products">
                 
                  <div>
                   
                    <span>Software Developer</span>	
                  </div>	
                </div>
              </td>
              <td><a href="javascript:void(0)" className="text-primary">ar@gmail.com</a></td>
              <td>
                <span>+85 123 456 7890</span>
              </td>
           
            
              <td>
                gajfgffjf
               
              </td>
              <td>hjsgja</td>
              <td> <button className="btn btn-primary"><i className="fa fa-edit"></i></button> </td>
            
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
        </>
    );
}
export default AdminTransactionLog;