import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../../redux-duck/registerslice";
import * as React from "react";
import { RootState } from "../../redux-duck/store";
import { RegisterForm, RegisterType } from "../../interface/app_interface";



const Register:React.FunctionComponent  = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const reduxData = useSelector((state:RootState) => state.register)


    const values = {
        id:0,
        uname: "",
        email: "",
        password: "",
    }


    const [foValues, setfoValues] = useState<RegisterType>(values);
    const [issubmit, setIssubmit] = useState<boolean>(false);



    const schema = yup.object().shape({
        uname: yup.string().required('Please enter your Name'),
        email: yup.string().required('Please enter your Email').test("user exists","Email is already registered",(email)=>{
            let flag:boolean = false;            
            console.log(reduxData);
            
            for (let key in reduxData) {
                if (reduxData[key].email === email) {
                    console.log(reduxData[key].email)
                    console.log(email)
                    flag = true;
                    break;
                }
            }

            if (flag) {
                return false;
            }else {
                return true;
            }

        }),
        password: yup.string().min(4).required('Please enter your Password')
    })
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: yupResolver(schema)
    });




    const onSubmit = async (data:RegisterForm) => {

        setIssubmit(true)

        setfoValues(data)
    }


    useEffect(() => {
        if (issubmit) {
            const retrivedata = reduxData

            if (reduxData !== null) {
                let previd = retrivedata[retrivedata.length - 1].id;

                    foValues['id'] = previd + 1;
                    // retrivedata.push(foValues)
                    console.log("newwwwwwwwwwwww");
                    dispatch(adduser(foValues))
                    // localStorage.setItem('userdata', JSON.stringify(retrivedata))
            }
            else {

                foValues['id'] = 1;
                dispatch(adduser(foValues))

                // localStorage.setItem('userdata', JSON.stringify([foValues]))
            }

            navigate('/login')
        }
        //eslint-disable-next-line
    }, [issubmit])


    return <>
        <div className="login-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Register</h1>
                <div className="content">
                    <div className="input-field">
                        <input type="text"  placeholder="Name" {...register("uname")} />
                        <p className="error">{errors.uname?.message?.toString()}</p>
                    </div>
                    <div className="input-field">
                        <input type="email"  placeholder="Email"  {...register("email")} />
                        <p className="error">{errors.email?.message?.toString()}</p>
                        
                        
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" {...register("password")} />
                        <p className="error">{errors.password?.message?.toString()}</p>

                    </div>
                </div>
                <div className="action">
                    <Link to={'/login'} className="but">Login</Link>
                    <input type="submit" value={"Sign in"} className="but" />
                </div>
            </form>
        </div>
    </>
}

export default Register;