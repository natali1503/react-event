import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showErrorToast = (text: string) => {
  toast(text, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'white',
    transition: Bounce,
    style: {
      backgroundColor: 'red',
      color: 'white',
    },
    progressStyle: { backgroundColor: 'white' },
  });
};

const showSuccessToast = (text: string) => {
  toast(text, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'white',
    transition: Bounce,
    style: {
      backgroundColor: 'green',
      color: 'white',
    },
    progressStyle: { backgroundColor: 'white' },
  });
};

export { showErrorToast, showSuccessToast };
