import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"
import moment from "moment";

export function TodoDeleteTask(){

    const params= useParams();
    let navigate=useNavigate();
    const [appointments, setAppointments]= useState([{Appointment_Id:0, Title:' ', Description:' ', Date: new Date(), UserId:' '}]);
    useEffect(()=>
        {
        axios.get(`http://127.0.0.1:5050/view-task/${params.id}`)
        .then( (res)=>{
            setAppointments(res.data);
            
        }
       )
    },[]);

    function handleDelete(){
        axios.delete(`http://127.0.0.1:5050/delete-task/${params.id}`);           
                alert("Appointment Deleted")
                navigate('/dashboard');  
                }

    return(
        <div className="bg-light text-dark p-3">
        <h3>Are you sure? Do you want to delete?  </h3>
          <dl>
            <dt>Title</dt>
            <dd>{appointments[0].Title}</dd>
            <dt>Description</dt>
            <dd>{appointments[0].Description}</dd>
            <dt>Date</dt>
            <dd>{moment(appointments[0].Date).format("Do-MMM-yyyy")}</dd>            
          </dl>
          <button onClick={handleDelete} className="btn btn-warning me-2">Yes</button>
          <Link to="/dashboard" className="btn btn-danger">No</Link>
        </div>
    )
}