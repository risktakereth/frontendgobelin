import { useState } from "react";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="p-2 bg-blue-500 text-white rounded">
        Ouvrir le popup
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Voici un popup simple !</p>
            <button onClick={() => setIsOpen(false)} className="mt-2 p-2 bg-red-500 text-white rounded">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;