import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";


const Login = () => {
    const navigate = useNavigate();
    const values = {
        email: "",
        password: ""
    }

    const data = JSON.parse(localStorage.getItem('userdata'))
    console.log(data);

    const [foValues, setfoValues] = useState(values);
    const [issubmit, setIssubmit] = useState(false);


    const schema = yup.object().shape({
        email: yup.string().required('Please enter your Name'),
        password: yup.string().required('Please enter your Password')
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (issubmit) {
            let flag = false
            for (const key in data) {
                if ((data[key].email === foValues.email) && (data[key].password === foValues.password)) {

                    flag = true
                    break;

                }else{
                    alert("Please type your email address and password correctly")
                }
            }
            if (flag === true) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < 17) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    counter += 1;
                }

                foValues['token'] = result;

                localStorage.setItem('tempdata', JSON.stringify(foValues))

                navigate('/view-data')
            }
        }
        //eslint-disable-next-line
    }, [issubmit])

    const onSubmit = async (data) => {

        setIssubmit(true)

        setfoValues(data)
    }

    return <>
        <div className="login-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <div className="content">
                    <div className="input-field">
                        <input type="email" placeholder="Email" name='email' {...register('email')} />
                        <p className='error'>{errors.email?.message}</p>
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" name='password' {...register('password')} />
                        <p className='error'>{errors.password?.message}</p>
                    </div>

                </div>
                <div className="action">
                    <Link to={'/public/register'} className="but">Register</Link>
                    <input type="submit" value={"Sign in"} className="but" />
                </div>
            </form>
        </div>
    </>

}


export default Login;