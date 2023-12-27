import React from 'react';
import RegisterForm from './components/RegistrationForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import Nav from './components/Nav.jsx';
import './index.css'
import { Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx';


function App () {
    // const [ checkAuth ] = useCheckAuthMutation();
    // const navigate = useNavigate();
    // // const {store} = useContext(Context)
    // //useEffect(checkAuth)
    
    return (
        <div className="app-container">
            <Nav/>
             <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/registration" element={<RegisterForm />} />
            </Routes>
        </div>
    );
}

export default App;
