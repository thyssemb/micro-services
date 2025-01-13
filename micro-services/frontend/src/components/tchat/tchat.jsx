import React, { useState, useEffect } from 'react';
import { FaSearch, FaPaperPlane, FaEdit } from 'react-icons/fa';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import defaultAvatar from '../../assets/cat.jpg';
import Discussions from "./discussions.jsx";

const Tchat = () => {
    const [pseudo, setPseudo] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [toasterMessage, setToasterMessage] = useState('');
    const [showToaster, setShowToaster] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
            try {
                const decodedToken = jwtDecode(token);
                setPseudo(decodedToken.pseudo);
                setUserAvatar(decodedToken.avatar || defaultAvatar);
            } catch (error) {
                console.error("Error decoding token:", error);
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }

        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/messages/messages', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setMessages(response.data.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();

        const intervalId = setInterval(fetchMessages, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleSendMessage = async () => {
        const token = localStorage.getItem("accessToken");

        if (message.trim() !== "") {
            try {
                const response = await axios.post(
                    'http://localhost:8082/api/messages/send-message',
                    {
                        content: message,
                        pseudo: isLoggedIn ? pseudo : 'vous',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setMessage('');
                setMessages((prevMessages) => [...prevMessages, response.data.data]);
            } catch (error) {
                console.error("Error with sending message", error);
            }
        }
    };

    const confirmDeleteMessage = (msg) => {
        setSelectedMessage(msg);
        setShowConfirmModal(true);
    };

    const handleDeleteMessage = async () => {
        const token = localStorage.getItem("accessToken");

        if (!selectedMessage || !selectedMessage.messageId) {
            setToasterMessage("Erreur. L'ID du message est manquant.");
            setShowToaster(true);
            setTimeout(() => setShowToaster(false), 3000);
            return;
        }

        try {
            await axios.delete('http://localhost:8080/api/messages/delete-message', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    messageId: selectedMessage.messageId,
                },
            });

            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg.messageId !== selectedMessage.messageId)
            );
            setShowConfirmModal(false);

            setToasterMessage("Message supprimé avec succès.");
            setShowToaster(true);
            setTimeout(() => setShowToaster(false), 3000);
        } catch (error) {
            console.error("Error deleting message:", error);
            setToasterMessage("Erreur. Impossible de supprimer votre message pour le moment.");
            setShowToaster(true);
            setTimeout(() => setShowToaster(false), 3000);
        }
    };

    const formatMessageDate = (date) => {
        const parsedDate = parseISO(date);

        if (isToday(parsedDate)) {
            return `Aujourd'hui, à ${format(parsedDate, 'HH:mm')}`;
        } else if (isYesterday(parsedDate)) {
            return `Hier, à ${format(parsedDate, 'HH:mm')}`;
        } else {
            return format(parsedDate, "d MMMM yyyy, à HH:mm");
        }
    };

    const handleEditMessage = (msg) => {
        setEditingMessage(msg);
        setEditedContent(msg.content);
    };

    const handleSaveEditedMessage = async () => {
        const token = localStorage.getItem("accessToken");
        if (editedContent.trim() !== "") {
            try {
                const response = await axios.put(
                    'http://localhost:8082/api/messages/edit-message',
                    {
                        messageId: editingMessage.messageId,
                        content: editedContent,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.messageId === editingMessage.messageId
                            ? { ...msg, content: editedContent }
                            : msg
                    )
                );
                setShowConfirmModal(false);

                setToasterMessage("Message édité avec succès.");
                setShowToaster(true);
                setTimeout(() => setShowToaster(false), 3000);
            } catch (error) {
                console.error("Error editing message:", error);
                setToasterMessage("Erreur. Impossible d'éditer votre message pour le moment.");
                setShowToaster(true);
                setTimeout(() => setShowToaster(false), 3000);
            }
        } else {
            setToasterMessage("Le contenu du message ne peut pas être vide.");
            setShowToaster(true);
            setTimeout(() => setShowToaster(false), 3000);
        }
    };


    return (
        <div className="text-white min-h-screen bg-[#18181b] p-6">
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#222226] border border-tchat-border rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold text-white">Supprimer le message</h2>
                        <p className="text-gray-400 mt-4">Tu es sûr(e) de vouloir supprimer le message ?</p>
                        <div className="bg-[#2f2f33] text-white rounded p-3 mt-4">
                            {selectedMessage.content}
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full hover:bg-gray-600 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="white"
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>

                            <button
                                onClick={handleDeleteMessage}
                                className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full hover:bg-red-600 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="white"
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <Link to="/" className="text-2xl font-bold cursor-pointer">Micro Services</Link>
                <div
                    className="flex items-center bg-[#222226] border border-tchat-border rounded-full px-7 py-2 w-full sm:w-3/5 shadow-lg">
                    <FaSearch className="text-white mr-2 opacity-60"/>
                    <input
                        type="text"
                        placeholder="Rechercher un membre.."
                        className="bg-transparent text-white outline-none w-full"
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-16">
                <Discussions />

                <div className="min-h-[75vh] bg-[#222226] border border-tchat-border rounded-lg p-6 w-full sm:w-3/4 flex flex-col shadow-lg">
                    <h2 className="font-bold">Discussion publique</h2>

                    <div className="flex-grow mb-4 overflow-y-auto" style={{maxHeight: '60vh'}}>
                        <div className="space-y-4 mt-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.messageId}
                                    className="flex justify-between items-center group hover:bg-[#333333] p-2 rounded-lg transition-colors duration-300"
                                >
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={userAvatar || defaultAvatar}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-white font-semibold">{msg.pseudo}</span>
                                                <span className="text-sm text-gray-500">
                        {formatMessageDate(msg.createdAt)}
                    </span>
                                            </div>
                                            <div className="text-white opacity-80 mt-1">
                                                {editingMessage?.messageId === msg.messageId ? (
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="text"
                                                            className="bg-transparent text-white outline-none border-b-2 w-full"
                                                            value={editedContent}
                                                            onChange={(e) => setEditedContent(e.target.value)}
                                                        />
                                                        <button
                                                            onClick={handleSaveEditedMessage}
                                                            className="text-white"
                                                        >
                                                            <FaPaperPlane />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p>{msg.content}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => handleEditMessage(msg)}
                                            className="text-white"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => confirmDeleteMessage(msg)}
                                            className="text-red-500"
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>

                    <div className="mt-4 flex items-center space-x-4">
                        <input
                            type="text"
                            className="bg-[#333] text-white outline-none w-full p-3 rounded-md"
                            placeholder="Écrivez votre message ici..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-[#5645ee] text-white rounded-md p-3"
                        >
                            <FaPaperPlane/>
                        </button>
                    </div>
                </div>
            </div>

            {showToaster && (
                <div className="fixed bottom-10 right-10 bg-green-500 text-white p-3 rounded-lg">
                    {toasterMessage}
                </div>
            )}
        </div>
    );
};

export default Tchat;
