import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"
import moment from "moment";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";

export function TodoEditTask(){

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

    const [cookies, setCookies, removeCookies]=useCookies('userId');
    const formik= useFormik({
        initialValues: {
            Appointment_Id:appointments[0].Appointment_Id,
            Title:appointments[0].Title,
            Description:appointments[0].Description,
            Date:appointments[0].Date,
            UserId: cookies['userId']
        },
        onSubmit:(appointment)=>{
            axios.put(`http://127.0.0.1:5050/edit-task/${params.id}`, appointment)
            .then(()=>{
                alert("Appointment Edited..");
                navigate('/dashboard');
            }
            )

        },
        enableReinitialize: true
    }
    )

    return(
        <div className="bg-light text-dark p-3">
        <h3>Are you sure? Do you want to delete?  </h3>

         <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>Appointment Id</dt>
                <dd><input  name="Appointment_Id" value={formik.values.Appointment_Id} type='text' onChange={formik.handleChange} className="form-control"></input></dd>
                <dt>Title</dt>
                <dd><input name="Title" type="text" value={formik.values.Title} onChange={formik.handleChange} className="form-control"></input></dd>
                <dt>Description</dt>
                <dd><textarea name="Description" value={formik.values.Description} onChange={formik.handleChange} rows="5" cols="30"className="form-control"></textarea></dd>
                <dt>Date</dt>
                <dd><input type="Date" name="Date" ></input></dd>                
            </dl>
            <button type="submit" className="btn btn-success">Edit</button>
            <Link to="/dashboard" className="btn btn-warning">Cancel</Link>
            
        </form>
        
        </div>
    )
}