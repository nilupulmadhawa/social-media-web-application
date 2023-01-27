import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {

    return (
        <div className="flex flex-row w-full h-screen">
            <div className="flex flex-col bg-cover bg-center bg-no-repeat bg-[url('/public/assets/login-bg.jpg')] w-3/5 justify-center">
                <Outlet />
            </div>
            <div className="w-2/5 flex flex-col justify-center text-center">
                <h3 className="font-bold text-3xl">Surge SE Internship</h3>
                <h4 className="font-semibold text-2xl mb-5">March 2023</h4>
                <h1 className="font-bold text-3xl">Nilupul Madhawa</h1>
            </div>
        </div>
    );
}
