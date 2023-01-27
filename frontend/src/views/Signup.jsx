import { Link } from "react-router-dom";
import { createRef, useState } from "react";
// import axiosClient from "../axios-client.js";
import { useAuthContext } from "../context/AuthContext";

export default function Signup() {
    const fnameRef = createRef()
    const lnameRef = createRef()
    const usernameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const { setUser, setToken } = useAuthContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            name: fnameRef.current.value,
            name: lnameRef.current.value,
            name: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
    }

    return (
        <form onSubmit={onSubmit} className="backdrop-blur-sm  bg-black/30 flex flex-col min-w-96 w-2/5 justify-center m-auto rounded-md px-14 pb-6 pt-8 text-center">
            <div class="mb-6">
                <h1 className="font-bold text-3xl text-white">Create Account</h1>
            </div>
            <div class="mb-5 flex flex-row">
                <input
                    ref={fnameRef}
                    type="text"
                    className="mr-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="First Name"
                />
                <input
                    ref={lnameRef}
                    type="text"
                    className="ml-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Last Name"
                />
            </div>
            <div class="mb-5">
                <input
                    ref={usernameRef}
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Username"
                />
            </div>
            <div class="mb-5">
                <input
                    ref={emailRef}
                    type="email"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Email"
                />
            </div>
            <div class="mb-6">
                <input
                    ref={passwordRef}
                    type="password"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Password"
                />
            </div>
            <div class="mb-6">
                <input
                    ref={passwordConfirmationRef}
                    type="password"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Repeat Password"
                />
            </div>
            <button href="#" className="w-24 m-auto rounded-full bg-[#ec4b4a] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-[#a32f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
            <p className="mt-8 text-white text-md">Already have an account? <Link to="/login" className="font-bold">Login</Link></p>
        </form>

    )
}
