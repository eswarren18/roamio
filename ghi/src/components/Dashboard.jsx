import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


function Dashboard() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const navToHome = () => {
        if (!isLoggedIn) {
            navigate("/")
        }
    }

    useEffect(() => {navToHome()},[]);

    return (
            <h1 className="text-center">My dashboard</h1>

    )
}

export default Dashboard;
