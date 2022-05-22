import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"
import { useRouter } from 'next/router'
import { Context } from "../../context";
import { toast } from "react-toastify";
import Plyr from "plyr-react";


function WatchNOw() {

    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const [series, setSeries] = useState([]);
    const [update, setUpdate] = useState([]);

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

    useEffect(() => {
        watch();

    }, [fetchdata])




    // console.log("watch-->", update.watch_now)

    return (
        <div className=''>
            <div className='w-[80%] m-[auto] mt-1'>

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
        </div>
    )
}

export default WatchNOw