import { useContext, useEffect, useState } from 'react';

export default function Accordion({ header, content }) {
    const [accordionOpen, setaccordionOpen] = useState(false)
    return (
        <div className="py-2">
            <button
                className="flex justify-between w-full"
                onClick={() => setaccordionOpen(!accordionOpen)}
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
                    {content}
                </div>
            </div>
        </div>
    )
}
