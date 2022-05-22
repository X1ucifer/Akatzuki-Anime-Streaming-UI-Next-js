import React, { Fragment, useState, useContext, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/head/header"
import Video from "../components/head/video"
import axios from "axios"

export default function Home() {


  const videos = [
    {
      video: "https://res.cloudinary.com/dbgit2gak/video/upload/v1651993286/Naruto_AMV_ASMV_-_The_Tale_of_7th_Hokage_Naruto_Uzumaki_on2uow.mp4",
      title: "Naruto",
    },
    {
      video: "https://res.cloudinary.com/dbgit2gak/video/upload/v1652018852/One_Piece_AMV_-_Luffy_vs_Kaido_-_Episode_1015_-_Middle_Of_The_Night_jvrefh.mp4",
      title: "One Piece",
    },
    {
      video: "https://res.cloudinary.com/jinu/video/upload/v1640527188/xrfpzn7ernsgbffawajx.mp4",
      title: "Demon Slayer",
    },
    {
      video: "https://res.cloudinary.com/jinu/video/upload/v1640525798/hont4avius7ut2ansiwm.mp4",
      title: "Jujutsu Kaisen",
    }
  ];

  const [anime, setAnime] = useState("")

  const fetchseries = async () => {

    const {data} = await axios.get(`/api/v1/all`)
    console.log("-->",data)
    setAnime(data)
    

  }

  useEffect(() => {
    fetchseries();
  },[])

  return (

    <>
      <div>
        <Header />

        <div>

          <div className='snap-mandatory snap-y overflow-scroll max-h-[100vh] scrollbar-hide'>
            {anime && anime.map(
              ({ bgvideo, title, ongoing_process, no_episodes, date, description, id }) => (
                <>
                  <div className='snap-start	'>
                    <Video id={id} url={bgvideo} title={title} process={ongoing_process} episodes={no_episodes} date={date} description={description} />
                  </div>
                </>
              )
            )}
          </div>

        </div>
      </div>
    </>
  )
}
