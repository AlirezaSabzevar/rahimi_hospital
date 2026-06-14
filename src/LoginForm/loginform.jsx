import './loginform.css'
import { useAuthStore } from '../store';
import { useEffect, useState } from "react";
import { FaUser, FaLock } from 'react-icons/fa';

function LoginForm() {
    const login = useAuthStore((state)=>state.login);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        document.body.classList.add('dark-theme');
        return()=>{
            document.body.classList.remove('dark-theme');
        };
    },[]);

    const handleLogin = ()=>{
        if(!name && !password){
            setError('لطفا نام کاربری و کلمه عبور را وارد کنید');
            return;
        }
        if(!password){
            setError('لطفا کلمه عبور را وارد کنید');
            return;
        }
        if(password.length < 6 ){
            setError('کلمه عبور انتخاب شده باید حداقل 6 کاراکتر باشد');
            return;
        }
        setError('');
        login({name, password});
    };

    return (
        <div className='all-content'>
            <div className="login-description">
                <img
                src="https://www.uniref.ir//media/lo/1524.webp"
                alt="Lorestan-Medical-Sciences-Logo"
                />
                <p className='title-1'>سیستم آنکالی پزشکان و پرستاران بیمارستان فوق تخصصی رحیمی خرم آباد</p>
                <p className='title-2'>دانشگاه علوم پزشکی و خدمات درمانی لرستان</p>
                <button className='btn btn-secondary mt-5'>درباره محصول</button>
            </div>
            <div className="frame-form">
                <h2 className="login">ورود به سیستم</h2>
                {error && <div className='text-danger m-3'>{error}</div>}
                <div className="inputs">
                    <FaUser className='user-item' style={{fontSize:'25px'}}/>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="نام کاربری"/>
                    <FaLock className='lock-item' style={{fontSize:'25px'}}/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="کلمه عبور"/>
                </div>
                <p className="forget"><a href="forget">کلمه عبور یا نام کاربری خود را فراموش کرده اید؟</a></p>   
                <label htmlFor="#" className='remember'>
                    من را به خاطر بسپار <input type="checkbox" name="checkbox" id="checkbox" />
                </label>
                <button onClick={handleLogin} className="btn btn-primary log-btn">ورود</button>
            </div>
        </div>
    );
}

export default LoginForm;