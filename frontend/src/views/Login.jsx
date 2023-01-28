import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";

import { useAuthContext } from "../context/AuthContext";
import { login } from '../services/auth'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const ReCAPTCHARef = useRef()
    const { setUser, setToken } = useAuthContext()
    const alert = useAlert()
    const navigate = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault()
        if (ReCAPTCHARef.current.getValue() === "") {
            alert.error('Please verify that you are not a robot')
            return
        }
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            reToken: ReCAPTCHARef.current.getValue()
        }
        await login(data).then((res) => {
            if (res.success) {
                alert.success(res.message);
                setUser(res.data.user)
                setToken(res.data.access_token);
                navigate('/')
            } else {
                alert.error(res.message);
                ReCAPTCHARef.current.reset();
            }
        })

    }

    useEffect(() => {
        ReCAPTCHARef.current.reset();
    }, []);

    return (
        <form onSubmit={onSubmit} className="backdrop-blur-sm  bg-black/30 flex flex-col min-w-96 w-2/5 justify-center m-auto rounded-md px-14 pb-6 pt-8 text-center">
            <div className="mb-6">
                <h1 className="font-bold text-3xl text-white">Login </h1>
            </div>
            <div className="mb-5">

                <input
                    ref={emailRef}
                    type="text"
                    required
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Email or Username"
                />
            </div>
            <div className="mb-6">

                <input
                    ref={passwordRef}
                    type="password"
                    required
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Password"
                />
            </div>
            <ReCAPTCHA
                ref={ReCAPTCHARef}
                sitekey={process.env.REACT_APP_reCAPTCHA_SITE_KEY}
            />
            <button href="#" className="mt-6 w-24 m-auto rounded-full bg-[#ec4b4a] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-[#a32f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
            <p className="mt-8 text-white text-md">Don't have an account yet? <Link to="/signup" className="font-bold">Sign up</Link></p>
        </form>

    )
}
