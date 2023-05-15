import { Navigate, Route, Routes, json, useNavigate } from "react-router-dom";
import Transection from "../pages/add_update/addUpdate";
import ViewData from "../pages/viewData/ViewData";
import Pdata from "../pages/viewData/User";
import { useEffect } from "react";
import { Cookies } from 'react-cookie';


const Auth = ()=>{

    // const token = JSON.parse(localStorage.getItem('tempdata'));

    const cookie1 = new Cookies();
    const token = cookie1.get('tempdata')
    console.log(token);
    let navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/public/login");
    }
    //eslint-disable-next-line
  }, []);

    return(
        <>
      {token && (
        <Routes>
           <Route key={1} path='/transection' Component={Transection} />
           <Route key={2} path='/transection/:id' Component={Transection} />
           <Route key={3} path='/view-data' Component={ViewData} />
           <Route key={4} path='/view-data/:id' Component={Pdata} />
           <Route key={5} path="/*" element={<Navigate to="/view-data" replace />}/>
        </Routes>
      )}
    </>
    )




}

export default Auth;



// export const Auth = [
//     <Route key={1} path='/transection' Component={Transection} />,
//     <Route key={2} path='/transection/:id' Component={Transection} />,
//     <Route key={3} path='/view-data' Component={ViewData} />,
//     <Route key={4} path='/view-data/:id' Component={Pdata} />,
//     <Route key={5} path="/*" element={<Navigate to="/view-data" />}
//     />,
// ];  