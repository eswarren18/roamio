import { useLoadScript } from '@react-google-maps/api';

// Gets the Google Api Key from .env
const apiKey = import.meta.env.GOOGLE_API_KEY;

// Loads places library to load with Google Maps API
const libraries = ['places'];

// Component that loads the Google Maps script
export const GoogleMapsLoader = ({ children }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: libraries,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return <>{children}</>;
};
