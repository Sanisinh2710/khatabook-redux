import { Link, useNavigate } from "react-router-dom";
import './css/viewdata.css'
import { useState } from "react";
import Table from "./Table";


const ViewData = () => {
    const navigate = useNavigate();

    const retrivedata = JSON.parse(localStorage.getItem('fovalues'))


    const [groupBy, setgroupBy] = useState([]);
    const value = (ele) => {
        let data = [...retrivedata];

        let gdata = {};

        if(ele.target.value){

            data.forEach((items) => {
    
                let item = items[ele.target.value]
                console.log(items);
                gdata[item] = gdata[item] ?? [];
                gdata[item].push(items);
            })
            setgroupBy(gdata)
        }else{
            setgroupBy([])
        }
        console.log(gdata);
    }



    const logout = () =>{

        localStorage.removeItem('tempdata');

        navigate('/public/login');

    }

console.log( Object.keys(groupBy).length);
    return (
        <>
            {
                retrivedata ? <>
                    <>
                        <div>
                            <label>Group By:</label>
                            <select name="groupBy" onChange={(e) => value(e)}>
                                <option value={""}>Select Field Name</option>
                                <option value={"tdate"}>Transection-date</option>
                                <option value={"monthYear"}>Month-Year</option>
                                <option value={"ttype"}>Transection Type</option>
                                <option value={"amount"}>Amount</option>
                                <option value={"fromAccount"}>From-Account</option>
                                <option value={"toAccount"}>To-Account</option>
                                <option value={"remarks"}>Remarks</option>
                            </select>
                        </div>
                        
                        <br></br>
                        {
                            groupBy.length === 0 ?<><Table records={retrivedata} />
                            <br></br></>:Object.keys(groupBy).map((d, i) => (
                                <>
                                    {
                                        d !== 'undefined' ? <>
                                            <h2> GroupBy: {d}</h2>
                                            <Table records={groupBy[d]} />
                                        </> : null
                                    }

                                </>
                            ))
                        }
                        {/* <Table records={retrivedata} />
                        <br></br>

                        <br></br>

                        {

                            Object.keys(groupBy).map((d, i) => (
                                <>
                                    {
                                        d !== 'undefined' ? <>
                                            <h2> GroupBy: {d}</h2>
                                            <Table records={groupBy[d]} />
                                        </> : null
                                    }

                                </>
                            ))
                        } */}


                    </>
                </> : <>
                    <h1>No Data Found</h1>
                </>


            }
                    <div>
                        <Link className="button-30" to={'/transection'}>New Transection</Link>
                        <button className="button-30" onClick={logout}>Logout</button>
                    </div>
        </>

    )

}

export default ViewData;