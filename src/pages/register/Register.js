import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";

const Register = () => {
    const navigate = useNavigate();

    const values = {
        uname: "",
        email: "",
        password: "",
    }


    const [foValues, setfoValues] = useState(values);
    const [issubmit, setIssubmit] = useState(false);



    const schema = yup.object().shape({
        uname: yup.string().required('Please enter your Name'),
        email: yup.string().required('Please enter your Name'),
        password: yup.string().min(4).required('Please enter your Password')
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });




    const onSubmit = async (data) => {

        setIssubmit(true)

        setfoValues(data)
    }


    useEffect(() => {
        if (issubmit) {
            const retrivedata = JSON.parse(localStorage.getItem('userdata'))

            if (localStorage.getItem('userdata') !== null) {
                let previd = retrivedata[retrivedata.length - 1].id;

                    foValues['id'] = previd + 1;
                    retrivedata.push(foValues)
                console.log(retrivedata,">>>>>>>>>")
                    localStorage.setItem('userdata', JSON.stringify(retrivedata))
            }
            else {

                foValues['id'] = 1;

                localStorage.setItem('userdata', JSON.stringify([foValues]))
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
                        <input type="text" name="uname" placeholder="Name" {...register("uname")} />
                        <p className="error">{errors.uname?.message}</p>
                    </div>
                    <div className="input-field">
                        <input type="email" name="email" placeholder="Email"  {...register("email")} />
                        <p className="error">{errors.email?.message}</p>
                        
                        
                    </div>
                    <div className="input-field">
                        <input type="password" name="password" placeholder="Password" {...register("password")} />
                        <p className="error">{errors.password?.message}</p>

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