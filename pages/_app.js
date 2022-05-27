import React from 'react';
import '../styles/globals.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import 'plyr-react/dist/plyr.css'
import Header from '../components/head/header';
import { useRouter } from 'next/router';
import NextNProgress from '../components/loader';
import 'react-multi-carousel/lib/styles.css';



function MyApp({ Component, pageProps }) {

  const router = useRouter()


  const [loader, setLoader] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000);
  }, [])


  React.useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setLoader(true)
    })
    router.events.on('routeChangeComplete', () => {
      setLoader(false)
    })
    router.events.on('routeChangeError', () => {
      setLoader(false)
    })

  }, [router])

  return (
    <>
      <Provider>
        <ToastContainer position="bottom-left" />
        <Header />


        {loader ? <NextNProgress /> : (
          <Component {...pageProps} />
        )}
      </Provider>
    </>
  )
}

export default MyApp
