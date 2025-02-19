import { useState } from 'react'

// Accordion components are displayed on the users Trip page. One dropdown accordion component is displayed per date.
export default function Accordion({ header, content, handleOpenModal }) {
    const [accordionOpen, setAccordionOpen] = useState(false)

    // Returns accordion cards
    const parseContent = (activity) => {
        switch (activity.type) {
            case 'event':
                const startDateTime = new Date(activity.start_date_time)
                const endDateTime = new Date(activity.end_date_time)
                const sameDay =
                    startDateTime.toDateString() === endDateTime.toDateString()
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="flex flex-col bg-gray-50 text-gray-500 rounded-lg py-2 px-4 w-full">
                            <div className="font-bold text-2xl mb-1 text-black">
                                {activity.name}
                            </div>
                            <div>{activity.address}</div>
                            <div className="flex flex-col justify-between h-full mr-2">
                                <div>
                                    <div className="pt-2">Description:</div>
                                    <div>{activity.description}</div>
                                </div>
                                {sameDay ? (
                                    <div className="mt-4">
                                        {`${startDateTime.toLocaleDateString(
                                            [],
                                            { month: 'short', day: '2-digit' }
                                        )} `}
                                        <span className="p-1 w-fit bg-orange-100 text-orange-500 rounded-lg">
                                            {startDateTime.toLocaleTimeString(
                                                [],
                                                {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                }
                                            )}
                                        </span>
                                        {' - '}
                                        <span className="p-1 w-fit bg-orange-100 text-orange-500 rounded-lg">
                                            {endDateTime.toLocaleTimeString(
                                                [],
                                                {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                }
                                            )}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        {`${startDateTime.toLocaleDateString(
                                            [],
                                            { month: 'short', day: '2-digit' }
                                        )} `}
                                        <span className="p-1 w-fit bg-orange-100 text-orange-500 rounded-lg">
                                            {startDateTime.toLocaleTimeString(
                                                [],
                                                {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                }
                                            )}
                                        </span>
                                        {` - ${endDateTime.toLocaleDateString(
                                            [],
                                            { month: 'short', day: '2-digit' }
                                        )} `}
                                        <span className="p-1 w-fit bg-orange-100 text-orange-500 rounded-lg">
                                            {endDateTime.toLocaleTimeString(
                                                [],
                                                {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                }
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex p-2 gap-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button
                                onClick={() =>
                                    handleOpenModal(
                                        'EditEventForm',
                                        activity.id
                                    )
                                }
                            >
                                <img
                                    src="/public/edit-icon-gray.svg"
                                    alt="Edit"
                                    className="w-6 h-6"
                                />
                            </button>
                            <button
                                onClick={() =>
                                    handleOpenModal('deleteEvent', activity.id)
                                }
                            >
                                <img
                                    src="/public/delete-icon-gray.svg"
                                    alt="Delete"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    </div>
                )
            case 'flight':
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="flex flex-col bg-gray-50 text-gray-500 rounded-lg py-2 px-4 w-full">
                            <div className="font-bold text-2xl mb-1 text-black">
                                Flight
                            </div>
                            <div>Flight Number: {activity.flight_number}</div>
                            <div className="mt-2 w-fit">
                                <span className="mr-1">Departure:</span>
                                <span className="bg-orange-100 text-orange-500 rounded-lg p-1">
                                    {new Date(
                                        activity.departure_time
                                    ).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                                <span className="ml-3 mr-1">Arrival:</span>
                                <span className="bg-orange-100 text-orange-500 rounded-lg p-1">
                                    {new Date(
                                        activity.arrival_time
                                    ).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>
                        <div className="flex p-2 gap-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button
                                onClick={() =>
                                    handleOpenModal(
                                        'editFlight',
                                        activity.id
                                    )
                                }
                            >
                                <img
                                    src="/public/edit-icon-gray.svg"
                                    alt="Edit"
                                    className="w-6 h-6"
                                />
                            </button>
                            <button
                                onClick={() =>
                                    handleOpenModal('deleteFlight', activity.id)
                                }
                            >
                                <img
                                    src="/public/delete-icon-gray.svg"
                                    alt="Delete"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    </div>
                )
            case 'lodging_check_in':
            default:
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="flex flex-col bg-gray-50 text-gray-500 rounded-lg py-2 px-4 w-full">
                            <div className="font-bold text-2xl mb-1 text-black">
                                {activity.type === 'lodging_check_in'
                                    ? 'Check-In'
                                    : 'Check-Out'}
                            </div>
                            <div className="font-bold">{activity.name}</div>
                            <div>{activity.address}</div>
                            <div className="mt-2 p-1 w-fit bg-orange-100 text-orange-500 rounded-lg">
                                {new Date(
                                    activity.type === 'lodging_check_in'
                                        ? activity.check_in
                                        : activity.check_out
                                ).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                        </div>
                        <div className="flex p-2 gap-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button
                                onClick={() =>
                                    handleOpenModal(
                                        'EditLodgingForm',
                                        activity.id
                                    )
                                }
                            >
                                <img
                                    src="/public/edit-icon-gray.svg"
                                    alt="Edit"
                                    className="w-6 h-6"
                                />
                            </button>
                            <button
                                onClick={() =>
                                    handleOpenModal(
                                        'deleteLodging',
                                        activity.id
                                    )
                                }
                            >
                                <img
                                    src="/public/delete-icon-gray.svg"
                                    alt="Delete"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    </div>
                )
        }
    }

    // Reformats the date for accordion components
    const parseDate = () => {
        const date = new Date(header)
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        }
        const suffix = (day) => {
            if (day >= 11 && day <= 13) return 'th'
            switch (day % 10) {
                case 1:
                    return 'st'
                case 2:
                    return 'nd'
                case 3:
                    return 'rd'
                default:
                    return 'th'
            }
        }

        const day = date.getUTCDate()
        const formattedDate = date.toLocaleDateString('en-US', options)

        return formattedDate.replace(/\d+/, day + suffix(day))
    }

    return content.length === 0 ? (
        // Header
        <div className="flex flex-col w-full border-t border-cyan-500 py-4 items-center">
            <div className="flex items-center justify-between w-11/12">
                <span className="text-xl">{parseDate()}</span>
                <p className="flex items-start text-sm text-slate-400">
                    No events planned
                </p>
            </div>
        </div>
    ) : (
        // Dropdown
        <>
            <div
                className="flex flex-col w-full border-t border-cyan-500 py-4 items-center cursor-pointer"
                onClick={() => setAccordionOpen(!accordionOpen)}
            >
                <div className="flex justify-between w-11/12">
                    <span className="text-xl">{parseDate()}</span>
                    {accordionOpen ? <span>-</span> : <span>+</span>}
                </div>
            </div>
            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
                    accordionOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    {content.map((activity, index) => (
                        <div
                            className="flex flex-col items-center my-4"
                            key={index}
                        >
                            {parseContent(activity)}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
