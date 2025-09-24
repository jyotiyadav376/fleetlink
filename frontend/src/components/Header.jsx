import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <div className=" grid grid-flow-col border-1 p-2 border-zinc-100 bg-[#f9f7f5]">
      
      {/* Logo */}
      <div className="col-span-1 flex items-center p-2 ">
          <img 
            src={`/fleetlink.png`} 
            alt="FleetLink Logo" 
            className="h-12 w-auto"
          />

      </div>

      {/* Navigation */}
      <div className="col-span-4 p-2  flex justify-end items-center">
        <nav className="flex space-x-6">
          <Link 
            to="/add-vehicle" 
            className={`text-gray-700 text-[25px] font-semibold font-sans
              ${location.pathname === "/add-vehicle" ? "border-b-2 border-black-500" : ""}`}
          >
            Add Vehicle
          </Link>
          <Link 
            to="/search-book" 
            className={`text-gray-700 text-[25px] font-semibold font-sans
              ${location.pathname === "/search-book" ? "border-b-2 border-black-500" : ""}`}
          >
            Search & Book
          </Link>
              <Link 
            to="/bookings" 
            className={`text-gray-700 text-[25px] font-semibold font-sans pr-4
              ${location.pathname === "/bookings" ? "border-b-2 border-black-500" : ""}`}
          >
           Bookings
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
