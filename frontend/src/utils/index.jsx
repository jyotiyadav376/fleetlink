import { toast } from 'sonner';
import axios from 'axios';

export const API_URL = import.meta.env.VITE_BASE_URL;

export const NotificationType = {
  ERROR: 'error',
  SUCCESS: 'success',
};

export const showNotification = (message = 'Something went wrong', type = NotificationType.ERROR, description) => {
  if (type === NotificationType.SUCCESS) {
    toast.success(message, { description });
  } else {
    toast.error(message, { description });
  }
};


export const handleErrorResponse = (error, callback, errorMessage) => {
  console.error(error);

  if (!errorMessage) {
    errorMessage = 'Something went wrong';

    if (typeof error === 'string') {
      try {
        error = JSON.parse(error);
      } catch (err) {
        // do nothing
      }
    }

    if (axios.isAxiosError(error) && error?.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error?.message) {
      errorMessage = error.message;
    }
  }

  showNotification(
    errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1),
    NotificationType.ERROR
  );

  if (callback) {
    return callback();
  }
};
