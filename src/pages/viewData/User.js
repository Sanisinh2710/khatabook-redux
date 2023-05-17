import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";


const Pdata = () => {

    const { id } = useParams();


    const retrivedata = JSON.parse(localStorage.getItem('fovalues'))

    const [d , setdata] = useState([])


    useEffect(() => {
        for (const key in retrivedata) {

            if (parseInt(retrivedata[key].id) === parseInt(id)) {
                setdata(retrivedata[key])
                break;
            }
        }
        
        //eslint-disable-next-line
    }, [])



    return <>
        <div className="container-fluid">

            <div class="container">
                
                        
                        <>
                            <h2>Transection</h2>
                            <div>
                                <div>
                                    <label>Date of your transaction:</label>
                                    <label>{d.tdate}</label>
                                </div>
                                <div>
                                    <label>Month year:</label>
                                    <label>{d.monthYear}</label>

                                </div>
                                <div>
                                    <label>Amount</label>
                                    <label>{d.amount}</label>

                                </div>
                                <div>
                                    <label>From Acoount</label>
                                    <label>{d.fromAccont}</label>

                                </div>
                                <div>
                                    <label>To Acoount</label>
                                    <label>{d.toAccont}</label>

                                </div>
                                <div>
                                    <div>
                                        <label>Receipt</label>
                                        <img src={d.receipt} width={100} height={100} alt="" />
                                    </div>

                                </div>
                                <div>
                                    <div>
                                        <label>Remarks:</label>
                                        <label>{d.remarks}</label>
                                    </div>
                                    <div>

                                    </div>
                                </div>

                            </div>
                        </>
                <div>
                    <Link class="button-30" to={`/view-data`}>View Transection</Link>
                </div>
            </div>
        </div>
    </>


}

export default Pdata