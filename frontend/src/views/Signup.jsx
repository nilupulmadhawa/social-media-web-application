import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";

import { register } from '../services/auth'
import { useAuthContext } from "../context/AuthContext";

export default function Signup() {
    const fnameRef = useRef()
    const lnameRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const ReCAPTCHARef = useRef()
    const alert = useAlert()
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (ReCAPTCHARef.current.getValue() === "") {
            alert.error('Please verify that you are not a robot')
            return
        }

        if (passwordRef.current.value != passwordConfirmationRef.current.value) {
            alert.error('Password and password confirmation do not match')
            return
        }

        const data = {
            first_name: fnameRef.current.value,
            last_name: lnameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            reToken: ReCAPTCHARef.current.getValue()
        }

        await register(data).then((res) => {
            console.log(res);
            if (res.success) {
                alert.success(res.message);
                navigate('/login')
            } else {
                alert.error(res.message);
            }
        })
    }

    useEffect(() => {
        ReCAPTCHARef.current.reset();
    }, []);

    return (
        <form onSubmit={onSubmit} className="backdrop-blur-sm  bg-black/30 flex flex-col min-w-96 w-2/5 justify-center m-auto rounded-md px-14 pb-6 pt-8 text-center">
            <div className="mb-6">
                <h1 className="font-bold text-3xl text-white">Create Account</h1>
            </div>
            <div className="mb-5 flex flex-row">

                <input
                    ref={fnameRef}
                    required
                    type="text"
                    className="mr-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="First Name"
                />
                <input
                    ref={lnameRef}
                    required
                    type="text"
                    className="ml-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Last Name"
                />
            </div>
            <div className="mb-5">
                <input
                    ref={usernameRef}
                    required
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Username"
                />
            </div>
            <div className="mb-5">
                <input
                    ref={emailRef}
                    required
                    type="email"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Email"
                />
            </div>
            <div className="mb-6">
                <input
                    ref={passwordRef}
                    required
                    type="password"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Password"
                />
            </div>
            <div className="mb-6">
                <input
                    ref={passwordConfirmationRef}
                    required
                    type="password"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Repeat Password"
                />
            </div>
            <ReCAPTCHA
                ref={ReCAPTCHARef}
                sitekey={process.env.REACT_APP_reCAPTCHA_SITE_KEY}
            />
            <button href="#" className="mt-6 w-24 m-auto rounded-full bg-[#ec4b4a] px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-[#a32f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
            <p className="mt-8 text-white text-md">Already have an account? <Link to="/login" className="font-bold">Login</Link></p>
        </form>

    )
}
