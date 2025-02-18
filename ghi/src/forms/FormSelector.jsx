import AddEventForm from './AddEventForm'
import AddFlightForm from './AddFlightForm'
import AddLodgingForm from './AddLodgingForm'
import DeleteActivityForm from './DeleteActivityForm'
import EditEventForm from './EditEventForm'
import EditFlightForm from './EditFlightForm'
import EditLodgingForm from './EditLodgingForm'
import TripForm from './TripForm'

const FormSelector = ({
    form,
    action,
    tripId,
    tripData,
    activityId,
    activityType,
    onClose,
}) => {
    switch (action | form) {
        case 'AddEventForm':
            return (
                <AddEventForm
                    tripId={tripId}
                    tripData={tripData}
                    onClose={onClose}
                />
            )
        case 'AddFlightForm':
            return (
                <AddFlightForm
                    tripId={tripId}
                    tripData={tripData}
                    onClose={onClose}
                />
            )
        case 'AddLodgingForm':
            return (
                <AddLodgingForm
                    tripId={tripId}
                    tripData={tripData}
                    onClose={onClose}
                />
            )
        case 'EditEventForm':
            return (
                <EditEventForm
                    activityId={activityId}
                    tripData={tripData}
                    onClose={onClose}
                />
            )
        case 'EditFlightForm':
            return (
                <EditFlightForm
                    activityId={activityId}
                    tripData={tripData}
                    onClose={onClose}
                />
            )
        case 'EditLodgingForm':
            return (
                <EditLodgingForm
                    activityId={activityId}
                    tripData={tripData}
                    onClose={onClose}
                />
            )
        case 'editTrip' | 'addTrip':
            return (
                <TripForm
                    action={action}
                    tripId={tripId}
                    tripData={tripData}
                    onClose={onClose}
                />
            )
        case 'DeleteActivityForm':
            return (
                <DeleteActivityForm
                    activityType={activityType}
                    activityId={activityId}
                    onClose={onClose}
                />
            )
        default:
            return null
    }
}

export default FormSelector
