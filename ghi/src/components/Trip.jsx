import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
const apiKey = import.meta.env.GOOGLE_API_KEY

import Accordion from './Accordion'
import AddEventForm from '../forms/AddEventForm'
import AddFlightForm from '../forms/AddFlightForm'
import AddLodgingForm from '../forms/AddLodgingForm'
import DeleteActivityForm from '../forms/DeleteActivityForm'
import EditEventForm from '../forms/EditEventForm'
import EditFlightForm from '../forms/EditFlightForm'
import EditLodgingForm from '../forms/EditLodgingForm'
import EditTripForm from '../forms/EditTripForm'
import Modal from './Modal'

// The Trip component displays details for a single user trip
function Trip() {
    const { isLoggedIn } = useContext(AuthContext)
    const { tripId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [trip, setTrip] = useState({})
    const [tripData, setTripData] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [form, setForm] = useState('')
    const [activityType, setActivityType] = useState('')
    const [activityId, setActivityId] = useState(null)
    const [mapMarkers, setMapMarkers] = useState([])
    const [center, setCenter] = useState()
    const [zoom, setZoom] = useState()

    const navToHome = () => {
        if (!isLoggedIn) {
            navigate('/')
        }
    }

    // Fetches trip details from the db
    const fetchTripData = async () => {
        try {
            const [tripRes, flightsRes, lodgingsRes, eventsRes] =
                await Promise.all([
                    fetch(`http://localhost:8000/api/trips/${tripId}`, {
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                    }),
                    fetch(`http://localhost:8000/api/trips/${tripId}/flights`, {
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                    }),
                    fetch(
                        `http://localhost:8000/api/trips/${tripId}/lodgings`,
                        {
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                        }
                    ),
                    fetch(`http://localhost:8000/api/trips/${tripId}/events`, {
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                    }),
                ])
            if (tripRes.ok && flightsRes.ok && lodgingsRes.ok && eventsRes.ok) {
                const [tripData, flightsData, lodgingsData, eventsData] =
                    await Promise.all([
                        tripRes.json(),
                        flightsRes.json(),
                        lodgingsRes.json(),
                        eventsRes.json(),
                    ])
                setTrip(tripData)
                setupAccordion(tripData, flightsData, lodgingsData, eventsData)
                const combinedLatLngData = [...lodgingsData, ...eventsData]

                let markers
                if (combinedLatLngData.length > 0) {
                    markers = await Promise.all(
                        combinedLatLngData.map((activity) =>
                            fetchLatLng(activity)
                        )
                    )
                } else {
                    const tripLatLng = await fetchLatLng({
                        address: `${tripData.city}, ${tripData.country}`,
                    })
                    setCenter(tripLatLng)
                    setZoom(10)
                    markers = []
                }
                setMapMarkers(markers)
                findCenterAndZoom(markers)
            }
        } catch (e) {
            console.error(e)
        }
    }

    // Fetches latitude and longitude information for each event and lodging from Google's Geocoding API
    const fetchLatLng = async (activity) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${activity.address}&key=${apiKey}`
            )
            if (response.ok) {
                const data = await response.json()
                if (data.results.length > 0) {
                    return data.results[0].geometry.location
                } else {
                    return { lat: 0, lng: 0 }
                }
            }
        } catch (e) {
            console.error(
                `Error fetching geocode data for address: ${activity.address}`,
                e
            )
        }
        return { lat: 0, lng: 0 }
    }

    // Calculates the map's center and zoom level based on the event and lodging markers
    const findCenterAndZoom = (markers) => {
        if (markers.length === 0) {
            setZoom(10)
            return
        }

        if (markers.length === 0) {
            setZoom(10)
            return
        }

        const center = markers.reduce(
            (acc, marker) => ({
                lat: acc.lat + marker.lat,
                lng: acc.lng + marker.lng,
            }),
            { lat: 0, lng: 0 }
        )

        center.lat /= markers.length
        center.lng /= markers.length
        setCenter(center)

        const latitudes = markers.map((m) => m.lat)
        const longitudes = markers.map((m) => m.lng)
        const latDiff = Math.max(...latitudes) - Math.min(...latitudes)
        const lngDiff = Math.max(...longitudes) - Math.min(...longitudes)

        let newZoom = 10
        if (latDiff > 10 || lngDiff > 10) newZoom = 4
        else if (latDiff > 5 || lngDiff > 5) newZoom = 6
        else if (latDiff > 2 || lngDiff > 2) newZoom = 8
        else if (latDiff > 0.5 || lngDiff > 0.5) newZoom = 10
        else newZoom = 12

        setZoom(newZoom)
    }

    // Organizes db info for trip, flights, lodgings, and events to display in the accordion dropdown
    const setupAccordion = (tripData, flights, lodgings, events) => {
        const startDate = new Date(tripData.start_date)
        const endDate = new Date(tripData.end_date)
        const tripAccordionData = {}

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0]
            tripAccordionData[dateKey] = []
        }

        const addDataToDate = (item, type, dateKey) => {
            if (tripAccordionData[dateKey]) {
                tripAccordionData[dateKey].push({ ...item, type })
            }
        }

        flights.forEach((flight) => {
            const dateKey = flight.arrival_time.split('T')[0]
            addDataToDate(flight, 'flight', dateKey)
        })

        lodgings.forEach((lodging) => {
            const checkInKey = lodging.check_in.split('T')[0]
            addDataToDate(
                { ...lodging, isCheckOut: false },
                'lodging_check_in',
                checkInKey
            )

            const checkOutKey = lodging.check_out.split('T')[0]
            if (checkOutKey !== checkInKey) {
                addDataToDate(
                    { ...lodging, isCheckOut: true },
                    'lodging_check_out',
                    checkOutKey
                )
            }
        })

        events.forEach((event) => {
            const dateKey = event.start_date_time.split('T')[0]
            addDataToDate(event, 'event', dateKey)
        })

        Object.keys(tripAccordionData).forEach((dateKey) => {
            tripAccordionData[dateKey].sort((a, b) => {
                const aTime = new Date(
                    a.arrival_time ||
                        (a.isCheckOut ? a.check_out : a.check_in) ||
                        a.start_date_time
                ).getTime()
                const bTime = new Date(
                    b.arrival_time ||
                        (b.isCheckOut ? b.check_out : b.check_in) ||
                        b.start_date_time
                ).getTime()
                return aTime - bTime
            })
        })
        setTripData(tripAccordionData)
    }

    // Function to format provided date string to desired Month Day, Year format
    const formatDate = (dateString) => {
        if (!dateString) return ''

        const [year, month, day] = dateString.split('-') // Split by "-"
        const months = [
            'Janurary',
            'Feburary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]

        return `${months[+month - 1]} ${+day}, ${year}`
    }

    const handleOpenModal = (form, id, activityType) => {
        setForm(form)
        setActivityId(id)
        setActivityType(activityType)
        setIsOpen(true)
    }

    useEffect(() => {
        navToHome()
    }, [isLoggedIn])

    useEffect(() => {
        fetchTripData()
    }, [location.pathname, isOpen, tripId])

    return (
        <div className="flex flex-row h-[calc(100vh-4rem)] w-full">
            <div className="w-4/12 flex flex-col h-full drop-shadow-[0_50px_50px_rgba(0,0,0,0.25)] z-10">
                {/* Trip photo and info */}
                <div className="relative h-60 group">
                    <img
                        className="object-cover w-full h-full"
                        src={trip.trip_image}
                    ></img>
                    <div className="absolute top-0 left-0 w-full h-full flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent p-4 rounded-t-lg">
                        <div className="flex flex-col text-cyan-100">
                            <h1 className="font-bold text-6xl">{trip.title}</h1>
                            <p className="text-cyan-100 pt-3">
                                {formatDate(trip.start_date)} -{' '}
                                {formatDate(trip.end_date)}
                            </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => handleOpenModal('EditTripForm')}
                            >
                                <img
                                    src="/public/edit-icon-100.svg"
                                    alt="Edit"
                                    className="w-10 h-10"
                                />
                            </button>
                            <button
                                onClick={() =>
                                    handleOpenModal(
                                        'DeleteActivityForm',
                                        tripId,
                                        'trip'
                                    )
                                }
                            >
                                <img
                                    src="/public/delete-icon-100.svg"
                                    alt="Delete"
                                    className="w-10 h-10"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Trip itinerary */}
                <div className="scrollbar-hidden px-4 bg-cyan-100 text-cyan-900 flex-grow overflow-x-hidden">
                    <div className="flex justify-between items-center">
                        <div className="py-4 font-bold text-4xl">
                            Trip Itinerary
                        </div>
                        <div className="relative inline-block group z-10">
                            <div className="flex items-center bg-cyan-100 text-cyan-900 cursor-pointer">
                                <span className="text-3xl mr-1">+</span>
                                <span className="pt-1 hover:underline">
                                    Add an Activity
                                </span>
                            </div>
                            <div
                                className="absolute w-48 bg-white border rounded-lg shadow-lg opacity-0 pointer-events-none
                                group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300"
                            >
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() =>
                                        handleOpenModal('AddEventForm')
                                    }
                                >
                                    Add Event
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() =>
                                        handleOpenModal('AddFlightForm')
                                    }
                                >
                                    Add Flight
                                </button>
                                <button
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() =>
                                        handleOpenModal('AddLodgingForm')
                                    }
                                >
                                    Add Lodging
                                </button>
                            </div>
                        </div>
                    </div>
                    {Object.entries(tripData).map(([date, activities]) => (
                        <Accordion
                            key={date}
                            header={date}
                            content={activities}
                            isOpen={isOpen}
                            handleOpenModal={handleOpenModal}
                        />
                    ))}
                </div>
            </div>
            {/* Google map from Maps JavaScript API */}
            <div className="w-8/12 h-full sticky top-0">
                {center && (
                    <APIProvider apiKey={apiKey}>
                        <Map
                            key={`${tripId}-${center.lat}-${center.lng}`} // Adding key to force re-render on center
                            style={{ width: '100%', height: '100%' }}
                            defaultCenter={center}
                            defaultZoom={zoom}
                        >
                            {mapMarkers.map((mapMarker, index) => {
                                return (
                                    <Marker key={index} position={mapMarker} />
                                )
                            })}
                        </Map>
                    </APIProvider>
                )}
            </div>
            {/* Modal */}
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                {form === 'AddEventForm' ? (
                    <AddEventForm
                        tripId={tripId}
                        tripData={tripData}
                        onClose={() => setIsOpen(false)}
                    />
                ) : form === 'AddFlightForm' ? (
                    <AddFlightForm
                        tripId={tripId}
                        tripData={tripData}
                        onClose={() => setIsOpen(false)}
                    />
                ) : form === 'AddLodgingForm' ? (
                    <AddLodgingForm
                        tripId={tripId}
                        tripData={tripData}
                        onClose={() => setIsOpen(false)}
                    />
                ) : form === 'EditEventForm' ? (
                    <EditEventForm
                        activityId={activityId}
                        tripData={tripData}
                        onClose={() => setIsOpen(false)}
                    />
                ) : form === 'EditFlightForm' ? (
                    <EditFlightForm
                        activityId={activityId}
                        tripData={tripData}
                        onClose={() => setIsOpen(false)}
                    />
                ) : form === 'EditLodgingForm' ? (
                    <EditLodgingForm
                        activityId={activityId}
                        tripData={tripData}
                        onClose={() => setIsOpen(false)}
                    />
                ) : form === 'EditTripForm' ? (
                    <EditTripForm
                        tripId={tripId}
                        tripData={tripData}
                        onClose={() => setIsOpen(false)}
                    />
                ) : form === 'DeleteActivityForm' ? (
                    <DeleteActivityForm
                        activityType={activityType}
                        activityId={activityId}
                        onClose={() => setIsOpen(false)}
                    />
                ) : null}
            </Modal>
        </div>
    )
}

export default Trip
