
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function TodoAddTask(){

    let navigate= useNavigate();
    const [cookies, setCookies, removeCookies]=useCookies('userId');
    const formik= useFormik({
        initialValues: {
            Appointment_Id:0,
            Title:' ',
            Description: ' ',
            Date:'',
            UserId: cookies['userId']
        },
        onSubmit:(appointment)=>{
            axios.post("http://127.0.0.1:5050/add-task", appointment)
            .then(()=>{
                alert("Appointment Added..");
                navigate('/dashboard');
            }
            )

        }
    }
    )

    return(
        <div className="bg-light text-dark p-4">
        <h3> Add Appointment</h3>
        <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>Appointment Id</dt>
                <dd><input  name="Appointment_Id" type='text' onChange={formik.handleChange} className="form-control"></input></dd>
                <dt>Title</dt>
                <dd><input name="Title" type="text" onChange={formik.handleChange} className="form-control"></input></dd>
                <dt>Description</dt>
                <dd><textarea name="Description" onChange={formik.handleChange} rows="5" cols="30"className="form-control"></textarea></dd>
                <dt>Date</dt>
                <dd><input type="Date" name="Date" ></input></dd>                
            </dl>
            <button type="submit" className="btn btn-success">Save</button>
            <Link to="/dashboard" className="btn btn-warning">Cancel</Link>
            
        </form>
        </div>

    );
}