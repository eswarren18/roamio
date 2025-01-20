import { useState } from 'react';

export default function Accordion({ header, content }) {
    const [accordionOpen, setAccordionOpen] = useState(false)

    let my_var = false
    if (content.length > 0 ) {
        my_var = true
    }
    console.log(my_var)

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
            <button
                className="flex flex-col w-full border-t border-cyan-500 py-4 items-center"
                onClick={() => setAccordionOpen(!accordionOpen)}
            >
                <div className="w-11/12">
                    <div className="flex justify-between">
                        <span className="text-xl">{header}</span>
                        {accordionOpen ? <span>-</span> : <span>+</span>}
                    </div>
                    {content.length === 0 && <p className="flex items-start text-sm text-slate-400">No events planned</p>}
                </div>
            </button>
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
