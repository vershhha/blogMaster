import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/features/authSlice'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
        .catch((error)=>{
            console.error('Error fetching current user:', error);
        })
    }
    
    return (
        <button onClick={logoutHandler}
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
            Logout
        </button>
    )
}

export default LogoutBtn
