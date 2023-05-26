import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { ThreeDots } from 'react-loader-spinner';
import { RootState } from '../../redux-duck/store';
import * as React from 'react'
import { LoginForm } from '../../interface/app_interface';


const Login:React.FunctionComponent  = () => {
    const navigate = useNavigate();

    const values :LoginForm = {
        email: "",
        password: "",
        token : ""
    }

   
    const [loading, setloading] = useState(false)
    const [cookies,setCookie] = useCookies(['tempdata']);
    console.log(cookies)    ;
    const reduxData = useSelector((state:RootState) => state.register)

    const data = reduxData

    const [foValues, setfoValues] = useState<LoginForm>(values);
    const [issubmit, setIssubmit] = useState<boolean>(false);


    const schema = yup.object().shape({
        email: yup.string().required('Please enter your Email'),
        password: yup.string().required('Please enter your Password')
    })

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
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


                setCookie('tempdata', {email :foValues['email'],token:foValues['token']}, {path : '/', maxAge: 3600});

                // localStorage.setItem('tempdata', JSON.stringify(foValues))

                navigate('/view-data')
            }
        }
        //eslint-disable-next-line
    }, [issubmit])

    const onSubmit : SubmitHandler<LoginForm> = async (data) => {

        setIssubmit(true)

        setfoValues(data)
    }

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
            
            <div className="login-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <div className="content">
                        <div className="input-field">
                            <input type="email" placeholder="Email"  {...register('email')} />
                            <p className='error'>{errors.email?.message?.toString()}</p>
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Password"  {...register('password')} />
                            <p className='error'>{errors.password?.message?.toString()}</p>
                        </div>
    
                    </div>
                    <div className="action">
                        <Link to={'/public/register'} className="but">Register</Link>
                        <input type="submit" value={"Sign in"} className="but" />
                    </div>
                </form>
            </div>
        
     
}
        </>
    
       )
}


export default Login;