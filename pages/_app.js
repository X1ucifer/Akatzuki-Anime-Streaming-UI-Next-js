import '../styles/globals.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import 'plyr-react/dist/plyr.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <ToastContainer position="bottom-left" />

        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
