import LodgingForm from './LodgingForm'
import DeleteActivityForm from './DeleteActivityForm'
import EventForm from './EventForm'
import FlightForm from './FlightForm'
import TripForm from './TripForm'

const FormSelector = ({ action, tripId, tripData, activityId, onClose }) => {
    if (action === 'editEvent' || action === 'addEvent') {
        return (
            <EventForm
                action={action}
                tripId={tripId}
                tripData={tripData}
                onClose={onClose}
            />
        )
    } else if (action === 'addLodging' || action === 'editLodging') {
        return (
            <LodgingForm
                activityId={activityId}
                tripId={tripId}
                tripData={tripData}
                onClose={onClose}
                action={action}
            />
        )
    } else if (action === 'editFlight' || action === 'addFlight') {
        return (
            <FlightForm
                activityId={activityId}
                tripData={tripData}
                tripId={tripId}
                onClose={onClose}
                action={action}
            />
        )
    } else if (action === 'editTrip' || action === 'addTrip') {
        return (
            <TripForm
                action={action}
                tripId={tripId}
                tripData={tripData}
                onClose={onClose}
            />
        )
    } else if (action.includes('delete')) {
        return (
            <DeleteActivityForm
                action={action}
                activityId={activityId}
                onClose={onClose}
            />
        )
    } else {
        return null
    }
}

export default FormSelector
