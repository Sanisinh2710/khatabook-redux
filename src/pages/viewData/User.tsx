import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { RootState } from "../../redux-duck/store";
import * as React from 'react'
import { TransectionType } from "../../interface/app_interface";

const Pdata:React.FunctionComponent = () => {

    const { id } = useParams();
    const [loading, setloading] = useState(false)


    const reduxData = useSelector((state: RootState) => state.transection)

    // const {contextData,setcontextData} = UsetransData()
    const retrivedata = reduxData

    const [d , setdata] = useState<TransectionType>()


    useEffect(() => {
        for (const key in retrivedata) {

            if (Number(retrivedata[key].id) === Number(id)) {
                setdata(retrivedata[key])
                break;
            }
        }
        
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false);
        }, 1000)
    }, [])



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
                wrapperStyle={{marginTop:"250",marginLeft:"600"}}
                
            />
            </>:
            <>
            <div className="container-fluid">
    
                <div className="container">
                    
                            
                            <>
                                <h2>Transection</h2>
                                <div>
                                    <div>
                                        <label>Date of your transaction:</label>
                                        <label>{d?.tdate}</label>
                                    </div>
                                    <div>
                                        <label>Month year:</label>
                                        <label>{d?.monthYear}</label>
    
                                    </div>
                                    <div>
                                        <label>Amount</label>
                                        <label>{d?.amount}</label>
    
                                    </div>
                                    <div>
                                        <label>From Acoount</label>
                                        <label>{d?.fromAccount}</label>
    
                                    </div>
                                    <div>
                                        <label>To Acoount</label>
                                        <label>{d?.toAccount}</label>
    
                                    </div>
                                    <div>
                                        <div>
                                            <label>Receipt</label>
                                            <img src={d?.receipt} width={100} height={100} alt="" />
                                        </div>
    
                                    </div>
                                    <div>
                                        <div>
                                            <label>Remarks:</label>
                                            <label>{d?.remarks}</label>
                                        </div>
                                        <div>
    
                                        </div>
                                    </div>
    
                                </div>
                            </>
                    <div>
                        <Link className="button-30" to={`/view-data`}>View Transection</Link>
                    </div>
                </div>
            </div>
        </>
            }
        </>
    
    
    )

}

export default Pdata