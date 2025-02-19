import AddFlightForm from './AddFlightForm'
import AddLodgingForm from './AddLodgingForm'
import DeleteActivityForm from './DeleteActivityForm'
import EventForm from './EventForm'
import EditFlightForm from './EditFlightForm'
import EditLodgingForm from './EditLodgingForm'
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
    } else if (action === 'AddFlightForm') {
        return (
            <AddFlightForm
                tripId={tripId}
                tripData={tripData}
                onClose={onClose}
            />
        )
    } else if (action === 'AddLodgingForm') {
        return (
            <AddLodgingForm
                tripId={tripId}
                tripData={tripData}
                onClose={onClose}
            />
        )
    } else if (action === 'EditFlightForm') {
        return (
            <EditFlightForm
                activityId={activityId}
                tripData={tripData}
                onClose={onClose}
            />
        )
    } else if (action === 'EditLodgingForm') {
        return (
            <EditLodgingForm
                activityId={activityId}
                tripData={tripData}
                onClose={onClose}
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
