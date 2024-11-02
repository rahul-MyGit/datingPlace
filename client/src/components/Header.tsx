import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { Link } from "react-router-dom";
import { Flame, User, LogOut, Menu } from "lucide-react";

export const Header = () => {
    const { authUser, logout } = useAuthStore();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
                setDropDownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [])

    return (
        <header className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link to='/' className="flex items-center space-x-2">
                            <Flame className="w-8 h-8 text-white" />
                            <span className="text-2xl front-bold text-white gidden sm:inline">datingPlace</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {authUser ? (
                            <div className="relative" ref={dropDownRef}>
                                <button onClick={() => setDropDownOpen(!dropDownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <img
                                        src={authUser.image || '/placeholder.png'}
                                        className="h-10 w-10 object-cover rounded-full border-2 border-white"
                                        alt="User Image"
                                    />
                                    <span className="text-white font-medium">
                                        {authUser.name}
                                    </span>

                                </button>

                                {dropDownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 b-white rounded-md shadow-lg py-1 z-10">
                                        <Link
                                            to='/profile'
                                            className="px-4 py-2 text-sm text-ray-700 hover:b-gray-100 flex items-center"
                                            onClick={() => setDropDownOpen(false)}
                                        >
                                            <User className="mr-2" size={16} />
                                            Profile
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                        >
                                            <LogOut className="mr-2" size={16} />
                                            Loout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to='/auth'
                                    className="text-white hover:text-pink-200 transition duration-150 ease-in-out"
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/auth'
                                    className="bg-white text-pink-600 px-4 py-2 rounded-full font-medium hover:bg-pink-100 transition duration-150 ease-in-out"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            <Menu className="size-6" />
                        </button>
                    </div>



                </div>
            </div>

            {/* Mobile Menu */}

            {mobileMenuOpen && (
                <div className='md:hidden bg-pink-600'>
                    <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                        {authUser ? (
                            <>
                                <Link
                                    to='/profile'
                                    className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to='/auth'
                                    className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/auth'
                                    className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}