import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import './humburgerMenu.css';
import { IoArrowForward } from 'react-icons/io5';
import { FaSearch, FaUserPlus, FaListAlt, FaUserEdit, FaCogs, FaSignOutAlt } from 'react-icons/fa';



const HamburgerMenu = () => {

    const [menuOpen, setmenuOpen] = useState(false);
    const logout = useAuthStore((state)=>state.logout);


    const toggleMenu = ()=>{
        setmenuOpen(!menuOpen);
    }
    const logoutUser = ()=>{
        logout();
    }

    return ( 
        <div className='hamber-menu-container'>
            <button className={`hamburger ${menuOpen ? 'active' : ''} `} onClick={toggleMenu}><span className={`${menuOpen ? 'far fa-caret-square-down' : 'fas fa-bars'}`}></span></button>
                <div className={`menu-overlay ${menuOpen ? 'show' : ''}`}>
                <div className="menu-content">
                    <IoArrowForward className="close-btn-menu" onClick={toggleMenu} title="بازگشت" />
                    <h3>دسترسی‌ها</h3>

                    {/* گزینه‌های اصلی */}
                    <Link to="/search" className="menu-item">
                        <FaSearch className="menu-item-icon" /> جستجوی پزشک
                    </Link>
                    <Link to="/oncall-list" className="menu-item">
                        <FaListAlt className="menu-item-icon" /> لیست آنکالی
                    </Link>

                    {/* گزینه‌های ویژه ادمین */}
                    <Link to="/add-doctor" className="menu-item admin">
                        <FaUserPlus className="menu-item-icon" /> افزودن پزشک
                    </Link>
                    <Link to="/profile" className="menu-item">
                        <FaUserEdit className="menu-item-icon" /> پروفایل
                    </Link>
                    <Link to="/settings" className="menu-item">
                        <FaCogs className="menu-item-icon" /> تنظیمات
                    </Link>

                    {/* خروج از حساب */}
                    <Link to="/" className="menu-item logout" onClick={logoutUser}>
                        <FaSignOutAlt className="menu-item-icon" /> خروج از حساب
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default HamburgerMenu;