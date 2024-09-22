import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import Layout from '../../Components/Layout';


import Header from "../../Components/Header"
import Sidebar from '../../Components/Sidebar';


const VoiceBroadcast = () => {

    const [numbercounter, setNumberCounter] = useState("");
    const [count, setCount] = useState();

    useEffect(() => {
        const theme=localStorage.getItem("theme");
        document.body.className=theme;
        if (numbercounter.length == 0) {
            setNumberCounter(0);
        }

    }, [])

    const OnSubmit = () => {
        // const BASE_URL = process.env.REACT_APP_BASE_URL;
        console.log("submitted");
        toast.success("Submitted successfully")
      
    }

    const RowCount = (text) => {
        var lines = text.split(/\r|\r\n|\n/);
        setCount(lines.length);
        console.log("count", count);
        setNumberCounter(count);

    }

    return (
        <>
<div id="main-wrapper">
            <Header/>

            <Sidebar/>


            <div fluid className="container mt-3 mb-3">
                <div className="content-body">
                    <div className="card">
                        <div className="card-header">Voice Broad casting</div>
                        <div className="card-body">
                        <div className="row m-3">
                                <div className="col-12 col-xs-12 col-sm-12 col-md-2">
                                    <label className="m-2">Group Name:-</label>
                                </div>
                                <div className="col">
                                   <input type='text'  className=" form-control" placeholder='Enter Group name:-'/>
                                </div>
                            </div>

                            <div className="row m-3">
                                <div className="col-12 col-xs-12 col-sm-12 col-md-2">
                                    <label className="m-2">Mobile Numbers:</label>
                                </div>
                                <div className="col">
                                    <textarea rows={4} cols={4} className="form-control" placeholder="Enter mobile number here with country code"
                                        onChange={(e) => RowCount(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="row m-3">
                                <div className="col-12 col-xs-12 col-sm-12 col-md-2">
                                    <label className="m-2">Count:-</label>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control"
                                        name="numbercounter"
                                        value={numbercounter} />
                                </div>

                            </div>
                           
                            <div className="row m-3">
                                <div className="col-12 col-xs-12 col-sm-12 col-md-2">
                                    <label className="m-2">Upload Audio:-</label>
                                </div>
                                <div className="col">
                                    <input type='file' className='form-control' placeholder='Upload audio here:' />
                                </div>

                            </div>
                            <div className="row m-3">
                                <div className="col-12 col-xs-12 col-sm-12 col-md-2">
                                    <label className="m-2">Title:-</label>
                                </div>
                                <div className="col">
                                    <textarea rows={3} className='form-control' placeholder='Write Title here:-' />
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
                            <div className="d-flex justify-content-center align-items-center m-5">   <button type="button" className="btn btn-primary " onClick={() => OnSubmit()}>Submit</button></div>

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
export default VoiceBroadcast;