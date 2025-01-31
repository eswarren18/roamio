import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { ModalContext } from './ModalProvider';

const images = [
    "/public/hiking.jpg",
    "/public/rooftop-dinner.jpg",
    "/public/desert-road.jpg"
];

// The Home component is displayed when the user is logged out
function Home() {
    const { isLoggedIn } = useContext(AuthContext);
    const [imageIndex, setImageIndex] = useState(0);
    const { toggleModal } = useContext(ModalContext);
    const navigate = useNavigate();

    const navToDashboard = () => {
        if(isLoggedIn) {
            navigate("/dashboard")
        }
    }

    useEffect(() => {
        navToDashboard()
        const interval = setInterval(() => {
            setImageIndex((prevImageIndex) => (prevImageIndex + 1) % images.length);}, 6000
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex flex-col w-full">
            {/* Navigation bar */}
            <div
                className="absolute top-0 z-10 text-cyan-100 px-4 pt-8 pb-24 w-full bg-gradient-to-b from-black/80 to-transparent"
                id="navigation"
            >
                <div className="w-11/12 grid grid-cols-3 items-center mx-auto">
                    <div></div>
                    <div className="flex justify-center items-center">
                        <img src="/public/globe.svg" alt="Logo" className="w-12 h-12" />
                        <div className="text-4xl font-bold tracking-tight ml-3">Roamio</div>
                    </div>
                    <div className="flex space-x-4 justify-end">
                        <button
                            className="text-cyan-100 hover:underline"
                            onClick={() => toggleModal({ form: "SignInModal" })}
                        >
                            Log In
                        </button>
                        <button
                            className="bg-cyan-900 hover:bg-cyan-700 text-cyan-100 px-5 py-2 rounded-full transition duration-200"
                            onClick={() => toggleModal({ form: "SignUpModal" })}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
            {/* Carousel of images */}
            <div
                className="relative w-full h-screen"
                id="carousel"
            >
                <div className="overflow-hidden w-full h-full relative">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className={`w-full h-full object-cover absolute transition-opacity duration-[2000ms] ${
                                index === imageIndex ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    ))}
                </div>
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
        </div>
    );
}


export default Home;
