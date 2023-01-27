import { Link } from "react-router-dom";
import { createRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
    const emailRef = createRef()
    const passwordRef = createRef()
    const { setUser, setToken } = useAuthContext()
    const [message, setMessage] = useState(null)

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        
    }

    return (
        <form onSubmit={onSubmit} className="backdrop-blur-sm  bg-black/30 flex flex-col min-w-96 w-2/5 justify-center m-auto rounded-md px-14 pb-6 pt-8 text-center">
            <div class="mb-6">
                <h1 className="font-bold text-3xl text-white">Login </h1>
            </div>
            <div class="mb-5">

                <input
                    ref={emailRef}
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Email or Username"
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
            <button href="#" className="w-24 m-auto rounded-full bg-[#ec4b4a] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-[#a32f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
            <p className="mt-8 text-white text-md">Don't have an account yet? <Link to="/signup" className="font-bold">Sign up</Link></p>
        </form>

    )
}
