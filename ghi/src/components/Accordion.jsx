import { useState, useContext } from 'react';
import { ModalContext } from './ModalProvider';

export default function Accordion({ header, content }) {
    const [accordionOpen, setAccordionOpen] = useState(false)
    const { toggleModal } = useContext(ModalContext)

    const parseContent = (activity) => {
        switch (activity.type) {
            case "event":
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="flex flex-col bg-gray-50 text-gray-500 rounded-lg py-2 px-4 w-full">
                            <div className="font-bold text-2xl mb-2 text-black">{activity.name}</div>
                            <div className="flex">
                                <div className="w-2/5 flex flex-col justify-between h-full">
                                    <div>{activity.address}</div>
                                    <div className="mt-2 p-1 w-fit bg-orange-100 text-orange-500 rounded-lg">
                                        {new Date(activity.start_date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        -
                                        {new Date(activity.end_date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div className="w-3/5 border-l border-black pl-2">
                                    <div>Description:</div>
                                    <div>{activity.description}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex p-2 gap-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button onClick={() => toggleModal({form:"EditEventModal", id:activity.id})}>
                                <img src="/public/edit-icon-gray.svg" alt="Edit" className="w-6 h-6" />
                            </button>
                            <button onClick={() => toggleModal({form:"DeleteActivityModal", id:activity.id, type:"events"})}>
                                <img src="/public/delete-icon-gray.svg" alt="Delete" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                )
            case "flight":
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="flex flex-col bg-gray-50 text-gray-500 rounded-lg py-2 px-4 w-full">
                            <div className="font-bold text-2xl mb-2 text-black">Flight</div>
                            <div>Flight Number: {activity.flight_number}</div>
                            <div className="mt-2 w-fit">
                                <div>
                                    <span className="mr-1">Departure:</span>
                                    <span className="bg-orange-100 text-orange-500 rounded-lg p-1">{new Date(activity.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div>
                                    <span className="mr-1">Arrival:</span>
                                    <span className="bg-orange-100 text-orange-500 rounded-lg p-1">{new Date(activity.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex p-2 gap-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button onClick={() => toggleModal({form:"EditFlightModal", id:activity.id})}>
                                <img src="/public/edit-icon-gray.svg" alt="Edit" className="w-6 h-6" />
                            </button>
                            <button onClick={() => toggleModal({form:"DeleteActivityModal", id:activity.id, type:"flights"})}>
                                <img src="/public/delete-icon-gray.svg" alt="Delete" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                )
            case "lodging_check_in":
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="flex flex-col bg-gray-50 text-gray-500 rounded-lg py-2 px-4 w-full">
                            <div className="font-bold text-2xl mb-2 text-black">Check-In</div>
                            <div className="font-bold">{activity.name}</div>
                            <div>{activity.address}</div>
                            <div className="mt-2 p-1 w-fit bg-orange-100 text-orange-500 rounded-lg">
                                {new Date(activity.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <div className="flex p-2 gap-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button onClick={() => toggleModal({form:"EditLodgingModal", id:activity.id})}>
                                <img src="/public/edit-icon-gray.svg" alt="Edit" className="w-6 h-6" />
                            </button>
                            <button onClick={() => toggleModal({form:"DeleteActivityModal", id:activity.id, type:"lodgings"})}>
                                <img src="/public/delete-icon-gray.svg" alt="Delete" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                )
            default:
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="flex flex-col bg-gray-50 text-gray-500 rounded-lg py-2 px-4 w-full">
                            <div className="font-bold text-2xl mb-2 text-black">Check-Out</div>
                            <div className="font-bold">{activity.name}</div>
                            <div>{activity.address}</div>
                            <div className="mt-2 p-1 w-fit bg-orange-100 text-orange-500 rounded-lg">
                                {new Date(activity.check_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <div className="flex p-2 gap-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button onClick={() => toggleModal({form:"DeleteActivityModal", id:activity.id, type:"lodgings"})}>
                                <img src="/public/delete-icon-gray.svg" alt="Delete" className="w-6 h-6" />
                            </button>
                            <button onClick={() => toggleModal({form:"EditLodgingModal", id:activity.id})}>
                                <img src="/public/edit-icon-gray.svg" alt="Edit" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                )
        }
    }

    const parseDate = () => {
        const date = new Date(header);
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };
        const suffix = (day) => {
            if (day >= 11 && day <= 13) return "th";
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        const day = date.getUTCDate();
        const formattedDate = date.toLocaleDateString('en-US', options)

        return formattedDate.replace(/\d+/, day + suffix(day))
    }

    return ( content.length === 0 ? (
        <div className="flex flex-col w-full border-t border-cyan-500 py-4 items-center">
            <div className="flex justify-between w-11/12">
                <span className="text-xl">{parseDate()}</span>
                <p className="flex items-start text-sm text-slate-400">No events planned</p>
            </div>
        </div>

    ) : (
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
                    accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
    ))
}
