import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { useEffect } from "react";
import { Cookies } from "react-cookie";




const Unauth = () => {

    const cookie1 = new Cookies();
    const token = cookie1.get('tempdata')

    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate("/view-data");
        }   
                //eslint-disable-next-line
    }, []);
    return (
        <>
            {!token && (
                <Routes>
                    <Route path='/login' Component={Login} />
                    <Route path='/register' Component={Register} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            )}
        </>
    );
};


export default Unauth


// export const Unauth = [
//     <Route path='/login' Component={Login} />,
//     <Route path='/register' Component={Register} />,
//     <Route path='/*'  element={<Navigate to="/login" replace />}/>
// ]; 