import React from "react";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { ToastContainer } from "react-toastify";
import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Routes />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </div>
  );
}

export default App;
