import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { PencilSquareIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import hocUpdateProfile from "../../services/hocs/hocUpdateProfile.jsx";
import defaultAvatar from "../../../src/assets/cat.jpg";

const Profile = ({ updateProfile, isUpdating }) => {
    const [originalData, setOriginalData] = useState({
        email: "",
        pseudo: "",
        password: "********",
        avatar: defaultAvatar,
    });

    const [userData, setUserData] = useState({
        email: "",
        pseudo: "",
        password: "********",
        avatar: defaultAvatar,
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const initialData = {
                    email: decodedToken.email || "Exemple@Exemple.com",
                    pseudo: decodedToken.pseudo || "Pseudo",
                    password: "********",
                    avatar: decodedToken.avatar || defaultAvatar,
                };
                setOriginalData(initialData);
                setUserData(initialData);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData((prevData) => ({
                    ...prevData,
                    avatar: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = async () => {
        const isUpdated = await updateProfile(userData);
        if (isUpdated) {
            setOriginalData(userData);
            setIsEditing(false);
        }
    };

    const handleCancelClick = () => {
        setUserData(originalData);
        setIsEditing(false);
    };

    return (
        <div className="text-white min-h-screen flex items-center justify-center bg-[#18181b]">
            <div className="relative w-[800px] p-16 rounded-lg bg-[#222226] border border-[#242424] shadow-lg">
                {!isEditing ? (
                    <PencilSquareIcon
                        className="absolute top-4 right-4 h-6 w-6 text-white cursor-pointer"
                        onClick={() => setIsEditing(true)}
                    />
                ) : (
                    <div className="absolute top-4 right-4 flex gap-2">
                        <XMarkIcon
                            className="h-6 w-6 text-red-500 cursor-pointer"
                            onClick={handleCancelClick}
                        />
                        <CheckIcon
                            className="h-6 w-6 text-green-500 cursor-pointer"
                            onClick={handleEditClick}
                        />
                    </div>
                )}

                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        <img
                            src={userData.avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    {isEditing && (
                        <div className="mt-4">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="text-white"
                            />
                        </div>
                    )}
                    <h2 className="text-center text-xl mt-8 mb-8 font-bold">
                        {userData.pseudo || "Pseudo"}
                    </h2>
                </div>
                <form className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Pseudo</label>
                        <input
                            type="text"
                            name="pseudo"
                            value={userData.pseudo}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className="w-full px-4 py-2 text-white bg-transparent border rounded-2xl border-[rgba(255,255,255,0.1)]"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Adresse mail</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className="w-full px-4 py-2 text-white bg-transparent border rounded-2xl border-[rgba(255,255,255,0.1)]"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                            className="w-full px-4 py-2 text-white bg-transparent border rounded-2xl border-[rgba(255,255,255,0.1)]"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default hocUpdateProfile(Profile);
