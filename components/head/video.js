import React, { useEffect, useRef, useState, useMemo } from "react";
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact';
// import {
//     VolumeUpIcon, VolumeOffIcon, HeartIcon, ChatIcon
// } from '@heroicons/react/Outline'
import useElementOnScreen from "../observer";
import { useRouter } from "next/router";
import Link from "next/link";


function Video({ url, title, date, description, process, episodes, id }) {


    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }

    const router = useRouter();

    const route = (id) => {
        router.push("/[id]")
    }


    const [playing, setPlaying] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);


    const [mute, setMute] = useState(false);

    const [isMute, setIsMute] = useState(true);
    const [like, setLike] = useState(true)

    const videoRef = useRef(null);

    const onVideoPress = () => {
        if (mute) {
            videoRef.current.muted = mute;
            setMute(false);
        } else {
            videoRef.current.muted = mute;
            setMute(true);
        }
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
                setIsPlaying(false);
            }
        }
        else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false)
                setIsPlaying(true);
            }
        }

        if (isVisibile) {

            if (!isMute) {
                videoRef.current.muted = isMute;
            }
        }

    }, [isVisibile])



    return (
        <>
            <div className='h-screen w-full object-contain relative overflow-hidden'>

                <video ref={videoRef} preload="true" className='absolute  object-cover w-full h-screen '
                    src={url} muted autoPlay={url} loop></video>

                <div className='absolute w-1/2 top-[13vh] left-[30px] overflow-hidden z-[1]'>

                    <h1 className='text-4xl pb-7 font-bold md:text-7xl uppercase'>{title}</h1>

                    <h6 className='pb-[10px] pl-[10px]'>In Release</h6>
                    <p className='pl-[10px] uppercase font-normal'>{date}</p>
                    {/* <p className='pl-[10px]'>2000</p> */}

                </div>

                <div className='absolute w-[50%] bottom-[50px] pl-[30px] z-[10]'>

                    <p className='pb-[30px] w-[50%] pl-[0px]'>Just enjoy your anime with one click</p>

                    <Link
                        href={{
                            pathname: '/video/[id]',
                            query: { id: id },
                        }}
                    >
                        <button className='py-[20px] px-[60px] text-black bg-white border-none' >Watch Now</button>
                    </Link>



                </div>

                <div className='absolute right-[0%] top-[14%] p-[10px] flex flex-wrap w-[20%] md:top-[18%]'>
                    <span className='border-solid  border-2 border-stone-400 py-[1px] px-[7px]  mr-2 mb-[10px]'>HD</span>
                    <span className='border-solid  border-2 border-stone-400 py-[1px] px-[7px]  mr-2 mb-[10px]'>DUB/SUB</span>
                    <span className='border-solid  border-2 border-stone-400 py-[1px] px-[7px]  mr-2 mb-[10px]'>{episodes}EP</span>
                    <span className='border-solid  border-2 border-stone-400 py-[1px] px-[7px]  mr-2 mb-[10px] uppercase'>{process}</span>
                </div>

                <div className='absolute right-[0%] bottom-[5%] w-[45%] h-[80px] z-10 overflow-y-auto scrollbar-hide md:right-[32.2%] md:bottom-[2%] md:w-[33%] md:h-[100px]'>

                    <ReadMoreReact text={description}
                        min={50}
                        ideal={70}
                        max={100}
                        readMoreText={"-read more"} />

                </div>

                <div className='absolute bottom-[21.6%] right-[40px] flex z-[10] md:bottom-[10%] md:right-[8%]'>

                    {mute ? (
                        <svg onClick={onVideoPress} xmlns="http://www.w3.org/2000/svg" className="-50 hover:bg-slate-200 hover:text-black rounded-full p-1 cursor-pointer mr-4 border-3 border-slate-50 h-8 w-15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                        // <VolumeUpIcon onClick={onVideoPress} className="-50 hover:bg-slate-200 hover:text-black rounded-full p-1 cursor-pointer mr-4 border-3 border-slate-50 h-8 w-15" />
                    ) : (

                        <svg onClick={onVideoPress} xmlns="http://www.w3.org/2000/svg" className="-50 hover:bg-slate-200 hover:text-black rounded-full p-1 cursor-pointer mr-4 border-3 border-slate-50 h-8 w-15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                        // <VolumeOffIcon onClick={onVideoPress} className="-50 hover:bg-slate-200 hover:text-black rounded-full p-1 cursor-pointer mr-4 border-3 border-slate-50 h-8 w-15" />
                    )}

                    {like ? (

                        <svg xmlns="http://www.w3.org/2000/svg" className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black mr-4 border-3 border-slate-50 h-8 w-15 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" onClick={() => { setLike(false) }} >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        // <HeartIcon className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black mr-4 border-3 border-slate-50 h-8 w-15 " onClick={() => { setLike(false) }} />
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
                        <svg onClick={onVideoClick} xmlns="http://www.w3.org/2000/svg" className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black mr-4 border-3 border-slate-50 h-8 w-15 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    )}



                    <svg xmlns="http://www.w3.org/2000/svg" className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black border-3 border-slate-50 h-8 w-15 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>

                </div>

                <div className='absolute bottom-0 p-[40px] w-full h-[29vh]  z-[1]' style={{
                    background: "linear-gradient(to top, #181818, #1a1a1a00)"
                }}>

                </div>

            </div>
        </>
    );
}

export default Video;
