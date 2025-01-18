import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const images = [
    "/public/mountain-view.jpg",
    "/public/passenger-seat.jpg",
    "/public/desert-road.jpg"
];

function Home() {
    const { isLoggedIn } = useContext(AuthContext);
    const [imageIndex, setImageIndex] = useState(0);
    const navigate = useNavigate();

    const navToDashboard = () => {
        if(isLoggedIn) {
            navigate("/dashboard")
        }
    }

    useEffect(() => {
        navToDashboard()
        const interval = setInterval(() => {
            setImageIndex((prevImageIndex) => (prevImageIndex + 1) % images.length);}, 5000
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-screen">
            {/* Carousel Images */}
            <div className="overflow-hidden w-full h-full rounded-lg shadow-lg relative">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${
                            index === imageIndex ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`h-3 w-3 rounded-full bg-white transition ${
                            index === imageIndex ? "bg-gray-900" : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}


export default Home;
