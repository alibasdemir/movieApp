import { toast } from 'react-toastify';

const showToastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { fontWeight: 'bold' } 

  });
};
  
const showToastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    fontWeight: 'bold',
    style: { fontWeight: 'bold' } 
  });
};

export { showToastSuccess, showToastError };