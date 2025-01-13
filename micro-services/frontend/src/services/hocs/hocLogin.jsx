import React, { useState } from 'react';

const getIpAddress = async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
};

const hocLogin = (WrappedComponent) => {
    return (props) => {
        const [pseudo, setPseudo] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const [isLogin, setIsLogin] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');

        const submitLogin = async (e) => {
            e.preventDefault();
            setLoading(true);
            setErrorMessage('');

            try {
                const ip = await getIpAddress();

                const loginData = { pseudo, password, ip, email: pseudo };

                const res = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Error, request not sent.');
                }

                const data = await res.json();
                console.log('Réponse:', data);

                localStorage.setItem('accessToken', data.accessToken);
                console.log('accessToken', data.accessToken);

                setIsLogin(true);
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 4000);
            } catch (error) {
                console.error('Erreur:', error);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        return (
            <WrappedComponent
                {...props}
                pseudo={pseudo}
                setPseudo={setPseudo}
                password={password}
                setPassword={setPassword}
                loading={loading}
                isLogin={isLogin}
                submitLogin={submitLogin}
                errorMessage={errorMessage}
            />
        );
    };
};

export default hocLogin;
