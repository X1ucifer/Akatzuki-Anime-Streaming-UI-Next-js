import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/head/header"
import Video from "../components/head/video"

export default function Home() {

  
const videos = [
  {
      video: "https://res.cloudinary.com/jinu/video/upload/v1640527127/c88emmbfle4lpkb0bnbc.mp4",
      title: "Naruto",
  },
  {
      video: "https://res.cloudinary.com/jinu/video/upload/v1640525513/d6mqqjdnxh08litwy52g.mp4",
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

  return (
    
    <>
      <div>
        <Header />

        <div>

          <div className='snap-mandatory snap-y overflow-scroll max-h-[100vh] scrollbar-hide'>
          { videos.map(
            ({ video, title,}) => (
              <>
                <div className='snap-start	'>
                  <Video url={video} title={title} />
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
