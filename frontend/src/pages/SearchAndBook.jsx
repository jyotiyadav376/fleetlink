import React, { useState } from 'react';
import { Input, Button, DatePicker } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Loader from '../components/Loader';
import { showNotification, NotificationType } from '../utils';

const SearchAndBook = () => {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BASE_URL;

  // Form validation
  const validationSchema = Yup.object().shape({
    capacityRequired: Yup.number()
      .typeError('Capacity must be a number')
      .positive('Capacity must be greater than 0')
      .required('Capacity is required'),
    fromPincode: Yup.string().required('From Pincode is required'),
    toPincode: Yup.string().required('To Pincode is required'),
    startTime: Yup.string().required('Start time is required'),
  });

  const handleSearch = async (values) => {
    setSearchLoading(true);
    try {
      const params = {
        capacityRequired: values.capacityRequired,
        fromPincode: values.fromPincode,
        toPincode: values.toPincode,
        startTime: values.startTime,
      };

      const response = await axios.get(`${API_URL}/api/vehicles/available`, { params });

      // Map vehicles to include estimatedRideDurationHours
      const vehicleData = response.data.data.map((v) => ({
        ...v,
        estimatedRideDurationHours: response.data.estimatedRideDurationHours,
      }));

      setVehicles(vehicleData);
      showNotification('Search completed', NotificationType.SUCCESS);
    } catch (error) {
      console.error(error);
      showNotification(
        error?.response?.data?.message || 'Search failed',
        NotificationType.ERROR
      );
    }
    setSearchLoading(false);
  };

  const handleBook = async (vehicleId, formValues) => {
    setLoading(true);
    try {
      const bookingPayload = {
        vehicleId,
        fromPincode: formValues.fromPincode,
        toPincode: formValues.toPincode,
        startTime: formValues.startTime,
        customerId: 'customer-123', // hardcoded for simplicity
      };
      await axios.post(`${API_URL}/api/bookings`, bookingPayload);
      showNotification('Vehicle booked successfully', NotificationType.SUCCESS);

      // Remove booked vehicle from the list
      setVehicles((prev) => prev.filter((v) => v._id !== vehicleId));
    } catch (error) {
      console.error(error);
      showNotification(
        error?.response?.data?.message || 'Vehicle became unavailable',
        NotificationType.ERROR
      );
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      capacityRequired: '',
      fromPincode: '',
      toPincode: '',
      startTime: '',
    },
    validationSchema,
    onSubmit: handleSearch,
  });

  return (
    <>
      {(loading || searchLoading) && <Loader text="Processing..." />}
      <div className="flex flex-col justify-center items-center py-8 w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Search & Book Vehicle</h1>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <Input
              name="capacityRequired"
              placeholder="Capacity Required (KG)"
              value={formik.values.capacityRequired}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.capacityRequired && formik.errors.capacityRequired && (
              <p className="text-red-500 text-sm">{formik.errors.capacityRequired}</p>
            )}

            <Input
              name="fromPincode"
              placeholder="From Pincode"
              value={formik.values.fromPincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fromPincode && formik.errors.fromPincode && (
              <p className="text-red-500 text-sm">{formik.errors.fromPincode}</p>
            )}

            <Input
              name="toPincode"
              placeholder="To Pincode"
              value={formik.values.toPincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.toPincode && formik.errors.toPincode && (
              <p className="text-red-500 text-sm">{formik.errors.toPincode}</p>
            )}

            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              className="w-full"
              onChange={(value, dateString) => formik.setFieldValue('startTime', dateString)}
            />
            {formik.touched.startTime && formik.errors.startTime && (
              <p className="text-red-500 text-sm">{formik.errors.startTime}</p>
            )}

            <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700 mt-4 rounded-full">
              Search Availability
            </Button>
          </form>
        </div>

        {/* Results */}
        {vehicles.length > 0 && (
          <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Available Vehicles</h2>
            <div className="flex flex-col gap-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle._id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p><strong>Name:</strong> {vehicle.name}</p>
                    <p><strong>Capacity:</strong> {vehicle.capacityKg} KG</p>
                    <p><strong>Tyres:</strong> {vehicle.tyres}</p>
                    <p><strong>Estimated Ride Duration:</strong> {vehicle.estimatedRideDurationHours} hrs</p>
                  </div>
                  <Button
                    type="primary"
                    className="bg-green-600 hover:bg-green-700 rounded-full"
                    onClick={() => handleBook(vehicle._id, formik.values)}
                  >
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchAndBook;
