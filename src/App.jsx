import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/features/authSlice'
import { Loading, Header, Footer } from './components/index';
import { Outlet } from "react-router"

function App() {
  //all the data is being fetched from appwrite, it can take some time
  //while waiting for the data we can show loading icon, this state is for that
  const [loading, setLoading] = useState(true);
  
  // i will need to change the authentication state of the user, if logged in or not
  const dispatch = useDispatch()

  // whenever app is reloading
  // we are trying to fetch the current user: if we have it, we will update it in the store and let the components know that we have a user
  // else clear the store

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=> {
      if(userData) dispatch(login({userData}))
      else dispatch(logout());
    })
    .catch((error) => {
      // Handle any unexpected errors here, e.g., network issues, appwrite connection errors
      console.error('Error fetching current user:', error);
    })
    .finally( () => setLoading(false) )
  },[])

  return loading? <Loading/>: 
    <div className='min-h-screen flex flex-wrap content-between bg-[#172842]'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
}

export default App