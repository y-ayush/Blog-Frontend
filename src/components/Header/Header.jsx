import React, { useState } from "react";
import { Logo, Container, LogoutBtn } from "../index.js";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
    const user = useSelector((state) => state.auth);
    const authStatus = user.status;
    const userId = user.userData?._id;

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "My Posts", slug: `/user/${userId}`, active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="bg-amber-100 shadow-md py-4">
            <Container>
                <nav className="flex items-center justify-between relative">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>

                    {/* Mobile Menu */}
                    <div
                        className={`lg:hidden fixed inset-0 bg-white z-50 overflow-auto transition-transform duration-300 ease-in-out ${
                            isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    >
                        <div className="flex justify-between items-center p-4 border-b">
                            <div className="text-xl font-semibold">Menu</div>
                            <button
                                className="text-gray-600 hover:text-gray-900"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close menu"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="flex flex-col items-center py-4 space-y-4 max-w-md mx-auto">
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name} className="w-full">
                                        <button
                                            onClick={() => {
                                                navigate(item.slug);
                                                setIsOpen(false);
                                            }}
                                            className="w-full px-4 py-2 text-center text-gray-800 bg-amber-200 rounded-lg shadow-sm hover:bg-amber-300 focus:outline-none transition-colors duration-200"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <li className="w-full text-center">
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex lg:items-center lg:space-x-4">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name} className="lg:mx-2">
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="px-4 py-2 text-gray-800 bg-amber-200 rounded-lg shadow-sm border border-transparent hover:bg-amber-300 focus:outline-none transition-colors duration-200"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li className="lg:mx-2">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}
