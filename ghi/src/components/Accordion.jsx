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
        <div className="py-2">
            <button
                className="flex justify-between w-full"
                onClick={() => setAccordionOpen(!accordionOpen)}
            >
                <span>{header}</span>
                {accordionOpen ? <span>-</span> : <span>+</span>}
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
