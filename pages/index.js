import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import Header from "./components/head/header"
import Video from "./components/head/video";
import CastSlider from "./components/head/castSlide"
import styles from '../styles/Index.module.css'
import db from "../firebase";
import { doc, collection, query, getDoc, onSnapshot } from "firebase/firestore";
import LazyLoad from 'react-lazyload';





export default function Home() {

  const [videos, setVideos] = useState([]);


  useEffect(() => {
    const q = query(collection(db, "videos"))
    const unsub = onSnapshot(q, (querySnapshot) => {
      setVideos(querySnapshot.docs.map((doc) => doc.data()))
      console.log("888", videos)
    });
  }, [])

  const child = { width: `100em`, height: `100em` }

  return (
    <div className={styles.app}>
      <Header />



      <div className={styles.container}>
        <LazyLoad height={200} once={true} offset={100} scroll={true}>
          {videos.map(
            ({ url, title, description }) => (
              <>
                <div className={styles.item}>
                  <Video url={url} title={title} description={description} />
                </div>
              </>
            )
          )}
        </LazyLoad>

      </div>




      {/* <CastSlider/> */}

    </div>
  )
}
