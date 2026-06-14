import { Routes, Route } from 'react-router-dom';
import Home from './home.js';
// import LoginForm from './LoginForm/loginform.jsx';
import ForgetForm from './forgetForm/forgetForm.jsx';
import Settings from './Settings/settings.jsx';
import SearchDoctor from './SearchDoctor/searchdoctor.jsx';
import OnCallList from './OncallList/oncallList.jsx';
import AddDoctor from './AddDoctor/addDoctor.jsx';
import Profile from './Profile/Profile.jsx';



const App = () => { 
        return (
            <div>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/forget' element={<ForgetForm/>}/>
                    <Route path='/search' element={<SearchDoctor/>}/>
                    <Route path='/settings' element={<Settings/>}/>
                    <Route path='/oncall-list' element={<OnCallList/>}/>
                    <Route path='/add-doctor' element={<AddDoctor/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
            </div>
        );
    }
 
export default App;



// #003366
// #1e3c72
// #cccccc
// #f0f0f0
// #ffffff
// #ffcc00
// #ff6600
// #ff3300
// #ff0000
// #00cc00
// #009900
// #006600
// #003300
// #000000
// #333333
// #666666
// #999999
