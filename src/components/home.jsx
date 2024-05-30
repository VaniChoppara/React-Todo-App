import { Link } from "react-router-dom";

export function TodoHome(){
    return(
        <main className="d-flex justify-content-center align-content-center" style={{height:'7vh'}}>
            <Link to="/login" className="btn btn-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-warning">Register</Link>
        </main>
    );
};