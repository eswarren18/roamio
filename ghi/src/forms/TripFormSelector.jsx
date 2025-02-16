import React from 'react'
import AddEventForm from '../forms/AddEventForm'
import AddFlightForm from '../forms/AddFlightForm'
import AddLodgingForm from '../forms/AddLodgingForm'
import DeleteActivityForm from '../forms/DeleteActivityForm'
import EditEventForm from '../forms/EditEventForm'
import EditFlightForm from '../forms/EditFlightForm'
import EditLodgingForm from '../forms/EditLodgingForm'
import EditTripForm from '../forms/EditTripForm'

const TripFormSelector = ({
    form,
    tripId,
    tripData,
    activityId,
    activityType,
    onClose,
}) => {
    switch (form) {
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
        case 'EditTripForm':
            return (
                <EditTripForm
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

export default TripFormSelector
