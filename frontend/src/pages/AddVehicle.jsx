import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Loader from '../components/Loader';
import { showNotification, NotificationType } from '../utils';
import { useNavigate } from 'react-router-dom';

const AddVehicle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BASE_URL;
  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Vehicle name is required'),
    capacityKg: Yup.number()
      .typeError('Capacity must be a number')
      .positive('Capacity must be greater than 0')
      .integer('Capacity must be a whole number')
      .required('Capacity is required'),
    tyres: Yup.number()
      .typeError('Tyres must be a number')
      .positive('Tyres must be greater than 0')
      .integer('Tyres must be a whole number') 
      .required('Number of tyres is required'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/vehicles`, values); 
      showNotification('Vehicle added successfully', NotificationType.SUCCESS);
      formik.resetForm();
      console.log('API Response:', response.data);
    } catch (error) {
      console.error(error);
      showNotification(
        error?.response?.data?.message || 'Failed to add vehicle',
        NotificationType.ERROR
      );
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      capacityKg: '',
      tyres: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center items-center h-[55vh] w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6">Add New Vehicle</h1>

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <div>
                <Input
                  size="large"
                  name="name"
                  placeholder="Vehicle Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="rounded-md"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                )}
              </div>

              <div>
                <Input
                  size="large"
                  name="capacityKg"
                  placeholder="Capacity (KG)"
                  value={formik.values.capacityKg}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="rounded-md"
                />
                {formik.touched.capacityKg && formik.errors.capacityKg && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.capacityKg}</p>
                )}
              </div>

              <div>
                <Input
                  size="large"
                  name="tyres"
                  placeholder="Number of Tyres"
                  value={formik.values.tyres}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="rounded-md"
                />
                {formik.touched.tyres && formik.errors.tyres && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.tyres}</p>
                )}
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-600 hover:bg-blue-700 rounded-full mt-4"
                size="large"
              >
                Add Vehicle
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVehicle;

