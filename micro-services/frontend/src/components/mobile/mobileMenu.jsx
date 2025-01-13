import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = ({ isOpen, toggleMenu }) => {
    return (
        <div
            className={`fixed bottom-96 left-1/2 transform -translate-x-1/2 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
            onClick={toggleMenu}
        >
            <div className="bg-navbar-bg border-2 border-navbar-border p-4 rounded-lg w-3/4 text-center">
                <ul>
                    <li className="cursor-pointer mb-4 text-white opacity-40 hover:opacity-100 transition-opacity duration-300">
                        <Link to="/profile">Profil</Link>
                    </li>
                    <li className="cursor-pointer text-white opacity-40 hover:opacity-100 transition-opacity duration-300">
                        <Link to="/tchat">Discussions</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MobileMenu;
