import React from 'react'
import { useAuthContext } from '../context/AuthContext'

export default function Profile() {
    const { user } = useAuthContext();

    return (
        <div className=" h-auto px-48 flex flex-col justify-center mt-5">
            <div className="flex flex-row justify-center">
                <div className="p-4 text-center flex justify-center">
                    <button
                        className="flex rounded-full "
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                    >
                        <img
                            className="h-40 w-40 rounded-full"
                            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                            alt
                        />
                    </button>
                </div>
                <div className="text-left ml-4 flex flex-col justify-center">
                    <div className="text-left flex aline-center">
                        <span className="text-lg font-bold text-gray-700 mr-2">{user.first_name + " " + user.last_name}</span>
                    </div>
                    <div className="text-left">
                        <span className="text-base text-gray-700 text-2xl mr-2">{user.username}</span>

                    </div>

                    {/* <span className="text-base font-semibold text-gray-700">
                                <button
                                    className="p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                                    aria-label="Notifications"
                                >
                                    <svg
                                        className="h-8 w-8"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </span> */}
                    <div className="text-left">
                        <span className="text-base font-semibold text-gray-700 mr-2">
                            <b>220</b> posts
                        </span>
                    </div>
                </div>


            </div>


            <div className="flex  justify-center">

                <hr className="border-gray-500 mt-6 mb-6 w-8/12" />
            </div>
            <div className="flex  justify-center">
                <div className="grid grid-cols-3 gap-4 w-8/12">
                    <div className="flex-1 text-center px-4 py-2 m-2">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        />
                    </div>
                    <div className="flex-1 text-center px-4 py-2 m-2">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        />
                    </div>
                    <div className="flex-1 text-center px-4 py-2 m-2">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        />
                    </div>
                    <div className="flex-1 text-center px-4 py-2 m-2">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        />
                    </div>
                    <div className="flex-1 text-center px-4 py-2 m-2">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        />
                    </div>
                    <div className="flex-1 text-center px-4 py-2 m-2">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        />
                    </div>
                    <div className="flex-1 text-center px-4 py-2 m-2">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        />
                    </div>
                    <div className="flex-1 text-center px-4 py-2 m-2">
                        <img
                            className="w-full"
                            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
