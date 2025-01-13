import React, { useState } from 'react';

const hocRegistration = (WrappedComponent) => {
    return function WithRegistrationWrapper(props) {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const submitRegistration = async (email, pseudo, password) => {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, pseudo, password }),
                });

                if (!res.ok) throw new Error('Error with registration');

                const data = await res.json();
                console.log('API response:', data);
                return data;
            } catch (err) {
                setError(err.message);
                console.error('Error:', err);
                throw err;
            } finally {
                setLoading(false);
            }
        };

        return (
            <WrappedComponent
                submitRegistration={submitRegistration}
                loading={loading}
                error={error}
                {...props}
            />
        );
    };
};

export default hocRegistration;
