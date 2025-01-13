import React from 'react';
import { SocialIcon } from 'react-social-icons';
import hocLogin from "../../services/hocs/hocLogin.jsx";

const Login = ({
                   closeModal,
                   pseudo,
                   setPseudo,
                   password,
                   setPassword,
                   loading,
                   isLogin,
                   submitLogin,
                   errorMessage,
               }) => {
    return (
        <div className="fixed bottom-96 left-0 w-full h-full bg-opacity-0 flex items-center justify-center">
            <div className="bg-transparent text-white p-8 rounded-lg w-96 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-white text-xl"
                >
                    ×
                </button>
                {!isLogin ? (
                    <>
                        <h2 className="text-center text-2xl mt-6 mb-6" style={{ fontFamily: 'Editorial New' }}>
                            Connectez-vous
                        </h2>
                        <form onSubmit={submitLogin}>
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
                            <div className="mb-4">
                                <label htmlFor="password" className="block">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full p-2 rounded-lg bg-transparent border-2 border-register-border opacity-45 text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {errorMessage && (
                                <div className="text-red-500 text-center mb-4">
                                    {errorMessage}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 bg-transparent text-white border-2 border-register-border opacity-30 rounded-lg transition-all duration-300 hover:text-gray-400 hover:opacity-100 ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? (
                                    <div
                                        className="w-6 h-6 border-4 border-t-white border-gray-400 rounded-full animate-spin mx-auto"
                                    ></div>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </form>
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-t-2 border-gray-100 opacity-10" />
                            <span className="mx-4 text-sm text-gray-400">Ou</span>
                            <hr className="flex-grow border-t-2 border-gray-100 opacity-10" />
                        </div>
                        <div className="flex justify-center mt-6 space-x-4">
                            <a href="#" className="flex items-center justify-center">
                                <SocialIcon url="https://google.com" style={{ width: 40, height: 40 }} />
                            </a>
                            <a href="#" className="flex items-center justify-center">
                                <SocialIcon url="https://discord.com" style={{ width: 40, height: 40 }} />
                            </a>
                            <a href="#" className="flex items-center justify-center">
                                <SocialIcon url="https://twitter.com" style={{ width: 40, height: 40 }} />
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <div
                            className="w-6 h-6 border-4 border-t-white border-gray-400 rounded-full animate-spin mx-auto"
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default hocLogin(Login);
