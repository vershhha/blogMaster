import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../store/features/authSlice'
import { Button, Input, Logo } from './index'
import { useForm } from "react-hook-form"
import authService from '../appwrite/auth'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    //error in the form must be displayed at the UI
    const [error, setError] = useState('')

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(storeLogin(userData))
                //why here, because now user is logged in, in the root different buttons will be displayed
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="80%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                
                    <div className='space-y-5'>
                        <Input 
                            label = 'Email: '
                            placeholder = 'Enter your email'
                            type = 'email'
                            {...register('email', {
                                required: 'Email is required',
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Invalid Email format",
                                }
                            })}
                        />

                        <Input 
                            label = 'Password: '
                            placeholder = 'Enter your password'
                            type = 'password'
                            {...register('password', {
                                required: 'Password is required',
                                minLength: 6
                            })}
                        />
                        
                        <Button type='submit' className='w-full'> Sign In </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
