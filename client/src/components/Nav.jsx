
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLogoutMutation } from '../services/AuthService';

//import { authActions } from '_store';


function Nav() {
   const auth = useSelector(x => x.auth.value);
   const [ logout ] = useLogoutMutation();
    //const dispatch = useDispatch();
    ////const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <nav className="navbar">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/users">Users</NavLink>
                <button onClick={logout}>Logout</button>
        </nav>
    );
}
export default Nav;