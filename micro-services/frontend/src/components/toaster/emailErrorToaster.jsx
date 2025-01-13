import React, { useEffect, useState } from 'react';

const EmailErrorToaster = ({ message, closeToaster }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(closeToaster, 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [closeToaster]);

    return (
        <div
            className={`fixed bottom-4 right-4 transform transition-all duration-300 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            } bg-red-500 text-white p-4 rounded-lg shadow-lg w-80`}
        >
            <div className="flex items-center justify-between">
                <span className="mr-4">{message}</span>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(closeToaster, 300);
                    }}
                    className="text-white font-bold"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default EmailErrorToaster;
