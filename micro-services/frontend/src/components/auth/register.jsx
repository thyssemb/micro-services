import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import EmailErrorToaster from "../toaster/emailErrorToaster.jsx";
import { isValidEmail } from "../../services/formatters/emailFormatters.js";
import hocRegistration from "../../services/hocs/hocRegistration.jsx";

const Register = ({ submitRegistration, closeModal }) => {
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');

    const SubmitRegister = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setToasterMessage("Adresse mail invalide. Il manque un arobase.");
            setShowToaster(true);
            return;
        }

        if (password !== confirmPassword) {
            setToasterMessage("Les mots de passe ne correspondent pas.");
            setShowToaster(true);
            return;
        }

        try {
            const data = await submitRegistration(email, pseudo, password);
            setIsRegistered(true);

            setTimeout(() => {
                window.location.href = '/';
            }, 4000);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="fixed bottom-80 left-0 w-full h-full bg-opacity-0 flex items-center justify-center">
            <div className="bg-transparent text-white p-8 rounded-lg w-96 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-white text-xl"
                >
                    ×
                </button>
                {showToaster && (
                    <EmailErrorToaster
                        message={toasterMessage}
                        closeToaster={() => setShowToaster(false)}
                    />
                )}
                {isRegistered ? (
                    <div className="text-center">
                        <h2 className="text-2xl mb-4" style={{ fontFamily: 'Editorial New' }}>
                            Merci pour votre inscription ! Connectez-vous pour valider votre compte
                        </h2>
                        <div className="w-6 h-6 border-4 border-t-white border-gray-400 rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-center text-2xl mt-6 mb-6" style={{ fontFamily: 'Editorial New' }}>
                            Inscrivez-vous
                        </h2>
                        <form onSubmit={SubmitRegister}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block">Adresse mail</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full p-2 rounded-lg bg-transparent border-2 border-register-border opacity-45 text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="pseudo" className="block">Pseudo</label>
                                <input
                                    type="text"
                                    id="pseudo"
                                    className="w-full p-2 rounded-lg bg-transparent border-2 border-register-border opacity-45 text-white"
                                    value={pseudo}
                                    onChange={(e) => setPseudo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4 relative">
                                <label htmlFor="password" className="block">Mot de passe</label>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    id="password"
                                    className="w-full p-2 rounded-lg bg-transparent border-2 border-register-border opacity-45 text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-10 transform -translate-y-1/2 text-white"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                >
                                    {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block">Confirmer le mot de passe</label>
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    id="confirmPassword"
                                    className="w-full p-2 rounded-lg bg-transparent border-2 border-register-border opacity-45 text-white"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-transparent text-white border-2 border-register-border opacity-30 rounded-lg transition-all duration-300 hover:text-gray-400 hover:opacity-100"
                            >
                                S'inscrire
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default hocRegistration(Register);
