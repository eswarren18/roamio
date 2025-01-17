import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


function Home() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const navToDashboard = () => {
        if (isLoggedIn) {
            navigate("/dashboard")
        }
    }

    useEffect(() => {navToDashboard()},[]);

    return (
            <h1 className="text-center">A carousel of very pretty pictures</h1>

    )
}

export default Home;
