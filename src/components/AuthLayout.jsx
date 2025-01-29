import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Loading } from './index'

//redooooooooooooo

function AuthLayout({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        // if (authStatus !== authentication) {
        //     if (authentication) {
        //         navigate('/login'); 
        //     } else {
        //         navigate('/'); 
        //     }
        // }
        if(!authStatus && authentication) navigate('/login')
        
        setLoader(false)
    },[authStatus, authentication, navigate])

    return loader ? <Loading/> : <>{children}</>
}

export default AuthLayout

