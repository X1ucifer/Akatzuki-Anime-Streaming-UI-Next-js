import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import Signup from "./signup"
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../context";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import { Menu, Box, useMediaQuery, ButtonBase } from "@material-ui/core";
import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        paddingLeft: "40px",
        cursor: "pointer"
    },
    button: {
        textTransform: "none",
        marginRight: "10PX",
        color: 'white',
        marginLeft: "40PX",
        [theme.breakpoints.down("sm")]: {
            textTransform: "none",
            width: "138px",
            height: "62px",
            left: "0px",
            bottom: "10px",
            color: 'black',
            background: "#E44F4D",
        },
    },
    Signup: {
        textTransform: "none",
        width: "138px",
        height: "62px",
        left: "14px",
        top: "0px",
        [theme.breakpoints.down("md")]: {
            textTransform: "none",
            width: "138px",
            height: "62px",
            left: "14px",
            top: "0px",

        },
    },
    marginLeft: {
        marginLeft: theme.spacing(1),
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",

        },

    },

    menu: {
        "& .MuiPaper-root": {
            //   backgroundColor: "lightblue"
            background: "linear-gradient(90.09deg, #1E1D1D 1.02%, rgb(42 42 42 / 91%) 59.71%)",
            color: 'white',
        }
    },
    orange: {
        // color: theme.palette.getContrastText(deepOrange[500]),
        // backgroundColor: deepOrange[500],
        background: "linear-gradient(to right, #8e2de2, #4a00e0)",
    },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);


function Header() {

    

    const [username, setUsername] = useState("");
    const [role, setRole] = useState(["user"]);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);


    let [isOpen, setIsOpen] = useState(false)

    let [isSign, setIsSign] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    useEffect(() => {
        console.log("uuuuu", user)
    }, [user])


    function openSign() {
        setIsSign(true)
        setIsOpen(false)
    }

    function closeModal() {
        setIsOpen(false)

    }

    function openModal() {
        setIsOpen(true)
    }


    function closeModalSign() {
        setIsSign(false)
    }

    function openModallogin() {
        setIsSign(false)
        setIsOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.table({ name, email, password });
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/auth/signin`, {
                username,
                password,
            });
            console.log("LOGIN RESPONSE", data);
            // console.log("LOGIN RESPONSE", data);
            dispatch({
                type: "LOGIN",
                payload: data,
            });
            // save in local storage
            window.localStorage.setItem("user", JSON.stringify(data));
            setUsername("")
            setPassword("")
            // redirect
            setIsOpen(false)
            setLoading(false);
        } catch (err) {
            console.log("gh",err)
            toast.dark(err.response.data.message);
            setLoading(false);
        }
    };


    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");

        toast.dark("Logout Success");
        // router.push("/login");
    }


    const classes = useStyles();



    return (


        <>

            <div className='absolute  top-0 p-10 w-full bg-gradient-to-b from-neutral-900 to-transparent h-5 z-[1]'> </div>
            <div className='fixed w-full h-90 flex justify-between	items-center p-4 z-10'>

                <div>
                    <h1 className='font-medium text-lg antialiased'>
                        <del>AKATSUKI</del> {user && "-"} <del>{user && user.username.toUpperCase()} </del>
                    </h1>
                </div>


                {user === null && (

                    <div className='cursor-pointer border-2 py-1 px-3 md:py-1 md:px-3 md:bg-gradient-to-r from-pink-700 to-orange-600 md:border-none md:rounded-md' onClick={openModal}>
                        <a >LOGIN</a>
                    </div>
                )
                }

                {user !== null && (

                    <>

                        <div>


                            <div className={classes.root} onClick={handleClick} >
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                >
                                    <Avatar alt={user && user.name} src={user.picture} className={classes.orange} />
                                </StyledBadge>

                            </div>
                        </div>


                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className={classes.menu}
                        >


                            {user && user.roles && user.roles.includes("ROLE_ADMIN") && (
                                <MenuItem onClick={handleClose}>


                                    <Link href="/admin">
                                        <a>
                                            <Button color="inherit">
                                                Creator's Room
                                            </Button>
                                        </a>
                                    </Link>


                                </MenuItem>
                            )}



                            <MenuItem onClick={handleClose}>
                                <Button onClick={logout} color="inherit">
                                    Logout
                                </Button>
                            </MenuItem>
                        </Menu>

                    </>
                )
                }

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={closeModal}
                    >
                        <div className="min-h-screen px-4 text-center " style={{
                            background: "linear-gradient(to bottom, rgb(0 0 0 / 66%), rgb(26 26 26))"
                        }}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl " style={{
                                    backgroundImage: " url(https://res.cloudinary.com/dbgit2gak/image/upload/v1652855363/u6vmuoc0gbmvheniwe3q.jpg)", backgroundBlendMode: "multiply", backgroundColor: "#000000a1"
                                }}>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text--900 mb-[30px]"
                                    >
                                        Login
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <from>
                                            <label className='block'>
                                                <span class="block text-sm font-medium text-slate-200">Username</span>
                                                <input type="text" placeholder='Enter Username' className='mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px] '  value={username}
                                                    onChange={(e) => setUsername(e.target.value)}></input>

                                                <span class="block text-sm font-medium text-slate-200">Password</span>

                                                <input type="password" placeholder='Enter Password' className='mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 '  value={password}
                                                    onChange={(e) => setPassword(e.target.value)}></input>
                                            </label>
                                        </from>
                                    </div>

                                    <div className="mt-4 w-full">
                                        <button
                                            onClick={handleSubmit}
                                            type="submit"
                                            disabled={!username || !password || loading}
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-700 to-orange-600  rounded-md  mt-[10px]"

                                        >
                                            {loading ? (
                                                <>
                                                    <svg role="status" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                                    </svg>

                                                </>
                                            )
                                                :
                                                "Log In"}
                                        </button>

                                        <a className='ml-[40%] text-sm cursor-pointer' onClick={openSign}>Don't have an account yet!</a>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition >



            </div >

            <Signup isOpen={isSign} closemodel={closeModalSign} openmodel={openModallogin} />
        </>
    )
}

export default Header;
