import React from 'react';

const Loader = ({ text = 'LOADING', spinner }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center">
        {spinner ? (
          spinner
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42px"
            height="42px"
            viewBox="0 0 24 24"
            className="loading-svg"
          >
            <path
              fill="none"
              stroke="#212F52"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V3m4.25 4.75L18.4 5.6M18 12h3m-4.75 4.25l2.15 2.15M12 18v3m-4.25-4.75L5.6 18.4M6 12H3m4.75-4.25L5.6 5.6"
            />
          </svg>
        )}
        {text && (
          <span className="mt-4 text-lg font-semibold tracking-widest text-gray-700">
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default Loader;
