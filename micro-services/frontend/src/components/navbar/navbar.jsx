import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../mobile/mobileMenu.jsx";
import Register from "../auth/register.jsx";
import Login from "../auth/login.jsx";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp > currentTime) {
                    setIsLoggedIn(true);
                } else {
                    localStorage.removeItem("accessToken");
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error with decoding the token :", error);
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        window.location.href = "/";
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    return (
        <nav className="z-20 w-full p-2 max-w-full h-12 bg-[#222226] border-2 border-navbar-border rounded-xl mx-auto fixed bottom-8 left-1/2 transform -translate-x-1/2 lg:max-w-4xl shadow-lg">
            <div className="flex items-center justify-between h-full px-4">
                <ul className="lg:flex space-x-6 text-white flex-grow justify-center hidden lg:flex">
                    {/* lien vers la page Accueil */}
                    <li>
                        <Link
                            to="/"
                            className="cursor-pointer transition-opacity duration-300"
                        >
                            Accueil
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link
                                to="/profile"
                                className="cursor-pointer transition-opacity duration-300"
                            >
                                Profil
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            to="/tchat"
                            className="cursor-pointer transition-opacity duration-300"
                        >
                            Discussions
                        </Link>
                    </li>
                </ul>

                <div className="flex space-x-4 mx-auto">
                    {!isLoggedIn ? (
                        <>
                            <button
                                onClick={openModal}
                                className="bg-black text-white px-4 py-1 rounded-lg"
                            >
                                Inscription
                            </button>
                            <button
                                onClick={openLoginModal}
                                className="bg-white text-black px-4 py-1 rounded-lg"
                            >
                                Connexion
                            </button>
                        </>
                    ) : (
                        <div
                            onClick={handleLogout}
                            className="flex items-center text-white cursor-pointer hover:text-red-500 transition-all duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 mr-2 text-red-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                <button
                    className="lg:hidden text-gray-400 hover:text-white opacity-40 ml-4 flex flex-col items-center justify-center w-8 h-8"
                    onClick={toggleMenu}
                >
                    <span
                        className={`block w-6 h-1 bg-gray-400 mb-1 transition-all duration-500 ${
                            isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                        }`}
                    ></span>
                    <span
                        className={`block w-6 h-1 bg-gray-400 mb-1 transition-all duration-500 ${
                            isMenuOpen ? "opacity-0" : "opacity-100"
                        }`}
                    ></span>
                    <span
                        className={`block w-6 h-1 bg-gray-400 transition-all duration-500 ${
                            isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                        }`}
                    ></span>
                </button>
            </div>

            <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

            {isModalOpen && <Register closeModal={closeModal} />}

            {isLoginModalOpen && <Login closeModal={closeLoginModal} />}
        </nav>
    );
};

export default Navbar;
