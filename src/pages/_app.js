import { useEffect } from "react";
import store from "@/features/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      offset: -5,
      duration: 2000,
    });
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer position="top-center" />
    </Provider>
  );
}
