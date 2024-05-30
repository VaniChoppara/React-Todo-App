import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";



export function TodoDashboard(){

    const [cookies, setCookies, removeCookies]= useCookies('userId');
    const [appointments, setAppointments]=
     useState([{Appointment_Id:0, Title:' ', Description:' ', Date: new Date(), UserId:' '}]);
    let navigate= useNavigate();

    function handleLogout(){
        removeCookies('userId');
        navigate('/login');
    }
     useEffect(()=>{
       
     if(cookies['userId']===undefined){
        navigate('/login')
     }else{
      axios.get(`http://127.0.0.1:5050/view-tasks/${cookies['userId']}`)
         .then(response=>{
             setAppointments(response.data);            
         })
        }
    },[])

     return(
        <div className="bg-light m-4 p-2">
            <h1 className="d-flex justify-content-between">{cookies['userId']} - Dashboard <button className='btn btn-link' onClick={handleLogout}>Logout</button></h1>
            <main className="w-50">
            <div className="h4">Your Appointments</div>
            <Link  to="/addtask" className="bi bi-calendar btn btn-primary my-3" > Add Appointment </Link>
            {
                    appointments.map(appointment=> 
                        <div className="alert alert-success alert-dismissible">
                            <button className="btn btn-close" data-bs-dismiss="alert"></button>
                            <h2>{appointment.Title}</h2>
                            <p>{appointment.Description}</p>
                            <p>{moment(appointment.Date).format('dddd, MMMM Do YYYY')}</p>
                            <Link to={`/edittask/${appointment.Appointment_Id}`} className="btn btn-warning bi bi-pen-fill"> Edit </Link>
                            <Link  to={`/deletetask/${appointment.Appointment_Id}`} className="btn ms-2 btn-danger bi bi-trash"> Remove</Link>
                        </div>

                    )
                }

            </main>
       </div>
    );
};