import { useEffect, useState } from "react";
import "./css/form.css";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addtransection, updatetransection } from "../../redux-duck/transectionslice";
import { ThreeDots } from "react-loader-spinner";
import * as React from  "react";
import { RootState } from "../../redux-duck/store";
import { TransectionType } from "../../interface/app_interface";



const Transection:React.FunctionComponent  = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false)

    const { id } = useParams();


    const schema = yup.object().shape({
        tdate: yup.string().required('Please enter Transection Date'),
        monthYear: yup.string().required('PLease enter month Year'),
        ttype: yup.string().required('Please enter your Transection type'),
        amount: yup.number().typeError('Please enter your amount').positive("Amount must be in postive value").integer(),
        fromAccount: yup.string().required('Please select account'),
        toAccount: yup.string().notOneOf([yup.ref('fromAccount')], ('FromAccount and to account must be diffrent')).required('Please select account'),
        receipt: yup.mixed().test("required", "You need to provide receipt", (receipt: yup.AnyObject | undefined |"") => {
            if (receipt !== undefined) {
                
                if (receipt.length > 0) return true;
                return false;
            }
            else
            {
                return false;
            }
        }).test("fileSize", "The file is too large", (value: yup.AnyObject | undefined |"") => {
            if (value) {
                if (typeof value === 'string') {
                    return true
                }
                else {
                    return value[0] && value[0].size <= 1000000
                }
            }
            else{
                return false
            }
            
        }),

        remarks: yup.string().required('Please enter your notes'),

    })




    let date = new Date();
    let year = date.getFullYear();
    const values = {
        id : 0,
        tdate: "",
        monthYear: "",
        ttype: "",
        amount: 0,
        fromAccount: "",
        toAccount: "",
        receipt: "",
        remarks: "",
    };


    const reduxData = useSelector((state: RootState) => state.transection)

    // const {contextData,setcontextData} = UsetransData()
    // console.log(contextData);

    const getdata = reduxData

    const [foValues, setfoValues] = useState<TransectionType>(values);


    useEffect(() => {
        for (const key in getdata) {
            if (Number(getdata[key].id) === Number(id)) {
                setfoValues(getdata[key])
                break;
            }
        }
        //eslint-disable-next-line
    }, [id])

    let dummy = getdata.filter((value:TransectionType) => {
        return Number(value.id) === Number(id)
    });


    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TransectionType>({
        resolver: yupResolver(schema), defaultValues: dummy[0]
    });

    const [issubmit, setIssubmit] = useState<boolean>(false);



    const remove = () => {

        setfoValues({ ...foValues, receipt: "" })
        setValue("receipt", "")
    }

    async function bs(file:Blob) {

    
        let reader = new FileReader()
        reader.readAsDataURL(file)
        await new Promise<void>(resolve => reader.onload = () => resolve())
        return reader.result
    }

    const onSubmit = async (data:TransectionType) => {

    
                
                if (typeof (data.receipt) !== "string") {
                    let url = await bs(data.receipt[0])
        
                    data.receipt = url ?url?.toString(): "";
                }
           
        
        setIssubmit(true)

        setfoValues(data)
    }


    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false);
        }, 1000)
    }, [])


    useEffect(() => {

        if (issubmit) {
            let retrivedata = reduxData
            if (retrivedata !== null) {


                // const retrivedata = JSON.parse(localStorage.getItem('fovalues'))

                if (id) {

                    dispatch(updatetransection(foValues))
                } else {
                    let previd = retrivedata[retrivedata.length - 1].id;

                    foValues['id'] = previd + 1;
                    // retrivedata.push(foValues)
                    dispatch(addtransection(foValues))
                }

                // setcontextData(retrivedata)
                // localStorage.setItem('fovalues', JSON.stringify(retrivedata))

            } else {

                foValues['id'] = 1;
                // setcontextData(retrivedata)
                dispatch(addtransection(foValues))

                // localStorage.setItem('fovalues', JSON.stringify([foValues]))

            }
            navigate('/view-data');
        }
        //eslint-disable-next-line
    }, [issubmit])






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
            <div className="container">
                <h2>Khata-book</h2>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Date of your transaction</label>
                        <input

                            type="date"
                            // value={foValues.tdate}
                            {...register("tdate")}
                        />
                        <p className="error">{errors.tdate?.message?.toString()}</p>
                    </div>
                    <div>
                        <label>Month year</label>
                        <select {...register("monthYear")}
                        // value={foValues.monthYear}
                        >
                            <option value={""}>Select Month & Year</option>
                            <option value={`Jan ${year}`}>Jan {year}</option>
                            <option value={`Feb ${year}`}>Feb {year}</option>
                            <option value={`Mar ${year}`}>Mar {year}</option>
                            <option value={`Apr ${year}`}>Apr {year}</option>
                            <option value={`May ${year}`}>May {year}</option>
                            <option value={`Jun ${year}`}>Jun {year}</option>
                            <option value={`Jul ${year}`}>Jul {year}</option>
                            <option value={`Aug ${year}`}>Aug {year}</option>
                            <option value={`Sep ${year}`}>Sep {year}</option>
                            <option value={`Oct ${year}`}>Oct {year}</option>
                            <option value={`Nov ${year}`}>Nov {year}</option>
                            <option value={`Dec ${year}`}>Dec {year}</option>
                        </select>
                        <p className="error">{errors.monthYear?.message?.toString()}</p>
                    </div>
                    <div>
                        <label>Transection Type</label>
                        <select {...register("ttype")}
                        // value={foValues.ttype}
                        >
                            <option value={""}>Select Type</option>
                            <option value={`Home Expense`}>Home Expense</option>
                            <option value={`Personal  Expense`}>Personal  Expense</option>
                            <option value={`Income`}>Income</option>

                        </select>
                        <p className="error">{errors.ttype?.message?.toString()}</p>
                    </div>
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            // placeholder="Enter your amount"
                            // value={foValues.amount.toLocaleString("en-US")}
                            {...register("amount")}
                        />
                        <p className="error">{errors.amount?.message?.toString()}</p>
                    </div>
                    <div>
                        <label>From Acoount</label>.
                        <select {...register("fromAccount")}
                        // value={foValues.fromAccount}
                        >
                            <option value={""}>Select Acoount</option>
                            <option value={"Personal Account"}>Personal Account</option>
                            <option value={"Real Living"}>Real Living</option>
                            <option value={"My Dream Home"}>My Dream Home</option>
                            <option value={"Full Circle"}>Full Circle</option>
                            <option value={"Core Realtors"}>Core Realtors</option>
                            <option value={"Big Block"}>Big Block</option>
                        </select>
                        <p className="error">{errors.fromAccount?.message?.toString()}</p>
                    </div>
                    <div>
                        <label>To Acoount</label>
                        <select {...register("toAccount")}
                        // value={foValues.toAccount}
                        >
                            <option value={""}>Select Acoount</option>
                            <option value={"Personal Account"}>Personal Account</option>
                            <option value={"Real Living"}>Real Living</option>
                            <option value={"My Dream Home"}>My Dream Home</option>
                            <option value={"Full Circle"}>Full Circle</option>
                            <option value={"Core Realtors"}>Core Realtors</option>
                            <option value={"Big Block"}>Big Block</option>
                        </select>
                        <p className="error">{errors.toAccount?.message?.toString()}</p>

                        {/* {foerror.same ? <p className="error">{foerror.same}</p> : null} */}
                    </div>
                    <div>
                        <div>
                            <label>Receipt</label>
                        </div>
                        <div>
                            {
                                foValues.receipt ? <><img src={foValues.receipt} width={100} height={100} alt="" /><i className="fa fa-close" style={{ fontSize: 40, color: "red" }} onClick={remove}></i> </> :
                                    <input
                                        type="file"
                                        
                                        accept="image/*"
                                        {...register("receipt",
                                            {
                                                onChange: async (e) => {
                                                    let file = await bs(e.target.files[0])

                                                    setfoValues({ ...foValues, receipt: file ? file?.toString() : '' })
                                                }
                                            }
                                        )}
                                    // value={foValues.receipt}

                                    />
                            }
                            <p className="error">{errors.receipt?.message?.toString()}</p>
                        </div>

                    </div>
                    <div>
                        <div>
                            <label>Remarks:</label>
                        </div>
                        <div>
                            <textarea
                                // value={foValues.remarks}
                                {...register("remarks")}
                            ></textarea>
                            <p className="error">{errors.remarks?.message?.toString()}</p>
                        </div>
                    </div>
                    <div>
                        <input type="submit" value={"submit"} />
                    </div>
                </form>


                <div>
                    <Link className="button-30" to={`/view-data`}>View Transection</Link>
                </div>
            </div>
        </>
        }
        </>
        
        
    );
};

export default Transection;
