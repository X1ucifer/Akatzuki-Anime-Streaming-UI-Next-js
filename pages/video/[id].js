import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"
import { useRouter } from 'next/router'
import { Context } from "../../context";
import { toast } from "react-toastify";
import Plyr from "plyr-react";
import ReactJWPlayer from "react-jw-player";
import MediaControlCard from "../../components/relatedanimecard"
import Carousel from "react-multi-carousel";



function WatchNOw() {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const [series, setSeries] = useState([]);
    const [update, setUpdate] = useState([]);
    const [animelist, setAnimeList] = useState();


    const router = useRouter();

    const fetchdata = async () => {
        if (user !== null) {
            const { data } = await axios.get(`/api/v1/usergetseries`, { headers: { Authorization: 'Bearer ' + user.accessToken } })

            console.log("-->", data)
            setSeries(data)
        } else {
            router.push("/")
            toast.error("Please Login 📢")
            return {}
        }
    }





    useEffect(() => {
        fetchdata();

    }, [])

    const watch = () => {
        setUpdate(series.find((value) => value.id === Number(router.query.id)))
    }


    const fetchanimedata = async () => {
        if (update && update.title) {
            const { data } = await axios.get(` https://api.jikan.moe/v3/search/anime?q=${update && update.title.toLowerCase()}&order_by=title&sort=asc&limit=10`)

            console.log("-->", data.results)
            setAnimeList(data.results)
        } else {
            return;
        }

        // malScraper.getInfoFromName(update && update.title)
        //     .then((data) => console.log("mal",data))
        //     .catch((err) => console.log(err))

    }


    useEffect(() => {
        watch();


    }, [fetchdata])

    useEffect(() => {
        fetchanimedata();


    }, [update && update.length !== 0])



    console.log("watch-->", update && update.title)

    return (
        <>
            <div className=''>
                <div className='w-[65%] pt-[95px]  ml-[auto] mr-[auto] grid-template-columns: repeat(2, minmax(0, 1fr));'>
               


                    <Plyr
                        source={{
                            type: "video",
                            sources: [
                                {
                                    src: (`${update && update.watch_now}`),
                                    type: 'video/mp4',
                                    size: 720,

                                },

                            ]

                        }}

                        options={{
                            autoplay: "true"
                        }
                        }

                    />

                </div>
                {/* 
            <div>
                hi
            </div> */}

            </div>

            <div className='container mx-auto mt-[69px]' >

                <h1 className='font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-100 to-black'>RELATED ANIMES</h1>
   

         
                    <div className='flex flex-wrap '>
                        {animelist && animelist.map((value) => (
                            <>
                                <MediaControlCard value={value} />
                            </>
                        ))}
                    </div>
           
            </div>
        </>
    )
}

export default WatchNOw