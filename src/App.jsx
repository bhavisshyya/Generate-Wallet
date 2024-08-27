import { ToastContainer, Bounce } from "react-toastify";
import "./App.css";
import Component from "./component/Component";
import "react-toastify/dist/ReactToastify.css"; // Ensure this CSS import is included for proper styling

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
      />
      <Component />
    </>
  );
}

export default App;
