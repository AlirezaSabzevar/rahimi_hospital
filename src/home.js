import './home.css';
import {React, useEffect} from 'react';
import Navbar from './Navbar/navbar.jsx';
import AppointmentBox from './AppointmentBox/appointment';
import LoginForm from './LoginForm/loginform';
import { useAuthStore } from './store';
import { useThemeStore } from './store';


const Home = () => {
    const {user} = useAuthStore();
    const {theme} = useThemeStore();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);



    return user ? ( 
        <div className='body'>
            <Navbar/>
            <AppointmentBox/>
        </div>
    ) : (
        <LoginForm/>
    )
}
 
export default Home;