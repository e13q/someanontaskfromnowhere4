import * as Yup from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { useLoginMutation, useLogoutMutation } from '../services/AuthService';
import '../index.css'
import Nav from './Nav';
import { useSelector } from 'react-redux';

function RegisterForm () {    
    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .email('Invalid e-mail')
        .required('E-mail is required'),            
        password: Yup.string()
        .required('Password is required'), 
    });   
    const formOptions = { resolver: yupResolver(validationSchema) };   
    const [ register2, {data, isUninitialized: isLoading } ] = useLoginMutation();
    const [ register3 ] = useLogoutMutation();
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState; 
    const f = useSelector(x=>x.auth.value);
    const navigate = useNavigate();
    
    async function onSubmit(props) {
        try {
            await register2(props)
            .unwrap()
            .then((payload) => navigate('..'))
            .catch((error) => console.error('rejected ', error))
        } catch (error) {
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="regForm">  
            <input autoFocus className="input" {...register('email')} type="text" placeholder='E-mail'/>
            <div className="input-errors">{errors.email?.message}</div>    
            <input className="input" {...register('password')} type="password" placeholder='Password'/>
            <div className="input-errors">{errors.password?.message}</div>    
            <button className="other">Sign In</button>
            <div  className="other"> <span>Don't have an account? <Link className='link' to="../registration">Sign Up</Link></span></div>  
        </form>
    );
}
export default RegisterForm;
