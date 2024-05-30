import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export function TodoRegister(){

    let navigate= useNavigate();
    const formik= useFormik({
        initialValues: {
            UserId:"",
            UserName:"",
            Password:"",
            Email:""
        },
        onSubmit:(user)=>{
            axios.post("http://127.0.0.1:5050/register-user", user);
            alert("user registered successfully. Please Login");
            navigate('/login');
        }
    });
    return(
        <div className="bg-light text-dark w-25 p-3">
            <h3>Register User</h3>
            
            <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>User Id</dt>
                <dd><input  name="UserId" type='text' onChange={formik.handleChange} className="form-control"></input></dd>
                <dt>User Name</dt>
                <dd><input name="UserName" type="text" onChange={formik.handleChange} className="form-control"></input></dd>
                <dt>Password</dt>
                <dd><input name="Password" type="password" onChange={formik.handleChange} className="form-control"></input></dd>
                <dt>Email</dt>
                <dd><input type="email" name="Email"onChange={formik.handleChange} ></input></dd>   
                <dt>Mobile</dt>
                <dd><input type="text" name="Mobile" onChange={formik.handleChange} ></input></dd>                             
            </dl>
            <button type="submit" className="btn btn-success me-2">Save</button>
            <Link to="/" className="btn btn-warning">Cancel</Link>
        
            </form>
        </div>
    );
};