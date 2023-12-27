import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { useRegistrationMutation } from '../services/AuthService';
import '../index.css'

function RegisterForm () {    
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        jobTitle: Yup.string().required('Job title is required'),
        email: Yup.string()
        .email('E-mail must be valid')
        .required('E-mail is required'),            
        password: Yup.string()
        .required('Password is required')
        .min(1, 'Password must be at least 1 characters'),         
        passwordRepeat: Yup.string()        
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });   
    const formOptions = { resolver: yupResolver(validationSchema) };   
    const [ registration] = useRegistrationMutation();
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState; 
    
    async function onSubmit(props) {
        try {
            registration(props)
            .unwrap()
            .then((payload) => {
                console.log('fulfilled', payload);
                alert("You have successfully registered")
            })
            .catch((error) => {
                console.error('rejected', error);
                alert(error.data?.message)
            });
        } catch (error) {
            errors.submit = [];
            errors.submit.message = error;
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="regForm">
            <input autoFocus className="input" {...register('firstName')} type="text" placeholder='First name'/>     
            <div className="input-errors">{errors.firstName?.message}</div>    
            <input className="input" {...register('lastName')} type="text" placeholder='Last name'/>
            <div className="input-errors">{errors.lastName?.message}</div>    
            <input className="input" {...register('email')} type="text" placeholder='E-mail'/>
            <div className="input-errors">{errors.email?.message}</div>    
            <input className="input" {...register('jobTitle')} type="text" placeholder='Job title'/>
            <div className="input-errors">{errors.jobTitle?.message}</div>    
            <input className="input" {...register('password')} type="password" placeholder='Password'/>
            <div className="input-errors">{errors.password?.message}</div>    
            <input className="input" {...register('passwordRepeat')} type="password" placeholder='Confirm password'/>
            <div className="input-errors">{errors.passwordRepeat?.message}</div>  
            <button className="other">Sign Up</button>
            <div  className="other"> <span>Have an account? <Link className='link' to="../login">Sign In</Link></span></div>  
        </form>
    );
}
export default RegisterForm;
