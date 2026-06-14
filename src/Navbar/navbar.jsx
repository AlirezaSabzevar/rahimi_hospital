import './navbar.css';
import HamburgerMenu from '../HambugerMenu/humburgerMenu';

const Navbar = () => {

    return ( 
        <div>
            <nav className="nav-container-fluid"> 
                <img className='logo' src="https://ghalebpro.ir/wp-content/uploads/2022/02/Lorestan-Medical-Sciences-Logo.svg" alt="logo" />
                <h1 className='title-date'>سامانه آنکالی بیمارستان فوق‌تخصصی رحیمی خرم‌آباد</h1>
                <HamburgerMenu/>
            </nav>
        </div>
    );
}
 
export default Navbar;