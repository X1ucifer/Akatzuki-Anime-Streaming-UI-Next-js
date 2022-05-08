import React, { useEffect, useRef, useState, useMemo } from "react";
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact';
import {
    VolumeUpIcon, VolumeOffIcon, HeartIcon, ChatIcon
} from '@heroicons/react/Outline'
import useElementOnScreen from "../observer";


function Video({url,title}) {

    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }



    const [playing, setPlaying] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);


    const [mute, setMute] = useState(false);

    const [isMute, setIsMute] = useState(true);
    const [like, setLike] = useState(true)

    const videoRef = useRef(null);

    const onVideoPress = () =>{
        if(mute){
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
                    <p className='pl-[10px]'>OCTOBER </p>
                    <p className='pl-[10px]'>2000</p>

                </div>

                <div className='absolute w-[50%] bottom-[50px] pl-[30px] z-[10]'>

                    <p className='pb-[30px] w-[50%] pl-[0px]'>Just enjoy your anime with one click</p>

                    <button className='py-[20px] px-[60px] text-black bg-white border-none'>Watch Now</button>

                </div>

                <div className='absolute right-[0%] top-[14%] p-[10px] flex flex-wrap w-[20%] md:top-[18%]'>
                    <span className='border-solid  border-2 border-stone-400 py-[1px] px-[7px]  mr-2 mb-[10px]'>HD</span>
                    <span className='border-solid  border-2 border-stone-400 py-[1px] px-[7px]  mr-2 mb-[10px]'>DUB/SUB</span>
                    <span className='border-solid  border-2 border-stone-400 py-[1px] px-[7px]  mr-2 mb-[10px]'>24EP</span>
                    <span className='border-solid  border-2 border-stone-400 py-[1px] px-[7px]  mr-2 mb-[10px]'>ONGOING</span>
                </div>

                <div className='absolute right-[0%] bottom-[5%] w-[45%] h-[80px] z-10 overflow-y-auto scrollbar-hide md:right-[32.2%] md:bottom-[2%] md:w-[33%] md:h-[100px]'>

                    <ReadMoreReact text={"Most of the fans felt it wrapped up Tanjiro and Nezuko's story rather nicely. The Mugen Train Arc covers up until around Chapter 69, and the Entertainment District Arc goes until Chapter 99. That leaves about four arcs and more than 100 chapters to cover in future seasons of the anime"}
                        min={50}
                        ideal={70}
                        max={100}
                        readMoreText={"-read more"} />

                </div>

                <div className='absolute bottom-[21.6%] right-[40px] flex z-[10] md:bottom-[10%] md:right-[8%]'>

                    {mute ? (<VolumeUpIcon onClick={onVideoPress} className="-50 hover:bg-slate-200 hover:text-black rounded-full p-1 cursor-pointer mr-4 border-3 border-slate-50 h-8 w-15" />
                    ) : (
                        <VolumeOffIcon onClick={onVideoPress} className="-50 hover:bg-slate-200 hover:text-black rounded-full p-1 cursor-pointer mr-4 border-3 border-slate-50 h-8 w-15" />
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
                            <path strokeLinecap="round"  strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg onClick={onVideoClick}  xmlns="http://www.w3.org/2000/svg" className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black mr-4 border-3 border-slate-50 h-8 w-15 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    )}




                    <ChatIcon className=" hover:bg-slate-200 rounded-full p-1 cursor-pointer hover:text-black border-3 border-slate-50 h-8 w-15 " />
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
