import { useState } from 'react';

export default function Accordion({ header, content }) {
    const [accordionOpen, setAccordionOpen] = useState(false)

    const parseContent = (activity) => {
        switch (activity.type) {
            case "event":
                return (
                    <div>{activity.description}</div>
                )
            case "flight":
                return (
                    <div>
                        flight
                    </div>
                )
            case "lodging_check_in":
                return (
                    <div>
                        check in
                    </div>
                )
            default:
                return (
                    <div>{activity.type}</div>
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
                    {content.length === 0
                        && (accordionOpen
                            ? <button
                                className="flex items-start border border-cyan-900 rounded-full text-cyan-900 bg-cyan-100 px-5 py-2 mt-3"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Add a dropdown here that allows user to select adding a flight, event, or lodging");
                                }}
                            >
                                Add an Activity
                            </button>
                            : <p className="flex items-start text-sm text-slate-400">No events planned</p>)
                    }
                </div>
            </div>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
                accordionOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
            }`}>
                <div className="overflow-hidden">
                    {content.map((activity, index) => (
                        <div key={index}>{parseContent(activity)}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}


{/*  */}
