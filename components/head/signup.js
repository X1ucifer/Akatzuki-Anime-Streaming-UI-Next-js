import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { toast } from "react-toastify";


export default function Signup({ isOpen, openmodel, closemodel }) {

    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRole] = useState(["user"]);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.table({ name, email, password });
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/auth/signup`, {
                username,
                email,
                password,
                roles
            });
            console.log("REGISTER RESPONSE", data);
            toast.dark("Registration successful. Please login 🔥.");
            // router.push("/login");
            closemodel()
            openmodel();
            setName("")
            setPassword("")
            setEmail("")

            setLoading(false);
        } catch (err) {
            toast.error(err.response.data.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closemodel}
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
                                    Signup
                                </Dialog.Title>
                                <div className="mt-2">
                                    <form >
                                        <label className='block'>

                                            <span class="block text-sm font-medium text-slate-200">Username</span>

                                            <input type="text" placeholder='Enter Name' className='mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-[30px]'   value={username} onChange={(e) => setName(e.target.value)}></input>

                                            <span class="block text-sm font-medium text-slate-200">Email</span>

                                            <input type="email" placeholder='Enter Email' className='mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]' value={email} onChange={(e) => setEmail(e.target.value)}></input>

                                            <span class="block text-sm font-medium text-slate-200">Password</span>

                                            <input type="password" placeholder='Enter Password' className='mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                                        </label>
                                    </form>
                                </div>

                                <div className="mt-4 w-full">
                                    <button
                                        onClick={handleSubmit}
                                        type="submit"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-700 to-orange-600  rounded-md  mt-[10px]"
                                        disabled={!username || !email || !password || loading}
                                    >
                                        {loading ?
                                            <svg role="status" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                            </svg>
                                            : "Register"}
                                    </button>

                                    <a className='ml-[40%] text-sm cursor-pointer' onClick={openmodel}>Alreday have a Account ?</a>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

        </div>
    )
}
