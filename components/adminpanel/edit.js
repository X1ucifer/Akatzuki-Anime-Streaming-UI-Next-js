import React, { useState, useContext, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Button, Badge } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from "react-toastify";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Token from "../../context/token"
import { Context } from "../../context";
import Avatar from '@material-ui/core/Avatar';
import Resizer from "react-image-file-resizer";
import { useRouter } from "next/router";



const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    barColorPrimary: {
        backgroundColor: "white",
        color: "red"
    }
});


function Editform({ info }) {

    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const router = useRouter();


    const classes = useStyles();
    console.log("edit form", info)

    function LinearProgressWithLabel(props) {
        return (
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress className={classes.barColorPrimary} variant="determinate" {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="inherit">{progress}%</Typography>
                </Box>
            </Box>
        );
    }


    const [preview, setPreview] = useState("");
    const [title, setTitle] = useState("dfd");
    const [no_episodes, setEp] = useState("");
    const [description, setContent] = useState("");
    const [date, setDate] = useState("");
    const [bgvideo, setBgvideo] = useState("");
    const [watch_now, setWatchnow] = useState("");
    const [series, setSeries] = useState("");
    const [ongoing_process, setProcess] = useState("Ongoing");


    const [uploading, setUploading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState("Upload AMV Video");
    const [uploadButtonText1, setUploadButtonText1] = useState("Upload Video");
    const [uploadButtonTextImage, setUploadButtonTextImage] = useState("Upload Image");
    const [image, setImage] = useState({});
    const [videoname, setVideoName] = useState("");
    const [progress, setProgress] = useState(0);
    const [progress1, setProgress1] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCourse();
    }, [info]);

    const loadCourse = async () => {
        if (info && info.title) setTitle(info.title);
        if (info && info.description) setContent(info.description);
        if (info && info.date) setDate(info.date);
        if (info && info.no_episodes) setEp(info.no_episodes);
        if (info && info.ongoing_process) setProcess(info.ongoing_process);
        if (info && info.watch_now) setWatchnow(info.watch_now);
        if (info && info.bgvideo) setBgvideo(info.bgvideo);
        if (info && info.image) setImage(info.image);
        // if (data) setLessons(data);
    };




    const handleSeries = async (e) => {
        e.preventDefault();
        console.table({ title, description, watch_now, no_episodes, ongoing_process, bgvideo, date });
        try {
            const { data } = await axios.put(
                `/api/v1/seriesupdate`, {
                id:info.id,    
                title,
                no_episodes,
                description,
                date,
                bgvideo,
                watch_now,
                ongoing_process,
                image

            },

                { headers: { Authorization: 'Bearer ' + user.accessToken } }
            );

            router.push("/admin");
            // console.log(data)
            // setValues({ ...values, title: "", content: "", video: {}, time: "" });
            setContent("");
            setImage({});
            setTitle("");
            setBgvideo({});
            setWatchnow({});
            setProgress(0);
            setProgress1(0);
            setUploadButtonText1("Upload video");
            setUploadButtonText("Upload AMV video");
            setSeries(data);
            toast.success("Series added");
        } catch (err) {
            console.log(err);
            toast.error("Series add failed");
        }
    };

    const handleImage = async (e) => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));
        setUploadButtonTextImage(file.name);
        setLoading({ loading: true });


        const videoData = new FormData();
        videoData.append("videoData", file);
        // resize
        // Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
        try {
            let { data } = await axios.post(`/api/v1/image_upload`,
                videoData,
                {
                    headers: { "Content-Type": "multpart/form-data" },
                });
            console.log("IMAGE UPLOADED", data);
            // set image in the state
            setImage(data);
            setEditPage(false)
            setLoading({ loading: false });
            toast("Image uploaded");
        } catch (err) {
            console.log(err);
            setLoading({ loading: false });
            toast("Image uploaded");
        }

    };

    const handleVideo = async (e) => {

        try {
            const file = e.target.files[0];
            setUploadButtonText1(file.name);
            setUploading(true);
            setVideoName(file.name)

            const videoData = new FormData();
            videoData.append("videoData", file);
            // save progress bar and send video as form data to backend
            const { data } = await axios.post(`/api/v1/upload_video`,
                videoData,

                {

                    onUploadProgress: (e) => {
                        setProgress(Math.round((100 * e.loaded) / e.total));
                    },


                },

            );
            // once response is received
            console.log("ss", data);

            setWatchnow(data);
            setUploading(false);
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast("Video upload failed");
        }


    }

    const handleBgvideo = async (e) => {

        try {
            const file = e.target.files[0];
            setUploadButtonText(file.name);
            setUploading(true);
            setVideoName(file.name)

            const videoData = new FormData();
            videoData.append("videoData", file);
            // save progress bar and send video as form data to backend
            const { data } = await axios.post(`/api/v1/upload_video`,
                videoData,

                {

                    onUploadProgress: (e) => {
                        setProgress1(Math.round((100 * e.loaded) / e.total));
                    },


                },

            );
            // once response is received
            console.log("s", data);

            setBgvideo(data);
            setUploading(false);
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast("Video upload failed");
        }


    }


    return (
        <div className={styles.contentcontainer}>
            <div className="">
                <div className="w-[970px] ml-[16%] mt-[100px]">
                    <form onSubmit={handleSeries} className="">
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
							focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
							disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
							invalid:border-pink-500 invalid:text-pink-600
							focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]"
                            onChange={(e) => setTitle(e.target.value)}
                            values={title}
                            placeholder="Title"
                            autoFocus
                            required
                        />

                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
							focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
							disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
							invalid:border-pink-500 invalid:text-pink-600
							focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]"
                            onChange={(e) => setEp(e.target.value)}
                            values={no_episodes}
                            placeholder="No.of Episodes"
                            autoFocus
                            required
                        />

                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
							focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
							disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
							invalid:border-pink-500 invalid:text-pink-600
							focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]"
                            onChange={(e) => setDate(e.target.value)}
                            values={date}
                            placeholder="Release Date"
                            autoFocus
                            required
                        />

                        <div className="">
                            <div className="mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
							focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
							disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
							invalid:border-pink-500 invalid:text-pink-600
							focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]">
                                <span class="block text-sm font-medium text-slate-200 mb-2">Select Ongoing or Ended</span>

                                <Select
                                    color="inherit"
                                    style={{ width: "100%", color: "black", backgroundColor: "white" }}
                                    // size="large"
                                    value={ongoing_process}
                                    onChange={(e) => setProcess(e.target.value)}
                                >

                                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                                    <MenuItem value="Ended">Ended</MenuItem>
                                </Select>
                            </div>
                        </div>

                        <textarea
                            className="mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
							focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
							disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
							invalid:border-pink-500 invalid:text-pink-600
							focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]"
                            cols="7"
                            rows="7"
                            onChange={(e) => setContent(e.target.value)}
                            values={description}
                            placeholder="Description"
                        ></textarea>

                        {/* image */}

                        <div className="">
                            <div className="">
                                <label className="mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]">
                                    {uploadButtonTextImage}
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleImage}
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            </div>
                            {preview && (
                                <div className="mt-1 block w-[66px] px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
								focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
								disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
								invalid:border-pink-500 invalid:text-pink-600
								focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]">

                                    <Badge>
                                        <Avatar width={200} src={preview} />
                                    </Badge>
                                </div>
                            )}
                        </div>


                        {/* watchnow */}


                        <div className="mb-[30px]">
                            <label className="mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]">
                                {uploadButtonText1}
                                <input className="mb-[20px]" onChange={handleVideo} type="file" accept="video/*" hidden />
                            </label>

                            {/* {!uploading && watch_now.Location && (
								<Tooltip title="Remove">
									<span onClick={handleVideoRemove} className="pt-1 pl-3">
										<CloseIcon style={{ color: "white" }} className="text-danger d-flex justify-content-center  pointer" />
									</span>
								</Tooltip>
							)} */}

                            {progress > 0 && (
                                // <CircularProgress
                                //     // className="d-flex justify-content-center pt-2"
                                //     value={progress}
                                //     size={10}
                                //     color="inherit"
                                // />
                                // <div className="progress">
                                //     <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
                                // </div>

                                <div className={classes.root}>

                                    <LinearProgressWithLabel value={progress} />
                                </div>
                            )}
                        </div>

                        {/* AMV Video */}

                        <div className="mb-[30px]">
                            <label className="mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]">
                                {uploadButtonText}
                                <input className="mb-[20px]" onChange={handleBgvideo} type="file" accept="video/*" hidden />
                            </label>

                            {/* {!uploading && bgvideo.Location && (
								<Tooltip title="Remove">
									<span onClick={handleVideoRemove} className="pt-1 pl-3">
										<CloseIcon style={{ color: "white" }} className="text-danger d-flex justify-content-center  pointer" />
									</span>
								</Tooltip>
							)} */}

                            {progress1 > 0 && (
                                // <CircularProgress
                                //     // className="d-flex justify-content-center pt-2"
                                //     value={progress}
                                //     size={10}
                                //     color="inherit"
                                // />
                                // <div className="progress">
                                //     <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
                                // </div>

                                <div className={classes.root}>

                                    <LinearProgressWithLabel value={progress1} />
                                </div>
                            )}
                        </div>



                        {/* {!uploading && video.Location && (
							<div>
								<p>Duration : {duration.toString().slice(0, 2)}Min</p>
							</div>
						)} */}

                        <Button
                            onClick={handleSeries}
                            // disabled={!title || !description}
                            className="mt-[20%]"
                            size="large"
                            type="primary"
                            // loading={uploading}
                            variant="contained"
                            style={{ backgroundColor: "white" }}
                        >
                            {uploading ?
                                <svg role="status" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                </svg>
                                : "Save"}
                        </Button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Editform;