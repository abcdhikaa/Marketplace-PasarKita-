import { useState } from "react";

function AccordionItem ({title, content, isOpen, onToggle}) {
    return (
        <div className="border-b border-gray-400">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between py-2.5 text-left font-semibold"
            >
                {title}
                <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
            </button>
            <div
                className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <p className="pb-4 text-sm leading-relaxed text-gray-700">{content}</p>
                </div>
            </div>
        </div>
    );
}

export default function Accordion({sections}) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="w-full max-w-2xl border-t border-gray-400">
            {sections.map((section, i) => (
                <AccordionItem
                    key={section.title}
                    title={section.title}
                    content={section.content}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
            ))}
        </div>
    );
}