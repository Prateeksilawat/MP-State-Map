import React from "react";

const DistrictModal = ({ year, districts, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl 
        p-6 md:p-8 w-full max-w-md relative">

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 md:top-4 right-3 md:right-4 
            text-gray-500 hover:text-red-500 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-lg md:text-2xl font-bold text-purple-700 
          mb-4 md:mb-6 text-center">
          Districts Created in {year}
        </h2>

        {districts.length > 0 ? (
          <>
            <ul className="space-y-2 md:space-y-3 max-h-40 md:max-h-52 overflow-y-auto mb-4">
              {districts.map((district, index) => (
                <li
                  key={index}
                  className="bg-gradient-to-r from-indigo-100 to-purple-100 
                    px-3 md:px-4 py-2 rounded-lg md:rounded-xl 
                    text-indigo-700 text-sm md:text-base 
                    font-medium shadow-sm"
                >
                  {district.name}
                </li>
              ))}
            </ul>

            <div className="text-center font-semibold text-gray-700 text-sm md:text-base">
              Total Districts: {districts.length}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 text-sm md:text-base">
            No district was created in this year.
          </p>
        )}

        <div className="mt-4 md:mt-6 text-center">
          <button
            onClick={onClose}
            className="px-5 md:px-6 py-2 bg-purple-600 text-white 
              rounded-lg md:rounded-xl hover:bg-purple-700 
              transition duration-300 text-sm md:text-base"
          >
            Close
          </button>
        </div>
      </div>

    </div>
  );
};

export default DistrictModal;