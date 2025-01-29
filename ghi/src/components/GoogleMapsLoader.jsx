import { useLoadScript } from '@react-google-maps/api';

const apiKey = import.meta.env.GOOGLE_API_KEY;
const libraries = ['places'];

export const GoogleMapsLoader = ({ children }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: libraries,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return <>{children}</>;
};
