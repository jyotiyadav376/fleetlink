import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import { showNotification, NotificationType } from '../utils';

const BookingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const API_URL = import.meta.env.VITE_BASE_URL;

  // Fetch bookings from backend
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/bookings`);
      setBookings(response.data.data || []); // assuming backend returns { data: [...] }
    } catch (error) {
      console.error(error);
      showNotification(
        error?.response?.data?.message || 'Failed to fetch bookings',
        NotificationType.ERROR
      );
    }
    setLoading(false);
  };

  // Cancel a booking
  const handleCancel = async (bookingId) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/bookings/${bookingId}`);
      showNotification('Booking cancelled successfully', NotificationType.SUCCESS);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error(error);
      showNotification(
        error?.response?.data?.message || 'Failed to cancel booking',
        NotificationType.ERROR
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      {loading && <Loader text="Loading..." />}
      <div className="flex flex-col justify-center items-center py-8 w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>

          {bookings.length === 0 ? (
            <p className="text-center text-gray-500">No bookings found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p><strong>Vehicle:</strong> {booking.vehicleName || booking.vehicle?.name}</p>
                    <p><strong>From:</strong> {booking.fromPincode}</p>
                    <p><strong>To:</strong> {booking.toPincode}</p>
                    <p><strong>Start Time:</strong> {new Date(booking.startTime).toLocaleString()}</p>
                  </div>
                  <Button
                    type="primary"
                    className="bg-red-600 hover:bg-red-700 rounded-full"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
