import axios from "axios";
import { useFormik } from "formik"
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function TodoLogin(){

    const [cookies, setCookies, removeCookies]=useCookies('userId');
    let navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
            UserId:' ',
            Password:' '
        },
        onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:5050/get-users`)
                .then(response=>{
                    var existUser=response.data.find(record=>record.UserId===user.UserId);
                    if(existUser){
                        if(existUser.Password===user.Password)
                            {
                            setCookies('userId', user.UserId);
                            navigate('/dashboard');
                        }
                        else
                            navigate('/invalidlogin');
                    }else{
                        navigate('/invalidlogin');
                    }
                })

        }
       
    });
    return(
        <div className="bg-light p-4 m-3 w-25">
        <form onSubmit={formik.handleSubmit}>
            <h3>User Login</h3>
            <dl>
                <dd>User Id</dd>
                <dt><input type="text" name="UserId" className="form-control" onChange={formik.handleChange}></input></dt>
                <dd>Password</dd>
                <dt><input type="password" name="Password" className="form-control" onChange={formik.handleChange}></input></dt>
            </dl>
            <button type="submit" className="btn btn bg-warning w-100 mb-2">Login</button>
            <Link to="/login">Return to Login</Link>
        </form>
        </div>
    )
}