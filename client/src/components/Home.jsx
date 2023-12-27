import { Navigate } from 'react-router-dom';
import '../index.css'
import { useSelector } from 'react-redux';

function Home () {    
    const auth = useSelector(x => x.auth.value);

    // redirect to home if already logged in
    if (!auth) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            Hi
        </div>
    );
}
export default Home;
