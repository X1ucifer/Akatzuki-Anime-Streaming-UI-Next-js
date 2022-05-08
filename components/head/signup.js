import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'



export default function Signup({ isOpen, openmodel, closemodel }) {
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
                                backgroundImage: " url(https://res.cloudinary.com/jinu/image/upload/v1642941852/k7xi055qdfr3siikdijq.jpg)", backgroundBlendMode: "multiply", backgroundColor: "#000000a1"
                            }}>
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text--900 mb-[30px]"
                                >
                                    Signup
                                </Dialog.Title>
                                <div className="mt-2">
                                    <from>
                                        <label className='block'>

                                        <span class="block text-sm font-medium text-slate-200">Username</span>

                                        <input type="text" placeholder='Enter Name' className='mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-[30px]' ></input>

                                            <span class="block text-sm font-medium text-slate-200">Email</span>
                                            
                                            <input type="email" placeholder='Enter Email' className='mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 mb-[30px]' ></input>

                                            <span class="block text-sm font-medium text-slate-200">Password</span>

                                            <input type="password" placeholder='Enter Password' className='mt-1 block w-full px-3 py-2 bg-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 '></input>
                                        </label>
                                    </from>
                                </div>

                                <div className="mt-4 w-full">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-700 to-orange-600  rounded-md  mt-[10px]"

                                    >
                                        Signup
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
