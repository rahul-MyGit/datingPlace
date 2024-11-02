import { useState } from "react";
import { Heart, Loader, MessageCircle, X } from 'lucide-react';
import LoadingState from "./LoadingState";
import NoMatchesFound from "./NoMatchesFound";

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const loading = true;
    const matches = [];

    return (
        <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md overflow-hidden transition-transform duration-300 ease-in-out
            ${isOpen ? 'transition-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static l:w-1/4
            `}

        >
            <div className="flex flex-col h-full">
                <div className='p-4 pb-[27px] border-b border-pink-200 flex justify-between items-center'>
                    <h2 className='text-xl font-bold text-pink-600'>Matches</h2>
                    <button
                        className='lg:hidden p-1 text-gray-500 hover:text-gray-700 focus:outline-none'
                        onClick={toggleSidebar}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 z-10 realtive">
                    {loading ? <LoadingState /> : matches.length === 0 ? <NoMatchesFound /> : 'Hey'}
                </div>

            </div>
        </div>
    )
}

export default Sidebar;