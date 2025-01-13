import React, { useState } from 'react';

const hocUpdateProfile = (WrappedComponent) => {
    return (props) => {
        const [isUpdating, setIsUpdating] = useState(false);

        const updateProfile = async (userData) => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.log("Missing token.");
                return false;
            }

            setIsUpdating(true);
            console.log(userData);
            try {
                const response = await fetch('http://localhost:8080/update-profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert("Profil mis à jour");
                    return true;
                } else {
                    const errorData = await response.json();
                    console.error("Error updating profile:", errorData);
                }
            } catch (error) {
                console.error("Error updating profile:", error);
            } finally {
                setIsUpdating(false);
            }
            return false;
        };

        return <WrappedComponent {...props} updateProfile={updateProfile} isUpdating={isUpdating} />;
    };
};

export default hocUpdateProfile;
