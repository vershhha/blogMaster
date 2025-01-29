import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { login as storeLogin } from '../store/features/authSlice'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { Input, Button, Logo } from './index'

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const {register, handleSubmit} = useForm();

    const signup = async (data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(storeLogin(data))
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
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have any account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5 mt-8'>
                        <Input
                            label = 'Full Name: '
                            placeholder = 'Enter your full name'
                            type = "text"
                            {...register('name', {required: true, minLength: 3})}
                        />
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

                        <Button type='submit' className='w-full'> Create Account </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
