import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

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
        backgroundColor: 'red', // Красный фон
        color: 'white', // Белый текст
      },
      progressStyle: { backgroundColor: 'white' }
    });}

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
        backgroundColor: 'green', // Красный фон
        color: 'white', // Белый текст
      },
      progressStyle: { backgroundColor: 'white' }
    });}

export {showErrorToast, showSuccessToast}