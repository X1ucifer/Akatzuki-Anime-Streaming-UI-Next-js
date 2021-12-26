import React, { useEffect, useRef, useState } from "react";
import styles from '../../styles/Video.module.css'
import ReadMoreReact from 'read-more-react';
import {
    VolumeUpIcon, VolumeOffIcon, HeartIcon, ChatIcon
} from '@heroicons/react/Outline'
import useElementOnScreen from '../../hooks/observer'




function Video({ url, title, description }) {

    const [playing, setPlaying] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);


    const [mute, setMute] = useState(true);

    const [isMute, setIsMute] = useState(false);


    const videoRef = useRef(null);

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    }

    const isVisibile = useElementOnScreen(options, videoRef)

    const onVideoClick = () => {
        if (isPlaying) {
            videoRef.current.play();
            setIsPlaying(!isPlaying);
        } else {
            videoRef.current.pause();
            setIsPlaying(!isPlaying);
        }
    };
    
    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true)

            }
        }
        else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false)
            }
        }

        if (isVisibile) {

            if (!isMute) {
                videoRef.current.muted = isMute;
                setIsMute(true);
                console.log('unmute', videoRef.current)
            }
        }

    }, [isVisibile])



    const onVideoPress = () => {


        if (mute) {
            videoRef.current.muted = mute;
            setMute(false);
            console.log('ddd', videoRef.current)
        } else {
            videoRef.current.muted = mute;
            console.log('ss', videoRef.current)
            setMute(true);
        }
    };

    const [like, setLike] = useState(true)

    return (
        <>

            <div className={styles.main} >

                <video ref={videoRef} preload="true" className={styles.video} src={url} muted autoPlay={url} loop></video>


                <div className={styles.title}>
                    <h1>{title}</h1>

                    <h6>In Release</h6>
                    <p>OCTOBER </p>
                    <p>2000</p>
                </div>

                <div className={styles.btn}>
                    <p style={{ fontSize: "12px", }}>Just enjoy your anime with one click</p>
                    <button style={{ cursor: "pointer" }}>Watch Now</button>
                </div>

                <div className={styles.staring}>
                    <h6>Staring</h6>
                    <p>Monkey.D.Luffy</p>
                    <p>Roronoa Zoro</p>
                    <p>Sanji</p>
                    <p>Chopper</p>
                    <p>Usopp</p>

                </div>



                <div className={styles.description}>

                    <ReadMoreReact text={description}
                        min={50}
                        ideal={70}
                        max={100}
                        readMoreText={"-read more"} />

                </div>

                <div className={styles.controls}>

                    {mute ? (<VolumeUpIcon className="-50 hover:bg-slate-200 hover:text-black rounded-full p-1 cursor-pointer mr-4 border-3 border-slate-50 h-8 w-15" onClick={onVideoPress} />
                    ) : (
                        <VolumeOffIcon className="-50 hover:bg-slate-200 hover:text-black rounded-full p-1 cursor-pointer mr-4 border-3 border-slate-50 h-8 w-15" onClick={onVideoPress} />
                    )}

                    {like ? (
                        <HeartIcon className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black mr-4 border-3 border-slate-50 h-8 w-15 " onClick={() => { setLike(false) }} />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-rose-500 mr-4 border-3 border-slate-50 h-8 w-15 " viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" onClick={() => { setLike(true) }} />
                        </svg>

                    )}


                    {isPlaying ? (

                        <svg xmlns="http://www.w3.org/2000/svg" className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black mr-4 border-3 border-slate-50 h-8 w-15 " fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={onVideoClick}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black mr-4 border-3 border-slate-50 h-8 w-15 " onClick={onVideoClick} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    )}




                    <ChatIcon className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black border-3 border-slate-50 h-8 w-15 " />
                </div>


                <div className={styles.shade}></div>


            </div >
        </>
    )
}

export default Video
