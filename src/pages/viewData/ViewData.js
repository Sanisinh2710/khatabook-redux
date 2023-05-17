import { Link, useNavigate } from "react-router-dom";
import './css/viewdata.css'
import { useEffect, useState } from "react";
import Table from "./Table";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { ThreeDots } from "react-loader-spinner";

const ViewData = () => {
    const navigate = useNavigate();
    const cookie1 = new Cookies();
    const reduxData = useSelector((state) => state.transection)

    const [traData, settraData] = useState(reduxData)

    const [loading, setloading] = useState(false)


    // const { contextData, setcontextData } = UsetransData()
    const retrivedata = reduxData
    const [groupBy, setgroupBy] = useState([]);
    const [gval, setgval] = useState("")

    useEffect(() => {
        settraData(reduxData)
    }, [reduxData]);

    useEffect(() => {
        value(gval)
        //eslint-disable-next-line
    }, [traData]);

    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false);
        }, 1000)
    }, [])

    const value = (ele) => {

        let data = retrivedata;

        let gdata = {};

        if (ele.target) {
            setgval(ele.target.value)
            if (ele.target.value) {
                data.forEach((items) => {

                    let item = items[ele.target.value]
                    console.log(items);
                    gdata[item] = gdata[item] ?? [];
                    gdata[item].push(items);
                })
                setgroupBy(gdata)
            } else {
                setgroupBy([])
            }
        }
        else {
            if (ele) {
                data.forEach((items) => {

                    let item = items[ele]
                    console.log(items);
                    gdata[item] = gdata[item] ?? [];
                    gdata[item].push(items);
                })
                setgroupBy(gdata)
            }
        }
    }



    const logout = () => {
        if(window.confirm("Are you sure you want to delete") === true) {

            cookie1.remove('tempdata',{path: '/'});
            window.location.reload();
            navigate('/public/login');
        }

    }
//     {
//         loading ?
//             <ThreeDots
//                 height="80"
//                 width="80"
//                 radius="9"
//                 color="purple"
//                 ariaLabel="three-dots-loading"
//                 visible={true}
//             />
//             :

// }


    console.log(Object.keys(groupBy).length);
    return (
        <>
        {
            loading?
            <>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="purple"
                wrapperStyle={{marginTop:250,marginLeft:600,}}
                
            />
            </>:
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
                            groupBy.length === 0 ? <><Table records={retrivedata} />
                                <br></br></> : Object.keys(groupBy).map((d, i) => (
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
        }
        </>
        

    )

}

export default ViewData;