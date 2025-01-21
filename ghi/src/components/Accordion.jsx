import { useState } from 'react';

export default function Accordion({ header, content }) {
    const [accordionOpen, setAccordionOpen] = useState(false)

    const parseContent = (activity) => {
        switch (activity.type) {
            case "event":
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="border-2 border-cyan-900 rounded-lg py-2 px-4 w-full">
                            <div>
                                <span className="font-bold text-2xl mr-4">{activity.name}</span>
                                <span>
                                    {new Date(activity.start_date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    -
                                    {new Date(activity.end_date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div>{activity.description}</div>
                        </div>
                        <div className="flex flex-col p-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="border border-black m-1">
                                De
                            </div>
                            <div className="border border-black m-1">
                                Ed
                            </div>
                        </div>
                    </div>
                )
            case "flight":
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="border-2 border-cyan-900 rounded-lg py-2 px-4 w-full">
                            <div>
                                <div className="font-bold text-2xl mr-4">Flight Number: {activity.flight_number}</div>
                                <div>Departure: {new Date(activity.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                <div>Arrival: {new Date(activity.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                            <div>{activity.description}</div>
                        </div>
                        <div className="flex flex-col p-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="border border-black m-1">
                                De
                            </div>
                            <div className="border border-black m-1">
                                Ed
                            </div>
                        </div>
                    </div>
                )
            case "lodging_check_in":
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="border-2 border-cyan-900 rounded-lg py-2 px-4 w-full">
                            <div className="font-bold text-2xl mr-4">Hotel: {activity.name}</div>
                            <div>{activity.address}</div>
                            <div>Check-in: {new Date(activity.check_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <div className="flex flex-col p-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="border border-black m-1">
                                De
                            </div>
                            <div className="border border-black m-1">
                                Ed
                            </div>
                        </div>
                    </div>
                )
            default:
                return (
                    <div className="flex w-11/12 justify-between relative group">
                        <div className="border-2 border-cyan-900 rounded-lg py-2 px-4 w-full">
                            <div className="font-bold text-2xl mr-4">Hotel: {activity.name}</div>
                            <div>{activity.address}</div>
                            <div>Check-out: {new Date(activity.check_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <div className="flex flex-col p-1 absolute justify-end top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="border border-black m-1">
                                De
                            </div>
                            <div className="border border-black m-1">
                                Ed
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="text-cyan-900">
            <div
                className="flex flex-col w-full border-t border-cyan-500 py-4 items-center cursor-pointer"
                onClick={() => setAccordionOpen(!accordionOpen)}
            >
                <div className="w-11/12">
                    <div className="flex justify-between">
                        <span className="text-xl">{header}</span>
                        {accordionOpen ? <span>-</span> : <span>+</span>}
                    </div>

                    {content.length === 0 && (
                        accordionOpen ? (
                            <button
                                className="flex items-start bg-cyan-100 hover:bg-cyan-200 text-cyan-900 px-5 py-2 mt-3 border-2 border-cyan-900 rounded-full transition duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("This should be a dropdown so users can either add a flight, event, or lodging");
                                }}
                            >
                                Add an Activity
                            </button>
                        ) : (
                            <p className="flex items-start text-sm text-slate-400">
                                No events planned
                            </p>
                        )
                    )}
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
        </div>
    )
}
