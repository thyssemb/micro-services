import React from "react";

const Discussions = () => {
    return (
        <div className="bg-[#222226] border border-tchat-border rounded-lg p-4 w-full sm:w-1/4 h-full shadow-lg">
            <h2 className="font-bold">Membres</h2>
            <div className="mt-4 text-white opacity-70">
                <p>Discussions actives :</p>
                <ul>
                    <li># général</li>
                    <li># tech-talks</li>
                    <li># annonces</li>
                </ul>
            </div>
            <div className="mt-8">
                <h2 className="font-bold">Discussions privées</h2>
                <p className="text-white opacity-70 mt-2">Aucune discussion privée pour le moment.</p>
            </div>
        </div>
    );
};

export default Discussions;
