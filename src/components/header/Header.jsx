import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';


function Header() {
    //checking if the user is logged in or not from the store - auth is the name of the feature
    const authStatus = useSelector((state => state.auth.status))

    const navigate = useNavigate();

    // we are creating a navbar
    const navItems = [
        {  
            name: 'Home',
            path: '/',
            active: true
        },
        {  
            name: 'Login',
            path: '/login',
            active: !authStatus
        },
        {  
            name: 'SignUp',
            path: '/signup',
            active: !authStatus
        },
        {  
            name: 'All Posts',
            path: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            path: '/add-post',
            active: authStatus
        }
    ]

    return (
        <header className='py-3 shadow bg-[#0d68af]'>
            <Container> 
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to = '/'>
                            <Logo width='10%' className = 'mb-2'   />
                        </Link>
                    </div>
                    <ul className='flex ml-auto py-2'>
                        {navItems.map((item)=>(
                            item.active? (
                                <li key={item.name} className='ml-2'>
                                    <button onClick={()=> navigate(item.path)}
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        ))}

                        {authStatus && (
                            <li> <LogoutBtn/> </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
